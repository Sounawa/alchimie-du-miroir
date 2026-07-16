'use client'

import { useAppStore } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  Check,
  ChevronRight,
  Clock,
  Crown,
  GraduationCap,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
  Package,
  ArrowRight,
  Shield,
  Gift,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ───────────────────────── DATA ───────────────────────── */

const FORMATIONS = [
  {
    id: 'f1',
    name: 'Musulman Pratiquant',
    public: 'Musulmans pratiquants',
    description: 'Transformation spirituelle par la meditation islamique — Fana, Dhikr, Muraqaba',
    icon: Sparkles,
    color: 'emerald',
    levels: [
      {
        niveau: 'N1',
        label: 'Initiation',
        price: 199,
        episodes: 8,
        words: 18454,
        hours: '~2.3h',
        features: [
          '8 episodes de meditation islamique',
          'Programme 21 jours guide',
          'Fana, Dhikr du coeur, Munajat',
          'Tajalli — quand le verset vous lit',
          'La Beance — le silence ou Dieu se trouve',
          'Exercices pratiques de contemplation',
          'Pieges et blocages identifies',
        ],
      },
      {
        niveau: 'N2',
        label: 'Approfondissement',
        price: 399,
        episodes: 8,
        words: 17320,
        hours: '~2.2h',
        features: [
          '8 episodes — Al-Fatiha en profondeur',
          'Versets 1 a 7 dechiffres niveau par niveau',
          'Tresors coraniques contre la peur et anxiete',
          'Tresors contre la colere et culpabilite',
          'Tresors contre la tristesse et le deuil',
          'Noms divins comme outils de transformation',
          'Pratique quotidienne avancee integree',
        ],
      },
      {
        niveau: 'N3',
        label: 'Maitrise',
        price: 499,
        episodes: 8,
        words: 14450,
        hours: '~1.8h',
        features: [
          '8 episodes de maitrise spirituelle',
          'Fana intensif et point noir identifie',
          'Dhikr du coeur au quotidien',
          'Inversion avancee des pensees',
          'Etats spirituels au travail',
          'Muraqaba — la veille du coeur',
          'Qiyam al-Layl adapte',
          'Programme 40 jours complet',
          'Seance integree de maitrise',
        ],
      },
    ],
  },
  {
    id: 'f2',
    name: 'Musulman Professionnel',
    public: 'Professionnels musulmans',
    description: 'Spiritualite islamique au service du professionnel — application au bureau',
    icon: BriefcaseIcon,
    color: 'amber',
    levels: [
      {
        niveau: 'N1',
        label: 'Initiation Pro',
        price: 199,
        episodes: 8,
        words: 21780,
        hours: '~2.7h',
        features: [
          '8 episodes pour le professionnel musulman',
          '5 regles d\'or pour integrer le dhikr au travail',
          'Fana entre deux reunions',
          'Tajalli — le Coran au bureau',
          'Munajat pour les decisions difficiles',
          'La Beance — le silence au travail',
          'Programme 14 jours d\'integration pro',
          'Pieges du professionnel identifies',
        ],
      },
      {
        niveau: 'N2',
        label: 'Approfondissement Pro',
        price: 399,
        episodes: 8,
        words: 25600,
        hours: '~3.2h',
        features: [
          '8 episodes — Al-Fatiha au bureau',
          'Servitude et guidance au travail (v.4-5)',
          'Deux extremes a eviter (v.6-7)',
          'Tresors contre le burnout et l\'epuisement',
          'Syndrome de l\'imposteur en perspective islamique',
          'Conflits et autorite — l\'approche coranique',
          'Noms divins comme outils de leadership',
          'Pratique integree avancee',
        ],
      },
      {
        niveau: 'N3',
        label: 'Maitrise Pro',
        price: 499,
        episodes: 8,
        words: 21400,
        hours: '~2.7h',
        features: [
          '8 episodes de maitrise professionnelle',
          'Point noir professionnel identifie',
          'Dhikr du coeur au bureau (avance)',
          'Inversion avancee en contexte pro',
          'Etats spirituels au travail (avance)',
          'Qiyam al-Layl adapte pour les pros',
          'Muraqaba professionnelle',
          'Seance integree professionnelle',
          'Programme 40 jours pro',
        ],
      },
    ],
  },
  {
    id: 'f3',
    name: 'Tout Public',
    public: 'Non-musulmans',
    description: 'Spiritualite universelle — presence, lacher-prise et transformation interieure',
    icon: HeartIcon,
    color: 'sky',
    levels: [
      {
        niveau: 'N1',
        label: 'Initiation Universelle',
        price: 199,
        episodes: 8,
        words: 18500,
        hours: '~2.3h',
        features: [
          '8 episodes de spiritualite universelle',
          '5 pratiques fondamentales de presence',
          'Le silence interieur — technique Fana',
          'Tajalli — les moments de clarte',
          'Munajat — le dialogue avec votre sagesse',
          'La Beance — l\'espace de transformation',
          'Programme 14 jours d\'immersion',
          'Pieges et blocages courants',
        ],
      },
      {
        niveau: 'N2',
        label: 'Approfondissement Universel',
        price: 399,
        episodes: 8,
        words: 22300,
        hours: '~2.8h',
        features: [
          '8 episodes d\'approfondissement',
          'Accueillir les emotions sans se laisser submerger',
          'Transformer la peur en force',
          'Relations difficiles — communication et compassion',
          'Le sens de la vie — construire un pourquoi',
          'La resilience — rebondir apres l\'epreuve',
          'Le lacher-prise — detachement et confiance',
          'Pratiques avancees et micro-retraite',
        ],
      },
      {
        niveau: 'N3',
        label: 'Maitrise Universelle',
        price: 499,
        episodes: 8,
        words: 17800,
        hours: '~2.2h',
        features: [
          '8 episodes de maitrise universelle',
          'Votre point faible identifie en profondeur',
          'Presence au quotidien (avance)',
          'Pensees negatives — inversion avancee',
          'Etats de conscience — le Flow et au-dela',
          'Meditation avancee universelle',
          'Routine matinale integrale complete',
          'Programme 40 jours universel',
          'Seance integree de maitrise',
        ],
      },
    ],
  },
  {
    id: 'f4',
    name: 'Pro Tout Public',
    public: 'Professionnels non-musulmans',
    description: 'Spiritualite professionnelle universelle — performance et bien-etre au travail',
    icon: Target,
    color: 'violet',
    levels: [
      {
        niveau: 'N1',
        label: 'Initiation Pro Universelle',
        price: 199,
        episodes: 8,
        words: 21800,
        hours: '~2.7h',
        features: [
          '8 episodes pour le professionnel',
          'Fondations de la spiritualite au travail',
          'Le silence interieur — Fana pour le pro',
          'Tajalli au bureau — moments de clarte',
          'Munajat pour les decisions pro',
          'L\'espace de transformation au travail',
          'Programme 14 jours d\'integration pro',
          'Seance integree d\'initiation pro',
        ],
      },
      {
        niveau: 'N2',
        label: 'Approfondissement Pro Universel',
        price: 399,
        episodes: 8,
        words: 25900,
        hours: '~3.2h',
        features: [
          '8 episodes d\'approfondissement pro',
          'Burnout professionnel — identifier et surmonter',
          'Syndrome de l\'imposteur — depasser',
          'Leadership et empathie au quotidien',
          'Conflits pro — gestion bienveillante',
          'Le sens du travail — reconstruire un pourquoi',
          'Resilience professionnelle avancee',
          'Pratiques avancees et seance integree N2',
        ],
      },
      {
        niveau: 'N3',
        label: 'Maitrise Pro Universelle',
        price: 499,
        episodes: 8,
        words: 22100,
        hours: '~2.8h',
        features: [
          '8 episodes de maitrise pro universelle',
          'Point faible professionnel en profondeur',
          'Presence pro au quotidien (avance)',
          'Pensees negatives — inversion pro',
          'Etats de Flow au travail',
          'Meditation avancee professionnelle',
          'Routine matinale pro complete',
          'Programme 40 jours pro universel',
          'Seance integree de maitrise pro',
        ],
      },
    ],
  },
  {
    id: 'f5',
    name: 'Parents Musulmans',
    public: 'Parents de jeunes musulmans (12-18 ans)',
    description: 'Accompagner votre ado musulman — de la surveillance au compagnonnage spirituel',
    icon: Shield,
    color: 'rose',
    levels: [
      {
        niveau: 'N1',
        label: 'Compagnonnage Spirituel',
        price: 199,
        episodes: 8,
        words: 26000,
        hours: '~2.9h',
        features: [
          '8 episodes pour parents de jeunes musulmans',
          'Tarbiya vs Ta\'dib — cultiver vs surveiller',
          'Le parent comme premier texte que lit l\'ado',
          'Fana adolescent — la foi de l\'enfance qui meurt',
          'Tajalli parental — priere et connexion interieure',
          'Le conflit comme porte d\'entree',
          'L\'angoisse n\'est pas un manque de foi',
          'Le telephone comme revelateur d\'un vide',
        ],
      },
    ],
  },
  {
    id: 'f6',
    name: 'Parents Tout Public',
    public: 'Parents d\'ados (12-18 ans) — tout public',
    description: 'Presence parentale — comprendre, accompagner et transformer la relation avec votre ado',
    icon: Users,
    color: 'teal',
    levels: [
      {
        niveau: 'N1',
        label: 'Presence Parentale',
        price: 199,
        episodes: 8,
        words: 24000,
        hours: '~2.7h',
        features: [
          '8 episodes pour parents d\'ados — tout public',
          'Les trois masques adolescents decodes',
          'Transmission intergenerationnelle des patterns',
          'Syndrome de l\'imposteur a 14 ans',
          'Le corps de l\'ado comme langage',
          'Le rejet comme processus de separation',
          'L\'anxiete comme message a decoder',
          'L\'ennui mort et l\'interiorite perdue',
        ],
      },
    ],
  },
  {
    id: 'f7',
    name: 'Parents Musulmans 7-11',
    public: 'Parents de jeunes musulmans (7-11 ans)',
    description: 'La Preservation — Hifz al-Fitra, preserver la nature originelle de votre enfant',
    icon: Shield,
    color: 'orange',
    levels: [
      {
        niveau: 'N1',
        label: 'La Preservation',
        price: 199,
        episodes: 8,
        words: 22000,
        hours: '~2.7h',
        features: [
          '8 episodes — cadre : Hifz al-Fitra',
          'Fitra : votre enfant a deja tout, votre role est de ne pas le lui enlever',
          'Kazim : retenir la colere (Coran 3:134)',
          'Ghadd al-basar : proteger le regard et l\'attention',
          'Munajat : le dialogue du coeur, pas la recitation',
          'Wasat : la double appartenance sans se dechirer',
          'Adab : la fratrie comme laboratoire',
          'Diagnostic « Radiographie emotionnelle » inclus',
        ],
      },
    ],
  },
  {
    id: 'f8',
    name: 'Parents Tout Public 7-11',
    public: 'Parents d\'enfants (7-11 ans) — tout public',
    description: 'La Preservation — le cerveau se cable en ce moment, ce que vous posez maintenant il l\'habitera toute sa vie',
    icon: Users,
    color: 'cyan',
    levels: [
      {
        niveau: 'N1',
        label: 'La Preservation',
        price: 199,
        episodes: 8,
        words: 21000,
        hours: '~2.7h',
        features: [
          '8 episodes — cadre : le cerveau a cabler',
          'Neuroplasticite critique (Gopnik 2009)',
          'Connecter avant de corriger (Siegel 2011)',
          'Hippocampe reduit de 6-10% (Teicher, Harvard 2016)',
          'Systeme de recompense pirate par les ecrans (NIDA 2018)',
          'Jeu libre = acte neurologique (Brown 2009)',
          'Mindset de croissance (Dweck 2006, Stanford)',
          'Diagnostic « Radiographie emotionnelle » inclus',
        ],
      },
    ],
  },
  {
    id: 'f9',
    name: 'Enfants Musulmans 9-12',
    public: 'Enfants musulmans (9-12 ans) — a ecouter ensemble',
    description: 'Mon Premier Miroir — le voyage a l\'interieur de toi, avec un adulte que tu aimes',
    icon: Gift,
    color: 'pink',
    levels: [
      {
        niveau: 'N1',
        label: 'Le Voyage du Miroir',
        price: 129,
        episodes: 8,
        words: 12000,
        hours: '~1.5h',
        features: [
          '8 episodes (10-12 min) + Journal de Voyage (18 pages)',
          'Le jardin secret — decouvrir son monde interieur',
          'Le dragon de la colere — protocole prophetique',
          'La salle des miroirs — les amitiés qui nourrissent',
          'Le trésor de la shukr — la gratitude comme muscle',
          'La nuit etoilée — le munajat comme conversation secrete',
          'Le labyrinthe d\'ecran — comprendre la dopamine',
          'A faire ensemble, parent et enfant',
        ],
      },
    ],
  },
  {
    id: 'f10',
    name: 'Enfants Tout Public 9-12',
    public: 'Enfants (9-12 ans) — a ecouter ensemble',
    description: 'Mon Premier Miroir — le voyage a l\'interieur de toi, avec un adulte que tu aimes',
    icon: Gift,
    color: 'indigo',
    levels: [
      {
        niveau: 'N1',
        label: 'Le Voyage du Miroir',
        price: 129,
        episodes: 8,
        words: 12000,
        hours: '~1.5h',
        features: [
          '8 episodes (10-12 min) + Journal de Voyage (18 pages)',
          'Le chateau interieur — le gardien de ton cerveau',
          'Le volcan — l\'amygdale et les 3 etapes',
          'Les amis miroirs — le herisson et le renard',
          'Le muscle de la gratitude (Emmons, UC Davis)',
          'La nuit etoilée — le pouvoir de demander de l\'aide',
          'Le labyrinthe d\'ecran — Tristan Harris et le cerveau pirate',
          'A faire ensemble, parent et enfant',
        ],
      },
    ],
  },
]

