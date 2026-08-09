import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDayProgress } from '../hooks/useDayProgress'
import { CheckItem, DayNav, NotesBox, WaterTracker } from '../components/primitives'
import { FuelTracker, type MealPlan } from '../components/FuelTracker'
import { ExerciseSheet } from '../components/ExerciseSheet'
import { EXERCISES } from '../lib/exercises'
import './Day006.css'

const DAY = 6

const REHAB = [
  { id: 'wrist-circles', label: 'Wrist circles', sub: '20s each direction' },
  { id: 'prayer', label: 'Prayer stretch', sub: '3 × 20s, gentle' },
  { id: 'wrist-curls', label: 'Wrist curls · 5kg', sub: '2 × 15 palm up' },
  { id: 'rev-curls', label: 'Reverse wrist curls', sub: '2 × 12' },
]

const POSTURE = [
  { id: 'chin-tucks', label: 'Chin tucks', sub: '10 reps, 2s hold' },
  { id: 'pec-stretch', label: 'Doorway pec stretch', sub: '45s each side' },
  { id: 'pull-aparts', label: 'Band pull-aparts · yellow', sub: '2 × 15, straight arms' },
  { id: 'thoracic-floor', label: 'Thoracic extension · towel roll', sub: '60s on the floor' },
  { id: 'wall-angels', label: 'Wall angels', sub: '8 slow reps' },
]

const PREP = [
  { id: 'eggs', label: 'Boil 12 eggs', sub: 'four days of breakfasts + lunch add-ons, fridge-stable' },
  { id: 'soya', label: 'Cook soya chunks in bulk', sub: '120g dry in your sambar masala → 3 containers (~20g protein each)' },
  { id: 'sprouts', label: 'Start the sprouts batch', sub: 'soak moong tonight — baked sprouts on tap by Tuesday' },
  { id: 'paneer', label: 'Portion the paneer', sub: 'cut into 150g blocks — tomorrow is a veg day, one block is dinner' },
  { id: 'stock', label: 'Stock check', sub: 'eggs, curd, milk, peanuts, shakes — enough for the week? Add to the next order' },
]

const MEALS: MealPlan[] = [
  { id: 'breakfast', when: 'WHEN YOU LAND', what: '3 eggs + toast/base — late is fine, skipped is not', protein: 19, kcal: 350 },
  { id: 'shake-am', when: 'MID-MORNING', what: 'SuperYou shake — before noon, that is the caffeine cutoff', protein: 25, kcal: 180 },
  { id: 'lunch', when: 'LUNCH', what: 'Rice + thick sambar + 2 boiled eggs + curd', protein: 30, kcal: 700 },
  { id: 'snack', when: '5 PM', what: 'Curd or milk + peanuts — no caffeine, protect tonight', protein: 12, kcal: 280 },
  { id: 'dinner', when: 'DINNER', what: 'Ragi mudde ×1 + chicken curry 150g', protein: 40, kcal: 750 },
]

const HABITS = [
  {
    id: 'order-barbell',
    label: 'Barbell order — if it didn\'t happen yesterday, it happens today',
    sub: 'the ₹3k 60kg set. Four honest days earned it; one party didn\'t un-earn it',
  },
  { id: 'nap', label: 'Nap smart', sub: '20–30 min max, before 3 PM — a long evening nap steals tonight\'s sleep' },
  { id: 'sleep', label: 'Early night', sub: 'screens off 23:30. Monday starts the first full week — arrive rested' },
]

const TOTAL_ITEMS =
  REHAB.length + POSTURE.length + PREP.length + MEALS.length + HABITS.length + 1 // + water

export const manifest = {
  day: DAY,
  title: 'Reset & Prep',
  themeClass: 'd6',
  sections: [
    { title: 'Wrist rehab', items: REHAB.map((r) => ({ key: `rehab:${r.id}`, label: r.label })) },
    { title: 'The desk undo', items: POSTURE.map((p) => ({ key: `posture:${p.id}`, label: p.label })) },
    { title: 'The prep hour', items: PREP.map((p) => ({ key: `prep:${p.id}`, label: p.label })) },
    { title: 'Fuel', items: MEALS.map((m) => ({ key: `meal:${m.id}`, label: `${m.when} · ${m.protein}g` })) },
    { title: 'Habits', items: HABITS.map((h) => ({ key: `habit:${h.id}`, label: h.label })) },
  ],
}

