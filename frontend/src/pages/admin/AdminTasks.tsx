import { StatusBadge } from '../../componenets/ui/StatusBadge.js'
import { PriorityBadge } from '../../componenets/ui/PriorityBadge.js'
import {
  Plus,
  Filter,
  MoreVertical,
  Search,
  Edit,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  Users,
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import EmployeeProfileSidebar from '../../componenets/ui/EmployeeProfileSidebar.js'

const tasks = [
  {
    id: 1,
    name: 'Update employee handbook',
    assignee: 'Sarah Johnson',
    assigneeId: 1,
    assigneeAvatar: 'SJ',
    assigneeEmail: 'sarah.j@company.com',
    assigneeDepartment: 'HR',
    assigneeRole: 'HR Manager',
    dueDate: '2026-05-20',
    priority: 'medium' as const,
    category: 'Documentation',
    status: 'in-progress' as const,
    progress: 65,
  },
  {
    id: 2,
    name: 'Q1 Financial Report',
    assignee: 'Michael Chen',
    assigneeId: 2,
    assigneeAvatar: 'MC',
    assigneeEmail: 'michael.c@company.com',
    assigneeDepartment: 'Finance',
    assigneeRole: 'Senior Accountant',
    dueDate: '2026-05-18',
    priority: 'high' as const,
    category: 'Finance',
    status: 'overdue' as const,
    progress: 40,
  },
  {
    id: 3,
    name: 'New hire onboarding',
    assignee: 'Emily Davis',
    assigneeId: 3,
    assigneeAvatar: 'ED',
    assigneeEmail: 'emily.d@company.com',
    assigneeDepartment: 'HR',
    assigneeRole: 'Recruiter',
    dueDate: '2026-05-22',
    priority: 'high' as const,
    category: 'HR',
    status: 'pending' as const,
    progress: 0,
  },
  {
    id: 4,
    name: 'System security audit',
    assignee: 'David Wilson',
    assigneeId: 4,
    assigneeAvatar: 'DW',
    assigneeEmail: 'david.w@company.com',
    assigneeDepartment: 'IT',
    assigneeRole: 'System Admin',
    dueDate: '2026-05-19',
    priority: 'high' as const,
    category: 'IT',
    status: 'in-progress' as const,
    progress: 75,
  },
  {
    id: 5,
    name: 'Marketing campaign review',
    assignee: 'Lisa Anderson',
    assigneeId: 5,
    assigneeAvatar: 'LA',
    assigneeEmail: 'lisa.a@company.com',
    assigneeDepartment: 'Marketing',
    assigneeRole: 'Marketing Lead',
    dueDate: '2026-05-15',
    priority: 'medium' as const,
    category: 'Marketing',
    status: 'done' as const,
    progress: 100,
  },
  {
    id: 6,
    name: 'Update company website',
    assignee: 'David Wilson',
    assigneeId: 4,
    assigneeAvatar: 'DW',
    assigneeEmail: 'david.w@company.com',
    assigneeDepartment: 'IT',
    assigneeRole: 'System Admin',
    dueDate: '2026-05-28',
    priority: 'low' as const,
    category: 'IT',
    status: 'pending' as const,
    progress: 10,
  },
  {
    id: 7,
    name: 'Employee satisfaction survey',
    assignee: 'Sarah Johnson',
    assigneeId: 1,
    assigneeAvatar: 'SJ',
    assigneeEmail: 'sarah.j@company.com',
    assigneeDepartment: 'HR',
    assigneeRole: 'HR Manager',
    dueDate: '2026-05-30',
    priority: 'medium' as const,
    category: 'HR',
    status: 'in-progress' as const,
    progress: 30,
  },
  {
    id: 8,
    name: 'Quarterly budget planning',
    assignee: 'Michael Chen',
    assigneeId: 2,
    assigneeAvatar: 'MC',
    assigneeEmail: 'michael.c@company.com',
    assigneeDepartment: 'Finance',
    assigneeRole: 'Senior Accountant',
    dueDate: '2026-05-25',
    priority: 'high' as const,
    category: 'Finance',
    status: 'in-progress' as const,
    progress: 55,
  },
]

const categories = ['All Categories', 'HR', 'Finance', 'IT', 'Marketing', 'Documentation']
const statusFilters = ['All Status', 'In Progress', 'Pending', 'Done', 'Overdue']

export default function AdminTasks() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedStatus, setSelectedStatus] = useState('All Status')
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === 'All Categories' || task.category === selectedCategory
    const matchesStatus =
      selectedStatus === 'All Status' ||
      task.status.toLowerCase().replace('-', ' ') === selectedStatus.toLowerCase()
    return matchesSearch && matchesCategory && matchesStatus
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

  const handleAssigneeClick = (task: any) => {
    // Get all tasks for this assignee
    const assigneeTasks = tasks.filter((t) => t.assigneeId === task.assigneeId)

    const employeeProfile = {
      id: task.assigneeId,
      name: task.assignee,
      avatar: task.assigneeAvatar,
      email: task.assigneeEmail,
      phone: '+1 (555) 000-0000',
      department: task.assigneeDepartment,
      role: task.assigneeRole,
      location: 'Building A, Floor 2',
      joinDate: 'Jan 15, 2023',
      manager: 'Manager Name',
      employeeId: `EMP-${String(task.assigneeId).padStart(4, '0')}`,
      status: 'Active',
      performance: 92,
      recentActivity: assigneeTasks.slice(0, 3).map((t) => ({
        action: `Working on: ${t.name}`,
        date: new Date(t.dueDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        time: `Due: ${t.dueDate}`,
      })),
      stats: {
        tasksCompleted: assigneeTasks.filter((t) => t.status === 'done').length,
        totalTasks: assigneeTasks.length,
        attendanceRate: 96,
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
      Documentation: '#00BF6B',
    }
    return colors[dept] || '#009F8E'
  }

  return (
    <>
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">Task Management</h1>
          <p className="text-[15px] text-[#9CA3AF]">Track and manage all tasks across teams</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#009F8E] text-white rounded-lg hover:bg-[#12C4D3] transition-all duration-200 text-[15px] font-medium">
          <Plus className="w-4 h-4" />
          Create Task
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-[#121212] rounded-xl p-5 border border-[#333333]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[14px] text-[#9CA3AF]">Total Tasks</span>
            <Users className="w-4 h-4 text-[#009F8E]" />
          </div>
          <p className="text-[28px] font-semibold text-[#E0E0E0]">{tasks.length}</p>
        </div>
        <div className="bg-[#121212] rounded-xl p-5 border border-[#333333]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[14px] text-[#9CA3AF]">In Progress</span>
            <Clock className="w-4 h-4 text-[#FFC107]" />
          </div>
          <p className="text-[28px] font-semibold text-[#E0E0E0]">
            {tasks.filter((t) => t.status === 'in-progress').length}
          </p>
        </div>
        <div className="bg-[#121212] rounded-xl p-5 border border-[#333333]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[14px] text-[#9CA3AF]">Completed</span>
            <CheckCircle className="w-4 h-4 text-[#00BF6B]" />
          </div>
          <p className="text-[28px] font-semibold text-[#E0E0E0]">
            {tasks.filter((t) => t.status === 'done').length}
          </p>
        </div>
        <div className="bg-[#121212] rounded-xl p-5 border border-[#333333]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[14px] text-[#9CA3AF]">Overdue</span>
            <Clock className="w-4 h-4 text-[#EF4444]" />
          </div>
          <p className="text-[28px] font-semibold text-[#E0E0E0]">
            {tasks.filter((t) => t.status === 'overdue').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#121212] rounded-xl border border-[#333333] p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-10 pl-9 pr-8 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all appearance-none cursor-pointer text-[15px]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-10 pl-9 pr-8 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all appearance-none cursor-pointer text-[15px]"
            >
              {statusFilters.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-[#121212] rounded-xl border border-[#333333] overflow-hidden">
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
              {filteredTasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-[#333333] last:border-0 hover:bg-[#1F1F1F] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-[15px] font-medium text-[#E0E0E0] mb-1">{task.name}</div>
                      <div className="w-32 h-1.5 bg-[#1F1F1F] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${task.progress}%`,
                            backgroundColor: getDepartmentColor(task.assigneeDepartment),
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleAssigneeClick(task)}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: getDepartmentColor(task.assigneeDepartment) }}
                      >
                        <span className="text-white text-[13px] font-medium">
                          {task.assigneeAvatar}
                        </span>
                      </div>
                      <span className="text-[15px] text-[#E0E0E0]">{task.assignee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[15px] text-[#9CA3AF]">{task.dueDate}</span>
                  </td>
                  <td className="px-6 py-4">
                    <PriorityBadge priority={task.priority} />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[15px] text-[#9CA3AF]">{task.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div
                      className="relative inline-block"
                      ref={openDropdown === task.id ? dropdownRef : null}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpenDropdown(openDropdown === task.id ? null : task.id)
                        }}
                        className="p-2 hover:bg-[#121212] rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-[#9CA3AF]" />
                      </button>

                      {openDropdown === task.id && (
                        <div className="absolute right-0 top-10 w-48 bg-[#121212] border border-[#333333] rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="py-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                console.log('View task:', task.id)
                                setOpenDropdown(null)
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-[#E0E0E0] hover:bg-[#1F1F1F] transition-colors text-left"
                            >
                              <Eye className="w-4 h-4 text-[#9CA3AF]" />
                              <span className="text-[14px]">View Details</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                console.log('Edit task:', task.id)
                                setOpenDropdown(null)
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-[#E0E0E0] hover:bg-[#1F1F1F] transition-colors text-left"
                            >
                              <Edit className="w-4 h-4 text-[#9CA3AF]" />
                              <span className="text-[14px]">Edit Task</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                console.log('Mark complete:', task.id)
                                setOpenDropdown(null)
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-[#E0E0E0] hover:bg-[#1F1F1F] transition-colors text-left"
                            >
                              <CheckCircle className="w-4 h-4 text-[#9CA3AF]" />
                              <span className="text-[14px]">Mark Complete</span>
                            </button>
                          </div>
                          <div className="border-t border-[#333333] py-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                console.log('Delete task:', task.id)
                                setOpenDropdown(null)
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors text-left"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span className="text-[14px] font-medium">Delete Task</span>
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
          Showing {filteredTasks.length} of {tasks.length} tasks
        </span>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg border border-[#333333] hover:bg-[#1F1F1F] transition-colors text-[#E0E0E0]">
            Previous
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-[#009F8E] text-white">1</button>
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