const PACKS = [
  {
    name: 'Pack Initiation Complet',
    description: 'Les 4 formations adultes N1',
    formations: 4,
    episodes: 32,
    originalPrice: 4 * 199,
    packPrice: 699,
    badge: 'Best value debutant',
    icon: Zap,
    color: 'emerald',
  },
  {
    name: 'Pack Approfondissement Complet',
    description: 'Les 4 formations N2 — transformation profonde',
    formations: 4,
    episodes: 32,
    originalPrice: 4 * 399,
    packPrice: 1299,
    badge: 'Best value avance',
    icon: TrendingUp,
    color: 'amber',
  },
  {
    name: 'Pack Maitrise Complet',
    description: 'Les 4 formations N3 — excellence spirituelle',
    formations: 4,
    episodes: 32,
    originalPrice: 4 * 499,
    packPrice: 1599,
    badge: 'Best value expert',
    icon: Crown,
    color: 'violet',
  },
  {
    name: 'Pack Parents Ados',
    description: 'F5 + F6 — accompagner votre ado (12-18 ans)',
    formations: 2,
    episodes: 16,
    originalPrice: 2 * 199,
    packPrice: 349,
    badge: 'Parents ados',
    icon: Shield,
    color: 'rose',
  },
  {
    name: 'Pack Parents Enfants',
    description: 'F7 + F8 — preserver les fondations (7-11 ans)',
    formations: 2,
    episodes: 16,
    originalPrice: 2 * 199,
    packPrice: 349,
    badge: 'Parents enfants',
    icon: Shield,
    color: 'orange',
  },
  {
    name: 'Pack Enfants',
    description: 'F9 + F10 — le voyage du miroir (9-12 ans)',
    formations: 2,
    episodes: 16,
    originalPrice: 2 * 129,
    packPrice: 199,
    badge: 'Enfants',
    icon: Gift,
    color: 'pink',
  },
  {
    name: 'Pack Famille',
    description: 'F5 a F10 — toute la gamme parents + enfants',
    formations: 6,
    episodes: 48,
    originalPrice: 4 * 199 + 2 * 129,
    packPrice: 749,
    badge: 'Famille',
    icon: HeartIcon,
    color: 'teal',
  },
  {
    name: 'Pack Integral — Tout le Programme',
    description: '155 episodes — les 10 formations completes',
    formations: 10,
    episodes: 155,
    originalPrice: 4 * (199 + 399 + 499) + 4 * 199 + 2 * 129,
    packPrice: 4297,
    badge: 'Investissement complet',
    icon: Star,
    color: 'amber',
  },
]

