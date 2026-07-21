'use client'

import { useState, useMemo, useEffect } from "react"
import { loadLeadMagnets } from "@/lib/data-loader"
import type { LeadMagnetData } from "@/lib/data-loader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import ReactMarkdown from "react-markdown"
import {
  Mic,
  Clock,
  Target,
  ArrowLeft,
  Users,
  FileAudio,
  Sparkles,
  Briefcase,
  Globe,
  Loader2,
  Baby,
  Heart,
  BookOpen,
  TreePine,
  Castle,
} from "lucide-react"
import { cn } from "@/lib/utils"

const AUDIENCE_CONFIG: Record<string, { color: string; bg: string; border: string; badgeBg: string; badgeText: string; icon: React.ElementType }> = {
  "F1-musulman": {
    color: "text-emerald-700 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-200 dark:border-emerald-800",
    badgeBg: "bg-emerald-100 dark:bg-emerald-900/40",
    badgeText: "text-emerald-800 dark:text-emerald-300",
    icon: Sparkles,
  },
  "F2-musulman-pro": {
    color: "text-teal-700 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-900/20",
    border: "border-teal-200 dark:border-teal-800",
    badgeBg: "bg-teal-100 dark:bg-teal-900/40",
    badgeText: "text-teal-800 dark:text-teal-300",
    icon: Briefcase,
  },
  "F3-tout-public": {
    color: "text-amber-700 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-200 dark:border-amber-800",
    badgeBg: "bg-amber-100 dark:bg-amber-900/40",
    badgeText: "text-amber-800 dark:text-amber-300",
    icon: Users,
  },
  "F4-pro-tout-public": {
    color: "text-rose-700 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-900/20",
    border: "border-rose-200 dark:border-rose-800",
    badgeBg: "bg-rose-100 dark:bg-rose-900/40",
    badgeText: "text-rose-800 dark:text-rose-300",
    icon: Globe,
  },
  "F5-parents-musulmans": {
    color: "text-violet-700 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-900/20",
    border: "border-violet-200 dark:border-violet-800",
    badgeBg: "bg-violet-100 dark:bg-violet-900/40",
    badgeText: "text-violet-800 dark:text-violet-300",
    icon: Heart,
  },
  "F6-parents-tout-public": {
    color: "text-orange-700 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-800",
    badgeBg: "bg-orange-100 dark:bg-orange-900/40",
    badgeText: "text-orange-800 dark:text-orange-300",
    icon: BookOpen,
  },
  "F7-parents-musulmans-7-11": {
    color: "text-fuchsia-700 dark:text-fuchsia-400",
    bg: "bg-fuchsia-50 dark:bg-fuchsia-900/20",
    border: "border-fuchsia-200 dark:border-fuchsia-800",
    badgeBg: "bg-fuchsia-100 dark:bg-fuchsia-900/40",
    badgeText: "text-fuchsia-800 dark:text-fuchsia-300",
    icon: Baby,
  },
  "F8-parents-tout-public-7-11": {
    color: "text-sky-700 dark:text-sky-400",
    bg: "bg-sky-50 dark:bg-sky-900/20",
    border: "border-sky-200 dark:border-sky-800",
    badgeBg: "bg-sky-100 dark:bg-sky-900/40",
    badgeText: "text-sky-800 dark:text-sky-300",
    icon: TreePine,
  },
  "F9-enfants-musulmans-9-12": {
    color: "text-lime-700 dark:text-lime-400",
    bg: "bg-lime-50 dark:bg-lime-900/20",
    border: "border-lime-200 dark:border-lime-800",
    badgeBg: "bg-lime-100 dark:bg-lime-900/40",
    badgeText: "text-lime-800 dark:text-lime-300",
    icon: Sparkles,
  },
  "F10-enfants-tout-public-9-12": {
    color: "text-cyan-700 dark:text-cyan-400",
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
    border: "border-cyan-200 dark:border-cyan-800",
    badgeBg: "bg-cyan-100 dark:bg-cyan-900/40",
    badgeText: "text-cyan-800 dark:text-cyan-300",
    icon: Castle,
  },
}

interface LeadMagnetsListData {
  slug: string
  title: string
  audience: string
  audienceLabel: string
  meta: LeadMagnetData['meta']
}

