 
import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

// Base interface for user information
export  interface user {
    id: number,
    name: string,
    role: "admin" | "employee",
    email: string,
    department: string,
    loginStatus: boolean,

}

// Interface for admin user, extending base user
export interface Admin extends user {
    role: "admin",
    adminId: string
}
// Interface for employee user, extending base user
export interface Employee extends user {
    role: "employee",
    employerId: string
}
// Interface for the initial state of current user
export interface initialInterface   {
    user:Admin | Employee |  null;
}
 

console.log();

// Initial state - no user logged in
let initialState:initialInterface = {
     user:null
};

// Create the Redux slice for managing the current user state
const currentUserSlice = createSlice(
    {
        name: "currentUser",
        initialState,
        reducers: {
            // Reducer to set the current logged-in user
            setCurrentUser: (state, action: PayloadAction<Admin | Employee>) => {
                 
                    
                     state.user = action.payload; 
                  
            
            }

        }
    }
)

// Export the action creator
export const { setCurrentUser } = currentUserSlice.actions;

// Export the reducer to be used in the store
export default currentUserSlice.reducer;