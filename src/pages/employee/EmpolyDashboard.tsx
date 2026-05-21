import React from "react";
import { DashBordHeader, Input, TaskCard } from "../../import.js";
import { StatCard, RecentTasks, RecentHiers } from "../../import.js";
import { Users, CheckSquare, TrendingUp, Calendar, Clock } from "lucide-react";
import { Button } from "../../import.js";

const EmpolyDashboard = () => {

  const TaskInfo = [
    {
      title: "My Active Tasks",
      value: 38,
      icon: CheckSquare,
      iconColor: "#12C4D3",
      iconBg: "#12C4D31A",
      trend: { value: "+5% from last week", isPositive: true },
    },
    {
      title: "Due Today",
      value: 247,
      icon: Clock,
      iconColor: "#9f8700",
      iconBg: "#009F8E1A",
      trend: { value: "+12% from last month", isPositive: true },
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
      title: "Upcoming Meetings",
      value: 8,
      icon: Calendar,
      iconColor: "#1307ff",
      iconBg: "#FFC1071A",
    },
  ];
  return (
    <>
      <div className="w-full p-6">
        

        <h1 className="text-text-primary font-bold text-3xl">
          {" "}
          Welcome back, John
        </h1>
        <p className="text-text-disabled">Here's what's on your plate today.</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-8">
          {TaskInfo.map((stat, index) => (
            <TaskCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              iconBg={stat.iconBg}
              iconColor={stat.iconColor}
            />
          ))}
        </div>
        {/* Task Detail of employ*/}
        <div className="grid md:grid-cols-12 gap-8">
          <div className="bg-surface border rounded-md mt-6 md:col-span-8">
            <div className="flex items-center p-4 justify-between ">
              <h1 className="text-text-primary font-bold text-[16px] ">
                {" "}
                My Tasks
              </h1>
              <p className="text-[#009F8E]">View All</p>
            </div>

            <div className="border"></div>

            <div className="flex items-center justify-between p-4 hover:bg-white/10 md:gap-50">
              <div>
                <h1 className="text-text-primary  text-[16px] ">
                  Review Project Proposal
                </h1>
                <div className="flex gap-3 mt-2">
                  <button className="rounded-full px-2 text-[#EF4444] bg-[#E444]">
                    High
                  </button>
                  <span className="text-[#6B7280]">Due: 2026-03-29</span>
                </div>
              </div>
              <div className="rounded-full px-2 text-[#12C4D3] bg-[#1F1F1F]">
                In progress
              </div>
            </div>
            <div className="border"></div>
            <div className="flex items-center justify-between p-4 hover:bg-white/10 md:gap-50">
              <div>
                <h1 className="text-text-primary  text-[16px] ">
                  Review Project Proposal
                </h1>
                <div className="flex gap-3 mt-2">
                  <button className="rounded-full px-2 text-[#EF4444] bg-[#E444]">
                    High
                  </button>
                  <span className="text-[#6B7280]">Due: 2026-03-29</span>
                </div>
              </div>
              <div className="rounded-full px-2 text-[#12C4D3] bg-[#1F1F1F]">
                In progress
              </div>
            </div>
          </div>

          <div className="bg-surface border rounded-md mt-6 md:col-span-4">
            <h1 className="text-text-primary font-bold text-[16px] my-5 mx-5">
              Today's Schedule
            </h1>
            <div className="border"></div>

            <div className="flex justify-between rounded-md  py-4 px-15 mx-9 my-6 hover:bg-white/10 md:w-fit md:gap-2">
              <div className="w-12 h-12 rounded-xl bg-[#12C4D31A]  ">
                <Calendar className="w-5 h-5 text-[#12C4D3] ml-3 mt-3 max-w-full" />
              </div>

              <div className="">
                <h1 className="text-text-primary text-[16px] ">Project Reveiw</h1>
                <span className="text-[#6B7280]">12:00 AM</span>
              </div>
            </div>
            <div className="flex justify-between rounded-md  py-4 px-15 mx-9 my-6 hover:bg-white/10  md:w-fit md:gap-2">
              <div className="w-12 h-12 rounded-xl bg-[#12C4D31A]  ">
                <Calendar className="w-5 h-5 text-[#12C4D3] ml-3 mt-3 max-w-full" />
              </div>

              <div className="">
                <h1 className="text-text-primary text-[16px] ">Team Standup</h1>
                <span className="text-[#6B7280]">09:00 AM</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-8">
          {TaskInfo.map((stat, index) => (
            <TaskCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              iconBg={stat.iconBg}
              iconColor={stat.iconColor}

            />
          ))}
        </div>
      </div>
    </>
  );
};

export default EmpolyDashboard;