const OBJECTIONS = [
  {
    objection: "C'est trop cher pour des audios",
    reponse: "Ce ne sont pas de simples audios. Chaque episode est un programme structure de transformation avec des exercices pratiques, des frameworks exclusifs (Fana, Dhikr, Muraqaba, Tajalli, Munajat) et un accompagnement progressif sur 3 niveaux. A 199 euros pour 8 heures de contenu structure, c'est 24,88 euros/heure — inferieur au tarif moyen d'un coach professionnel a 50-150 euros/heure.",
  },
  {
    objection: "Pourquoi N2 est a 399 euros alors que N1 est a 199 euros ?",
    reponse: "N2 va beaucoup plus en profondeur : analyse coranique ligne par ligne, frameworks avances de transformation des emotions, techniques de leadership spirituel, et outils contre le burnout. Le contenu est 2x plus dense et cible des problematiques professionnelles complexes. Le rapport qualite/prix reste excellent a moins de 14 euros/episode.",
  },
  {
    objection: "Je peux trouver du contenu gratuit sur la spiritualite",
    reponse: "Le contenu gratuit est generique et non structure. Ici vous avez un parcours progressif de 155 episodes, des frameworks exclusifs developpes specifiquement pour le croisement spiritualite/profession/parentalite, et une coherence pedagogique qui ne existe nulle part ailleurs. Chaque niveau build sur le precedent pour une transformation reelle et mesurable.",
  },
  {
    objection: "Je ne suis pas sur que ca marchera pour moi",
    reponse: "Le programme est concu avec des resultats progressifs des le niveau 1 : reduction du stress en 14 jours, meilleure concentration au travail, clarte dans les decisions. Les exercices sont pratiques et applicables immediatement. Si vous suivez le programme, les resultats sont garantis par la structure pedagogique elle-meme.",
  },
]

