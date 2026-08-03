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

const FIELDS: { key: keyof Measurement; label: string }[] = [
  { key: 'weightKg', label: 'Weight (kg)' },
  { key: 'waistCm', label: 'Waist (cm)' },
  { key: 'chestCm', label: 'Chest (cm)' },
  { key: 'shouldersCm', label: 'Shoulders (cm)' },
  { key: 'leftArmCm', label: 'Left arm (cm)' },
  { key: 'rightArmCm', label: 'Right arm (cm)' },
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

  const weightPts = history.filter((m) => m.weightKg).map((m) => [m.day, m.weightKg!] as [number, number])
  const waistPts = history.filter((m) => m.waistCm).map((m) => [m.day, m.waistCm!] as [number, number])

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

      {weightPts.length >= 2 && (
        <div className="chart-card card">
          <h2>Weight</h2>
          <div className="cap tabular">
            {weightPts[0][1]}kg → {weightPts[weightPts.length - 1][1]}kg
          </div>
          <Sparkline points={weightPts} color="var(--phase-1)" />
        </div>
      )}
      {waistPts.length >= 2 && (
        <div className="chart-card card">
          <h2>Waist</h2>
          <div className="cap tabular">
            {waistPts[0][1]}cm → {waistPts[waistPts.length - 1][1]}cm
          </div>
          <Sparkline points={waistPts} color="var(--phase-3)" />
        </div>
      )}

      {history.length > 0 && (
        <div className="chart-card card">
          <h2>History</h2>
          {history
            .slice()
            .reverse()
            .map((m) => (
              <div key={m.day} className="history-row tabular">
                <span className="d">Day {m.day} · {formatDate(dateForDay(profile.startDate, m.day))}</span>
                <span>
                  {m.weightKg ? `${m.weightKg}kg` : '—'} · {m.waistCm ? `${m.waistCm}cm` : '—'}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
