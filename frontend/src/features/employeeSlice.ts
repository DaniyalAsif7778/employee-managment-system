import { createSlice } from '@reduxjs/toolkit'
// import { PayloadAction } from "@reduxjs/toolkit";

// Interface defining the structure of an employee object
export interface Employee {
  id: string
  employeeId: string // e.g., "EMP001"
  password: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone: string
  avatar?: string
  department: string
  departmentId: string
  position: string
  role: EmployeeRole
  status: EmployeeStatus
  salary?: number
  hireDate: string
  location: string
  manager?: string
  managerId?: string
  skills?: string[]
  bio?: string
  dateOfBirth?: string
  address?: Address
  emergencyContact?: EmergencyContact
  performanceRating?: number
  completionRate?: number
  tasksCompleted?: number
  totalTasks?: number
  createdAt: string
  updatedAt: string
}

// Type for employee roles
export type EmployeeRole = 'admin' | 'employee' | 'manager' | 'team-lead'

// Type for employee statuses
export type EmployeeStatus = 'active' | 'inactive' | 'on-leave' | 'terminated'

// Interface for address information
export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

// Interface for emergency contact information
export interface EmergencyContact {
  name: string
  relationship: string
  phone: string
  email?: string
}
// Type alias for an array of employee objects
export type EmployeeState = Employee[]

// Initial state for employees - empty array
const initialState: EmployeeState = []

// Create the Redux slice for managing employees state
export const employeesSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    // Placeholder reducer for adding a new employee
    addEmployee: (state, action) => {},
    // Placeholder reducer for updating an existing employee
    updateEmployee: () => {},
    // Placeholder reducer for deleting an employee
    deleteEmployee: () => {},
  },
})

// Export the action creators
export const { addEmployee, updateEmployee, deleteEmployee } = employeesSlice.actions

// Export the reducer to be used in the store
export default employeesSlice.reducer
