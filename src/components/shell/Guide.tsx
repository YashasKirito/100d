import { Link } from 'react-router-dom'
import { PHASES } from '../../lib/program'
import './shell.css'

const PHASE_COPY: Record<number, string> = {
  1: 'Recondition safely. Daily wrist rehab and posture work, movement grooving, habits locked in. Intensity capped — the only goal is 14 straight days of showing up.',
  2: 'Progressive overload begins. Beat the log every session: one more rep, one rung up the ladder. Weekend heavy days run at home on the barbell set — no gym membership, his call: habit before money.',
  3: 'Peak volume. The first full pull-up lives here (test on Day 60, not before). Deload days 50–56 is planned recovery — growth happens there.',
  4: 'Push hard, then consolidate. Deload days 85–91, then a victory-lap week of tests, photos, and planning the next 100.',
}

const MILESTONES: [string, string][] = [
  ['Day 14', 'Incline push-ups 3×10, zero wrist pain'],
  ['Day 28', 'Dead hang 3×30s'],
  ['Day 42', '5s negatives 3×5 · knee push-ups 3×12'],
  ['Day 60', 'First pull-up attempt'],
  ['Day 70', 'Full push-ups 3×8'],
  ['Day 84', '2–3 full pull-ups'],
  ['Day 100', 'Push-ups 15–20 · pull-ups 3–5 · plank 90s'],
]

const RULES: [string, string][] = [
  ['Protein', '135g every day — the #1 metric'],
  ['Calories', '~2,350 kcal, maintenance recomp'],
  ['Water', '3L (10 glasses)'],
  ['Sleep', '7h+, screens off by 00:30'],
  ['Wrist', 'Pain above 2/10 → previous rung + rehab'],
  ['Shoulder', 'Same 2/10 rule on overhead pressing · face pulls + pull-aparts are the medicine'],
  ['Missed day', 'Skipped, never doubled up'],
]

/** Agreed on Day 2 from baseline photos + tape. Recomp: the scale staying
 *  flat while these move is the plan working. */
const TARGETS: [string, string, string][] = [
  ['Waist', '84 cm', '78–81 cm'],
  ['Chest', '93 cm', '95–97 cm'],
  ['Shoulders', '107 cm', '109–112 cm'],
  ['Arms', '30 / 31 cm', '~32–33 cm'],
  ['Weight', '70 kg', '69–71 kg (flat, by design)'],
]

export function Guide() {
  return (
    <div className="shell guide">
      <div className="shell-top">
        <Link to="/" className="back-link press">← Dashboard</Link>
      </div>
      <h1>The Program</h1>
      <p className="lede">
        Body recomposition, not weight loss. The scale barely moves; the mirror does. Full
        detail lives in <code>program/PROGRAM.md</code> — this is the field guide.
      </p>

      {PHASES.map((p) => (
        <div key={p.number} className="guide-phase card" style={{ borderLeftColor: p.color }}>
          <h2>
            Phase {p.number} — {p.name}
            <span className="range">
              Days {p.start}–{p.end}
            </span>
          </h2>
          <p>{PHASE_COPY[p.number]}</p>
        </div>
      ))}

      <div className="guide-section">
        <h3>Day 100 targets — set Day 2, from the baseline photos</h3>
        <p className="guide-note">
          The goal in his words: broad back, rounder shoulders with muscle, bigger arms and
          forearms, flatter core. Not promised by Day 100: a six-pack — that's the months-4-to-8
          payoff this base makes possible.
        </p>
        <table>
          <tbody>
            {TARGETS.map(([what, from, to]) => (
              <tr key={what}>
                <td>{what}</td>
                <td>{from}</td>
                <td>{to}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="guide-section">
        <h3>Milestones</h3>
        <table>
          <tbody>
            {MILESTONES.map(([d, t]) => (
              <tr key={d}>
                <td>{d}</td>
                <td>{t}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="guide-section">
        <h3>Non-negotiables</h3>
        <table>
          <tbody>
            {RULES.map(([d, t]) => (
              <tr key={d}>
                <td>{d}</td>
                <td>{t}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
