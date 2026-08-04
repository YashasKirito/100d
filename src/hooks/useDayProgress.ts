import { useCallback, useEffect, useRef, useState } from 'react'
import { loadDay, saveDay } from '../lib/store'
import { emptyDay, type DayProgress } from '../lib/types'

/**
 * THE data contract for day pages. A hand-crafted day page calls this once
 * and gets state + mutators; persistence (localStorage + Firestore) is
 * handled here, debounced. Key conventions:
 *   checks — "exercise:<id>" | "habit:<id>" | "rehab" | "posture" | "meal:<id>"
 *   logs   — "reps:<id>" | "weight:<id>" (free-form strings, e.g. "10,9,8")
 */
export function useDayProgress(day: number, totalItems?: number) {
  const [progress, setProgress] = useState<DayProgress>(emptyDay)
  const dirty = useRef(false)

  useEffect(() => {
    let loaded = loadDay(day, (fresh) => setProgress(fresh))
    // record how many completable items this page has, so the dashboard
    // can render "% of today done" without loading the page component
    if (totalItems && loaded.total !== totalItems) {
      loaded = { ...loaded, total: totalItems }
      dirty.current = true
    } else {
      dirty.current = false
    }
    setProgress(loaded)
  }, [day, totalItems])

  // debounce persistence
  useEffect(() => {
    if (!dirty.current) return
    const t = setTimeout(() => {
      saveDay(day, progress)
      dirty.current = false
    }, 400)
    return () => clearTimeout(t)
  }, [progress, day])

  const update = useCallback((fn: (p: DayProgress) => DayProgress) => {
    dirty.current = true
    setProgress(fn)
  }, [])

  const toggleCheck = useCallback(
    (key: string) =>
      update((p) => ({ ...p, checks: { ...p.checks, [key]: !p.checks[key] } })),
    [update],
  )

  const setLog = useCallback(
    (key: string, value: string) =>
      update((p) => ({ ...p, logs: { ...p.logs, [key]: value } })),
    [update],
  )

  const setWater = useCallback(
    (glasses: number) => update((p) => ({ ...p, water: Math.max(0, Math.min(10, glasses)) })),
    [update],
  )

  const setNotes = useCallback(
    (notes: string) => update((p) => ({ ...p, notes })),
    [update],
  )

  return { progress, toggleCheck, setLog, setWater, setNotes }
}
