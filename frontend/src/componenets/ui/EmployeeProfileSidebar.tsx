import {
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  TrendingUp,
  Clock,
  Award,
  FileText,
  ChevronRight,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface Employee {
  id: number
  name: string
  role: string
  avatar: string
  email: string
  phone: string
  department: string
  location: string
  joinDate: string
  performance: number
  status: string
  manager: string
  employeeId: string
  recentActivity?: Array<{
    action: string
    date: string
    time: string
  }>
  stats?: {
    tasksCompleted: number
    totalTasks: number
    attendanceRate: number
    leavesTaken: number
    totalLeaves: number
  }
}

interface EmployeeProfileSidebarProps {
  employee: Employee | null
  onClose: () => void
  departmentColor?: string
}

const performanceTrend = [
  { month: 'Jan', performance: 85 },
  { month: 'Feb', performance: 87 },
  { month: 'Mar', performance: 89 },
  { month: 'Apr', performance: 91 },
  { month: 'May', performance: 94 },
]

export default function EmployeeProfileSidebar({
  employee,
  onClose,
  departmentColor = '#009F8E',
}: EmployeeProfileSidebarProps) {
  if (!employee) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-[#000000] border-l border-[#333333] z-50 overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-[#000000] border-b border-[#333333] p-6 z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] font-semibold text-[#E0E0E0]">Employee Profile</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#1F1F1F] rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-[#9CA3AF]" />
            </button>
          </div>

          {/* Employee Header */}
          <div className="flex items-center gap-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-white text-[24px] font-semibold ring-4 ring-[#1F1F1F]"
              style={{ backgroundColor: departmentColor }}
            >
              {employee.avatar}
            </div>
            <div className="flex-1">
              <h3 className="text-[18px] font-semibold text-[#E0E0E0] mb-1">{employee.name}</h3>
              <p className="text-[14px] text-[#9CA3AF] mb-2">{employee.role}</p>
              <span
                className={`inline-flex px-3 py-1 rounded-full text-[13px] font-medium ${
                  employee.status === 'Active'
                    ? 'bg-[#00BF6B]/10 text-[#00BF6B]'
                    : 'bg-[#FFC107]/10 text-[#FFC107]'
                }`}
              >
                {employee.status}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Contact Information */}
          <div className="bg-[#121212] rounded-xl p-5 border border-[#333333]">
            <h4 className="text-[16px] font-semibold text-[#E0E0E0] mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#1F1F1F] rounded-lg">
                  <Mail className="w-4 h-4 text-[#009F8E]" />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] text-[#6B7280]">Email</p>
                  <p className="text-[14px] text-[#E0E0E0]">{employee.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#1F1F1F] rounded-lg">
                  <Phone className="w-4 h-4 text-[#009F8E]" />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] text-[#6B7280]">Phone</p>
                  <p className="text-[14px] text-[#E0E0E0]">{employee.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#1F1F1F] rounded-lg">
                  <MapPin className="w-4 h-4 text-[#009F8E]" />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] text-[#6B7280]">Location</p>
                  <p className="text-[14px] text-[#E0E0E0]">{employee.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Employment Details */}
          <div className="bg-[#121212] rounded-xl p-5 border border-[#333333]">
            <h4 className="text-[16px] font-semibold text-[#E0E0E0] mb-4">Employment Details</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#9CA3AF]" />
                  <span className="text-[14px] text-[#9CA3AF]">Employee ID</span>
                </div>
                <span className="text-[14px] font-medium text-[#E0E0E0]">
                  {employee.employeeId}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#9CA3AF]" />
                  <span className="text-[14px] text-[#9CA3AF]">Department</span>
                </div>
                <span className="text-[14px] font-medium text-[#E0E0E0]">
                  {employee.department}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#9CA3AF]" />
                  <span className="text-[14px] text-[#9CA3AF]">Join Date</span>
                </div>
                <span className="text-[14px] font-medium text-[#E0E0E0]">{employee.joinDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#9CA3AF]" />
                  <span className="text-[14px] text-[#9CA3AF]">Reports To</span>
                </div>
                <span className="text-[14px] font-medium text-[#E0E0E0]">{employee.manager}</span>
              </div>
            </div>
          </div>

          {/* Performance Overview */}
          <div className="bg-[#121212] rounded-xl p-5 border border-[#333333]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[16px] font-semibold text-[#E0E0E0]">Performance</h4>
              <span className="text-[20px] font-semibold text-[#009F8E]">
                {employee.performance}%
              </span>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={performanceTrend}>
                <defs>
                  <linearGradient
                    id={`perfGradient-emp-${employee.id}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={departmentColor} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={departmentColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#333333"
                  key={`grid-emp-${employee.id}`}
                />
                <XAxis
                  dataKey="month"
                  stroke="#9CA3AF"
                  style={{ fontSize: '11px' }}
                  key={`xaxis-emp-${employee.id}`}
                />
                <YAxis
                  stroke="#9CA3AF"
                  style={{ fontSize: '11px' }}
                  key={`yaxis-emp-${employee.id}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F1F1F',
                    border: '1px solid #333333',
                    borderRadius: '8px',
                    color: '#E0E0E0',
                    fontSize: '12px',
                  }}
                  key={`tooltip-emp-${employee.id}`}
                />
                <Area
                  type="monotone"
                  dataKey="performance"
                  stroke={departmentColor}
                  strokeWidth={2}
                  fill={`url(#perfGradient-emp-${employee.id})`}
                  key={`area-emp-${employee.id}`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Statistics */}
          {employee.stats && (
            <div className="bg-[#121212] rounded-xl p-5 border border-[#333333]">
              <h4 className="text-[16px] font-semibold text-[#E0E0E0] mb-4">Statistics</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[14px] text-[#9CA3AF]">Tasks Completed</span>
                    <span className="text-[14px] font-medium text-[#E0E0E0]">
                      {employee.stats.tasksCompleted}/{employee.stats.totalTasks}
                    </span>
                  </div>
                  <div className="h-2 bg-[#1F1F1F] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(employee.stats.tasksCompleted / employee.stats.totalTasks) * 100}%`,
                        backgroundColor: departmentColor,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[14px] text-[#9CA3AF]">Attendance Rate</span>
                    <span className="text-[14px] font-medium text-[#E0E0E0]">
                      {employee.stats.attendanceRate}%
                    </span>
                  </div>
                  <div className="h-2 bg-[#1F1F1F] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${employee.stats.attendanceRate}%`,
                        backgroundColor: departmentColor,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[14px] text-[#9CA3AF]">Leaves Taken</span>
                    <span className="text-[14px] font-medium text-[#E0E0E0]">
                      {employee.stats.leavesTaken}/{employee.stats.totalLeaves}
                    </span>
                  </div>
                  <div className="h-2 bg-[#1F1F1F] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all bg-[#FFC107]"
                      style={{
                        width: `${(employee.stats.leavesTaken / employee.stats.totalLeaves) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Activity */}
          {employee.recentActivity && (
            <div className="bg-[#121212] rounded-xl p-5 border border-[#333333]">
              <h4 className="text-[16px] font-semibold text-[#E0E0E0] mb-4">Recent Activity</h4>
              <div className="space-y-3">
                {employee.recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 pb-3 border-b border-[#333333] last:border-0 last:pb-0"
                  >
                    <div className="p-2 bg-[#1F1F1F] rounded-lg mt-0.5">
                      <Clock className="w-3.5 h-3.5" style={{ color: departmentColor }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] text-[#E0E0E0] mb-1">{activity.action}</p>
                      <p className="text-[12px] text-[#6B7280]">
                        {activity.date} at {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-[#121212] rounded-xl p-5 border border-[#333333]">
            <h4 className="text-[16px] font-semibold text-[#E0E0E0] mb-4">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-lg transition-colors group">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#009F8E] transition-colors" />
                  <span className="text-[14px] text-[#E0E0E0]">Send Message</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#6B7280]" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-lg transition-colors group">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#009F8E] transition-colors" />
                  <span className="text-[14px] text-[#E0E0E0]">View Full Profile</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#6B7280]" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-lg transition-colors group">
                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#009F8E] transition-colors" />
                  <span className="text-[14px] text-[#E0E0E0]">Assign Task</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#6B7280]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
