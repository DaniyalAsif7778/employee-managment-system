import { Button, StatCard, Input } from '../../import.jsx'
import { IconUsers as Users } from '@tabler/icons-react'
import { IconFilter } from '@tabler/icons-react'
import { useState } from 'react'
const AdminTasks = () => {
  // Dropdown for filtering tasks
  const [dropdown, setDropdown] = useState(false)
  // DropDown for task display section dropdown
  const [taskDropDown, setTaskDropDown] = useState(false)
  // UseState for select filter options
  const [selectedOption, setSelectedOption] = useState('All Departments')
  // Options for dropdown
  const options = [
    'All Departments',
    'Engineering',
    'Marketing',
    'Sales',
    'HR',
    'Finance',
    'IT',
    'Legal',
    'Customer Support',
  ]
  return (
    //  Main section starts from here
    <div className="p-4 text-text-primary ">
      {/* First section for  page intro and task creation button */}
      <section className="w-full">
        <div className="w-full    flex flex-row justify-between items-center p-3  ">
          <div className=" ">
            <h1 className="text-text-primary font-bold text-4xl  mb-1 ">Task Management </h1>
            <p className="text-text-disabled text-base  ml-1 mb-4 ">
              Track and manage all tasks across teams{' '}
            </p>
          </div>
          <div>
            <Button
              text="+ Create Task"
              className={'bg-primary px-3 py-1.5 rounded-md'}
              type={'button'}
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
      <section className="w-full p-2  border bg-surface rounded-xl flex flex-col md:flex-row  justify-center md:justify-between  items-start md:items-center gap-5">
        <div className="w-full md:w-2/4  p-2 flex flex-row justify-between items-center ">
          <Input type="text" placeholder="Search" className={'w-full   h-10 p-2 rounded-md'} />
        </div>
        <div className=" w-full md:w-2/4 flex flex-row  gap-2 ">
          <div className=" w-full md:w-2/4 relative  bg-navbar rounded-lg">
            <div
              className="rounded-lg p-2 flex flex-row items-center  justify-left gap-2 cursor-pointer"
              onClick={() => setDropdown(!dropdown)}
            >
              <IconFilter size={18} />{' '}
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
                        setSelectedOption(option)
                        setDropdown(false)
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className=" w-full md:w-2/4 relative  bg-navbar rounded-lg">
            <div
              className="rounded-lg p-2 flex flex-row items-center  justify-left gap-2 cursor-pointer"
              onClick={() => setDropdown(!dropdown)}
            >
              <IconFilter size={18} />{' '}
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
                        setSelectedOption(option)
                        setDropdown(false)
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
      {/* Tabel section for employees tasks  */}
      <div className="bg-[#121212] rounded-xl border border-[#333333] overflow-hidden mt-20">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#333333]">
              <tr>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                  Task Name
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                  Assignee
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                  Category
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
              <tr className="border-b border-[#333333] last:border-0 hover:bg-[#1F1F1F] transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-[15px] font-medium text-[#E0E0E0] mb-1">
                      Redesign Dashboard UI
                    </div>
                    <div className="w-32 h-1.5 bg-[#1F1F1F] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: '65%', backgroundColor: '#6366F1' }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#6366F1' }}
                    >
                      <span className="text-white text-[13px] font-medium">JD</span>
                    </div>
                    <span className="text-[15px] text-[#E0E0E0]">John Doe</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[15px] text-[#9CA3AF]">Jul 15, 2026</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#EF4444]/10 text-[#EF4444]">
                    High
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[15px] text-[#9CA3AF]">Design</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#3B82F6]/10 text-[#3B82F6]">
                    In Progress
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="relative inline-block">
                    <button className="p-2 hover:bg-[#121212] rounded-lg transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#9CA3AF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                      </svg>
                    </button>

                    {taskDropDown && (
                      <div className="absolute right-0 top-10 w-48 bg-[#121212] border border-[#333333] rounded-xl shadow-2xl z-50 overflow-hidden">
                        <div className="py-2">
                          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[#E0E0E0] hover:bg-[#1F1F1F] transition-colors text-left">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#9CA3AF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            <span className="text-[14px]">View Details</span>
                          </button>
                          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[#E0E0E0] hover:bg-[#1F1F1F] transition-colors text-left">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#9CA3AF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 20h9"></path>
                              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                            </svg>
                            <span className="text-[14px]">Edit Task</span>
                          </button>
                          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[#E0E0E0] hover:bg-[#1F1F1F] transition-colors text-left">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#9CA3AF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <span className="text-[14px]">Mark Complete</span>
                          </button>
                        </div>
                        <div className="border-t border-[#333333] py-2">
                          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors text-left">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#EF4444"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                            <span className="text-[14px] font-medium">Delete Task</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Navigation Section */}
      <section className="tasks-navigation-sec  w-full flex flex-row justify-between mt-5">
         <div>
          <p>{`Showing 8 of 8 tasks`}</p>
         </div>
         <div className='w-2/4 flex flex-row justify-end  gap-4'>
          <div><button>Previous</button></div>
          <div>
            <span>
            </span>
          </div>
          <div><button>Next</button></div>
         </div>
      </section>
    </div>
  )
}

export default AdminTasks
