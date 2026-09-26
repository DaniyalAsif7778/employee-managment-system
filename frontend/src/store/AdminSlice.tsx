import { create } from 'zustand'
  
import type { Admin,AdminFile} from '../types/singupTypes.js'
 type AdminState = Admin & AdminFile;
 export const useAdminSlice = create<AdminState>(( ) => ({
fullName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  avatar: null,
}))
  
export const setAdminFormData = (data:Admin) => useAdminSlice.setState((state:Admin) => ({ ...state, ...data }))
