import { Search, Eye, Users, X } from 'lucide-react'
import { useState } from 'react'
import { StatusBadge } from '../../componenets/ui/StatusBadge.js'

interface Employee {
  id: number
  name: string
  avatar: string
  department: string
  role: string
  joinDate: string
  status: 'active' | 'inactive' | 'on-leave'
  email: string
  phone: string
  location: string
  manager: string
}

const employees: Employee[] = [
  {
    id: 1,
    name: 'John Smith',
    avatar: 'JS',
    department: 'Engineering',
    role: 'Software Developer',
    joinDate: 'Mar 2024',
    status: 'active',
    email: 'john.smith@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    manager: 'Marcus Reid',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    avatar: 'SJ',
    department: 'HR',
    role: 'HR Manager',
    joinDate: 'Jan 2023',
    status: 'active',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 234-5678',
    location: 'New York, NY',
    manager: 'Sandra Kim',
  },
  {
    id: 3,
    name: 'Michael Chen',
    avatar: 'MC',
    department: 'Finance',
    role: 'Senior Accountant',
    joinDate: 'Jun 2022',
    status: 'active',
    email: 'michael.chen@company.com',
    phone: '+1 (555) 345-6789',
    location: 'Chicago, IL',
    manager: 'Admin User',
  },
  {
    id: 4,
    name: 'Emily Davis',
    avatar: 'ED',
    department: 'HR',
    role: 'Recruiter',
    joinDate: 'Feb 2024',
    status: 'on-leave',
    email: 'emily.davis@company.com',
    phone: '+1 (555) 456-7890',
    location: 'Austin, TX',
    manager: 'Sandra Kim',
  },
  {
    id: 5,
    name: 'David Wilson',
    avatar: 'DW',
    department: 'IT',
    role: 'System Admin',
    joinDate: 'Aug 2021',
    status: 'active',
    email: 'david.wilson@company.com',
    phone: '+1 (555) 567-8901',
    location: 'Seattle, WA',
    manager: 'Admin User',
  },
  {
    id: 6,
    name: 'Lisa Anderson',
    avatar: 'LA',
    department: 'Marketing',
    role: 'Marketing Lead',
    joinDate: 'Sep 2022',
    status: 'active',
    email: 'lisa.anderson@company.com',
    phone: '+1 (555) 678-9012',
    location: 'Los Angeles, CA',
    manager: 'Admin User',
  },
  {
    id: 7,
    name: 'Alex Turner',
    avatar: 'AT',
    department: 'Engineering',
    role: 'Senior Developer',
    joinDate: 'Apr 2021',
    status: 'active',
    email: 'alex.turner@company.com',
    phone: '+1 (555) 789-0123',
    location: 'Austin, TX',
    manager: 'Marcus Reid',
  },
  {
    id: 8,
    name: 'Priya Nair',
    avatar: 'PN',
    department: 'Engineering',
    role: 'Frontend Engineer',
    joinDate: 'Nov 2023',
    status: 'active',
    email: 'priya.nair@company.com',
    phone: '+1 (555) 890-1234',
    location: 'Remote',
    manager: 'Marcus Reid',
  },
  {
    id: 9,
    name: 'Jordan Lee',
    avatar: 'JL',
    department: 'Engineering',
    role: 'Backend Engineer',
    joinDate: 'Jul 2022',
    status: 'inactive',
    email: 'jordan.lee@company.com',
    phone: '+1 (555) 901-2345',
    location: 'Denver, CO',
    manager: 'Marcus Reid',
  },
]

const departments = ['All', 'Engineering', 'HR', 'Finance', 'IT', 'Marketing']

const deptColors: Record<string, string> = {
  Engineering: 'bg-[#8B5CF6]/20 text-[#8B5CF6]',
  HR: 'bg-[#EC4899]/20 text-[#EC4899]',
  Finance: 'bg-[#00BF6B]/20 text-[#00BF6B]',
  IT: 'bg-[#12C4D3]/20 text-[#12C4D3]',
  Marketing: 'bg-[#FFC107]/20 text-[#FFC107]',
}

