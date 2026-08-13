import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDayProgress } from '../hooks/useDayProgress'
import { CheckItem, DayNav, ExerciseCard, NotesBox, WaterTracker } from '../components/primitives'
import { FuelTracker, type MealPlan } from '../components/FuelTracker'
import { ExerciseSheet } from '../components/ExerciseSheet'
import { EXERCISES } from '../lib/exercises'
import { foodById } from '../lib/foods'
import './Day011.css'

const DAY = 11
const PROTEIN_TARGET = 135

const WORKOUT = [
  {
    id: 'scap-pulls',
    name: 'Scapular pulls',
    rx: '3 × 4–6',
    note: 'Round two of the working rung. Tuesday was 3, 2, 3 after heavy hangs — today they come first, fresh. Straight arms, blades down, tiny and strict.',
  },
  {
    id: 'band-row',
    name: 'Band row · red, short',
    rx: '3 × 15 · slow',
    note: 'You own 3×15 at the short length — so the length stays and the speed drops: 2s pull, 2s return. Slow band rows are humbling.',
  },
  {
    id: 'db-row',
    name: 'Single-arm row · 5kg, 3-1-3',
    rx: '3 × 12 / side',
    note: 'Same tempo discipline as last week. Pull to the hip, back flat as a table.',
  },
  {
    id: 'face-pulls',
    name: 'Face pull · yellow band',
    rx: '3 × 15',
    note: 'The medicine that took the shoulder from 2/10 to zero. Doesn\'t stop now.',
  },
  {
    id: 'plank',
    name: 'Plank',
    rx: '3 × 45s',
    timer: true,
    note: 'Last week: 46, 34, 33. The first set proved 45 is yours — today the second and third sets learn it too. Rest a full 90s between holds.',
  },
  {
    id: 'dead-bug',
    name: 'Dead bug',
    rx: '3 × 10 / side',
    note: 'Up from 8s. Lower back glued down, slow limbs, exhale on the way out.',
  },
]

const REHAB = [
  { id: 'wrist-circles', label: 'Wrist circles', sub: '20s each direction' },
  { id: 'prayer', label: 'Prayer stretch', sub: '3 × 20s, gentle' },
  { id: 'wrist-curls', label: 'Wrist curls · 5kg', sub: '2 × 15 palm up' },
  { id: 'rev-curls', label: 'Reverse wrist curls', sub: '2 × 12' },
]

const POSTURE = [
  { id: 'chin-tucks', label: 'Chin tucks', sub: '10 reps, 2s hold' },
  { id: 'pec-stretch', label: 'Doorway pec stretch', sub: '45s each side' },
  { id: 'pull-aparts', label: 'Band pull-aparts · yellow', sub: '2 × 15' },
  { id: 'thoracic-floor', label: 'Thoracic extension · towel roll', sub: '60s on the floor' },
  { id: 'wall-angels', label: 'Wall angels', sub: '8 slow reps' },
]

const MEALS: MealPlan[] = [
  { id: 'breakfast', when: 'BREAKFAST', what: '3 eggs — back on the menu after veg Thursday', protein: 19, kcal: 350 },
  { id: 'shake-am', when: 'MID-MORNING', what: 'Protein shake — before noon', protein: 20, kcal: 180 },
  { id: 'lunch', when: 'LUNCH', what: 'Rice + sambar + 2 boiled eggs + curd', protein: 30, kcal: 700 },
  { id: 'snack', when: '5 PM', what: 'Curd or milk + peanuts', protein: 12, kcal: 280 },
  { id: 'dinner', when: 'DINNER', what: 'Ragi mudde ×1 + chicken 200g', protein: 45, kcal: 800 },
]

const HABITS = [
  {
    id: 'calories',
    label: 'Land above 2,100 kcal',
    sub: 'the pattern is clear now: office days eat fine, holidays crash. Today\'s a workday — use the rhythm',
  },
  { id: 'steps', label: '6k floor', sub: 'commute\'s back, so no excuses today' },
  { id: 'sleep', label: 'Sleep 7h+', sub: 'weekend starts tomorrow — don\'t spend it in advance tonight' },
]

// meals don't count — fuel:goal auto-checks at the protein target
const TOTAL_ITEMS =
  WORKOUT.length + REHAB.length + POSTURE.length + HABITS.length + 1 /* fuel:goal */ + 1 // + water

export const manifest = {
  day: DAY,
  title: 'The Back Works',
  themeClass: 'd11',
  sections: [
    { title: 'Wrist rehab', items: REHAB.map((r) => ({ key: `rehab:${r.id}`, label: r.label })) },
    { title: 'Pull B + core', items: WORKOUT.map((e) => ({ key: `exercise:${e.id}`, label: e.name })) },
    { title: 'The desk undo', items: POSTURE.map((p) => ({ key: `posture:${p.id}`, label: p.label })) },
    { title: 'Fuel', items: [{ key: 'fuel:goal', label: `Protein ${PROTEIN_TARGET}g — auto-checked` }] },
    { title: 'Habits', items: HABITS.map((h) => ({ key: `habit:${h.id}`, label: h.label })) },
  ],
}

