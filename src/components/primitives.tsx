import { Link } from 'react-router-dom'
import { dayEntry } from '../days/registry'
import './primitives.css'

/* Shared building blocks for hand-crafted day pages. Pages are free to skip
   these entirely — but if used, they wire cleanly into useDayProgress and
   inherit the page's --day-accent theme. */

export function CheckItem({
  checked,
  onToggle,
  label,
  sub,
}: {
  checked: boolean
  onToggle: () => void
  label: string
  sub?: string
}) {
  return (
    <button className="p-check" data-checked={checked} onClick={onToggle}>
      <span className="box">
        <svg viewBox="0 0 16 16" aria-hidden>
          <path d="M2.5 8.5l3.5 3.5 7-8" />
        </svg>
      </span>
      <span>
        <span className="p-check-label">{label}</span>
        {sub && <div className="p-check-sub">{sub}</div>}
      </span>
    </button>
  )
}

export function ExerciseCard({
  id,
  name,
  rx,
  note,
  checked,
  onToggle,
  log,
  onLog,
  logPlaceholder = 'log reps, e.g. 10, 9, 8',
}: {
  id: string
  name: string
  rx: string
  note?: string
  checked: boolean
  onToggle: () => void
  log?: string
  onLog?: (v: string) => void
  logPlaceholder?: string
}) {
  return (
    <div className="p-exercise">
      <div className="p-exercise-head">
        <span className="p-exercise-name">{name}</span>
        <span className="p-exercise-rx">{rx}</span>
      </div>
      {note && <div className="p-exercise-note">{note}</div>}
      <div className="p-exercise-log">
        {onLog && (
          <input
            value={log ?? ''}
            onChange={(e) => onLog(e.target.value)}
            placeholder={logPlaceholder}
            aria-label={`Log for ${name}`}
          />
        )}
        <CheckItem key={id} checked={checked} onToggle={onToggle} label="" />
      </div>
    </div>
  )
}

export function WaterTracker({
  value,
  onChange,
  goal = 10,
}: {
  value: number
  onChange: (n: number) => void
  goal?: number
}) {
  return (
    <div>
      <div className="p-water">
        {Array.from({ length: goal }, (_, i) => (
          <button
            key={i}
            data-filled={i < value}
            aria-label={`Glass ${i + 1}`}
            onClick={() => onChange(i + 1 === value ? i : i + 1)}
          />
        ))}
      </div>
      <div className="p-water-count">
        {value * 300}ml / {goal * 300}ml
      </div>
    </div>
  )
}

export function MacroBar({
  kcal = 2350,
  protein = 135,
  waterL = 3,
}: {
  kcal?: number
  protein?: number
  waterL?: number
}) {
  return (
    <div className="p-macros">
      <div className="p-macro">
        <div className="v">{kcal}</div>
        <div className="k">kcal</div>
      </div>
      <div className="p-macro">
        <div className="v">{protein}g</div>
        <div className="k">protein</div>
      </div>
      <div className="p-macro">
        <div className="v">{waterL}L</div>
        <div className="k">water</div>
      </div>
    </div>
  )
}

export function NotesBox({
  value,
  onChange,
  placeholder = 'How did it go? PRs, struggles, wrist status…',
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <textarea
      className="p-notes"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}

export function DayNav({ day }: { day: number }) {
  const prev = day > 1 ? dayEntry(day - 1) : undefined
  const next = day < 100 ? dayEntry(day + 1) : undefined
  return (
    <nav className="p-daynav">
      {prev ? <Link to={`/day/${prev.day}`} className="press">← Day {prev.day}</Link> : <span />}
      <Link to="/" className="home press">Dashboard</Link>
      {next ? <Link to={`/day/${next.day}`} className="press">Day {next.day} →</Link> : <span>Made nightly</span>}
    </nav>
  )
}
