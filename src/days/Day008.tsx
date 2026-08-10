import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDayProgress } from '../hooks/useDayProgress'
import { CheckItem, DayNav, ExerciseCard, NotesBox, WaterTracker } from '../components/primitives'
import { FuelTracker, type MealPlan } from '../components/FuelTracker'
import { ExerciseSheet } from '../components/ExerciseSheet'
import { EXERCISES } from '../lib/exercises'
import './Day008.css'

const DAY = 8

const WORKOUT = [
  {
    id: 'dead-hang',
    name: 'Dead hang',
    rx: '3 × max (cap 30s)',
    timer: true,
    note: 'Rung-1 attempt, take two. You hung 35s cold on Day 4 — three clean 30s today and scapular pulls become your rung next week. Stop each hang at 30 even with gas left.',
  },
  {
    id: 'scap-pulls',
    name: 'Scapular pulls',
    rx: '3 × 5',
    note: 'A preview of rung 2. Straight arms, blades down and back, body rises a few cm. If your elbows bend, it got too big.',
  },
  {
    id: 'band-row',
    name: 'Band row · red, shortened',
    rx: '3 × 12–15',
    note: 'Day 4 you hit sets of 20 — that band was too long. Grip more slack until 12–15 is honest work. Back tall, blades first.',
  },
  {
    id: 'pull-aparts',
    name: 'Band pull-aparts · yellow',
    rx: '3 × 15',
    note: 'Workout dose today, not just posture dose. Straight arms, band to the chest, one-beat squeeze.',
  },
  {
    id: 'curls',
    name: 'Curls · 5kg',
    rx: '3 × 12',
    note: 'The third set Day 5 owed you. 3s down every rep, wrists like rulers.',
  },
]

const REHAB = [
  { id: 'wrist-circles', label: 'Wrist circles', sub: '20s each direction' },
  { id: 'prayer', label: 'Prayer stretch', sub: '3 × 20s, gentle' },
  { id: 'wrist-curls', label: 'Wrist curls · 5kg', sub: '2 × 15 palm up' },
  { id: 'rev-curls', label: 'Reverse wrist curls', sub: '2 × 12 — yesterday\'s pike said these matter, believe it' },
]

const POSTURE = [
  { id: 'chin-tucks', label: 'Chin tucks', sub: '10 reps, 2s hold' },
  { id: 'pec-stretch', label: 'Doorway pec stretch', sub: '45s each side' },
  { id: 'thoracic-floor', label: 'Thoracic extension · towel roll', sub: '60s on the floor' },
  { id: 'wall-angels', label: 'Wall angels', sub: '8 slow reps' },
]

const MEALS: MealPlan[] = [
  { id: 'breakfast', when: 'BREAKFAST', what: '3 eggs — they\'re in the fridge, you said so yourself', protein: 19, kcal: 350 },
  { id: 'shake-am', when: 'MID-MORNING', what: 'SuperYou shake — caffeine closes at noon', protein: 25, kcal: 180 },
  { id: 'lunch', when: 'LUNCH', what: 'Rice + thick sambar + 2 boiled eggs + curd', protein: 30, kcal: 700 },
  { id: 'snack', when: '5 PM', what: 'Curd or milk + peanuts', protein: 12, kcal: 280 },
  { id: 'dinner', when: 'DINNER', what: 'Ragi mudde ×1 + the leftover chicken, 150g', protein: 40, kcal: 750 },
]

const HABITS = [
  { id: 'boil', label: 'Boil the eggs tonight', sub: 'the entire prep plan is now one pot. Six eggs minimum — tomorrow-you eats them' },
  { id: 'steps', label: '6k floor', sub: 'the new honest target. Office laps on water runs; 8k is for weekends' },
  { id: 'sleep', label: 'Sleep 7h+', sub: 'yesterday ran on fumes — tonight refuels the tank the kitchen half-filled' },
]

const TOTAL_ITEMS =
  WORKOUT.length + REHAB.length + POSTURE.length + MEALS.length + HABITS.length + 1 // + water

