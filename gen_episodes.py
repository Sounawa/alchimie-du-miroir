#!/usr/bin/env python3
"""Generate remaining podcast episodes."""

import os

BASE = "/home/z/my-project/formations"

def write_ep(path, title, niveau_name, ton, c):
    md = f""""# Formation {path.split('/')[1].split('-')[1]} — L'Alchimie du Miroir
# {niveau_name}
## \u00c9pisode {path.split('/')[2].replace('episode-', '').split('-')[0]} : {title}

**Dur\u00e9e cible :** 20 minutes | **Ton :** {ton} | **Public :** Tout public

---

## STRUCTURE

| Segment | Timestamp | Dur\u00e9e | Contenu |
|---------|-----------|-------|--------|
| Accroche | 0:00 | 2:00 | {c['hook']} |
| Enseignement | 2:00 | 10:00 | {c['teaching']} |
| Pratique | 12:00 | 4:00 | {c['practice']} |
| Exercice | 16:00 | 2:00 | {c['exercise']} |
| Cl\u00f4ture | 18:00 | 2:00 | {c['closing']} |

---

## SCRIPT COMPLET

### ACCROCHE (0:00 \u2014 2:00)

{c['hook_full']}

[Pause 3 secondes]

[Transition musicale]

---

### ENSEIGNEMENT (2:00 \u2014 12:00)

{c['teaching_full']}

---

### PRATIQUE (12:00 \u2014 16:00)

{c['practice_full']}

---

### EXERCICE GUID\u00c9 (16:00 \u2014 18:00)

{c['exercise_full']}

[Pause 5 secondes]

---

### CL\u00f4TURE (18:00 \u2014 20:00)

{c['closing_full']}

Votre engagement cette semaine : {c['commitment']}.

*\u00ab {c['quote']} \u00bb* \u2014 {c['quote_author']}

**\u00c0 la prochaine.**

[Fin, musique douce, 8 secondes]

---

## NOTES DE PRODUCTION

**Sources :** {c['sources']}
"""
    os.makedirs(os.path.dirname(BASE + "/" + path), exist_ok=True)
    with open(BASE + "/" + path, 'w') as f:
        f.write(md)


