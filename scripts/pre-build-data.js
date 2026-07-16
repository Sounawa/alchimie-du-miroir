/**
 * Pre-build script: reads all formation markdown files and generates:
 * 1. `src/lib/generated-data.ts` — ONLY structure data (formations tree + episodesIndex, NO content)
 * 2. `public/data/episodes.json` — ALL episode content as flat JSON keyed by slug
 * 3. `public/data/leadmagnets.json` — ALL lead magnet data as JSON
 *
 * Usage: node scripts/pre-build-data.js
 */
import { readdir, readFile, mkdir, writeFile } from "fs/promises"
import { join } from "path"

const FORMATIONS_DIR = join(process.cwd(), "formations")
const LEAD_MAGNETS_DIR = join(process.cwd(), "script", "lead-magnets")
const OUTPUT_TS = join(process.cwd(), "src", "lib", "generated-data.ts")
const OUTPUT_EPISODES_JSON = join(process.cwd(), "public", "data", "episodes.json")
const OUTPUT_LEADMAGNETS_JSON = join(process.cwd(), "public", "data", "leadmagnets.json")

async function parseEpisode(fullPath) {
  const content = await readFile(fullPath, "utf-8")
  const lines = content.split("\n")
  const meta = {}
  let title = ""
  let contentStart = 0

  for (let i = 0; i < Math.min(lines.length, 15); i++) {
    const line = lines[i]
    if (line.startsWith("# ")) {
      if (!title) title = line.replace(/^#\s+/, "").trim()
      continue
    }
    const metaMatch = line.match(/^\*\*(.+?)\*\*\s*:\s*(.+)$|^(\w[\w\s]+?)\s*:\s*(.+)$/)
    if (metaMatch) {
      const key = (metaMatch[1] || metaMatch[3]).replace(/\*\*/g, "").trim()
      const value = (metaMatch[2] || metaMatch[4]).replace(/\*\*/g, "").trim()
      if (["Durée cible", "Ton", "Public"].includes(key)) {
        meta[key] = value
      }
    }
    if (line.startsWith("---")) {
      contentStart = i + 1
      break
    }
  }

  // If no separator found, start after metadata lines (skip title + meta lines)
  if (contentStart === 0) {
    for (let i = 0; i < lines.length; i++) {
      if (!lines[i].startsWith("# ") && !lines[i].match(/^\*\*.+?\*\*\s*:/) && !lines[i].match(/^\w[\w\s]+?\s*:/) && lines[i].trim() !== "") {
        contentStart = i
        break
      }
    }
  }

  return {
    title,
    content: lines.slice(contentStart).join("\n").trim(),
    meta,
  }
}

function parseLeadMagnetMeta(lines) {
  const meta = {}
  let title = ""
  for (let i = 0; i < Math.min(lines.length, 10); i++) {
    const line = lines[i]
    if (line.startsWith("# ")) {
      if (!title) title = line.replace(/^#\s+/, "").trim()
      continue
    }
    const m1 = line.match(/^\*\*Durée cible\s*\*\*\s*:\s*(.+)$/i)
    const m2 = line.match(/^\*\*Format\s*\*\*\s*:\s*(.+)$/i)
    const m3 = line.match(/^\*\*Audience\s*\*\*\s*:\s*(.+)$/i)
    const m4 = line.match(/^\*\*Objectif\s*\*\*\s*:\s*(.+)$/i)
    const m5 = line.match(/^\*\*Pont vers la formation\s*\*\*\s*:\s*(.+)$/i)
    if (m1) meta.duree = m1[1].trim()
    if (m2) meta.format = m2[1].trim()
    if (m3) meta.audience = m3[1].trim()
    if (m4) meta.objectif = m4[1].trim()
    if (m5) meta.formation = m5[1].trim()
    if (line.startsWith("---")) break
  }
  return { title, meta }
}

const AUDIENCE_LABELS = {
  "F1-musulman": "Musulman Pratiquant",
  "F2-musulman-pro": "Musulman Professionnel",
  "F3-tout-public": "Tout Public",
  "F4-pro-tout-public": "Pro Tout Public",
  "F5-parents-musulmans": "Parents Musulmans",
  "F6-parents-tout-public": "Parents Tout Public",
  "F7-parents-musulmans-7-11": "Parents Musulmans 7-11",
  "F8-parents-tout-public-7-11": "Parents Tout Public 7-11",
  "F9-enfants-musulmans-9-12": "Enfants Musulmans 9-12",
  "F10-enfants-tout-public-9-12": "Enfants Tout Public 9-12",
}

async function main() {
  console.log("Pre-building split data modules...")

  const formationDirs = (await readdir(FORMATIONS_DIR)).sort()
  const formations = []
  const episodesIndex = {}  // slug -> { title, meta } (NO content)
  const episodesContentMap = {}  // slug -> { title, content, meta } (WITH content for JSON)

  // ── Parse lead magnets ──
  const leadMagnets = []
  const leadMagnetDirs = (await readdir(LEAD_MAGNETS_DIR)).filter(d => d !== "AUDIT-PREMIUM.md" && !d.endsWith(".md")).sort()

  for (const audienceDir of leadMagnetDirs) {
    const audiencePath = join(LEAD_MAGNETS_DIR, audienceDir)
    const files = (await readdir(audiencePath)).filter(f => f.endsWith(".md")).sort()
    for (const file of files) {
      const fullPath = join(audiencePath, file)
      const raw = await readFile(fullPath, "utf-8")
      const lines = raw.split("\n")
      const { title, meta } = parseLeadMagnetMeta(lines)
      // Content starts after the first ---
      let contentStart = 0
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith("---")) { contentStart = i + 1; break }
      }
      const content = lines.slice(contentStart).join("\n").trim()
      const slug = `${audienceDir}/${file}`
      leadMagnets.push({
        slug,
        title,
        content,
        meta,
        audience: audienceDir,
        audienceLabel: AUDIENCE_LABELS[audienceDir] || audienceDir,
      })
    }
  }
  console.log(`Lead magnets parsed: ${leadMagnets.length}`)

  // ── Parse episodes ──
  for (const formationDir of formationDirs.sort((a, b) => {
    const numA = parseInt(a.match(/formation-(\d+)/)?.[1] || '0')
    const numB = parseInt(b.match(/formation-(\d+)/)?.[1] || '0')
    return numA - numB
  })) {
    const formationPath = join(FORMATIONS_DIR, formationDir)
    const formationName = formationDir.replace(/^formation-\d+-/, "").replace(/-/g, " ")
    const niveauDirs = (await readdir(formationPath)).sort((a, b) => {
      const numA = parseInt(a.match(/niveau-(\d+)/)?.[1] || '0')
      const numB = parseInt(b.match(/niveau-(\d+)/)?.[1] || '0')
      return numA - numB
    })
    const niveaux = []

    for (const niveauDir of niveauDirs) {
      const niveauPath = join(formationPath, niveauDir)
      const niveauName = niveauDir.replace(/^niveau-\d+-/, "").replace(/-/g, " ")
      const files = (await readdir(niveauPath)).filter(f => f.endsWith(".md")).sort((a, b) => {
        const numA = parseInt(a.match(/episode-(\d+)/)?.[1] || '0')
        const numB = parseInt(b.match(/episode-(\d+)/)?.[1] || '0')
        return numA - numB
      })
      const episodes = []

      for (const file of files) {
        const fullPath = join(niveauPath, file)
        const withoutExt = file.replace(".md", "")
        const parts = withoutExt.split("-")
        const num = parts[1]
        const titleText = parts.slice(2).join(" ")
        const slug = `${formationDir}/${niveauDir}/${file}`

        const episodeData = await parseEpisode(fullPath)

        // Index (NO content) — for the TS file
        episodesIndex[slug] = {
          title: `${num}. ${titleText.charAt(0).toUpperCase() + titleText.slice(1)}`,
          meta: episodeData.meta,
        }

        // Full data (WITH content) — for the JSON file
        episodesContentMap[slug] = {
          title: episodeData.title,
          content: episodeData.content,
          meta: episodeData.meta,
        }

        episodes.push({
          slug,
          title: `${num}. ${titleText.charAt(0).toUpperCase() + titleText.slice(1)}`,
        })
      }

      niveaux.push({ id: niveauDir, name: niveauName, episodes })
    }

    formations.push({ id: formationDir, name: formationName, niveaux })
  }

  const totalEpisodes = formations.reduce((a, f) => a + f.niveaux.reduce((b, n) => b + n.episodes.length, 0), 0)
  console.log(`Parsed: ${formations.length} formations, ${formations.reduce((a, f) => a + f.niveaux.length, 0)} niveaux, ${totalEpisodes} episodes`)

  // ── Generate 1: src/lib/generated-data.ts (structure only, NO content) ──
  console.log("Generating src/lib/generated-data.ts (structure only) ...")

  const formationsJson = JSON.stringify(formations, null, 2)
  const episodesIndexJson = JSON.stringify(episodesIndex, null, 2)

  const tsContent = `// AUTO-GENERATED by scripts/pre-build-data.js — DO NOT EDIT MANUALLY
// This file contains ONLY structure data. Content is loaded lazily from JSON files.

export interface GeneratedFormation {
  id: string
  name: string
  niveaux: {
    id: string
    name: string
    episodes: { slug: string; title: string }[]
  }[]
}

export const formations: GeneratedFormation[] = ${formationsJson} as GeneratedFormation[]

export const episodesIndex: Record<string, { title: string; meta: Record<string, string> }> = ${episodesIndexJson} as Record<string, { title: string; meta: Record<string, string> }>
`

  await mkdir(join(process.cwd(), "src", "lib"), { recursive: true })
  await writeFile(OUTPUT_TS, tsContent, "utf-8")
  console.log(`  -> ${OUTPUT_TS} (${(Buffer.byteLength(tsContent) / 1024).toFixed(1)} KB)`)

  // ── Generate 2: public/data/episodes.json (all episode content) ──
  console.log("Generating public/data/episodes.json ...")

  await mkdir(join(process.cwd(), "public", "data"), { recursive: true })
  const episodesJsonStr = JSON.stringify(episodesContentMap, null, 2)
  await writeFile(OUTPUT_EPISODES_JSON, episodesJsonStr, "utf-8")
  console.log(`  -> ${OUTPUT_EPISODES_JSON} (${(Buffer.byteLength(episodesJsonStr) / 1024 / 1024).toFixed(2)} MB)`)

  // ── Generate 3: public/data/leadmagnets.json ──
  console.log("Generating public/data/leadmagnets.json ...")

  const leadMagnetsOutput = {
    list: leadMagnets.map(lm => ({
      slug: lm.slug,
      title: lm.title,
      audience: lm.audience,
      audienceLabel: lm.audienceLabel,
      meta: lm.meta,
    })),
    data: Object.fromEntries(
      leadMagnets.map(lm => [lm.slug, {
        slug: lm.slug,
        title: lm.title,
        content: lm.content,
        meta: lm.meta,
        audience: lm.audience,
        audienceLabel: lm.audienceLabel,
      }])
    ),
  }
  const leadMagnetsJsonStr = JSON.stringify(leadMagnetsOutput, null, 2)
  await writeFile(OUTPUT_LEADMAGNETS_JSON, leadMagnetsJsonStr, "utf-8")
  console.log(`  -> ${OUTPUT_LEADMAGNETS_JSON} (${(Buffer.byteLength(leadMagnetsJsonStr) / 1024).toFixed(1)} KB)`)

  console.log("\nDone!")
  console.log(`  Formations: ${formations.length}`)
  console.log(`  Episodes index: ${Object.keys(episodesIndex).length} (structure only in TS)`)
  console.log(`  Episodes content: ${Object.keys(episodesContentMap).length} (in JSON)`)
  console.log(`  Lead magnets: ${leadMagnets.length} (in JSON)`)
}

main().catch(console.error)
