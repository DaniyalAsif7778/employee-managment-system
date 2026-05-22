import React from "react";
import { MessageSquare, Plus } from "lucide-react";

interface TaskCardProps {
  title: string,
  value: number,
  icon: React.ComponentType<{color?: string}>, // More specific typing
  iconColor: string,
  iconBg: string,
  leftDays?: string, // Made optional since it's not used
}

const TaskCard = ({
  title = "This is Task",
  value = 0,
  icon: Icon, // Fixed: rename prop to Icon component
  iconColor = '#009F8E',
  iconBg = '#009F8E1A',
  leftDays = '7',
}: TaskCardProps) => {
  return (
    <>
      <div className="bg-surface rounded-md border flex flex-col p-6 ">
        <div className="flex gap-4 justify-between">
          <p className="mt-2">{title}</p>
          <div 
            className="w-12 h-12 rounded-xl flex items-center" 
            style={{ backgroundColor: iconBg }}
          >
            <span className="w-5 h-5 ml-3">
              <Icon color={iconColor} /> {/* Fixed: use color prop instead of style */}
            </span>
          </div>
        </div>
        <h2>{value}</h2>
      </div>
    </>
  );
};

export default TaskCard;