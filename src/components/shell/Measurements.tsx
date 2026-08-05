import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProfile } from '../../hooks/useProfile'
import { loadMeasurement, saveMeasurement } from '../../lib/store'
import { MEASUREMENT_DAYS, TOTAL_DAYS, dateForDay, formatDate } from '../../lib/program'
import type { Measurement } from '../../lib/types'
import './shell.css'

function Sparkline({ points, color }: { points: [number, number][]; color: string }) {
  if (points.length < 2) return null
  const w = 300
  const h = 60
  const pad = 4
  const xs = points.map((p) => p[0])
  const ys = points.map((p) => p[1])
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)
  const sx = (x: number) => pad + ((x - minX) / Math.max(maxX - minX, 1)) * (w - pad * 2)
  const sy = (y: number) => h - pad - ((y - minY) / Math.max(maxY - minY, 0.1)) * (h - pad * 2)
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${sx(p[0]).toFixed(1)},${sy(p[1]).toFixed(1)}`).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} aria-hidden>
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {points.map((p) => (
        <circle key={p[0]} cx={sx(p[0])} cy={sy(p[1])} r="3" fill={color} />
      ))}
    </svg>
  )
}

const FIELDS: { key: keyof Measurement; label: string; short: string; unit: string; color: string }[] = [
  { key: 'weightKg', label: 'Weight (kg)', short: 'Weight', unit: 'kg', color: 'var(--phase-1)' },
  { key: 'waistCm', label: 'Waist (cm)', short: 'Waist', unit: 'cm', color: 'var(--phase-3)' },
  { key: 'chestCm', label: 'Chest (cm)', short: 'Chest', unit: 'cm', color: 'var(--phase-2)' },
  { key: 'shouldersCm', label: 'Shoulders (cm)', short: 'Shoulders', unit: 'cm', color: 'var(--phase-4)' },
  { key: 'leftArmCm', label: 'Left arm (cm)', short: 'L arm', unit: 'cm', color: 'var(--good)' },
  { key: 'rightArmCm', label: 'Right arm (cm)', short: 'R arm', unit: 'cm', color: 'var(--phase-1)' },
]

export function Measurements() {
  const { profile, todayNumber } = useProfile()
  const [saved, setSaved] = useState(false)
  const [version, setVersion] = useState(0)

  const today = Math.min(Math.max(todayNumber ?? 1, 1), TOTAL_DAYS)
  const [form, setForm] = useState<Partial<Record<keyof Measurement, string>>>(() => {
    const existing = loadMeasurement(today)
    const init: Partial<Record<keyof Measurement, string>> = {}
    if (existing) for (const f of FIELDS) init[f.key] = existing[f.key] != null ? String(existing[f.key]) : ''
    return init
  })

  const history = useMemo(() => {
    void version
    const all: Measurement[] = []
    for (let n = 1; n <= today; n++) {
      const m = loadMeasurement(n)
      if (m) all.push(m)
    }
    return all
  }, [today, version])

  if (!profile) return null

  const nextMeasureDay = MEASUREMENT_DAYS.find((d) => d >= today)

  const save = () => {
    const m: Measurement = {
      day: today,
      date: dateForDay(profile.startDate, today).toISOString().slice(0, 10),
      updatedAt: Date.now(),
    }
    for (const f of FIELDS) {
      const v = parseFloat(form[f.key] ?? '')
      if (!Number.isNaN(v)) (m[f.key] as number) = v
    }
    saveMeasurement(m)
    setVersion((v) => v + 1)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  const series = FIELDS.map((f) => ({
    field: f,
    points: history
      .filter((m) => m[f.key] != null)
      .map((m) => [m.day, m[f.key] as number] as [number, number]),
  }))

  return (
    <div className="shell measure">
      <div className="shell-top">
        <Link to="/" className="back-link press">← Dashboard</Link>
      </div>
      <h1>Measurements</h1>
      <p className="lede">
        Morning, post-toilet, pre-food. Same conditions every time.
        {nextMeasureDay ? ` Next scheduled: Day ${nextMeasureDay}.` : ''}
      </p>

      <div className="measure-form card">
        <h2>Log for Day {today}</h2>
        <div className="measure-grid">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label htmlFor={f.key}>{f.label}</label>
              <input
                id={f.key}
                type="number"
                inputMode="decimal"
                step="0.1"
                value={form[f.key] ?? ''}
                onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
              />
            </div>
          ))}
        </div>
        <button className="btn-primary measure-save press" onClick={save}>
          {saved ? 'Saved ✓' : 'Save'}
        </button>
      </div>

      {series
        .filter(({ points }) => points.length >= 2)
        .map(({ field, points }) => (
          <div key={field.key} className="chart-card card">
            <h2>{field.short}</h2>
            <div className="cap tabular">
              {points[0][1]}{field.unit} → {points[points.length - 1][1]}{field.unit}
            </div>
            <Sparkline points={points} color={field.color} />
          </div>
        ))}

      {history.length > 0 && (
        <div className="chart-card card">
          <h2>History</h2>
          {history
            .slice()
            .reverse()
            .map((m) => (
              <div key={m.day} className="history-row tabular">
                <span className="d">Day {m.day} · {formatDate(dateForDay(profile.startDate, m.day))}</span>
                <span className="vals">
                  {FIELDS.filter((f) => m[f.key] != null)
                    .map((f) => `${f.short} ${m[f.key]}${f.unit}`)
                    .join(' · ') || '—'}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
