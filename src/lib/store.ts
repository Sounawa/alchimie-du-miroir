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

interface AppState {
  formations: Formation[]
  selectedPath: string | null
  episodeTitle: string
  episodeContent: string
  episodeMeta: Record<string, string>
  isLoading: boolean
  sidebarOpen: boolean
  setFormations: (formations: Formation[]) => void
  selectEpisode: (path: string) => void
  setEpisodeData: (title: string, content: string, meta: Record<string, string>) => void
  setLoading: (loading: boolean) => void
  setSidebarOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  formations: [],
  selectedPath: null,
  episodeTitle: '',
  episodeContent: '',
  episodeMeta: {},
  isLoading: false,
  sidebarOpen: false,
  setFormations: (formations) => set({ formations }),
  selectEpisode: (path) => set({ selectedPath: path, isLoading: true }),
  setEpisodeData: (title, content, meta) => set({ episodeTitle: title, episodeContent: content, episodeMeta: meta, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}))