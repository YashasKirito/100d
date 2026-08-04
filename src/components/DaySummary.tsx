import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { dayEntry } from '../days/registry'
import type { DayManifest } from '../days/manifest'
import { loadDay } from '../lib/store'
import { completionPct, DONE_THRESHOLD } from '../lib/program'
import './day-summary.css'

/** Read-only recap of a finished day, rendered inside that day's own theme
 *  class so it wears the same design as the day did. */

function motivation(pct: number, missedCount: number): string {
  if (pct >= 0.95) return 'A clean sweep. Days like this are how the before photo becomes the after photo.'
  if (pct >= DONE_THRESHOLD)
    return missedCount === 1
      ? 'Banked. One item slipped — name it, and take it back tomorrow.'
      : 'Banked. The streak lives, and the log book grew.'
  if (pct >= 0.4) return 'Half a day still moves you forward. Tomorrow takes the other half back.'
  if (pct > 0) return 'You showed up, and showing up is the thread. Don’t cut it twice in a row.'
  return 'This square stayed empty. The next one doesn’t have to.'
}

function prettyLogKey(key: string, manifest: DayManifest): string {
  const id = key.split(':').slice(1).join(':')
  for (const s of manifest.sections) {
    const hit = s.items.find((i) => i.key.endsWith(`:${id}`) || i.key === id)
    if (hit) return hit.label
  }
  return id.replace(/-/g, ' ')
}

export function DaySummary({ day }: { day: number }) {
  const entry = dayEntry(day)
  const [manifest, setManifest] = useState<DayManifest | null>(null)

  useEffect(() => {
    let alive = true
    entry?.load().then((m) => {
      if (alive) setManifest(m.manifest)
    })
    return () => {
      alive = false
    }
  }, [entry])

  const progress = useMemo(() => loadDay(day), [day])

  if (!entry || !manifest) return null

  const pct = Math.round(completionPct(progress) * 100)
  const missed = manifest.sections.flatMap((s) =>
    s.items.filter((i) => !progress.checks[i.key]).map((i) => ({ ...i, section: s.title })),
  )
  const doneCount = manifest.sections.reduce(
    (n, s) => n + s.items.filter((i) => progress.checks[i.key]).length,
    0,
  )
  const totalCount = manifest.sections.reduce((n, s) => n + s.items.length, 0)
  const logs = Object.entries(progress.logs).filter(([, v]) => v.trim() !== '')

  return (
    <div className={`${manifest.themeClass} sum`}>
      <div className="sum-inner">
        <header className="sum-top">
          <Link to="/" className="sum-back press">← THE HUNDRED</Link>
          <span className="sum-frozen">FROZEN</span>
        </header>

        <div className="sum-head">
          <div className="sum-kicker">DAY {String(day).padStart(2, '0')} — {manifest.title.toUpperCase()}</div>
          <div className="sum-pct tabular">{pct}%</div>
          <div className="sum-sub">
            {doneCount} of {totalCount} items · {progress.water}/10 water
            {pct >= DONE_THRESHOLD * 100 ? ' · counted toward the streak' : ''}
          </div>
        </div>

        <p className="sum-motivation">{motivation(completionPct(progress), missed.length)}</p>

        {logs.length > 0 && (
          <section className="sum-block">
            <h2>The log book</h2>
            {logs.map(([k, v]) => (
              <div key={k} className="sum-row">
                <span className="l">{prettyLogKey(k, manifest)}</span>
                <span className="v tabular">{v}</span>
              </div>
            ))}
          </section>
        )}

        <section className="sum-block">
          <h2>What got done</h2>
          {manifest.sections.map((s) => {
            const done = s.items.filter((i) => progress.checks[i.key])
            if (!done.length) return null
            return (
              <div key={s.title} className="sum-row">
                <span className="l">{s.title}</span>
                <span className="v">
                  {done.length === s.items.length ? 'all ✓' : `${done.length}/${s.items.length} ✓`}
                </span>
              </div>
            )
          })}
        </section>

        {missed.length > 0 && (
          <section className="sum-block">
            <h2>What was cut</h2>
            {missed.map((m) => (
              <div key={m.key} className="sum-row miss">
                <span className="l">{m.label}</span>
                <span className="v">{m.section}</span>
              </div>
            ))}
          </section>
        )}

        {progress.notes.trim() && (
          <blockquote className="sum-notes">“{progress.notes.trim()}”</blockquote>
        )}

        <div className="sum-foot">This day is sealed. The work it did is not.</div>
      </div>
    </div>
  )
}
