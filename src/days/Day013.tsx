import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDayProgress } from '../hooks/useDayProgress'
import { CheckItem, DayNav, NotesBox, WaterTracker } from '../components/primitives'
import { FuelTracker, type MealPlan } from '../components/FuelTracker'
import { ExerciseSheet } from '../components/ExerciseSheet'
import { EXERCISES } from '../lib/exercises'
import { foodById } from '../lib/foods'
import './Day013.css'

const DAY = 13
const PROTEIN_TARGET = 135

const REHAB = [
  { id: 'wrist-circles', label: 'Wrist circles', sub: '20s each direction' },
  { id: 'prayer', label: 'Prayer stretch', sub: '3 × 20s, gentle' },
  { id: 'wrist-curls', label: 'Wrist curls · 5kg', sub: '2 × 15 palm up' },
  { id: 'rev-curls', label: 'Reverse wrist curls', sub: '2 × 12 — quiet forearm work, loud by day 100' },
]

const POSTURE = [
  { id: 'chin-tucks', label: 'Chin tucks', sub: '10 reps, 2s hold' },
  { id: 'pec-stretch', label: 'Doorway pec stretch', sub: '45s each side' },
  { id: 'pull-aparts', label: 'Band pull-aparts · yellow', sub: '2 × 15' },
  { id: 'thoracic-floor', label: 'Thoracic extension · towel roll', sub: '60s — one of the two that got skipped yesterday. No makeup, just today\'s dose' },
  { id: 'wall-angels', label: 'Wall angels', sub: '8 slow reps — the other one' },
]

const MEALS: MealPlan[] = [
  { id: 'breakfast', when: 'BREAKFAST', what: '3 eggs + base — you restocked yesterday, use them', protein: 19, kcal: 350 },
  { id: 'shake-am', when: 'MID-MORNING', what: 'Protein shake — before noon', protein: 20, kcal: 180 },
  { id: 'lunch', when: 'LUNCH', what: 'Rice + sambar + 2 boiled eggs + curd', protein: 30, kcal: 700 },
  { id: 'snack', when: '5 PM', what: 'Milk or curd + peanuts', protein: 12, kcal: 280 },
  { id: 'dinner', when: 'DINNER', what: 'Ragi mudde ×1 + chicken 200g — fresh stock, Sunday portion', protein: 45, kcal: 800 },
]

const HABITS = [
  {
    id: 'measure-prep',
    label: 'Set up test morning tonight',
    sub: 'tape + phone charged + the same photo spot as day 2. Tomorrow: wake, toilet, THEN measure and shoot — before any food. Two minutes of setup makes the numbers honest',
  },
  {
    id: 'lights',
    label: 'The edit bay closes at 23:00',
    sub: 'the channel is a good project — but it\'s been paid for in sleep two nights running, and tomorrow is test day. Tonight YouTube wraps early, screens off 00:30',
  },
  {
    id: 'walk',
    label: 'Easy 20-minute walk',
    sub: 'rest day, not horizontal day. A stroll counts as recovery and buys tonight\'s sleep',
  },
]

// meals don't count — fuel:goal auto-checks at the protein target
const TOTAL_ITEMS = REHAB.length + POSTURE.length + HABITS.length + 1 /* fuel:goal */ + 1 // + water

export const manifest = {
  day: DAY,
  title: 'Sunday, Written Down',
  themeClass: 'd13',
  sections: [
    { title: 'Wrist rehab', items: REHAB.map((r) => ({ key: `rehab:${r.id}`, label: r.label })) },
    { title: 'The desk undo', items: POSTURE.map((p) => ({ key: `posture:${p.id}`, label: p.label })) },
    { title: 'Fuel', items: [{ key: 'fuel:goal', label: `Protein ${PROTEIN_TARGET}g — auto-checked` }] },
    { title: 'Habits', items: HABITS.map((h) => ({ key: `habit:${h.id}`, label: h.label })) },
  ],
}

