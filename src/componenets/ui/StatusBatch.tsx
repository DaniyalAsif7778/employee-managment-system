import React from 'react'

const  StatusBatch=({task={status:"done"}})=> {
    const bg = {
        overDue:`bg-red-400 h-4 w-4`,
        inProgress:`bg-yellow-400 h-4 w-4`,
        done: "bg-green-500 h-3 w-3  "

    }
  return   <div  className={task.status == "done" ? `${bg.done} rounded-2xl m-auto `:``  }> </div> 
  
}

export default StatusBatch;