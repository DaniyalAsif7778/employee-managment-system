import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'

export interface user {
  id: number
  name: string
  role: 'admin' | 'employee'
  email: string
  department: string
  loginStatus: boolean
}

export interface Admin extends user {
  role: 'admin'
  adminId: string
}

export interface Employee extends user {
  role: 'employee'
  employerId: string
}

export interface initialInterface {
  user: Admin | Employee | null
}

const initialState: initialInterface = {
  user: null,
}

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<Admin | Employee | null>) => {
      state.user = action.payload
    },
  },
})

export const { setCurrentUser } = currentUserSlice.actions
export default currentUserSlice.reducer
