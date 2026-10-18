import { create } from 'zustand'

interface RoleLoginState {
  role: string
  setActiveRoleInLogin: (role: string) => void
}

export const useContentByRoleInLogin = create<RoleLoginState>((set) => ({
  // Initial state
  role: 'admin',

  setActiveRoleInLogin: (newRole: string) => set(() => ({ role: newRole })),
}))
