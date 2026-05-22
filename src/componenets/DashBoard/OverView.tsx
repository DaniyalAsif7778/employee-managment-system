import React from "react";
import AdminDashbord from "../../pages/admin/AdminDashboard.js";
import EmpolyDashBoard from "../../pages/employee/EmpolyDashboard.js";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store.js";
import { useNavigate } from "react-router";
import {Users} from 'lucide-react'

const OverView = () => {
  const navigate = useNavigate()
  const currentUser = useSelector((state: RootState) => state.currentUser);

  return (
    <>
      <div className="min-h-screen bg-bg flex flex-col items-center">
         <div className="text-3xl md:text-6xl mt-7">👤</div>
        <h3 className="text-text-primary font-bold text-3xl mt-3">Employee Management System</h3>
        <p className="mt-3">A modern platform for managing your workforce, tasks, and performance metrics</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mt-8">
          <DashboardCard
            title="Admin Dashboard"
            description="Manage employees, departments, reports, and tasks"
            icon="⚙️"
            onClick={() => navigate("/Dashboard/admin")}
            btntext="Access Admin Dashboard"
          />
        
        
          <DashboardCard
            title="Employee Dashboard"
            description="View tasks, announcements, schedule, and leave requests"
            icon="👤"
            onClick={() => navigate("/Dashboard/employee")}
            btntext="Access Employ Dashboard"
          />
        </div>
      </div>
    </>
  );}

  const DashboardCard = ({title,description,icon,onClick,btntext})=>(
    <div
    onClick={onClick}
    className="bg-surface border border-border rounded-xl p-6 cursor-pointer hover:bg-navbar transition-colors duration-300 shadow-md"
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h2 className="text-xl font-semibold text-text-primary mb-2">{title}</h2>
    <p className="text-text-secondary">{description}</p>
    <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90">
      {btntext}
    </button>
  </div>

  )

export default OverView;
