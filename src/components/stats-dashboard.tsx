'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import { useAppStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Clock,
  BookOpen,
  StickyNote,
  Flame,
  Sparkles,
  Shield,
  Heart,
  Award,
  ArrowRight,
  Bookmark,
  Target,
  Calendar,
  Zap,
  Minus,
  Plus,
  Timer,
  History,
  BarChart3,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ACHIEVEMENTS, type AchievementDef, getAchievementById } from '@/lib/achievements'
import { Lock } from 'lucide-react'

const FORMATION_CONFIG = [
  { id: 'formation-1-musulman', name: 'Musulman', shortName: 'F1', color: 'emerald', icon: Sparkles },
  { id: 'formation-2-musulman-professionnel', name: 'Musulman Pro', shortName: 'F2', color: 'amber', icon: Shield },
  { id: 'formation-3-tout-public', name: 'Tout Public', shortName: 'F3', color: 'sky', icon: Heart },
  { id: 'formation-4-pro-tout-public', name: 'Pro Tout Public', shortName: 'F4', color: 'rose', icon: Award },
] as const

const COLOR_MAP: Record<string, { bg: string; bgLight: string; bgDark: string; text: string; textDark: string; border: string; bar: string; barDark: string; ring: string; ringDark: string }> = {
  emerald: {
    bg: 'bg-emerald-50',
    bgLight: 'bg-emerald-100',
    bgDark: 'dark:bg-emerald-950/40',
    text: 'text-emerald-700',
    textDark: 'dark:text-emerald-400',
    border: 'border-emerald-200',
    bar: 'bg-emerald-500',
    barDark: 'dark:bg-emerald-400',
    ring: 'ring-emerald-200',
    ringDark: 'dark:ring-emerald-800',
  },
  amber: {
    bg: 'bg-amber-50',
    bgLight: 'bg-amber-100',
    bgDark: 'dark:bg-amber-950/40',
    text: 'text-amber-700',
    textDark: 'dark:text-amber-400',
    border: 'border-amber-200',
    bar: 'bg-amber-500',
    barDark: 'dark:bg-amber-400',
    ring: 'ring-amber-200',
    ringDark: 'dark:ring-amber-800',
  },
  sky: {
    bg: 'bg-sky-50',
    bgLight: 'bg-sky-100',
    bgDark: 'dark:bg-sky-950/40',
    text: 'text-sky-700',
    textDark: 'dark:text-sky-400',
    border: 'border-sky-200',
    bar: 'bg-sky-500',
    barDark: 'dark:bg-sky-400',
    ring: 'ring-sky-200',
    ringDark: 'dark:ring-sky-800',
  },
  rose: {
    bg: 'bg-rose-50',
    bgLight: 'bg-rose-100',
    bgDark: 'dark:bg-rose-950/40',
    text: 'text-rose-700',
    textDark: 'dark:text-rose-400',
    border: 'border-rose-200',
    bar: 'bg-rose-500',
    barDark: 'dark:bg-rose-400',
    ring: 'ring-rose-200',
    ringDark: 'dark:ring-rose-800',
  },
}

const NIVEAU_LABELS = ['Initiation', 'Approfondissement', 'Intégration']
const WEEKDAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
const MONTH_NAMES = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']

function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  if (hours > 0) return `${hours}h ${minutes}min`
  if (minutes > 0) return `${minutes}min`
  return `${totalSeconds}s`
}

/* ── Animated Counter Hook ── */
function useAnimatedCounter(target: number, duration: number = 800) {
  const [displayed, setDisplayed] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const fromRef = useRef(0)

  useEffect(() => {
    fromRef.current = displayed
    startRef.current = null
    const animate = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      const current = Math.round(fromRef.current + (target - fromRef.current) * eased)
      setDisplayed(current)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration])

  return displayed
}

/* ── Progress Ring ── */
function ProgressRing({ percentage, size = 180, strokeWidth = 12 }: { percentage: number; size?: number; strokeWidth?: number }) {
  const [animatedPercent, setAnimatedPercent] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animatedPercent / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedPercent(percentage), 100)
    return () => clearTimeout(timer)
  }, [percentage])

  return (
    <div className="relative inline-flex items-center justify-center progress-ring-glow">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-stone-200 dark:text-stone-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(139 92 246)" />
            <stop offset="100%" stopColor="rgb(124 58 237)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-stone-900 dark:text-stone-100 tabular-nums">
          {Math.round(animatedPercent)}%
        </span>
        <span className="text-xs text-stone-500 dark:text-stone-400 mt-1">complété</span>
      </div>
    </div>
  )
}

/* ── Mini Sparkline Bars (last 7 days) ── */
function MiniSparkline({ data, color = 'bg-violet-400 dark:bg-violet-500' }: { data: number[]; color?: string }) {
  const maxVal = Math.max(...data, 1)
  return (
    <div className="flex items-end gap-[3px] h-5 mt-1.5">
      {data.map((val, i) => (
        <div
          key={i}
          className={cn(
            'flex-1 rounded-t-sm transition-all duration-500 min-w-0',
            val > 0 ? color : 'bg-stone-200 dark:bg-stone-700'
          )}
          style={{ height: `${Math.max((val / maxVal) * 100, 10)}%` }}
          title={`${val} épisode${val > 1 ? 's' : ''}`}
        />
      ))}
    </div>
  )
}

