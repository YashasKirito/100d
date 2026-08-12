import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDayProgress } from '../hooks/useDayProgress'
import { CheckItem, DayNav, ExerciseCard, NotesBox, WaterTracker } from '../components/primitives'
import { FuelTracker, type MealPlan } from '../components/FuelTracker'
import { ExerciseSheet } from '../components/ExerciseSheet'
import { EXERCISES } from '../lib/exercises'
import { foodById } from '../lib/foods'
import './Day010.css'

const DAY = 10
const PROTEIN_TARGET = 135

const WORKOUT = [
  {
    id: 'incline-pushup',
    name: 'Incline push-up · on handles',
    rx: '4 × 9–10',
    note: 'The tale of two Push days: fueled you did 8,8,7,7 — fumes did 8,5,8. You ate 123g yesterday, so today we find out what fed push-ups look like. Beat Thursday.',
  },
  {
    id: 'floor-press',
    name: 'Floor press · 5kg, slow tempo',
    rx: '3 × 12 · 3s down',
    note: 'The slow-tempo upgrade Day 5 owed you: three full seconds down, dead stop on the floor, drive up.',
  },
  {
    id: 'oh-triceps',
    name: 'Overhead triceps extension · single 5kg',
    rx: '3 × 13–15',
    note: 'You cleared 3×12 last Push B — add reps. Shoulder\'s been 0–1/10 all week; the lying swap stays in the sheet if it argues.',
  },
  {
    id: 'band-pushdown',
    name: 'Band pushdown · over the bar',
    rx: '2 × 15',
    note: 'New — the exercise that was waiting for the bar to exist. Loop the band over it, elbows bolted to your ribs, full lockout.',
  },
  {
    id: 'curls',
    name: 'Curls · 5kg',
    rx: '2 × 12',
    note: 'Standard dose — Tuesday already banked the extra set. Slow negatives, ruler wrists.',
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
  { id: 'breakfast', when: 'BREAKFAST', what: 'Sprouts bowl (your Day-8 build) + milk — veg day, eggs sit out', protein: 26, kcal: 400 },
  { id: 'shake-am', when: 'MID-MORNING', what: 'Protein shake — before noon', protein: 20, kcal: 180 },
  { id: 'lunch', when: 'LUNCH', what: 'Rice + sambar + soya-chunk curry + curd', protein: 32, kcal: 700 },
  { id: 'snack', when: '5 PM', what: 'Curd or milk + peanuts', protein: 12, kcal: 280 },
  { id: 'dinner', when: 'DINNER', what: 'Ragi mudde ×1 + paneer 150g', protein: 32, kcal: 720 },
]

const HABITS = [
  { id: 'calories', label: 'Land above 2,100 kcal', sub: 'protein is fixed; calories are the new gap (~1,850 two days running). Extra rice at lunch or a second mudde — cheap, easy calories' },
  { id: 'steps', label: '6k floor', sub: 'held it yesterday — hold it again' },
  { id: 'sleep', label: 'Sleep 7h+', sub: '6h last night, honestly logged (thank you). Tonight: full ration' },
]

// meals don't count — fuel:goal auto-checks at the protein target
const TOTAL_ITEMS =
  WORKOUT.length + REHAB.length + POSTURE.length + HABITS.length + 1 /* fuel:goal */ + 1 // + water

export const manifest = {
  day: DAY,
  title: 'Double Digits',
  themeClass: 'd10',
  sections: [
    { title: 'Wrist rehab', items: REHAB.map((r) => ({ key: `rehab:${r.id}`, label: r.label })) },
    { title: 'Push B', items: WORKOUT.map((e) => ({ key: `exercise:${e.id}`, label: e.name })) },
    { title: 'The desk undo', items: POSTURE.map((p) => ({ key: `posture:${p.id}`, label: p.label })) },
    { title: 'Fuel', items: [{ key: 'fuel:goal', label: `Protein ${PROTEIN_TARGET}g — auto-checked` }] },
    { title: 'Habits', items: HABITS.map((h) => ({ key: `habit:${h.id}`, label: h.label })) },
  ],
}

export default function Day010() {
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
    <div className="d10">
      <div className="d10-inner">
        <header className="d10-top rise">
          <Link to="/" className="d10-back press">← THE HUNDRED</Link>
          <span className="d10-daytag">DAY 10 · PUSH B</span>
        </header>

        <div className="d10-title rise rise-1">
          <div className="d10-burst" aria-hidden>10%</div>
          <h1>Double<br />digits!</h1>
          <div className="d10-sub">Thursday · Push B · veg edition · chest &amp; arms</div>
        </div>

        <p className="d10-note rise rise-2">
          One-tenth of the whole thing, done. The scoreboard so far: rung one closed twenty
          days early, shoulder rebuilt from 2/10 to zero, water basically automatic, and a
          tracker you now use honestly. Today is the fed rematch of Push B — last Thursday's
          8,8,7,7 was set on 90 grams; you bring 123 and boiled eggs' worth of recovery to
          this one. <strong>Beat the log.</strong>
        </p>

        <section className="d10-panel rise rise-3">
          <div className="d10-h">
            <h2>Wrist rehab</h2>
            <span className="d10-tag">DAILY!</span>
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

        <section className="d10-panel main rise rise-4">
          <div className="d10-h">
            <h2>Push B</h2>
            <span className="d10-tag">~35 MIN · POW!</span>
          </div>
          <p className="d10-p">
            Warm-up: arm circles ×10 · cat-cow ×8 · wall slides ×8 · wrist circles + prayer
            30s · 10 squats. Push-ups first, fresh.
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
            />
          ))}
        </section>

        <section className="d10-panel">
          <div className="d10-h">
            <h2>The desk undo</h2>
            <span className="d10-tag">5 MIN</span>
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

        <section className="d10-panel">
          <div className="d10-h">
            <h2>Fuel · veg day</h2>
            <span className="d10-tag">LOG = CHIPS, FINE!</span>
          </div>
          <p className="d10-p">
            Yesterday proved chips-only logging works — 123g, all honest. Today's twist is
            calories, not protein: two days at ~1,850 is under-building. The plan below is
            ~2,280; don't trim it.
          </p>
          <FuelTracker
            meals={MEALS}
            checks={c}
            onToggleMeal={(id) => toggleCheck(`meal:${id}`)}
            extras={progress.logs['fuel:extras'] ?? ''}
            onExtras={(v) => setLog('fuel:extras', v)}
          />
          <div className="d10-goal" data-hit={goalHit}>
            <span className="tick" aria-hidden>{goalHit ? '✓' : '·'}</span>
            <span>
              Protein {PROTEIN_TARGET}g — {goalHit ? 'hit! Auto-checked.' : `auto-checks itself (${protein}g so far)`}
            </span>
          </div>
        </section>

        <section className="d10-panel">
          <div className="d10-h">
            <h2>Water</h2>
            <span className="d10-tag">3L</span>
          </div>
          <WaterTracker value={progress.water} onChange={setWater} />
        </section>

        <section className="d10-panel">
          <div className="d10-h">
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

        <section className="d10-panel">
          <div className="d10-h">
            <h2>Issue #10 notes</h2>
          </div>
          <NotesBox
            value={progress.notes}
            onChange={setNotes}
            placeholder="Push-up count vs last Thursday? Pushdown feel? Shoulder /10, wrist /10, calories landed…"
          />
        </section>

        <div className="d10-signoff">TO BE CONTINUED → tomorrow: Pull B, scap pulls round two.</div>

        <DayNav day={DAY} />
      </div>

      <ExerciseSheet info={infoId ? (EXERCISES[infoId] ?? null) : null} onClose={() => setInfoId(null)} />
    </div>
  )
}