export default function HREmployees() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDept, setSelectedDept] = useState('All')
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const filtered = employees.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDept = selectedDept === 'All' || e.department === selectedDept
    return matchesSearch && matchesDept
  })

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">Employee Directory</h1>
          <p className="text-[15px] text-[#9CA3AF]">
            View and manage all employees across departments
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#121212] border border-[#333333] rounded-lg">
          <Users className="w-4 h-4 text-[#EC4899]" />
          <span className="text-[15px] font-medium text-[#E0E0E0]">
            {employees.length} employees
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-lg border border-[#333333] bg-[#121212] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent transition-all text-[15px]"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-all duration-200 ${
                selectedDept === dept
                  ? 'bg-[#EC4899] text-white'
                  : 'bg-[#121212] text-[#9CA3AF] border border-[#333333] hover:border-[#444444] hover:text-[#E0E0E0]'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#121212] rounded-xl border border-[#333333] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#333333]">
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#6B7280] uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#6B7280] uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#6B7280] uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#6B7280] uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#6B7280] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#6B7280] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#333333]">
              {filtered.map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-[#1F1F1F] transition-colors cursor-pointer"
                  onClick={() => setSelectedEmployee(emp)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#EC4899] flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[12px] font-medium">{emp.avatar}</span>
                      </div>
                      <span className="text-[15px] font-medium text-[#E0E0E0]">{emp.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[13px] font-medium ${deptColors[emp.department] || 'bg-[#1F1F1F] text-[#9CA3AF]'}`}
                    >
                      {emp.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[15px] text-[#9CA3AF]">{emp.role}</td>
                  <td className="px-6 py-4 text-[14px] text-[#6B7280]">{emp.joinDate}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={emp.status} />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedEmployee(emp)
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EC4899]/15 text-[#EC4899] hover:bg-[#EC4899]/30 transition-colors text-[13px] font-medium"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-in Profile Drawer */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedEmployee(null)} />
          <div className="relative w-full max-w-md bg-[#121212] border-l border-[#333333] h-full overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-[#333333] flex items-center justify-between">
              <h2 className="text-[18px] font-semibold text-[#E0E0E0]">Employee Profile</h2>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="p-2 hover:bg-[#1F1F1F] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#9CA3AF]" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-[#EC4899] flex items-center justify-center mb-4">
                  <span className="text-white text-[28px] font-medium">
                    {selectedEmployee.avatar}
                  </span>
                </div>
                <h3 className="text-[20px] font-semibold text-[#E0E0E0] mb-1">
                  {selectedEmployee.name}
                </h3>
                <p className="text-[15px] text-[#9CA3AF] mb-3">{selectedEmployee.role}</p>
                <StatusBadge status={selectedEmployee.status} />
              </div>

              <div className="space-y-4">
                <div className="bg-[#1F1F1F] rounded-xl p-4 border border-[#333333]">
                  <h4 className="text-[14px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">
                    Contact Information
                  </h4>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] text-[#6B7280]">Email</span>
                      <span className="text-[14px] text-[#E0E0E0]">{selectedEmployee.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] text-[#6B7280]">Phone</span>
                      <span className="text-[14px] text-[#E0E0E0]">{selectedEmployee.phone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] text-[#6B7280]">Location</span>
                      <span className="text-[14px] text-[#E0E0E0]">
                        {selectedEmployee.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1F1F1F] rounded-xl p-4 border border-[#333333]">
                  <h4 className="text-[14px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">
                    Employment Details
                  </h4>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] text-[#6B7280]">Department</span>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[13px] font-medium ${deptColors[selectedEmployee.department] || 'bg-[#1F1F1F] text-[#9CA3AF]'}`}
                      >
                        {selectedEmployee.department}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] text-[#6B7280]">Manager</span>
                      <span className="text-[14px] text-[#E0E0E0]">{selectedEmployee.manager}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] text-[#6B7280]">Join Date</span>
                      <span className="text-[14px] text-[#E0E0E0]">
                        {selectedEmployee.joinDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
