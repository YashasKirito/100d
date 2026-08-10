import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDayProgress } from '../hooks/useDayProgress'
import { CheckItem, DayNav, ExerciseCard, NotesBox, WaterTracker } from '../components/primitives'
import { FuelTracker, type MealPlan } from '../components/FuelTracker'
import { ExerciseSheet } from '../components/ExerciseSheet'
import { EXERCISES } from '../lib/exercises'
import './Day007.css'

const DAY = 7

const WORKOUT = [
  {
    id: 'pike-pushup',
    name: 'Pike push-up · rung 1 — THE PROBE',
    rx: '3 × 5–8',
    note: 'The diagnostic Day 5 never ran. Knees bent, small range, on handles. This is the overhead pattern under bodyweight — the shoulder number it returns decides the next two weeks of pressing. Above 2/10 → stop, log, move on.',
  },
  {
    id: 'band-ohp',
    name: 'Band OHP · yellow',
    rx: '3 × 12',
    note: 'Overhead pressing returns from suspension — lightest possible version, on purpose. Six days of face pulls stand behind it. Easy at the bottom, work at the top.',
  },
  {
    id: 'lateral-raise',
    name: 'Lateral raise · 5kg',
    rx: '3 × 8–10',
    note: 'Day 1 log: 6, 6, 6. Beat it — even by one rep a set. These are the round-shoulder builders; slow 3s down.',
  },
  {
    id: 'face-pulls',
    name: 'Face pull · yellow band',
    rx: '3 × 15',
    note: 'Dose three. The reason today\'s overhead work gets to exist at all.',
  },
  {
    id: 'incline-pushup',
    name: 'Incline push-up · on handles',
    rx: '3 × 9–10',
    note: 'Thursday was 8, 8, 7, 7. Three sets today, aim 9–10 each. Wrist above 2/10 → higher surface, same rules as always.',
  },
]

const REHAB = [
  { id: 'wrist-circles', label: 'Wrist circles', sub: '20s each direction' },
  { id: 'prayer', label: 'Prayer stretch', sub: '3 × 20s, gentle' },
  { id: 'wrist-curls', label: 'Wrist curls · 5kg', sub: '2 × 15 palm up' },
  { id: 'rev-curls', label: 'Reverse wrist curls', sub: '2 × 12' },
]

const POSTURE = [
  { id: 'chin-tucks', label: 'Chin tucks', sub: '10 reps, 2s hold — office water runs count extra' },
  { id: 'pec-stretch', label: 'Doorway pec stretch', sub: '45s each side' },
  { id: 'pull-aparts', label: 'Band pull-aparts · yellow', sub: '2 × 15, straight arms' },
  { id: 'thoracic-floor', label: 'Thoracic extension · towel roll', sub: '60s on the floor' },
  { id: 'wall-angels', label: 'Wall angels', sub: '8 slow reps' },
]

const MEALS: MealPlan[] = [
  { id: 'breakfast', when: 'BREAKFAST', what: 'Milk 250ml + peanuts + usual base — veg day, eggs stay in the fridge', protein: 14, kcal: 420 },
  { id: 'shake-am', when: 'MID-MORNING', what: 'SuperYou shake — caffeine closes at noon', protein: 25, kcal: 180 },
  { id: 'lunch', when: 'LUNCH', what: 'Rice + thick sambar + soya container #1 (yesterday-you cooked it) + curd', protein: 32, kcal: 700 },
  { id: 'snack', when: '5 PM', what: 'Curd or milk + peanuts', protein: 12, kcal: 280 },
  { id: 'dinner', when: 'DINNER', what: 'Ragi mudde ×1 + paneer curry, the 150g block you portioned', protein: 32, kcal: 720 },
]

const HABITS = [
  {
    id: 'order-barbell',
    label: 'Barbell order — still unticked',
    sub: 'third page it appears on. If something\'s blocking it (money timing? doubts?), say so in the notes instead',
  },
  { id: 'steps', label: '8,000 steps, office edition', sub: 'every water refill = one floor lap. The commute does the rest' },
  { id: 'sleep', label: 'Sleep 7h+', sub: 'screens off 00:00 — the week is long, start it rested' },
]

const TOTAL_ITEMS =
  WORKOUT.length + REHAB.length + POSTURE.length + MEALS.length + HABITS.length + 1 // + water

