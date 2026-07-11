import { configureStore } from '@reduxjs/toolkit'

// Import all reducers from the features
import currentUserReducer from '../features/currentUser.js'
import menueReducer from '../features/menueSlice.js'
import adminsReducer from '../features/adminSlice.js'
import employeesReducer from '../features/employeeSlice.js'
import tasksReducer from '../features/taskSlice.js'
import authReducer from '../features/authSlice.js'

// Configure the Redux store with all reducers
export const store = configureStore({
  reducer: {
    admins: adminsReducer,
    employees: employeesReducer,
    tasks: tasksReducer,
    auth: authReducer,
    currentUser: currentUserReducer,
    menue: menueReducer,
  },
})

// Type for the root state of the store
export type RootState = ReturnType<typeof store.getState>
// Type for the app dispatch function
export type AppDispatch = typeof store.dispatch
