import { createSlice } from '@reduxjs/toolkit'
// import { PayloadAction } from "@reduxjs/toolkit";

// Interface defining the authentication status
export interface status {
  login: boolean
}

// Initial state for authentication - user is logged in by default for UI focus
const initialState: status = {
  login: true,
}

// Create the Redux slice for managing authentication state
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Placeholder reducer for logging in a user
    Login: () => {},
    // Placeholder reducer for logging out a user
    Logout: () => {},
  },
})

// Export the action creators
export const { Logout, Login } = authSlice.actions

// Export the reducer to be used in the store
export default authSlice.reducer
