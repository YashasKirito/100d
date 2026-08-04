import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useProfile } from '../../hooks/useProfile'
import { daysWithProgress } from '../../lib/store'
import {
  DONE_THRESHOLD,
  PHASES,
  TOTAL_DAYS,
  completionPct,
  computeStreak,
  dateForDay,
  formatDate,
  isDeloadDay,
  phaseForDay,
  sessionForDate,
  SESSION_LABELS,
} from '../../lib/program'
import { dayEntry } from '../../days/registry'
import './shell.css'

export function Dashboard() {
  const { profile, todayNumber, user, firebaseEnabled, signIn, signOut } = useProfile()
  const progressDays = useMemo(() => daysWithProgress(), [])

  if (!profile || todayNumber === null) return null

  const today = Math.min(Math.max(todayNumber, 1), TOTAL_DAYS)
  const notStarted = todayNumber < 1
  const finished = todayNumber > TOTAL_DAYS
  const pcts = new Map<number, number>()
  for (const [n, d] of progressDays) pcts.set(n, completionPct(d))
  const doneSet = new Set([...pcts].filter(([, p]) => p >= DONE_THRESHOLD).map(([n]) => n))
  const streak = computeStreak(doneSet, today)
  const phase = phaseForDay(today)
  const todayEntry = dayEntry(today)
  const todayDate = dateForDay(profile.startDate, today)
  const session = SESSION_LABELS[sessionForDate(todayDate, today)]

  return (
    <div className="shell">
      <header className="shell-top">
        <span className="wordmark">100 DAYS</span>
        {firebaseEnabled ? (
          <button
            className="sync-chip press"
            onClick={() => (user ? void signOut() : void signIn())}
          >
            <span className={`dot ${user ? 'on' : ''}`} />
            {user ? 'Synced' : 'Sign in'}
          </button>
        ) : (
          <span className="sync-chip">
            <span className="dot" />
            Local only
          </span>
        )}
      </header>

      <section className="hero">
        <div className="day-count tabular">
          {notStarted ? '00' : finished ? '100' : String(today).padStart(2, '0')}
          <small> / 100</small>
        </div>
        <div className="sub">
          <span className="phase-chip" style={{ background: phase.color }}>
            Phase {phase.number}
          </span>
          <span>
            {phase.name}
            {isDeloadDay(today) ? ' · deload' : ''}
          </span>
        </div>

        {notStarted ? (
          <div className="today-cta pending">
            <div className="cta-label">STARTS {formatDate(dateForDay(profile.startDate, 1)).toUpperCase()}</div>
            <div className="cta-title">Get the equipment ready</div>
            <div className="cta-sub">Pull-up bar, bands, and a Day 1 page await.</div>
          </div>
        ) : todayEntry ? (
          <Link to={`/day/${today}`} className="today-cta">
            <div className="cta-label">TODAY · {formatDate(todayDate).toUpperCase()}</div>
            <div className="cta-title">
              Day {today} — {todayEntry.title}
            </div>
            <div className="cta-sub">{session}</div>
          </Link>
        ) : (
          <div className="today-cta pending">
            <div className="cta-label">TODAY · {formatDate(todayDate).toUpperCase()}</div>
            <div className="cta-title">Day {today} isn't crafted yet</div>
            <div className="cta-sub">Run the evening ritual to build this page.</div>
          </div>
        )}
      </section>

      <section className="stats-row">
        <div className="stat card">
          <div className="num tabular">{streak}</div>
          <div className="lbl">Streak</div>
        </div>
        <div className="stat card">
          <div className="num tabular">{doneSet.size}</div>
          <div className="lbl">Days done</div>
        </div>
        <div className="stat card">
          <div className="num tabular">{Math.round((doneSet.size / TOTAL_DAYS) * 100)}%</div>
          <div className="lbl">Complete</div>
        </div>
      </section>

      <section>
        <div className="phase-bar">
          {PHASES.map((p) => {
            const len = p.end - p.start + 1
            const progress = Math.min(Math.max((today - p.start + 1) / len, 0), 1)
            return (
              <div key={p.number} className="seg" style={{ flex: len }}>
                <div
                  className="fill"
                  style={{ background: p.color, transform: `scaleX(${notStarted ? 0 : progress})` }}
                />
              </div>
            )
          })}
        </div>
        <div className="phase-legend">
          {PHASES.map((p) => (
            <span key={p.number}>{p.name.split(' ')[0]}</span>
          ))}
        </div>
      </section>

      <section>
        <div className="grid-100">
          {Array.from({ length: TOTAL_DAYS }, (_, i) => {
            const n = i + 1
            const isPast = !notStarted && n < today
            const isToday = !notStarted && !finished && n === today
            const pct = pcts.get(n) ?? 0
            const color = phaseForDay(n).color
            const cls = [
              'cell',
              isToday ? 'today' : '',
              pct > 0 ? '' : isPast ? 'missed' : !isToday ? 'future' : '',
            ]
              .filter(Boolean)
              .join(' ')
            // squares fill bottom-up with the day's completion percentage
            const style =
              pct >= 0.995
                ? { background: color }
                : pct > 0
                  ? {
                      background: `linear-gradient(to top, ${color} ${Math.round(pct * 100)}%, var(--surface-2) ${Math.round(pct * 100)}%)`,
                    }
                  : undefined
            return isPast || isToday ? (
              <Link
                key={n}
                to={`/day/${n}`}
                className={cls}
                style={style}
                aria-label={`Day ${n} — ${Math.round(pct * 100)}% done`}
              />
            ) : (
              <div key={n} className={cls} style={style} />
            )
          })}
        </div>
        <div className="grid-caption">
          Squares fill as you complete the day. {Math.round(DONE_THRESHOLD * 100)}%+ counts for the streak.
        </div>
      </section>

      <section className="nav-cards">
        <Link to="/guide" className="nav-card card">
          <div className="t">The Program</div>
          <div className="d">Phases, targets, why it works</div>
        </Link>
        <Link to="/measurements" className="nav-card card">
          <div className="t">Measurements</div>
          <div className="d">Weight, waist, photos, trends</div>
        </Link>
      </section>
    </div>
  )
}
