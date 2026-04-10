import { useState } from "react";
 

 const  EmployeesList=() =>{
 
  
  return (
    <div className="w-full bg-surface p-6 rounded-xl shadow-md text-text-primary">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
        Employee Summary
      </h2>

      {/* Header Row */}
      <div className="grid grid-cols-6 gap-4 py-3 px-4 bg-navbar text-gray-500 rounded-md border mb-2">
        <span className="font-medium">Employee</span>
        <span className="text-center">
          <span className="block md:hidden">N</span>
          <span className="hidden md:block">New</span>
        </span>
        <span className="text-center">
          <span className="block md:hidden">A</span>
          <span className="hidden md:block">Active</span>
        </span>
        <span className="text-center">
          <span className="block md:hidden">C</span>
          <span className="hidden md:block">Completed</span>
        </span>
        <span className="text-center">
          <span className="block md:hidden">F</span>
          <span className="hidden md:block">Failed</span>
        </span>
        <span className="text-center">
          <span className="block md:hidden">T</span>
          <span className="hidden md:block">Tasks</span>
        </span>
      </div>

      {/* Employee Rows */}
      <div className="flex flex-col gap-3">
    
         
            <div className="border rounded-md overflow-hidden">
              <div className="grid grid-cols-6 gap-4 p-4 bg-navbar hover:shadow transition-all">
                <div className="font-semibold"> </div>
                <div className="text-center"> </div>
                <div className="text-center">  </div>
                <div className="text-center"> </div>
                <div className="text-center"> </div>
                <div className="text-center">
                  <button
                     className="px-3 py-1 bg-primary hover:bg-primary-hover text-text-disabled rounded-md text-xs"
                    type="button"
                  >
                    {/* {isOpen ? "Hide Tasks" : "Show Tasks"} */}
                  </button>
                </div>
              </div>

            
                <div className="bg-surface p-4 flex flex-col gap-3">
                
                
                 
                      
                        <div  className="border bg-navbar rounded-md p-3 shadow-sm">
                          <div className="flex justify-between text-sm text-text-secondary">
                            <span>
                              {/* {task.taskStatus === "null" ? "New Task" : task.taskStatus} */}
                            </span>
                            <span className="text-xs md:text-sm"> </span>
                          </div>
                          <h3 className="font-semibold mt-1 text-base md:text-lg  wrap-break-word">
                            {/* {task.title} */}
                          </h3>
                          <p className="mt-1 text-text-secondary text-sm md:text-base  wrap-break-word">
                            {/* {isDescOpen */}
                              // ? task.description
                              {/* // : `${task.description.slice(0, 100)}...`} */}
                          </p>
                          {/* {task.description.length > 100 && ( */}
                            <button
                             
                              className=" text-text-primary text-xs mt-1"
                              type="button"
                            >
                              {/* {isDescOpen ? "Show Less" : "More"} */}
                            </button>
                          {/* )} */}
                          <div className="mt-2 text-right">
                            <button
                             
                              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-xs"
                              type="button"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      
                    
                
                    <p className="text-gray-500 italic text-center">No tasks available</p>
                   
                </div>
            
            </div>
        
      </div>
    </div>
  );
}

export default EmployeesList;
