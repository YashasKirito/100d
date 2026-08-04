import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDayProgress } from '../hooks/useDayProgress'
import { CheckItem, DayNav, MacroBar, NotesBox, WaterTracker } from '../components/primitives'
import { ExerciseSheet } from '../components/ExerciseSheet'
import { EXERCISES } from '../lib/exercises'
import './Day002.css'

const DAY = 2

const REHAB = [
  { id: 'wrist-circles', label: 'Wrist circles', sub: '20s each direction' },
  { id: 'prayer', label: 'Prayer stretch', sub: '3 × 20s, gentle' },
  { id: 'wrist-curls', label: 'Wrist curls · 5kg', sub: '2 × 15 palm up' },
  {
    id: 'rev-curls',
    label: 'Reverse wrist curls — the one you skipped',
    sub: '2 × 12 · too heavy? hold the dumbbell head or use a filled bottle',
  },
]

const POSTURE = [
  { id: 'chin-tucks', label: 'Chin tucks', sub: '10 reps, 2s hold' },
  { id: 'pec-stretch', label: 'Doorway pec stretch', sub: '45s each side' },
  { id: 'thoracic-ext', label: 'Thoracic extension over chair back', sub: '60s, exhale as you arch' },
  { id: 'wall-angels', label: 'Wall angels', sub: '8 slow reps' },
]

const MEALS = [
  { id: 'breakfast', when: 'BREAKFAST', what: '3 eggs (up from 2) + your usual base', protein: '~19g' },
  { id: 'lunch', when: 'LUNCH', what: 'Rice + sambar (ask for it thick) + 2 boiled eggs + curd 200g', protein: '~30g' },
  { id: 'snack', when: '5 PM', what: 'Glass of milk + peanuts / sprouts if around', protein: '~15g' },
  { id: 'dinner', when: 'DINNER', what: 'Ragi mudde ×1 + chicken curry 150g (chicken day!)', protein: '~42g' },
]

const HABITS = [
  { id: 'measurements', label: 'Tape measurements', sub: 'waist · chest · shoulders · both arms — morning, pre-food, then log them' },
  { id: 'order-gear', label: 'Order the pull-up bar + bands', sub: 'Thursday is Pull day — ordered today they might just make it' },
  { id: 'order-whey', label: 'Order whey protein', sub: '1 scoop = 24g — the cheapest way to close your protein gap' },
  { id: 'sleep', label: 'Sleep 7h+', sub: 'recovery day sleep is where Day 1 becomes muscle' },
  { id: 'steps', label: '8,000 steps', sub: 'easy pace, this is active recovery' },
]

const TOTAL_ITEMS = REHAB.length + POSTURE.length + HABITS.length + 1 // + water

export const manifest = {
  day: DAY,
  title: 'Recovery',
  themeClass: 'd2',
  sections: [
    { title: 'Wrist rehab', items: REHAB.map((r) => ({ key: `rehab:${r.id}`, label: r.label })) },
    { title: 'The desk undo', items: POSTURE.map((p) => ({ key: `posture:${p.id}`, label: p.label })) },
    { title: "Today's list", items: HABITS.map((h) => ({ key: `habit:${h.id}`, label: h.label })) },
  ],
}

export default function Day002() {
  const { progress, toggleCheck, setWater, setNotes } = useDayProgress(DAY, TOTAL_ITEMS)
  const c = progress.checks
  const [infoId, setInfoId] = useState<string | null>(null)

  return (
    <div className="d2">
      <div className="d2-inner">
        <header className="d2-top rise">
          <Link to="/" className="d2-back press">← THE HUNDRED</Link>
          <span className="d2-daytag">DAY 02 · REST</span>
        </header>

        <div className="d2-moon-wrap rise rise-1">
          <div className="d2-moon" aria-hidden />
        </div>
        <div className="d2-title rise rise-1">
          <h1>Recovery</h1>
          <div className="sub">Wednesday — nothing heavy today. That's the plan working.</div>
        </div>

        <p className="d2-note rise rise-2">
          Yesterday you asked your muscles a question they haven't heard in months. Today they
          answer — <strong>growth happens in the recovery, not the workout</strong>. Your only
          jobs: water, ten quiet minutes of posture and wrist work, protein, sleep. Your wrist
          whispered a mild 2/10 yesterday; today's rehab keeps it a whisper.
        </p>

        <section className="d2-card hero rise rise-3">
          <div className="d2-h">
            <h2>Water — today's main event</h2>
            <span className="tag">3 litres</span>
          </div>
          <p className="d2-p">
            Day 1 score: <strong>4 / 10 glasses</strong>. Not a habit yet, so we schedule it
            instead of hoping:
          </p>
          <div className="d2-protocol">
            <div><span className="t">WAKE</span><span>1 glass before anything else</span></div>
            <div><span className="t">COMMUTE</span><span>fill a 1L bottle, it rides with you</span></div>
            <div><span className="t">OFFICE</span><span>finish the bottle by lunch, refill after</span></div>
            <div><span className="t">MEALS</span><span>1 glass before each meal</span></div>
          </div>
          <WaterTracker value={progress.water} onChange={setWater} />
        </section>

        <section className="d2-card rise rise-4">
          <div className="d2-h">
            <h2>Wrist rehab</h2>
            <span className="tag">5 min</span>
          </div>
          <p className="d2-p">
            Reverse curls came back — they train the exact muscles that make push-ups stop
            hurting. Tap <strong>?</strong> on any item to see how it's done.
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

        <section className="d2-card">
          <div className="d2-h">
            <h2>The desk undo</h2>
            <span className="tag">5 min</span>
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

        <section className="d2-card">
          <div className="d2-h">
            <h2>Fuel — your food, upgraded</h2>
            <span className="tag">protein first</span>
          </div>
          <p className="d2-p">
            Same rice + sambar + mudde day you already eat — with protein bolted on at every
            meal. This lands ~106g; the whey you're ordering closes the rest of the gap to 135g.
          </p>
          <MacroBar />
          <div style={{ height: 10 }} />
          {MEALS.map((m) => (
            <div key={m.id} className="d2-meal">
              <span className="when">{m.when}</span>
              <span className="what">{m.what}</span>
              <span className="protein">{m.protein}</span>
            </div>
          ))}
        </section>

        <section className="d2-card">
          <div className="d2-h">
            <h2>Today's list</h2>
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

        <section className="d2-card">
          <div className="d2-h">
            <h2>Night notes</h2>
          </div>
          <NotesBox
            value={progress.notes}
            onChange={setNotes}
            placeholder="How's the body feeling after Day 1? Any soreness, wrist status, energy…"
          />
        </section>

        <div className="d2-signoff">Rest well. Thursday we pull.</div>

        <DayNav day={DAY} />
      </div>

      <ExerciseSheet info={infoId ? (EXERCISES[infoId] ?? null) : null} onClose={() => setInfoId(null)} />
    </div>
  )
}
