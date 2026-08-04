import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDayProgress } from '../hooks/useDayProgress'
import {
  CheckItem,
  DayNav,
  ExerciseCard,
  MacroBar,
  NotesBox,
  WaterTracker,
} from '../components/primitives'
import { ExerciseSheet } from '../components/ExerciseSheet'
import { EXERCISES } from '../lib/exercises'
import './Day001.css'

const DAY = 1

const EXERCISES_LIST = [
  {
    id: 'incline-pushup',
    name: 'Incline push-up · on dumbbell handles',
    rx: '3 × 6–10',
    note: 'Hands on the 5kg dumbbells, desk or table height. Wrists dead straight. Stop 3 reps before failure — today is a rehearsal, not a test.',
  },
  {
    id: 'db-ohp',
    name: 'Overhead press · 5kg, neutral grip',
    rx: '3 × 10',
    note: 'Palms facing each other, ribs down, squeeze at the top.',
  },
  {
    id: 'lateral-raise',
    name: 'Lateral raise · 5kg',
    rx: '3 × 10',
    note: 'Slight elbow bend, lead with the elbows, no swinging. These build the shoulder width you asked for.',
  },
  {
    id: 'squat',
    name: 'Bodyweight squat · slow',
    rx: '3 × 12',
    note: '3 seconds down, drive up. Legs stay in the picture all 100 days.',
  },
  {
    id: 'plank',
    name: 'Plank — baseline test',
    rx: '1 × max hold',
    note: 'One honest attempt. Log the seconds — this number is your before.',
  },
]

const REHAB = [
  { id: 'wrist-circles', label: 'Wrist circles', sub: '20s each direction' },
  { id: 'prayer', label: 'Prayer stretch', sub: '3 × 20s, gentle — never into pain' },
  { id: 'wrist-curls', label: 'Wrist curls · 5kg on thigh', sub: '2 × 15 palm up' },
  { id: 'rev-curls', label: 'Reverse wrist curls', sub: '2 × 12, hold the dumbbell head if 5kg is too much' },
]

const POSTURE = [
  { id: 'chin-tucks', label: 'Chin tucks', sub: '10 reps, 2s hold' },
  { id: 'pec-stretch', label: 'Doorway pec stretch', sub: '45s each side' },
  { id: 'wall-angels', label: 'Wall angels', sub: '8 slow reps' },
]

const MEALS = [
  { id: 'breakfast', when: 'BREAKFAST', what: '3-egg bhurji + 2 toast', protein: '~24g' },
  { id: 'lunch', when: 'LUNCH', what: 'Chicken curry 150g + rice + curd + salad', protein: '~42g' },
  { id: 'snack', when: '5 PM', what: 'Whey shake + a banana', protein: '~26g' },
  { id: 'dinner', when: 'DINNER', what: 'Tandoori-style chicken 150g + 2 roti + veg', protein: '~40g' },
]

const HABITS = [
  { id: 'sleep', label: 'Sleep 7h+', sub: 'screens off by 00:30' },
  { id: 'steps', label: '8,000 steps', sub: 'the commute counts — use it' },
  { id: 'photos', label: 'Baseline photos', sub: 'front · side · back, same spot you’ll use for 100 days' },
]

// every check on this page + water as one item — powers the dashboard %
const TOTAL_ITEMS = REHAB.length + EXERCISES_LIST.length + POSTURE.length + HABITS.length + 1

export const manifest = {
  day: DAY,
  title: 'Baseline',
  themeClass: 'd1',
  sections: [
    { title: 'Wrist rehab', items: REHAB.map((r) => ({ key: `rehab:${r.id}`, label: r.label })) },
    { title: 'The workout', items: EXERCISES_LIST.map((e) => ({ key: `exercise:${e.id}`, label: e.name })) },
    { title: 'The desk undo', items: POSTURE.map((p) => ({ key: `posture:${p.id}`, label: p.label })) },
    { title: 'Habits', items: HABITS.map((h) => ({ key: `habit:${h.id}`, label: h.label })) },
  ],
}

