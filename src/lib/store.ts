import { create } from 'zustand'

export interface Episode {
  slug: string
  title: string
  filename: string
}

export interface Niveau {
  id: string
  name: string
  episodes: Episode[]
}

export interface Formation {
  id: string
  name: string
  niveaux: Niveau[]
}

export type ViewMode = 'reader' | 'pricing'

interface AppState {
  // Reader
  selectedPath: string | null
  episodeTitle: string
  episodeContent: string
  episodeMeta: Record<string, string>
  // UI
  sidebarOpen: boolean
  currentView: ViewMode
  // Actions
  selectEpisode: (path: string) => void
  setEpisodeData: (title: string, content: string, meta: Record<string, string>) => void
  setSidebarOpen: (open: boolean) => void
  setView: (view: ViewMode) => void
}

export const useAppStore = create<AppState>((set) => ({
  selectedPath: null,
  episodeTitle: '',
  episodeContent: '',
  episodeMeta: {},
  sidebarOpen: false,
  currentView: 'reader',
  selectEpisode: (path) => set({ selectedPath: path }),
  setEpisodeData: (title, content, meta) => set({ episodeTitle: title, episodeContent: content, episodeMeta: meta }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setView: (view) => set({ currentView: view }),
}))