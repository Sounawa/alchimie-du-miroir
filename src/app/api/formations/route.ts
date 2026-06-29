import { NextResponse } from "next/server"
import { readdir } from "fs/promises"
import { join } from "path"

export async function GET() {
  try {
    const formationsDir = join(process.cwd(), "formations")
    const formationDirs = await readdir(formationsDir)
    const formations = []

    for (const formationDir of formationDirs.sort()) {
      const formationPath = join(formationsDir, formationDir)
      const formationName = formationDir
        .replace(/^formation-\d+-/, "")
        .replace(/-/g, " ")
      const niveauDirs = await readdir(formationPath)
      const niveaux = []

      for (const niveauDir of niveauDirs.sort()) {
        const niveauPath = join(formationPath, niveauDir)
        const niveauName = niveauDir
          .replace(/^niveau-\d+-/, "")
          .replace(/-/g, " ")
        const files = await readdir(niveauPath)
        const episodes = files
          .filter((f) => f.endsWith(".md"))
          .sort()
          .map((f) => {
            const withoutExt = f.replace(".md", "")
            const parts = withoutExt.split("-")
            const num = parts[1]
            const title = parts.slice(2).join(" ")
            return {
              slug: `${formationDir}/${niveauDir}/${f}`,
              title: `${num}. ${title.charAt(0).toUpperCase() + title.slice(1)}`,
            }
          })

        niveaux.push({ id: niveauDir, name: niveauName, episodes })
      }

      formations.push({ id: formationDir, name: formationName, niveaux })
    }

    return NextResponse.json({ formations })
  } catch (error) {
    console.error("Error reading formations:", error)
    return NextResponse.json({ formations: [] }, { status: 500 })
  }
}
