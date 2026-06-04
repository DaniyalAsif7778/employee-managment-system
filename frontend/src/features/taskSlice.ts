import { createSlice } from "@reduxjs/toolkit";
// import { PayloadAction } from "@reduxjs/toolkit";

// Initial state for tasks - empty object
const initialState = {};

// Create the Redux slice for managing tasks state
export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Placeholder reducer for adding a new task
    addTask: () => {},
    // Placeholder reducer for deleting a task
    deleteTask: () => {},
   },
});

// Export the action creators
export const { deleteTask, addTask } = tasksSlice.actions;

// Export the reducer to be used in the store
export default tasksSlice.reducer;
