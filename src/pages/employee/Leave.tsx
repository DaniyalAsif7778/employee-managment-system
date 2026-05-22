import React from "react";
import { DashBordHeader, Input, StatusBatch, TaskCard } from "../../import.js";
import { StatCard, RecentTasks, RecentHiers } from "../../import.js";
import {
  Users,
  CheckSquare,
  TrendingUp,
  Calendar,
  Clock,
  EllipsisVertical,
} from "lucide-react";
import { Button } from "../../import.js";

const Leave = () => {
  const LeaveInfo = [
    {
      title: "Total Leave Days",
      value: 20,
      icon: Calendar,
      iconColor: "#12C4D3",
      iconBg: "#12C4D31A",
    },
    {
      title: "Used Days",
      value: 7,
      icon: Calendar,
      iconColor: "#12C4D3",
      iconBg: "#12C4D31A",
    },

    {
      title: "Remaining Days",
      value: 12,
      icon: Calendar,
      iconColor: "#12C4D3",
      iconBg: "#12C4D31A",
    },
  ];
  return (
    <>
      <div className="w-full p-6">
        <div className="flex justify-between">
          <div>
            {" "}
            <h1 className="text-text-primary font-bold text-3xl">
              {" "}
              Leave Management
            </h1>
            <p className="text-text-disabled">
              Request and track your time off
            </p>
          </div>
          <div className="mt-3">
            <Button
              text="+  Request Leave"
              className={"bg-primary px-3 py-1.5 rounded-md"}
              type={"button"}
              disabled={false}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-8">
          {LeaveInfo.map((stat, index) => (
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
        {/* Leave History of  employ*/}
        <div className="grid md:grid-cols-12 gap-8">
          <div className="bg-surface border rounded-lg mt-6 md:col-span-8">
            <div className="flex items-center p-4 justify-between ">
              <h1 className="text-text-primary font-bold text-[16px] ">
                {" "}
                My Leave History
              </h1>
            </div>

            <div className="border-b "></div>

            <div className="flex items-center justify-between  md:gap-50">
              <div>
                <table className="w-full  table-fixed border-b text-center ">
                  <thead className="border-b border-text-disabled">
                    <tr className=" hover:bg-white/10">
                      <th className="  py-4 px-6 text-text-disabled  font-secondary">
                        Leave Type
                      </th>

                      <th className="  py-4 px-6 text-text-disabled">
                        START DATE
                      </th>
                      <th className="  py-4 px-6 text-text-disabled">
                        END DATE
                      </th>
                      <th className="  py-4 px-6 text-text-disabled">DAYS</th>
                      <th className="  py-4 px-6 text-text-disabled">
                        {" "}
                        STATUS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t hover:bg-[#1F1F1F] transition-colors  border-text-disabled">
                      <td className="  truncate py-4 px-6 ">Vacation</td>
                      <td className="truncate  py-4 px-6 ">2026-02-15</td>
                      <td className=" truncate  py-4 px-6 ">2026-02-15</td>
                      <td className=" truncate  py-4 px-6 ">13 Days</td>
                      <td className="  truncate py-4 px-6 ">
                        <button className="rounded-full px-2 text-[#00BF6B] bg-[#76f2]">
                          Done
                        </button>
                      </td>
                    </tr>
                    <tr className="border-t hover:bg-[#1F1F1F] transition-colors border-text-disabled">
                      <td className="  truncate py-4 px-6 ">Vacation</td>
                      <td className="truncate  py-4 px-6 ">2026-02-15</td>
                      <td className=" truncate  py-4 px-6 ">2026-02-15</td>
                      <td className=" truncate  py-4 px-6 "> 3 Days</td>
                      <td className="  truncate py-4 px-6 ">
                        <button className="rounded-full px-2 text-[#00BF6B] bg-[#76f2]">
                          Done
                        </button>
                      </td>
                    </tr>
                    <tr className="border-t hover:bg-[#1F1F1F] transition-colors border-text-disabled">
                      <td className="  truncate py-4 px-6 ">Vacation</td>
                      <td className="truncate  py-4 px-6 ">2026-02-15</td>
                      <td className=" truncate  py-4 px-6 ">2026-02-15</td>
                      <td className=" truncate  py-4 px-6 "> 5 Days</td>
                      <td className="  truncate py-4 px-6 ">
                        <button className="rounded-full px-2 text-[#00BF6B] bg-[#76f2]">
                          Done
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-surface border rounded-lg mt-6 md:col-span-4">
            <h1 className="text-text-primary font-bold text-[16px] my-5 mx-5">
              Team Leaves
            </h1>
            <div className="border"></div>

          
            <div className="flex justify-between rounded-md py-4 px-15 mx-9 my-6 hover:bg-white/10 md:w-fit md:gap-6">
            
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="text-text-primary text-lg">SJ</span>
              </div>

              <div className="">
                <h1 className="text-text-primary text-[16px] font-semibold">
                  Sarah Johnson
                </h1>
                <div className="flex flex-col">
                  <span className="text-[#6B7280]">Vacation</span>{" "}
            
                  <span className="text-[#6B7280]">
                    2026-04-01 to 2026-04-05
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between rounded-md py-4 px-15 mx-9 my-6 hover:bg-white/10 md:w-fit md:gap-6">
            
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="text-text-primary text-lg">SJ</span>
              </div>

              <div className="">
                <h1 className="text-text-primary text-[16px] font-semibold">
                  Sarah Johnson
                </h1>
                <div className="flex flex-col">
                  <span className="text-[#6B7280]">Vacation</span>{" "}
            
                  <span className="text-[#6B7280]">
                    2026-04-01 to 2026-04-05
                  </span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Leave;
