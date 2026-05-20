import React from "react";
import ProgressBar from "./ProgressBar.js";
import { EllipsisVertical } from 'lucide-react';

interface DepartmentCardProps {
	themeColor: string;
	title: string;
	leadName: string;
	employeesNo: number;
	budget: number;
	performance: number;
	onclick?: (event: React.MouseEvent<HTMLButtonElement>) => {};
}

const DepartmentCard = ({
	themeColor = "#007bff",
	title = "Project Alpha",
	leadName = "John Doe",
	employeesNo = 15,
	budget = 50000,
	performance = 85,
	onclick,
}: DepartmentCardProps) => {
	return (
		<> 
			<div className=" bg-surface  relative  w-82 flex flex-col justify-evenly border   h-82 rounded-lg p-4">
				<div className={`w-full absolute top-0 left-0 -z-0  h-2.5 bg-primary rounded-tr-lg rounded-tl-lg `}>
					 
				</div>
				<div className="flex flex-row justify-between   items-start  ">
					<div className="flex flex-col gap-1">
						<h1 className="text-xl">Engineering</h1>
						<p className="text-base ">David Wilson</p>
					</div>
					<div className="mt-2">{/*options fo more tasks */} <EllipsisVertical size={18}/></div>
				</div>
				<div className="flex flex-row justify-between   items-center ml-2 ">
					<h3 className="font-light text-text-secondary text-base"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
 
  <polyline points="6 18 9 15 13 17 16 12 20 14" />
  <polyline points="16 12 20 14 18 10" /> 
</svg>   Employees</h3>
					<p className="text-text-primary text-base">45</p>
				</div>
				<div className="flex flex-row justify-between   items-center  ml-2 ">
 					<h3 className="font-light text-text-secondary text-base">Budget</h3>
					<p className="text-text-primary text-base">$2.4M</p>
				</div>
				<div>
					<div className="flex flex-row justify-between   items-center  ml-2">
						<h2 className="font-light text-text-secondary text-base">Performance</h2>
						<p className="text-text-primary text-base">94%</p>
					</div>
					<div className="ml-2">{/*progress bar here*/}<ProgressBar label={""} value={0} max={100} className={"w-full mt-2"}/></div>
				</div>
				<div className="text-center mt-5">{/*Link here*/}View Details</div>
			</div>
		</>
	);
};

export default DepartmentCard;
