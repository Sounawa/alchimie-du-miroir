import { NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const filePath = searchParams.get("path")

  if (!filePath) {
    return NextResponse.json({ error: "Missing path parameter" }, { status: 400 })
  }

  try {
    const fullPath = join(process.cwd(), "formations", filePath)
    const content = await readFile(fullPath, "utf-8")

    const lines = content.split("\n")
    const meta: Record<string, string> = {}
    let title = ""
    let contentStart = 0

    for (let i = 0; i < Math.min(lines.length, 10); i++) {
      const line = lines[i]
      if (line.startsWith("# ")) {
        if (!title) {
          title = line.replace(/^#\s+/, "").trim()
        }
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

    const markdownContent = lines.slice(contentStart).join("\n").trim()

    return NextResponse.json({ title, content: markdownContent, meta })
  } catch (error) {
    console.error("Error reading episode:", error)
    return NextResponse.json({ error: "Episode not found" }, { status: 404 })
  }
}
