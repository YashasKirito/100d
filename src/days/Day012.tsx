import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDayProgress } from '../hooks/useDayProgress'
import { CheckItem, DayNav, ExerciseCard, NotesBox, WaterTracker } from '../components/primitives'
import { FuelTracker, type MealPlan } from '../components/FuelTracker'
import { ExerciseSheet } from '../components/ExerciseSheet'
import { EXERCISES } from '../lib/exercises'
import { foodById } from '../lib/foods'
import './Day012.css'

const DAY = 12
const PROTEIN_TARGET = 135

const WORKOUT = [
  {
    id: 'dead-hang',
    name: 'Dead hang',
    rx: '3 × max · cap 30s',
    timer: true,
    note: "Rung 1's exit exam. Three holds, stop each at 30 even with gas left. All three hit the cap → the rung is closed for good and hangs retire into the warm-up.",
  },
  {
    id: 'scap-pulls',
    name: 'Scapular pulls',
    rx: '3 × 6–8',
    note: 'Yesterday, fresh: 6, 5, 5. Same slot today — beat one number, that\'s the whole job. Straight arms, blades down, no chin-chasing.',
  },
  {
    id: 'incline-pushup',
    name: 'Incline push-up · handles',
    rx: '3 × 10–11',
    note: "Monday is the Day-14 test: 3×10, zero wrist pain. Today is the dress rehearsal — crisp tens with 3 in reserve. Don't spend the show at rehearsal.",
  },
  {
    id: 'db-ohp',
    name: 'Overhead press · 5kg, neutral',
    rx: '3 × 8–12',
    note: 'The machine shoulder press, home edition. The shoulder has read 0/10 all week — face pulls earned that, strict reps keep it. Any pinch past 2 → set over.',
  },
  {
    id: 'band-row',
    name: 'Pause row · red band, short',
    rx: '3 × 10–12 · 3s pause',
    note: '"Band rows are becoming easy, need to make it tough." — your log, yesterday. Done: every rep now parks at the chest for a full three-count. Easy is over.',
  },
  {
    id: 'curls',
    name: 'Curls · 5kg',
    rx: '3 × 12',
    note: 'The weekend arms slot. 3s down, wrists straight as rulers — this is the line-item that fills sleeves.',
  },
  {
    id: 'face-pulls',
    name: 'Face pull · yellow band',
    rx: '3 × 15',
    note: 'The medicine stays on every bill. 2/10 shoulder to 0/10 in ten days is this exercise\'s work — it does not get a night off.',
  },
  {
    id: 'goblet-squat',
    name: 'Goblet squat · 5kg',
    rx: '3 × 12',
    note: 'Legs close the card — maintenance dose. The dumbbell counterweights you deeper and more upright than bodyweight allows.',
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
  { id: 'breakfast', when: 'BREAKFAST', what: '3 eggs + your usual base', protein: 19, kcal: 350 },
  { id: 'shake-am', when: 'MID-MORNING', what: 'Protein shake — before noon, as always', protein: 20, kcal: 180 },
  { id: 'lunch', when: 'LUNCH', what: 'Rice + sambar + 2 boiled eggs + curd', protein: 30, kcal: 700 },
  { id: 'snack', when: '5 PM', what: 'Milk or curd + peanuts', protein: 12, kcal: 280 },
  { id: 'dinner', when: 'DINNER', what: 'Ragi mudde ×1 + chicken 200g — Saturday headliner', protein: 45, kcal: 800 },
]

const HABITS = [
  {
    id: 'prep',
    label: 'The prep session you promised',
    sub: '"I\'ll prep more tomorrow! Okay? Okay." — your words, last night. Boil 6 eggs, cook the soya or chicken batch. 30 minutes buys the whole week',
  },
  {
    id: 'badminton',
    label: 'Badminton — wrist permitting',
    sub: 'wrist read 1/10 yesterday, so you\'re cleared to play. If it climbs past 2 mid-game, that was the last rally. No hero points',
  },
  {
    id: 'sleep',
    label: 'Sleep 7h+ — tonight\'s real main event',
    sub: '4 hours last night. Naps patch the hole, they don\'t fill it. Screens off by 00:30 — the muscle you trained today is built tonight',
  },
]

// meals don't count — fuel:goal auto-checks at the protein target
const TOTAL_ITEMS =
  WORKOUT.length + REHAB.length + POSTURE.length + HABITS.length + 1 /* fuel:goal */ + 1 // + water

export const manifest = {
  day: DAY,
  title: 'Saturday Session II',
  themeClass: 'd12',
  sections: [
    { title: 'Wrist rehab', items: REHAB.map((r) => ({ key: `rehab:${r.id}`, label: r.label })) },
    { title: 'The card', items: WORKOUT.map((e) => ({ key: `exercise:${e.id}`, label: e.name })) },
    { title: 'The desk undo', items: POSTURE.map((p) => ({ key: `posture:${p.id}`, label: p.label })) },
    { title: 'Fuel', items: [{ key: 'fuel:goal', label: `Protein ${PROTEIN_TARGET}g — auto-checked` }] },
    { title: 'Habits', items: HABITS.map((h) => ({ key: `habit:${h.id}`, label: h.label })) },
  ],
}

export default function Day012() {
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
    <div className="d12">
      <div className="d12-inner">
        <header className="d12-top rise">
          <Link to="/" className="d12-back press">← THE HUNDRED</Link>
          <span className="d12-daytag">DAY 12 · GYM DAY, HOME EDITION</span>
        </header>

        <div className="d12-poster rise rise-1">
          <div className="d12-banner">LIVE AT HOME · ONE NIGHT ONLY</div>
          <h1>
            <span>Saturday</span>
            <span className="d12-row2">
              Session <em>II</em>
            </span>
          </h1>
          <div className="d12-bill">8-EVENT CARD · 45–60 MIN · PHASE 1 RULES: STOP 3 EARLY</div>
        </div>

        <p className="d12-note rise rise-2">
          Straight talk before doors open. Last night was <strong>four hours of sleep</strong> —
          the naps kept you upright, and Phase 1 loads are light enough that today's card is
          still on. What's cancelled is a second night like it: growth happens in bed, and
          tonight is the actual main event. Meanwhile the back keeps receipts — scap pulls went{' '}
          <strong>6, 5, 5</strong> fresh, band rows got called "easy" in your own log, and the
          wrist sat at 1/10. So today the rows get harder, the hangs try to close rung 1, and
          badminton is cleared — wrist permitting.
        </p>

        <section className="d12-card rise rise-3">
          <div className="d12-h">
            <h2>Wrist rehab</h2>
            <span className="d12-tag">DAILY · PHASE 1</span>
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

        <section className="d12-card lineup rise rise-4">
          <div className="d12-h">
            <h2>The card</h2>
            <span className="d12-tag">60–90S BETWEEN SETS</span>
          </div>
          <p className="d12-p">
            Warm up first — arm circles ×10, cat-cow ×8, wall slides ×8, wrist circles + prayer
            30s, 10 easy squats. Bar opens while the grip is fresh; legs close.
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

        <section className="d12-card">
          <div className="d12-h">
            <h2>The desk undo</h2>
            <span className="d12-tag">5 MIN</span>
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

        <section className="d12-card">
          <div className="d12-h">
            <h2>Fuel</h2>
            <span className="d12-tag">135G · 2,350 KCAL</span>
          </div>
          <p className="d12-p">
            Yesterday the prepped food ran out and protein sank with it. That's not a discipline
            problem, it's a supply problem — and the fix is on today's bill under habits.
            Chicken headlines dinner. Log everything, honest as always.
          </p>
          <FuelTracker
            meals={MEALS}
            checks={c}
            onToggleMeal={(id) => toggleCheck(`meal:${id}`)}
            extras={progress.logs['fuel:extras'] ?? ''}
            onExtras={(v) => setLog('fuel:extras', v)}
          />
          <div className="d12-goal" data-hit={goalHit}>
            <span className="tick" aria-hidden>{goalHit ? '✓' : '·'}</span>
            <span>
              Protein {PROTEIN_TARGET}g — {goalHit ? 'sold out. Auto-checked.' : `auto-checks itself (${protein}g so far)`}
            </span>
          </div>
        </section>

        <section className="d12-card">
          <div className="d12-h">
            <h2>Water</h2>
            <span className="d12-tag">3.0 L</span>
          </div>
          <p className="d12-p">7 yesterday. You're home all day — the bottle has no commute excuse either.</p>
          <WaterTracker value={progress.water} onChange={setWater} />
        </section>

        <section className="d12-card">
          <div className="d12-h">
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

        <section className="d12-card">
          <div className="d12-h">
            <h2>Post-show review</h2>
          </div>
          <NotesBox
            value={progress.notes}
            onChange={setNotes}
            placeholder="Did rung 1 close — hang times? OHP shoulder /10, pause-row verdict, badminton report, prep done, kcal landed…"
          />
        </section>

        <div className="d12-signoff">
          SESSION II CLOSES THE WEEK-2 CARD · TOMORROW: FULL REST ·<br />
          MONDAY: DAY 14 — FIRST TEST + MEASUREMENTS
        </div>

        <DayNav day={DAY} />
      </div>

      <ExerciseSheet info={infoId ? (EXERCISES[infoId] ?? null) : null} onClose={() => setInfoId(null)} />
    </div>
  )
}
