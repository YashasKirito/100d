import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export interface DayEntry {
  day: number
  title: string
  /** one-word-ish design mood, so future sessions avoid repeating themes */
  theme: string
  component: LazyExoticComponent<ComponentType>
}

/**
 * One entry per hand-crafted day page. Added nightly during the ritual —
 * never generated. Keep entries in day order.
 */
export const DAYS: DayEntry[] = [
  {
    day: 1,
    title: 'Baseline',
    theme: 'editorial ledger',
    component: lazy(() => import('./Day001')),
  },
]

export const dayEntry = (n: number) => DAYS.find((d) => d.day === n)
export const latestDay = () => (DAYS.length ? DAYS[DAYS.length - 1].day : 0)
