import { useState } from "react";
import { Button, Input } from "../../import.js";
import StatCard from "../../componenets/ui/StatCard.js";
const AdminDepartment = () => {
  const [search, setSearch] = useState("");

  const stats = [
    {
      title: "Total Departments",
      value: 247,
    },
    {
      title: "Total Employees",
      value: 38,
    },
    {
      title: "Avg Performance",
      value: 0,
    },
  ];
  return (
    <div className="p-4 text-text-primary">
      <section className="w-full">
        <div className="w-full    flex flex-row justify-between items-center p-3  ">
          <div className=" ">
            <h1 className="text-text-primary font-bold text-4xl  mb-1 ">
              Departments
            </h1>
            <p className="text-text-disabled text-base  ml-1 mb-4 ">
              Manage company departments and teams{" "}
            </p>
          </div>
          <div>
            <Button
              text="+  Add Department"
              className={"bg-primary px-3 py-1.5 rounded-md"}
              type={"button"}
              disabled={false}
            />
          </div>
        </div>
      </section>
      <section className="w-full flex  flex-col gap-5 lg:flex-row  justify-evenly">
        {/*// Type '{}' is missing the following properties from type 'InputProps': type, value, onchange, label, name (typescript[2739])*/}
        <div className="w-full">
        <Input
          type="text"
          placeholder="
Search departments...
"
          className={"w-full h-10 p-2 rounded-md"}
        />
         </div>
         <div className="flex  flex-col md:flex-row justify-center gap-5">
           {stats.map((stat, idx) => {
            return (
              <StatCard
                key={idx}
                title={stat.title}
                value={stat.value}
                iconDisplay={false}
                trendDisplay={false}
                height="40"
               />
            );
          })}
           </div>
       </section>
    </div>
  );
};
export default AdminDepartment;
