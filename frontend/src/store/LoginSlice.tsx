import { create } from 'zustand'
import type { LoginRole } from '../types.js'

type AuthState = {
  role: LoginRole | null
  userId: string | null
  sessionReady: boolean
  autoCredentials: boolean
  setAuthenticatedUser: (role: LoginRole, userId: string) => void
  setAutoCredentials: (enabled: boolean) => void
  finishSessionRestore: () => void
  clearAuthentication: () => void
}

export const useLoginSlice = create<AuthState>((set) => ({
  role: null,
  userId: null,
  sessionReady: false,
  autoCredentials: true,
  setAuthenticatedUser: (role, userId) => set({ role, userId, sessionReady: true }),
  setAutoCredentials: (enabled) => set({ autoCredentials: enabled }),
  finishSessionRestore: () => set({ sessionReady: true }),
  clearAuthentication: () => set({ role: null, userId: null, sessionReady: true }),
}))
