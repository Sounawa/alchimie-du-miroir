'use client'

import { useAppStore } from "@/lib/store"
import ReactMarkdown from "react-markdown"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, Mic, Users, Loader2, BookOpen } from "lucide-react"

function MetaBar({ meta }: { meta: Record<string, string> }) {
  if (!meta || Object.keys(meta).length === 0) return null

  const icons: Record<string, React.ReactNode> = {
    "Durée cible": <Clock className="h-3.5 w-3.5" />,
    Ton: <Mic className="h-3.5 w-3.5" />,
    Public: <Users className="h-3.5 w-3.5" />,
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {Object.entries(meta).map(([key, value]) => (
        <Badge
          key={key}
          variant="outline"
          className="bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800 gap-1.5 py-1 px-2.5"
        >
          {icons[key]}
          <span className="text-xs font-medium">{key}:</span>
          <span className="text-xs">{value}</span>
        </Badge>
      ))}
    </div>
  )
}

export function EpisodeReader() {
  const { episodeTitle, episodeContent, episodeMeta, isLoading, selectedPath } = useAppStore()

  if (!selectedPath) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6">
          <BookOpen className="h-8 w-8 text-emerald-700 dark:text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Bienvenue dans L'Alchimie du Miroir
        </h2>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          Sélectionnez un épisode dans le menu de gauche pour commencer votre parcours de transformation spirituelle professionnelle.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm text-muted-foreground">
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="text-xl font-bold text-foreground">2</div>
            Formations
          </div>
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="text-xl font-bold text-foreground">7</div>
            Niveaux
          </div>
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="text-xl font-bold text-foreground">56</div>
            Épisodes
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 text-emerald-600 animate-spin" />
      </div>
    )
  }

  return (
    <ScrollArea className="h-full">
      <div className="max-w-3xl mx-auto px-6 py-8 pb-24">
        <MetaBar meta={episodeMeta} />

        <article className="prose-custom">
          <ReactMarkdown>{episodeContent}</ReactMarkdown>
        </article>
      </div>
    </ScrollArea>
  )
}
