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
import './Day003.css'

const DAY = 3

const WORKOUT = [
  {
    id: 'incline-pushup',
    name: 'Incline push-up · on handles',
    rx: '4 × 7–8',
    note: 'Day 1 log: 6, 6, 5. Today four sets, one or two reps better. Wrist stays at a whisper (≤2/10) or the surface gets higher — clean beats brave.',
  },
  {
    id: 'floor-press',
    name: 'Floor press · 5kg, neutral grip',
    rx: '3 × 12',
    note: 'New. The floor is the safety rail — elbows touch down each rep, pause a beat, press. Your shoulder never leaves its happy range.',
  },
  {
    id: 'oh-triceps',
    name: 'Overhead triceps extension · single 5kg',
    rx: '3 × 12',
    note: 'Elbows by your ears, forearms only. If the left shoulder pinches above 2/10 just getting it up — tap ? for the lying swap. Same triceps, zero overhead.',
  },
  {
    id: 'curls',
    name: 'Curls · 5kg, slow',
    rx: '2 × 12',
    note: 'Straight off your goal list. 3 seconds down on every rep — the lowering is where arms are built.',
  },
]

const REHAB = [
  { id: 'wrist-circles', label: 'Wrist circles', sub: '20s each direction' },
  { id: 'prayer', label: 'Prayer stretch', sub: '3 × 20s, gentle' },
  { id: 'wrist-curls', label: 'Wrist curls · 5kg', sub: '2 × 15 palm up' },
  { id: 'rev-curls', label: 'Reverse wrist curls', sub: '2 × 12 — the push-up insurance policy' },
]

const POSTURE = [
  { id: 'chin-tucks', label: 'Chin tucks', sub: '10 reps, 2s hold' },
  { id: 'pec-stretch', label: 'Doorway pec stretch', sub: '45s each side' },
  {
    id: 'thoracic-floor',
    label: 'Thoracic extension · floor version',
    sub: 'over a tight-rolled towel, 60s — no chair needed, as requested',
  },
  { id: 'wall-angels', label: 'Wall angels', sub: '8 slow reps — your crazy-stretch favourite' },
]

const MEALS = [
  { id: 'breakfast', when: 'BREAKFAST', what: '3 eggs + your usual base', protein: '~19g' },
  { id: 'lunch', when: 'LUNCH', what: 'Rice + thick sambar + 2 boiled eggs + curd 200g', protein: '~30g' },
  { id: 'snack', when: '5 PM', what: 'SuperYou shake — the cold-coffee trick worked, repeat it', protein: '~30g' },
  { id: 'dinner', when: 'DINNER', what: 'Ragi mudde ×1 + chicken curry 150g (or soya-chunk curry)', protein: '~40g' },
]

const HABITS = [
  {
    id: 'order-gear',
    label: 'Place the gear order',
    sub: 'pull-up bar + yellow & red bands — the pull era starts the day it lands',
  },
  { id: 'protein', label: 'Protein 135g', sub: 'yesterday ≈90g. The missing 45 = third egg + curd + shake' },
  { id: 'sleep', label: 'Sleep 7h+', sub: 'sore muscles are rebuilt on this shift' },
  { id: 'steps', label: '8,000 steps', sub: 'the commute counts — use it' },
]

const TOTAL_ITEMS = WORKOUT.length + REHAB.length + POSTURE.length + HABITS.length + 1 // + water

export const manifest = {
  day: DAY,
  title: 'Chest Day',
  themeClass: 'd3',
  sections: [
    { title: 'Wrist rehab', items: REHAB.map((r) => ({ key: `rehab:${r.id}`, label: r.label })) },
    { title: 'The board', items: WORKOUT.map((e) => ({ key: `exercise:${e.id}`, label: e.name })) },
    { title: 'The desk undo', items: POSTURE.map((p) => ({ key: `posture:${p.id}`, label: p.label })) },
    { title: 'Habits', items: HABITS.map((h) => ({ key: `habit:${h.id}`, label: h.label })) },
  ],
}

