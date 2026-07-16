'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import {
  Check,
  Sparkles,
  Shield,
  Heart,
  Award,
  Users,
  Clock,
  FileText,
  BookOpen,
  Star,
  Package,
  CircleCheck,
  Minus,
  Layers,
  Brain,
  Target,
  Globe,
  Lightbulb,
  Zap,
  Scale,
  Tag,
} from 'lucide-react'

/* ═══════════════════════════════════════════════════════════
   DATA — Formations à comparer
   ═══════════════════════════════════════════════════════════ */

interface FormationData {
  id: string
  name: string
  subtitle: string
  audience: string
  color: string
  bgClass: string
  borderClass: string
  textClass: string
  badgeBg: string
  badgeText: string
  badge?: { label: string; variant: 'populaire' | 'recommandé' }
  levels: { name: string; price: number }[]
  total: number
  duration: string
  words: string
  features: {
    referencesCoraniques: boolean
    referencesInterculturelles: boolean
    outilsProfessionnels: boolean
  }
  pointsForts: string[]
  icon: React.ReactNode
}

const FORMATIONS: FormationData[] = [
  {
    id: 'F1',
    name: 'F1 — Musulman',
    subtitle: 'Standard',
    audience: 'Public musulman pratiquant',
    color: 'emerald',
    bgClass: 'bg-emerald-50 dark:bg-emerald-950/30',
    borderClass: 'border-emerald-500',
    textClass: 'text-emerald-700 dark:text-emerald-400',
    badgeBg: 'bg-emerald-500',
    badgeText: 'text-white',
    badge: { label: 'POPULAIRE', variant: 'populaire' },
    levels: [
      { name: 'N1 Initiation', price: 67 },
      { name: 'N2 Approfondissement', price: 97 },
      { name: 'N3 Intégration', price: 127 },
    ],
    total: 291,
    duration: '~9,4h',
    words: '69 961 mots',
    features: {
      referencesCoraniques: true,
      referencesInterculturelles: false,
      outilsProfessionnels: false,
    },
    pointsForts: [
      'Références coraniques & hadiths',
      "Du'as intégrés",
      'Termes arabes expliqués',
      '4 piliers : Fana, Tajalli, Munajat, Béance',
    ],
    icon: <Star className="h-4 w-4" />,
  },
  {
    id: 'F2',
    name: 'F2 — Musulman Pro',
    subtitle: 'Professionnel',
    audience: 'Coaches / thérapeutes musulmans',
    color: 'amber',
    bgClass: 'bg-amber-50 dark:bg-amber-950/30',
    borderClass: 'border-amber-500',
    textClass: 'text-amber-700 dark:text-amber-400',
    badgeBg: 'bg-amber-500',
    badgeText: 'text-white',
    badge: { label: 'RECOMMANDÉ', variant: 'recommandé' },
    levels: [
      { name: 'N1 Initiation', price: 97 },
      { name: 'N2 Approfondissement', price: 127 },
      { name: 'N3 Intégration', price: 167 },
    ],
    total: 391,
    duration: '~11,2h',
    words: '82 473 mots (+18 %)',
    features: {
      referencesCoraniques: true,
      referencesInterculturelles: false,
      outilsProfessionnels: true,
    },
    pointsForts: [
      'Tout le contenu F1 inclus',
      '7 Points Noirs Pro',
      'Protocole Ombre',
      'Scan Récupération',
      'Protocole RACINE',
      'Cadre SRSP',
      'Outils cliniques dédiés',
    ],
    icon: <Shield className="h-4 w-4" />,
  },
  {
    id: 'F3',
    name: 'F3 — Tout Public',
    subtitle: 'Standard',
    audience: 'Intéressés par le développement spirituel',
    color: 'sky',
    bgClass: 'bg-sky-50 dark:bg-sky-950/30',
    borderClass: 'border-sky-500',
    textClass: 'text-sky-700 dark:text-sky-400',
    badgeBg: 'bg-sky-500',
    badgeText: 'text-white',
    levels: [
      { name: 'N1 Initiation', price: 67 },
      { name: 'N2 Approfondissement', price: 97 },
      { name: 'N3 Intégration', price: 127 },
    ],
    total: 291,
    duration: '~8,8h',
    words: '70 975 mots',
    features: {
      referencesCoraniques: false,
      referencesInterculturelles: true,
      outilsProfessionnels: false,
    },
    pointsForts: [
      'Sagesse universelle',
      'Bouddhisme, taoïsme, yoruba',
      'Sans références religieuses spécifiques',
      'Accessible à tous',
    ],
    icon: <Globe className="h-4 w-4" />,
  },
  {
    id: 'F4',
    name: 'F4 — Pro Tout Public',
    subtitle: 'Professionnel',
    audience: 'Coaches / thérapeutes tout public',
    color: 'rose',
    bgClass: 'bg-rose-50 dark:bg-rose-950/30',
    borderClass: 'border-rose-500',
    textClass: 'text-rose-700 dark:text-rose-400',
    badgeBg: 'bg-rose-500',
    badgeText: 'text-white',
    levels: [
      { name: 'N1 Initiation', price: 97 },
      { name: 'N2 Approfondissement', price: 127 },
      { name: 'N3 Intégration', price: 167 },
    ],
    total: 391,
    duration: '~9h',
    words: '75 374 mots',
    features: {
      referencesCoraniques: false,
      referencesInterculturelles: true,
      outilsProfessionnels: true,
    },
    pointsForts: [
      'Tout le contenu F3 inclus',
      'Outils professionnels adaptés',
      'Cadres cliniques séculiers',
      'Pratique coaching & thérapie',
    ],
    icon: <Brain className="h-4 w-4" />,
  },
]

