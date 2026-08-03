import { Link } from 'react-router-dom'
import './shell.css'

export function NotCraftedYet({ day }: { day: number }) {
  return (
    <div className="shell">
      <div className="shell-top">
        <Link to="/" className="back-link press">← Dashboard</Link>
      </div>
      <div className="not-crafted">
        <div className="big tabular">{String(day).padStart(2, '0')}</div>
        <h1>Not crafted yet</h1>
        <p>
          Day pages are hand-made the evening before, one at a time. Sit down tonight, run the
          ritual, and this page will exist by morning.
        </p>
      </div>
    </div>
  )
}
