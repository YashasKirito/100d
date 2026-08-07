import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDayProgress } from '../hooks/useDayProgress'
import { CheckItem, DayNav, ExerciseCard, NotesBox, WaterTracker } from '../components/primitives'
import { FuelTracker, type MealPlan } from '../components/FuelTracker'
import { ExerciseSheet } from '../components/ExerciseSheet'
import { EXERCISES } from '../lib/exercises'
import './Day005.css'

const DAY = 5

const WORKOUT = [
  {
    id: 'dead-hang',
    name: 'Dead hang',
    rx: '3 × max (cap 30s)',
    timer: true,
    note: 'Yesterday: 35s cold. Today three rounds, but STOP each at 30 even with gas left — 3×30 clean completes rung 1, and scapular pulls unlock next week.',
  },
  {
    id: 'pike-pushup',
    name: 'Pike push-up · rung 1, on handles',
    rx: '3 × 5–8',
    note: "New, and it's a probe: this is the overhead-press pattern with the floor as spotter. Knees bent, small range, easy pace. Any left-shoulder pinch above 2/10 → stop the set, it goes straight in the notes, and Monday adapts.",
  },
  {
    id: 'floor-press',
    name: 'Floor press · 5kg, slow tempo',
    rx: '3 × 12 · 3s down',
    note: 'You cleared 3×12 on Thursday, so the 5kg gets heavier the only way it can: three full seconds down, pause on the floor, drive up.',
  },
  {
    id: 'band-row',
    name: 'Band row · red, more tension',
    rx: '3 × 12–15',
    note: 'Sets of 20 yesterday = band too long. Grab more slack or sit further away until 12–15 is honest work again.',
  },
  {
    id: 'curls',
    name: 'Curls · 5kg',
    rx: '3 × 12',
    note: 'Third set added — the arms line-item gets weekend volume. 3s down, wrists straight as rulers.',
  },
  {
    id: 'face-pulls',
    name: 'Face pull · yellow band',
    rx: '3 × 15',
    note: 'Dose two of the shoulder medicine. Zero pinch yesterday — keep it that way: light, strict, knuckles to the ceiling.',
  },
  {
    id: 'goblet-squat',
    name: 'Goblet squat · 5kg',
    rx: '3 × 10–12',
    note: 'New rung — Day 1 squats were 3×12 clean, so the dumbbell joins in. It counterbalances you deeper and more upright than bodyweight allowed.',
  },
]

const REHAB = [
  { id: 'wrist-circles', label: 'Wrist circles', sub: '20s each direction' },
  { id: 'prayer', label: 'Prayer stretch', sub: '3 × 20s, gentle' },
  { id: 'wrist-curls', label: 'Wrist curls · 5kg', sub: '2 × 15 palm up' },
  { id: 'rev-curls', label: 'Reverse wrist curls', sub: '2 × 12 — extensors on duty' },
]

const POSTURE = [
  { id: 'chin-tucks', label: 'Chin tucks', sub: '10 reps, 2s hold' },
  { id: 'pec-stretch', label: 'Doorway pec stretch', sub: '45s each side' },
  { id: 'pull-aparts', label: 'Band pull-aparts · yellow', sub: '2 × 15, straight arms' },
  { id: 'thoracic-floor', label: 'Thoracic extension · towel roll', sub: '60s on the floor' },
  { id: 'wall-angels', label: 'Wall angels', sub: '8 slow reps' },
]

const MEALS: MealPlan[] = [
  { id: 'breakfast', when: 'BREAKFAST', what: '3 eggs + your usual base', protein: 19, kcal: 350 },
  { id: 'shake-am', when: 'MID-MORNING', what: 'SuperYou shake — moved here from 5 PM, caffeine before noon', protein: 25, kcal: 180 },
  { id: 'lunch', when: 'LUNCH', what: 'Rice + thick sambar + 2 boiled eggs + curd', protein: 30, kcal: 700 },
  { id: 'snack', when: '5 PM', what: 'Curd or milk + peanuts — caffeine-free zone starts now', protein: 12, kcal: 280 },
  { id: 'dinner', when: 'DINNER', what: 'Ragi mudde ×1 + chicken curry 150g', protein: 40, kcal: 750 },
]

const HABITS = [
  {
    id: 'order-barbell',
    label: 'Place the barbell order',
    sub: '5 days, ~95% complete — the ₹3k 60kg set is earned. Order it today, train with it in Phase 2',
  },
  { id: 'walk', label: 'Holiday walk', sub: 'no office, no 10:30 dinner — the 8k steps finally fit in daylight' },
  { id: 'sleep', label: 'Sleep 7h+', sub: 'you slept in this morning; tonight, bank a full night — shake was moved to protect it' },
]

