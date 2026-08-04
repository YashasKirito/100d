import { Suspense } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { useProfile } from './hooks/useProfile'
import { Onboarding } from './components/shell/Onboarding'
import { Dashboard } from './components/shell/Dashboard'
import { Guide } from './components/shell/Guide'
import { Measurements } from './components/shell/Measurements'
import { NotCraftedYet, LockedDay } from './components/shell/NotCraftedYet'
import { DaySummary } from './components/DaySummary'
import { dayEntry } from './days/registry'

function DayRoute({ today }: { today: number | null }) {
  const { n } = useParams()
  const day = Number(n)
  if (!Number.isInteger(day) || day < 1 || day > 100) return <Navigate to="/" replace />
  const entry = dayEntry(day)
  if (!entry) return <NotCraftedYet day={day} />
  // past days are sealed: read-only recap in that day's own theme
  if (today !== null && day < today) return <DaySummary day={day} />
  // future days stay shut until their morning
  if (today !== null && day > today) return <LockedDay day={day} title={entry.title} theme={entry.theme} />
  const Page = entry.component
  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  )
}

export default function App() {
  const profileState = useProfile()

  if (!profileState.loaded) return null
  if (!profileState.profile) return <Onboarding onStart={profileState.setStartDate} />

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/day/:n" element={<DayRoute today={profileState.todayNumber} />} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/measurements" element={<Measurements />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