/* ═══════════════════════════════════════════════════════════
   PACKS DATA
   ═══════════════════════════════════════════════════════════ */

interface PackData {
  name: string
  description: string
  formations: string
  price: number
  normalPrice: number
  savings: number
  icon: React.ReactNode
  color: string
  bgClass: string
  stripeClass: string
  borderClass: string
  textClass: string
}

const PACKS: PackData[] = [
  {
    name: 'Pack Musulman',
    description: 'F1 + F2 — Version complète musulmane',
    formations: 'F1 + F2',
    price: 497,
    normalPrice: 682,
    savings: 185,
    icon: <BookOpen className="h-5 w-5" />,
    color: 'emerald',
    bgClass: 'bg-emerald-50 dark:bg-emerald-950/20',
    stripeClass: 'bg-emerald-500',
    borderClass: 'border-emerald-200 dark:border-emerald-800',
    textClass: 'text-emerald-700 dark:text-emerald-400',
  },
  {
    name: 'Pack Tout Public',
    description: 'F3 + F4 — Version complète séculière',
    formations: 'F3 + F4',
    price: 497,
    normalPrice: 682,
    savings: 185,
    icon: <Globe className="h-5 w-5" />,
    color: 'sky',
    bgClass: 'bg-sky-50 dark:bg-sky-950/20',
    stripeClass: 'bg-sky-500',
    borderClass: 'border-sky-200 dark:border-sky-800',
    textClass: 'text-sky-700 dark:text-sky-400',
  },
  {
    name: 'Pack Intégral',
    description: 'F1 + F2 + F3 + F4 — L\'ensemble complet',
    formations: 'F1 + F2 + F3 + F4',
    price: 697,
    normalPrice: 1364,
    savings: 667,
    icon: <Sparkles className="h-5 w-5" />,
    color: 'amber',
    bgClass: 'bg-amber-50 dark:bg-amber-950/20',
    stripeClass: 'bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500',
    borderClass: 'border-amber-200 dark:border-amber-800',
    textClass: 'text-amber-700 dark:text-amber-400',
  },
]

/* ═══════════════════════════════════════════════════════════
   COMPARISON ROWS DEFINITION
   ═══════════════════════════════════════════════════════════ */

