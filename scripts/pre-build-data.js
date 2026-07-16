/**
 * Pre-build script: reads all formation markdown files and generates
 * a static TypeScript data module for GitHub Pages deployment.
 *
 * This eliminates ALL runtime fetch() calls — everything is embedded
 * in the JS bundle for 100% reliable static hosting.
 *
 * Usage: node scripts/pre-build-data.js
 */
import { readdir, readFile, mkdir, writeFile } from "fs/promises"
import { join } from "path"

const FORMATIONS_DIR = join(process.cwd(), "formations")
const LEAD_MAGNETS_DIR = join(process.cwd(), "script", "lead-magnets")
const OUTPUT_FILE = join(process.cwd(), "src", "lib", "generated-data.ts")

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

function escapeTs(s) {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$")
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
}

async function main() {
  console.log("Pre-building static data module...")

  const formationDirs = (await readdir(FORMATIONS_DIR)).sort()
  const formations = []
  const episodesMap = {}  // slug -> { title, content, meta }

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

  for (const formationDir of formationDirs.sort()) {
    const formationPath = join(FORMATIONS_DIR, formationDir)
    const formationName = formationDir.replace(/^formation-\d+-/, "").replace(/-/g, " ")
    const niveauDirs = (await readdir(formationPath)).sort()
    const niveaux = []

    for (const niveauDir of niveauDirs) {
      const niveauPath = join(formationPath, niveauDir)
      const niveauName = niveauDir.replace(/^niveau-\d+-/, "").replace(/-/g, " ")
      const files = (await readdir(niveauPath)).filter(f => f.endsWith(".md")).sort()
      const episodes = []

      for (const file of files) {
        const fullPath = join(niveauPath, file)
        const withoutExt = file.replace(".md", "")
        const parts = withoutExt.split("-")
        const num = parts[1]
        const titleText = parts.slice(2).join(" ")
        const slug = `${formationDir}/${niveauDir}/${file}`

        const episodeData = await parseEpisode(fullPath)

        episodesMap[slug] = episodeData

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

  // Generate TypeScript module
  console.log("Generating src/lib/generated-data.ts ...")

  // Serialize formations (no markdown content, just structure)
  const formationsJson = JSON.stringify(formations, null, 2)

  // Serialize episode contents
  let episodesEntries = ""
  for (const [slug, data] of Object.entries(episodesMap)) {
    episodesEntries += `  "${slug}": {\n`
    episodesEntries += `    title: ${JSON.stringify(data.title)},\n`
    episodesEntries += `    content: \`${escapeTs(data.content)}\`,\n`
    episodesEntries += `    meta: ${JSON.stringify(data.meta)},\n`
    episodesEntries += `  },\n`
  }

  // Serialize lead magnets
  let lmEntries = ""
  for (const lm of leadMagnets) {
    lmEntries += `  "${lm.slug}": {\n`
    lmEntries += `    title: ${JSON.stringify(lm.title)},\n`
    lmEntries += `    content: \`${escapeTs(lm.content)}\`,\n`
    lmEntries += `    meta: ${JSON.stringify(lm.meta)},\n`
    lmEntries += `    audience: ${JSON.stringify(lm.audience)},\n`
    lmEntries += `    audienceLabel: ${JSON.stringify(lm.audienceLabel)},\n`
    lmEntries += `  },\n`
  }

  const lmListJson = JSON.stringify(leadMagnets.map(lm => ({
    slug: lm.slug,
    title: lm.title,
    audience: lm.audience,
    audienceLabel: lm.audienceLabel,
    meta: lm.meta,
  })), null, 2)

  const tsContent = `// AUTO-GENERATED by scripts/pre-build-data.js — DO NOT EDIT MANUALLY
// This file embeds all formation/episode data for GitHub Pages static deployment.

export interface GeneratedFormation {
  id: string
  name: string
  niveaux: {
    id: string
    name: string
    episodes: { slug: string; title: string }[]
  }[]
}

export interface GeneratedEpisodeData {
  title: string
  content: string
  meta: Record<string, string>
}

export interface GeneratedLeadMagnet {
  slug: string
  title: string
  content: string
  meta: {
    duree?: string
    format?: string
    audience?: string
    objectif?: string
    formation?: string
  }
  audience: string
  audienceLabel: string
}

export interface LeadMagnetListItem {
  slug: string
  title: string
  audience: string
  audienceLabel: string
  meta: GeneratedLeadMagnet['meta']
}

export const formations: GeneratedFormation[] = ${formationsJson} as GeneratedFormation[]

export const episodesData: Record<string, GeneratedEpisodeData> = {
${episodesEntries}}

export const leadMagnetsList: LeadMagnetListItem[] = ${lmListJson} as LeadMagnetListItem[]

export const leadMagnetsData: Record<string, GeneratedLeadMagnet> = {
${lmEntries}}
`

  await mkdir(join(process.cwd(), "src", "lib"), { recursive: true })
  await writeFile(OUTPUT_FILE, tsContent, "utf-8")

  console.log(`Done! Output: ${OUTPUT_FILE}`)
  console.log(`Formations: ${formations.length}, Episodes embedded: ${Object.keys(episodesMap).length}, Lead magnets: ${leadMagnets.length}`)
}

main().catch(console.error)