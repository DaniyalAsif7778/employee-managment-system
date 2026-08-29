import { create } from 'zustand'
  
import type { Admin } from '../types/singupTypes.js'

type Action = {
  setAdminFormData: (data: Admin) => void
}

export const useAdminSlice = create<Admin >(( ) => ({
fullName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: ''
}))
  
export const setAdminFormData = (data:Admin) => useAdminSlice.setState((state) => ({ ...state, ...data }))
