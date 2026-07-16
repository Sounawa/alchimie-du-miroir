import { NextResponse } from "next/server"
import { readdir, readFile } from "fs/promises"
import { join } from "path"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = (searchParams.get("q") || "").trim().toLowerCase()
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [], query: q })
  }

  try {
    const formationsDir = join(process.cwd(), "formations")
    const formationDirs = (await readdir(formationsDir)).filter(d => d.startsWith("formation-")).sort()
    const results: Array<{
      path: string
      formation: string
      niveau: string
      episode: string
      title: string
      snippet: string
      matchCount: number
    }> = []

    for (const fDir of formationDirs) {
      const fPath = join(formationsDir, fDir)
      const niveauDirs = (await readdir(fPath)).filter(d => d.startsWith("niveau-")).sort()

      for (const nDir of niveauDirs) {
        const nPath = join(fPath, nDir)
        const files = (await readdir(nPath)).filter(f => f.endsWith(".md")).sort()

        for (const file of files) {
          const filePath = join(nPath, file)
          const content = await readFile(filePath, "utf-8")

          const lines = content.split("\n")
          let matchCount = 0
          let snippet = ""

          for (let i = 0; i < lines.length; i++) {
            if (lines[i].toLowerCase().includes(q)) {
              matchCount++
              if (!snippet) {
                const start = Math.max(0, i - 1)
                const end = Math.min(lines.length, i + 2)
                snippet = lines.slice(start, end).join("\n").trim()
                if (snippet.length > 300) {
                  snippet = snippet.substring(0, 300) + "..."
                }
              }
            }
          }

          if (matchCount > 0) {
            const parts = file.replace(".md", "").split("-")
            const num = parts[1]
            const title = parts.slice(2).join(" ")
            const formationName = fDir.replace(/^formation-\d+-/, "").replace(/-/g, " ")
            const niveauName = nDir.replace(/^niveau-\d+-*/, "").replace(/-/g, " ")

            results.push({
              path: `${fDir}/${nDir}/${file}`,
              formation: formationName,
              niveau: niveauName,
              episode: `${num}. ${title.charAt(0).toUpperCase() + title.slice(1)}`,
              title: `${num}. ${title.charAt(0).toUpperCase() + title.slice(1)}`,
              snippet,
              matchCount,
            })
          }
        }
      }
    }

    results.sort((a, b) => b.matchCount - a.matchCount)

    return NextResponse.json({ results: results.slice(0, 20), query: q, total: results.length })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ results: [], query: q, error: "Search failed" }, { status: 500 })
  }
}