/* ───────────────────────── ICON HELPERS ───────────────────────── */

function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>
    </svg>
  )
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  )
}

/* ───────────────────────── COLOR MAP ───────────────────────── */

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string; card: string; glow: string }> = {
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-800',
    text: 'text-emerald-700 dark:text-emerald-400',
    badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300',
    card: 'bg-emerald-50/50 dark:bg-emerald-950/20',
    glow: 'shadow-emerald-200/50 dark:shadow-emerald-900/30',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    text: 'text-amber-700 dark:text-amber-400',
    badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
    card: 'bg-amber-50/50 dark:bg-amber-950/20',
    glow: 'shadow-amber-200/50 dark:shadow-amber-900/30',
  },
  sky: {
    bg: 'bg-sky-50 dark:bg-sky-950/30',
    border: 'border-sky-200 dark:border-sky-800',
    text: 'text-sky-700 dark:text-sky-400',
    badge: 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300',
    card: 'bg-sky-50/50 dark:bg-sky-950/20',
    glow: 'shadow-sky-200/50 dark:shadow-sky-900/30',
  },
  violet: {
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    border: 'border-violet-200 dark:border-violet-800',
    text: 'text-violet-700 dark:text-violet-400',
    badge: 'bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-300',
    card: 'bg-violet-50/50 dark:bg-violet-950/20',
    glow: 'shadow-violet-200/50 dark:shadow-violet-900/30',
  },
  rose: {
    bg: 'bg-rose-50 dark:bg-rose-950/30',
    border: 'border-rose-200 dark:border-rose-800',
    text: 'text-rose-700 dark:text-rose-400',
    badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300',
    card: 'bg-rose-50/50 dark:bg-rose-950/20',
    glow: 'shadow-rose-200/50 dark:shadow-rose-900/30',
  },
  teal: {
    bg: 'bg-teal-50 dark:bg-teal-950/30',
    border: 'border-teal-200 dark:border-teal-800',
    text: 'text-teal-700 dark:text-teal-400',
    badge: 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300',
    card: 'bg-teal-50/50 dark:bg-teal-950/20',
    glow: 'shadow-teal-200/50 dark:shadow-teal-900/30',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    border: 'border-orange-200 dark:border-orange-800',
    text: 'text-orange-700 dark:text-orange-400',
    badge: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
    card: 'bg-orange-50/50 dark:bg-orange-950/20',
    glow: 'shadow-orange-200/50 dark:shadow-orange-900/30',
  },
  cyan: {
    bg: 'bg-cyan-50 dark:bg-cyan-950/30',
    border: 'border-cyan-200 dark:border-cyan-800',
    text: 'text-cyan-700 dark:text-cyan-400',
    badge: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300',
    card: 'bg-cyan-50/50 dark:bg-cyan-950/20',
    glow: 'shadow-cyan-200/50 dark:shadow-cyan-900/30',
  },
  pink: {
    bg: 'bg-pink-50 dark:bg-pink-950/30',
    border: 'border-pink-200 dark:border-pink-800',
    text: 'text-pink-700 dark:text-pink-400',
    badge: 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300',
    card: 'bg-pink-50/50 dark:bg-pink-950/20',
    glow: 'shadow-pink-200/50 dark:shadow-pink-900/30',
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/30',
    border: 'border-indigo-200 dark:border-indigo-800',
    text: 'text-indigo-700 dark:text-indigo-400',
    badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
    card: 'bg-indigo-50/50 dark:bg-indigo-950/20',
    glow: 'shadow-indigo-200/50 dark:shadow-indigo-900/30',
  },
}