export default function Day006() {
  const { progress, toggleCheck, setLog, setWater, setNotes } = useDayProgress(DAY, TOTAL_ITEMS)
  const c = progress.checks
  const [infoId, setInfoId] = useState<string | null>(null)

  return (
    <div className="d6">
      <div className="d6-inner">
        <header className="d6-top rise">
          <Link to="/" className="d6-back press">← THE HUNDRED</Link>
          <span className="d6-daytag">DAY 06 · REST</span>
        </header>

        <div className="d6-title rise rise-1">
          <div className="d6-card-rule" aria-hidden />
          <h1>Reset &amp; prep.</h1>
          <div className="d6-sub">Sunday — a rest day that cooks for the whole week</div>
        </div>

        <p className="d6-note rise rise-2">
          About yesterday: <strong>skipped means skipped.</strong> The program's oldest rule —
          no make-up sessions, no doubling, no guilt interest. You went and lived your life
          with your friends; a hundred-day plan that can't absorb one party was never going to
          survive a hundred days. The math: one session missed out of seventy. The response
          that matters isn't chasing Day 5 — it's what today looks like. And today was always
          a rest day: rehydrate, move gently, cook once for the whole week, sleep properly.
          Monday we're back at full strength.
        </p>

        <section className="d6-card rise rise-3">
          <div className="d6-h">
            <h2>Damage control</h2>
            <span className="d6-tag">post-party protocol</span>
          </div>
          <p className="d6-p">
            Late night + probably not much water = today's only training goal is
            <strong> 10/10 glasses</strong>, front-loaded. Two right now, before anything else.
            A nimbu-pani with salt counts double for morale.
          </p>
          <WaterTracker value={progress.water} onChange={setWater} />
        </section>

        <section className="d6-card rise rise-4">
          <div className="d6-h">
            <h2>Wrist rehab</h2>
            <span className="d6-tag">yes, even today</span>
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

        <section className="d6-card">
          <div className="d6-h">
            <h2>The desk undo</h2>
            <span className="d6-tag">5 min</span>
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

        <section className="d6-card prep">
          <div className="d6-h">
            <h2>The prep hour</h2>
            <span className="d6-tag">one hour, feeds five days</span>
          </div>
          <p className="d6-p">
            This is the fix for the 1,800-kcal problem. When protein is already boiled,
            cooked, and portioned, hitting 135g stops being a daily decision and becomes
            assembly. One hour now buys five easy days.
          </p>
          {PREP.map((p) => (
            <CheckItem
              key={p.id}
              checked={!!c[`prep:${p.id}`]}
              onToggle={() => toggleCheck(`prep:${p.id}`)}
              label={p.label}
              sub={p.sub}
            />
          ))}
        </section>

        <section className="d6-card">
          <div className="d6-h">
            <h2>Fuel</h2>
            <span className="d6-tag">no compensating</span>
          </div>
          <p className="d6-p">
            After a party night the trap is "I'll eat light today to make up for it." No.
            Under-eating today just makes it two bad days. Normal targets, normal meals:
          </p>
          <FuelTracker
            meals={MEALS}
            checks={c}
            onToggleMeal={(id) => toggleCheck(`meal:${id}`)}
            extras={progress.logs['fuel:extras'] ?? ''}
            onExtras={(v) => setLog('fuel:extras', v)}
          />
        </section>

        <section className="d6-card">
          <div className="d6-h">
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

        <section className="d6-card">
          <div className="d6-h">
            <h2>Sunday notes</h2>
          </div>
          <NotesBox
            value={progress.notes}
            onChange={setNotes}
            placeholder="How's the body after the late one? Prep done? Barbell ordered? Anything for Monday's plan…"
          />
        </section>

        <div className="d6-signoff">
          One party ≠ one failure. Tomorrow: Push A, veg edition — fridge already loaded.
        </div>

        <DayNav day={DAY} />
      </div>

      <ExerciseSheet info={infoId ? (EXERCISES[infoId] ?? null) : null} onClose={() => setInfoId(null)} />
    </div>
  )
}
