'use client'

import { useState } from 'react'
import { Play, Pause, Volume2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5]

function formatDuration(raw: string): string {
  // Accepts "XX:YY" or "XX min" or just a number string
  const trimmed = raw.trim()
  if (/^\d{1,2}:\d{2}$/.test(trimmed)) return trimmed

  const minMatch = trimmed.match(/(\d+)/)
  if (minMatch) {
    const totalMin = parseInt(minMatch[1], 10)
    const h = Math.floor(totalMin / 60)
    const m = totalMin % 60
    return h > 0 ? `${h}:${String(m).padStart(2, '0')}` : `0:${String(m).padStart(2, '0')}`
  }
  return '22:00'
}

interface AudioPlayerMockupProps {
  title: string
  meta?: Record<string, string>
}

export function AudioPlayerMockup({ title, meta }: AudioPlayerMockupProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [speedIndex, setSpeedIndex] = useState(1) // default 1x

  const currentSpeed = SPEED_OPTIONS[speedIndex]

  const duration =
    (meta && meta['Durée réelle']) ||
    (meta && meta['Durée cible']) ||
    '22:00'
  const displayDuration = formatDuration(duration)

  const cycleSpeed = () => {
    setSpeedIndex((prev) => (prev + 1) % SPEED_OPTIONS.length)
  }

  return (
    <div className="print-hide w-full bg-stone-50 dark:bg-stone-900/50 border-b border-stone-200 dark:border-stone-800 shadow-sm">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
        {/* Left: Play/Pause */}
        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-900"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 fill-current" />
          ) : (
            <Play className="h-4 w-4 fill-current ml-0.5" />
          )}
        </button>

        {/* Center: Title + Progress */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-stone-800 dark:text-stone-200 truncate mb-2">
            {title}
          </p>

          {/* Progress bar */}
          <div className="relative w-full h-[3px] bg-stone-200 dark:bg-stone-700 rounded-full mb-1.5 group cursor-pointer">
            {/* Played portion (0%) */}
            <div className="absolute inset-y-0 left-0 w-0 bg-emerald-500 rounded-full transition-none" />
            {/* Dot handle */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-3 h-3 bg-emerald-500 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150 hover:scale-125" />
          </div>

          {/* Time labels */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] tabular-nums text-stone-400 dark:text-stone-500 select-none">
              0:00
            </span>
            <span className="text-[11px] tabular-nums text-stone-400 dark:text-stone-500 select-none">
              {displayDuration}
            </span>
          </div>
        </div>

        {/* Right: Speed + Volume + Badge */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Speed control (hidden on very small screens) */}
          <button
            onClick={cycleSpeed}
            className="hidden sm:flex items-center justify-center h-7 min-w-[3rem] rounded-md px-2 text-xs font-medium tabular-nums text-stone-600 dark:text-stone-400 hover:bg-stone-200/70 dark:hover:bg-stone-800/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label={`Vitesse de lecture: ${currentSpeed}x`}
          >
            {currentSpeed}x
          </button>

          {/* Volume icon (hidden on very small screens) */}
          <button
            className="hidden sm:flex items-center justify-center h-7 w-7 rounded-md text-stone-500 dark:text-stone-400 hover:bg-stone-200/70 dark:hover:bg-stone-800/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="Volume"
          >
            <Volume2 className="h-4 w-4" />
          </button>

          {/* BETA badge */}
          <Badge
            variant="outline"
            className="h-6 px-1.5 text-[10px] font-semibold tracking-wider border-violet-300 text-violet-600 bg-violet-50 dark:border-violet-700 dark:text-violet-400 dark:bg-violet-950/40"
          >
            BETA
          </Badge>
        </div>
      </div>
    </div>
  )
}