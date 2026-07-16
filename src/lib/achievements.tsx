import {
  Sparkles,
  Compass,
  Heart,
  GraduationCap,
  Crown,
  Flame,
  StickyNote,
  Bookmark,
  type LucideIcon,
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { toast } from 'sonner'

/* ── Achievement Definition ── */

export interface AchievementDef {
  id: string
  name: string
  description: string
  icon: LucideIcon
  color: string
  /** Tailwind classes for the icon container background */
  iconBg: string
  /** Tailwind classes for the icon color */
  iconColor: string
  /** Tailwind classes for the glow ring when unlocked */
  glowRing: string
  /** Returns { current, target } for progress display (null = no progress) */
  getProgress: () => { current: number; target: number } | null
  /** Returns true when the achievement should be unlocked */
  checkCondition: () => boolean
}

/* ── Achievement Color Configs ── */

const COLORS = {
  emerald: {
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/50',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    glowRing: 'ring-emerald-300/60 dark:ring-emerald-600/40',
  },
  sky: {
    iconBg: 'bg-sky-100 dark:bg-sky-900/50',
    iconColor: 'text-sky-600 dark:text-sky-400',
    glowRing: 'ring-sky-300/60 dark:ring-sky-600/40',
  },
  rose: {
    iconBg: 'bg-rose-100 dark:bg-rose-900/50',
    iconColor: 'text-rose-600 dark:text-rose-400',
    glowRing: 'ring-rose-300/60 dark:ring-rose-600/40',
  },
  amber: {
    iconBg: 'bg-amber-100 dark:bg-amber-900/50',
    iconColor: 'text-amber-600 dark:text-amber-400',
    glowRing: 'ring-amber-300/60 dark:ring-amber-600/40',
  },
  orange: {
    iconBg: 'bg-orange-100 dark:bg-orange-900/50',
    iconColor: 'text-orange-600 dark:text-orange-400',
    glowRing: 'ring-orange-300/60 dark:ring-orange-600/40',
  },
  'red-orange': {
    iconBg: 'bg-red-100 dark:bg-red-900/50',
    iconColor: 'text-red-500 dark:text-orange-400',
    glowRing: 'ring-red-300/60 dark:ring-red-600/40',
  },
  violet: {
    iconBg: 'bg-violet-100 dark:bg-violet-900/50',
    iconColor: 'text-violet-600 dark:text-violet-400',
    glowRing: 'ring-violet-300/60 dark:ring-violet-600/40',
  },
  gold: {
    iconBg: 'bg-amber-100 dark:bg-amber-900/50',
    iconColor: 'text-amber-500 dark:text-amber-300',
    glowRing: 'ring-amber-300/80 dark:ring-amber-500/40',
  },
} as const

/* ── All Achievement Definitions ── */

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: 'first-step',
    name: 'Premier pas',
    description: 'Lisez votre premier épisode',
    icon: Sparkles,
    color: 'emerald',
    iconBg: COLORS.emerald.iconBg,
    iconColor: COLORS.emerald.iconColor,
    glowRing: COLORS.emerald.glowRing,
    getProgress: () => {
      const count = useAppStore.getState().readEpisodes.length
      return { current: Math.min(count, 1), target: 1 }
    },
    checkCondition: () => useAppStore.getState().readEpisodes.length >= 1,
  },
  {
    id: 'explorer',
    name: 'Explorateur',
    description: 'Lisez 10 épisodes',
    icon: Compass,
    color: 'sky',
    iconBg: COLORS.sky.iconBg,
    iconColor: COLORS.sky.iconColor,
    glowRing: COLORS.sky.glowRing,
    getProgress: () => {
      const count = useAppStore.getState().readEpisodes.length
      return { current: Math.min(count, 10), target: 10 }
    },
    checkCondition: () => useAppStore.getState().readEpisodes.length >= 10,
  },
  {
    id: 'devoted',
    name: 'Dévoué',
    description: 'Lisez 25 épisodes',
    icon: Heart,
    color: 'rose',
    iconBg: COLORS.rose.iconBg,
    iconColor: COLORS.rose.iconColor,
    glowRing: COLORS.rose.glowRing,
    getProgress: () => {
      const count = useAppStore.getState().readEpisodes.length
      return { current: Math.min(count, 25), target: 25 }
    },
    checkCondition: () => useAppStore.getState().readEpisodes.length >= 25,
  },
  {
    id: 'scholar',
    name: 'Érudit',
    description: 'Lisez 50 épisodes',
    icon: GraduationCap,
    color: 'amber',
    iconBg: COLORS.amber.iconBg,
    iconColor: COLORS.amber.iconColor,
    glowRing: COLORS.amber.glowRing,
    getProgress: () => {
      const count = useAppStore.getState().readEpisodes.length
      return { current: Math.min(count, 50), target: 50 }
    },
    checkCondition: () => useAppStore.getState().readEpisodes.length >= 50,
  },
  {
    id: 'master',
    name: 'Maître',
    description: 'Lisez les 96 épisodes',
    icon: Crown,
    color: 'gold',
    iconBg: COLORS.gold.iconBg,
    iconColor: COLORS.gold.iconColor,
    glowRing: COLORS.gold.glowRing,
    getProgress: () => {
      const count = useAppStore.getState().readEpisodes.length
      return { current: count, target: 96 }
    },
    checkCondition: () => useAppStore.getState().readEpisodes.length >= 96,
  },
  {
    id: 'streak-3',
    name: 'Régularité',
    description: 'Série de lecture de 3 jours',
    icon: Flame,
    color: 'orange',
    iconBg: COLORS.orange.iconBg,
    iconColor: COLORS.orange.iconColor,
    glowRing: COLORS.orange.glowRing,
    getProgress: () => {
      const streak = useAppStore.getState().readingStreak
      return { current: Math.min(streak, 3), target: 3 }
    },
    checkCondition: () => useAppStore.getState().readingStreak >= 3,
  },
  {
    id: 'streak-7',
    name: 'Persévérance',
    description: 'Série de lecture de 7 jours',
    icon: Flame,
    color: 'red-orange',
    iconBg: COLORS['red-orange'].iconBg,
    iconColor: COLORS['red-orange'].iconColor,
    glowRing: COLORS['red-orange'].glowRing,
    getProgress: () => {
      const streak = useAppStore.getState().readingStreak
      return { current: Math.min(streak, 7), target: 7 }
    },
    checkCondition: () => useAppStore.getState().readingStreak >= 7,
  },
  {
    id: 'streak-30',
    name: 'Inébranlable',
    description: 'Série de lecture de 30 jours',
    icon: Flame,
    color: 'violet',
    iconBg: COLORS.violet.iconBg,
    iconColor: COLORS.violet.iconColor,
    glowRing: COLORS.violet.glowRing,
    getProgress: () => {
      const streak = useAppStore.getState().readingStreak
      return { current: Math.min(streak, 30), target: 30 }
    },
    checkCondition: () => useAppStore.getState().readingStreak >= 30,
  },
  {
    id: 'note-taker',
    name: 'Preneur de notes',
    description: 'Écrivez des notes sur 5 épisodes différents',
    icon: StickyNote,
    color: 'amber',
    iconBg: COLORS.amber.iconBg,
    iconColor: COLORS.amber.iconColor,
    glowRing: COLORS.amber.glowRing,
    getProgress: () => {
      const notesCount = Object.keys(useAppStore.getState().episodeNotes).filter(
        (k) => useAppStore.getState().episodeNotes[k].trim().length > 0
      ).length
      return { current: Math.min(notesCount, 5), target: 5 }
    },
    checkCondition: () => {
      const notesCount = Object.keys(useAppStore.getState().episodeNotes).filter(
        (k) => useAppStore.getState().episodeNotes[k].trim().length > 0
      ).length
      return notesCount >= 5
    },
  },
  {
    id: 'bookmark-collector',
    name: 'Collectionneur',
    description: 'Ajoutez 10 épisodes en favoris',
    icon: Bookmark,
    color: 'emerald',
    iconBg: COLORS.emerald.iconBg,
    iconColor: COLORS.emerald.iconColor,
    glowRing: COLORS.emerald.glowRing,
    getProgress: () => {
      const count = useAppStore.getState().bookmarks.length
      return { current: Math.min(count, 10), target: 10 }
    },
    checkCondition: () => useAppStore.getState().bookmarks.length >= 10,
  },
]

