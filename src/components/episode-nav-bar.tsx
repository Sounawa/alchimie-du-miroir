'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useAppStore, type Formation } from '@/lib/store'
import { cn } from '@/lib/utils'
import { useMemo } from 'react'

const COLOR_STYLES: Record<string, { text: string; badge: string; hoverText: string }> = {
  emerald: {
    text: 'text-emerald-700 dark:text-emerald-400',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    hoverText: 'hover:text-emerald-700 dark:hover:text-emerald-400',
  },
  amber: {
    text: 'text-amber-700 dark:text-amber-400',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    hoverText: 'hover:text-amber-700 dark:hover:text-amber-400',
  },
  sky: {
    text: 'text-sky-700 dark:text-sky-400',
    badge: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
    hoverText: 'hover:text-sky-700 dark:hover:text-sky-400',
  },
  rose: {
    text: 'text-rose-700 dark:text-rose-400',
    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    hoverText: 'hover:text-rose-700 dark:hover:text-rose-400',
  },
}

interface FlatEpisode {
  slug: string
  title: string
  formationShortName: string
  formationColor: string
  niveauName: string
  episodeInNiveau: number
  niveauTotal: number
}

function buildFlatList(formations: Formation[]): FlatEpisode[] {
  const flat: FlatEpisode[] = []
  for (const f of formations) {
    for (const n of f.niveaux) {
      for (let i = 0; i < n.episodes.length; i++) {
        flat.push({
          slug: n.episodes[i].slug,
          title: n.episodes[i].title,
          formationShortName: f.shortName,
          formationColor: f.color,
          niveauName: n.name,
          episodeInNiveau: i + 1,
          niveauTotal: n.episodes.length,
        })
      }
    }
  }
  return flat
}

export function EpisodeNavBar() {
  const formations = useAppStore((s) => s.formations)
  const selectedPath = useAppStore((s) => s.selectedPath)
  const selectEpisode = useAppStore((s) => s.selectEpisode)

  const flatList = useMemo(() => buildFlatList(formations), [formations])

  const currentIndex = useMemo(
    () => flatList.findIndex((ep) => ep.slug === selectedPath),
    [flatList, selectedPath],
  )

  const prev = currentIndex > 0 ? flatList[currentIndex - 1] : null
  const next = currentIndex < flatList.length - 1 ? flatList[currentIndex + 1] : null
  const current = currentIndex >= 0 ? flatList[currentIndex] : null

  if (!current) return null

  const styles = COLOR_STYLES[current.formationColor] || COLOR_STYLES.emerald

  return (
    <div className="print-hide sticky bottom-0 z-10 bg-white/90 dark:bg-stone-950/90 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 px-4 py-3">
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
        {/* Previous button */}
        <button
          disabled={!prev}
          onClick={() => prev && selectEpisode(prev.slug)}
          className={cn(
            'flex items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors',
            'hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'disabled:opacity-40 disabled:pointer-events-none',
            styles.hoverText,
          )}
        >
          <ChevronLeft className="h-4 w-4 shrink-0" />
          <div className="hidden sm:flex flex-col min-w-0">
            <span className="text-xs font-medium">Épisode précédent</span>
            <span className="text-xs text-muted-foreground truncate max-w-[200px]">
              {prev?.title}
            </span>
          </div>
          <span className="text-xs font-medium sm:hidden">Précédent</span>
        </button>

        {/* Center info */}
        <div className="flex flex-col items-center gap-0.5 shrink-0">
          <span
            className={cn(
              'font-mono font-bold text-[10px] px-1.5 py-0.5 rounded',
              styles.badge,
            )}
          >
            {current.formationShortName}
          </span>
          <span className="text-xs font-medium text-foreground tabular-nums">
            {current.episodeInNiveau}/{current.niveauTotal}
          </span>
          <span className="text-[10px] text-muted-foreground hidden sm:block">
            {current.niveauName}
          </span>
          {/* Mobile: show overall progress instead of niveau name */}
          <span className="text-[10px] text-muted-foreground sm:hidden tabular-nums">
            {currentIndex + 1}/{flatList.length}
          </span>
        </div>

        {/* Next button */}
        <button
          disabled={!next}
          onClick={() => next && selectEpisode(next.slug)}
          className={cn(
            'flex items-center gap-2 rounded-lg px-3 py-2 text-right transition-colors',
            'hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'disabled:opacity-40 disabled:pointer-events-none',
            styles.hoverText,
          )}
        >
          <div className="hidden sm:flex flex-col items-end min-w-0">
            <span className="text-xs font-medium">Épisode suivant</span>
            <span className="text-xs text-muted-foreground truncate max-w-[200px]">
              {next?.title}
            </span>
          </div>
          <span className="text-xs font-medium sm:hidden">Suivant</span>
          <ChevronRight className="h-4 w-4 shrink-0" />
        </button>
      </div>
    </div>
  )
}