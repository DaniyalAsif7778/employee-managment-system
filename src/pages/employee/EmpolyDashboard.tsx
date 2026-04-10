import React from 'react'
import { DashBordHeader,   TaskListInfo, TasksList } from '../../import.js'
const EmpolyDashboard=()=> {
  
  return (
    <div >
        <div className='w-full h-full  p-2'>
          <DashBordHeader   />
          <TaskListInfo />
          <TasksList />
         
        </div>

        </div>

      )
  
}

export default   EmpolyDashboard