/* ── Lookup helper ── */

const ACHIEVEMENT_MAP = new Map(ACHIEVEMENTS.map((a) => [a.id, a]))

export function getAchievementById(id: string): AchievementDef | undefined {
  return ACHIEVEMENT_MAP.get(id)
}

/* ── Check & Unlock ── */

export function checkAndUnlockAchievements(): string[] {
  const state = useAppStore.getState()
  const { unlockedAchievements, unlockAchievement } = state
  const newlyUnlocked: string[] = []

  for (const achievement of ACHIEVEMENTS) {
    if (!unlockedAchievements.includes(achievement.id) && achievement.checkCondition()) {
      unlockAchievement(achievement.id)
      newlyUnlocked.push(achievement.id)
    }
  }

  // Show toast for each newly unlocked achievement
  for (const id of newlyUnlocked) {
    const achievement = ACHIEVEMENT_MAP.get(id)
    if (achievement) {
      const IconComp = achievement.icon
      toast.custom(
        () => (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-50 to-amber-50 dark:from-emerald-950/60 dark:to-amber-950/60 border border-emerald-200/60 dark:border-emerald-700/40 shadow-lg shadow-emerald-200/20 dark:shadow-emerald-900/20 min-w-[280px]">
            <div className="relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.iconBg} ring-2 ${achievement.glowRing}`}>
                <IconComp className={`h-5 w-5 ${achievement.iconColor}`} />
              </div>
              <span className="absolute -top-1 -right-1 text-base">🎉</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Succès débloqué !
              </p>
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">
                {achievement.name}
              </p>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                {achievement.description}
              </p>
            </div>
          </div>
        ),
        { duration: 4000, position: 'bottom-right' }
      )
    }
  }

  return newlyUnlocked
}