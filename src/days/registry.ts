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
const load8 = () => import('./Day008')
const load9 = () => import('./Day009')
const load10 = () => import('./Day010')
const load11 = () => import('./Day011')
const load12 = () => import('./Day012')
const load13 = () => import('./Day013')
const load14 = () => import('./Day014')
const load15 = () => import('./Day015')

export const DAYS: DayEntry[] = [
  { day: 1, title: 'Baseline', theme: 'editorial ledger', load: load1, component: lazy(load1) },
  { day: 2, title: 'Recovery', theme: 'nocturne glow', load: load2, component: lazy(load2) },
  { day: 3, title: 'Chest Day', theme: 'chalkboard coach', load: load3, component: lazy(load3) },
  { day: 4, title: 'Delivery Day', theme: 'kraft parcel', load: load4, component: lazy(load4) },
  { day: 5, title: 'Saturday Session', theme: 'retro sport', load: load5, component: lazy(load5) },
  { day: 6, title: 'Reset & Prep', theme: 'recipe card', load: load6, component: lazy(load6) },
  { day: 7, title: 'System Reboot', theme: 'neon terminal', load: load7, component: lazy(load7) },
  { day: 8, title: 'The Ascent', theme: 'swiss grid', load: load8, component: lazy(load8) },
  { day: 9, title: 'Stillness', theme: 'dusk gradient', load: load9, component: lazy(load9) },
  { day: 10, title: 'Double Digits', theme: 'comic pop', load: load10, component: lazy(load10) },
  { day: 11, title: 'The Back Works', theme: 'blueprint', load: load11, component: lazy(load11) },
  { day: 12, title: 'Saturday Session II', theme: 'brutalist poster', load: load12, component: lazy(load12) },
  { day: 13, title: 'Sunday, Written Down', theme: 'handwritten journal', load: load13, component: lazy(load13) },
  { day: 14, title: 'Low Power Mode', theme: 'minimal mono', load: load14, component: lazy(load14) },
  { day: 15, title: 'Green Flag', theme: 'racing livery', load: load15, component: lazy(load15) },
]

export const dayEntry = (n: number) => DAYS.find((d) => d.day === n)
export const latestDay = () => (DAYS.length ? DAYS[DAYS.length - 1].day : 0)