interface ComparisonRow {
  label: string
  icon: React.ReactNode
  render: (f: FormationData) => React.ReactNode
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    label: 'Public cible',
    icon: <Users className="h-4 w-4" />,
    render: (f) => <span className="text-sm font-medium">{f.audience}</span>,
  },
  {
    label: "Nombre d'épisodes",
    icon: <Layers className="h-4 w-4" />,
    render: () => (
      <span className="text-sm">
        96 <span className="text-muted-foreground text-xs">(3 niveaux × 8 épisodes)</span>
      </span>
    ),
  },
  {
    label: 'Durée totale audio',
    icon: <Clock className="h-4 w-4" />,
    render: (f) => <span className="text-sm font-semibold">{f.duration}</span>,
  },
  {
    label: 'Volume de contenu',
    icon: <FileText className="h-4 w-4" />,
    render: (f) => <span className="text-sm">{f.words}</span>,
  },
  {
    label: 'Prix N1 Initiation',
    icon: <Tag className="h-4 w-4" />,
    render: (f) => <span className="text-sm font-semibold">{f.levels[0].price}€</span>,
  },
  {
    label: 'Prix N2 Approfondissement',
    icon: <Tag className="h-4 w-4" />,
    render: (f) => <span className="text-sm font-semibold">{f.levels[1].price}€</span>,
  },
  {
    label: 'Prix N3 Intégration',
    icon: <Tag className="h-4 w-4" />,
    render: (f) => <span className="text-sm font-semibold">{f.levels[2].price}€</span>,
  },
  {
    label: 'Prix formation complète',
    icon: <Zap className="h-4 w-4" />,
    render: (f) => <span className="text-sm font-bold">{f.total}€</span>,
  },
  {
    label: 'Références coraniques',
    icon: <BookOpen className="h-4 w-4" />,
    render: (f) =>
      f.features.referencesCoraniques ? (
        <CircleCheck className="h-5 w-5 text-emerald-500" />
      ) : (
        <Minus className="h-5 w-5 text-stone-300 dark:text-stone-600" />
      ),
  },
  {
    label: 'Références interculturelles',
    icon: <Globe className="h-4 w-4" />,
    render: (f) =>
      f.features.referencesInterculturelles ? (
        <CircleCheck className="h-5 w-5 text-emerald-500" />
      ) : (
        <Minus className="h-5 w-5 text-stone-300 dark:text-stone-600" />
      ),
  },
  {
    label: 'Outils professionnels',
    icon: <Target className="h-4 w-4" />,
    render: (f) =>
      f.features.outilsProfessionnels ? (
        <CircleCheck className="h-5 w-5 text-emerald-500" />
      ) : (
        <Minus className="h-5 w-5 text-stone-300 dark:text-stone-600" />
      ),
  },
  {
    label: 'Points forts',
    icon: <Lightbulb className="h-4 w-4" />,
    render: (f) => (
      <ul className="space-y-1 text-left">
        {f.pointsForts.map((pt, i) => (
          <li key={i} className="flex items-start gap-1.5 text-xs leading-tight">
            <Check className={cn('h-3 w-3 mt-0.5 shrink-0', f.textClass)} />
            <span>{pt}</span>
          </li>
        ))}
      </ul>
    ),
  },
]

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */

