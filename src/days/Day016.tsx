import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDayProgress } from '../hooks/useDayProgress'
import { CheckItem, DayNav, NotesBox, WaterTracker } from '../components/primitives'
import { FuelTracker, type MealPlan } from '../components/FuelTracker'
import { ExerciseSheet } from '../components/ExerciseSheet'
import { EXERCISES } from '../lib/exercises'
import { foodById } from '../lib/foods'
import './Day016.css'

const DAY = 16
const PROTEIN_TARGET = 135

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
  { id: 'thoracic-floor', label: 'Thoracic extension · towel roll', sub: '60s — skipped twice this week; the mid-back keeps score' },
  { id: 'wall-angels', label: 'Wall angels', sub: '8 slow reps — the other repeat offender' },
]

const MEALS: MealPlan[] = [
  { id: 'breakfast', when: 'BREAKFAST', what: '3 eggs + base', protein: 19, kcal: 350 },
  { id: 'shake-am', when: 'MID-MORNING', what: 'Protein shake — before noon', protein: 20, kcal: 180 },
  { id: 'lunch', when: 'LUNCH', what: 'Rice + sambar + 2 boiled eggs + curd', protein: 30, kcal: 700 },
  { id: 'snack', when: '5 PM', what: 'Milk or curd + peanuts', protein: 12, kcal: 280 },
  { id: 'dinner', when: 'DINNER', what: 'Ragi mudde ×1 + chicken 200g', protein: 45, kcal: 800 },
]

const HABITS = [
  {
    id: 'sleep',
    label: 'Sleep 7h+ · night three',
    sub: 'two nights make a pattern; three make a habit. The exhaustion you felt yesterday is the debt from the weekend still clearing — tonight keeps paying it down',
  },
  {
    id: 'feed',
    label: 'Hungry again? Feed it — protein first',
    sub: '"hungry af" after a training day is the recomp working, not a discipline failure. An extra egg, milk, or curd — answer hunger, don\'t argue with it',
  },
  {
    id: 'steps',
    label: '6k floor',
    sub: 'workday commute covers most of it — no more asked on a rest day',
  },
]

// meals don't count — fuel:goal auto-checks at the protein target
const TOTAL_ITEMS = REHAB.length + POSTURE.length + HABITS.length + 1 /* fuel:goal */ + 1 // + water

export const manifest = {
  day: DAY,
  title: 'Growth Day',
  themeClass: 'd16',
  sections: [
    { title: 'Wrist rehab', items: REHAB.map((r) => ({ key: `rehab:${r.id}`, label: r.label })) },
    { title: 'The desk undo', items: POSTURE.map((p) => ({ key: `posture:${p.id}`, label: p.label })) },
    { title: 'Fuel', items: [{ key: 'fuel:goal', label: `Protein ${PROTEIN_TARGET}g — auto-checked` }] },
    { title: 'Habits', items: HABITS.map((h) => ({ key: `habit:${h.id}`, label: h.label })) },
  ],
}

export default function Day016() {
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
    <div className="d16">
      <div className="d16-inner">
        <header className="d16-top rise">
          <Link to="/" className="d16-back press">← The Hundred</Link>
          <span className="d16-daytag">Plate XVI · Rest</span>
        </header>

        <div className="d16-title rise rise-1">
          <div className="d16-leaf" aria-hidden>❧</div>
          <h1>Growth day.</h1>
          <p className="d16-latin">Wednesday — in which nothing is lifted, and everything grows</p>
        </div>

        <div className="d16-frame rise rise-2">
          <div className="d16-fig">Fig. 1 — yesterday's harvest</div>
          <p>
            The test asked for three tens. You opened with <strong>fifteen</strong> — then
            10, 10 to seal it. The day-14 milestone is officially cleared:{' '}
            <em>incline push-ups, zero wrist pain, one day late and fully awake.</em> That
            first set of 15 also whispers something bigger: the next rung (low incline) is
            closer than scheduled.
          </p>
          <p>
            Now the honest part. "Super exhausted for some reason" — the reason isn't
            mysterious. One good night doesn't repay a weekend of four-hour nights; sleep
            debt clears over several nights, and phase 2 raised the volume the very same day.
            The scap pulls fading to 4s and the skipped curls were the tank, not the muscles.
            And "hungry af" is the same story from the other side — a recovering body sends
            the bill as appetite. Feed it. Today the program asks for ten quiet minutes,
            food, water, and the third good night. That's the whole page.
          </p>
        </div>

        <section className="d16-card rise rise-3">
          <div className="d16-h">
            <h2>Wrist rehab</h2>
            <span className="d16-tag">Fig. 2 · 5 min</span>
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

        <section className="d16-card rise rise-4">
          <div className="d16-h">
            <h2>The desk undo</h2>
            <span className="d16-tag">Fig. 3 · 5 min</span>
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

        <section className="d16-card">
          <div className="d16-h">
            <h2>Fuel</h2>
            <span className="d16-tag">Fig. 4 · 135g</span>
          </div>
          <p className="d16-p">
            Yesterday's hunger was a request form — today it gets approved. Full rations,
            and if the appetite knocks again between meals, the habits card has your answer.
          </p>
          <FuelTracker
            meals={MEALS}
            checks={c}
            onToggleMeal={(id) => toggleCheck(`meal:${id}`)}
            extras={progress.logs['fuel:extras'] ?? ''}
            onExtras={(v) => setLog('fuel:extras', v)}
          />
          <div className="d16-goal" data-hit={goalHit}>
            <span className="tick" aria-hidden>{goalHit ? '✓' : '·'}</span>
            <span>
              Protein {PROTEIN_TARGET}g — {goalHit ? 'in full bloom. Auto-checked.' : `auto-checks itself (${protein}g so far)`}
            </span>
          </div>
        </section>

        <section className="d16-card">
          <div className="d16-h">
            <h2>Water</h2>
            <span className="d16-tag">Fig. 5 · 3.0 L</span>
          </div>
          <p className="d16-p">Sevens all week. Plants that get watered grow — the metaphor writes itself today.</p>
          <WaterTracker value={progress.water} onChange={setWater} />
        </section>

        <section className="d16-card">
          <div className="d16-h">
            <h2>Habits</h2>
            <span className="d16-tag">Fig. 6</span>
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

        <section className="d16-card">
          <div className="d16-h">
            <h2>Field notes</h2>
          </div>
          <NotesBox
            value={progress.notes}
            onChange={setNotes}
            placeholder="Energy vs yesterday, hunger level, sleep hours actual, wrist /10 — and how it feels to have the first test in the books…"
          />
        </section>

        <div className="d16-signoff">
          Plate XVI, pressed and dried · tomorrow: Push B, fourth sets and a fed athlete ❧
        </div>

        <DayNav day={DAY} />
      </div>

      <ExerciseSheet info={infoId ? (EXERCISES[infoId] ?? null) : null} onClose={() => setInfoId(null)} />
    </div>
  )
}
