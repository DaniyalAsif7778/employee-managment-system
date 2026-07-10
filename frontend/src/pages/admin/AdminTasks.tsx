import { Button, StatCard ,Input} from "../../import.jsx";
import { IconUsers as Users } from "@tabler/icons-react";
import { IconFilter } from "@tabler/icons-react"; 
import { useState } from "react";
const AdminTasks = () => {
// Dropdown for filtering tasks
  const [dropdown, setDropdown] = useState(false);
  // UseState for select filter options
  const [selectedOption, setSelectedOption] = useState("All Departments");
  // Options for dropdown
  const options = [
    "All Departments",
    "Engineering",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "IT",
    "Legal",
    "Customer Support",
  ];
  return (
    //  Main section starts from here
    <div className="p-4 text-text-primary ">
       {/* First section for  page intro and task creation button */}
      <section className="w-full">
        <div className="w-full    flex flex-row justify-between items-center p-3  ">
          <div className=" ">
            <h1 className="text-text-primary font-bold text-4xl  mb-1 ">
              Task Management{" "}
            </h1>
            <p className="text-text-disabled text-base  ml-1 mb-4 ">
              Track and manage all tasks across teams{" "}
            </p>
          </div>
          <div>
            <Button
              text="+ Create Task"
              className={"bg-primary px-3 py-1.5 rounded-md"}
              type={"button"}
              disabled={false}
            />
          </div>
        </div>
      </section>
      {/* Section for stats display of tasks */}
      <section className="statsCard-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Tasks"
          value={100}
          iconDisplay={true}
          icon={<Users />}
          trendDisplay={false}
        />
        <StatCard
          title="Total Tasks"
          value={100}
          iconDisplay={true}
          icon={<Users />}
          trendDisplay={false}
        />
        <StatCard
          title="Total Tasks"
          value={100}
          iconDisplay={true}
          icon={<Users />}
          trendDisplay={false}
        />
        <StatCard
          title="Total Tasks"
          value={100}
          iconDisplay={true}
          icon={<Users />}
          trendDisplay={false}
        />
      </section>
{/* Section for filtering employees and searching employees  */}
      <section>
        <div><Input type="text" placeholder="Search" />    </div>
        <div>
        <div className="relative w-[9.50%] bg-navbar rounded-lg">
          <div
            className="rounded-lg p-2 flex flex-row items-center  justify-left gap-2 cursor-pointer"
            onClick={() => setDropdown(!dropdown)}
          >
            <IconFilter size={18} />{" "}
            <span className="text-text-primary text-base  whitespace-nowrap">{`${selectedOption}`}</span>
          </div>

          {dropdown && (
            <div className=" absolute top-10 right-0 w-40 bg-navbar  border ">
              <ul>
                {options.map((option) => (
                  <li
                    key={option}
                    className="text-text-primary text-base  whitespace-nowrap cursor-pointer p-2 text-left hover:bg-primary-fg/10 "
                    onClick={() => {
                      setSelectedOption(option);
                      setDropdown(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="relative w-[9.50%] bg-navbar rounded-lg">
          <div
            className="rounded-lg p-2 flex flex-row items-center  justify-left gap-2 cursor-pointer"
            onClick={() => setDropdown(!dropdown)}
          >
            <IconFilter size={18} />{" "}
            <span className="text-text-primary text-base  whitespace-nowrap">{`${selectedOption}`}</span>
          </div>

          {dropdown && (
            <div className=" absolute top-10 right-0 w-40 bg-navbar  border ">
              <ul>
                {options.map((option) => (
                  <li
                    key={option}
                    className="text-text-primary text-base  whitespace-nowrap cursor-pointer p-2 text-left hover:bg-primary-fg/10 "
                    onClick={() => {
                      setSelectedOption(option);
                      setDropdown(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        </div>
      </section>

    </div>
  );
};

export default AdminTasks;