/* ───────────────────────── SUB-COMPONENTS ───────────────────────── */

function PriceCard({ level, formationName, color }: { level: typeof FORMATIONS[0]['levels'][0]; formationName: string; color: string }) {
  const c = colorMap[color] || colorMap.emerald
  const isN1 = level.niveau === 'N1'
  const isN2 = level.niveau === 'N2'
  const isN3 = level.niveau === 'N3'

  const pricePerHour = isN1 ? '24,88' : isN2 ? '13,31' : '13,86'
  const pricePerEpisode = (level.price / level.episodes).toFixed(2)

  return (
    <Card className={cn(
      'relative overflow-hidden border transition-all duration-300 hover:shadow-lg',
      isN3 && 'ring-2 ring-amber-400/50 dark:ring-amber-500/30 shadow-lg',
      c.border,
    )}>
      {isN3 && (
        <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
          Maitrise
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-1">
          <Badge className={cn('text-xs', c.badge, 'border-0')}>
            {level.niveau}
          </Badge>
          <span className="text-sm font-medium text-muted-foreground">{level.label}</span>
        </div>
        <CardTitle className="text-3xl font-black tracking-tight">
          {level.price} <span className="text-base font-normal text-muted-foreground">euros</span>
        </CardTitle>
        <CardDescription className="text-sm">
          {level.episodes} episodes · {level.hours} · {level.words.toLocaleString('fr-FR')} mots
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 rounded-lg bg-muted/60 p-2.5 text-center">
            <div className="text-xs text-muted-foreground">Par episode</div>
            <div className="text-sm font-bold">{pricePerEpisode} euros</div>
          </div>
          <div className="flex-1 rounded-lg bg-muted/60 p-2.5 text-center">
            <div className="text-xs text-muted-foreground">Par heure</div>
            <div className="text-sm font-bold">{pricePerHour} euros</div>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ce qui est inclus</p>
          {level.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <Check className={cn('h-4 w-4 mt-0.5 shrink-0', c.text)} />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className={cn('w-full', isN3 && 'bg-amber-600 hover:bg-amber-700')}>
          Choisir {formationName} {level.niveau}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  )
}

function PackCard({ pack }: { pack: typeof PACKS[0] }) {
  const c = colorMap[pack.color] || colorMap.amber
  const savings = pack.originalPrice - pack.packPrice
  const savingsPercent = Math.round((savings / pack.originalPrice) * 100)
  const isIntegral = pack.episodes === 155

  return (
    <Card className={cn(
      'relative overflow-hidden border transition-all duration-300 hover:shadow-lg',
      isIntegral && 'ring-2 ring-amber-400/50 dark:ring-amber-500/30 shadow-lg',
      c.border,
    )}>
      {isIntegral && (
        <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
          Meilleur investissement
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-1">
          <pack.icon className={cn('h-5 w-5', c.text)} />
          <Badge className={cn('text-xs', c.badge, 'border-0')}>
            {pack.badge}
          </Badge>
        </div>
        <CardTitle className="text-xl font-bold">{pack.name}</CardTitle>
        <CardDescription className="text-sm">{pack.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black">{pack.packPrice.toLocaleString('fr-FR')} euros</span>
          <span className="text-sm text-muted-foreground line-through">{pack.originalPrice.toLocaleString('fr-FR')} euros</span>
        </div>
        <div className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold', c.badge)}>
          <Gift className="h-3.5 w-3.5" />
          Vous economisez {savings.toLocaleString('fr-FR')} euros ({savingsPercent}%)
        </div>
        <div className="flex gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {pack.formations} formations
          </div>
          <div className="flex items-center gap-1">
            <GraduationCap className="h-3.5 w-3.5" />
            {pack.episodes} episodes
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {isIntegral ? '~56h' : `~${(pack.episodes * 0.38).toFixed(1)}h`}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className={cn('w-full', isIntegral && 'bg-amber-600 hover:bg-amber-700')}>
          <Package className="h-4 w-4 mr-2" />
          Choisir ce pack
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  )
}

function ObjectionCard({ item, index }: { item: typeof OBJECTIONS[0]; index: number }) {
  const [open, setOpen] = React.useState(false)
  return (
    <Card className="overflow-hidden cursor-pointer transition-all hover:shadow-md" onClick={() => setOpen(!open)}>
      <CardHeader className="py-4 px-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-muted-foreground">{index + 1}</span>
            </div>
            <p className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">
              {item.objection}
            </p>
          </div>
          <ChevronRight className={cn(
            'h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200',
            open && 'rotate-90'
          )} />
        </div>
      </CardHeader>
      {open && (
        <CardContent className="pt-0 pb-4 px-5">
          <Separator className="mb-3" />
          <div className="flex gap-3">
            <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.reponse}
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

/* ───────────────────────── MAIN COMPONENT ───────────────────────── */

import React from 'react'

export function PricingPage() {
  const totalWords = FORMATIONS.reduce((sum, f) =>
    sum + f.levels.reduce((s, l) => s + l.words, 0), 0
  )
  const totalEpisodes = FORMATIONS.reduce((sum, f) =>
    sum + f.levels.reduce((s, l) => s + l.episodes, 0), 0
  )

  return (
    <ScrollArea className="h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400">
            <Crown className="h-3.5 w-3.5 mr-1.5" />
            10 Formations · 16 Niveaux · 155 Episodes
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 mb-4 tracking-tight">
            Investissez dans votre
            <span className="text-amber-600 dark:text-amber-400"> transformation </span>
            spirituelle
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {totalWords.toLocaleString('fr-FR')} mots de contenu structure, {totalEpisodes} episodes, ~56 heures de formation.
            Un programme unique qui croise spiritualite, parentalite et performance professionnelle.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              {totalEpisodes} episodes
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              ~56 heures
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              4 publics
            </div>
            <div className="flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4" />
              {FORMATIONS.reduce((a, f) => a + f.levels.length, 0)} niveaux
            </div>
          </div>
        </div>

        {/* Pricing Structure Summary */}
        <div className="mb-12 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 text-center">Structure de prix — tous niveaux confondus</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-5 text-center">
              <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-1">N1 — Initiation</div>
              <div className="text-4xl font-black text-emerald-800 dark:text-emerald-300">199 <span className="text-lg font-normal">euros</span></div>
              <div className="text-xs text-muted-foreground mt-2">8 episodes · ~2.3-2.7h par formation</div>
            </div>
            <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-5 text-center">
              <div className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-1">N2 — Approfondissement</div>
              <div className="text-4xl font-black text-amber-800 dark:text-amber-300">399 <span className="text-lg font-normal">euros</span></div>
              <div className="text-xs text-muted-foreground mt-2">8 episodes · ~2.2-3.2h par formation</div>
            </div>
            <div className="rounded-xl bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800 p-5 text-center ring-2 ring-amber-400/40 dark:ring-amber-500/20">
              <div className="text-sm font-semibold text-violet-700 dark:text-violet-400 mb-1">N3 — Maitrise</div>
              <div className="text-4xl font-black text-violet-800 dark:text-violet-300">499 <span className="text-lg font-normal">euros</span></div>
              <div className="text-xs text-muted-foreground mt-2">8 episodes · ~1.8-2.8h par formation</div>
            </div>
          </div>
        </div>

        {/* Tabs: Formations / Packs / Objections */}
        <Tabs defaultValue="formations" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto">
            <TabsTrigger value="formations" className="text-sm">
              <BookOpen className="h-4 w-4 mr-1.5" />
              Formations
            </TabsTrigger>
            <TabsTrigger value="packs" className="text-sm">
              <Package className="h-4 w-4 mr-1.5" />
              Packs
            </TabsTrigger>
            <TabsTrigger value="objections" className="text-sm">
              <Shield className="h-4 w-4 mr-1.5" />
              FAQ
            </TabsTrigger>
          </TabsList>

          {/* ─────── FORMATIONS TAB ─────── */}
          <TabsContent value="formations" className="space-y-12">
            {FORMATIONS.map((formation) => {
              const IconComp = formation.icon
              const c = colorMap[formation.color]
              const fullPrice = formation.levels.reduce((s, l) => s + l.price, 0)

              return (
                <section key={formation.id} id={formation.id}>
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', c.badge)}>
                        <IconComp className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{formation.name}</h3>
                        <p className="text-sm text-muted-foreground">Public : {formation.public}</p>
                      </div>
                      <Badge variant="secondary" className="ml-auto text-xs">
                        Formation complete : {fullPrice} euros
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{formation.description}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {formation.levels.map((level) => (
                      <PriceCard
                        key={level.niveau}
                        level={level}
                        formationName={formation.name}
                        color={formation.color}
                      />
                    ))}
                  </div>
                </section>
              )
            })}
          </TabsContent>

          {/* ─────── PACKS TAB ─────── */}
          <TabsContent value="packs" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Packs multi-formations</h2>
              <p className="text-muted-foreground">
                Jusqu'a 25% de reduction en achetant plusieurs formations ensemble
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PACKS.map((pack) => (
                <PackCard key={pack.name} pack={pack} />
              ))}
            </div>
          </TabsContent>

          {/* ─────── OBJECTIONS TAB ─────── */}
          <TabsContent value="objections" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Questions frequentes</h2>
              <p className="text-muted-foreground">
                Les objections les plus courantes et nos reponses
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {OBJECTIONS.map((item, i) => (
                <ObjectionCard key={i} item={item} index={i} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20 border border-amber-200 dark:border-amber-800 p-8 sm:p-10 text-center">
          <Crown className="h-8 w-8 text-amber-600 dark:text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Pret a commencer votre transformation ?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">
            Choisissez votre formation et votre niveau. Chaque episode est concu pour vous transformer progressivement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8">
              Commencer avec N1 — 199 euros
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline">
              Voir le pack integral — 4 297 euros
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}