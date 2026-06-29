// gen-episodes.js
const fs = require('fs');
const path = require('path');

const BASE = '/home/z/my-project/formations';

function w(path, title, niveau, ton, hook, teaching, practice, exercise, closing, quote, author) {
  const content = `# Formation ${path.split('/')[1]} — L'Alchimie du Miroir
# ${niveau}
## ${path.split('/')[2].split('-').slice(0,2).join('- ')} : ${title}

**Durée cible :** 20 minutes | **Ton :** ${ton} | **Public :** Tout public

---

## STRUCTURE

| Segment | Timestamp | Durée | Contenu |
|---------|-----------|-------|--------|
| Accroche | 0:00 | 2:00 | ${hook} |
| Enseignement | 2:00 | 10:00 | ${teaching} |
| Pratique | 12:00 | 4:00 | ${practice} |
| Exercice | 16:00 | 2:00 | ${exercise} |
| Clôture | 18:00 | 2:00 | ${closing} |

---

## SCRIPT COMPLET

### ACCROCHE (0:00 — 2:00)

${hook}

[Pause 3 secondes]

[Transition musicale]

---

### ENSEIGNEMENT (2:00 — 12:00)

${teaching}

---

### PRATIQUE (12:00 — 16:00)

${practice}

---

### EXERCICE GUIDÉ (16:00 — 18:00)

${exercise}

[Pause 5 secondes]

---

### CLÔTURE (18:00 — 20:00)

${closing}

Votre engagement cette semaine : identifiez votre pratique prioritaire et pratiquez-la.

*« ${quote} »* — ${author}

**À la prochaine.**

[Fin, musique douce, 8 secondes]

---

## NOTES DE PRODUCTION

**Sources :** Synthèse
`;
fs.writeFileSync(path, content);
}

