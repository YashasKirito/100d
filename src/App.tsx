import { Suspense } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { useProfile } from './hooks/useProfile'
import { Onboarding } from './components/shell/Onboarding'
import { Dashboard } from './components/shell/Dashboard'
import { Guide } from './components/shell/Guide'
import { Measurements } from './components/shell/Measurements'
import { NotCraftedYet } from './components/shell/NotCraftedYet'
import { dayEntry } from './days/registry'

function DayRoute() {
  const { n } = useParams()
  const day = Number(n)
  if (!Number.isInteger(day) || day < 1 || day > 100) return <Navigate to="/" replace />
  const entry = dayEntry(day)
  if (!entry) return <NotCraftedYet day={day} />
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
      <Route path="/day/:n" element={<DayRoute />} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/measurements" element={<Measurements />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
