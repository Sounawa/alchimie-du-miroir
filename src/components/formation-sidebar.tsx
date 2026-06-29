'use client'

import { useAppStore, type Formation, type Niveau, type Episode } from "@/lib/store"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ChevronRight, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

function EpisodeItem({
  episode,
  isActive,
  onClick,
}: {
  episode: Episode
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200",
        isActive
          ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-100 font-medium"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
      )}
    >
      <div className="flex items-center gap-2">
        {isActive && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-emerald-700 dark:text-emerald-400" />}
        {!isActive && <span className="w-3.5 shrink-0" />}
        <span className="truncate">{episode.title}</span>
      </div>
    </button>
  )
}

function NiveauSection({
  niveau,
  formationName,
  formationIndex,
  niveauIndex,
}: {
  niveau: Niveau
  formationName: string
  formationIndex: number
  niveauIndex: number
}) {
  const { selectedPath, selectEpisode, setSidebarOpen } = useAppStore()

  const handleEpisodeClick = (slug: string) => {
    selectEpisode(slug)
    setSidebarOpen(false)
  }

  return (
    <AccordionItem value={`${formationIndex}-${niveauIndex}`} className="border-b-0">
      <AccordionTrigger className="py-2.5 px-3 hover:no-underline text-sm font-semibold text-foreground/80 hover:text-foreground">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <span>Niveau {niveauIndex + 1} — {niveau.name}</span>
          <Badge
            variant="secondary"
            className="ml-auto text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0 mr-2"
          >
            {niveau.episodes.length} ép.
          </Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-2">
        <div className="space-y-0.5 pl-3">
          {niveau.episodes.map((ep) => (
            <EpisodeItem
              key={ep.slug}
              episode={ep}
              isActive={selectedPath === ep.slug}
              onClick={() => handleEpisodeClick(ep.slug)}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

function FormationSection({
  formation,
  index,
}: {
  formation: Formation
  index: number
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 px-3 mb-2">
        <BookOpen className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
        <h3 className="text-sm font-bold text-foreground">
          Formation {index + 1}
        </h3>
        <span className="text-xs text-muted-foreground truncate">
          — {formation.name}
        </span>
      </div>
      <Accordion
        type="multiple"
        defaultValue={["0-0"]}
        className="w-full"
      >
        {formation.niveaux.map((niveau, ni) => (
          <NiveauSection
            key={niveau.id}
            niveau={niveau}
            formationName={formation.name}
            formationIndex={index}
            niveauIndex={ni}
          />
        ))}
      </Accordion>
    </div>
  )
}

export function FormationSidebar() {
  const { formations } = useAppStore()

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-2">
        {formations.map((formation, i) => (
          <FormationSection key={formation.id} formation={formation} index={i} />
        ))}
        {formations.length === 0 && (
          <div className="text-sm text-muted-foreground text-center py-8">
            Chargement des formations...
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
