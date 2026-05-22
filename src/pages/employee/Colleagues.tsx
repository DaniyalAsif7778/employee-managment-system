
import React, { useState } from "react";
import { AssignTask, Button, ColleagueInfo, Input, RecentHiers} from "../../import.js";

const Colleagues = () => {
  const [selectedField, setSelectedField] = useState("all")

  return (
    <div className="w-full p-6 ">
      <h1 className="text-text-primary font-bold text-3xl">Colleagues Directory</h1>
      <p className="text-text-disabled text-md">Connect with your team members</p>

      {/* Filter Bar */}
      <div className="w-full bg-surface border rounded-xl h-16 mt-8 flex items-center gap-3 px-4">
        <Input placeholder="Search Colleagues..."  className="h-10 rounded-lg bg-navbar text-text-primary px-3 w-full" />
        <div className="flex items-center gap-3 flex-wrap">

          <Input
            
            type="select"
            name="colleagueFilter"
            value={selectedField}
            onchange={(e) => setSelectedField(e.target.value)}
            className="h-10 rounded-lg bg-navbar text-text-primary px-3 "
            options={[
              { value: "all-departments", label: "All Departments" },
              { value: "hr", label: "HR" },
              { value: "finance", label: "Finance" },
              { value: "marketing", label: "Marketing" },
              { value: "it", label: "IT" },
              { value: "consulting", label: "Consulting" },
            ]}
          />
          
        </div>
      </div>
      {/* Colleagues Info Card */}
      <div className="grid md:grid-cols-3 gap-6 pt-6">
        <ColleagueInfo />
        <ColleagueInfo />
        <ColleagueInfo />
       
      </div>

      
    </div>
  );
};

export default Colleagues;
