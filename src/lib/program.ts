export const TOTAL_DAYS = 100

export interface Phase {
  number: 1 | 2 | 3 | 4
  name: string
  tagline: string
  start: number
  end: number
  deload?: [number, number]
  color: string
}

export const PHASES: Phase[] = [
  {
    number: 1,
    name: 'Foundation & Rehab',
    tagline: 'Show up, don’t blow up',
    start: 1,
    end: 14,
    color: 'var(--phase-1)',
  },
  {
    number: 2,
    name: 'Build',
    tagline: 'Beat the log',
    start: 15,
    end: 42,
    color: 'var(--phase-2)',
  },
  {
    number: 3,
    name: 'Progress',
    tagline: 'First pull-up lives here',
    start: 43,
    end: 70,
    deload: [50, 56],
    color: 'var(--phase-3)',
  },
  {
    number: 4,
    name: 'Peak & Consolidate',
    tagline: 'Best shape, then keep it',
    start: 71,
    end: 100,
    deload: [85, 91],
    color: 'var(--phase-4)',
  },
]

export const MEASUREMENT_DAYS = [1, 14, 28, 42, 56, 70, 84, 100]

export function phaseForDay(day: number): Phase {
  return PHASES.find((p) => day >= p.start && day <= p.end) ?? PHASES[PHASES.length - 1]
}

export function isDeloadDay(day: number): boolean {
  const p = phaseForDay(day)
  return !!p.deload && day >= p.deload[0] && day <= p.deload[1]
}

export function isMeasurementDay(day: number): boolean {
  return MEASUREMENT_DAYS.includes(day)
}

export function weekOfChallenge(day: number): number {
  return Math.ceil(day / 7)
}

const MS_DAY = 86_400_000

function atMidnight(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
}

/** 1-based challenge day for a calendar date. Can be < 1 (not started) or > 100 (finished). */
export function dayNumberForDate(startDate: string, date: Date = new Date()): number {
  const [y, m, d] = startDate.split('-').map(Number)
  const start = new Date(y, m - 1, d).getTime()
  return Math.floor((atMidnight(date) - start) / MS_DAY) + 1
}

export function dateForDay(startDate: string, day: number): Date {
  const [y, m, d] = startDate.split('-').map(Number)
  return new Date(y, m - 1, d + (day - 1))
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
}

export type SessionKind =
  | 'push-a'
  | 'pull-a'
  | 'rest'
  | 'push-b'
  | 'pull-b'
  | 'gym-upper'
  | 'gym-lower'

export const SESSION_LABELS: Record<SessionKind, string> = {
  'push-a': 'Push A — Shoulders',
  'pull-a': 'Pull A — Back & Lats',
  rest: 'Rest + Posture & Wrist',
  'push-b': 'Push B — Chest & Arms',
  'pull-b': 'Pull B + Core',
  'gym-upper': 'Gym — Upper (Heavy)',
  'gym-lower': 'Gym — Lower + Core',
}

/** Sessions map to weekday (Mon=Push A … Sun=Gym Lower), not day number. */
export function sessionForDate(date: Date, day: number): SessionKind {
  const weekday = date.getDay() // 0=Sun
  const kind = (['gym-lower', 'push-a', 'pull-a', 'rest', 'push-b', 'pull-b', 'gym-upper'] as SessionKind[])[
    weekday
  ]
  // Phase 1 and deload weeks: Sunday is full rest
  if (kind === 'gym-lower' && (phaseForDay(day).number === 1 || isDeloadDay(day))) return 'rest'
  return kind
}

/** A day counts as "done" at this completion fraction — showing up beats perfection. */
export const DONE_THRESHOLD = 0.75

/** 0..1 completion of a day. Water counts as one item, filled fractionally. */
export function completionPct(d: {
  checks: Record<string, boolean>
  water: number
  total?: number
}): number {
  const done = Object.values(d.checks).filter(Boolean).length
  if (d.total && d.total > 0) {
    return Math.min((done + Math.min(d.water / 10, 1)) / d.total, 1)
  }
  // legacy record without a stored total — show a sliver, not a full square
  return done > 0 || d.water > 0 ? 0.2 : 0
}

/** Consecutive-day streak ending today (or yesterday if today untouched). */
export function computeStreak(completedDays: Set<number>, todayNumber: number): number {
  let streak = 0
  let day = completedDays.has(todayNumber) ? todayNumber : todayNumber - 1
  while (day >= 1 && completedDays.has(day)) {
    streak++
    day--
  }
  return streak
}
