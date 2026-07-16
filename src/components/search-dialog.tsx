'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { useAppStore, type SearchResult } from "@/lib/store"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Loader2, FileText, X, CheckCircle2, ArrowRight, StickyNote } from "lucide-react"
import { cn } from "@/lib/utils"

const FORMATION_CONFIG = [
  { id: 'formation-1-musulman', name: 'Musulman', shortName: 'F1', color: 'emerald' },
  { id: 'formation-2-musulman-professionnel', name: 'Musulman Pro', shortName: 'F2', color: 'amber' },
  { id: 'formation-3-tout-public', name: 'Tout Public', shortName: 'F3', color: 'sky' },
  { id: 'formation-4-pro-tout-public', name: 'Pro Tout Public', shortName: 'F4', color: 'rose' },
] as const

type SearchMode = 'content' | 'notes'

function SearchHighlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-amber-200 dark:bg-amber-800/60 text-inherit rounded px-0.5">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

function ResultItem({ result, query, onClick }: { result: SearchResult; query: string; onClick: () => void }) {
  const isRead = useAppStore((s) => s.isRead(result.path))
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-3 rounded-lg hover:bg-muted/60 transition-colors group"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">
          {isRead ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          ) : (
            <FileText className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-medium text-foreground truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              <SearchHighlight text={result.title} query={query} />
            </span>
            <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-[10px] text-muted-foreground">{result.formation}</span>
            <span className="text-[10px] text-muted-foreground/50">·</span>
            <span className="text-[10px] text-muted-foreground">{result.niveau}</span>
            <Badge variant="secondary" className="text-[9px] px-1 py-0 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 border-0 ml-auto">
              {result.matchCount} match{result.matchCount > 1 ? "s" : ""}
            </Badge>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
            <SearchHighlight text={result.snippet} query={query} />
          </p>
        </div>
      </div>
    </button>
  )
}

interface NoteResult {
  path: string
  title: string
  snippet: string
  formation: string
  color: string
  matchCount: number
}

function NoteResultItem({ result, query, onClick }: { result: NoteResult; query: string; onClick: () => void }) {
  const colorClass = {
    emerald: 'border-l-emerald-500',
    amber: 'border-l-amber-500',
    sky: 'border-l-sky-500',
    rose: 'border-l-rose-500',
  }[result.color] ?? 'border-l-amber-500'

  const formationBgClass = {
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    sky: 'bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400',
    rose: 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
  }[result.color] ?? 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-3 rounded-lg hover:bg-muted/60 transition-colors group border-l-2"
      style={{ borderLeftColor: `var(--color-${result.color}-500, var(--color-amber-500))` }}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">
          <StickyNote className="h-4 w-4 text-amber-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-medium text-foreground truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              <SearchHighlight text={result.title} query={query} />
            </span>
            <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className={cn("text-[10px] px-1 py-0 rounded border-0", formationBgClass)}>
              {result.formation}
            </span>
            <Badge variant="secondary" className="text-[9px] px-1 py-0 bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 border-0 ml-auto">
              {result.matchCount} match{result.matchCount > 1 ? "s" : ""}
            </Badge>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
            <SearchHighlight text={result.snippet} query={query} />
          </p>
        </div>
      </div>
    </button>
  )
}

function extractEpisodeTitleFromPath(path: string): { title: string; formation: string; color: string } {
  const parts = path.split('/')
  const formationId = parts[0] || ''
  const formation = FORMATION_CONFIG.find((f) => f.id === formationId)
  const fileName = parts[parts.length - 1] || ''
  const titleParts = fileName.replace('.md', '').split('-')
  const num = titleParts[1] || ''
  const titleText = titleParts.slice(2).join(' ')
  const title = num ? `#${num} ${titleText}` : titleText
  return {
    title,
    formation: formation?.shortName ?? formationId,
    color: formation?.color ?? 'amber',
  }
}

const FORMATION_FILTERS = [
  { id: 'all', label: 'Toutes', pathMatcher: null },
  { id: 'f1', label: 'F1 Musulman', pathMatcher: 'formation-1-musulman' },
  { id: 'f2', label: 'F2 Pro', pathMatcher: 'formation-2-musulman-professionnel' },
  { id: 'f3', label: 'F3 Public', pathMatcher: 'formation-3-tout-public' },
  { id: 'f4', label: 'F4 Pro', pathMatcher: 'formation-4-pro-tout-public' },
] as const

