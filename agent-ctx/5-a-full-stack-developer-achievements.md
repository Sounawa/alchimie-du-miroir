---
Task ID: 5-a
Agent: full-stack-developer (achievements)
Task: Create Achievement/Badge system for reading milestones

Work Log:
- Added `unlockedAchievements: string[]` and `unlockAchievement(id: string) => void` to the AppState interface in `src/lib/store.ts`
- Added `unlockedAchievements` default state and `unlockAchievement` action to the Zustand store
- Added `unlockedAchievements` to the `partialize` config for localStorage persistence
- Created `src/lib/achievements.tsx` with 10 achievement definitions (all French text):
  1. first-step — "Premier pas" — Sparkles, emerald
  2. explorer — "Explorateur" — Compass, sky
  3. devoted — "Dévoué" — Heart, rose
  4. scholar — "Érudit" — GraduationCap, amber
  5. master — "Maître" — Crown, gold/amber
  6. streak-3 — "Régularité" — Flame, orange
  7. streak-7 — "Persévérance" — Flame, red-orange
  8. streak-30 — "Inébranlable" — Flame, violet
  9. note-taker — "Preneur de notes" — StickyNote, amber
  10. bookmark-collector — "Collectionneur" — Bookmark, emerald
- Each achievement has: id, name, description, icon, color config, getProgress(), checkCondition()
- Implemented `checkAndUnlockAchievements()` function that checks all conditions, auto-unlocks, and shows sonner toast with custom achievement styling (emerald/amber gradient, icon, name, description, 🎉 emoji)
- Integrated achievement check into `src/app/page.tsx` episode loading useEffect (after markAsRead, updateStreak, etc.)
- Added `AchievementsSection` component to `src/components/stats-dashboard.tsx`:
  - Grid layout (2-5 columns responsive)
  - Unlocked badges: full color icon, glow ring, checkmark, name, description
  - Locked badges: gray, Lock icon overlay, "???" text, progress bar, hint text
  - Total count badge: "X/10 succès débloqués"
- Added `RecentAchievements` component to `src/components/episode-reader.tsx` welcome screen:
  - Shows last 3 unlocked achievements as small badge cards
  - If none unlocked: "Commencez à lire pour débloquer vos premiers succès"
- Lint passes (only pre-existing error in gen-episodes.js)

Stage Summary:
- Full achievement/badge system implemented across 4 files
- 10 achievements covering reading milestones, streaks, notes, and bookmarks
- Persistent to localStorage via Zustand
- Toast notifications on unlock
- Displayed in both stats dashboard (full grid) and welcome screen (recent 3)
- All text in French, uses shadcn/ui components, card-hover-lift and section-reveal classes