/* ── Weekly Goal Ring ── */
function WeeklyGoalRing({ percentage, size = 64, strokeWidth = 5 }: { percentage: number; size?: number; strokeWidth?: number }) {
  const [animatedPct, setAnimatedPct] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animatedPct / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedPct(Math.min(percentage, 100)), 150)
    return () => clearTimeout(timer)
  }, [percentage])

  return (
    <div className="relative inline-flex items-center justify-center shrink-0">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-stone-100 dark:text-stone-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(
            'transition-all duration-1000',
            percentage >= 100
              ? 'text-emerald-500 dark:text-emerald-400'
              : 'text-amber-500 dark:text-amber-400'
          )}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn(
          'text-[11px] font-bold tabular-nums',
          percentage >= 100
            ? 'text-emerald-600 dark:text-emerald-400'
            : 'text-amber-600 dark:text-amber-400'
        )}>
          {Math.round(animatedPct)}%
        </span>
      </div>
    </div>
  )
}

/* ── Stat Card with animated counter + sparkline ── */
function StatCard({
  icon: Icon,
  label,
  value,
  numericValue,
  sub,
  gradientFrom,
  gradientTo,
  sparklineData,
  sparklineColor,
}: {
  icon: React.ElementType
  label: string
  value: string
  numericValue?: number
  sub?: string
  gradientFrom: string
  gradientTo: string
  sparklineData?: number[]
  sparklineColor?: string
}) {
  const animatedVal = useAnimatedCounter(numericValue ?? 0, 1000)

  return (
    <Card className="border-0 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className={cn('p-4', `bg-gradient-to-br ${gradientFrom} ${gradientTo}`)}>
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-1">
              {label}
            </p>
            <p className="text-2xl font-bold text-stone-900 dark:text-stone-100 tabular-nums leading-tight">
              {numericValue !== undefined ? animatedVal : value}
            </p>
            {sub && (
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{sub}</p>
            )}
          </div>
          <div className="p-2 rounded-lg bg-white/60 dark:bg-black/20 shrink-0">
            <Icon className="h-4.5 w-4.5 text-stone-600 dark:text-stone-300" />
          </div>
        </div>
        {sparklineData && sparklineData.length > 0 && (
          <MiniSparkline data={sparklineData} color={sparklineColor} />
        )}
      </div>
    </Card>
  )
}

