import { configureStore } from '@reduxjs/toolkit'

import currentUserReducer from '../features/currentUser.js'

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
