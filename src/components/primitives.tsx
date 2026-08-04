import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { dayEntry } from '../days/registry'
import './primitives.css'

/* Shared building blocks for hand-crafted day pages. Pages are free to skip
   these entirely — but if used, they wire cleanly into useDayProgress and
   inherit the page's --day-accent theme. */

function InfoDot({ onInfo, name }: { onInfo: () => void; name: string }) {
  return (
    <button
      className="p-info press"
      aria-label={`How to do ${name}`}
      onClick={(e) => {
        e.stopPropagation()
        onInfo()
      }}
    >
      ?
    </button>
  )
}

export function CheckItem({
  checked,
  onToggle,
  label,
  sub,
  onInfo,
}: {
  checked: boolean
  onToggle: () => void
  label: string
  sub?: string
  onInfo?: () => void
}) {
  return (
    <div className="p-check-row">
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
      {onInfo && <InfoDot onInfo={onInfo} name={label} />}
    </div>
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
  onInfo,
  timer,
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
  onInfo?: () => void
  /** timed hold (plank, dead hang): shows an inline stopwatch that logs seconds */
  timer?: boolean
  logPlaceholder?: string
}) {
  return (
    <div className="p-exercise">
      <div className="p-exercise-head">
        <span className="p-exercise-name">
          {name}
          {onInfo && <InfoDot onInfo={onInfo} name={name} />}
        </span>
        <span className="p-exercise-rx">{rx}</span>
      </div>
      {note && <div className="p-exercise-note">{note}</div>}
      {timer && onLog && (
        <Stopwatch onLog={(s) => onLog(log?.trim() ? `${log.trim()}, ${s}s` : `${s}s`)} />
      )}
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

/** Inline stopwatch for timed holds (plank, dead hang). "Log" writes the
 *  elapsed seconds into the exercise's rep log. */
export function Stopwatch({ onLog }: { onLog?: (seconds: number) => void }) {
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0) // ms
  const startAt = useRef(0)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setElapsed(Date.now() - startAt.current), 100)
    return () => clearInterval(id)
  }, [running])

  const toggle = () => {
    if (running) {
      setElapsed(Date.now() - startAt.current)
      setRunning(false)
    } else {
      startAt.current = Date.now() - elapsed
      setRunning(true)
    }
  }

  const secs = elapsed / 1000
  const display = `${Math.floor(secs / 60) ? `${Math.floor(secs / 60)}:` : ''}${
    Math.floor(secs / 60) ? String(Math.floor(secs % 60)).padStart(2, '0') : Math.floor(secs % 60)
  }.${Math.floor((secs % 1) * 10)}`

  return (
    <div className="p-stopwatch" data-running={running}>
      <span className="p-stopwatch-time tabular">{display}s</span>
      <button className="p-stopwatch-btn press" onClick={toggle}>
        {running ? 'Stop' : elapsed ? 'Resume' : 'Start'}
      </button>
      {!running && elapsed > 0 && (
        <>
          {onLog && (
            <button
              className="p-stopwatch-btn log press"
              onClick={() => {
                onLog(Math.round(secs))
                setElapsed(0)
              }}
            >
              Log {Math.round(secs)}s
            </button>
          )}
          <button className="p-stopwatch-btn ghost press" onClick={() => setElapsed(0)}>
            Reset
          </button>
        </>
      )}
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
