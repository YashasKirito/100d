import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import type { DayManifest } from './manifest'

export interface DayModule {
  default: ComponentType
  manifest: DayManifest
}

export interface DayEntry {
  day: number
  title: string
  /** one-word-ish design mood, so future sessions avoid repeating themes */
  theme: string
  load: () => Promise<DayModule>
  component: LazyExoticComponent<ComponentType>
}

/**
 * One entry per hand-crafted day page. Added nightly during the ritual —
 * never generated. Keep entries in day order.
 */
const load1 = () => import('./Day001')
const load2 = () => import('./Day002')
const load3 = () => import('./Day003')
const load4 = () => import('./Day004')
const load5 = () => import('./Day005')
const load6 = () => import('./Day006')
const load7 = () => import('./Day007')

export const DAYS: DayEntry[] = [
  { day: 1, title: 'Baseline', theme: 'editorial ledger', load: load1, component: lazy(load1) },
  { day: 2, title: 'Recovery', theme: 'nocturne glow', load: load2, component: lazy(load2) },
  { day: 3, title: 'Chest Day', theme: 'chalkboard coach', load: load3, component: lazy(load3) },
  { day: 4, title: 'Delivery Day', theme: 'kraft parcel', load: load4, component: lazy(load4) },
  { day: 5, title: 'Saturday Session', theme: 'retro sport', load: load5, component: lazy(load5) },
  { day: 6, title: 'Reset & Prep', theme: 'recipe card', load: load6, component: lazy(load6) },
  { day: 7, title: 'System Reboot', theme: 'neon terminal', load: load7, component: lazy(load7) },
]

export const dayEntry = (n: number) => DAYS.find((d) => d.day === n)
export const latestDay = () => (DAYS.length ? DAYS[DAYS.length - 1].day : 0)