/* ── 12-week GitHub-style Heatmap ── */
function ReadingHeatmap({ readDates }: { readDates: Record<string, string> }) {
  const gridData = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // 84 days = 12 weeks, go back to start from a Sunday for clean grid
    const totalDays = 84
    const startDate = new Date(today)
    startDate.setDate(startDate.getDate() - (totalDays - 1))

    // Align to Sunday start (dayOfWeek 0)
    const startDow = startDate.getDay()
    const adjustedStart = new Date(startDate)
    adjustedStart.setDate(adjustedStart.getDate() - startDow)

    // Build date -> count map from readDates
    const dateCountMap: Record<string, number> = {}
    for (const dateStr of Object.values(readDates)) {
      dateCountMap[dateStr] = (dateCountMap[dateStr] || 0) + 1
    }

    // Build weeks (columns), each week has 7 days (rows)
    const weeks: Array<Array<{ date: Date; count: number; dateStr: string } | null>> = []
    const numWeeks = Math.ceil(((today - adjustedStart) / 86400000 + 1 + startDow) / 7)

    for (let w = 0; w < numWeeks; w++) {
      const week: Array<{ date: Date; count: number; dateStr: string } | null> = []
      for (let d = 0; d < 7; d++) {
        const cellDate = new Date(adjustedStart)
        cellDate.setDate(cellDate.getDate() + w * 7 + d)
        const dateStr = cellDate.toISOString().split('T')[0]

        if (cellDate <= today) {
          week.push({
            date: cellDate,
            count: dateCountMap[dateStr] || 0,
            dateStr,
          })
        } else {
          week.push(null)
        }
      }
      weeks.push(week)
    }

    // Compute month labels: for each column, check if the first non-null day is the 1st or earlier than the 7th
    const monthLabels: Array<{ label: string; colIndex: number }> = []
    for (let w = 0; w < weeks.length; w++) {
      const firstDay = weeks[w].find(c => c !== null)
      if (firstDay) {
        const day = firstDay.date.getDate()
        const month = firstDay.date.getMonth()
        const prevMonth = w > 0 ? (() => {
          const prevFirst = weeks[w - 1].find(c => c !== null)
          return prevFirst ? prevFirst.date.getMonth() : -1
        })() : -1

        if (month !== prevMonth && day <= 7) {
          monthLabels.push({ label: MONTH_NAMES[month], colIndex: w })
        }
      }
    }

    return { weeks, monthLabels }
  }, [readDates])

  const getHeatmapColor = (val: number) => {
    if (val === 0) return 'bg-stone-100 dark:bg-stone-800'
    if (val === 1) return 'bg-emerald-200 dark:bg-emerald-900/60'
    if (val <= 2) return 'bg-emerald-400 dark:bg-emerald-600'
    return 'bg-emerald-600 dark:bg-emerald-400'
  }

  const cellSize = 'w-[11px] h-[11px] sm:w-[13px] sm:h-[13px]'
  const gap = 'gap-[2px] sm:gap-[3px]'

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        {/* Month labels */}
        <div className={cn('flex mb-1', gap)} style={{ paddingLeft: '22px' }}>
          {gridData.weeks.map((_, wIdx) => {
            const ml = gridData.monthLabels.find(m => m.colIndex === wIdx)
            return (
              <div
                key={wIdx}
                className="flex-1 min-w-0"
              >
                {ml && (
                  <span className="text-[9px] sm:text-[10px] text-stone-400 dark:text-stone-500 font-medium">
                    {ml.label}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Grid with day labels */}
        <div className="flex">
          {/* Day-of-week labels */}
          <div className={cn('flex flex-col mr-1 shrink-0', gap)} style={{ paddingTop: '0' }}>
            {WEEKDAYS.map((dayLabel, dIdx) => (
              <div
                key={dayLabel + dIdx}
                className="flex items-center justify-end"
                style={{ height: '13px' }}
              >
                {dIdx % 2 === 1 && (
                  <span className="text-[9px] sm:text-[10px] text-stone-400 dark:text-stone-500 w-[18px] text-right">
                    {dayLabel}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Heatmap cells */}
          <div className={cn('flex flex-1 overflow-x-auto', gap)}>
            {gridData.weeks.map((week, wIdx) => (
              <div key={wIdx} className={cn('flex flex-col', gap)}>
                {week.map((cell, dIdx) => {
                  if (!cell) {
                    return (
                      <div
                        key={dIdx}
                        className={cn(cellSize, 'rounded-sm')}
                      />
                    )
                  }
                  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
                  return (
                    <div
                      key={dIdx}
                      className={cn(
                        cellSize,
                        'rounded-sm transition-colors duration-300 cursor-default heatmap-cell',
                        getHeatmapColor(cell.count)
                      )}
                      title={`${cell.dateStr} (${dayNames[cell.date.getDay()]}) : ${cell.count} épisode${cell.count > 1 ? 's' : ''}`}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1.5 mt-3">
          <span className="text-[10px] text-stone-400 dark:text-stone-500 mr-1">Moins</span>
          <div className="w-[11px] h-[11px] sm:w-[13px] sm:h-[13px] rounded-sm bg-stone-100 dark:bg-stone-800" />
          <div className="w-[11px] h-[11px] sm:w-[13px] sm:h-[13px] rounded-sm bg-emerald-200 dark:bg-emerald-900/60" />
          <div className="w-[11px] h-[11px] sm:w-[13px] sm:h-[13px] rounded-sm bg-emerald-400 dark:bg-emerald-600" />
          <div className="w-[11px] h-[11px] sm:w-[13px] sm:h-[13px] rounded-sm bg-emerald-600 dark:bg-emerald-400" />
          <span className="text-[10px] text-stone-400 dark:text-stone-500 ml-1">Plus</span>
        </div>
      </CardContent>
    </Card>
  )
}

/* ── Formation Progress Row ── */
function FormationProgressRow({
  formationConfig,
  readCount,
  total,
}: {
  formationConfig: typeof FORMATION_CONFIG[number]
  readCount: number
  total: number
}) {
  const colors = COLOR_MAP[formationConfig.color]
  const FIcon = formationConfig.icon
  const pct = total > 0 ? Math.round((readCount / total) * 100) : 0

  return (
    <div className="flex items-center gap-3 group">
      {/* Colored icon */}
      <div className={cn(
        'w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110',
        colors.bg, colors.bgDark
      )}>
        <FIcon className={cn('h-4 w-4', colors.text, colors.textDark)} />
      </div>

      {/* Info + progress bar */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
              {formationConfig.name}
            </span>
            <Badge
              variant="secondary"
              className={cn(
                'text-[10px] px-1.5 py-0',
                colors.bgLight, colors.bgDark, colors.text, colors.textDark
              )}
            >
              {formationConfig.shortName}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 dark:text-stone-400 tabular-nums">
              {readCount}/{total}
            </span>
            <span className={cn('text-sm font-bold tabular-nums w-10 text-right', colors.text, colors.textDark)}>
              {pct}%
            </span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-2.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-700 ease-out',
              colors.bar, colors.barDark
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export function StatsDashboard() {
  const {
    formations,
    readEpisodes,
    episodeNotes,
    readingTimes,
    readingStreak,
    bookmarks,
    selectEpisode,
    setView,
    readDates,
    recentEpisodes,
    dailyGoal: storeDailyGoal,
    weeklyGoal: storeWeeklyGoal,
    goalCompletedDates,
    setDailyGoal: storeSetDailyGoal,
    setWeeklyGoal: storeSetWeeklyGoal,
    isGoalMetToday: _isGoalMetToday,
    getWeeklyProgress: _getWeeklyProgress,
    getGoalStreak: _getGoalStreak,
  } = useAppStore()

  const goalMetToday = useMemo(() => _isGoalMetToday(), [_isGoalMetToday, readDates, storeDailyGoal, goalCompletedDates])
  const weeklyProgress = useMemo(() => _getWeeklyProgress(), [_getWeeklyProgress, readDates, storeWeeklyGoal])
  const goalStreak = useMemo(() => _getGoalStreak(), [_getGoalStreak, goalCompletedDates])

  const [dailyGoal, setDailyGoal] = useState(() => {
    if (typeof window === 'undefined') return 1
    const stored = localStorage.getItem('alchimie-daily-goal')
    return stored ? Number(stored) : 1
  })

  const handleSetGoal = (goal: number) => {
    setDailyGoal(goal)
    localStorage.setItem('alchimie-daily-goal', String(goal))
  }

  const readCount = readEpisodes.length
  const totalEpisodes = 96
  const percentage = totalEpisodes > 0 ? (readCount / totalEpisodes) * 100 : 0

  const totalReadingSeconds = useMemo(
    () => Object.values(readingTimes).reduce((a, b) => a + b, 0),
    [readingTimes]
  )
  const avgTimePerEpisode = readCount > 0 ? totalReadingSeconds / readCount : 0

  /* Today's reading time */
  const todayReadingTime = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    // readingTimes are per-path, readDates map path -> date
    let totalToday = 0
    for (const [path, date] of Object.entries(readDates)) {
      if (date === today) {
        totalToday += readingTimes[path] || 0
      }
    }
    return totalToday
  }, [readDates, readingTimes])

  const notesCount = useMemo(
    () => Object.values(episodeNotes).filter((n) => n.trim().length > 0).length,
    [episodeNotes]
  )

  const recentNotes = useMemo(() => {
    return Object.entries(episodeNotes)
      .filter(([, note]) => note.trim().length > 0)
      .slice(-5)
      .reverse()
      .map(([path, note]) => {
        const parts = path.split('/')
        const formationId = parts[0] || ''
        const formation = FORMATION_CONFIG.find((f) => f.id === formationId)
        const fileName = parts[parts.length - 1] || ''
        const titleParts = fileName.replace('.md', '').split('-')
        const num = titleParts[1] || ''
        const titleText = titleParts.slice(2).join(' ')
        return {
          path,
          title: `${num}. ${titleText.charAt(0).toUpperCase() + titleText.slice(1)}`,
          note: note.trim().slice(0, 50) + (note.trim().length > 50 ? '…' : ''),
          formationColor: formation?.color || 'stone',
        }
      })
  }, [episodeNotes])

  const formationStats = useMemo(() => {
    return FORMATION_CONFIG.map((fc, fIdx) => {
      const formation = formations.find((f) => f.id === fc.id)
      const allPaths = formation
        ? formation.niveaux.flatMap((n) => n.episodes.map((e) => e.slug))
        : Array.from({ length: 24 }, (_, i) => `fake-${fIdx}-${i}`)
      const readPaths = allPaths.filter((p) => readEpisodes.includes(p))
      const readCountForFormation = readPaths.length
      const timeSpent = readPaths.reduce((sum, p) => sum + (readingTimes[p] || 0), 0)

      const niveauStats = NIVEAU_LABELS.map((nLabel, nIdx) => {
        const niveau = formation?.niveaux[nIdx]
        const nPaths = niveau ? niveau.episodes.map((e) => e.slug) : []
        const nRead = nPaths.filter((p) => readEpisodes.includes(p)).length
        return { label: nLabel, read: nRead, total: 8 }
      })

      return {
        ...fc,
        readCount: readCountForFormation,
        total: 24,
        timeSpent,
        niveauStats,
      }
    })
  }, [formations, readEpisodes, readingTimes])

  /* Last 7 days data for sparklines */
  const last7DaysData = useMemo(() => {
    const today = new Date()
    const data: number[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      data.push(Object.values(readDates).filter(d => d === dateStr).length)
    }
    return data
  }, [readDates])

  /* Last 7 days reading time for sparkline */
  const last7DaysTime = useMemo(() => {
    const today = new Date()
    const data: number[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      let dayTime = 0
      for (const [path, date] of Object.entries(readDates)) {
        if (date === dateStr) {
          dayTime += readingTimes[path] || 0
        }
      }
      data.push(dayTime)
    }
    return data
  }, [readDates, readingTimes])

  const distribution = useMemo(() => {
    return FORMATION_CONFIG.map((fc) => {
      const formation = formations.find((f) => f.id === fc.id)
      const allPaths = formation
        ? formation.niveaux.flatMap((n) => n.episodes.map((e) => e.slug))
        : Array.from({ length: 24 }).map((_, i) => `fake-${fc.shortName}-${i}`)
      const completed = allPaths.filter((p) => readEpisodes.includes(p)).length
      const notStarted = 24 - completed
      return { ...fc, completed, notStarted }
    })
  }, [formations, readEpisodes])

  const handleNavigateToEpisode = (path: string) => {
    selectEpisode(path)
    setView('reader')
  }

  // Reading goals logic
  const todayDayOfWeek = (new Date().getDay() + 6) % 7 // Mon=0, Sun=6

  const todayReadCount = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    return Object.values(readDates).filter(d => d === today).length
  }, [readDates])

  const weeklyData = useMemo(() => {
    const today = new Date()
    const data = new Array(7).fill(0)
    for (let i = 0; i < 7; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - todayDayOfWeek + i)
      const dateStr = d.toISOString().split('T')[0]
      data[i] = Object.values(readDates).filter(d => d === dateStr).length
    }
    return data
  }, [readDates, todayDayOfWeek])

  const weekReadCount = useMemo(() => weeklyData.reduce((a, b) => a + b, 0), [weeklyData])

  const estimatedCompletionDate = useMemo(() => {
    const remaining = Math.max(0, 96 - readCount)
    if (remaining === 0) return 'Terminé !'
    const daysNeeded = Math.ceil(remaining / dailyGoal)
    const date = new Date()
    date.setDate(date.getDate() + daysNeeded)
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
  }, [readCount, dailyGoal])

  // Recent episodes for the new section
  const recentEpisodesData = useMemo(() => {
    return recentEpisodes.slice(0, 5).map((path) => {
      const parts = path.split('/')
      const formationId = parts[0] || ''
      const formation = FORMATION_CONFIG.find((f) => f.id === formationId)

      // Try to find the actual episode title from formations data
      let title = ''
      let niveauName = ''
      for (const f of formations) {
        for (const n of f.niveaux) {
          const ep = n.episodes.find((e) => e.slug === path)
          if (ep) {
            title = ep.title
            niveauName = n.name
            break
          }
        }
        if (title) break
      }

      // Fallback: parse from path
      if (!title) {
        const fileName = parts[parts.length - 1] || ''
        const titleParts = fileName.replace('.md', '').split('-')
        const num = titleParts[1] || ''
        const titleText = titleParts.slice(2).join(' ')
        title = `${num}. ${titleText.charAt(0).toUpperCase() + titleText.slice(1)}`
      }
      if (!niveauName) {
        const niveauPart = parts[1] || ''
        if (niveauPart.includes('niveau-1')) niveauName = 'Initiation'
        else if (niveauPart.includes('niveau-2')) niveauName = 'Approfondissement'
        else if (niveauPart.includes('niveau-3')) niveauName = 'Intégration'
        else niveauName = niveauPart
      }

      return {
        path,
        title,
        niveauName,
        formationName: formation?.shortName || formationId,
        formationColor: formation?.color || 'stone',
      }
    })
  }, [recentEpisodes, formations])

  // Bookmarks data
  const bookmarkedEpisodes = useMemo(() => {
    return bookmarks
      .map((slug) => {
        for (const f of formations) {
          for (const n of f.niveaux) {
            const ep = n.episodes.find((e) => e.slug === slug)
            if (ep) {
              const colorMap: Record<string, string> = {
                emerald: 'emerald', amber: 'amber', sky: 'sky', rose: 'rose',
              }
              return {
                path: slug,
                title: ep.title,
                formation: f.shortName || f.name,
                formationColor: colorMap[f.color] || 'stone',
              }
            }
          }
        }
        return null
      })
      .filter(Boolean) as Array<{ path: string; title: string; formation: string; formationColor: string }>
  }, [bookmarks, formations])

  return (
    <ScrollArea className="h-full">
      <div className="max-w-5xl mx-auto p-6 space-y-8 dot-grid-bg">
        {/* ── A. Hero Section with gradient ── */}
        <section className="section-reveal flex flex-col items-center text-center py-6 px-6 rounded-2xl bg-gradient-to-br from-violet-50 via-white to-emerald-50 dark:from-violet-950/20 dark:via-stone-900 dark:to-emerald-950/20 border border-stone-200/50 dark:border-stone-800/50">
          <ProgressRing percentage={percentage} />
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-6">
            {readCount} épisodes lus sur 96
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Votre progression globale à travers les 4 formations
          </p>
        </section>

        {/* ── B. Stats Grid (enhanced with animated counters + sparklines) ── */}
        <section className="section-reveal grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            icon={BookOpen}
            label="Épisodes lus"
            value={String(readCount)}
            numericValue={readCount}
            sub={`sur ${totalEpisodes} au total`}
            gradientFrom="from-emerald-50"
            gradientTo="to-emerald-100/50 dark:from-emerald-950/40 dark:to-emerald-900/20"
            sparklineData={last7DaysData}
            sparklineColor="bg-emerald-400 dark:bg-emerald-500"
          />
          <StatCard
            icon={Timer}
            label="Temps de lecture aujourd'hui"
            value={formatTime(todayReadingTime)}
            numericValue={Math.round(todayReadingTime / 60)}
            sub="écoulé aujourd'hui"
            gradientFrom="from-violet-50"
            gradientTo="to-violet-100/50 dark:from-violet-950/40 dark:to-violet-900/20"
            sparklineData={last7DaysTime.map(t => Math.round(t / 60))}
            sparklineColor="bg-violet-400 dark:bg-violet-500"
          />
          <StatCard
            icon={Clock}
            label="Temps total"
            value={formatTime(totalReadingSeconds)}
            numericValue={Math.round(totalReadingSeconds / 60)}
            sub={readCount > 0 ? `~${formatTime(avgTimePerEpisode)}/épisode` : 'Commencez à lire !'}
            gradientFrom="from-stone-50"
            gradientTo="to-stone-100/50 dark:from-stone-800/40 dark:to-stone-900/20"
            sparklineData={last7DaysTime.map(t => Math.round(t / 60))}
            sparklineColor="bg-stone-400 dark:bg-stone-500"
          />
          <StatCard
            icon={StickyNote}
            label="Notes écrites"
            value={String(notesCount)}
            numericValue={notesCount}
            sub={`sur ${readCount} épisodes lus`}
            gradientFrom="from-amber-50"
            gradientTo="to-amber-100/50 dark:from-amber-950/40 dark:to-amber-900/20"
          />
          <StatCard
            icon={Flame}
            label="Série en cours"
            value={readingStreak > 0 ? `${readingStreak}j` : '—'}
            numericValue={readingStreak}
            sub={readingStreak > 1 ? 'jours consécutifs' : readingStreak === 1 ? 'jour' : 'Lisez un épisode !'}
            gradientFrom="from-orange-50"
            gradientTo="to-orange-100/50 dark:from-orange-950/40 dark:to-orange-900/20"
          />
          <StatCard
            icon={Bookmark}
            label="Favoris"
            value={String(bookmarks.length)}
            numericValue={bookmarks.length}
            sub="épisodes marqués"
            gradientFrom="from-sky-50"
            gradientTo="to-sky-100/50 dark:from-sky-950/40 dark:to-sky-900/20"
          />
        </section>

        {/* ── B2. Objectif hebdomadaire with progress ring ── */}
        <section className="section-reveal">
          <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-amber-50 to-amber-100/30 dark:from-amber-950/20 dark:to-amber-900/10">
            <CardContent className="p-5">
              <div className="flex items-center gap-5">
                <WeeklyGoalRing percentage={weeklyProgress.percentage} size={72} strokeWidth={6} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                    <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                      Objectif hebdomadaire
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                    {weeklyProgress.current}
                    <span className="text-sm font-normal text-stone-500 dark:text-stone-400">/{weeklyProgress.target} épisodes</span>
                  </p>
                  <div className="h-2.5 rounded-full bg-stone-200/60 dark:bg-stone-700/60 overflow-hidden mt-2">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-700',
                        weeklyProgress.percentage >= 100
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300'
                          : 'bg-gradient-to-r from-amber-500 to-amber-400 dark:from-amber-400 dark:to-amber-300'
                      )}
                      style={{ width: `${Math.min(weeklyProgress.percentage, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className={cn(
                    'text-3xl font-bold tabular-nums',
                    weeklyProgress.percentage >= 100
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-amber-600 dark:text-amber-400'
                  )}>
                    {Math.round(weeklyProgress.percentage)}%
                  </span>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">
                    {weeklyProgress.percentage >= 100 ? 'Atteint ✓' : 'en cours'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── C. Formation Progress Breakdown ── */}
        <section className="section-reveal">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
            Progression par formation
          </h3>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-5 space-y-5">
              {formationStats.map((fs) => (
                <FormationProgressRow
                  key={fs.id}
                  formationConfig={fs}
                  readCount={fs.readCount}
                  total={fs.total}
                />
              ))}
              {/* Niveau details per formation */}
              {formationStats.map((fs) => {
                const colors = COLOR_MAP[fs.color]
                return (
                  <div key={`detail-${fs.id}`} className="pl-12 space-y-2">
                    {fs.niveauStats.map((ns) => (
                      <div key={ns.label} className="flex items-center gap-2">
                        <span className="text-[11px] text-stone-500 dark:text-stone-400 w-28 shrink-0 truncate">
                          {ns.label}
                        </span>
                        <div className="flex-1 h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                          <div
                            className={cn('h-full rounded-full transition-all duration-700', colors.bar, colors.barDark)}
                            style={{ width: `${(ns.read / ns.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-stone-400 dark:text-stone-500 tabular-nums w-8 text-right shrink-0">
                          {ns.read}/{ns.total}
                        </span>
                      </div>
                    ))}
                    <div className="text-[11px] text-stone-400 dark:text-stone-500 tabular-nums pl-0">
                      {formatTime(fs.timeSpent)} passées
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </section>

        {/* ── D. Reading Activity Heatmap (12 weeks, GitHub-style) ── */}
        <section className="section-reveal">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
              Activité de lecture
            </h3>
            <Badge variant="secondary" className="text-[10px] px-2 py-0 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-0">
              <BarChart3 className="h-3 w-3 mr-1" />
              12 semaines
            </Badge>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">Dernières 12 semaines de lecture</p>
          <ReadingHeatmap readDates={readDates} />
        </section>

        {/* ── E. Épisodes récents ── */}
        <section className="section-reveal">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
              Épisodes récents
            </h3>
            <Badge variant="secondary" className="text-[10px] px-2 py-0 bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 border-0">
              <History className="h-3 w-3 mr-1" />
              Derniers lus
            </Badge>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
            Revenez rapidement à vos dernières lectures
          </p>
          {recentEpisodesData.length === 0 ? (
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <History className="h-8 w-8 text-stone-300 dark:text-stone-600 mx-auto mb-2" />
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  Aucun épisode récent
                </p>
                <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                  Commencez à lire pour voir vos épisodes récents ici
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {recentEpisodesData.map((item, idx) => {
                const colors = COLOR_MAP[item.formationColor]
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigateToEpisode(item.path)}
                    className="w-full text-left p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800/80 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-xs font-bold text-stone-300 dark:text-stone-600 tabular-nums w-4">
                          {idx + 1}
                        </span>
                        <div className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110',
                          colors?.bg || 'bg-stone-100',
                          colors?.bgDark || 'dark:bg-stone-800'
                        )}>
                          <BookOpen className={cn('h-3.5 w-3.5', colors?.text || 'text-stone-500', colors?.textDark || 'dark:text-stone-400')} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge
                            variant="secondary"
                            className={cn(
                              'text-[9px] px-1.5 py-0',
                              colors?.bgLight || 'bg-stone-100',
                              colors?.bgDark || 'dark:bg-stone-800',
                              colors?.text || 'text-stone-500',
                              colors?.textDark || 'dark:text-stone-400'
                            )}
                          >
                            {item.formationName}
                          </Badge>
                          <span className="text-[10px] text-stone-400 dark:text-stone-500">
                            {item.niveauName}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-stone-300 dark:text-stone-600 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </section>

        {/* ── F. Reading Goal ── */}
        <section className="section-reveal">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
              Objectif de lecture
            </h3>
            <div className="flex items-center gap-1">
              {['1', '2', '3', '5'].map((goal) => (
                <button
                  key={goal}
                  onClick={() => handleSetGoal(Number(goal))}
                  className={cn(
                    'px-2 py-0.5 rounded-md text-[11px] font-medium transition-all',
                    dailyGoal === Number(goal)
                      ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-sm'
                      : 'text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                  )}
                >
                  {goal}/j
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
            {dailyGoal} épisode{dailyGoal > 1 ? 's' : ''} par jour — fin prévue le {estimatedCompletionDate}
          </p>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
                      Aujourd&apos;hui
                    </span>
                    <span className={cn(
                      'text-xs font-semibold tabular-nums',
                      todayReadCount >= dailyGoal ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-500 dark:text-stone-400'
                    )}>
                      {todayReadCount}/{dailyGoal}
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-700',
                        todayReadCount >= dailyGoal
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300'
                          : 'bg-gradient-to-r from-violet-500 to-violet-400 dark:from-violet-400 dark:to-violet-300 goal-shimmer'
                      )}
                      style={{ width: `${Math.min((todayReadCount / dailyGoal) * 100, 100)}%` }}
                    />
                  </div>
                  {todayReadCount >= dailyGoal && (
                    <div className="flex items-center gap-1.5 mt-2">
                      <Zap className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        Objectif atteint ! {todayReadCount - dailyGoal > 0 ? `+${todayReadCount - dailyGoal} bonus` : ''}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-center shrink-0">
                  <div className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold',
                    todayReadCount >= dailyGoal
                      ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                  )}>
                    {todayReadCount}
                  </div>
                  <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1">auj.</p>
                </div>
              </div>
              {/* Weekly mini tracker */}
              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-medium text-stone-600 dark:text-stone-400">Cette semaine</span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 tabular-nums">
                    {weekReadCount}/{dailyGoal * 7} ép.
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {WEEKDAYS.map((d, i) => {
                    const dayRead = weeklyData[i] || 0
                    const isToday = i === todayDayOfWeek
                    const isPast = i < todayDayOfWeek
                    return (
                      <div key={d} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-[9px] text-stone-400 dark:text-stone-500">{d}</span>
                        <div className={cn(
                          'w-5 h-5 rounded-sm flex items-center justify-center text-[9px] font-medium transition-all duration-300',
                          isToday && 'ring-1 ring-emerald-400 dark:ring-emerald-600',
                          dayRead >= dailyGoal
                            ? 'bg-emerald-500 text-white'
                            : dayRead > 0
                              ? 'bg-emerald-200 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300'
                              : isPast
                                ? 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
                                : 'bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500'
                        )}>
                          {dayRead > 0 ? dayRead : ''}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── F2. Reading Goals Panel ── */}
        <section className="section-reveal">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-1">
            Objectifs de lecture
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
            Suivez vos objectifs quotidiens et hebdomadaires
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Daily Goal Card */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Target className="h-4 w-4 text-emerald-500" />
                  Objectif quotidien
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                {/* Circular progress ring + info */}
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
                      <circle cx="28" cy="28" r="23" fill="none" stroke="currentColor" className="text-stone-100 dark:text-stone-800" strokeWidth="4" />
                      <circle
                        cx="28" cy="28" r="23" fill="none"
                        stroke="currentColor"
                        className={goalMetToday ? 'text-emerald-500' : 'text-violet-500'}
                        strokeWidth="4"
                        strokeDasharray={`${2 * Math.PI * 23}`}
                        strokeDashoffset={`${2 * Math.PI * 23 * (1 - Math.min(todayReadCount / storeDailyGoal, 1))}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={cn(
                        'text-xs font-bold tabular-nums',
                        goalMetToday ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-700 dark:text-stone-300'
                      )}>
                        {todayReadCount}/{storeDailyGoal}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                      {storeDailyGoal} épisode{storeDailyGoal > 1 ? 's' : ''} / jour
                    </p>
                    {goalMetToday ? (
                      <Badge className="mt-1.5 text-[10px] px-2 py-0 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-0">
                        Objectif atteint ✓
                      </Badge>
                    ) : (
                      <span className="inline-block mt-1.5 text-[10px] px-2 py-0 rounded-md font-medium bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400">
                        {todayReadCount}/{storeDailyGoal} restant
                      </span>
                    )}
                  </div>
                </div>
                {/* Streak */}
                {goalStreak > 0 && (
                  <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-stone-100 dark:border-stone-800">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
                      {goalStreak} jour{goalStreak > 1 ? 's' : ''} consécutif{goalStreak > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
                {/* Minus/Plus controls */}
                <div className="flex items-center justify-center gap-3 mt-3">
                  <button
                    onClick={() => storeSetDailyGoal(storeDailyGoal - 1)}
                    disabled={storeDailyGoal <= 1}
                    className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center transition-colors',
                      storeDailyGoal <= 1
                        ? 'text-stone-300 dark:text-stone-600 cursor-not-allowed'
                        : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    )}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 tabular-nums w-8 text-center">
                    {storeDailyGoal}
                  </span>
                  <button
                    onClick={() => storeSetDailyGoal(storeDailyGoal + 1)}
                    disabled={storeDailyGoal >= 10}
                    className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center transition-colors',
                      storeDailyGoal >= 10
                        ? 'text-stone-300 dark:text-stone-600 cursor-not-allowed'
                        : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    )}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Goal Card */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-amber-500" />
                  Objectif hebdomadaire
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <p className="text-sm font-medium text-stone-900 dark:text-stone-100 mb-3">
                  {storeWeeklyGoal} épisodes / semaine
                </p>
                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="h-3 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-700',
                        weeklyProgress.percentage >= 100
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                          : 'bg-gradient-to-r from-amber-500 to-amber-400'
                      )}
                      style={{ width: `${weeklyProgress.percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-600 dark:text-stone-400">
                      {weeklyProgress.current}/{weeklyProgress.target} cette semaine
                    </span>
                    <span className={cn(
                      'text-xs font-semibold tabular-nums',
                      weeklyProgress.percentage >= 100
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-stone-500 dark:text-stone-400'
                    )}>
                      {Math.round(weeklyProgress.percentage)}%
                    </span>
                  </div>
                </div>
                {/* Minus/Plus controls */}
                <div className="flex items-center justify-center gap-3 mt-4">
                  <button
                    onClick={() => storeSetWeeklyGoal(storeWeeklyGoal - 1)}
                    disabled={storeWeeklyGoal <= 1}
                    className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center transition-colors',
                      storeWeeklyGoal <= 1
                        ? 'text-stone-300 dark:text-stone-600 cursor-not-allowed'
                        : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    )}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 tabular-nums w-8 text-center">
                    {storeWeeklyGoal}
                  </span>
                  <button
                    onClick={() => storeSetWeeklyGoal(storeWeeklyGoal + 1)}
                    disabled={storeWeeklyGoal >= 50}
                    className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center transition-colors',
                      storeWeeklyGoal >= 50
                        ? 'text-stone-300 dark:text-stone-600 cursor-not-allowed'
                        : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    )}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ── G. Bookmarks Overview ── */}
        <section className="section-reveal">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
              Favoris
            </h3>
            <Badge variant="secondary" className="text-[10px] px-2 py-0 bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
              {bookmarkedEpisodes.length} épisode{bookmarkedEpisodes.length !== 1 ? 's' : ''}
            </Badge>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
            Épisodes marqués pour relecture
          </p>
          {bookmarkedEpisodes.length === 0 ? (
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Bookmark className="h-8 w-8 text-stone-300 dark:text-stone-600 mx-auto mb-2" />
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  Aucun favori
                </p>
                <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                  Appuyez sur B dans un épisode pour l&apos;ajouter
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {bookmarkedEpisodes.map((item) => {
                const colors = COLOR_MAP[item.formationColor]
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigateToEpisode(item.path)}
                    className="w-full text-left p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800/80 hover:shadow-lg transition-all duration-300 bookmark-card-hover"
                  >
                    <div className="flex items-center gap-3 relative z-10">
                      <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', colors.bg, colors.bgDark)}>
                        <Bookmark className={cn('h-3.5 w-3.5', colors.text, colors.textDark)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="secondary" className={cn('text-[9px] px-1 py-0', colors.bgLight, colors.bgDark, colors.text, colors.textDark)}>
                            {item.formation}
                          </Badge>
                          {readEpisodes.includes(item.path) && (
                            <span className="text-[9px] text-emerald-500 dark:text-emerald-400">✓ Lu</span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-stone-300 dark:text-stone-600 shrink-0" />
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </section>

        {/* ── H. Notes Overview ── */}
        <section className="section-reveal pb-8">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-1">
            Notes récentes
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
            {notesCount} note{notesCount !== 1 ? 's' : ''} au total
          </p>
          {recentNotes.length === 0 ? (
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <StickyNote className="h-8 w-8 text-stone-300 dark:text-stone-600 mx-auto mb-2" />
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  Aucune note pour le moment
                </p>
                <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                  Appuyez sur N dans un épisode pour écrire une note
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {recentNotes.map((item) => {
                const colors = COLOR_MAP[item.formationColor]
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigateToEpisode(item.path)}
                    className="w-full text-left p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800/80 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn('w-1 h-8 rounded-full shrink-0', colors.bar, colors.barDark)} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 truncate">
                          {item.note}
                        </p>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-stone-400 dark:text-stone-500 shrink-0" />
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </section>

        {/* ── I. Achievements ── */}
        <AchievementsSection />
      </div>
    </ScrollArea>
  )
}

/* ── Achievements Section ── */

function AchievementsSection() {
  const unlockedAchievements = useAppStore((s) => s.unlockedAchievements)
  const unlockedCount = unlockedAchievements.length
  const totalCount = ACHIEVEMENTS.length

  return (
    <section className="section-reveal pb-8">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
          Succès
        </h3>
        <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-0">
          {unlockedCount}/{totalCount} succès débloqués
        </Badge>
      </div>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
        Accomplissez des objectifs pour débloquer des badges
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {ACHIEVEMENTS.map((achievement) => {
          const isUnlocked = unlockedAchievements.includes(achievement.id)
          const progress = achievement.getProgress()
          const IconComp = achievement.icon

          return (
            <div
              key={achievement.id}
              className={cn(
                "relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 card-hover-lift",
                isUnlocked
                  ? "bg-white dark:bg-stone-900 border-stone-200/80 dark:border-stone-700/60 shadow-sm"
                  : "bg-stone-50/60 dark:bg-stone-900/40 border-stone-200/40 dark:border-stone-800/40 opacity-70"
              )}
            >
              {/* Glow ring for unlocked */}
              <div
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500",
                  achievement.iconBg,
                  isUnlocked && `ring-2 ${achievement.glowRing} shadow-lg`
                )}
              >
                {isUnlocked ? (
                  <IconComp className={cn("h-7 w-7", achievement.iconColor)} />
                ) : (
                  <Lock className="h-5 w-5 text-stone-300 dark:text-stone-600" />
                )}
              </div>

              {/* Name */}
              <span
                className={cn(
                  "text-xs font-semibold text-center leading-tight",
                  isUnlocked
                    ? "text-stone-900 dark:text-stone-100"
                    : "text-stone-400 dark:text-stone-500"
                )}
              >
                {isUnlocked ? achievement.name : '???'}
              </span>

              {/* Description or locked label */}
              <span className="text-[10px] text-muted-foreground text-center leading-tight min-h-[2rem]">
                {isUnlocked ? achievement.description : 'Continuez à lire pour révéler ce succès'}
              </span>

              {/* Progress indicator */}
              {progress && !isUnlocked && (
                <div className="w-full space-y-1">
                  <div className="h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-stone-400 dark:bg-stone-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.round((progress.current / progress.target) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[9px] text-stone-400 dark:text-stone-500 text-center tabular-nums">
                    {progress.current}/{progress.target}
                  </p>
                </div>
              )}

              {/* Unlocked checkmark */}
              {isUnlocked && (
                <span className="absolute top-2 right-2 text-emerald-500 dark:text-emerald-400 text-sm">✓</span>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}