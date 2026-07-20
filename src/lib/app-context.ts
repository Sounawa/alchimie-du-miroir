// Shared types for the application

export interface Episode {
  slug: string
  title: string
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
