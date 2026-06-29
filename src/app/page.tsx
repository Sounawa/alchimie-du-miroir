'use client'

import { useEffect } from "react"
import { useAppStore } from "@/lib/store"
import { FormationSidebar } from "@/components/formation-sidebar"
import { EpisodeReader } from "@/components/episode-reader"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Menu, Sparkles } from "lucide-react"

export default function Home() {
  const {
    formations,
    setFormations,
    selectedPath,
    selectEpisode,
    setEpisodeData,
    setSidebarOpen,
    sidebarOpen,
  } = useAppStore()

  useEffect(() => {
    fetch("/api/formations")
      .then((r) => r.json())
      .then((data) => setFormations(data.formations || []))
      .catch(console.error)
  }, [setFormations])

  useEffect(() => {
    if (!selectedPath) return
    fetch(`/api/episode?path=${encodeURIComponent(selectedPath)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) return
        setEpisodeData(data.title || "", data.content || "", data.meta || {})
      })
      .catch(console.error)
  }, [selectedPath, setEpisodeData])

  const totalEpisodes = formations.reduce(
    (acc, f) => acc + f.niveaux.reduce((a, n) => a + n.episodes.length, 0),
    0
  )

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center h-14 px-4 gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden shrink-0"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 dark:bg-emerald-600 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-stone-900 dark:text-stone-100 leading-tight">
                L&apos;Alchimie du Miroir
              </h1>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-tight hidden sm:block">
                {formations.length} formations · {totalEpisodes} épisodes
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-80 xl:w-96 border-r border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shrink-0">
          <FormationSidebar />
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-80 p-0 bg-white dark:bg-stone-900">
            <SheetTitle className="sr-only">Menu des formations</SheetTitle>
            <FormationSidebar />
          </SheetContent>
        </Sheet>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden bg-white dark:bg-stone-950">
          <EpisodeReader />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md mt-auto">
        <div className="px-6 py-3 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <span>© L&apos;Alchimie du Miroir — Spiritualité islamique au service du professionnel</span>
          <span className="hidden sm:inline">
            {totalEpisodes} épisodes · ~14h+ de contenu
          </span>
        </div>
      </footer>
    </div>
  )
}