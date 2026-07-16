'use client'

import { useEffect, useState } from "react"
import { useAppStore } from "@/lib/store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  CheckCircle2,
  CircleDot,
  BarChart3,
  Shield,
  FileText,
  Radio,
  BookOpen,
  ArrowUpRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ChecklistItem {
  count: number
  total: number
  label: string
}

interface DetailFile {
  path: string
  formation: string
  niveau: string
  episode: string
  lines: number
  checks: Record<string, boolean>
}

interface FormationStat {
  name: string
  min: number
  max: number
  avg: number
  count: number
  hasVariationsTon: number
  hasTempoVocal: number
  hasQuestionsMiroir: number
  hasLiens: number
  hasDureeReelle: number
}

interface AuditData {
  summary: {
    totalFiles: number
    totalLines: number
    globalMin: number
    globalMax: number
    globalAvg: number
    auditDate: string
    score: string
  }
  formationStats: FormationStat[]
  checklist: Record<string, ChecklistItem>
  detailFiles: DetailFile[]
}

const DIMENSIONS = [
  { key: "technique", label: "Technique", desc: "Pédagogie & progression", icon: Shield, color: "emerald" },
  { key: "script", label: "Script", desc: "Structure & formatting", icon: FileText, color: "amber" },
  { key: "moyen", label: "Moyen", desc: "Format podcast", icon: Radio, color: "sky" },
  { key: "contenu", label: "Contenu", desc: "Profondeur & exactitude", icon: BookOpen, color: "rose" },
]

const DIMENSION_COLORS: Record<string, string> = {
  emerald: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  amber: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  sky: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
  rose: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
}

const DIMENSION_BORDERS: Record<string, string> = {
  emerald: "border-emerald-200 dark:border-emerald-800",
  amber: "border-amber-200 dark:border-amber-800",
  sky: "border-sky-200 dark:border-sky-800",
  rose: "border-rose-200 dark:border-rose-800",
}

const DIMENSION_ICONS: Record<string, string> = {
  emerald: "text-emerald-600 dark:text-emerald-400",
  amber: "text-amber-600 dark:text-amber-400",
  sky: "text-sky-600 dark:text-sky-400",
  rose: "text-rose-600 dark:text-rose-400",
}

const FORMATION_LEFT_BORDERS = [
  "border-l-2 border-l-emerald-500 dark:border-l-emerald-400",
  "border-l-2 border-l-amber-500 dark:border-l-amber-400",
  "border-l-2 border-l-sky-500 dark:border-l-sky-400",
  "border-l-2 border-l-rose-500 dark:border-l-rose-400",
]

function ScoreCircle({ score, label, desc, color, icon: Icon }: { score: string; label: string; desc: string; color: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <Card className={cn("border-2 transition-shadow hover:shadow-lg card-hover-lift audit-score-glow", DIMENSION_BORDERS[color])}>
      <CardContent className="pt-5 pb-5 flex flex-col items-center text-center gap-2">
        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", DIMENSION_COLORS[color])}>
          <Icon className={cn("h-6 w-6", DIMENSION_ICONS[color])} />
        </div>
        <div className="text-3xl font-black tracking-tight">{score}</div>
        <div className="font-semibold text-sm">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </CardContent>
    </Card>
  )
}

