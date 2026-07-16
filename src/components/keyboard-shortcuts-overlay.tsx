'use client'

import { useEffect } from 'react'
import {
  Search,
  BookOpen,
  BarChart3,
  Crown,
  Activity,
  Bookmark,
  StickyNote,
  Type,
  ArrowUp,
  ArrowDown,
  Sun,
  Moon,
  Printer,
  X,
  Keyboard,
} from 'lucide-react'

const SHORTCUTS = [
  { category: 'Navigation', items: [
    { keys: ['⌘', 'K'], label: 'Rechercher', icon: Search, color: 'text-stone-600 dark:text-stone-300' },
    { keys: ['1'], label: 'Vue Formations', icon: BookOpen, color: 'text-stone-900 dark:text-stone-100' },
    { keys: ['2'], label: 'Vue Audit', icon: BarChart3, color: 'text-emerald-600 dark:text-emerald-400' },
    { keys: ['3'], label: 'Vue Tarifs', icon: Crown, color: 'text-amber-600 dark:text-amber-400' },
    { keys: ['4'], label: 'Vue Stats', icon: Activity, color: 'text-violet-600 dark:text-violet-400' },
  ]},
  { category: 'Épisode', items: [
    { keys: ['B'], label: 'Ajouter aux favoris', icon: Bookmark, color: 'text-amber-600 dark:text-amber-400' },
    { keys: ['N'], label: 'Ouvrir les notes', icon: StickyNote, color: 'text-amber-600 dark:text-amber-400' },
    { keys: ['S'], label: 'Sommaire', icon: Type, color: 'text-stone-600 dark:text-stone-300' },
    { keys: ['↑', '↓'], label: 'Épisode précédent / suivant', icon: ArrowUp, color: 'text-stone-600 dark:text-stone-300' },
    { keys: ['P'], label: 'Imprimer', icon: Printer, color: 'text-stone-600 dark:text-stone-300' },
  ]},
  { category: 'Interface', items: [
    { keys: ['D'], label: 'Mode clair / sombre', icon: Sun, color: 'text-stone-600 dark:text-stone-300' },
    { keys: ['Esc'], label: 'Fermer / Retour', icon: X, color: 'text-stone-600 dark:text-stone-300' },
    { keys: ['?'], label: 'Ce panneau de raccourcis', icon: Keyboard, color: 'text-stone-600 dark:text-stone-300' },
  ]},
]

export function KeyboardShortcutsOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="shortcuts-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60"
      onClick={onClose}
    >
      <div
        className="shortcuts-card w-full max-w-lg mx-4 bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-700 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
              <Keyboard className="h-4 w-4 text-stone-600 dark:text-stone-300" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100">Raccourcis clavier</h2>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">Naviguez plus rapidement</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-md flex items-center justify-center text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Shortcuts */}
        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto space-y-5">
          {SHORTCUTS.map((group) => (
            <div key={group.category}>
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2.5">
                {group.category}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const IconComp = item.icon
                  return (
                    <div
                      key={item.label}
                      className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <IconComp className={`h-3.5 w-3.5 ${item.color}`} />
                        <span className="text-sm text-stone-700 dark:text-stone-300">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {item.keys.map((key, i) => (
                          <span key={i}>
                            <kbd className="inline-flex items-center justify-center min-w-[1.75rem] h-6 px-1.5 text-[11px] font-mono font-medium text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-md shadow-sm">
                              {key}
                            </kbd>
                            {i < item.keys.length - 1 && <span className="w-1.5" />}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30">
          <p className="text-[11px] text-stone-400 dark:text-stone-500 text-center">
            Appuyez sur <kbd className="inline-flex items-center justify-center min-w-[1.25rem] h-4 px-1 text-[10px] font-mono bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded shadow-sm">?</kbd> pour ouvrir ou fermer
          </p>
        </div>
      </div>
    </div>
  )
}