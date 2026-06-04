import React ,{ useState ,useRef} from "react";
import { Navigate } from "react-router";
import { NavLink } from "react-router";
import { Button ,Input} from "../../import.js";
import { IconFilter } from '@tabler/icons-react';
import StatusBatch from "../../componenets/ui/StatusBatch.js";
import { IconDotsVertical as EllipsisVertical } from "@tabler/icons-react";   
 const   AdminEmployees=()=> {
  const [dropdown, setDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All Departments");
  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState<string>("");
  const options= [
    "All Departments",
    "Engineering",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "IT",
    "Legal",
    "Customer Support",
  ]
  return (
    <div className="h-screen p-4 text-text-primary ">
     <section className="w-full">
        <div className="w-full    flex flex-row justify-between items-center p-3  ">
          <div className=" ">
            <h1 className="text-text-primary font-bold text-4xl  mb-1 ">
            Employees

            </h1>
            <p className="text-text-disabled text-base  ml-1 mb-4 ">
            Manage your workforce and team members


</p>
          </div>
          <div>
            <Button
              text="+ Add Employee"
              className={"bg-primary px-3 py-1.5 rounded-md"}
              type={"button"}
              disabled={false}
            />
          </div>
        </div>
      </section>
      <section className="w-full p-2  border bg-surface rounded-xl flex flex-row justify-between items-center gap-5 ">
        <div className="w-full    p-2 flex flex-row justify-between items-center  "><Input type="text" placeholder="Search employees..." ref={searchRef} onchange={(e)=> setSearch(e.target.value)} value={search} className={"w-full   h-10 p-2 rounded-md"}/></div>
        <div className="relative w-[9.50%] bg-navbar rounded-lg">
        <div className="rounded-lg p-2 flex flex-row items-center  justify-left gap-2 cursor-pointer"  onClick={()=> setDropdown(!dropdown)}>
 <IconFilter size={18}/> <span className="text-text-primary text-base  whitespace-nowrap" >{`${selectedOption}`}</span>
          </div>

        {dropdown && (
          <div className=" absolute top-10 right-0 w-40 bg-navbar  border ">
           <ul >
            {options.map((option) => (
              <li key={option} className="text-text-primary text-base  whitespace-nowrap cursor-pointer p-2 text-left hover:bg-primary-fg/10 " onClick={()=> {
                setSelectedOption(option)
                setDropdown(false)
              }}>{option}</li>
            ))}
           </ul>
          </div>
        )}
        </div>
      </section>
      <section  className="mt-20">
      <div className=" border   rounded-md flex flex-col gap-3  outline-none bg-[#121212]">
     
     
      <div>
        <table className="w-full  table-fixed border-collapse text-center ">
          <thead className="border-b border-text-disabled">
          <tr>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
          </thead>
          <tbody>
           <tr  className="border-t hover:bg-[#1F1F1F] transition-colors border-text-disabled">
              <td   className="  truncate py-4 px-6 ">Update employee handbook</td>
              <td className="truncate  py-4 px-6 ">Sarah Johnson</td>
              <td className=" truncate  py-4 px-6 ">
                <StatusBatch task={{ status: "done" }} />
              </td>
              <td className=" truncate  py-4 px-6 " > 30 March</td>
              <td className="  truncate py-4 px-6 ">    <EllipsisVertical size={17}/>
</td>
            </tr>
                       
          </tbody>
        </table>
      </div>
    </div>
      </section>
    </div>
  );
}
export default  AdminEmployees