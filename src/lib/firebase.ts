import { initializeApp, type FirebaseApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged,
  type Auth,
  type User,
} from 'firebase/auth'
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  type Firestore,
} from 'firebase/firestore'

const env = import.meta.env

const config = {
  apiKey: env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: env.VITE_FIREBASE_APP_ID as string | undefined,
}

/** True when a Firebase web config is present. Without it the app runs in localStorage-only mode. */
export const firebaseEnabled = Boolean(config.apiKey && config.projectId && config.appId)

let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null

function ensureInit() {
  if (!firebaseEnabled || app) return
  app = initializeApp(config as Record<string, string>)
  auth = getAuth(app)
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
  })
}

export function getDb(): Firestore | null {
  ensureInit()
  return db
}

export function subscribeAuth(cb: (user: User | null) => void): () => void {
  ensureInit()
  if (!auth) {
    cb(null)
    return () => {}
  }
  return onAuthStateChanged(auth, cb)
}

export async function signInWithGoogle(): Promise<void> {
  ensureInit()
  if (!auth) return
  await signInWithPopup(auth, new GoogleAuthProvider())
}

export async function signOut(): Promise<void> {
  if (!auth) return
  await fbSignOut(auth)
}
