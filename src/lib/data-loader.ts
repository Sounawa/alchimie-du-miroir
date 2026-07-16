'use client'

import { formations, episodesIndex, type GeneratedFormation } from './generated-data'

export interface EpisodeData {
  title: string
  content: string
  meta: Record<string, string>
}

export interface LeadMagnetData {
  slug: string
  title: string
  content: string
  meta: { duree?: string; format?: string; audience?: string; objectif?: string; formation?: string }
  audience: string
  audienceLabel: string
}

interface LeadMagnetsListData {
  slug: string
  title: string
  audience: string
  audienceLabel: string
  meta: LeadMagnetData['meta']
}

let episodesCache: Record<string, EpisodeData> | null = null
let leadMagnetsCache: { list: LeadMagnetsListData[]; data: Record<string, LeadMagnetData> } | null = null

function getBasePath(): string {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname
    // Match basePath like /alchimie-du-miroir or /alchimie-du-miroir/
    const match = path.match(/^(\/[^/]+)/)
    return match ? match[1] + '/' : '/'
  }
  return '/alchimie-du-miroir/'
}

export async function loadEpisodes(): Promise<Record<string, EpisodeData>> {
  if (episodesCache) return episodesCache
  const basePath = getBasePath()
  const res = await fetch(`${basePath}data/episodes.json`)
  if (!res.ok) throw new Error(`Failed to load episodes: ${res.status}`)
  episodesCache = await res.json()
  return episodesCache!
}

export async function loadEpisode(slug: string): Promise<EpisodeData | null> {
  const all = await loadEpisodes()
  return all[slug] || null
}

export async function loadLeadMagnets(): Promise<{ list: LeadMagnetsListData[]; data: Record<string, LeadMagnetData> }> {
  if (leadMagnetsCache) return leadMagnetsCache!
  const basePath = getBasePath()
  const res = await fetch(`${basePath}data/leadmagnets.json`)
  if (!res.ok) throw new Error(`Failed to load lead magnets: ${res.status}`)
  leadMagnetsCache = await res.json()
  return leadMagnetsCache!
}

// Re-export structure data (no content)
export { formations, episodesIndex }
export type { GeneratedFormation }