export const manifest = {
  day: DAY,
  title: 'System Reboot',
  themeClass: 'd7',
  sections: [
    { title: 'Wrist rehab', items: REHAB.map((r) => ({ key: `rehab:${r.id}`, label: r.label })) },
    { title: 'Push A — diagnostics', items: WORKOUT.map((e) => ({ key: `exercise:${e.id}`, label: e.name })) },
    { title: 'The desk undo', items: POSTURE.map((p) => ({ key: `posture:${p.id}`, label: p.label })) },
    { title: 'Fuel', items: MEALS.map((m) => ({ key: `meal:${m.id}`, label: `${m.when} · ${m.protein}g` })) },
    { title: 'Habits', items: HABITS.map((h) => ({ key: `habit:${h.id}`, label: h.label })) },
  ],
}

export default function Day007() {
  const { progress, toggleCheck, setLog, setWater, setNotes } = useDayProgress(DAY, TOTAL_ITEMS)
  const c = progress.checks
  const [infoId, setInfoId] = useState<string | null>(null)

  return (
    <div className="d7">
      <div className="d7-inner">
        <header className="d7-top rise">
          <Link to="/" className="d7-back press">← THE HUNDRED</Link>
          <span className="d7-daytag">DAY_07 · PUSH_A</span>
        </header>

        <div className="d7-title rise rise-1">
          <div className="d7-boot">
            <div>&gt; week_1 complete: 5/6 sessions · water streak 9-9-9-10</div>
            <div>&gt; meal_prep: LOADED · fridge: 12 eggs, 3× soya, paneer ×150g</div>
            <div>&gt; scheduled: shoulder_diagnostic --mode=pike --rule=2/10</div>
          </div>
          <h1>System reboot<span className="d7-cursor" aria-hidden>_</span></h1>
          <div className="d7-sub">Monday · first full week · veg day, pre-cooked</div>
        </div>

        <p className="d7-note rise rise-2">
          Week one closed at five of six with a party in the middle — that's a system that
          bends without breaking. Today it reboots on shoulders. The order matters:
          <strong> the pike probe runs first</strong> while you're fresh, and everything
          overhead stays deliberately light. Six days of face pulls were the preparation;
          today we find out what they bought.
        </p>

        <section className="d7-card rise rise-3">
          <div className="d7-h">
            <h2>$ wrist-rehab</h2>
            <span className="d7-tag">daily · phase 1</span>
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

        <section className="d7-card main rise rise-4">
          <div className="d7-h">
            <h2>$ push-a --diagnostics</h2>
            <span className="d7-tag">~35 min · 3 reps in reserve</span>
          </div>
          <p className="d7-p">
            Warm-up first, non-negotiable today: arm circles ×10 · cat-cow ×8 ·
            <strong> wall slides ×10 slow</strong> · band pull-aparts ×15 · wrist circles +
            prayer 30s · 10 squats. The shoulder gets woken up before it gets questioned.
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

        <section className="d7-card">
          <div className="d7-h">
            <h2>$ desk-undo</h2>
            <span className="d7-tag">5 min</span>
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

        <section className="d7-card">
          <div className="d7-h">
            <h2>$ fuel --veg</h2>
            <span className="d7-tag">first prepped day</span>
          </div>
          <p className="d7-p">
            The first day that runs on yesterday's prep hour — soya at lunch, paneer at
            dinner, zero cooking decisions. A planned veg day lands ~115g from meals alone;
            chips close the rest.
          </p>
          <FuelTracker
            meals={MEALS}
            checks={c}
            onToggleMeal={(id) => toggleCheck(`meal:${id}`)}
            extras={progress.logs['fuel:extras'] ?? ''}
            onExtras={(v) => setLog('fuel:extras', v)}
          />
        </section>

        <section className="d7-card">
          <div className="d7-h">
            <h2>$ water</h2>
            <span className="d7-tag">3 litres</span>
          </div>
          <p className="d7-p">Yesterday: the first 10/10. Defend the high score.</p>
          <WaterTracker value={progress.water} onChange={setWater} />
        </section>

        <section className="d7-card">
          <div className="d7-h">
            <h2>$ habits</h2>
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

        <section className="d7-card">
          <div className="d7-h">
            <h2>$ log --stdout</h2>
          </div>
          <NotesBox
            value={progress.notes}
            onChange={setNotes}
            placeholder="PROBE RESULT: pike shoulder /10? Band OHP /10? Wrist? Barbell order status, energy, sleep…"
          />
        </section>

        <div className="d7-signoff">&gt; diagnostics queued. run them honest. tomorrow: pull_a + the bar.</div>

        <DayNav day={DAY} />
      </div>

      <ExerciseSheet info={infoId ? (EXERCISES[infoId] ?? null) : null} onClose={() => setInfoId(null)} />
    </div>
  )
}
