import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDayProgress } from '../hooks/useDayProgress'
import { CheckItem, DayNav, NotesBox, WaterTracker } from '../components/primitives'
import { FuelTracker, type MealPlan } from '../components/FuelTracker'
import { ExerciseSheet } from '../components/ExerciseSheet'
import { EXERCISES } from '../lib/exercises'
import { foodById } from '../lib/foods'
import './Day014.css'

const DAY = 14
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
  { id: 'thoracic-floor', label: 'Thoracic extension · towel roll', sub: '60s on the floor' },
  { id: 'wall-angels', label: 'Wall angels', sub: '8 slow reps' },
]

const MEALS: MealPlan[] = [
  { id: 'breakfast', when: 'BREAKFAST', what: '3 eggs + base — after the tape, not before', protein: 19, kcal: 350 },
  { id: 'shake-am', when: 'MID-MORNING', what: 'Protein shake — before noon', protein: 20, kcal: 180 },
  { id: 'lunch', when: 'LUNCH', what: 'Rice + sambar + 2 boiled eggs + curd', protein: 30, kcal: 700 },
  { id: 'snack', when: '5 PM', what: 'Milk or curd + peanuts — zero caffeine today', protein: 12, kcal: 280 },
  { id: 'dinner', when: 'DINNER', what: 'Ragi mudde ×1 + chicken 200g — early, so bed comes easy', protein: 45, kcal: 800 },
]

const HABITS = [
  {
    id: 'sleep',
    label: 'In bed by 23:00 · 7h minimum',
    sub: 'your promise, now in writing. This is today\'s actual test — the incline test tomorrow runs only if this one passes tonight',
  },
  {
    id: 'walk',
    label: 'Easy 20–30 min walk',
    sub: 'the whole prescription for a three-short-nights body. Daylight if possible — it helps reset the clock for tonight',
  },
]

// meals don't count — fuel:goal auto-checks at the protein target
const TOTAL_ITEMS =
  REHAB.length + POSTURE.length + HABITS.length + 1 /* habit:measure */ + 1 /* fuel:goal */ + 1 // + water

export const manifest = {
  day: DAY,
  title: 'Low Power Mode',
  themeClass: 'd14',
  sections: [
    { title: 'Measurement day', items: [{ key: 'habit:measure', label: 'Tape + photos logged' }] },
    { title: 'Wrist rehab', items: REHAB.map((r) => ({ key: `rehab:${r.id}`, label: r.label })) },
    { title: 'The desk undo', items: POSTURE.map((p) => ({ key: `posture:${p.id}`, label: p.label })) },
    { title: 'Fuel', items: [{ key: 'fuel:goal', label: `Protein ${PROTEIN_TARGET}g — auto-checked` }] },
    { title: 'Habits', items: HABITS.map((h) => ({ key: `habit:${h.id}`, label: h.label })) },
  ],
}

export default function Day014() {
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
    <div className="d14">
      <div className="d14-inner">
        <header className="d14-top rise">
          <Link to="/" className="d14-back press">&larr; the_hundred</Link>
          <span className="d14-daytag">day_014 / phase_1 finale</span>
        </header>

        <div className="d14-title rise rise-1">
          <div className="d14-status">
            <span className="d14-dot" aria-hidden />
            low power mode
          </div>
          <h1>Day 14.<br />Downgraded, on purpose.</h1>
        </div>

        <div className="d14-readout rise rise-2" aria-hidden>
          <div><span>sleep_log</span><span>~4h · ~4h · ~4h</span></div>
          <div><span>rule</span><span>2+ bad nights → walk + posture only</span></div>
          <div><span>push_a</span><span>cancelled — not owed back</span></div>
          <div><span>incline_test</span><span>moved → day 15, if tonight ≥ 7h</span></div>
        </div>

        <p className="d14-note rise rise-3">
          Three nights near four hours, and you told me straight — good. Here's the program's
          own rule, written back at you: <strong>two consecutive terrible nights auto-downgrade
          the day to a walk and the posture routine.</strong> You're past two. So Push A is
          cancelled, not postponed — missed is skipped. And the incline test would be wasted
          today anyway: you already did 12 and 11 per set on Saturday, so the strength is
          proven. What's unproven is the sleep. That's why the test moves exactly one day and
          runs <strong>only if tonight delivers seven hours.</strong> Your promise is accepted
          — and a promise with a bedtime beats a promise with a feeling. Phase 1's real job
          was fourteen straight days of showing up. This page is the fourteenth. Job done.
        </p>

        <section className="d14-card measure rise rise-4">
          <div className="d14-h">
            <h2>measurement_day</h2>
            <span className="d14-tag">14 of 100</span>
          </div>
          <p className="d14-p">
            The tape doesn't care how you slept — this part of the day stays. Morning,
            post-toilet, pre-food: weight · waist · chest · shoulders · both arms, then the
            three photos, same spot and light as day 2. Two weeks in, expect the tape to have
            barely moved. It's the day-28 and day-42 readings that start talking.
          </p>
          <Link to="/measurements" className="d14-measure-btn press">
            open the measurement log →
          </Link>
          <CheckItem
            checked={!!c['habit:measure']}
            onToggle={() => toggleCheck('habit:measure')}
            label="Tape + photos logged"
            sub="tick this once the numbers are in"
          />
        </section>

        <section className="d14-card">
          <div className="d14-h">
            <h2>wrist_rehab</h2>
            <span className="d14-tag">5 min</span>
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

        <section className="d14-card">
          <div className="d14-h">
            <h2>the_desk_undo</h2>
            <span className="d14-tag">5 min</span>
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

        <section className="d14-card">
          <div className="d14-h">
            <h2>fuel</h2>
            <span className="d14-tag">135g / 2,350 kcal</span>
          </div>
          <p className="d14-p">
            A tired body still recomps if it's fed. Full rations today — and note the two
            sleep assists: no caffeine after noon, dinner early.
          </p>
          <FuelTracker
            meals={MEALS}
            checks={c}
            onToggleMeal={(id) => toggleCheck(`meal:${id}`)}
            extras={progress.logs['fuel:extras'] ?? ''}
            onExtras={(v) => setLog('fuel:extras', v)}
          />
          <div className="d14-goal" data-hit={goalHit}>
            <span className="tick" aria-hidden>{goalHit ? '✓' : '·'}</span>
            <span>
              protein {PROTEIN_TARGET}g — {goalHit ? 'target met. auto-checked.' : `auto-checks itself (${protein}g so far)`}
            </span>
          </div>
        </section>

        <section className="d14-card">
          <div className="d14-h">
            <h2>water</h2>
            <span className="d14-tag">3.0 L</span>
          </div>
          <p className="d14-p">8 yesterday — closest yet. Tired days mistake thirst for exhaustion; drink first.</p>
          <WaterTracker value={progress.water} onChange={setWater} />
        </section>

        <section className="d14-card">
          <div className="d14-h">
            <h2>habits</h2>
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

        <section className="d14-card">
          <div className="d14-h">
            <h2>notes</h2>
          </div>
          <NotesBox
            value={progress.notes}
            onChange={setNotes}
            placeholder="Measurements in? How deep is the tiredness, honestly — and what time did the lights actually go out…"
          />
        </section>

        <div className="d14-signoff">
          end of phase_1 · 14/14 days shown up ·<br />
          phase_2 &ldquo;build&rdquo; boots tomorrow — rested, or not at all
        </div>

        <DayNav day={DAY} />
      </div>

      <ExerciseSheet info={infoId ? (EXERCISES[infoId] ?? null) : null} onClose={() => setInfoId(null)} />
    </div>
  )
}
