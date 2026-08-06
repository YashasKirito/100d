import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDayProgress } from '../hooks/useDayProgress'
import { CheckItem, DayNav, ExerciseCard, NotesBox, WaterTracker } from '../components/primitives'
import { FuelTracker, type MealPlan } from '../components/FuelTracker'
import { ExerciseSheet } from '../components/ExerciseSheet'
import { EXERCISES } from '../lib/exercises'
import './Day004.css'

const DAY = 4

const WORKOUT = [
  {
    id: 'dead-hang',
    name: 'Dead hang · christen the bar',
    rx: '1 × max',
    timer: true,
    note: 'Mount it, safety-test it with feet on the floor, then hang and log the seconds. This number is your Day 28 "before" (target there: 3×30s).',
  },
  {
    id: 'band-row',
    name: 'Band row · red band, seated',
    rx: '3 × 15',
    note: 'The back-width project starts here. Shoulder blades pull first, hands second. Courier late? Do 5 sets of the single-arm row below instead.',
  },
  {
    id: 'db-row',
    name: 'Single-arm row · 5kg, 3-1-3 tempo',
    rx: '3 × 12 / side',
    note: '5kg moved slowly is heavy — 3s up, 1s squeeze, 3s down. Pull to the hip, back flat.',
  },
  {
    id: 'face-pulls',
    name: 'Face pull · yellow band',
    rx: '3 × 15',
    note: "The shoulder medicine, dose one. Light band, strict form, knuckles to the ceiling at the back. This is why Monday's pressing will feel better.",
  },
  {
    id: 'plank',
    name: 'Plank',
    rx: '3 × 45s',
    timer: true,
    note: 'Baseline was 40s. Three holds at 45 — stop when the hips sag, not when the timer flatters you.',
  },
  {
    id: 'dead-bug',
    name: 'Dead bug',
    rx: '3 × 8 / side',
    note: 'New. The flat-core wall gets built from the inside — lower back glued to the floor is the entire game.',
  },
]

const REHAB = [
  { id: 'wrist-circles', label: 'Wrist circles', sub: '20s each direction' },
  { id: 'prayer', label: 'Prayer stretch', sub: '3 × 20s, gentle' },
  { id: 'wrist-curls', label: 'Wrist curls · 5kg', sub: '2 × 15 palm up' },
  { id: 'rev-curls', label: 'Reverse wrist curls', sub: '2 × 12 — the extensors that guard your push-ups' },
]

const POSTURE = [
  { id: 'chin-tucks', label: 'Chin tucks', sub: '10 reps, 2s hold' },
  { id: 'pec-stretch', label: 'Doorway pec stretch', sub: '45s each side' },
  { id: 'pull-aparts', label: 'Band pull-aparts · yellow', sub: '2 × 15 — first day of the full desk undo' },
  { id: 'thoracic-floor', label: 'Thoracic extension · towel roll', sub: '60s on the floor' },
  { id: 'wall-angels', label: 'Wall angels', sub: '8 slow reps' },
]

const MEALS: MealPlan[] = [
  { id: 'breakfast', when: 'BREAKFAST', what: '3 eggs + your usual base', protein: 19, kcal: 350 },
  { id: 'lunch', when: 'LUNCH', what: 'Rice + thick sambar + 2 boiled eggs + curd', protein: 30, kcal: 700 },
  { id: 'snack', when: '5 PM', what: 'SuperYou shake', protein: 25, kcal: 180 },
  { id: 'dinner', when: 'DINNER', what: 'Ragi mudde ×1 + chicken curry 150g', protein: 40, kcal: 750 },
]

const HABITS = [
  { id: 'unbox', label: 'Gear check-in', sub: 'bar mounted on a solid frame + safety-tested · bands out of the packet' },
  { id: 'walk', label: 'Post-dinner walk', sub: "you've been landing ~6k steps — this 2k walk is the missing piece" },
  { id: 'sleep', label: 'Sleep 7h+', sub: 'the back grows on the night shift' },
]

const TOTAL_ITEMS =
  WORKOUT.length + REHAB.length + POSTURE.length + HABITS.length + MEALS.length + 1 // + water

export const manifest = {
  day: DAY,
  title: 'Delivery Day',
  themeClass: 'd4',
  sections: [
    { title: 'Wrist rehab', items: REHAB.map((r) => ({ key: `rehab:${r.id}`, label: r.label })) },
    { title: 'The manifest', items: WORKOUT.map((e) => ({ key: `exercise:${e.id}`, label: e.name })) },
    { title: 'The desk undo', items: POSTURE.map((p) => ({ key: `posture:${p.id}`, label: p.label })) },
    { title: 'Fuel', items: MEALS.map((m) => ({ key: `meal:${m.id}`, label: `${m.when} · ${m.protein}g` })) },
    { title: 'Habits', items: HABITS.map((h) => ({ key: `habit:${h.id}`, label: h.label })) },
  ],
}

