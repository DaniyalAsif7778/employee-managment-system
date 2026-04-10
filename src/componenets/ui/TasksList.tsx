import React from "react";

import { CompletedButton, FailedButton, WorkingButtons } from "../../import.js";
import { toast } from "react-hot-toast";

 const  TasksList=()=> {


  return (
    <div className="Tasks w-full h-125 p-4 mt-10 rounded-lg border pointer-events-auto border-border bg-surface overflow-scroll ">


      {/* Header */}
      <div className="flex flex-row justify-between items-center px-4 py-2">
        <span className="bg-primary text-white text-sm font-medium px-2 py-1 rounded">
          High
        </span>
        <h2 className="text-sm text-text-secondary"> </h2>
      </div>

      {/* Content */}
      <div className="flex flex-col items-start justify-center p-4 pb-16">
        <h4 className="text-xl text-text-primary font-semibold">
         
        </h4>
        <p className="text-sm text-text-secondary text-[20px] mt-1">
          
        </p>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <CompletedButton />
        <FailedButton />
        <WorkingButtons />
      </div>
    </div>
      
    
  )
}

export default TasksList;
