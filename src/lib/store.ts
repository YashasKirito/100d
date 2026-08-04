import { doc, getDoc, setDoc } from 'firebase/firestore'
import { getDb, subscribeAuth } from './firebase'
import { emptyDay, type DayProgress, type Measurement, type Profile } from './types'

/**
 * Storage layer with one API regardless of backend:
 * - localStorage is always written synchronously (instant UI, offline-first)
 * - when Firebase is configured AND the user is signed in, writes also go to
 *   Firestore (fire-and-forget; its persistent cache queues offline writes)
 * - reads return localStorage immediately; a Firestore fetch follows and the
 *   newer copy (by updatedAt) wins and is written back to localStorage
 */

const PREFIX = 'c100:'

let uid: string | null = null
const uidListeners = new Set<(uid: string | null) => void>()

subscribeAuth((user) => {
  uid = user?.uid ?? null
  uidListeners.forEach((l) => l(uid))
})

export function currentUid(): string | null {
  return uid
}

export function onUidChange(cb: (uid: string | null) => void): () => void {
  uidListeners.add(cb)
  return () => uidListeners.delete(cb)
}

function readLocal<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function writeLocal(key: string, value: unknown) {
  localStorage.setItem(PREFIX + key, JSON.stringify(value))
}

function remotePath(key: string): [string, string] | null {
  const db = getDb()
  if (!db || !uid) return null
  // keys: "profile" | "day:N" | "measurement:N"
  if (key === 'profile') return [`users/${uid}`, 'profile']
  const [kind, n] = key.split(':')
  if (kind === 'day') return [`users/${uid}/days/${n}`, '']
  if (kind === 'measurement') return [`users/${uid}/measurements/${n}`, '']
  return null
}

async function fetchRemote<T extends { updatedAt: number }>(key: string): Promise<T | null> {
  const db = getDb()
  const path = remotePath(key)
  if (!db || !path) return null
  try {
    const snap = await getDoc(doc(db, path[0]))
    if (!snap.exists()) return null
    const data = snap.data()
    return (path[1] ? (data[path[1]] as T | undefined) : (data as T)) ?? null
  } catch {
    return null
  }
}

function pushRemote(key: string, value: { updatedAt: number }) {
  const db = getDb()
  const path = remotePath(key)
  if (!db || !path) return
  const payload = path[1] ? { [path[1]]: value } : value
  setDoc(doc(db, path[0]), payload, { merge: true }).catch(() => {
    /* offline — Firestore's persistent cache will retry */
  })
}

/** Read local copy now, then reconcile with Firestore in the background.
 *  `onFresh` fires only if the remote copy is newer than local. */
function load<T extends { updatedAt: number }>(
  key: string,
  fallback: T,
  onFresh?: (value: T) => void,
): T {
  const local = readLocal<T>(key) ?? fallback
  fetchRemote<T>(key).then((remote) => {
    if (!remote) {
      // first sign-in on a fresh Firestore: seed it with whatever exists locally
      if (local.updatedAt > 0) pushRemote(key, local)
      return
    }
    if (remote.updatedAt > local.updatedAt) {
      writeLocal(key, remote)
      onFresh?.(remote)
    } else if (local.updatedAt > remote.updatedAt) {
      pushRemote(key, local)
    }
  })
  return local
}

function save(key: string, value: { updatedAt: number }) {
  value.updatedAt = Date.now()
  writeLocal(key, value)
  pushRemote(key, value)
}

// ---- typed API ----

export const loadDay = (n: number, onFresh?: (d: DayProgress) => void): DayProgress =>
  load<DayProgress>(`day:${n}`, emptyDay(), onFresh)

export const saveDay = (n: number, d: DayProgress) => save(`day:${n}`, d)

export const loadProfile = (onFresh?: (p: Profile) => void): Profile | null => {
  const p = load<Profile>('profile', { startDate: '', updatedAt: 0 }, onFresh)
  return p.startDate ? p : null
}

export const saveProfile = (p: Profile) => save('profile', p)

export const loadMeasurement = (n: number, onFresh?: (m: Measurement) => void): Measurement | null => {
  const m = load<Measurement>(`measurement:${n}`, { day: n, date: '', updatedAt: 0 }, onFresh)
  return m.updatedAt > 0 ? m : null
}

export const saveMeasurement = (m: Measurement) => save(`measurement:${m.day}`, m)

/** Days that have any recorded progress (for streaks/dashboard) — local scan. */
export function daysWithProgress(): Map<number, DayProgress> {
  const result = new Map<number, DayProgress>()
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key?.startsWith(PREFIX + 'day:')) continue
    const n = Number(key.slice((PREFIX + 'day:').length))
    const d = readLocal<DayProgress>(`day:${n}`)
    if (d && (d.water > 0 || d.notes || Object.values(d.checks).some(Boolean))) result.set(n, d)
  }
  return result
}
