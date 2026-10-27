import { create } from 'zustand'

import type { Admin   } from '../types/singupTypes.js'
type AdminState = Admin  
export const useAdminSlice = create<AdminState>(() => ({
  fullName: '',
  email: '',

  password: '',
  confirmPassword: '',
 })) 

export const setAdminFormData = (data: Admin) =>
  useAdminSlice.setState((state: Admin) => ({ ...state, ...data }))