export default function Day004() {
  const { progress, toggleCheck, setLog, setWater, setNotes } = useDayProgress(DAY, TOTAL_ITEMS)
  const c = progress.checks
  const [infoId, setInfoId] = useState<string | null>(null)

  return (
    <div className="d4">
      <div className="d4-inner">
        <header className="d4-top rise">
          <Link to="/" className="d4-back press">← THE HUNDRED</Link>
          <span className="d4-daytag">DAY 04 · PULL B</span>
        </header>

        <div className="d4-title rise rise-1">
          <div className="d4-stamp" aria-hidden>FRAGILE · THIS WAY UP</div>
          <h1>Delivery day.</h1>
          <div className="d4-sub">Friday · the bar has entered the building</div>
          <svg className="d4-barcode" viewBox="0 0 120 20" aria-hidden>
            <rect x="0" y="0" width="3" height="20" /><rect x="6" y="0" width="1.5" height="20" />
            <rect x="11" y="0" width="4" height="20" /><rect x="18" y="0" width="1.5" height="20" />
            <rect x="23" y="0" width="2" height="20" /><rect x="28" y="0" width="5" height="20" />
            <rect x="36" y="0" width="1.5" height="20" /><rect x="41" y="0" width="3" height="20" />
            <rect x="47" y="0" width="1.5" height="20" /><rect x="52" y="0" width="4" height="20" />
            <rect x="59" y="0" width="2" height="20" /><rect x="64" y="0" width="1.5" height="20" />
            <rect x="69" y="0" width="5" height="20" /><rect x="77" y="0" width="2" height="20" />
            <rect x="82" y="0" width="3" height="20" /><rect x="88" y="0" width="1.5" height="20" />
            <rect x="93" y="0" width="4" height="20" /><rect x="100" y="0" width="2" height="20" />
            <rect x="105" y="0" width="1.5" height="20" /><rect x="110" y="0" width="3" height="20" />
          </svg>
        </div>

        <p className="d4-note rise rise-2">
          Yesterday was your best board yet — <strong>8, 8, 7, 7</strong> on the push-ups,
          shoulder joint at <strong>0/10</strong> the whole session. Today the parcel lands and
          the program stops improvising: this is the first true pull day, the half of the
          "broad back" goal we couldn't train until now. Everything new starts light and
          strict — day one with a band is for learning the feel, not testing it.
        </p>

        <section className="d4-label rise rise-3">
          <div className="d4-h">
            <h2>Wrist rehab</h2>
            <span className="d4-tag">DAILY · PHASE 1</span>
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

        <section className="d4-label manifest rise rise-4">
          <div className="d4-h">
            <h2>The manifest</h2>
            <span className="d4-tag">~35 MIN · 60–90s REST</span>
          </div>
          <p className="d4-p">
            Warm up first: arm circles ×10, cat-cow ×8, wall slides ×8, wrist circles + prayer
            30s each, 10 easy squats. Then work through the list in order — bar first, while
            you're fresh.
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

        <section className="d4-label">
          <div className="d4-h">
            <h2>The desk undo</h2>
            <span className="d4-tag">5 MIN · NOW WITH BANDS</span>
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

        <section className="d4-label">
          <div className="d4-h">
            <h2>Fuel — now it counts itself</h2>
            <span className="d4-tag">TAP WHAT YOU EAT</span>
          </div>
          <p className="d4-p">
            The tracker you asked for. Tap each planned meal as you eat it; anything extra is
            one tap from your own staples below. The bar answers the 5 PM question: "how big
            does dinner need to be?"
          </p>
          <FuelTracker
            meals={MEALS}
            checks={c}
            onToggleMeal={(id) => toggleCheck(`meal:${id}`)}
            extras={progress.logs['fuel:extras'] ?? ''}
            onExtras={(v) => setLog('fuel:extras', v)}
          />
        </section>

        <section className="d4-label">
          <div className="d4-h">
            <h2>Water</h2>
            <span className="d4-tag">3 LITRES</span>
          </div>
          <p className="d4-p">9, 9 on the last two days. Make it a hat-trick.</p>
          <WaterTracker value={progress.water} onChange={setWater} />
        </section>

        <section className="d4-label">
          <div className="d4-h">
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

        <section className="d4-label">
          <div className="d4-h">
            <h2>Delivery notes</h2>
          </div>
          <NotesBox
            value={progress.notes}
            onChange={setNotes}
            placeholder="Hang seconds? How do the bands feel? Shoulder during face pulls, wrist status, anything…"
          />
        </section>

        <div className="d4-signoff">Signed, sealed, delivered. Tomorrow: the first weekend session.</div>

        <DayNav day={DAY} />
      </div>

      <ExerciseSheet info={infoId ? (EXERCISES[infoId] ?? null) : null} onClose={() => setInfoId(null)} />
    </div>
  )
}
