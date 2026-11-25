import { StatusBadge } from '../../componenets/ui/StatusBadge.js'
import { Plus, Filter, MoreVertical, Search, Edit, Eye, UserX, Trash2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import EmployeeProfileSidebar from '../../componenets/ui/EmployeeProfileSidebar.js'

const employees = [
  {
    id: 1,
    name: 'Sarah Johnson',
    department: 'HR',
    role: 'HR Manager',
    status: 'Active',
    avatar: 'SJ',
    email: 'sarah.j@company.com',
    phone: '+1 (555) 101-1001',
    location: 'Building A, Floor 2',
    joinDate: 'Jan 15, 2020',
    manager: 'CEO',
    employeeId: 'EMP-0001',
    performance: 95,
  },
  {
    id: 2,
    name: 'Michael Chen',
    department: 'Finance',
    role: 'Senior Accountant',
    status: 'Active',
    avatar: 'MC',
    email: 'michael.c@company.com',
    phone: '+1 (555) 101-1002',
    location: 'Building C, Floor 3',
    joinDate: 'Mar 20, 2019',
    manager: 'Robert Taylor',
    employeeId: 'EMP-0002',
    performance: 92,
  },
  {
    id: 3,
    name: 'Emily Davis',
    department: 'HR',
    role: 'Recruiter',
    status: 'On Leave',
    avatar: 'ED',
    email: 'emily.d@company.com',
    phone: '+1 (555) 101-1003',
    location: 'Building A, Floor 2',
    joinDate: 'Jul 10, 2021',
    manager: 'Sarah Johnson',
    employeeId: 'EMP-0003',
    performance: 88,
  },
  {
    id: 4,
    name: 'David Wilson',
    department: 'IT',
    role: 'System Admin',
    status: 'Active',
    avatar: 'DW',
    email: 'david.w@company.com',
    phone: '+1 (555) 101-1004',
    location: 'Building B, Floor 4',
    joinDate: 'Feb 5, 2018',
    manager: 'Jennifer Lee',
    employeeId: 'EMP-0004',
    performance: 94,
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    department: 'Marketing',
    role: 'Marketing Lead',
    status: 'Active',
    avatar: 'LA',
    email: 'lisa.a@company.com',
    phone: '+1 (555) 101-1005',
    location: 'Building C, Floor 1',
    joinDate: 'Nov 12, 2020',
    manager: 'CEO',
    employeeId: 'EMP-0005',
    performance: 90,
  },
  {
    id: 6,
    name: 'James Brown',
    department: 'Sales',
    role: 'Sales Manager',
    status: 'Active',
    avatar: 'JB',
    email: 'james.b@company.com',
    phone: '+1 (555) 101-1006',
    location: 'Building A, Floor 1',
    joinDate: 'May 8, 2019',
    manager: 'CEO',
    employeeId: 'EMP-0006',
    performance: 96,
  },
  {
    id: 7,
    name: 'Jennifer Lee',
    department: 'IT',
    role: 'Developer',
    status: 'Inactive',
    avatar: 'JL',
    email: 'jennifer.l@company.com',
    phone: '+1 (555) 101-1007',
    location: 'Building B, Floor 4',
    joinDate: 'Sep 3, 2017',
    manager: 'CEO',
    employeeId: 'EMP-0007',
    performance: 85,
  },
  {
    id: 8,
    name: 'Robert Taylor',
    department: 'Operations',
    role: 'Operations Lead',
    status: 'Active',
    avatar: 'RT',
    email: 'robert.t@company.com',
    phone: '+1 (555) 101-1008',
    location: 'Building A, Floor 4',
    joinDate: 'Apr 22, 2018',
    manager: 'CEO',
    employeeId: 'EMP-0008',
    performance: 91,
  },
  {
    id: 9,
    name: 'Amanda White',
    department: 'Finance',
    role: 'Financial Analyst',
    status: 'On Leave',
    avatar: 'AW',
    email: 'amanda.w@company.com',
    phone: '+1 (555) 101-1009',
    location: 'Building C, Floor 3',
    joinDate: 'Dec 1, 2021',
    manager: 'Robert Taylor',
    employeeId: 'EMP-0009',
    performance: 87,
  },
  {
    id: 10,
    name: 'Chris Martinez',
    department: 'Marketing',
    role: 'Content Writer',
    status: 'Active',
    avatar: 'CM',
    email: 'chris.m@company.com',
    phone: '+1 (555) 101-1010',
    location: 'Building C, Floor 1',
    joinDate: 'Aug 15, 2022',
    manager: 'Lisa Anderson',
    employeeId: 'EMP-0010',
    performance: 89,
  },
]

const departments = ['All Departments', 'HR', 'Finance', 'IT', 'Marketing', 'Sales', 'Operations']

export default function AdminEmployees() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments')
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment =
      selectedDepartment === 'All Departments' || emp.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleEmployeeClick = (employee: any) => {
    const employeeProfile = {
      ...employee,
      recentActivity: [
        { action: 'Completed task: Monthly Report', date: 'May 14, 2026', time: '3:45 PM' },
        { action: 'Submitted timesheet', date: 'May 13, 2026', time: '5:00 PM' },
        { action: 'Attended meeting: Team Sync', date: 'May 12, 2026', time: '10:00 AM' },
      ],
      stats: {
        tasksCompleted: 42,
        totalTasks: 50,
        attendanceRate: 98,
        leavesTaken: 3,
        totalLeaves: 15,
      },
    }
    setSelectedEmployee(employeeProfile)
  }

  const getDepartmentColor = (dept: string) => {
    const colors: Record<string, string> = {
      HR: '#8B5CF6',
      Finance: '#EC4899',
      IT: '#009F8E',
      Marketing: '#FFC107',
      Sales: '#3B82F6',
      Operations: '#F97316',
    }
    return colors[dept] || '#009F8E'
  }

  return (
    <>
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">Employees</h1>
          <p className="text-[15px] text-[#9CA3AF]">Manage your workforce and team members</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#009F8E] text-white rounded-lg hover:bg-[#12C4D3] transition-all duration-200 text-[15px] font-medium">
          <Plus className="w-4 h-4" />
          Add Employee
        </button>
      </div>

      {/* Filters */}
      <div className="bg-[#121212] rounded-xl border border-[#333333] p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="h-10 pl-9 pr-8 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all appearance-none cursor-pointer text-[15px]"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-[#121212] rounded-xl border border-[#333333] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#333333]">
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
              {filteredEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-[#333333] last:border-0 hover:bg-[#1F1F1F] transition-colors cursor-pointer"
                  onClick={() => handleEmployeeClick(employee)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: getDepartmentColor(employee.department) }}
                      >
                        <span className="text-white text-[14px] font-medium">
                          {employee.avatar}
                        </span>
                      </div>
                      <div>
                        <div className="text-[15px] font-medium text-[#E0E0E0]">
                          {employee.name}
                        </div>
                        <div className="text-[14px] text-[#9CA3AF]">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[15px] text-[#E0E0E0]">{employee.department}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[15px] text-[#9CA3AF]">{employee.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-[13px] font-medium ${
                        employee.status === 'Active'
                          ? 'bg-[#00BF6B]/10 text-[#00BF6B]'
                          : employee.status === 'On Leave'
                            ? 'bg-[#FFC107]/10 text-[#FFC107]'
                            : 'bg-[#6B7280]/10 text-[#6B7280]'
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div
                      className="relative inline-block"
                      ref={openDropdown === employee.id ? dropdownRef : null}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpenDropdown(openDropdown === employee.id ? null : employee.id)
                        }}
                        className="p-2 hover:bg-[#121212] rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-[#9CA3AF]" />
                      </button>

                      {openDropdown === employee.id && (
                        <div className="absolute right-0 top-10 w-48 bg-[#121212] border border-[#333333] rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="py-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEmployeeClick(employee)
                                setOpenDropdown(null)
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-[#E0E0E0] hover:bg-[#1F1F1F] transition-colors text-left"
                            >
                              <Eye className="w-4 h-4 text-[#9CA3AF]" />
                              <span className="text-[14px]">View Profile</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                console.log('Edit employee:', employee.id)
                                setOpenDropdown(null)
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-[#E0E0E0] hover:bg-[#1F1F1F] transition-colors text-left"
                            >
                              <Edit className="w-4 h-4 text-[#9CA3AF]" />
                              <span className="text-[14px]">Edit Employee</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                console.log('Deactivate employee:', employee.id)
                                setOpenDropdown(null)
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-[#E0E0E0] hover:bg-[#1F1F1F] transition-colors text-left"
                            >
                              <UserX className="w-4 h-4 text-[#9CA3AF]" />
                              <span className="text-[14px]">Deactivate</span>
                            </button>
                          </div>
                          <div className="border-t border-[#333333] py-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                console.log('Delete employee:', employee.id)
                                setOpenDropdown(null)
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors text-left"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span className="text-[14px] font-medium">Delete Employee</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-4 flex items-center justify-between text-[14px] text-[#9CA3AF]">
        <span>
          Showing {filteredEmployees.length} of {employees.length} employees
        </span>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg border border-[#333333] hover:bg-[#1F1F1F] transition-colors text-[#E0E0E0]">
            Previous
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-[#009F8E] text-white">1</button>
          <button className="px-3 py-1.5 rounded-lg border border-[#333333] hover:bg-[#1F1F1F] transition-colors text-[#E0E0E0]">
            2
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-[#333333] hover:bg-[#1F1F1F] transition-colors text-[#E0E0E0]">
            Next
          </button>
        </div>
      </div>

      {/* Employee Profile Sidebar */}
      {selectedEmployee && (
        <EmployeeProfileSidebar
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          departmentColor={getDepartmentColor(selectedEmployee.department)}
        />
      )}
    </>
  )
}