export function FormationComparison() {
  return (
    <div className="view-enter space-y-8">
      {/* ── Header ── */}
      <section className="section-reveal text-center space-y-3">
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Scale className="h-4 w-4" />
          <span>Analyse détaillée</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Comparaison des Formations
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
          Explorez les 4 formations d&apos;«&nbsp;L&apos;Alchimie du Miroir&nbsp;» côte à côte.
          Chaque voie est conçue pour un public et un objectif spécifique — trouvez celle qui vous correspond.
        </p>
      </section>

      {/* ── Desktop: Table matrix ── */}
      <section className="section-reveal hidden lg:block">
        <ScrollArea className="w-full">
          <div className="min-w-[900px]">
            <table className="pricing-table w-full border-collapse text-center">
              <thead>
                <tr>
                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b w-52">
                    Critère
                  </th>
                  {FORMATIONS.map((f) => (
                    <th
                      key={f.id}
                      className={cn(
                        'p-4 border-b border-l first:border-l-0',
                        f.bgClass
                      )}
                    >
                      <div className="flex flex-col items-center gap-2">
                        {f.badge && (
                          <Badge
                            className={cn(
                              'text-[10px] font-bold tracking-widest px-2.5 py-0.5',
                              f.badgeBg,
                              f.badgeText
                            )}
                          >
                            {f.badge.variant === 'recommandé' && (
                              <Sparkles className="h-3 w-3 mr-0.5" />
                            )}
                            {f.badge.variant === 'populaire' && (
                              <Heart className="h-3 w-3 mr-0.5" />
                            )}
                            {f.badge.label}
                          </Badge>
                        )}
                        <div className={cn('flex items-center gap-2', f.textClass)}>
                          {f.icon}
                          <span className="font-bold text-sm">{f.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{f.subtitle}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="audit-table-zebra">
                {COMPARISON_ROWS.map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-b border-border/50">
                    <td className="p-3 text-left border-r border-border/50">
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        {row.icon}
                        {row.label}
                      </div>
                    </td>
                    {FORMATIONS.map((f) => (
                      <td
                        key={f.id}
                        className="p-3 border-l border-border/30 align-top"
                      >
                        {row.render(f)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </section>

      {/* ── Mobile / Tablet: Card-based layout ── */}
      <section className="section-reveal lg:hidden space-y-4">
        {FORMATIONS.map((f) => (
          <Card key={f.id} className="card-hover-lift overflow-hidden">
            {/* Card Header with color stripe */}
            <div className={cn('h-1.5 w-full', f.badgeBg)} />
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-lg',
                      f.bgClass,
                      f.textClass
                    )}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <CardTitle className="text-base">{f.name}</CardTitle>
                    <CardDescription className="text-xs">{f.subtitle}</CardDescription>
                  </div>
                </div>
                {f.badge && (
                  <Badge
                    className={cn(
                      'text-[10px] font-bold tracking-widest px-2 py-0.5',
                      f.badgeBg,
                      f.badgeText
                    )}
                  >
                    {f.badge.variant === 'recommandé' && (
                      <Sparkles className="h-3 w-3 mr-0.5" />
                    )}
                    {f.badge.variant === 'populaire' && (
                      <Heart className="h-3 w-3 mr-0.5" />
                    )}
                    {f.badge.label}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className={cn('rounded-lg p-3', f.bgClass)}>
                  <div className="text-xs text-muted-foreground mb-1">Durée totale</div>
                  <div className={cn('text-sm font-bold', f.textClass)}>{f.duration}</div>
                </div>
                <div className={cn('rounded-lg p-3', f.bgClass)}>
                  <div className="text-xs text-muted-foreground mb-1">Volume</div>
                  <div className={cn('text-sm font-bold', f.textClass)}>{f.words}</div>
                </div>
              </div>

              {/* Audience */}
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <Users className="h-3 w-3" />
                  Public cible
                </div>
                <p className="text-sm font-medium">{f.audience}</p>
              </div>

              {/* Pricing */}
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                  <Zap className="h-3 w-3" />
                  Tarifs par niveau
                </div>
                <div className="space-y-1.5">
                  {f.levels.map((lv) => (
                    <div
                      key={lv.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted-foreground">{lv.name}</span>
                      <span className="font-semibold">{lv.price}€</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-1.5 border-t border-border/50 text-sm">
                    <span className="font-medium">Formation complète</span>
                    <span className={cn('font-bold', f.textClass)}>{f.total}€</span>
                  </div>
                </div>
              </div>

              {/* Features checklist */}
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                  <Check className="h-3 w-3" />
                  Caractéristiques
                </div>
                <div className="space-y-1.5">
                  <FeatureCheck
                    label="Références coraniques"
                    checked={f.features.referencesCoraniques}
                  />
                  <FeatureCheck
                    label="Références interculturelles"
                    checked={f.features.referencesInterculturelles}
                  />
                  <FeatureCheck
                    label="Outils professionnels"
                    checked={f.features.outilsProfessionnels}
                  />
                </div>
              </div>

              {/* Points forts */}
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                  <Lightbulb className="h-3 w-3" />
                  Points forts
                </div>
                <ul className="space-y-1">
                  {f.pointsForts.map((pt, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs leading-tight">
                      <Check className={cn('h-3 w-3 mt-0.5 shrink-0', f.textClass)} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* ── Pack Pricing Summary ── */}
      <section className="section-reveal space-y-4">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Package className="h-4 w-4" />
            <span>Packs combinés</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight">
            Formules Packs — Économisez davantage
          </h3>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Combinez plusieurs formations et bénéficiez de tarifs préférentiels exclusifs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PACKS.map((pack) => (
            <Card
              key={pack.name}
              className={cn(
                'card-hover-lift overflow-hidden border',
                pack.borderClass
              )}
            >
              <div className={cn('h-1.5 w-full', pack.stripeClass)} />
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-lg',
                      pack.bgClass,
                      pack.textClass
                    )}
                  >
                    {pack.icon}
                  </div>
                  <div>
                    <CardTitle className="text-base">{pack.name}</CardTitle>
                    <CardDescription className="text-xs">{pack.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className={cn('text-2xl font-bold', pack.textClass)}>
                    {pack.price}€
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    {pack.normalPrice}€
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    Économisez {pack.savings}€
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Formations incluses : <span className="font-medium text-foreground">{pack.formations}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════ */

function FeatureCheck({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      {checked ? (
        <CircleCheck className="h-4 w-4 text-emerald-500" />
      ) : (
        <Minus className="h-4 w-4 text-stone-300 dark:text-stone-600" />
      )}
    </div>
  )
}