export function LeadMagnetsPage() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [filterAudience, setFilterAudience] = useState<string>("all")
  const [leadMagnetsList, setLeadMagnetsList] = useState<LeadMagnetsListData[]>([])
  const [leadMagnetsDataMap, setLeadMagnetsDataMap] = useState<Record<string, LeadMagnetData>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    loadLeadMagnets().then(({ list, data }) => {
      if (cancelled) return
      setLeadMagnetsList(list)
      setLeadMagnetsDataMap(data)
      setLoading(false)
    }).catch(() => {
      if (!cancelled) setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  const audiences = useMemo(() => {
    const set = new Set(leadMagnetsList.map(lm => lm.audience))
    return Array.from(set).sort()
  }, [leadMagnetsList])

  const filtered = useMemo(() => {
    if (filterAudience === "all") return leadMagnetsList
    return leadMagnetsList.filter(lm => lm.audience === filterAudience)
  }, [filterAudience, leadMagnetsList])

  const grouped = useMemo(() => {
    const groups: Record<string, LeadMagnetsListData[]> = {}
    for (const lm of filtered) {
      if (!groups[lm.audience]) groups[lm.audience] = []
      groups[lm.audience].push(lm)
    }
    return groups
  }, [filtered])

  const selectedItem = selectedSlug ? leadMagnetsDataMap[selectedSlug] : null

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <Loader2 className="h-8 w-8 text-rose-600 dark:text-rose-400 animate-spin mb-4" />
        <p className="text-sm text-muted-foreground">Chargement des scripts...</p>
      </div>
    )
  }

  if (selectedItem) {
    const cfg = AUDIENCE_CONFIG[selectedItem.audience] || AUDIENCE_CONFIG["F1-musulman"]
    const Icon = cfg.icon
    return (
      <ScrollArea className="h-full">
        <div className="max-w-3xl mx-auto px-6 py-8 pb-24">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
            onClick={() => setSelectedSlug(null)}
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Retour aux scripts
          </Button>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge className={cn("gap-1.5 py-1 px-3", cfg.badgeBg, cfg.badgeText, `border ${cfg.border}`)}>
              <Icon className="h-3.5 w-3.5" />
              {selectedItem.audienceLabel}
            </Badge>
            {selectedItem.meta.duree && (
              <Badge variant="outline" className="gap-1.5 py-1 px-2.5">
                <Clock className="h-3.5 w-3.5" />
                {selectedItem.meta.duree}
              </Badge>
            )}
            {selectedItem.meta.format && (
              <Badge variant="outline" className="gap-1.5 py-1 px-2.5">
                <Mic className="h-3.5 w-3.5" />
                {selectedItem.meta.format}
              </Badge>
            )}
          </div>

          {selectedItem.meta.objectif && (
            <div className={cn("rounded-lg p-4 mb-6", cfg.badgeBg, `border ${cfg.border}`)}>
              <div className="flex items-start gap-2">
                <Target className="h-4 w-4 mt-0.5 shrink-0" />
                <p className="text-sm leading-relaxed">{selectedItem.meta.objectif}</p>
              </div>
            </div>
          )}

          {selectedItem.meta.formation && (
            <p className="text-xs text-muted-foreground mb-6 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" />
              Pont vers : {selectedItem.meta.formation}
            </p>
          )}

          <article className="prose-custom">
            <ReactMarkdown>{selectedItem.content}</ReactMarkdown>
          </article>
        </div>
      </ScrollArea>
    )
  }

  return (
    <ScrollArea className="h-full">
      <div className="max-w-5xl mx-auto px-6 py-8 pb-24">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Scripts Lead Magnets</h2>
          <p className="text-muted-foreground text-sm">
            {leadMagnetsList.length} scripts podcast (5-7 min) pour capturer et qualifier vos prospects
          </p>
        </div>

        {/* Audience filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={filterAudience === "all" ? "default" : "outline"}
            size="sm"
            className="text-xs"
            onClick={() => setFilterAudience("all")}
          >
            <FileAudio className="h-3.5 w-3.5 mr-1.5" />
            Tous ({leadMagnetsList.length})
          </Button>
          {audiences.map(aud => {
            const cfg = AUDIENCE_CONFIG[aud]
            const Icon = cfg?.icon || FileAudio
            const count = leadMagnetsList.filter(lm => lm.audience === aud).length
            return (
              <Button
                key={aud}
                variant={filterAudience === aud ? 'default' : 'outline'}
                size="sm"
                className={cn(
                  "text-xs",
                  filterAudience === aud && cfg.bg + " " + cfg.color + " border " + cfg.border + " hover:" + cfg.bg
                )}
                onClick={() => setFilterAudience(aud)}
              >
                <Icon className="h-3.5 w-3.5 mr-1.5" />
                {cfg ? aud.replace(/^F\d+-/, '').replace(/-/g, ' ') : aud} ({count})
              </Button>
            )
          })}
        </div>

        {/* Grouped cards */}
        {Object.entries(grouped).map(([audience, items]) => {
          const cfg = AUDIENCE_CONFIG[audience]
          if (!cfg) return null
          const Icon = cfg.icon
          return (
            <div key={audience} className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <div className={cn("w-7 h-7 rounded-md flex items-center justify-center", cfg.badgeBg)}>
                  <Icon className={cn("h-4 w-4", cfg.color)} />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {items[0].audienceLabel}
                </h3>
                <Badge variant="secondary" className="text-xs ml-1">
                  {items.length} scripts
                </Badge>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item, idx) => (
                  <Card
                    key={item.slug}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5",
                      "border-l-4",
                      cfg.border
                    )}
                    onClick={() => setSelectedSlug(item.slug)}
                  >
                    <CardHeader className="pb-2 pt-4 px-4">
                      <div className="flex items-start gap-2">
                        <span className={cn("text-xs font-bold mt-0.5 shrink-0", cfg.color)}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <CardTitle className="text-sm font-semibold leading-snug text-foreground">
                          {item.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="px-4 pb-4 pt-0">
                      <div className="flex flex-wrap gap-1.5">
                        {item.meta.duree && (
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.meta.duree}
                          </span>
                        )}
                        {item.meta.formation && (
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            {item.meta.formation}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}
