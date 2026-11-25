import { create } from 'zustand'
import type { UserRole } from '../types.js'

interface RoleLoginState {
  role: UserRole
  setActiveRoleInLogin: (role: UserRole) => void
}

export const useContentByRoleInLogin = create<RoleLoginState>((set) => ({
  role: 'admins',

  setActiveRoleInLogin: (role) => set({ role }),
}))
