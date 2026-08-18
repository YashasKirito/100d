import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDayProgress } from '../hooks/useDayProgress'
import { CheckItem, DayNav, ExerciseCard, NotesBox, WaterTracker } from '../components/primitives'
import { FuelTracker, type MealPlan } from '../components/FuelTracker'
import { ExerciseSheet } from '../components/ExerciseSheet'
import { EXERCISES } from '../lib/exercises'
import { foodById } from '../lib/foods'
import './Day015.css'

const DAY = 15
const PROTEIN_TARGET = 135

const WORKOUT = [
  {
    id: 'incline-pushup',
    name: 'THE TEST — Incline push-up · handles',
    rx: '3 × 10 · zero wrist pain',
    note: 'The day-14 milestone, raced one day late and fully fueled. You hit 12 and 11 in training, so drive it clean: three crisp tens, wrist silent. Cross this line and phase 1 is officially in the books.',
  },
  {
    id: 'scap-pulls',
    name: 'Scapular pulls',
    rx: '4 × 6–8',
    note: 'Phase 2 adds the fourth set. The log says 6, 6, 5 — beat one number. The day you write 8, 8, 8 is the day negatives start. Straight arms, blades down.',
  },
  {
    id: 'db-row',
    name: 'Single-arm row · 5kg, 3-1-3',
    rx: '4 × 12 / side',
    note: 'Also up a set. Same crawl tempo — three down, one squeeze, three up. The 5kg stays honest only if the tempo does.',
  },
  {
    id: 'face-pulls',
    name: 'Face pull · yellow band',
    rx: '3 × 15',
    note: 'Never optional on a pull day — this is the medicine that keeps the shoulder at zero while the pressing volume climbs.',
  },
  {
    id: 'pull-aparts',
    name: 'Band pull-aparts · yellow',
    rx: '3 × 20',
    note: 'Phase 2 dose: twenty, not fifteen. Skipped in yesterday\'s desk-undo — today they ride with the workout where they can\'t be missed.',
  },
  {
    id: 'curls',
    name: 'Curls · 5kg',
    rx: '3 × 12 · slow',
    note: 'The tape just paid the arms a compliment — 31 and 31.5. Keep sending the bill: 3s down, wrists straight.',
  },
]

const REHAB = [
  { id: 'wrist-circles', label: 'Wrist circles', sub: '20s each direction' },
  { id: 'prayer', label: 'Prayer stretch', sub: '3 × 20s, gentle' },
  { id: 'wrist-curls', label: 'Wrist curls · 5kg', sub: '2 × 15 palm up' },
  { id: 'rev-curls', label: 'Reverse wrist curls', sub: '2 × 12 — phase 2 still gets the full 5 minutes daily' },
]

const POSTURE = [
  { id: 'chin-tucks', label: 'Chin tucks', sub: '10 reps, 2s hold' },
  { id: 'pec-stretch', label: 'Doorway pec stretch', sub: '45s each side' },
  { id: 'pull-aparts', label: 'Band pull-aparts · yellow', sub: '2 × 15 — desk dose, separate from the workout set' },
  { id: 'thoracic-floor', label: 'Thoracic extension · towel roll', sub: '60s on the floor' },
  { id: 'wall-angels', label: 'Wall angels', sub: '8 slow reps' },
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
    label: 'Sleep 7h+ · bed by 23:00',
    sub: 'one good night restarted the engine. Two makes it a pattern. The edit bay still closes at 23:00 — phase 2 is built at night',
  },
  {
    id: 'steps',
    label: '6k floor',
    sub: 'workday — the commute pays most of it',
  },
  {
    id: 'calories',
    label: 'Land above 2,100 kcal',
    sub: 'the waist wobbles when intake swings. Steady fuel, steady tape',
  },
]

// meals don't count — fuel:goal auto-checks at the protein target
const TOTAL_ITEMS =
  WORKOUT.length + REHAB.length + POSTURE.length + HABITS.length + 1 /* fuel:goal */ + 1 // + water

export const manifest = {
  day: DAY,
  title: 'Green Flag',
  themeClass: 'd15',
  sections: [
    { title: 'Wrist rehab', items: REHAB.map((r) => ({ key: `rehab:${r.id}`, label: r.label })) },
    { title: 'Pull A + the test', items: WORKOUT.map((e) => ({ key: `exercise:${e.id}`, label: e.name })) },
    { title: 'The desk undo', items: POSTURE.map((p) => ({ key: `posture:${p.id}`, label: p.label })) },
    { title: 'Fuel', items: [{ key: 'fuel:goal', label: `Protein ${PROTEIN_TARGET}g — auto-checked` }] },
    { title: 'Habits', items: HABITS.map((h) => ({ key: `habit:${h.id}`, label: h.label })) },
  ],
}