const TOTAL_ITEMS =
  WORKOUT.length + REHAB.length + POSTURE.length + HABITS.length + MEALS.length + 1 // + water

export const manifest = {
  day: DAY,
  title: 'Saturday Session',
  themeClass: 'd5',
  sections: [
    { title: 'Wrist rehab', items: REHAB.map((r) => ({ key: `rehab:${r.id}`, label: r.label })) },
    { title: 'The meet', items: WORKOUT.map((e) => ({ key: `exercise:${e.id}`, label: e.name })) },
    { title: 'The desk undo', items: POSTURE.map((p) => ({ key: `posture:${p.id}`, label: p.label })) },
    { title: 'Fuel', items: MEALS.map((m) => ({ key: `meal:${m.id}`, label: `${m.when} · ${m.protein}g` })) },
    { title: 'Habits', items: HABITS.map((h) => ({ key: `habit:${h.id}`, label: h.label })) },
  ],
}

export default function Day005() {
  const { progress, toggleCheck, setLog, setWater, setNotes } = useDayProgress(DAY, TOTAL_ITEMS)
  const c = progress.checks
  const [infoId, setInfoId] = useState<string | null>(null)

  return (
    <div className="d5">
      <div className="d5-inner">
        <header className="d5-top rise">
          <Link to="/" className="d5-back press">← THE HUNDRED</Link>
          <span className="d5-daytag">DAY 05 · HOME UPPER</span>
        </header>

        <div className="d5-title rise rise-1">
          <div className="d5-jersey" aria-hidden>05</div>
          <h1>Saturday<br />session.</h1>
          <div className="d5-stripes" aria-hidden />
          <div className="d5-sub">Holiday · 45–60 min · the whole upper body, one sheet</div>
        </div>

        <p className="d5-note rise rise-2">
          First weekend session — the long one the weekdays don't allow. Everything you've
          learned this week shows up once: hang, push, press, pull, curl, squat. Phase 1 rules
          still apply — <strong>stop every set 3 reps early</strong>; today is volume and
          technique, not testing. And the honesty clause: if last night went badly again despite
          sleeping in, downgrade without guilt — rehab, posture, a long walk, done. A tired
          body doesn't earn interest on borrowed effort.
        </p>

        <section className="d5-card rise rise-3">
          <div className="d5-h">
            <h2>Wrist rehab</h2>
            <span className="d5-tag">daily · phase 1</span>
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

        <section className="d5-card meet rise rise-4">
          <div className="d5-h">
            <h2>The meet</h2>
            <span className="d5-tag">7 events · 60–90s rest</span>
          </div>
          <p className="d5-p">
            Warm up first — arm circles ×10, cat-cow ×8, wall slides ×8, wrist circles + prayer
            30s each, 10 easy squats. Bar work first while you're fresh, legs last.
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
              timer={!!e.timer}
            />
          ))}
        </section>

        <section className="d5-card">
          <div className="d5-h">
            <h2>The desk undo</h2>
            <span className="d5-tag">5 min</span>
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

        <section className="d5-card">
          <div className="d5-h">
            <h2>Fuel</h2>
            <span className="d5-tag">2,350 kcal is the job</span>
          </div>
          <p className="d5-p">
            Yesterday the tracker caught you at ~1,800 kcal — training hard while under-eating
            is how recomp stalls. Note the reshuffle: <strong>the shake moved to mid-morning</strong>.
            It's coffee, and 5 PM caffeine was prime suspect in Thursday's 2:30 AM ceiling-staring.
          </p>
          <FuelTracker
            meals={MEALS}
            checks={c}
            onToggleMeal={(id) => toggleCheck(`meal:${id}`)}
            extras={progress.logs['fuel:extras'] ?? ''}
            onExtras={(v) => setLog('fuel:extras', v)}
          />
        </section>

        <section className="d5-card">
          <div className="d5-h">
            <h2>Water</h2>
            <span className="d5-tag">3 litres</span>
          </div>
          <p className="d5-p">9 · 9 · 9. Today, holiday edition: the first 10 is right there.</p>
          <WaterTracker value={progress.water} onChange={setWater} />
        </section>

        <section className="d5-card">
          <div className="d5-h">
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

        <section className="d5-card">
          <div className="d5-h">
            <h2>Post-meet report</h2>
          </div>
          <NotesBox
            value={progress.notes}
            onChange={setNotes}
            placeholder="Pike push-up: shoulder out of 10? Hang times, band tension verdict, sleep last night, energy…"
          />
        </section>

        <div className="d5-signoff">Seven events down. Tomorrow is full rest + the meal-prep hour — we plan it tonight.</div>

        <DayNav day={DAY} />
      </div>

      <ExerciseSheet info={infoId ? (EXERCISES[infoId] ?? null) : null} onClose={() => setInfoId(null)} />
    </div>
  )
}