export default function Day001() {
  const { progress, toggleCheck, setLog, setWater, setNotes } = useDayProgress(DAY, TOTAL_ITEMS)
  const c = progress.checks
  const [infoId, setInfoId] = useState<string | null>(null)

  return (
    <div className="d1">
      <div className="d1-inner">
        <header className="d1-mast rise">
          <div className="top-row">
            <Link to="/" className="d1-kicker press">← THE HUNDRED</Link>
            <span className="d1-stamp">BASELINE DAY</span>
          </div>
          <div className="d1-num">
            01<span className="of"> of one hundred</span>
          </div>
          <div className="d1-title">Where you started.</div>
        </header>

        <p className="d1-note rise rise-1">
          Today isn't about effort — it's about honesty. You measure everything, photograph
          everything, and do one deliberately easy workout. Every number you write down today
          becomes the "before" that Day 100 gets compared against. Don't flex, don't suck in,
          don't warm up extra for the plank test. The worse today looks, the better the story ends.
        </p>

        <section className="d1-section rise rise-2">
          <div className="d1-h">
            <span className="no">№1</span>
            <h2>The measuring</h2>
            <span className="why">morning, before food</span>
          </div>
          <p className="d1-p">
            Weight, waist at navel, chest, shoulders, both arms flexed. Then three photos in the
            same spot you can return to every two weeks.
          </p>
          <Link to="/measurements" className="d1-measure-link">
            Record baseline measurements <span className="arrow">→</span>
          </Link>
        </section>

        <section className="d1-section rise rise-3">
          <div className="d1-h">
            <span className="no">№2</span>
            <h2>Wrist rehab</h2>
            <span className="why">daily until it's boring</span>
          </div>
          <p className="d1-p">
            The wrist decides how far the push-ups go, so it gets treated like a project of its
            own. Five minutes. Nothing here should hurt.
          </p>
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

        <section className="d1-section rise rise-4">
          <div className="d1-h">
            <span className="no">№3</span>
            <h2>The workout</h2>
            <span className="why">~30 min · stop 3 reps early</span>
          </div>
          <p className="d1-p">
            Warm up first: arm circles ×10, cat-cow ×8, wrist circles 30s, 10 easy squats.
            All pushing happens on the dumbbell handles — wrists straight, always.
          </p>
          {EXERCISES_LIST.map((e) => (
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
              timer={e.id === 'plank'}
            />
          ))}
        </section>

        <section className="d1-section">
          <div className="d1-h">
            <span className="no">№4</span>
            <h2>The desk undo</h2>
            <span className="why">5 min, tonight</span>
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

        <section className="d1-section">
          <div className="d1-h">
            <span className="no">№5</span>
            <h2>Fuel</h2>
            <span className="why">protein is the metric</span>
          </div>
          <MacroBar />
          <div style={{ height: 12 }} />
          {MEALS.map((m) => (
            <div key={m.id} className="d1-meal">
              <span className="when">{m.when}</span>
              <span className="what">{m.what}</span>
              <span className="protein">{m.protein}</span>
            </div>
          ))}
        </section>

        <section className="d1-section">
          <div className="d1-h">
            <span className="no">№6</span>
            <h2>Water</h2>
            <span className="why">3 litres</span>
          </div>
          <WaterTracker value={progress.water} onChange={setWater} />
        </section>

        <section className="d1-section">
          <div className="d1-h">
            <span className="no">№7</span>
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

        <section className="d1-section">
          <div className="d1-h">
            <span className="no">№8</span>
            <h2>The ledger</h2>
          </div>
          <NotesBox
            value={progress.notes}
            onChange={setNotes}
            placeholder="Plank seconds, push-up count, how the wrist felt, anything worth remembering…"
          />
        </section>

        <div className="d1-signoff">
          <div className="rule" />
          Day one of one hundred. See you tomorrow.
        </div>

        <DayNav day={DAY} />
      </div>

      <ExerciseSheet info={infoId ? (EXERCISES[infoId] ?? null) : null} onClose={() => setInfoId(null)} />
    </div>
  )
}