export function SearchDialog() {
  const {
    searchOpen, setSearchOpen, searchQuery, setSearchQuery,
    searchResults, setSearchResults, searchLoading, setSearchLoading,
    selectEpisode, setView, markAsRead, setShowNotes,
    episodeNotes,
  } = useAppStore()

  const [localQuery, setLocalQuery] = useState("")
  const [searchMode, setSearchMode] = useState<SearchMode>('content')
  const [formationFilter, setFormationFilter] = useState<string>('all')
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout>()

  // Notes search results (client-side, computed)
  const noteResults = useMemo(() => {
    if (searchMode !== 'notes' || localQuery.length < 2) return []
    const q = localQuery.toLowerCase()
    const results: NoteResult[] = []

    for (const [path, note] of Object.entries(episodeNotes)) {
      if (!note) continue
      const lowerNote = note.toLowerCase()
      const matches = lowerNote.split(q).length - 1
      if (matches > 0) {
        const { title, formation, color } = extractEpisodeTitleFromPath(path)
        // Find snippet around first match
        const idx = lowerNote.indexOf(q)
        const start = Math.max(0, idx - 20)
        const end = Math.min(note.length, idx + q.length + 60)
        let snippet = (start > 0 ? '…' : '') + note.slice(start, end) + (end < note.length ? '…' : '')

        results.push({ path, title, snippet, formation, color, matchCount: matches })
      }
    }

    return results
  }, [searchMode, localQuery, episodeNotes])

  const notesCount = useMemo(() => {
    return Object.values(episodeNotes).filter((n) => n && n.trim().length > 0).length
  }, [episodeNotes])

  // Refocus input when dialog opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [searchOpen])

  // Debounced search (content mode only)
  const doSearch = useCallback(async (q: string) => {
    if (q.length < 2) {
      setSearchResults([])
      return
    }
    setSearchLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setSearchResults(data.results || [])
    } catch {
      setSearchResults([])
    }
    setSearchLoading(false)
  }, [setSearchResults, setSearchLoading])

  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = { all: searchResults.length }
    for (const f of FORMATION_FILTERS) {
      if (f.pathMatcher) {
        counts[f.id] = searchResults.filter((r) => r.path.includes(f.pathMatcher)).length
      }
    }
    return counts
  }, [searchResults])

  // Filtered results
  const filteredResults = useMemo(() => {
    if (formationFilter === 'all') return searchResults
    const filterConfig = FORMATION_FILTERS.find((f) => f.id === formationFilter)
    if (!filterConfig?.pathMatcher) return searchResults
    return searchResults.filter((r) => r.path.includes(filterConfig.pathMatcher))
  }, [searchResults, formationFilter])

  const handleChange = (value: string) => {
    setLocalQuery(value)
    setFormationFilter('all')
    if (searchMode === 'content') {
      setSearchQuery(value)
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => doSearch(value), 300)
    }
  }

  const handleSelect = (result: SearchResult) => {
    markAsRead(result.path)
    selectEpisode(result.path)
    setView('reader')
    setSearchOpen(false)
  }

  const handleNoteSelect = (result: NoteResult) => {
    selectEpisode(result.path)
    setView('reader')
    setShowNotes(true)
    setSearchOpen(false)
  }

  const handleModeChange = (mode: SearchMode) => {
    setSearchMode(mode)
    setLocalQuery("")
    setSearchQuery("")
    setSearchResults([])
    setFormationFilter('all')
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(!searchOpen)
      }
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [searchOpen, setSearchOpen])

  const readCount = useAppStore((s) => s.readEpisodes.length)

  const isContentMode = searchMode === 'content'

  return (
    <Dialog open={searchOpen} onOpenChange={(open) => {
      setSearchOpen(open)
      if (open) {
        setSearchMode('content')
        setLocalQuery('')
      }
    }}>
      <DialogContent className="sm:max-w-xl p-0 gap-0 top-[20%] translate-y-0">
        <DialogTitle className="sr-only">Rechercher dans les épisodes</DialogTitle>
        <DialogDescription className="sr-only">Recherche plein texte dans les 96 épisodes de formation</DialogDescription>

        {/* Mode toggle */}
        <div className="flex items-center gap-1 px-3 pt-3 pb-1">
          <button
            onClick={() => handleModeChange('content')}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
              isContentMode
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            )}
          >
            <FileText className="h-3.5 w-3.5" />
            Contenu
          </button>
          <button
            onClick={() => handleModeChange('notes')}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
              !isContentMode
                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            )}
          >
            <StickyNote className="h-3.5 w-3.5" />
            Notes
          </button>
        </div>

        {/* Search input */}
        <div className="flex items-center border-b px-3">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <Input
            key={String(searchOpen)}
            ref={inputRef}
            value={localQuery}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={isContentMode ? "Rechercher dans 96 épisodes..." : "Rechercher dans vos notes..."}
            className="border-0 focus-visible:ring-0 h-11 text-sm shadow-none px-3"
          />
          {localQuery && (
            <button onClick={() => {
              setLocalQuery("")
              setSearchQuery("")
              setSearchResults([])
            }}>
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {isContentMode && searchLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">Recherche...</span>
            </div>
          )}

          {/* Content mode: empty query state */}
          {isContentMode && !searchLoading && localQuery.length < 2 && (
            <div className="py-12 text-center px-6">
              <p className="text-sm text-muted-foreground mb-1">
                Tapez au moins 2 caractères pour rechercher
              </p>
              <p className="text-xs text-muted-foreground/60">
                Recherche dans le contenu, les titres, les références et les exercices des 96 épisodes
              </p>
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground/50">
                <span>{readCount}/96 lus</span>
                <span>·</span>
                <span>⌘K pour ouvrir</span>
              </div>
            </div>
          )}

          {/* Content mode: no results */}
          {isContentMode && !searchLoading && localQuery.length >= 2 && searchResults.length === 0 && (
            <div className="py-12 text-center px-6">
              <p className="text-sm text-muted-foreground">
                Aucun résultat pour « {localQuery} »
              </p>
            </div>
          )}

          {/* Content mode: results */}
          {isContentMode && !searchLoading && searchResults.length > 0 && (
            <div className="py-2">
              {/* Formation filter bar */}
              <div className="px-3 pb-2 flex items-center gap-1.5 flex-wrap">
                {FORMATION_FILTERS.map((f) => {
                  const count = filterCounts[f.id] ?? 0
                  if (f.id !== 'all' && count === 0) return null
                  return (
                    <button
                      key={f.id}
                      onClick={() => setFormationFilter(f.id)}
                      className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors",
                        formationFilter === f.id
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {f.label}
                      <span className={cn(
                        "text-[10px] tabular-nums",
                        formationFilter === f.id ? "text-emerald-200" : "text-muted-foreground/60"
                      )}>
                        ({count})
                      </span>
                    </button>
                  )
                })}
              </div>
              <div className="px-3 pb-2 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">
                  {filteredResults.length} résultat{filteredResults.length > 1 ? "s" : ""}
                  {formationFilter !== 'all' && (
                    <span className="text-muted-foreground/60"> filtré{filteredResults.length > 1 ? "s" : ""}</span>
                  )}
                </span>
                <span className="text-[11px] text-muted-foreground/50">
                  sur {searchResults.length} trouvé{searchResults.length > 1 ? "s" : ""} · 96 épisodes
                </span>
              </div>
              <div className="space-y-0.5 px-2">
                {filteredResults.map((result) => (
                  <ResultItem key={result.path} result={result} query={localQuery} onClick={() => handleSelect(result)} />
                ))}
              </div>
            </div>
          )}

          {/* Notes mode: no notes at all */}
          {!isContentMode && notesCount === 0 && (
            <div className="py-12 text-center px-6">
              <StickyNote className="h-8 w-8 text-amber-300 dark:text-amber-600 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">
                Aucune note écrite
              </p>
              <p className="text-xs text-muted-foreground/60">
                Appuyez sur N dans un épisode pour écrire une note
              </p>
            </div>
          )}

          {/* Notes mode: empty query */}
          {!isContentMode && notesCount > 0 && localQuery.length < 2 && (
            <div className="py-12 text-center px-6">
              <StickyNote className="h-8 w-8 text-amber-400 dark:text-amber-500 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">
                Tapez au moins 2 caractères pour rechercher
              </p>
              <p className="text-xs text-muted-foreground/60">
                Recherche dans vos {notesCount} note{notesCount > 1 ? "s" : ""} personnelles
              </p>
            </div>
          )}

          {/* Notes mode: no matching results */}
          {!isContentMode && localQuery.length >= 2 && noteResults.length === 0 && notesCount > 0 && (
            <div className="py-12 text-center px-6">
              <p className="text-sm text-muted-foreground">
                Aucune note ne contient « {localQuery} »
              </p>
            </div>
          )}

          {/* Notes mode: results */}
          {!isContentMode && noteResults.length > 0 && (
            <div className="py-2">
              <div className="px-3 pb-2 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">
                  {noteResults.length} note{noteResults.length > 1 ? "s" : ""} trouvée{noteResults.length > 1 ? "s" : ""}
                </span>
                <span className="text-[11px] text-muted-foreground/50">
                  sur {notesCount} note{notesCount > 1 ? "s" : ""}
                </span>
              </div>
              <div className="space-y-0.5 px-2">
                {noteResults.map((result) => (
                  <NoteResultItem key={result.path} result={result} query={localQuery} onClick={() => handleNoteSelect(result)} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-3 py-2 flex items-center justify-between text-[10px] text-muted-foreground/60">
          <span>⌘K pour ouvrir · ESC pour fermer</span>
          <span>
            {isContentMode
              ? `${readCount}/96 épisodes marqués comme lus`
              : `${notesCount} note${notesCount > 1 ? "s" : ""} personnelle${notesCount > 1 ? "s" : ""}`
            }
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}