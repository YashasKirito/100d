import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDayProgress } from '../hooks/useDayProgress'
import { CheckItem, DayNav, ExerciseCard, NotesBox, WaterTracker } from '../components/primitives'
import { FuelTracker, type MealPlan } from '../components/FuelTracker'
import { ExerciseSheet } from '../components/ExerciseSheet'
import { EXERCISES } from '../lib/exercises'
import { foodById } from '../lib/foods'
import './Day017.css'

const DAY = 17
const PROTEIN_TARGET = 135

const WORKOUT = [
  {
    id: 'incline-pushup',
    name: 'Incline push-up · handles',
    rx: '4 × 8–12',
    note: 'Tuesday opened with 15 — on a fed, slept body. Tonight, four sets: write 12 across all four and the low incline unlocks on Monday. The rung advances when the last set looks like the first.',
  },
  {
    id: 'floor-press',
    name: 'Floor press · 5kg, 3s down',
    rx: '3 × 12–15',
    note: 'The log reads 12, 12, 12 from last week. Same tempo discipline, one or two more reps per set — the 5kg only stays heavy if the descent stays slow.',
  },
  {
    id: 'oh-triceps',
    name: 'Overhead triceps · 5kg',
    rx: '3 × 12–15 · now 3s down',
    note: 'You closed 15, 15, 15 — ceiling reached. So the exercise gets heavier the only way a fixed dumbbell can: three seconds down, every rep. The count may drop. That\'s the point.',
  },
  {
    id: 'band-pushdown',
    name: 'Band pushdown · red',
    rx: '3 × 15',
    note: 'Third set joins tonight. Elbows pinned to your ribs, strict — the band punishes cheating with slack.',
  },
  {
    id: 'curls',
    name: 'Curls · 5kg → superset band curls',
    rx: '3 × 12 + burnout',
    note: 'Phase 2 signature move: after each set of 12 with the dumbbells, grab the yellow band and curl until it burns. The tape gave the arms +1cm in two weeks — this is how the next centimetre gets ordered.',
  },
]

const REHAB = [
  { id: 'wrist-circles', label: 'Wrist circles', sub: '20s each direction' },
  { id: 'prayer', label: 'Prayer stretch', sub: '3 × 20s, gentle' },
  { id: 'wrist-curls', label: 'Wrist curls · 5kg', sub: '2 × 15 palm up' },
  { id: 'rev-curls', label: 'Reverse wrist curls', sub: '2 × 12 — before the pressing, as always' },
]

const POSTURE = [
  { id: 'chin-tucks', label: 'Chin tucks', sub: '10 reps, 2s hold' },
  { id: 'pec-stretch', label: 'Doorway pec stretch', sub: '45s each side — extra relevant on a chest night' },
  { id: 'pull-aparts', label: 'Band pull-aparts · yellow', sub: '2 × 15' },
  { id: 'thoracic-floor', label: 'Thoracic extension · towel roll', sub: '60s — skipped two days running. Tonight it headlines the intermission' },
  { id: 'wall-angels', label: 'Wall angels', sub: '8 slow reps' },
]

const MEALS: MealPlan[] = [
  { id: 'breakfast', when: 'BREAKFAST', what: 'Sprouts bowl + milk — veg Thursday, eggs sit out', protein: 26, kcal: 400 },
  { id: 'shake-am', when: 'MID-MORNING', what: 'Protein shake — before noon', protein: 20, kcal: 180 },
  { id: 'lunch', when: 'LUNCH', what: 'Rice + sambar + soya-chunk curry + curd', protein: 32, kcal: 700 },
  { id: 'snack', when: '5 PM', what: 'Curd or milk + peanuts', protein: 12, kcal: 280 },
  { id: 'dinner', when: 'DINNER', what: 'Ragi mudde ×1 + paneer 150g', protein: 32, kcal: 720 },
]

const HABITS = [
  {
    id: 'veg-prep',
    label: 'Soak the soya before noon',
    sub: 'veg-day protein is a logistics game — the chunks need their hour in water, and the paneer needs to actually be in the fridge. Check both before lunch decides for you',
  },
  {
    id: 'sleep',
    label: 'Sleep 7h+ · night four',
    sub: 'three in a row and Tuesday\'s exhaustion is already a story you tell. Keep the curtain time: 23:00',
  },
  {
    id: 'steps',
    label: '6k floor',
    sub: 'commute covers it — no encore required',
  },
]

// meals don't count — fuel:goal auto-checks at the protein target
const TOTAL_ITEMS =
  WORKOUT.length + REHAB.length + POSTURE.length + HABITS.length + 1 /* fuel:goal */ + 1 // + water

