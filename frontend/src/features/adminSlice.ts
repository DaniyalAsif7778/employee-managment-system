import { createSlice } from "@reduxjs/toolkit";

// Interface defining the structure of an admin/employee object
export interface admin {
  id: string;
  password:string;
  employerId: string; // e.g., "EMP001"
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  department: string;
  departmentId: string;
  position: string;
  role: EmployeeRole;
  status: EmployeeStatus;
  salary?: number;
  hireDate: string;
  location: string;
  manager?: string;
  managerId?: string;
  skills?: string[];
  bio?: string;
  dateOfBirth?: string;
  address?: Address;
  emergencyContact?: EmergencyContact;
  performanceRating?: number;
  completionRate?: number;
  tasksCompleted?: number;
  totalTasks?: number;
  createdAt: string;
  updatedAt: string;
}

// Type for employee roles
export type EmployeeRole = "admin" | "employee" | "manager" | "team-lead";

// Type for employee statuses
export type EmployeeStatus = "active" | "inactive" | "on-leave" | "terminated";

// Interface for address information
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Interface for emergency contact information
export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

// Type alias for an array of admin objects
export type Admin = admin[]

// Initial state for the admins slice - starts as an empty array
const initialState: Admin = [];

// Create the Redux slice for managing admin state
const adminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    // Placeholder reducer for adding a new admin
    addAdmin: () => {},
    // Placeholder reducer for updating an existing admin
    updateAdmin: () => {},
    // Placeholder reducer for deleting an admin
    deleteAdmin: () => {},
  },
});

// Export the action creators
export const { addAdmin, updateAdmin, deleteAdmin } = adminsSlice.actions;

// Export the reducer to be used in the store
export default adminsSlice.reducer;