const data = {
  "formation-4-pro-tout-public": [
    ["niveau-1", "Initiation Pro", [
        ["01-pourquoi-spiritualite-pro.md", "Pourquoi la Spiritualité au Travail ?", "Le professionnel moderne est épuisé. Les 5 signes du burnout : fatigue matinale, dimanche trop court, perte de sens, relations qui souffrent, déconnexion de soi. Les 5 pratiques fondamentales.", "Les 5 signes et les 5 pratiques."],
        ["02-fondations-pro.md", "Les Fondations — 5 Règles pour le Pro", "Règle 1 : régularité bat intensité. Règle 2 : micro-pratiques > marathons. Règle 3 : adaptation à la charge. Règle 4 : non-jugement. Règle 5 : patience — résultats en 6-8 semaines.", "Les 5 règles et les 5 piliers pro."],
        ["03-fana-reunions.md", "FANA — L'Effacement Entre Deux Réunions", "Les 3 niveaux du FANA pour le professionnel. Express (30 sec), Standard (2 min), Profond (5 min).", "Les 3 niveaux du FANA pro."],
        ["04-tajalli-bureau.md", "Tajalli — Les Moments de Clarté au Bureau", "Les 7 moments de clarté au travail et le verset-porteur.", "Les 7 Tajalli professionnels."],
        ["05-munajat-decisions.md", "Munajat — Les Décisions Difficiles", "Le dialogue intérieur avec votre sagesse pour les décisions professionnelles. Le protocole en 5 étapes.", "Le protocole Munajat pour les décisions pro."],
        ["06-beance-travail.md", "La Béance — Le Silence au Travail", "Les 3 portes pro : matin (2 min), midi (5 min), retour (3 min). 5 minutes de silence recharge.", "Les 3 portes de la Béance pro."],
        ["07-programme-14-jours-pro.md", "Programme 14 Jours Pro", "14 jours pour intégrer la spiritualité au travail. 3 niveaux de charge : normal (15 min), élevé (10 min), surcharge (5 min).", "Les 14 jours structurés."],
    ], 
    ["niveau-2", "Approfondissement Pro", [
        ["01-burnout-pro.md", "Burnout — Reconnaître, Prévenir, Rebondir", "Le burnout = syndrome clinique (OMS) avec 3 dimensions. Les 4 phases et le protocole de prévention.", "Les 4 phases du burnout."],
        ["02-imposteur-pro.md", "Le Syndrome de l'Imposteur au Travail", "70% des professionnels ont ressenti l'imposteur (Clance & Imes, 1978). 5 signes et 5 solutions.", "Les 5 signes et 5 solutions de l'imposteur pro."],
        ["03-leadership-empathie.md", "Le Leadership par l'Empathie", "L'intelligence émotionnelle compte 2x plus que le QI (Goleman, HBR). Les 4 piliers : auto-conscience, auto-gestion, empathie, compétences sociales.", "Les 4 piliers de l'IE au travail."],
        ["04-conflits-pro.md", "Gérer les Conflits Sans Perdre Sa Dignité", "Le protocole RAPIDE : Respirer, Accueillir, Poser des questions, Investiger, Décider, Exécuter.", "Le protocole RAPIDE."],
        ["05-sens-travail.md", "Le Sens au Travail — Au-Delà du Salaire", "75% des employés désengagés (Gallup). Les 3 dimensions : créativité, contribution, croissance.", "Les 3 dimensions du sens pro."],
        ["06-resilience-pro.md", "La Résilience Professionnelle", "Les professionnels résilients voient l'échec comme des données. 4 piliers : acceptation, sens, connexion, action.", "Les 4 piliers de la résilience pro."],
        ["07-lacher-prise-pro.md", "Le Lâcher-Prise Professionnel", "Les 3 niveaux : résultats, statut, processus.", "Les 3 niveaux du lâcher-prise pro."],
        ["08-seance-n2-pro.md", "La Séance Intégrée Pro", "La routine pro complète : 7h routine (7 min), trajet FANA, 10h Béance, 12h Béance midi, 15h R.A.I.N., 17h scan, 21h journal. 3 niveaux de charge.", "La routine complète et ses 3 niveaux."],
    ],
    ["niveau-3", "Maîtrise Pro", [
        ["01-point-faible-pro.md", "Votre Point Faible Pro", "Le schéma récurrent qui sabote votre carrière. Les 7 profils et le diagnostic.", "Les 7 profils du point faible pro."],
        ["02-presence-pro.md", "La Présence Totale au Travail", "Les 3 piliers : corps, tâche, autre. Les 3 secondes sacrées.", "Les 3 piliers de la présence pro."],
        ["03-pensees-negatives-pro.md", "Les Pensées Négatives Pro", "Le protocole IRIS adapté au bureau.", "Le protocole IRIS pro."],
        ["04-etats-flow-pro.md", "Les États de Flow au Travail", "Les conditions du flow professionnel et comment les créer.", "Les conditions du flow pro."],
        ["05-meditation-avancee-pro.md", "La Méditation Avancée pour le Pro", "Séance du matin + 5 micro-moments pro.", "La séance complète et les micro-moments."],
        ["06-routine-matinale-pro.md", "La Routine du Matin Intégrale du Pro", "La routine complète en 10 minutes et ses 3 niveaux.", "La routine complète du matin pro."],
        ["07-seance-integree-pro.md", "La Séance Intégrée Complète", "3 versions : complète (25 min), express (12 min), urgence (4 min).", "Les 3 versions de la séance intégrée pro."],
        ["08-programme-40-jours-pro.md", "Programme 40 Jours Pro", "40 jours en 4 phases avec 5 piliers quotidiens. Les 10 signes de réussite.", "Les 4 phases et les 5 piliers."],
    ],
};

let count = 0;
for (form, niveaux) in data) {
    for (slug, title, teach, practice) in niveaux) {
        for path in [f"{form}/{niveaux}/{slug}"]:
            count++;
    }
}

console.log(`Created ${count} episodes successfully!`);