import React from "react";
import { MessageSquare, Plus } from "lucide-react";

interface AssignTaskProps {
  title?: string
  value?: number
  filter?: string
  filterColor?: string
  filterBg?: string
}

const AssignTask = ({
  title = "This is Task",
  value = 8,
  filter = "In progreess",
  filterColor = '#009F8E',
  filterBg = '#009F8E1A',
}: AssignTaskProps) => {
  return (
    <>
      <div className="bg-surface rounded-md border flex flex-col p-6 ">
        <span className="text-text-primary font-semibold text-lg">Review Project Proposal</span>
         <p className="text-text-disabled text-base  ">
            Review and provide feedback on Q2 project proposal
        </p>
        <div className="flex gap-3 mt-4">
            <button className="rounded-full px-2 text-destructive bg-[#E444]">
             High
            </button>
            <button className="rounded-full px-2 text-[#12C4D3] bg-[#1F1F1F]">
                In progress
            </button>
        </div>
        <div className="border mt-6"></div>
        <div className="mt-4">
            <div className="flex items-center justify-between ">
              <p className="text-text-disabled">Category</p>
              <p className="text-text-disabled ">Due Date</p>
            </div>
            <div className="flex items-center justify-between ">
              <p className="text-text-primary font-semibold">Project Management</p>
              <p className="text-text-primary font-semibold ">2026-03-29</p>
            </div>
        </div>
      </div>
      
    </>
  );
};

export default AssignTask;