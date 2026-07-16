Task ID: 3 — Architecture Fix Agent
=====================================

## Problem
`src/lib/generated-data.ts` was 2.3MB (46,461 lines) because it embedded ALL 155 episode markdown contents + ALL 50 lead magnet contents as template literals. Turbopack (Next.js 16 dev server) crashed when trying to compile this file.

## Solution
Split the monolithic data file into:
1. **Structure-only TS** (`generated-data.ts`, ~58KB) — formations tree + episodesIndex
2. **Lazy-loaded JSON** (`public/data/episodes.json`, 2MB) — full episode content
3. **Lazy-loaded JSON** (`public/data/leadmagnets.json`, 295KB) — full lead magnet data

## Files Changed
- `scripts/pre-build-data.js` — rewritten to generate 3 output files
- `src/lib/generated-data.ts` — auto-regenerated (structure only, no content)
- `src/lib/data-loader.ts` — **NEW** — client-side lazy loader with caching
- `src/app/page.tsx` — uses lazy loading with loading state
- `src/components/lead-magnets-page.tsx` — uses lazy loading with loading state
- `src/components/formation-sidebar.tsx` — fixed broken imports
- `src/components/pricing-page.tsx` — removed dead import
- `src/lib/app-context.ts` — **NEW** — shared type definitions
- `src/lib/app-context.tsx` — fixed broken episodesData import

## Results
- `generated-data.ts`: 2.3MB → 58KB (97.5% reduction)
- Turbopack compilation: crash → success in ~2s
- All features working: reader view, lead magnets view, pricing view
- basePath `/alchimie-du-miroir` properly handled
