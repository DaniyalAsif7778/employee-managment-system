import { createSlice } from "@reduxjs/toolkit";

// Initial state for menu/drawer visibility - both drawers closed by default
const initialState={
     dashBoardDrawer:false,
     headerDrawer:false,
   

}

// Create the Redux slice for managing menu/drawer states
const menueSlice = createSlice({
    name:"menueSlice",
    initialState,
    reducers:{

        // Reducer to set the dashboard drawer open/close status
        setDashBoardStatus:(state,action)=>{
           state.dashBoardDrawer = action.payload
        },
        // Reducer to set the header drawer open/close status
        setHeaderDrawwer:(
            state,action
        )=>{
            state.headerDrawer = action.payload
        },
        
    }
})


// Export the action creators
 export const {setDashBoardStatus,setHeaderDrawwer} = menueSlice.actions;
// Export the reducer to be used in the store
 export default menueSlice.reducer;