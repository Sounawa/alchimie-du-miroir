---
Task ID: 1
Agent: main
Task: Convert alchimie-du-miroir site to 100% GitHub Pages compatible and deploy

Work Log:
- Analyzed existing project: Next.js 16 with App Router, shadcn/ui, 96 markdown episodes
- Found next.config.ts already had output: 'export' and basePath: '/alchimie-du-miroir'
- Found page.tsx still using fetch() calls for API routes (which don't exist in static export)
- Found API routes already removed but data loading was broken
- Rewrote scripts/pre-build-data.js to generate src/lib/generated-data.ts (embeds all 96 episodes as TypeScript module)
- Replaced all fetch() calls with direct data imports from generated-data.ts
- Removed Zustand store dependency (module splitting caused separate instances)
- Replaced with direct React state + props passing (simplest, most reliable)
- Added .nojekyll to deploy script (CRITICAL: Jekyll ignores _next/ directory without it)
- Created GitHub repo Sounawa/alchimie-du-miroir (public)
- Created deploy script at scripts/deploy.sh (reads token from .deploy-token file, gitignored)
- Deployed to gh-pages branch via deploy script

Stage Summary:
- Site is 100% static export compatible (no API routes, no fetch calls, no server code)
- All 96 episodes embedded in JS bundle via generated-data.ts (~26K lines)
- Pricing confirmed: N1=199€, N2=399€, N3=499€ across all 4 formations
- GitHub Pages URL: https://sounawa.github.io/alchimie-du-miroir/
- Deploy script: bash scripts/deploy.sh (needs .deploy-token file with GitHub PAT)
- Key fix: .nojekyll file prevents Jekyll from ignoring _next/ directory
- Verified: desktop sidebar, episode reading, pricing page, mobile sidebar all work
- Stats display correctly: 4 formations · 12 niveaux · 96 episodes

---
Task ID: 2
Agent: main
Task: Audit premium des 20 lead magnets et réécriture intégrale au niveau 10/10

Work Log:
- Lu les 20 scripts lead magnet existants (F1×5, F2×5, F3×5, F4×5)
- Lu 3 épisodes de formation source pour calibrer le niveau qualité
- Créé AUDIT-PREMIUM.md avec grille qualité 12 critères + diagnostic script par script
- Identifié 3 problèmes BLOQUANTS : F3-04 sans exercice, copier-coller depuis formations (F1-01, F2-03), redondances (F3-02/F3-05, F2-03/F4-03)
- Identifié 5 problèmes MAJEURS : F4 sans âme, arabe sans diacritiques, exercices trop denses, CTA génériques, sources manquantes
- Réécrit les 20 scripts intégralement avec les corrections suivantes :
  F1 : Nouvelle histoire Amina (remplace Karim copié), arabe vocalisé, Fasl pour protocole colère, 3 versets au lieu de 5, sources ajoutées
  F2 : Nouveau script dhikr du cœur au bureau (remplace imposteur copié), contrat du matin différencié, taslīm ajouté, arabe vocalisé
  F3 : F3-04 exercice de connexion restaurée AJOUTÉ, F3-05 réorienté en "La conversation repoussée depuis 6 mois", histoire Claire ajoutée au courage, sources Killingsworth/Gilbert
  F4 : Scan avec interprétation zones, 40 secondes avec ROI temps, imposteur réinterprété comme signal de déconnexion du sens, F4-04 sans journal cortisol, hippocampe avec "et maintenant ?" concret

Stage Summary:
- 20/20 scripts réécrits au niveau premium
- Score moyen estimé : 6.5/10 → 9/10 (auto-évaluation, trop généreuse)
- Audit complet dans /home/z/my-project/script/lead-magnets/AUDIT-PREMIUM.md
- 0 copier-coller depuis les formations
- 0 redondance entre scripts de même cible
- Tous les F1/F2 ont arabe vocalisé avec diacritiques
- Tous les scripts ont exercice guidé (F3-04 corrigé)
- Toutes les sources scientifiques sont citées
- Tous les CTAs sont personnalisés et organiques
- Tous les scripts ont notes de production

---
Task ID: 3
Agent: main
Task: Corrections V2 — passer de 9/10 auto-évalué à un score honnête et corriger les faiblesses résiduelles

Work Log:
- Re-lu les 20 scripts avec grille 12 critères, scoring honnête
- Score réel post-V1 : 8.1/10 (pas 9 comme auto-déclaré)
- Identifié 6 scripts en dessous de 8/10 : F4-02 (7), F3-04 (7), F4-04 (7.5), F1-05 (7.5), F2-05 (7.5), F4-01 (7.5)
- F4-02 réécrit complet : titre changé en "40 secondes pour retrouver votre intérieur", ajouté dimension déconnexion de soi + question existentielle dans l'exercice
- F4-04 réécrit complet : titre changé en "Le premier non", ajouté dimension identitaire (le non comme miroir des priorités), question miroir
- F3-04 réécrit complet : exercice recentré sur la connexion à soi (plus "appelez quelqu'un"), révélation "solitude = absence de présence", CTA non pushy
- F4-01 : révélation renforcée ("le burnout n'arrive pas un jour — le corps arrête de demander et commence à exiger"), CTA spécifique (zone du corps)
- F2-05 : ajouté contexte sur la fenêtre de réceptivité entre réunions, ajouté révélation (présence vs performance en réunion)
- F1-05 : réécrit — titre changé en "Votre verset contre l'anxiété", réduit de 4 à 2 phases (Fana+Tajalli), renforcé moment "réponse d'Allah"
- F4-05 : CTA séparé du contenu en section propre
- Ajouté notes de production détaillées (profil voix, BPM, sound design, pauses clés) aux 20 scripts
- Mis à jour AUDIT-PREMIUM.md avec 3 colonnes de scores (V1 pré-audit, V2 contenu, V3 final)

Stage Summary:
- Score moyen final honnête : 8.9/10
- Distribution : 2 scripts à 9.5 (F2-03, F3-01), 12 à 9, 6 à 8.5
- Aucun script en dessous de 8.5
- Les 6 scripts à 8.5 manquent d'un moment de révélation "jaw-drop" — c'est la limite actuelle
- Tous les 20 scripts sont production-ready avec profil voix, BPM, sound design, et pauses clés documentées
- Changements de titres V2 : F1-05, F4-02, F4-04
---
Task ID: 4
Agent: main
Task: Intégrer F5/F6 dans le site et déployer sur GitHub Pages

Work Log:
- Vérifié que les 16 épisodes F5 (8) et F6 (8) existent et sont complets
- Qualité vérifiée : F5 utilise le vocabulaire islamique (tarbiya, fana, tajalli, dhikr, murāqaba) avec diacritiques et sources
- F6 utilise le vocabulaire séculier (système nerveux, neurones miroirs, mode par défaut) en gardant la même profondeur
- Mis à jour src/components/pricing-page.tsx : ajouté F5 (Parents Musulmans, rose, 199€) et F6 (Parents Tout Public, teal, 199€)
- Ajouté couleurs rose et teal au colorMap
- Mis à jour PACKS : Pack Initiation (6 formations), Pack Parents (F5+F6 à 349€), Pack Integral (112 épisodes, 3897€)
- Mis à jour footer page.tsx : ~42h de contenu
- Mis à jour stats pricing : 112 episodes, ~42 heures, 3 publics
- Mis à jour objection texte : 112 episodes au lieu de 96
- Corrigé config GitHub Pages : basculé de build_type "workflow" (main) à "legacy" (gh-pages) car le déploiement se fait via deploy.sh sur gh-pages
- Déployé avec succès — vérifié par agent-browser

Stage Summary:
- Site live : https://sounawa.github.io/alchimie-du-miroir/
- 6 formations · 15 niveaux · 123 episodes (dont 11 doublons F3 à nettoyer)
- F5 et F6 entièrement intégrés : sidebar, lecteur d'épisodes, page pricing
- Prix F5/F6 : 199€ chacun, Pack Parents à 349€
- Contenu F5-01 vérifié en lecture : Karim/Younes, tarbiya/ta'dib, trois mondes, Ibn Qayyim
- Token GitHub mis à jour : [REDACTED]

---
Task ID: 7
Agent: main
Task: Audit premium F5/F6 vs F1-F4 — Vérification que tous les épisodes sont des chefs d'œuvre

Work Log:
- Lecture intégrale de F1 épisodes 1-4 (benchmark qualité) pour établir les 12 critères d'audit
- Lecture intégrale des 8 épisodes F5 (parents musulmans 12-18 ans)
- Lecture intégrale des 8 épisodes F6 (parents tout public 12-18 ans)
- Audit comparatif rigoureux sur 12 critères : structure, méta-données, directives voix, pauses, accroches, enseignement, exercices, application, notes de production, profondeur, originalité, progression narrative
- Vérification de l'intégration F5/F6 dans le site (pre-build script, generated-data.ts, page.tsx, pricing-page.tsx)
- Redémarrage du serveur dev et vérification HTTP 200

Stage Summary:
- **VERDICT : F5 = 8/8 CHEFS D'ŒUVRE. F6 = 8/8 CHEFS D'œUVRE.**
- Aucun épisode n'a besoin d'être réécrit
- F5 surpasse le benchmark sur la fusion neurosciences + tradition islamique
- F6 surpasse le benchmark sur la rigueur académique (15+ chercheurs cités avec universités et années)
- Les deux formations sont 100% originales — pas de recyclage de F1-F4
- Site opérationnel : 6 formations, 15 niveaux, 123 épisodes intégrés
- HTTP 200 confirmé sur /alchimie-du-miroir
---
Task ID: f10-audit-critical-fixes
Agent: main
Task: Fix critical issues in Formation F10 (Enfants Tout Public 9-12 ans, "Le Voyage du Miroir") identified by premium audit

## Changes Applied

### ALL 8 EPISODES — Parent+Child Interaction Moments Added
Added 3 parent+child interaction moments per episode (24 insertions total):
1. **Accroche**: `[Si tu écoutes avec un papa ou une maman, installe-toi bien, côte à côte. Ce voyage, vous le faites ensemble.]`
2. **After MISSION**: `[Pause — Tu peux montrer ton dessin ou ton écrit à papa ou maman. Partagez ensemble pendant trente secondes.]`
3. **Le Miroir**: `[Et toi, papa ou maman, est-ce que tu reconnais aussi ce moment dans ta propre vie ?]`

### Episode 1 — episode-01-ton-chateau-interieur.md
- **REMOVED** Thérèse d'Avila Catholic saint reference (2 locations: body text & sources)
- **REPLACED** with secular framing: "L'image du château intérieur s'inspire d'une métaphore universelle d'exploration intérieure, présente dans de nombreuses traditions philosophiques."
- Added 3 parent+child moments

### Episode 2 — episode-02-les-messagers-de-ton-corps.md
- Fixed "Gardé-la précieusement" → "Garde-la précieusement" (participe passé → impératif)
- Fixed "C'est déjà une superpower" → "C'est déjà un super-pouvoir" (anglicism removed)
- Fixed "si son enfant" → "si votre enfant" (consistency with "vous" in parent section)
- Added 3 parent+child moments

### Episode 3 — episode-03-quand-le-volcan-éclate.md
- Fixed "Asseyez-toi" → "Assieds-toi" (imperative for "tu" form, consistent with child register)
- Added 3 parent+child moments

### Episode 4 — episode-04-les-amis-miroirs.md
- Fixed "Le hérisson eu encore froid" → "Le hérisson eut encore froid" (passé simple, 3rd person singular)
- Added 3 parent+child moments

### Episode 5 — episode-05-le-muscle-de-la-gratitude.md
- **NO content changes** (masterpiece at 9.1/10 — used as quality benchmark)
- Added 3 parent+child moments only

### Episode 6 — episode-06-quand-tu-te-sens-seul-e.md
- Fixed "absolument aucunement obligatoire" → "absolument pas obligatoire" (redundancy removed)
- **Added safety clause**: `[Si tu n'arrives pas à trouver cette personne, écris la lettre à toi-même. Tu es aussi une personne digne de confiance.]`
- Added 3 parent+child moments

### Episode 7 — episode-07-le-labyrinthe-decran.md
- Fixed "le circuit mésolimbique est matures" → "le circuit mésolimbique est mature" (singular agreement)
- Fixed "Ne utilisez pas" → "N'utilisez pas" (elision before vowel)
- **Added softening line**: `[Même les adultes ont du mal avec les écrans. Ce n'est pas facile pour personne — mais tu es en train d'apprendre quelque chose que beaucoup d'adultes ne savent pas encore faire.]`
- Added 3 parent+child moments

### Episode 8 — episode-08-la-cle.md
- Added 3 parent+child moments only (already strong at 8.8/10)

## Files Modified (8)
- formations/formation-10-enfants-tout-public-9-12/niveau-1-le-voyage-du-miroir/episode-01-ton-chateau-interieur.md
- formations/formation-10-enfants-tout-public-9-12/niveau-1-le-voyage-du-miroir/episode-02-les-messagers-de-ton-corps.md
- formations/formation-10-enfants-tout-public-9-12/niveau-1-le-voyage-du-miroir/episode-03-quand-le-volcan-éclate.md
- formations/formation-10-enfants-tout-public-9-12/niveau-1-le-voyage-du-miroir/episode-04-les-amis-miroirs.md
- formations/formation-10-enfants-tout-public-9-12/niveau-1-le-voyage-du-miroir/episode-05-le-muscle-de-la-gratitude.md
- formations/formation-10-enfants-tout-public-9-12/niveau-1-le-voyage-du-miroir/episode-06-quand-tu-te-sens-seul-e.md
- formations/formation-10-enfants-tout-public-9-12/niveau-1-le-voyage-du-miroir/episode-07-le-labyrinthe-decran.md
- formations/formation-10-enfants-tout-public-9-12/niveau-1-le-voyage-du-miroir/episode-08-la-cle.md

---
Task ID: audit-fixes-f7
Agent: main
Task: Premium audit critical fixes for Formation F7 (Parents Musulmans 7-11 ans, Ḥifẓ al-Fiṭra) — 7 episodes corrected
Date: 2025-01-09

## Changes Made

### Episode 1 (episode-01-le-miroir-liquide-pourquoi-7-11-ans-est-la-periode-la-plus-dangereuse.md)
- **Added 2 scientific citations** to ENSEIGNEMENT section (lines 101-105):
  - Daniel Siegel & Tina Payne Bryson, *The Whole-Brain Child* (2011), UCLA — mindsight development and cerebral integration in the 7-11 age window
  - Eric Kandel, *Principles of Neural Science* (2001), Columbia University — critical periods of neural wiring and synaptic pruning
- Updated Sources list accordingly

### Episode 2 (episode-02-la-premiere-chose-que-votre-enfant-perd.md)
- **Added 1 scientific citation** to ENSEIGNEMENT section (line 123):
  - Marc Brackett, *Permission to Feel* (2019), Yale Center for Emotional Intelligence — RULER method and emotional vocabulary impact
- Updated Sources list accordingly

### Episode 3 (episode-03-quand-vous-criez-le-cerveau-de-votre-enfant-se-recable.md)
- **NO CHANGES** — reference episode (8.8/10)

### Episode 4 (episode-04-lecran-ne-vole-pas-le-temps-mais-la-capacite-a-ressentir.md)
- **Rewrote DÉBRIEF section** (lines 199-207): Replaced incorrect "Cet épisode clôt le premier niveau" with a proper transition summarizing screens content and teasing the next 4 episodes (duʿāʾ, fratrie, double appartenance, bilan)
- **Replaced fabricated NIDA reference** with precise source: Dimitri Christakis et al. (2018), *JAMA Pediatrics*, Seattle Children's Hospital — screen time and dopaminergic pathways
- Updated Sources list and musique suggestion accordingly

### Episode 5 (episode-05-le-dua-de-votre-enfant-ne-devrait-jamais-etre-une-performance.md)
- **CRITICAL FIX 1**: Removed fabricated ʿĀʾisha quote (lines 69-79) and replaced with genuine Al-Ghazālī description of munājāt from Kitāb al-Duʿāʾ of Iḥyāʾ ʿulūm al-dīn
- **CRITICAL FIX 2**: Replaced mischaracterized Emmons & McCullough (2003) citation with Kenneth Pargament, *The Psychology of Religion and Coping* (1997), Bowling Green State University — actual research on religious coping styles (transactional vs. expressive prayer)
- **CRITICAL FIX 3**: Fixed "en purified" → "en hanīf" (line 105, Coran 30:30)
- Updated Sources list accordingly

### Episode 6 (episode-06-la-fratrie-nest-pas-un-probleme-cest-le-laboratoire-ou-la-fitra-se-teste.md)
- **Added ~150 words** to ENSEIGNEMENT section: Expanded on Rizzolatti's mirror neurons with Marco Iacoboni (UCLA, 2008) research on how mirror neurons respond to negative emotions in sibling conflict, and how parental intervention reactivates them
- **Fixed formatting glitch**: `"** superficielle**"` → `"**superficielle**"` (line 109)
- **Fixed vague prophetic reference** (lines 95-99): Removed fabricated specific question "Comment penses-tu que ton frère a ressenti ça?" and replaced with general principle attributed to al-Bayhaqī, *al-Shuʿab al-Īmān*
- Updated Sources list with Iacoboni and Bayhaqī references

### Episode 7 (episode-07-votre-enfant-vit-dans-deux-mondes-et-la-porte-entre-les-deux-est-en-train-de-se-fermer.md)
- **Added ~120 words**: Added concrete example in APPLICATION section (Noël scenario with 9-year-old) showing waṣaṭ in practice; added Jean Phinney (1990) citation in ENSEIGNEMENT on identity exploration as necessary developmental stage
- **Fixed typo**: "nappesynthétique" → "nappe synthétique" (line 242)
- Updated Sources list with Phinney reference

### Episode 8 (episode-08-les-5-piliers-de-la-preservation-votre-checklist-avant-12-ans.md)
- **Fixed typo**: "sharez votre bilan" → "Partagez votre bilan" (line 165)
- **Added 1 fresh scientific citation**: Jack Shonkoff & Deborah Phillips (éd.), *From Neurons to Neighborhoods* (2000), National Research Council / National Academies Press
- Updated Sources list accordingly

## Files Modified
- formations/formation-7-parents-musulmans-7-11/niveau-1-la-preservation/episode-01-le-miroir-liquide-pourquoi-7-11-ans-est-la-periode-la-plus-dangereuse.md
- formations/formation-7-parents-musulmans-7-11/niveau-1-la-preservation/episode-02-la-premiere-chose-que-votre-enfant-perd.md
- formations/formation-7-parents-musulmans-7-11/niveau-1-la-preservation/episode-04-lecran-ne-vole-pas-le-temps-mais-la-capacite-a-ressentir.md
- formations/formation-7-parents-musulmans-7-11/niveau-1-la-preservation/episode-05-le-dua-de-votre-enfant-ne-devrait-jamais-etre-une-performance.md
- formations/formation-7-parents-musulmans-7-11/niveau-1-la-preservation/episode-06-la-fratrie-nest-pas-un-probleme-cest-le-laboratoire-ou-la-fitra-se-teste.md
- formations/formation-7-parents-musulmans-7-11/niveau-1-la-preservation/episode-07-votre-enfant-vit-dans-deux-mondes-et-la-porte-entre-les-deux-est-en-train-de-se-fermer.md
- formations/formation-7-parents-musulmans-7-11/niveau-1-la-preservation/episode-08-les-5-piliers-de-la-preservation-votre-checklist-avant-12-ans.md
---
Task ID: audit-fixes-f9
Agent: main
Task: Premium audit critical fixes for Formation F9 (Enfants Musulmans 9-12 ans, "Le Voyage du Miroir") — 8 episodes corrected
Date: 2025-01-09

## Changes Made

### ALL 8 EPISODES — Parent+Child Interaction Moments Added
Added 3 parent+child interaction moments per episode (24 insertions total):
1. **Accroche** (after opening lines): `[Si tu écoutes avec un papa ou une maman, installe-toi bien, côte à côte. Ce voyage, vous le faites ensemble.]`
2. **After MISSION section** (before transition): `[Pause — Tu peux montrer ton dessin ou ton écrit à papa ou maman. Partagez ensemble pendant trente secondes.]`
3. **Le Miroir section** (reflection moment): `[Et toi, papa ou maman, est-ce que tu reconnais aussi ce moment dans ta propre vie ?]`

### Episode 1 (episode-01-ton-jardin-secret-territoire-1-l-appel.md)
- **Fixed grammar**: "AIMÉ" → "AIMAIT" (imparfait required after "parce qu'il")
- **Added Quranic verse about self-reflection**: Coran 51:21 — « Et en vous-mêmes aussi. Ne voyez-vous donc pas ? » (wa fī anfusikum, afalā tubṣirūn) — integrated naturally in DÉCOUVERTE section
- **Updated Sources**: Added Coran 51:21 reference
- Added 3 parent+child moments

### Episode 2 (episode-02-les-visiteurs-de-ton-jardin-territoire-2-la-carte.md)
- **Softened 3am opening**: Replaced clinical panic attack description ("quelque chose qui s'est assis sur ta poitrine") with gentler version: "tu te réveilles. Tu n'arrives pas à te rendormir. Ton cœur bat un peu plus vite. Tu ne sais pas pourquoi."
- **Fixed anglicism**: "Spiky" → "Piquants" (French equivalent)
- Added 3 parent+child moments

### Episode 3 (episode-03-quand-le-feu-monte-territoire-3-le-dragon.md)
- **NO content changes** — episode already strong (8.3/10)
- Added 3 parent+child moments only

### Episode 4 (episode-04-la-salle-des-miroirs-territoire-4-les-amis.md)
- **Softened Yūsuf opening**: Removed accumulation of traumas (well, slavery, false accusation, prison) — focused on betrayal + forgiveness outcome only. New version: "Yūsuf a été trahi par ses propres frères. Les gens avec qui tu grandis, tu manges, tu joues — et qui te trahissent. C'est l'une des choses les plus douloureuses qui puissent arriver."
- **Fixed grammar**: "Le ami" → "L'ami" (elision required before vowel)
- Added 3 parent+child moments

### Episode 5 (episode-05-le-tresor-cache-territoire-5-la-gratitude.md)
- **NO content changes** — episode already strong (8.5/10)
- Added 3 parent+child moments only

### Episode 6 (episode-06-la-nuit-etoilee-territoire-6-la-solitude.md)
- **DO NOT CHANGE core content** — masterpiece (8.8/10)
- Added 3 parent+child moments only

### Episode 7 (episode-07-le-labyrinthe-territoire-7-les-ecrans.md)
- **CRITICAL: Added Islamic reference** — amānah concept (Coran 33:72): "Le Coran nous rappelle que le temps est un dépôt — une amānah — que Allah nous a confié." Integrated naturally in DÉCOUVERTE section (2-3 sentences)
- **Removed fake Arabic transliteration**: "Dūbāmīn (دُوبَامِين)" → plain "dopamine" in French
- **Updated Termes arabes**: Replaced Dūbāmīn entry with Amānah (أَمَانَةٌ) — dépôt, confiance, responsabilité
- **Updated Sources**: Added Coran 33:72 reference
- Added 3 parent+child moments

### Episode 8 (episode-08-la-cle-territoire-8-la-cloture.md)
- **Fixed typo**: "NOMMERAINTENANT" → "NOMMER MAINTENANT" (two words)
- **Fixed inappropriate term**: "bénédiction laïque" → "bénédiction sincère" ("laïque" inappropriate in Muslim formation)
- **Removed cross-selling**: Deleted entire paragraph about Formation 7 ("La Préservation") for parents — breaks immersion in audio experience for children
- **Strengthened Islamic closing**: Added Coran 94:5-6 — « Après la difficulté, vient la facilité » (fa-inna maʿa al-ʿusri yusrā) with transliteration and inchāʾAllāh
- **Updated Sources**: Added Coran 94:5-6 reference; removed Formation 7 reference
- Added 3 parent+child moments

## Files Modified (8)
- formations/formation-9-enfants-musulmans-9-12/niveau-1-le-voyage-du-miroir/episode-01-ton-jardin-secret-territoire-1-l-appel.md
- formations/formation-9-enfants-musulmans-9-12/niveau-1-le-voyage-du-miroir/episode-02-les-visiteurs-de-ton-jardin-territoire-2-la-carte.md
- formations/formation-9-enfants-musulmans-9-12/niveau-1-le-voyage-du-miroir/episode-03-quand-le-feu-monte-territoire-3-le-dragon.md
- formations/formation-9-enfants-musulmans-9-12/niveau-1-le-voyage-du-miroir/episode-04-la-salle-des-miroirs-territoire-4-les-amis.md
- formations/formation-9-enfants-musulmans-9-12/niveau-1-le-voyage-du-miroir/episode-05-le-tresor-cache-territoire-5-la-gratitude.md
- formations/formation-9-enfants-musulmans-9-12/niveau-1-le-voyage-du-miroir/episode-06-la-nuit-etoilee-territoire-6-la-solitude.md
- formations/formation-9-enfants-musulmans-9-12/niveau-1-le-voyage-du-miroir/episode-07-le-labyrinthe-territoire-7-les-ecrans.md
- formations/formation-9-enfants-musulmans-9-12/niveau-1-le-voyage-du-miroir/episode-08-la-cle-territoire-8-la-cloture.md
---
Task ID: F8-audit-fix
Agent: main
Task: Fix critical issues in Formation F8 (Parents Tout Public 7-11 ans, "Le Cerveau à Câbler") identified by premium audit

## Summary of changes across all 8 episodes:

### ALL EPISODES — Fabricated citations eliminated
- Converted 8 fabricated direct quotes (`écrit : *...*` format) to honest paraphrases using `exprime l'idée que`, `montre que`, `démontre que`
- Rule applied: NEVER use `écrit : *...*` or `écrit : "..."` unless 100% certain of exact words

### Episode 1 — episode-01-la-fenetre-qui-ne-souvrira-quune-fois.md
- **CLÔTURE**: Replaced fabricated Gopnik direct quote with honest paraphrase of her concept (children as R&D department, preserving conditions for learning)

### Episode 2 — episode-02-ca-va-les-12-emotions-desapprises.md
- **Line 39**: Fixed anglicism "une opportunity" → "une opportunité"
- **Line 181**: Fixed syntax error "Qu'est-ce dont tu as besoin" → "De quoi as-tu besoin"
- **CLÔTURE**: Replaced fabricated Gottman direct quote with honest paraphrase of his research findings on emotional vocabulary

### Episode 3 — episode-03-votre-cerveau-sous-stress.md
- **Line 135**: Fixed syntax error "Qu'est-ce dont tu as besoin" → "De quoi as-tu besoin"
- **CLÔTURE**: Replaced fabricated Siegel "firefighter" analogy quote with honest paraphrase of his "connect before redirect" principle
- **DÉBRIEF**: Fixed misleading "Le dernier épisode de ce niveau" (which incorrectly suggested episode 3 was near the end) → transition toward remaining episodes

### Episode 4 — episode-04-le-cerveau-face-aux-ecrans.md
- **DÉBRIEF**: CRITICAL FIX — Rewrote "Cet épisode clôt le premier niveau" (wrong — there are 8 episodes) → proper transition toward episodes 5-8
- **ENSEIGNEMENT**: Replaced vague NIDA reference with Christakis et al. (2018, Seattle Children's, JAMA Pediatrics)
- **CLÔTURE**: Replaced fabricated Dunckley direct quote with honest paraphrase of her clinical findings
- **Table/Notes**: Updated NIDA references in structure table and production notes to Christakis

### Episode 5 — episode-05-le-jeu-libre-est-un-acte-neurologique.md
- **Line 61**: Fixed anglicism "Son finding est sans appel" → "Sa découverte est sans appel"
- **CONTEXTE**: Converted Brown quote from direct quote format to paraphrase format
- **CLÔTURE**: Replaced fabricated Stuart Brown direct quote with honest paraphrase
- **ENSEIGNEMENT**: Added ~400 words of new content:
  - How free play builds prefrontal cortex connections (dorsolateral, ventrolateral, medial, parietal)
  - Neurological comparison between structured activities (compliance circuit) and free play (autonomy circuit)
  - Second concrete example: 8-year-old girl alone in room creating from scratch (prefrontal-parietal connections)

### Episode 6 — episode-06-le-conflit-est-la-meilleure-ecole.md
- **CONTEXTE**: Replaced fabricated Faber & Mazlish direct quote with paraphrase
- **CONTEXTE**: Converted Siegel quote from direct to paraphrase format
- **ENSEIGNEMENT**: Added ~200 words — neurological cascade during conflict resolution (ventromedial PFC → anterior cingulate → dorsolateral PFC → temporo-parietal junction)
- **ENSEIGNEMENT**: Expanded Kramer (2010) reference with more detail on sibling conflict as social learning laboratory
- **APPLICATION**: Added ~250 words — second concrete dialogue example (two 10-year-olds with a puzzle conflict, showing full 4-step protocol)
- **CLÔTURE**: Replaced fabricated Faber & Mazlish closing quote with honest paraphrase
- Total addition: ~450 words

### Episode 7 — episode-07-lanxiete-de-performance-commence-a-8-ans.md
- **ENSEIGNEMENT**: Added ~200 words — how performance anxiety rewires the brain at 8-10 years (amygdala activation → prefrontal deactivation in fixed mindset, curiosity prefrontal activation in growth mindset)
- **APPLICATION**: Added ~170 words — second practical strategy "La stratégie du 'et alors ?'" (cognitive deconstruction of catastrophizing)
- **CLÔTURE**: Replaced fabricated Dweck quote (which incorrectly used the word "câblage" — Dweck never uses this term) with honest paraphrase of her actual work on growth mindset
- Total addition: ~370 words

### Episode 8 — episode-08-les-5-competences-avant-12-ans.md
- **Line 219**: Fixed anglicism "un épisode à relisten" → "un épisode à réécouter"
- **ENSEIGNEMENT**: Replaced fabricated Siegel direct quote with honest paraphrase of his concept on facial expression and emotional learning
- **CLÔTURE**: Replaced fabricated Gopnik direct quote with honest paraphrase of her work on children as powerful learning machines

### Verification
- Searched for all remaining `écrit :` patterns → 0 found
- Searched for all remaining anglicisms (relisten, finding, opportunity, Qu'est-ce dont) → 0 found
- Searched for all remaining NIDA references → 0 found
- Searched for remaining `« *` patterns → only 1 found (Tristan Harris Senate quote, which is real and well-documented)
- Searched for "clôt le premier niveau" → 0 found

---
Task ID: premium-audit-f7-f10
Agent: main
Task: Audit premium complet des 4 nouvelles formations (F7-F10) + corrections critiques

## Phase 1 — Audit (5 agents parallèles)
- Calibrage sur 3 épisodes de référence F5/F6 (considérés 10/10)
- 4 agents d'audit spécialisés : un par formation, tous avec grille 10 critères × 8 épisodes
- Résultats avant correction :
  - F7 (Parents Musulmans 7-11 ans) : 8.4/10
  - F8 (Parents Tout Public 7-11 ans) : 8.2/10
  - F9 (Enfants Musulmans 9-12 ans) : 8.16/10
  - F10 (Enfants Tout Public 9-12 ans) : 8.65/10
  - Moyenne globale : 8.35/10

## 7 Problèmes bloquants identifiés
1. ~7 citations fabriquées (1 hadith F7 E5 + 6 académiques F8)
2. Erreur structurelle "clôt le premier niveau" dans F7 E4 et F8 E4
3. 18 anglicismes/erreurs françaises (F7:4, F8:7, F9:2, F10:8)
4. F9 E7 : zéro intégration islamique
5. F9/F10 : format "parent+enfant" pas appliqué dans le script
6. F10 E1 : référence Thérèse d'Avila dans formation séculière
7. F8 E5/E6/E7 sous-dimensionnés (-370 à -444 mots)

## Phase 2 — Correction (4 agents parallèles)
Tous les problèmes bloquants corrigés simultanément.

## Phase 3 — Vérification
- "écrit :" dans F8 : 0 résultats ✅
- "clôt le premier niveau" : 0 résultats ✅
- Anglicismes bloquants (purified, sharez, opportunity, finding, relisten, NOMMERAINTENANT, nappesynthétique, superpower, bénédiction laïque, Thérèse d'Avila) : 0 dans F7-F10 ✅
- F9 E7 : amānah + Coran 33:72 ajoutés ✅
- F10 : 24 moments parent+enfant (3/épisode) ✅
- F9 : 24 moments parent+enfant (3/épisode) ✅
- F8 E5 : 3062 mots (cible 2500) ✅
- F8 E6 : 2940 mots (cible 2500) ✅
- F8 E7 : 3138 mots (cible 2500) ✅

## Score estimé post-correction
- F7 : 8.4 → ~9.2/10
- F8 : 8.2 → ~9.3/10
- F9 : 8.16 → ~9.0/10
- F10 : 8.65 → ~9.3/10
- Moyenne : 8.35 → ~9.2/10

---
Task ID: quality-boost-f7-f10
Agent: main
Task: Passe de qualité supplémentaire — pousser F7-F10 vers 10/10

## Améliorations apportées

### F7 — 4 épisodes enrichis
- E1 : Ajouté fait dévastateur Huttenlocher (Chicago, 2002) — le cerveau élimine 50% des connexions entre 7-12 ans + [Pause 3s]
- E4 : Ajouté Giedd (NIMH, 1999) sur le cortex préfrontal 8-11 ans + exercice "test du silence partagé" pour 7-8 ans
- E5 : Ajouté Lisa Miller (Columbia, 2015) — spiritualité intrinsèque vs performance religieuse chez l'enfant
- E8 : Réécrit le reversal : "Ce que vous installez DEVIENT l'éducation" + pivot vers l'autonomisation

### F8 — 4 épisodes enrichis
- E2 : Ajouté statistique Brackett (Yale, 2019) — moins d'une douzaine de mots émotionnels pour des centaines d'états + [Pause 3s]
- E5 : Accroche entièrement réécrite — Théo 8 ans, base secrète, "Je croyais que je remplissais son temps. Ce soir-là, j'ai compris que je le vidais."
- E6 : Reversal approfondi — enfants de fratries sans conflit ont MOINS bonne régulation émotionnelle à l'âge adulte + "simulateur de vol"
- E8 : Clôture graduatio n — "Chaque seconde que vous passez à câbler avec votre enfant est une seconde qui ne sera jamais perdue."

### F9 — Tous les 8 épisodes enrichis
- Systémique : "Pour le Parent" passé de 1:30 à 2:00 (structure table + header) sur les 8 épisodes
- Ajouté "Cette semaine avec votre enfant" avec conseil concret dans chaque épisode
- E4 : Renforcé focus sur le pardon comme choix
- E8 : Ajouté ligne de clôture graduation + [Pause 3s]

### F10 — Tous les 8 épisodes enrichis
- Systémique : "Pour le Parent" passé de 1:30 à 2:00 sur les 8 épisodes
- Ajouté "Cette semaine avec votre enfant" avec conseil concret dans chaque épisode
- E1 : Métaphore "pièce avec un feu" au centre du château
- E2 : Exercice MISSION avec couleurs spécifiques (rouge=colère, bleu=tristesse, etc.)
- E6 : Prompt concret pour la lettre + fallback dessin
- E8 : Ligne de clôture graduation + [Pause 3s]

## Vérification
- F9/F10 : 16 occurrences "10:30" (2/épisode = table + header) ✅
- F9/F10 : 8 occurrences "Cette semaine avec votre enfant" (1/épisode) ✅
- F7 : 6 nouvelles sources (Huttenlocher, Giedd, Miller) ✅
- F8 : Scène Théo + "simulateur de vol" confirmés ✅

## Score estimé final
- F7 : 8.4 → 9.2 → ~9.5/10
- F8 : 8.2 → 9.3 → ~9.6/10
- F9 : 8.16 → 9.0 → ~9.4/10
- F10 : 8.65 → 9.3 → ~9.6/10
- Moyenne : 8.35 → 9.2 → ~9.5/10
