# my-100-day-challenge

Personal 100-day body transformation PWA. Vite + React + TS, Framer Motion (`motion`),
Firebase (optional sync), deployed on Vercel. One user: Yashas.

## The one rule

**Day pages are hand-crafted, never generated.** Each evening, the user and Claude build
the NEXT day's page together — one bespoke `src/days/DayNNN.tsx`, with its own design
personality. There is no generator and there must never be one. Do not batch-create pages.

## The evening ritual ("make day N")

When the user asks for the next day's page:

1. **Read `program/PROGRAM.md`.** Resolve day N: phase, week, whether it's a deload day,
   a measurement day (1, 14, 28, 42, 56, 70, 84, 100), or a milestone/test day. Session
   type comes from the actual weekday of day N (Mon Push A · Tue Pull A · Wed rest ·
   Thu Push B · Fri Pull B · Sat gym upper · Sun gym lower — Phase 1 & deloads: Sunday rest).
2. **Pull today's data**: `node scripts/pull-day.mjs <today>` (needs
   `.secrets/firebase-admin.json`, see the script header). Review checks, logged reps,
   water, and notes. Then **ask how today went** — wrist status (any pain above 2/10 →
   drop a rung and add rehab), energy, food. Apply progression: beat the log by 1–2 reps,
   advance a ladder rung at 3×12 clean.
3. **Read the last 2–3 day pages** (`src/days/`) and the `theme` fields in
   `src/days/registry.ts` — the new page must NOT repeat a recent design personality.
   Rotate moods: editorial, brutalist, playful, neon terminal, Swiss grid, handwritten,
   retro sport, minimal mono… Invoke the `emil-design-eng` skill before designing.
4. **Craft `src/days/DayNNN.tsx` (+ `DayNNN.css`).** Design is free-form, but the page MUST:
   - call `useDayProgress(N, TOTAL_ITEMS)` for all state (checks/logs/water/notes) —
     TOTAL_ITEMS = number of checkboxes on the page + 1 (water). This powers the
     dashboard's per-day completion %. Key conventions: `exercise:<id>`, `rehab:<id>`,
     `posture:<id>`, `habit:<id>`, `reps:<id>` in logs
   - include workout (with rep logging), rehab/posture where the program says, meals with
     protein counts, `WaterTracker`, habits, `NotesBox`, `DayNav`
   - give every exercise/rehab/posture item an `onInfo` opening the `ExerciseSheet`
     (`src/components/ExerciseSheet.tsx`). Any NEW movement not yet in
     `src/lib/exercises.ts` gets an entry there (steps/cues/mistakes, wristNote if
     pushing) AND an animated SMIL pictogram in
     `src/components/pictograms/Pictograms.tsx` — same stick-figure style, currentColor
     strokes, poses tweened with the `A` helper
   - stay mobile-first (max-width ~480px column) and respect `prefers-reduced-motion`
   - write coaching copy in the program's voice: direct, honest, why-first
   - shared primitives live in `src/components/primitives.tsx`; theme them via
     `--day-accent` (and `--day-surface`/`--day-border`) or bring custom UI
5. **Register it** in `src/days/registry.ts` (day, title, theme, lazy import — keep order).
6. **Verify**: `npm run build` must pass. Spot-check in `npm run dev`.
7. **Commit and push** (`feat: day N — <title>`). Vercel deploys it; it's live by morning.

## Commands

- `npm run dev` — local dev (uses Node ≥20; nvm has v24)
- `npm run build` — typecheck + production build (must pass before every push)
- `npm run preview` — serve the production build

## Architecture notes

- `src/lib/store.ts` — single storage API: localStorage always, Firestore mirror when
  signed in; newer `updatedAt` wins. Do not bypass it.
- `src/lib/program.ts` — phase/session/date math. `src/hooks/useDayProgress.ts` — the
  data contract for day pages. `src/hooks/useProfile.ts` — start date, auth.
- Firebase config comes from `VITE_FIREBASE_*` env vars; absent → localStorage-only mode.
- PWA via `vite-plugin-pwa` (autoUpdate). New deploys reach installed apps on next open.
