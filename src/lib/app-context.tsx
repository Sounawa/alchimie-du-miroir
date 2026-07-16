'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { episodesData } from "./generated-data"

export interface Formation {
  id: string
  name: string
  niveaux: {
    id: string
    name: string
    episodes: { slug: string; title: string; filename: string }[]
  }[]
}

export type ViewMode = 'reader' | 'pricing'

export interface EpisodeMeta {
  title: string
  content: string
  meta: Record<string, string>
}

interface AppState {
  selectedPath: string | null
  episodeTitle: string
  episodeContent: string
  episodeMeta: Record<string, string>
  sidebarOpen: boolean
  currentView: ViewMode
  selectEpisode: (path: string) => void
  setSidebarOpen: (open: boolean) => void
  setView: (view: ViewMode) => void
}

const AppContext = createContext<AppState | null>(null)

export function useAppState() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useAppState must be used within AppProvider")
  return ctx
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [episodeTitle, setEpisodeTitle] = useState("")
  const [episodeContent, setEpisodeContent] = useState("")
  const [episodeMeta, setEpisodeMeta] = useState<Record<string, string>>({})
  const [sidebarOpen, setSidebarOpenState] = useState(false)
  const [currentView, setCurrentView] = useState<ViewMode>("reader")

  const selectEpisode = useCallback((path: string) => {
    setSelectedPath(path)
    const data = episodesData[path]
    if (data) {
      setEpisodeTitle(data.title || "")
      setEpisodeContent(data.content || "")
      setEpisodeMeta(data.meta || {})
    }
  }, [])

  const handleSetSidebarOpen = useCallback((open: boolean) => setSidebarOpenState(open), [])
  const setView = useCallback((view: ViewMode) => setCurrentView(view), [])

  return (
    <AppContext.Provider value={{
      selectedPath, episodeTitle, episodeContent, episodeMeta,
      sidebarOpen, currentView,
      selectEpisode, setSidebarOpen: handleSetSidebarOpen, setView,
    }}>
      {children}
    </AppContext.Provider>
  )
}