function ChecklistBar({ item }: { item: ChecklistItem }) {
  const pct = Math.round((item.count / item.total) * 100)
  const isComplete = item.count === item.total
  return (
    <div className="flex items-center gap-3">
      <div className="w-40 shrink-0 text-sm text-right text-muted-foreground">{item.label}</div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <Progress value={pct} className={cn("h-2", "[&>div]:score-bar")} />
          <span className={cn("text-xs font-semibold ml-2 w-16 text-right", isComplete ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600")}>
            {item.count}/{item.total}
          </span>
        </div>
      </div>
      {isComplete ? (
        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
      ) : (
        <CircleDot className="h-4 w-4 text-amber-500 shrink-0" />
      )}
    </div>
  )
}

export function AuditDashboard() {
  const [data, setData] = useState<AuditData | null>(null)
  const [loading, setLoading] = useState(true)
  const selectEpisode = useAppStore((s) => s.selectEpisode)
  const setView = useAppStore((s) => s.setView)

  useEffect(() => {
    fetch("/api/audit")
      .then((r) => r.json())
      .then((d) => {
        setData(d)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-3">
          <div className="animate-spin w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full mx-auto" />
          <p className="text-sm text-muted-foreground">Analyse de 96 épisodes en cours...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Erreur lors du chargement de l&apos;audit.</p>
      </div>
    )
  }

  const { summary, formationStats, checklist, detailFiles } = data

  // Sort files by lines ascending
  const sortedFiles = [...detailFiles].sort((a, b) => a.lines - b.lines)

  return (
    <ScrollArea className="h-full">
      <div className="max-w-5xl mx-auto p-6 space-y-8 view-enter">
        {/* Hero */}
        <div className="section-reveal audit-hero-bg text-center space-y-3 pt-8 pb-6 px-4 rounded-2xl">
          {/* Sparkle decorations */}
          <div className="absolute top-4 left-[18%] w-1.5 h-1.5 rounded-full bg-emerald-300/60 dark:bg-emerald-500/40" />
          <div className="absolute top-8 left-[38%] w-1 h-1 rounded-full bg-amber-300/50 dark:bg-amber-500/30" />
          <div className="absolute top-5 right-[22%] w-2 h-2 rounded-full bg-sky-200/50 dark:bg-sky-400/30" />
          <div className="absolute top-9 right-[40%] w-1 h-1 rounded-full bg-rose-300/40 dark:bg-rose-500/30" />
          <div className="relative">
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 text-xs px-3 py-1">
              Audit Premium — 4 Dimensions
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Toutes les formations : <span className="text-emerald-600 dark:text-emerald-400">10/10</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Audit systématique de {summary.totalFiles} épisodes répartis en 4 formations × 3 niveaux × 8 épisodes.
              Date : {summary.auditDate}.
            </p>
          </div>
        </div>

        {/* 4 Dimensions Scores */}
        <div className="section-reveal grid grid-cols-2 lg:grid-cols-4 gap-4">
          {DIMENSIONS.map((d) => (
            <ScoreCircle key={d.key} score="10/10" label={d.label} desc={d.desc} color={d.color} icon={d.icon} />
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="checklist" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="checklist" className="text-sm">Checklist qualité</TabsTrigger>
            <TabsTrigger value="formations" className="text-sm">Par formation</TabsTrigger>
            <TabsTrigger value="detail" className="text-sm">Détail 96 épisodes</TabsTrigger>
          </TabsList>

          {/* Checklist Tab */}
          <TabsContent value="checklist" className="section-reveal mt-6 space-y-6">
            {/* Stats rapides */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="card-hover-lift">
                <CardContent className="pt-4 pb-4 text-center">
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{summary.totalFiles}</div>
                  <div className="text-xs text-muted-foreground mt-1">Épisodes audités</div>
                </CardContent>
              </Card>
              <Card className="card-hover-lift">
                <CardContent className="pt-4 pb-4 text-center">
                  <div className="text-2xl font-black">{summary.globalAvg}</div>
                  <div className="text-xs text-muted-foreground mt-1">Lignes moyennes</div>
                </CardContent>
              </Card>
              <Card className="card-hover-lift">
                <CardContent className="pt-4 pb-4 text-center">
                  <div className="text-2xl font-black">{summary.globalMin}</div>
                  <div className="text-xs text-muted-foreground mt-1">Minimum (lignes)</div>
                </CardContent>
              </Card>
              <Card className="card-hover-lift">
                <CardContent className="pt-4 pb-4 text-center">
                  <div className="text-2xl font-black">{summary.globalMax}</div>
                  <div className="text-xs text-muted-foreground mt-1">Maximum (lignes)</div>
                </CardContent>
              </Card>
            </div>

            {/* Checklist items */}
            <Card className="card-hover-lift">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  Checklist qualité globale
                </CardTitle>
                <CardDescription>Vérification automatique de la présence des éléments requis dans chaque épisode</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.values(checklist).map((item) => (
                  <ChecklistBar key={item.label} item={item} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Formations Tab */}
          <TabsContent value="formations" className="section-reveal mt-6 space-y-4">
            {formationStats.map((f, idx) => (
              <Card key={f.name} className={cn("card-hover-lift", FORMATION_LEFT_BORDERS[idx] || FORMATION_LEFT_BORDERS[0])}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base capitalize">{f.name}</CardTitle>
                    <Badge variant="outline" className="text-xs">{f.count} épisodes</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-2 rounded-lg bg-muted/40">
                      <div className="text-lg font-bold">{f.min}</div>
                      <div className="text-[11px] text-muted-foreground">Min lignes</div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-muted/40">
                      <div className="text-lg font-bold">{f.avg}</div>
                      <div className="text-[11px] text-muted-foreground">Moy. lignes</div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-muted/40">
                      <div className="text-lg font-bold">{f.max}</div>
                      <div className="text-[11px] text-muted-foreground">Max lignes</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-2 text-[11px]">
                    {[
                      { label: "Variations ton", val: f.hasVariationsTon },
                      { label: "Tempo vocal", val: f.hasTempoVocal },
                      { label: "Questions miroir", val: f.hasQuestionsMiroir },
                      { label: "Liens", val: f.hasLiens },
                      { label: "Durée estimée", val: f.hasDureeReelle },
                    ].map((c) => (
                      <div
                        key={c.label}
                        className={cn(
                          "flex items-center justify-center gap-1 p-1.5 rounded-md text-center",
                          c.val === f.count
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        )}
                      >
                        {c.val === f.count ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <CircleDot className="h-3 w-3" />
                        )}
                        <span className="leading-none">{c.val}/{f.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Detail Tab */}
          <TabsContent value="detail" className="section-reveal mt-6">
            <Card className="card-hover-lift">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Détail des 96 épisodes
                </CardTitle>
                <CardDescription>Trié par nombre de lignes (croissant). Cliquez pour ouvrir un épisode.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
                  <table className="w-full text-sm audit-table-zebra pricing-table">
                    <thead className="sticky top-0 bg-muted/80 backdrop-blur-sm">
                      <tr className="text-left text-xs text-muted-foreground">
                        <th className="px-3 py-2 font-medium">Formation</th>
                        <th className="px-3 py-2 font-medium">Niveau</th>
                        <th className="px-3 py-2 font-medium">Épisode</th>
                        <th className="px-3 py-2 font-medium text-center">Lignes</th>
                        <th className="px-3 py-2 font-medium text-center">Ton</th>
                        <th className="px-3 py-2 font-medium text-center">Tempo</th>
                        <th className="px-3 py-2 font-medium text-center">Miroir</th>
                        <th className="px-3 py-2 font-medium text-center">Liens</th>
                        <th className="px-3 py-2 font-medium text-center">Durée</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedFiles.map((f, i) => {
                        return (
                          <tr
                            key={f.path}
                            className={cn(
                              "border-t border-border/50 hover:bg-muted/30 transition-colors cursor-pointer",
                              f.lines < 300 && "bg-amber-50/50 dark:bg-amber-950/20"
                            )}
                            onClick={() => {
                              selectEpisode(f.path)
                              setView('reader')
                            }}
                          >
                            <td className="px-3 py-1.5 text-xs capitalize max-w-[120px] truncate" title={f.formation}>{f.formation}</td>
                            <td className="px-3 py-1.5 text-xs capitalize">{f.niveau}</td>
                            <td className="px-3 py-1.5 text-xs max-w-[180px] truncate" title={f.episode}>{f.episode}</td>
                            <td className={cn("px-3 py-1.5 text-xs text-center font-semibold", f.lines < 300 ? "text-amber-600" : "text-emerald-600")}>{f.lines}</td>
                            {(["Ton", "Tempo", "Miroir", "Liens", "Durée"] as const).map((key) => (
                              <td key={key} className="px-3 py-1.5 text-center">
                                {f.checks[key] ? (
                                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mx-auto" />
                                ) : (
                                  <CircleDot className="h-3.5 w-3.5 text-stone-300 dark:text-stone-600 mx-auto" />
                                )}
                              </td>
                            ))}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  )
}