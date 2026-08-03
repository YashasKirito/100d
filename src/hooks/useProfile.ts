import { useCallback, useEffect, useState } from 'react'
import type { User } from 'firebase/auth'
import { firebaseEnabled, signInWithGoogle, signOut, subscribeAuth } from '../lib/firebase'
import { loadProfile, saveProfile } from '../lib/store'
import type { Profile } from '../lib/types'
import { dayNumberForDate } from '../lib/program'

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setProfile(loadProfile((fresh) => setProfile(fresh)))
    setLoaded(true)
    return subscribeAuth(setUser)
  }, [])

  // when sign-in completes, re-pull the profile so a second device syncs up
  useEffect(() => {
    if (user) setProfile((prev) => loadProfile((fresh) => setProfile(fresh)) ?? prev)
  }, [user])

  const setStartDate = useCallback((startDate: string) => {
    const p: Profile = { startDate, updatedAt: Date.now() }
    saveProfile(p)
    setProfile(p)
  }, [])

  const todayNumber = profile ? dayNumberForDate(profile.startDate) : null

  return {
    profile,
    loaded,
    todayNumber,
    setStartDate,
    user,
    firebaseEnabled,
    signIn: signInWithGoogle,
    signOut,
  }
}