export const manifest = {
  day: DAY,
  title: 'The Ascent',
  themeClass: 'd8',
  sections: [
    { title: 'Wrist rehab', items: REHAB.map((r) => ({ key: `rehab:${r.id}`, label: r.label })) },
    { title: 'Pull A', items: WORKOUT.map((e) => ({ key: `exercise:${e.id}`, label: e.name })) },
    { title: 'The desk undo', items: POSTURE.map((p) => ({ key: `posture:${p.id}`, label: p.label })) },
    { title: 'Fuel', items: MEALS.map((m) => ({ key: `meal:${m.id}`, label: `${m.when} · ${m.protein}g` })) },
    { title: 'Habits', items: HABITS.map((h) => ({ key: `habit:${h.id}`, label: h.label })) },
  ],
}

export default function Day008() {
  const { progress, toggleCheck, setLog, setWater, setNotes } = useDayProgress(DAY, TOTAL_ITEMS)
  const c = progress.checks
  const [infoId, setInfoId] = useState<string | null>(null)

  return (
    <div className="d8">
      <div className="d8-inner">
        <header className="d8-top rise">
          <Link to="/" className="d8-back press">← THE HUNDRED</Link>
          <span className="d8-daytag">08 — PULL A</span>
        </header>

        <div className="d8-title rise rise-1">
          <div className="d8-index">day 08 / 100</div>
          <h1>the ascent.</h1>
          <div className="d8-rule" aria-hidden />
          <div className="d8-sub">
            Tuesday — the pull-up ladder's first scheduled climb. Your wrist's favourite
            session: everything hangs or pulls, nothing bends it back.
          </div>
        </div>

        <p className="d8-note rise rise-2">
          Two facts from yesterday set today up. One: shoulder at <strong>1/10</strong> on a
          real overhead press — the face pulls are working, pressing is officially back.
          Two: the fumes. 55 grams of protein produced 8, 5, 8 and a surrendered set — so
          today's board starts in the kitchen, not under the bar. Eggs before hangs.
        </p>

        <section className="d8-sec rise rise-3">
          <div className="d8-h">
            <span className="no">01</span>
            <h2>Wrist rehab</h2>
            <span className="d8-why">daily — pike said so</span>
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

        <section className="d8-sec rise rise-4">
          <div className="d8-h">
            <span className="no">02</span>
            <h2>Pull A</h2>
            <span className="d8-why">~30 min · 3 in reserve</span>
          </div>
          <p className="d8-p">
            Warm-up: arm circles ×10 · cat-cow ×8 · wall slides ×8 · wrist circles + prayer
            30s each · 10 squats. Bar first, fresh grip.
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

        <section className="d8-sec">
          <div className="d8-h">
            <span className="no">03</span>
            <h2>The desk undo</h2>
            <span className="d8-why">5 min</span>
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

        <section className="d8-sec">
          <div className="d8-h">
            <span className="no">04</span>
            <h2>Fuel</h2>
            <span className="d8-why">yesterday's lesson, applied</span>
          </div>
          <p className="d8-p">
            Non-veg day, fridge stocked: eggs exist, chicken exists. The plan below is 126g
            before a single chip. No improvising downward.
          </p>
          <FuelTracker
            meals={MEALS}
            checks={c}
            onToggleMeal={(id) => toggleCheck(`meal:${id}`)}
            extras={progress.logs['fuel:extras'] ?? ''}
            onExtras={(v) => setLog('fuel:extras', v)}
          />
        </section>

        <section className="d8-sec">
          <div className="d8-h">
            <span className="no">05</span>
            <h2>Water</h2>
            <span className="d8-why">10 · 10 — streak alive</span>
          </div>
          <WaterTracker value={progress.water} onChange={setWater} />
        </section>

        <section className="d8-sec">
          <div className="d8-h">
            <span className="no">06</span>
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

        <section className="d8-sec">
          <div className="d8-h">
            <span className="no">07</span>
            <h2>Notes</h2>
          </div>
          <NotesBox
            value={progress.notes}
            onChange={setNotes}
            placeholder="Hang times ×3? Wrist during hangs /10? Did the eggs happen? Energy vs yesterday…"
          />
        </section>

        <div className="d8-signoff">
          Saturday plan in motion: badminton returns this weekend — wrist-warmed, moderate,
          and only as long as the wrist stays quiet. Tomorrow: rest.
        </div>

        <DayNav day={DAY} />
      </div>

      <ExerciseSheet info={infoId ? (EXERCISES[infoId] ?? null) : null} onClose={() => setInfoId(null)} />
    </div>
  )
}