export default function Day013() {
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
    <div className="d13">
      <div className="d13-inner">
        <header className="d13-top rise">
          <Link to="/" className="d13-back press">← the hundred</Link>
          <span className="d13-daytag">Sun · Day 13 · rest</span>
        </header>

        <div className="d13-title rise rise-1">
          <h1>Sunday, written down.</h1>
          <div className="d13-underline" aria-hidden />
          <p className="d13-dateline">Week two ends tonight. Ten minutes owed, nothing more.</p>
        </div>

        <div className="d13-entry rise rise-2">
          <p>
            Dear log — yesterday the hangs went <strong>30, 30, 30</strong> again, so that's
            settled twice over: <strong>hangs retire into the warm-up for good</strong>, and
            scap pulls (6, 6, 5 and climbing toward 3×8) are the working rung now. Negatives
            are on the horizon. The goblet squat and two posture lines ran out of clock —
            rule stands: missed is skipped, nothing gets made up today.
          </p>
          <p>
            Tomorrow is <strong>day 14 — the first test</strong>. Morning: tape, scale,
            photos, before food. Evening: incline push-ups, 3×10, zero wrist pain — a number
            you've already touched in training. The only thing that can fumble it is a third
            short night. Hence tonight's one real assignment (see habits).
          </p>
        </div>

        <section className="d13-card tape rise rise-3">
          <div className="d13-h">
            <h2>Wrist rehab</h2>
            <span className="d13-tag">5 min</span>
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

        <section className="d13-card tape alt rise rise-4">
          <div className="d13-h">
            <h2>The desk undo</h2>
            <span className="d13-tag">5 min</span>
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

        <section className="d13-card tape">
          <div className="d13-h">
            <h2>Tomorrow morning, pinned here</h2>
            <span className="d13-tag">read tonight</span>
          </div>
          <ul className="d13-protocol">
            <li>Wake → toilet → <strong>then</strong> measure. No food first.</li>
            <li>Weight · waist at navel · chest at nipple · shoulders widest · both arms, flexed.</li>
            <li>Photos: front, side, back — same spot and light as day 2.</li>
            <li>Baseline to beat someday, not today: 70kg · 84 · 93 · 107 · 30/31.</li>
            <li>Expect the scale to say ~70. That's the plan working, not failing.</li>
          </ul>
        </section>

        <section className="d13-card tape alt">
          <div className="d13-h">
            <h2>Fuel</h2>
            <span className="d13-tag">135g · 2,350 kcal</span>
          </div>
          <p className="d13-p">
            Fridge is stocked — your Saturday errands made today's protein cheap. Rest days
            eat the same as training days; muscle is being written tonight either way.
          </p>
          <FuelTracker
            meals={MEALS}
            checks={c}
            onToggleMeal={(id) => toggleCheck(`meal:${id}`)}
            extras={progress.logs['fuel:extras'] ?? ''}
            onExtras={(v) => setLog('fuel:extras', v)}
          />
          <div className="d13-goal" data-hit={goalHit}>
            <span className="tick" aria-hidden>{goalHit ? '✓' : '·'}</span>
            <span>
              Protein {PROTEIN_TARGET}g — {goalHit ? 'done, underlined twice.' : `auto-checks itself (${protein}g so far)`}
            </span>
          </div>
        </section>

        <section className="d13-card tape">
          <div className="d13-h">
            <h2>Water</h2>
            <span className="d13-tag">3.0 L</span>
          </div>
          <p className="d13-p">7 and 7 the last two days. Sunday at home — round it to 10 for once.</p>
          <WaterTracker value={progress.water} onChange={setWater} />
        </section>

        <section className="d13-card tape alt">
          <div className="d13-h">
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

        <section className="d13-card tape">
          <div className="d13-h">
            <h2>Tonight's entry</h2>
          </div>
          <NotesBox
            value={progress.notes}
            onChange={setNotes}
            placeholder="How the body feels after week 2, wrist /10, edit bay closed on time?, anything for tomorrow's test…"
          />
        </section>

        <div className="d13-signoff">
          — end of week two. tomorrow the tape tells its first story. sleep well. ✎
        </div>

        <DayNav day={DAY} />
      </div>

      <ExerciseSheet info={infoId ? (EXERCISES[infoId] ?? null) : null} onClose={() => setInfoId(null)} />
    </div>
  )
}