export const manifest = {
  day: DAY,
  title: 'The Push Revue',
  themeClass: 'd17',
  sections: [
    { title: 'Wrist rehab', items: REHAB.map((r) => ({ key: `rehab:${r.id}`, label: r.label })) },
    { title: 'Push B — Act II', items: WORKOUT.map((e) => ({ key: `exercise:${e.id}`, label: e.name })) },
    { title: 'The desk undo', items: POSTURE.map((p) => ({ key: `posture:${p.id}`, label: p.label })) },
    { title: 'Fuel', items: [{ key: 'fuel:goal', label: `Protein ${PROTEIN_TARGET}g — auto-checked` }] },
    { title: 'Habits', items: HABITS.map((h) => ({ key: `habit:${h.id}`, label: h.label })) },
  ],
}

export default function Day017() {
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
    <div className="d17">
      <div className="d17-inner">
        <header className="d17-top rise">
          <Link to="/" className="d17-back press">← THE HUNDRED</Link>
          <span className="d17-daytag">DAY 17 · PUSH B</span>
        </header>

        <div className="d17-marquee rise rise-1">
          <div className="d17-ornament" aria-hidden>◆ ◆ ◆</div>
          <div className="d17-presents">THE HUNDRED PROUDLY PRESENTS</div>
          <h1>The Push Revue</h1>
          <div className="d17-act">ACT II · CHEST &amp; ARMS · ONE NIGHT ONLY</div>
          <div className="d17-rule" aria-hidden />
        </div>

        <p className="d17-note rise rise-2">
          Three good nights, hunger answered, tank refilled — tonight we find out what a
          rested Push B looks like, because you've never actually had one: day 10 ran on
          holiday drift and day 15's session hit an empty battery. Phase 2 asks for{' '}
          <strong>one to two in reserve</strong>, the fourth push-up set arrives, and the
          triceps graduate to tempo work. It's veg Thursday, so the protein is choreography —
          sprouts, soya, paneer, each on cue — and the whole show closes by 23:00 sharp.
        </p>

        <section className="d17-card rise rise-3">
          <div className="d17-h">
            <h2>Wrist rehab</h2>
            <span className="d17-tag">OVERTURE · 5 MIN</span>
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

        <section className="d17-card main rise rise-4">
          <div className="d17-h">
            <h2>Push B — Act II</h2>
            <span className="d17-tag">~40 MIN · 1–2 IN RESERVE</span>
          </div>
          <p className="d17-p">
            Warm-up before curtain: arm circles ×10 · cat-cow ×8 · wall slides ×8 · wrist
            circles + prayer 30s · 10 squats. All pressing on the handles — the wrist rule
            has no understudy: past 2/10, the variant leaves the stage.
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

        <section className="d17-card">
          <div className="d17-h">
            <h2>The desk undo</h2>
            <span className="d17-tag">INTERMISSION · 5 MIN</span>
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

        <section className="d17-card">
          <div className="d17-h">
            <h2>Fuel</h2>
            <span className="d17-tag">135G · 2,350 KCAL</span>
          </div>
          <p className="d17-p">
            The veg-Thursday cast: sprouts open, soya carries the middle, paneer takes the
            final bow. No eggs on stage tonight — and no protein lost for it, if the
            logistics habit gets ticked early.
          </p>
          <FuelTracker
            meals={MEALS}
            checks={c}
            onToggleMeal={(id) => toggleCheck(`meal:${id}`)}
            extras={progress.logs['fuel:extras'] ?? ''}
            onExtras={(v) => setLog('fuel:extras', v)}
          />
          <div className="d17-goal" data-hit={goalHit}>
            <span className="tick" aria-hidden>{goalHit ? '✓' : '·'}</span>
            <span>
              Protein {PROTEIN_TARGET}g — {goalHit ? 'standing ovation. Auto-checked.' : `auto-checks itself (${protein}g so far)`}
            </span>
          </div>
        </section>

        <section className="d17-card">
          <div className="d17-h">
            <h2>Water</h2>
            <span className="d17-tag">3.0 L</span>
          </div>
          <p className="d17-p">
            Seven, five days straight — the most consistent number in the app, and the wrong
            one. Three more glasses. The streak to break tonight is the plateau.
          </p>
          <WaterTracker value={progress.water} onChange={setWater} />
        </section>

        <section className="d17-card">
          <div className="d17-h">
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

        <section className="d17-card">
          <div className="d17-h">
            <h2>Playbill notes</h2>
          </div>
          <NotesBox
            value={progress.notes}
            onChange={setNotes}
            placeholder="Push-up sets — 12s across? Triceps at 3s tempo, curl burnout verdict, wrist /10, energy vs Tuesday…"
          />
        </section>

        <div className="d17-signoff">
          ◆ ACT II CONCLUDES · TOMORROW: PULL B + CORE ·<br />
          THE PLANK RETURNS FOR ITS ENCORE ◆
        </div>

        <DayNav day={DAY} />
      </div>

      <ExerciseSheet info={infoId ? (EXERCISES[infoId] ?? null) : null} onClose={() => setInfoId(null)} />
    </div>
  )
}
