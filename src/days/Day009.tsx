import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDayProgress } from '../hooks/useDayProgress'
import { CheckItem, DayNav, NotesBox, WaterTracker } from '../components/primitives'
import { FuelTracker, type MealPlan } from '../components/FuelTracker'
import { ExerciseSheet } from '../components/ExerciseSheet'
import { EXERCISES } from '../lib/exercises'
import { foodById } from '../lib/foods'
import './Day009.css'

const DAY = 9
const PROTEIN_TARGET = 135

const REHAB = [
  { id: 'wrist-circles', label: 'Wrist circles', sub: '20s each direction' },
  { id: 'prayer', label: 'Prayer stretch', sub: '3 × 20s, gentle' },
  { id: 'wrist-curls', label: 'Wrist curls · 5kg', sub: '2 × 15 palm up' },
  { id: 'rev-curls', label: 'Reverse wrist curls', sub: '2 × 12 — the road back to pike push-ups runs through these' },
]

const POSTURE = [
  { id: 'chin-tucks', label: 'Chin tucks', sub: '10 reps, 2s hold' },
  { id: 'pec-stretch', label: 'Doorway pec stretch', sub: '45s each side' },
  { id: 'pull-aparts', label: 'Band pull-aparts · yellow', sub: '2 × 15 — rest-day dose' },
  { id: 'thoracic-floor', label: 'Thoracic extension · towel roll', sub: '60s on the floor' },
  { id: 'wall-angels', label: 'Wall angels', sub: '8 slow reps' },
]

const MEALS: MealPlan[] = [
  { id: 'breakfast', when: 'BREAKFAST', what: '3 boiled eggs (Tuesday-you cooked them) + base', protein: 19, kcal: 320 },
  { id: 'shake-am', when: 'MID-MORNING', what: 'Protein shake — before noon', protein: 20, kcal: 180 },
  { id: 'lunch', when: 'LUNCH', what: 'Rice + sambar + 2 boiled eggs + curd', protein: 30, kcal: 700 },
  { id: 'snack', when: '5 PM', what: 'Curd or milk + peanuts', protein: 12, kcal: 280 },
  { id: 'dinner', when: 'DINNER', what: 'Ragi mudde ×1 + chicken 200g — yesterday proved big portions work', protein: 45, kcal: 800 },
]

const HABITS = [
  { id: 'thu-check', label: 'Tomorrow is veg Thursday — check the fridge tonight', sub: 'paneer or soya in stock? If not, they go on today\'s grocery run' },
  { id: 'steps', label: '6k floor', sub: 'yesterday was 5k. The floor is called a floor because you don\'t go under it' },
  { id: 'sleep', label: 'Sleep 7h+', sub: 'rest day sleep is where rung 2 gets built' },
]

// Meals deliberately NOT counted — your feedback, applied. The one fuel item
// in the % is the auto-checked protein goal.
const TOTAL_ITEMS = REHAB.length + POSTURE.length + HABITS.length + 1 /* fuel:goal */ + 1 // + water

export const manifest = {
  day: DAY,
  title: 'Stillness',
  themeClass: 'd9',
  sections: [
    { title: 'Wrist rehab', items: REHAB.map((r) => ({ key: `rehab:${r.id}`, label: r.label })) },
    { title: 'The desk undo', items: POSTURE.map((p) => ({ key: `posture:${p.id}`, label: p.label })) },
    { title: 'Fuel', items: [{ key: 'fuel:goal', label: `Protein ${PROTEIN_TARGET}g — auto-checked` }] },
    { title: 'Habits', items: HABITS.map((h) => ({ key: `habit:${h.id}`, label: h.label })) },
  ],
}

export default function Day009() {
  const { progress, toggleCheck, setLog, setWater, setNotes } = useDayProgress(DAY, TOTAL_ITEMS)
  const c = progress.checks
  const [infoId, setInfoId] = useState<string | null>(null)

  const extraIds = (progress.logs['fuel:extras'] ?? '').split(',').filter(Boolean)
  const protein =
    MEALS.filter((m) => c[`meal:${m.id}`]).reduce((s, m) => s + m.protein, 0) +
    extraIds.reduce((s, id) => s + (foodById(id)?.protein ?? 0), 0)
  const goalHit = protein >= PROTEIN_TARGET

  // fuel:goal ticks itself — no faking possible, no pressure to tick meals
  useEffect(() => {
    if (goalHit !== !!c['fuel:goal']) toggleCheck('fuel:goal')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goalHit])

  return (
    <div className="d9">
      <div className="d9-inner">
        <header className="d9-top rise">
          <Link to="/" className="d9-back press">← THE HUNDRED</Link>
          <span className="d9-daytag">DAY 09 · REST</span>
        </header>

        <div className="d9-title rise rise-1">
          <h1>Stillness.</h1>
          <div className="d9-sub">Wednesday — ten quiet minutes, and the growing happens</div>
        </div>

        <p className="d9-note rise rise-2">
          Yesterday you closed rung one — <strong>30, 30, 30</strong> — twenty days ahead of
          the milestone, on a <strong>145-gram day</strong>. That's the pattern in one line:
          fuel arrives, performance follows. Today asks for almost nothing back: the wrist
          minutes, the posture minutes, food, water, sleep. Rest is when the body reads
          everything this week wrote.
        </p>

        <section className="d9-card rise rise-3">
          <div className="d9-h">
            <h2>Wrist rehab</h2>
            <span className="d9-tag">5 min</span>
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

        <section className="d9-card rise rise-4">
          <div className="d9-h">
            <h2>The desk undo</h2>
            <span className="d9-tag">5 min</span>
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

        <section className="d9-card">
          <div className="d9-h">
            <h2>Fuel — new rules</h2>
            <span className="d9-tag">meals ≠ score</span>
          </div>
          <p className="d9-p">
            Your feedback, applied: <strong>meals no longer count toward completion.</strong>{' '}
            Tap what you actually ate — planned or chips, doesn't matter. The only thing the
            day's % sees is the box below, and it ticks itself at {PROTEIN_TARGET}g. Eat
            off-script all you want; just log it honestly.
          </p>
          <FuelTracker
            meals={MEALS}
            checks={c}
            onToggleMeal={(id) => toggleCheck(`meal:${id}`)}
            extras={progress.logs['fuel:extras'] ?? ''}
            onExtras={(v) => setLog('fuel:extras', v)}
          />
          <div className="d9-goal" data-hit={goalHit}>
            <span className="tick" aria-hidden>{goalHit ? '✓' : '·'}</span>
            <span>
              Protein {PROTEIN_TARGET}g — {goalHit ? 'hit. Auto-checked.' : `auto-checks itself (${protein}g so far)`}
            </span>
          </div>
        </section>

        <section className="d9-card">
          <div className="d9-h">
            <h2>Water</h2>
            <span className="d9-tag">3 litres</span>
          </div>
          <WaterTracker value={progress.water} onChange={setWater} />
        </section>

        <section className="d9-card">
          <div className="d9-h">
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

        <section className="d9-card">
          <div className="d9-h">
            <h2>Evening notes</h2>
          </div>
          <NotesBox
            value={progress.notes}
            onChange={setNotes}
            placeholder="Soreness from the hangs? Grip? Anything for tomorrow's Push B plan…"
          />
        </section>

        <div className="d9-signoff">Be still. Tomorrow: Push B, veg edition — floor press meets paneer.</div>

        <DayNav day={DAY} />
      </div>

      <ExerciseSheet info={infoId ? (EXERCISES[infoId] ?? null) : null} onClose={() => setInfoId(null)} />
    </div>
  )
}
