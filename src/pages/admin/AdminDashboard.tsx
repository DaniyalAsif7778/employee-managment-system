import React from "react";
import { StatCard, RecentTasks, RecentHiers,DashBordHeader } from "../../import.js";
import { Link } from "react-router";
import {
   Users,
   CheckSquare,
   TrendingUp,
   Building2,
   MoreVertical,
   Plus,
   MessageSquare,
} from "lucide-react";

const AdminDashboard = () => {
   const stats = [
      {
         title: "Total Employees",
         value: 247,
         icon: Users,
         iconColor: "#009F8E",
         iconBg: "#009F8E1A",
         trend: { value: "+12% from last month", isPositive: true },
      },
      {
         title: "Active Tasks",
         value: 38,
         icon: CheckSquare,
         iconColor: "#12C4D3",
         iconBg: "#12C4D31A",
         trend: { value: "+5% from last week", isPositive: true },
      },
      {
         title: "Completion Rate",
         value: 94,
         icon: TrendingUp,
         iconColor: "#00BF6B",
         iconBg: "#00BF6B1A",
         trend: { value: "+2% from last month", isPositive: true },
      },
      {
         title: "Departments",
         value: 8,
         icon: Building2,
         iconColor: "#FFC107",
         iconBg: "#FFC1071A",
      },
   ];
   const recentHires = [
      {
         id: 1,
         name: "Alex Martinez",
         role: "Software Engineer",
         department: "Engineering",
         date: "Mar 28, 2026",
      },
      {
         id: 2,
         name: "Jessica Wong",
         role: "Product Designer",
         department: "Design",
         date: "Mar 25, 2026",
      },
      {
         id: 3,
         name: "Ryan Cooper",
         role: "Data Analyst",
         department: "Analytics",
         date: "Mar 22, 2026",
      },
   ];
   return (
      <div className="w-full   p-4 ">
         <section className="w-full  ">
            <h1 className="text-text-primary font-bold text-4xl  mb-1 ">Dashboard</h1>
            <p className="text-text-disabled text-base  ml-1 mb-4 ">
               Welcome back! Here's what's happening today.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
               {stats.map((stat, index) => (
                  <StatCard
                     key={index}
                     title={stat.title}
                     value={stat.value}
                     icon={stat.icon}
                     iconBg={stat.iconBg}
                     iconColor={stat.iconColor}
                  />
               ))}
            </div>
         </section>
         <section className="w-full flex flex-col md:flex-row  gap-4">
            <RecentTasks />
              <RecentHiers />
         </section>
       
         <section>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
               <Link to="/admin/employees" className="p-6 bg-[#121212] border border-[#333333] rounded-xl hover:border-[#009F8E] transition-all duration-200 text-left group">
                  <div className="w-12 h-12 rounded-xl bg-[#009F8E1A] flex items-center justify-center mb-4 group-hover:bg-[#009F8E] transition-colors">
                     <Plus className="w-5 h-5 text-[#009F8E] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-[16px] font-semibold text-[#E0E0E0] mb-1">Add Employee</h3>
                  <p className="text-[14px] text-[#9CA3AF]">Onboard new team members</p>
               </Link>
               <Link to="/admin/messages" className="p-6 bg-[#121212] border border-[#333333] rounded-xl hover:border-[#12C4D3] transition-all duration-200 text-left group">
                  <div className="w-12 h-12 rounded-xl bg-[#12C4D31A] flex items-center justify-center mb-4 group-hover:bg-[#12C4D3] transition-colors">
                     <MessageSquare className="w-5 h-5 text-[#12C4D3] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-[16px] font-semibold text-[#E0E0E0] mb-1">View Messages</h3>
                  <p className="text-[14px] text-[#9CA3AF]">Check team communications</p>
               </Link>
               <Link to="/admin/reports" className="p-6 bg-[#121212] border border-[#333333] rounded-xl hover:border-[#FFC107] transition-all duration-200 text-left group">
                  <div className="w-12 h-12 rounded-xl bg-[#FFC1071A] flex items-center justify-center mb-4 group-hover:bg-[#FFC107] transition-colors">
                     <Building2 className="w-5 h-5 text-[#FFC107] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-[16px] font-semibold text-[#E0E0E0] mb-1">View Reports</h3>
                  <p className="text-[14px] text-[#9CA3AF]">Analyze department performance</p>
               </Link>
            </div>
         </section>
         <DashBordHeader/>
      </div>
   );
};

export default AdminDashboard;