export default function Day003() {
  const { progress, toggleCheck, setLog, setWater, setNotes } = useDayProgress(DAY, TOTAL_ITEMS)
  const c = progress.checks
  const [infoId, setInfoId] = useState<string | null>(null)

  return (
    <div className="d3">
      <div className="d3-inner">
        <header className="d3-top rise">
          <Link to="/" className="d3-back press">← THE HUNDRED</Link>
          <span className="d3-daytag">DAY 03 · PUSH B</span>
        </header>

        <div className="d3-title rise rise-1">
          <svg className="d3-tally" viewBox="0 0 64 40" aria-label="three days, tallied">
            <line x1="10" y1="6" x2="8" y2="34" />
            <line x1="26" y1="5" x2="25" y2="34" />
            <line x1="42" y1="6" x2="41" y2="33" />
          </svg>
          <h1>Chest day.</h1>
          <svg className="d3-underline" viewBox="0 0 220 12" aria-hidden preserveAspectRatio="none">
            <path d="M4 8 C 40 4, 80 10, 120 6 S 190 8, 216 5" />
          </svg>
          <div className="d3-sub">Thursday · Phase 1 · nothing goes overhead today</div>
        </div>

        <p className="d3-note rise rise-2">
          Yesterday you recovered like it was your job — <strong>9 of 10 glasses</strong>, every
          box ticked. The soreness is Day 1 being turned into new tissue; it fades by set two,
          train gently through it. Day 2's sign-off promised pulling — that was written hoping
          the bar would land today. It didn't, so per the plan Thursday is Push B: chest and
          arms, floor-level pressing only, everything on the handles. The shoulder and the wrist
          both ride along at a whisper or we change the exercise, not the rule.
        </p>

        <section className="d3-card rise rise-3">
          <div className="d3-h">
            <h2>Warm-up</h2>
            <span className="d3-tag">5 min · don't skip</span>
          </div>
          <div className="d3-proto">
            <div><span className="t">ARMS</span><span>arm circles ×10 each way</span></div>
            <div><span className="t">SPINE</span><span>cat-cow ×8</span></div>
            <div><span className="t">BLADES</span><span>wall slides ×8 slow — wakes the shoulder before it presses</span></div>
            <div><span className="t">WRIST</span><span>circles 30s + prayer stretch 30s</span></div>
            <div><span className="t">LEGS</span><span>10 easy squats</span></div>
          </div>
        </section>

        <section className="d3-card rise rise-4">
          <div className="d3-h">
            <h2>Wrist rehab</h2>
            <span className="d3-tag">daily, phase 1</span>
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

        <section className="d3-card board">
          <div className="d3-h">
            <h2>The board</h2>
            <span className="d3-tag">~35 min · stop 3 reps early</span>
          </div>
          <p className="d3-p">
            Rest 60–90s between sets. Log every set — Thursday-you next week has to beat these
            numbers, so write them honest.
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

        <section className="d3-card">
          <div className="d3-h">
            <h2>The desk undo</h2>
            <span className="d3-tag">5 min, tonight</span>
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

        <section className="d3-card">
          <div className="d3-h">
            <h2>Fuel</h2>
            <span className="d3-tag">135g or bust</span>
          </div>
          <p className="d3-p">
            Yesterday landed ≈90g — decent, not the target. The missing 45 grams live in exactly
            three places today: the third egg, the lunch curd, the shake. All three, and dinner
            makes 135 easy.
          </p>
          <MacroBar />
          <div style={{ height: 10 }} />
          {MEALS.map((m) => (
            <div key={m.id} className="d3-meal">
              <span className="when">{m.when}</span>
              <span className="what">{m.what}</span>
              <span className="protein">{m.protein}</span>
            </div>
          ))}
        </section>

        <section className="d3-card">
          <div className="d3-h">
            <h2>Water</h2>
            <span className="d3-tag">3 litres</span>
          </div>
          <p className="d3-p">
            9 of 10 yesterday — the schedule beat the hoping. Run the same play: wake glass,
            bottle on the commute, refill at lunch.
          </p>
          <WaterTracker value={progress.water} onChange={setWater} />
        </section>

        <section className="d3-card">
          <div className="d3-h">
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

        <section className="d3-card">
          <div className="d3-h">
            <h2>Notes for the coach</h2>
          </div>
          <NotesBox
            value={progress.notes}
            onChange={setNotes}
            placeholder="Shoulder out of 10 on the floor press? Wrist on the push-ups? Reps, energy, anything…"
          />
        </section>

        <div className="d3-signoff">Four exercises, one rule: nothing hurts past a whisper. Chalk it up.</div>

        <DayNav day={DAY} />
      </div>

      <ExerciseSheet info={infoId ? (EXERCISES[infoId] ?? null) : null} onClose={() => setInfoId(null)} />
    </div>
  )
}
