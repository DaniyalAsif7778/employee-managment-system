import React from "react";
import { Navigate } from "react-router";
import { NavLink } from "react-router";
 const   AdminEmployees=()=> {
  return (
    <div className="p-4 text-text-primary ">
      AdminEmployees page
      <NavLink to="/DashBoard/EmployeeSchedule">emp</NavLink>
    </div>
  );
}
export default  AdminEmployees