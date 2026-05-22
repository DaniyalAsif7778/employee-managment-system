import {Filter}  from "lucide-react";
import React from "react";
import { AssignTask, Button, RecentHiers, RecentTasks } from "../../import.js";

const Tasks = () => {
  return (
    <div className="w-full p-6 ">
      <h1 className="text-text-primary font-bold text-3xl">My Tasks</h1>
      <p className="text-text-disabled text-md">Manage your assigned tasks</p>
       {/*Filter Bar */}

      <div className="w-full bg-surface border rounded-xl h-16 mt-8 flex items-center gap-3">
        <div><Filter className="w-4 h-4 ml-5 text-text-disabled" /></div>
        <div className="flex items-center gap-3" >
          <Button text='All' className="text-md text-text-primary w-12 h-10 bg-primary rounded-lg"/>
          <Button text='In Progress' className="text-md w-30 h-10 bg-navbar text-text-secondary rounded-lg hover:text-text-primary "/>
          <Button text='Pending' className="text-md w-25 h-10 bg-navbar text-text-secondary rounded-lg hover:text-text-primary"/>
          <Button text='Done' className="text-md w-20 h-10 bg-navbar text-text-secondary rounded-lg hover:text-text-primary"/>
        </div>
        
      </div>
      <div className="grid md:grid-cols-2 gap-6 pt-6">
       <AssignTask />
       <AssignTask />
       <AssignTask />
       <AssignTask />
      </div>

      
    </div>
  );
};

export default Tasks;
