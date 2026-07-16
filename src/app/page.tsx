'use client'

import { useMemo } from "react"
import { formations as staticFormations, episodesData } from "@/lib/generated-data"
import { FormationSidebar } from "@/components/formation-sidebar"
import { EpisodeReader } from "@/components/episode-reader"
import { PricingPage } from "@/components/pricing-page"
import { LeadMagnetsPage } from "@/components/lead-magnets-page"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Sparkles, BookOpen, Crown, FileAudio } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useCallback } from "react"

export interface Formation {
  id: string
  name: string
  niveaux: {
    id: string
    name: string
    episodes: { slug: string; title: string; filename: string }[]
  }[]
}

export type ViewMode = 'reader' | 'leadmagnets' | 'pricing'

function toFormations(raw: typeof staticFormations): Formation[] {
  return raw.map((f) => ({
    id: f.id,
    name: f.name,
    niveaux: f.niveaux.map((n) => ({
      id: n.id,
      name: n.name,
      episodes: n.episodes.map((e) => ({
        slug: e.slug,
        title: e.title,
        filename: e.slug.split('/').pop() || '',
      })),
    })),
  }))
}

export default function Home() {
  const formations = useMemo(() => toFormations(staticFormations), [])
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [episodeTitle, setEpisodeTitle] = useState("")
  const [episodeContent, setEpisodeContent] = useState("")
  const [episodeMeta, setEpisodeMeta] = useState<Record<string, string>>({})
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentView, setCurrentView] = useState<ViewMode>("reader")

  const handleSelectEpisode = useCallback((slug: string) => {
    setSelectedPath(slug)
    const data = episodesData[slug]
    if (data) {
      setEpisodeTitle(data.title || "")
      setEpisodeContent(data.content || "")
      setEpisodeMeta(data.meta || {})
    }
    setSidebarOpen(false)
  }, [])

  const totalEpisodes = formations.reduce(
    (acc, f) => acc + f.niveaux.reduce((a, n) => a + n.episodes.length, 0),
    0
  )
  const totalNiveaux = formations.reduce((acc, f) => acc + f.niveaux.length, 0)

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center h-14 px-4 gap-3">
          {(currentView === 'reader' || currentView === 'leadmagnets') && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden shrink-0"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setCurrentView('reader')}>
            <div className="w-8 h-8 rounded-lg bg-emerald-700 dark:bg-emerald-600 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-stone-900 dark:text-stone-100 leading-tight">
                L&apos;Alchimie du Miroir
              </h1>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-tight hidden sm:block">
                {formations.length} formations · {totalNiveaux} niveaux · {totalEpisodes} episodes
              </p>
            </div>
          </div>

          {/* Nav buttons */}
          <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
            <Button
              variant={currentView === 'reader' ? 'default' : 'outline'}
              size="sm"
              className={cn(
                'text-xs',
                currentView === 'reader' && 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100'
              )}
              onClick={() => setCurrentView('reader')}
            >
              <BookOpen className="h-3.5 w-3.5 sm:mr-1" />
              <span className="hidden sm:inline">Contenu</span>
            </Button>
            <Button
              variant={currentView === 'leadmagnets' ? 'default' : 'outline'}
              size="sm"
              className={cn(
                'text-xs',
                currentView === 'leadmagnets' && 'bg-rose-600 hover:bg-rose-700 text-white border-rose-600'
              )}
              onClick={() => setCurrentView('leadmagnets')}
            >
              <FileAudio className="h-3.5 w-3.5 sm:mr-1" />
              <span className="hidden sm:inline">Lead Magnets</span>
            </Button>
            <Button
              variant={currentView === 'pricing' ? 'default' : 'outline'}
              size="sm"
              className={cn(
                'text-xs',
                currentView === 'pricing' && 'bg-amber-600 hover:bg-amber-700 text-white border-amber-600'
              )}
              onClick={() => setCurrentView('pricing')}
            >
              <Crown className="h-3.5 w-3.5 sm:mr-1" />
              <span className="hidden sm:inline">Prix</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {currentView === 'reader' ? (
          <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-80 xl:w-96 border-r border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shrink-0">
              <FormationSidebar formations={formations} selectedPath={selectedPath} onSelectEpisode={handleSelectEpisode} />
            </aside>

            {/* Mobile Sidebar */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetContent side="left" className="w-80 p-0 bg-white dark:bg-stone-900">
                <SheetTitle className="sr-only">Menu des formations</SheetTitle>
                <FormationSidebar formations={formations} selectedPath={selectedPath} onSelectEpisode={handleSelectEpisode} />
              </SheetContent>
            </Sheet>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden bg-white dark:bg-stone-950">
              <EpisodeReader
                formations={formations}
                selectedPath={selectedPath}
                episodeContent={episodeContent}
                episodeMeta={episodeMeta}
              />
            </div>
          </>
        ) : currentView === 'leadmagnets' ? (
          <div className="flex-1 overflow-hidden bg-white dark:bg-stone-950">
            <LeadMagnetsPage />
          </div>
        ) : (
          <div className="flex-1 overflow-hidden bg-white dark:bg-stone-950">
            <PricingPage />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md mt-auto">
        <div className="px-6 py-3 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <span>© L&apos;Alchimie du Miroir — Spiritualite au service du professionnel</span>
          <span className="hidden sm:inline">
            {formations.length} formations · {totalNiveaux} niveaux · {totalEpisodes} episodes · ~56h de contenu
          </span>
        </div>
      </footer>
    </div>
  )
}