export default function Day015() {
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
    <div className="d15">
      <div className="d15-inner">
        <header className="d15-top rise">
          <Link to="/" className="d15-back press">← THE HUNDRED</Link>
          <span className="d15-daytag">DAY 15 · PULL A</span>
        </header>

        <div className="d15-title rise rise-1">
          <div className="d15-stripes" aria-hidden />
          <div className="d15-plate">
            <span className="d15-num">15</span>
            <div className="d15-plate-text">
              <h1>Green flag.</h1>
              <div className="d15-sub">PHASE 2 · BUILD · DAYS 15–42</div>
            </div>
          </div>
          <div className="d15-rules">NEW RULES: 1–2 IN RESERVE · BEAT THE LOG · FOURTH SETS ARRIVE</div>
        </div>

        <p className="d15-note rise rise-2">
          Slept, fueled, and back on track — that's the formation lap done right. Quick word
          from the tape before the lights go out: arms <strong>30→31 and 31→31.5</strong>,
          weight flat at 70 exactly as designed. Waist +1 and shoulders &minus;2 are almost
          certainly tape placement and food timing, not physiology — nobody loses 2cm of
          shoulders in two weeks of training. Day 28 settles it; nothing changes until then.
          Today the formality first: <strong>the incline test opens the session</strong>,
          fresh, and then phase 2 begins collecting — every lift now stops one to two reps
          short instead of three, and the log becomes the opponent.
        </p>

        <section className="d15-card rise rise-3">
          <div className="d15-h">
            <h2>Wrist rehab</h2>
            <span className="d15-tag">PIT CREW · DAILY</span>
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

        <section className="d15-card race rise rise-4">
          <div className="d15-flag" aria-hidden />
          <div className="d15-h">
            <h2>Pull A + the test</h2>
            <span className="d15-tag">~40 MIN · 60–90S REST</span>
          </div>
          <p className="d15-p">
            Warm-up first — arm circles ×10, cat-cow ×8, wall slides ×8, wrist circles +
            prayer 30s, 10 squats, one easy 15s hang to wake the grip. Then the test while
            you're freshest. Wrist rule stands: anything past 2/10 → drop a rung, add a
            rehab set, no arguing.
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

        <section className="d15-card">
          <div className="d15-h">
            <h2>The desk undo</h2>
            <span className="d15-tag">5 MIN</span>
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

        <section className="d15-card">
          <div className="d15-h">
            <h2>Fuel</h2>
            <span className="d15-tag">135G · 2,350 KCAL</span>
          </div>
          <p className="d15-p">
            You said the fuel's ready — good, because phase 2 volume runs on it. Yesterday
            logged almost nothing; today the tank gets filled and written down.
          </p>
          <FuelTracker
            meals={MEALS}
            checks={c}
            onToggleMeal={(id) => toggleCheck(`meal:${id}`)}
            extras={progress.logs['fuel:extras'] ?? ''}
            onExtras={(v) => setLog('fuel:extras', v)}
          />
          <div className="d15-goal" data-hit={goalHit}>
            <span className="tick" aria-hidden>{goalHit ? '✓' : '·'}</span>
            <span>
              Protein {PROTEIN_TARGET}g — {goalHit ? 'full tank. Auto-checked.' : `auto-checks itself (${protein}g so far)`}
            </span>
          </div>
        </section>

        <section className="d15-card">
          <div className="d15-h">
            <h2>Water</h2>
            <span className="d15-tag">3.0 L</span>
          </div>
          <p className="d15-p">7 · 8 · 7 across the weekend. The 10 hasn't happened since day 5 — today's a good day for a lap record.</p>
          <WaterTracker value={progress.water} onChange={setWater} />
        </section>

        <section className="d15-card">
          <div className="d15-h">
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

        <section className="d15-card">
          <div className="d15-h">
            <h2>Race report</h2>
          </div>
          <NotesBox
            value={progress.notes}
            onChange={setNotes}
            placeholder="Test result — 3×10, wrist /10? Scap pull numbers, row tempo honest?, sleep hours actual, kcal landed…"
          />
        </section>

        <div className="d15-signoff">
          LAP 15 OF 100 · TOMORROW: WEDNESDAY REST ·<br />
          THURSDAY PUSH B GETS ITS FOURTH SETS TOO
        </div>

        <DayNav day={DAY} />
      </div>

      <ExerciseSheet info={infoId ? (EXERCISES[infoId] ?? null) : null} onClose={() => setInfoId(null)} />
    </div>
  )
}
