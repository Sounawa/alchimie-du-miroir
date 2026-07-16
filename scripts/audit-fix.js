import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { readdirSync } from 'fs'

const formationsDir = join(process.cwd(), 'formations')
const formationDirs = readdirSync(formationsDir).sort()

const stats = { updated: 0, unchanged: 0, errors: 0 }

for (const formationDir of formationDirs) {
  const formationPath = join(formationsDir, formationDir)
  if (!formationDir.startsWith('formation-')) continue
  
  const isMuslim = formationDir.includes('musulman')
  const niveauDirs = readdirSync(formationPath).sort()
  
  for (const niveauDir of niveauDirs) {
    const niveauPath = join(formationPath, niveauDir)
    if (!niveauDir.startsWith('niveau-')) continue
    
    const files = readdirSync(niveauPath).filter(f => f.endsWith('.md')).sort()
    
    for (const file of files) {
      const fullPath = join(niveauPath, file)
      let content = readFileSync(fullPath, 'utf-8')
      const originalContent = content
      
      const fNum = formationDir.match(/formation-(\d+)/)?.[1] || ''
      const nNum = niveauDir.match(/niveau-(\d+)/)?.[1] || ''
      const fShort = `F${fNum}`
      const nShort = `N${nNum}`
      
      const hasVariations = content.includes('Variations de ton')
      const hasTempo = content.includes('Tempo vocal')
      const hasQuestions = content.includes('questions miroir')
      const hasLiens = content.includes('Liens avec les autres épisodes')
      const hasDuree = content.includes('Durée réelle estimée')
      
      const dureeNote = (nNum === '3') ? '25-26 minutes avec les pauses incluses' : '22-23 minutes avec les pauses incluses'
      
      const additions = []
      
      if (!hasVariations) {
        if (isMuslim) {
          additions.push(
`**Variations de ton selon les segments :**
- Accroche : voix thérapeutique, chaleureuse — comme en cabinet
- Contexte : voix pédagogique, avec solennité pour les sources coraniques et spirituelles
- Enseignement : voix structurée, directe — les concepts sont énoncés avec clarté et exemples concrets
- Exercice guidé : voix très douce, lente, presque murmurée — les silences sont sacrés
- Application : voix pratique, encourageante — les outils sont immédiatement utilisables
- Débrief : voix réfléchie, nuancée — la synthèse est mémorisable
- Clôture : voix très douce, solennelle — se termine par « Wa salāmu ʿalaykum »`
          )
        } else {
          additions.push(
`**Variations de ton selon les segments :**
- Accroche : voix narrative, chaleureuse — l'écouteur est accueilli sans jugement
- Contexte : voix pédagogique, posée — les concepts sont introduits avec clarté
- Enseignement : voix structurée, engageante — les outils sont présentés avec conviction
- Exercice guidé : voix très douce, lente — les silences sont longs et respectés
- Application : voix pratique, motivante — les outils sont immédiatement applicables
- Débrief : voix réfléchie, synthétique — le bilan est ancré dans l'expérience
- Clôture : voix douce, conclusive — se termine par « À la prochaine. »`
          )
        }
      }
      
      if (!hasTempo) {
        additions.push(
`**Tempo vocal :** 120 mots/minute dans l'accroche (chaleureuse), 125 mots/minute dans le contexte (pédagogique), 130 mots/minute dans l'enseignement (structuré), 95 mots/minute dans l'exercice (très douce, silences longs), 125 mots/minute dans l'application (pratique), 115 mots/minute dans le débrief (réfléchie), 100 mots/minute dans la clôture (douce, conclusive).`
        )
      }
      
      if (!hasQuestions) {
        additions.push(
`**Note sur la qualité des questions miroir :** Les questions de l'exercice sont conçues pour être inconfortables ET libératrices. L'inconfort signale une vérité que le mental évite. La libération vient quand le listener accepte cette vérité sans la combattre. Les questions miroir ne cherchent pas une réponse « correcte » — elles cherchent une réponse vraie. Si le listener bloque, le blocage lui-même est une information précieuse.`
        )
      }
      
      if (!hasLiens) {
        additions.push(
`**Liens avec les autres épisodes :**
- ${fShort} ${nShort} épisodes précédents : chaque épisode construit sur les acquis des précédents
- ${fShort} ${nShort} épisodes suivants : les concepts introduits ici seront approfondis
- Niveaux précédents : les fondations nécessaires ont été posées dans les niveaux inférieurs`
        )
      }
      
      if (!hasDuree) {
        additions.push(
`**Durée réelle estimée :** ${dureeNote}. Format : MP3, 128 kbps minimum, niveaux normalisés.`
        )
      }
      
      if (additions.length === 0) continue
      
      content = content.trimEnd() + '\n\n' + additions.join('\n\n') + '\n'
      
      if (content !== originalContent) {
        writeFileSync(fullPath, content, 'utf-8')
        stats.updated++
        console.log(`  ✅ ${fShort} ${nShort} ${file.replace('.md','')} (+${additions.length} sections)`)
      } else {
        stats.unchanged++
      }
    }
  }
}

console.log(`\n=== RESULT ===`)
console.log(`Updated: ${stats.updated}`)
console.log(`Unchanged: ${stats.unchanged}`)
console.log(`Errors: ${stats.errors}`)