export default function Day011() {
  const { progress, toggleCheck, setLog, setWater, setNotes } = useDayProgress(DAY, TOTAL_ITEMS)
  const c = progress.checks
  const [infoId, setInfoId] = useState<string | null>(null)

  const extraIds = (progress.logs['fuel:extras'] ?? '').split(',').filter(Boolean)
  const protein =
    MEALS.filter((m) => c[`meal:${m.id}`]).reduce((s, m) => s + m.protein, 0) +
    extraIds.reduce((s, id) => s + (foodById(id)?.protein ?? 0), 0)
  const goalHit = protein >= PROTEIN_TARGET

  useEffect(() => {
    if (goalHit !== !!c['fuel:goal']) toggleCheck('fuel:goal')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goalHit])

  return (
    <div className="d11">
      <div className="d11-inner">
        <header className="d11-top rise">
          <Link to="/" className="d11-back press">← THE HUNDRED</Link>
          <span className="d11-daytag">DWG № 011 · PULL B</span>
        </header>

        <div className="d11-title rise rise-1">
          <div className="d11-plate">
            <span>PROJECT</span>
            <span>V-TAPER · REAR ELEVATION</span>
          </div>
          <h1>The back works.</h1>
          <div className="d11-dim" aria-hidden>
            <span className="line" />
            <span className="label">shoulders 107 → 112 by day 100</span>
            <span className="line" />
          </div>
        </div>

        <p className="d11-note rise rise-2">
          Yesterday closed the case: <strong>10, 10, 10, 9.5</strong> — the same exercise that
          collapsed on Monday's empty tank. Fed you is a different athlete. Today that athlete
          builds the rear elevation: rows for width, scap pulls for the ladder, planks for the
          wall. One drafting note — the food pattern reads "office days eat fine, holidays
          crash." Tomorrow starts a weekend. The blueprint holds if you carry the rhythm into it.
        </p>

        <section className="d11-sheet rise rise-3">
          <div className="d11-h">
            <h2>Wrist rehab</h2>
            <span className="d11-tag">DETAIL A · DAILY</span>
          </div>
          {REHAB.map((r) => (
            <CheckItem
              key={r.id}
              checked={!!c[`rehab:${r.id}`]}
              onToggle={() => toggleCheck(`rehab:${r.id}`)}
              label={r.label}
              sub={r.sub}
              onInfo={() => setInfoId(r.id)}
            />
          ))}
        </section>

        <section className="d11-sheet main rise rise-4">
          <div className="d11-h">
            <h2>Pull B + core</h2>
            <span className="d11-tag">~35 MIN · 3 IN RESERVE</span>
          </div>
          <p className="d11-p">
            Warm-up: arm circles ×10 · cat-cow ×8 · wall slides ×8 · wrist circles + prayer
            30s · 10 squats. Bar first, fresh.
          </p>
          {WORKOUT.map((e) => (
            <ExerciseCard
              key={e.id}
              id={e.id}
              name={e.name}
              rx={e.rx}
              note={e.note}
              checked={!!c[`exercise:${e.id}`]}
              onToggle={() => toggleCheck(`exercise:${e.id}`)}
              log={progress.logs[`reps:${e.id}`]}
              onLog={(v) => setLog(`reps:${e.id}`, v)}
              onInfo={() => setInfoId(e.id)}
              timer={!!(e as { timer?: boolean }).timer}
            />
          ))}
        </section>

        <section className="d11-sheet">
          <div className="d11-h">
            <h2>The desk undo</h2>
            <span className="d11-tag">DETAIL B · 5 MIN</span>
          </div>
          {POSTURE.map((p) => (
            <CheckItem
              key={p.id}
              checked={!!c[`posture:${p.id}`]}
              onToggle={() => toggleCheck(`posture:${p.id}`)}
              label={p.label}
              sub={p.sub}
              onInfo={() => setInfoId(p.id)}
            />
          ))}
        </section>

        <section className="d11-sheet">
          <div className="d11-h">
            <h2>Fuel</h2>
            <span className="d11-tag">SPEC: 135G · 2,350 KCAL</span>
          </div>
          <p className="d11-p">
            Eggs return from their veg-day exile. Yesterday: ~77g on holiday drift — today's
            workday rhythm makes the spec easy. Log honest, chips welcome.
          </p>
          <FuelTracker
            meals={MEALS}
            checks={c}
            onToggleMeal={(id) => toggleCheck(`meal:${id}`)}
            extras={progress.logs['fuel:extras'] ?? ''}
            onExtras={(v) => setLog('fuel:extras', v)}
          />
          <div className="d11-goal" data-hit={goalHit}>
            <span className="tick" aria-hidden>{goalHit ? '✓' : '·'}</span>
            <span>
              Protein {PROTEIN_TARGET}g — {goalHit ? 'to spec. Auto-checked.' : `auto-checks itself (${protein}g so far)`}
            </span>
          </div>
        </section>

        <section className="d11-sheet">
          <div className="d11-h">
            <h2>Water</h2>
            <span className="d11-tag">3.0 L</span>
          </div>
          <WaterTracker value={progress.water} onChange={setWater} />
        </section>

        <section className="d11-sheet">
          <div className="d11-h">
            <h2>Habits</h2>
          </div>
          {HABITS.map((h) => (
            <CheckItem
              key={h.id}
              checked={!!c[`habit:${h.id}`]}
              onToggle={() => toggleCheck(`habit:${h.id}`)}
              label={h.label}
              sub={h.sub}
            />
          ))}
        </section>

        <section className="d11-sheet">
          <div className="d11-h">
            <h2>Revision notes</h2>
          </div>
          <NotesBox
            value={progress.notes}
            onChange={setNotes}
            placeholder="Scap pull count fresh vs tired? Plank ×3? Wrist /10 on the bar, calories landed, weekend plan…"
          />
        </section>

        <div className="d11-signoff">
          DWG № 011 APPROVED — NEXT SHEET: SATURDAY SESSION II · THEN BADMINTON, WRIST PERMITTING
        </div>

        <DayNav day={DAY} />
      </div>

      <ExerciseSheet info={infoId ? (EXERCISES[infoId] ?? null) : null} onClose={() => setInfoId(null)} />
    </div>
  )
}
