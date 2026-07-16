# Task 5-b/5-c/5-d — Full-Stack Developer (Features)

## Completed Features

### 1. Contact/Devis Modal (`src/components/contact-modal.tsx`)
- New file with Dialog, form fields: Nom complet, Email, Téléphone (optional), Formation select (6 options), Message textarea
- Validation: name required, email required + format check, formation required
- Submit shows sonner toast, closes dialog
- Emerald accent styling, card-hover-lift form container
- Form resets on close via handleOpenChange wrapper
- Formation pre-selected from prop via lazy useState initializer + key-based remount in parent

### 2. Formation Filter in Search Dialog (`src/components/search-dialog.tsx`)
- Added `FORMATION_FILTERS` config array (all/f1/f2/f3/f4) with path matchers
- Filter bar with pill buttons, emerald active state, count badges per filter
- Filters hidden when no results, filters with 0 count hidden
- Filter state resets on query change (in handleChange) and mode change (in handleModeChange)
- Shows "X résultats filtrés" when active, "sur Y trouvés · 96 épisodes"

### 3. Scroll-to-Top FAB (`src/app/page.tsx`)
- Fixed position button: `fixed right-6 bottom-16 z-30`
- Emerald circle with ArrowUp icon, shadow-lg with emerald color
- Scroll listener on `[data-radix-scroll-area-viewport]` inside `#main-content`
- Shows when scrollTop > 300px
- Fade in/out via opacity + translate-y transition
- Responsive: smaller on mobile (w-10 h-10 vs sm:w-11 sm:h-11)
- `print-hide` class, aria-label="Remonter en haut"

### Integration Notes
- Pricing page: added `contactOpen`, `contactFormation` state, `handleDevis` callback
- All 4 CTA button types now open the modal with the correct formation name
- Key-based remount on ContactModal ensures fresh state per formation
- All lint passes (no new errors from these changes)
