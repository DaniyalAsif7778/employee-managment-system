import { create } from 'zustand'
import type { LoginRole } from '../types.js'

type AuthState = {
  role: LoginRole | null
  userId: string | null
  sessionReady: boolean
  setAuthenticatedUser: (role: LoginRole, userId: string) => void
  setRolePreview: (role: LoginRole, userId: string) => void
  finishSessionRestore: () => void
  clearAuthentication: () => void
}

const previewStorageKey = 'ems-role-preview'

function clearStoredPreview() {
  if (!import.meta.env.DEV || typeof window === 'undefined') return
  try {
    window.sessionStorage.removeItem(previewStorageKey)
  } catch {
    // The in-memory preview still works when browser storage is unavailable.
  }
}

function readRolePreview(): { role: LoginRole; userId: string } | null {
  if (!import.meta.env.DEV || typeof window === 'undefined') return null
  try {
    const stored = window.sessionStorage.getItem(previewStorageKey)
    if (!stored) return null
    const parsed: unknown = JSON.parse(stored)
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !('role' in parsed) ||
      !('userId' in parsed)
    )
      return null
    const role = parsed.role
    const userId = parsed.userId
    if (
      typeof role !== 'string' ||
      !['admins', 'employees', 'managers', 'hrs'].includes(role) ||
      typeof userId !== 'string'
    )
      return null
    return { role: role as LoginRole, userId }
  } catch {
    clearStoredPreview()
    return null
  }
}

const initialPreview = readRolePreview()

export const useLoginSlice = create<AuthState>((set) => ({
  role: initialPreview?.role ?? null,
  userId: initialPreview?.userId ?? null,
  sessionReady: Boolean(initialPreview),
  setAuthenticatedUser: (role, userId) => {
    clearStoredPreview()
    set({ role, userId, sessionReady: true })
  },
  setRolePreview: (role, userId) => {
    if (import.meta.env.DEV && typeof window !== 'undefined') {
      try {
        window.sessionStorage.setItem(previewStorageKey, JSON.stringify({ role, userId }))
      } catch {
        // Keep the preview session in memory if browser storage is unavailable.
      }
    }
    set({ role, userId, sessionReady: true })
  },
  finishSessionRestore: () => set({ sessionReady: true }),
  clearAuthentication: () => {
    clearStoredPreview()
    set({ role: null, userId: null, sessionReady: true })
  },
}))