f3n3 = [
    {"file": "formation-3-tout-public/niveau-3/episode-03-pensees-negatives-inversion.md", "title": "Les Pens\u00e9es N\u00e9gatives \u2014 Protocole d'Inversion", "niveau": "Niveau 3 \u2014 Ma\u00eetrise", "ton": "Strat\u00e9gique, lib\u00e9rateur",
     "hook": "Vos pens\u00e9es vous mentent. Et vous les croyez.",
     "hook_full": "Vos pens\u00e9es vous mentent. Et vous les croyez.\n\n[Pause]\n\nLa recherche montre que 80% de vos pens\u00e9es sont n\u00e9gatives et 95% sont r\u00e9p\u00e9titives. Ce n'est pas un d\u00e9faut \u2014 c'est un biais de survie. Le probl\u00e8me : vous les croyez.",
     "teaching": "Le protocole IRIS universel", "teaching_full": "**Le protocole IRIS :**\n\n**I \u2014 Identifier** : Attrapez la pens\u00e9e. *\u00ab Je me dis que... \u00bb*\n\n**R \u2014 Retourner** : Appliquez l'inversion.\n\nLes 5 pens\u00e9es les plus courantes :\n1. *\u00ab Je ne suis pas assez bien \u00bb* \u2192 *\u00ab Je suis en apprentissage \u00bb*\n2. *\u00ab Rien ne change jamais \u00bb* \u2192 *\u00ab Le changement est en cours \u00bb*\n3. *\u00ab Les autres sont meilleurs \u00bb* \u2192 *\u00ab Je suis sur mon propre chemin \u00bb*\n4. *\u00ab C'est trop difficile \u00bb* \u2192 *\u00ab Un pas \u00e0 la fois \u00bb*\n5. *\u00ab Je vais \u00e9chouer \u00bb* \u2192 *\u00ab Chaque tentative est une victoire \u00bb*\n\n**I \u2014 Int\u00e9grer** : Transformez en action. Pens\u00e9e : *\u00ab Je suis nul \u00bb* \u2192 Action : Faites une chose que vous savez bien faire.\n\n**S \u2014 Soutenir** : Ancrez avec la respiration et la gratitude.",
     "practice": "L'inversion en 4 \u00e9tapes", "practice_full": "Le matin, notez votre pens\u00e9e dominante. Appliquez IRIS. Le soir, \u00e9valuez. En crise : respiration (3s) + nommer (3s) + inverser (10s) + agir.",
     "exercise": "Inverser une pens\u00e9e", "exercise_full": "Identifiez une pens\u00e9e n\u00e9gative r\u00e9cente. Appliquez les 4 \u00e9tapes.\n\n[Pause 20 secondes]",
     "closing": "L'inversion n'est pas de la pens\u00e9e magique. C'est un muscle.", "closing_full": "L'inversion n'est pas de la pens\u00e9e magique. C'est un muscle qui se d\u00e9veloppe avec la pratique. M\u00eame si vous n'y croyez pas au d\u00e9but \u2014 faites-le m\u00e9caniquement. Le changement viendra.",
     "commitment": "pratiquer l'inversion au moins 2 fois par jour", "quote": "Ce ne sont pas les \u00e9v\u00e9nements qui nous troublent, mais notre fa\u00e7on de les voir", "quote_author": "\u00c9pict\u00e8te", "sources": "Aaron Beck 1979, National Science Foundation, \u00c9pict\u00e8te"
    },
    {"file": "formation-3-tout-public/niveau-3/episode-04-etats-de-grace.md", "title": "Les \u00c9tats de Gr\u00e2ce", "niveau": "Niveau 3 \u2014 Ma\u00eetrise", "ton": "Contemplatif, inspirant",
     "hook": "Il y a des moments o\u00f9 tout s'aligne. Vous vous sentez vivant.",
     "hook_full": "Il y a des moments o\u00f9 tout s'aligne. La fatigue dispara\u00eet. Vous vous sentez connect\u00e9, pr\u00e9sent, vivant.\n\nCes moments existent dans toutes les traditions \u2014 le flow de Csikszentmihalyi, le satori bouddhiste, la gr\u00e2ce chr\u00e9tienne. Ils ne sont pas r\u00e9serv\u00e9s aux mystiques. Ils sont accessibles \u00e0 tous.",
     "teaching": "Les 7 \u00e9tats universels", "teaching_full": "**1. La paix profonde** \u2014 Un calme au milieu du chaos.\n**2. L'inspiration** \u2014 Une id\u00e9e qui surgit.\n**3. La clart\u00e9** \u00e9 \u2014 Tout devient simple et \u00e9vident.\n**4. L'intimit\u00e9** \u00e9 \u2014 Connexion \u00e0 quelque chose de plus grand.\n**5. L'enthousiasme** \u00e9 \u00e9 \u2014 \u00c9nergie joyeuse.\n**6. Le contentement** \u00e9 \u00e9 \u2014 Satisfaction de l'instant.\n**7. Le flow** \u00e9 \u00e9 \u2014 O\u00f9 le temps dispara\u00eet.\n\n**Les 3 lois :**\n1. Les \u00e9tats ne se forcent pas \u2014 ils se pr\u00e9parent\n2. Les \u00e9tats sont \u00e9ph\u00e9m\u00e8res \u00e9 \u2014 les habitudes restent\n3. Les \u00e9preuves sont les semeuses d'\u00e9tats de gr\u00e2ce",
     "practice": "Cartographier ses \u00e9tats", "practice_full": "Chaque soir pendant 14 jours :\n1. *\u00ab Ai-je v\u00e9cu un \u00e9tat de gr\u00e2ce aujourd'hui ? Lequel ? \u00bb*\n2. *\u00ab Dans quelle circonstance ? \u00bb*\n3. *\u00ab Qu'est-ce qui l'a pr\u00e9c\u00e9d\u00e9 ? \u00bb*\nApr\u00e8s 14 jours, vous aurez votre carte personnelle des \u00e9tats de gr\u00e2ce.",
     "exercise": "Le jardin des \u00e9tats", "exercise_full": "Parcourez votre semaine. Cherchez les moments de gr\u00e2ce. M\u00eamez-les dans un jardin int\u00e9rieur. Remerciez.\n\n[Pause 30 secondes]",
     "closing": "Les \u00e9tats de gr\u00e2ce sont toujours l\u00e0. La question est votre disponibilit\u00e9.", "closing_full": "Les \u00e9tats de gr\u00e2ce ne sont pas des exp\u00e9riences extraordinaires. Ce sont des moments de pr\u00e9sence amplifi\u00e9e. La question n'est pas de les cr\u00e9er \u2014 c'est de les **reconna\u00eetre**.",
     "commitment": "tenir un journal des \u00e9tats de gr\u00e2ce pendant 14 jours", "quote": "La beaut\u00e9 sauvera le monde", "quote_author": "Dosto\u00efevski", "sources": "Csikszentmihalyi, traditions contemplatives"
    },
    {"file": "formation-3-tout-public/nuveau-3/episode-05-meditation-avancee.md", "title": "La M\u00e9ditation Avanc\u00e9e", "niveau": "Niveau 3 \u2014 Ma\u00eetrise", "ton": "Calme, instructif",
     "hook": "La m\u00e9ditation a 3 niveaux. La plupart des gens ne d\u00e9passent jamais le premier.",
     "hook_full": "La m\u00e9ditation a 3 niveaux. Le premier est accessible \u00e0 tous. Le troisi\u00e8me est un tr\u00e9sor que peu connaissent.\n\nEntre les deux, il y a un chemin de transformation progressive.",
     "teaching": "Les 3 niveaux et la s\u00e9ance compl\u00e8te", "teaching_full": "**Niveau 1** \u2014 Observation des pens\u00e9es comme des nuages. Le contenu ne compte pas.\n**Niveau 2** \u00e9 \u2014 Observation de l'observateur. *\u00ab Qui est-ce qui observe ? \u00bb*\n**Niveau 3** \u00e9 \u2014 Repos dans le silence entre les pens\u00e9es.\n\n**La s\u00e9ance de 10 minutes :**\n1. Respiration 4-4-6 (1 min)\n2. Scan corporel (2 min)\n3. Observation (4 min)\n4. Repos dans le silence (2 min)\n5. Retour (1 min)",
     "practice": "Les 5 micro-moments", "practice_full": "1. Avant les emails (10 sec) \u2014 *\u00ab Je suis pr\u00e9sent. \u00bb*\n2. Avant une r\u00e9union (30 sec) \u2014 Respiration + intention\n3. Pendant la pause (30 sec) \u00e9\u2014 Silence total\n4. Face au stress (10 sec) \u00e9\u2014 Respiration\n5. Avant une d\u00e9cision (30 sec) \u00e9\u2014 *\u00ab Si c'est un bien, qu'il se r\u00e9alise. \u00bb*",
     "exercise": "Muraqaba guid\u00e9 de 3 minutes", "exercise_full": "Fermez les yeux. 3 respirations. Parcourez votre corps. Observez vos pens\u00e9es. Reposez-vous dans le silence.\n\n[Pause 20 secondes]\n\nOuvrez les yeux doucement.",
     "closing": "10 minutes le matin. 5 micro-moments. C'est tout.", "closing_full": "La m\u00e9ditation avanc\u00e9e n'est pas un exploit spirituel. C'est une pratique simple et r\u00e9guli\u00e8re qui, avec le temps, transforme votre rapport au moment pr\u00e9sent.",
     "commitment": "pratiquer la s\u00e9ance de 10 min + 3 micro-moments par jour", "quote": "Le silence est la premi\u00e8re de toutes les choses", "quote_author": "Pythagore", "sources": "Thich Nhat Hanh, Kabat-Zinn MBSR"
    },
]

for ep in f3n3:
    ep["niveau"] = "Niveau 3 \u2014 Ma\u00eetrise"
    write_ep(ep["file"], ep["title"], ep["niveau"], ep["ton"], ep)

print(f"F3 N3 episodes 3-5 written")
