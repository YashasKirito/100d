import { useState } from 'react'
import './shell.css'

function todayISO(): string {
  const d = new Date()
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

export function Onboarding({ onStart }: { onStart: (date: string) => void }) {
  const [date, setDate] = useState(todayISO())

  return (
    <div className="onboarding">
      <div className="kicker rise">100-DAY CHALLENGE</div>
      <h1 className="rise rise-1">
        One body.
        <br />
        Hundred days.
      </h1>
      <p className="rise rise-2">
        Every evening, tomorrow's page gets crafted — workout, meals, water, habits. Every
        morning, you open it and do the work. That's the whole deal.
      </p>
      <div className="date-row rise rise-3">
        <label htmlFor="start-date">Day 1 is</label>
        <input
          id="start-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button className="btn-primary rise rise-4" disabled={!date} onClick={() => onStart(date)}>
        Start the challenge
      </button>
    </div>
  )
}
