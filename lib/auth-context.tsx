"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth"
import { doc, setDoc, getDoc, onSnapshot, serverTimestamp } from "firebase/firestore"
import { auth, db, isFirebaseConfigured } from "@/lib/firebase"
import { phoneToEmail, normalizePhone } from "@/lib/phone"

type AppUser = {
  uid: string
  phone: string
  name: string
}

type AuthContextType = {
  user: AppUser | null
  loading: boolean
  configured: boolean
  kickedOut: boolean
  signUp: (phone: string, name: string, password: string) => Promise<void>
  signIn: (phone: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  clearKickedOut: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

// Tengeneza kitambulisho cha kipekee kwa kila kifaa/kikao
function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [kickedOut, setKickedOut] = useState(false)
  const sessionIdRef = useRef<string | null>(null)
  const unsubSessionRef = useRef<(() => void) | null>(null)

  const cleanupSessionListener = useCallback(() => {
    if (unsubSessionRef.current) {
      unsubSessionRef.current()
      unsubSessionRef.current = null
    }
  }, [])

  // Sikiliza mabadiliko ya sessionId kwa wakati halisi (kudhibiti kifaa kimoja)
  const watchSession = useCallback(
    (uid: string, mySessionId: string) => {
      cleanupSessionListener()
      const ref = doc(db, "users", uid)
      unsubSessionRef.current = onSnapshot(ref, (snap) => {
        const data = snap.data()
        if (!data) return
        // Kama sessionId kwenye database imebadilika, kifaa kingine kimeingia
        if (data.activeSessionId && data.activeSessionId !== mySessionId) {
          setKickedOut(true)
          cleanupSessionListener()
          fbSignOut(auth)
        }
      })
    },
    [cleanupSessionListener],
  )

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false)
      return
    }

    const unsub = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        const ref = doc(db, "users", fbUser.uid)
        const snap = await getDoc(ref)
        const data = snap.data()
        setUser({
          uid: fbUser.uid,
          phone: data?.phone ?? "",
          name: data?.name ?? "",
        })
        // Anzisha usikilizaji wa kikao kama tunacho sessionId
        if (sessionIdRef.current) {
          watchSession(fbUser.uid, sessionIdRef.current)
        }
      } else {
        setUser(null)
        cleanupSessionListener()
      }
      setLoading(false)
    })

    return () => {
      unsub()
      cleanupSessionListener()
    }
  }, [watchSession, cleanupSessionListener])

  const claimSession = useCallback(
    async (uid: string) => {
      const sessionId = generateSessionId()
      sessionIdRef.current = sessionId
      // Andika sessionId mpya - hii inafukuza vifaa vingine
      await setDoc(
        doc(db, "users", uid),
        { activeSessionId: sessionId, lastLogin: serverTimestamp() },
        { merge: true },
      )
      watchSession(uid, sessionId)
    },
    [watchSession],
  )

  const signUp = useCallback(
    async (phone: string, name: string, password: string) => {
      setKickedOut(false)
      const email = phoneToEmail(phone)
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, "users", cred.user.uid), {
        phone: normalizePhone(phone),
        name,
        createdAt: serverTimestamp(),
      })
      await claimSession(cred.user.uid)
    },
    [claimSession],
  )

  const signIn = useCallback(
    async (phone: string, password: string) => {
      setKickedOut(false)
      const email = phoneToEmail(phone)
      const cred = await signInWithEmailAndPassword(auth, email, password)
      await claimSession(cred.user.uid)
    },
    [claimSession],
  )

  const signOut = useCallback(async () => {
    cleanupSessionListener()
    sessionIdRef.current = null
    await fbSignOut(auth)
  }, [cleanupSessionListener])

  const clearKickedOut = useCallback(() => setKickedOut(false), [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        configured: isFirebaseConfigured,
        kickedOut,
        signUp,
        signIn,
        signOut,
        clearKickedOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
