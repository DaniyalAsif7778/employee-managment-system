import { StatusBadge } from '../../componenets/ui/StatusBadge.js'
import { Building2, MoreVertical, Plus, MessageSquare } from 'lucide-react'
import { Link } from 'react-router'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { workspaceFixtures } from '../../lib/workspaceFixtures.js'

const chartColors = ['#009F8E', '#12C4D3', '#FFC107', '#8B5CF6', '#EF4444', '#00BF6B']
const taskStatusData = ['pending', 'in-progress', 'done', 'overdue', 'on-hold', 'cancelled']
  .map((status, index) => ({
    status: status.replace('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()),
    count: workspaceFixtures.tasks.filter((task) => task.status === status).length,
    color: chartColors[index % chartColors.length] ?? '#009F8E',
  }))
  .filter((entry) => entry.count > 0)
const departmentHeadcount = workspaceFixtures.departments.map((department) => ({
  name: department.name,
  employees: department.employeeCount,
  color: department.color || '#009F8E',
}))
const workforceTrend = workspaceFixtures.reportTrends.map((trend) => ({
  period: trend.period,
  completed: trend.completed,
  onTime: trend.onTime,
}))
const employeeStatusData = ['active', 'on-leave', 'inactive', 'terminated']
  .map((status, index) => ({
    status: status.replace('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()),
    count: workspaceFixtures.employees.filter((employee) => employee.status === status).length,
    color: chartColors[index % chartColors.length] ?? '#009F8E',
  }))
  .filter((entry) => entry.count > 0)

const recentTasks = [
  {
    id: 1,
    title: 'Update employee handbook',
    assignee: 'Sarah Johnson',
    status: 'in-progress' as const,
    dueDate: 'Mar 30',
  },
  {
    id: 2,
    title: 'Q1 Performance reviews',
    assignee: 'Michael Chen',
    status: 'pending' as const,
    dueDate: 'Mar 31',
  },
  {
    id: 3,
    title: 'Onboard new hires',
    assignee: 'Emily Davis',
    status: 'done' as const,
    dueDate: 'Mar 28',
  },
  {
    id: 4,
    title: 'Department budget planning',
    assignee: 'David Wilson',
    status: 'in-progress' as const,
    dueDate: 'Apr 05',
  },
]

const recentHires = [
  {
    id: 1,
    name: 'Alex Martinez',
    role: 'Software Engineer',
    department: 'Engineering',
    date: 'Mar 28, 2026',
  },
  {
    id: 2,
    name: 'Jessica Wong',
    role: 'Product Designer',
    department: 'Design',
    date: 'Mar 25, 2026',
  },
  {
    id: 3,
    name: 'Ryan Cooper',
    role: 'Data Analyst',
    department: 'Analytics',
    date: 'Mar 22, 2026',
  },
]

export default function AdminDashboard() {
  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">Dashboard</h1>
        <p className="text-[15px] text-[#9CA3AF]">Welcome back! Here's what's happening today.</p>
      </div>

      <section className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2" aria-label="Workforce charts">
        <article className="min-w-0 rounded-xl border border-[#333333] bg-[#121212] p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-[18px] font-semibold text-[#E0E0E0]">Task completion trend</h2>
            <p className="mt-1 text-sm text-[#9CA3AF]">
              Completed and on-time tasks by reporting period
            </p>
          </div>
          <div className="h-64 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={workforceTrend} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid stroke="#333333" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="period" stroke="#9CA3AF" tickLine={false} axisLine={false} />
                <YAxis stroke="#9CA3AF" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F1F1F',
                    border: '1px solid #333333',
                    borderRadius: 8,
                    color: '#E0E0E0',
                  }}
                />
                <Legend wrapperStyle={{ color: '#9CA3AF', fontSize: 12 }} />
                <Area
                  type="monotone"
                  dataKey="completed"
                  name="Completed"
                  stroke="#009F8E"
                  fill="#009F8E"
                  fillOpacity={0.18}
                />
                <Area
                  type="monotone"
                  dataKey="onTime"
                  name="On time"
                  stroke="#12C4D3"
                  fill="#12C4D3"
                  fillOpacity={0.12}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>
        <article className="min-w-0 rounded-xl border border-[#333333] bg-[#121212] p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-[18px] font-semibold text-[#E0E0E0]">Employees by department</h2>
            <p className="mt-1 text-sm text-[#9CA3AF]">Sample headcount distribution</p>
          </div>
          <div className="h-64 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentHeadcount}
                  dataKey="employees"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={92}
                  paddingAngle={3}
                >
                  {departmentHeadcount.map((department) => (
                    <Cell key={department.name} fill={department.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F1F1F',
                    border: '1px solid #333333',
                    borderRadius: 8,
                    color: '#E0E0E0',
                  }}
                />
                <Legend wrapperStyle={{ color: '#9CA3AF', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </article>
        <article className="min-w-0 rounded-xl border border-[#333333] bg-[#121212] p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-[18px] font-semibold text-[#E0E0E0]">Tasks by status</h2>
            <p className="mt-1 text-sm text-[#9CA3AF]">
              Distribution from the workspace task records
            </p>
          </div>
          <div className="h-64 min-w-0">
            {taskStatusData.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taskStatusData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid stroke="#333333" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="status" stroke="#9CA3AF" tickLine={false} axisLine={false} />
                  <YAxis allowDecimals={false} stroke="#9CA3AF" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F1F1F',
                      border: '1px solid #333333',
                      borderRadius: 8,
                      color: '#E0E0E0',
                    }}
                  />
                  <Bar dataKey="count" name="Tasks" radius={[4, 4, 0, 0]}>
                    {taskStatusData.map((entry) => (
                      <Cell key={entry.status} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="flex h-full items-center justify-center text-sm text-[#9CA3AF]">
                No task records yet.
              </p>
            )}
          </div>
        </article>
        <article className="min-w-0 rounded-xl border border-[#333333] bg-[#121212] p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-[18px] font-semibold text-[#E0E0E0]">Employee status</h2>
            <p className="mt-1 text-sm text-[#9CA3AF]">Current workforce record distribution</p>
          </div>
          <div className="h-64 min-w-0">
            {employeeStatusData.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={employeeStatusData}
                    dataKey="count"
                    nameKey="status"
                    innerRadius={58}
                    outerRadius={92}
                    paddingAngle={3}
                  >
                    {employeeStatusData.map((entry) => (
                      <Cell key={entry.status} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F1F1F',
                      border: '1px solid #333333',
                      borderRadius: 8,
                      color: '#E0E0E0',
                    }}
                  />
                  <Legend wrapperStyle={{ color: '#9CA3AF', fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="flex h-full items-center justify-center text-sm text-[#9CA3AF]">
                No employee records yet.
              </p>
            )}
          </div>
        </article>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tasks */}
        <div className="lg:col-span-2 bg-[#121212] rounded-xl border border-[#333333] overflow-hidden">
          <div className="p-6 border-b border-[#333333] flex items-center justify-between">
            <div>
              <h2 className="text-[18px] font-semibold text-[#E0E0E0]">Recent Tasks</h2>
              <p className="text-[14px] text-[#9CA3AF] mt-1">Track ongoing project tasks</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#009F8E] text-white rounded-lg hover:bg-[#12C4D3] transition-all duration-200 text-[15px] font-medium">
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#333333]">
                  <th className="text-left py-4 px-6 text-[14px] font-medium text-[#9CA3AF]">
                    Task
                  </th>
                  <th className="text-left py-4 px-6 text-[14px] font-medium text-[#9CA3AF]">
                    Assignee
                  </th>
                  <th className="text-left py-4 px-6 text-[14px] font-medium text-[#9CA3AF]">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-[14px] font-medium text-[#9CA3AF]">
                    Due Date
                  </th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {recentTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-b border-[#333333] last:border-0 hover:bg-[#1F1F1F] transition-colors"
                  >
                    <td className="py-4 px-6 text-[15px] text-[#E0E0E0] font-medium">
                      {task.title}
                    </td>
                    <td className="py-4 px-6 text-[15px] text-[#9CA3AF]">{task.assignee}</td>
                    <td className="py-4 px-6">
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="py-4 px-6 text-[15px] text-[#9CA3AF]">{task.dueDate}</td>
                    <td className="py-4 px-6">
                      <button className="p-1 hover:bg-[#1F1F1F] rounded transition-colors">
                        <MoreVertical className="w-4 h-4 text-[#9CA3AF]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Hires */}
        <div className="bg-[#121212] rounded-xl border border-[#333333] overflow-hidden">
          <div className="p-6 border-b border-[#333333]">
            <h2 className="text-[18px] font-semibold text-[#E0E0E0]">Recent Hires</h2>
            <p className="text-[14px] text-[#9CA3AF] mt-1">New team members</p>
          </div>
          <div className="p-6 space-y-4">
            {recentHires.map((hire) => (
              <div
                key={hire.id}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-[#1F1F1F] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#009F8E] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[14px] font-medium">
                    {hire.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-medium text-[#E0E0E0] truncate">{hire.name}</h3>
                  <p className="text-[14px] text-[#9CA3AF] truncate">{hire.role}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[13px] text-[#6B7280]">{hire.department}</span>
                    <span className="text-[#333333]">•</span>
                    <span className="text-[13px] text-[#6B7280]">{hire.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="employees"
          className="p-6 bg-[#121212] border border-[#333333] rounded-xl hover:border-[#009F8E] transition-all duration-200 text-left group"
        >
          <div className="w-12 h-12 rounded-xl bg-[#009F8E1A] flex items-center justify-center mb-4 group-hover:bg-[#009F8E] transition-colors">
            <Plus className="w-5 h-5 text-[#009F8E] group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-[16px] font-semibold text-[#E0E0E0] mb-1">Add Employee</h3>
          <p className="text-[14px] text-[#9CA3AF]">Onboard new team members</p>
        </Link>
        <Link
          to="messages"
          className="p-6 bg-[#121212] border border-[#333333] rounded-xl hover:border-[#12C4D3] transition-all duration-200 text-left group"
        >
          <div className="w-12 h-12 rounded-xl bg-[#12C4D31A] flex items-center justify-center mb-4 group-hover:bg-[#12C4D3] transition-colors">
            <MessageSquare className="w-5 h-5 text-[#12C4D3] group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-[16px] font-semibold text-[#E0E0E0] mb-1">View Messages</h3>
          <p className="text-[14px] text-[#9CA3AF]">Check team communications</p>
        </Link>
        <Link
          to="reports"
          className="p-6 bg-[#121212] border border-[#333333] rounded-xl hover:border-[#FFC107] transition-all duration-200 text-left group"
        >
          <div className="w-12 h-12 rounded-xl bg-[#FFC1071A] flex items-center justify-center mb-4 group-hover:bg-[#FFC107] transition-colors">
            <Building2 className="w-5 h-5 text-[#FFC107] group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-[16px] font-semibold text-[#E0E0E0] mb-1">View Reports</h3>
          <p className="text-[14px] text-[#9CA3AF]">Analyze department performance</p>
        </Link>
      </div>
    </>
  )
}
