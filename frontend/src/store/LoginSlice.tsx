import { create } from 'zustand'
import type { LoginRole } from '../types.js'

type AuthState = {
  role: LoginRole | null
  sessionReady: boolean
  autoCredentials: boolean
  setAuthenticatedRole: (role: LoginRole) => void
  setAutoCredentials: (enabled: boolean) => void
  finishSessionRestore: () => void
  clearAuthentication: () => void
}

export const useLoginSlice = create<AuthState>((set) => ({
  role: null,
  sessionReady: false,
  autoCredentials: true,
  setAuthenticatedRole: (role) => set({ role, sessionReady: true }),
  setAutoCredentials: (enabled) => set({ autoCredentials: enabled }),
  finishSessionRestore: () => set({ sessionReady: true }),
  clearAuthentication: () => set({ role: null, sessionReady: true }),
}))