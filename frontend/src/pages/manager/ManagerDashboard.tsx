import { StatusBadge } from '../../componenets/ui/StatusBadge.js'
import { CheckCircle, Users, XCircle } from 'lucide-react'
import { Link } from 'react-router'
import { useState } from 'react'
import {
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

const pendingLeaves = [
  {
    id: 1,
    name: 'Alex Martinez',
    avatar: 'AM',
    type: 'Vacation',
    from: 'Apr 20',
    to: 'Apr 25',
    days: 6,
  },
  {
    id: 2,
    name: 'Jessica Wong',
    avatar: 'JW',
    type: 'Sick Leave',
    from: 'Mar 30',
    to: 'Mar 31',
    days: 2,
  },
  {
    id: 3,
    name: 'Ryan Cooper',
    avatar: 'RC',
    type: 'Personal',
    from: 'Apr 5',
    to: 'Apr 5',
    days: 1,
  },
  {
    id: 4,
    name: 'Chris Lee',
    avatar: 'CL',
    type: 'Vacation',
    from: 'Apr 10',
    to: 'Apr 14',
    days: 5,
  },
]

const recentTasks = [
  {
    id: 1,
    title: 'Q2 Feature Roadmap',
    assignee: 'Alex Martinez',
    status: 'in-progress' as const,
    dueDate: 'Apr 5',
  },
  {
    id: 2,
    title: 'API Integration Review',
    assignee: 'Jessica Wong',
    status: 'pending' as const,
    dueDate: 'Apr 3',
  },
  {
    id: 3,
    title: 'Performance Optimization',
    assignee: 'Ryan Cooper',
    status: 'in-progress' as const,
    dueDate: 'Apr 8',
  },
  {
    id: 4,
    title: 'Security Audit',
    assignee: 'Chris Lee',
    status: 'done' as const,
    dueDate: 'Mar 28',
  },
]

const teamMembers = [
  {
    id: 1,
    name: 'Alex Martinez',
    role: 'Software Engineer',
    avatar: 'AM',
    status: 'online',
    tasksCompleted: 8,
  },
  {
    id: 2,
    name: 'Jessica Wong',
    role: 'Product Designer',
    avatar: 'JW',
    status: 'online',
    tasksCompleted: 6,
  },
  {
    id: 3,
    name: 'Ryan Cooper',
    role: 'Data Analyst',
    avatar: 'RC',
    status: 'away',
    tasksCompleted: 5,
  },
  {
    id: 4,
    name: 'Chris Lee',
    role: 'Backend Developer',
    avatar: 'CL',
    status: 'offline',
    tasksCompleted: 9,
  },
]

const statusColors: Record<string, string> = {
  online: '#00BF6B',
  away: '#FFC107',
  offline: '#6B7280',
}
const taskStatusData = ['pending', 'in-progress', 'done']
  .map((status) => ({
    status: status.replace('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()),
    count: recentTasks.filter((task) => task.status === status).length,
  }))
  .filter((entry) => entry.count > 0)
const memberTaskData = teamMembers.map((member) => ({
  member: member.name.split(' ')[0],
  tasks: member.tasksCompleted,
}))

export default function ManagerDashboard() {
  const [leaves, setLeaves] = useState(pendingLeaves)

  const handleApprove = (id: number) => setLeaves((prev) => prev.filter((l) => l.id !== id))
  const handleReject = (id: number) => setLeaves((prev) => prev.filter((l) => l.id !== id))

  return (
    <>
      <div className="mb-8">
        <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">Manager Dashboard</h1>
        <p className="text-[15px] text-[#9CA3AF]">
          Overview of your team's activity and pending actions.
        </p>
      </div>

      <section
        className="mb-8 grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-2"
        aria-label="Team activity charts"
      >
        <article className="min-w-0 rounded-xl border border-[#333333] bg-[#121212] p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-[18px] font-semibold text-[#E0E0E0]">Team tasks by status</h2>
            <p className="mt-1 text-sm text-[#9CA3AF]">
              Distribution from the recent team task list
            </p>
          </div>
          <div className="h-64 min-w-0">
            {taskStatusData.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    dataKey="count"
                    nameKey="status"
                    innerRadius={58}
                    outerRadius={92}
                    paddingAngle={3}
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell
                        key={entry.status}
                        fill={['#FFC107', '#8B5CF6', '#00BF6B'][index % 3] ?? '#8B5CF6'}
                      />
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
                No team tasks to chart.
              </p>
            )}
          </div>
        </article>
        <article className="min-w-0 rounded-xl border border-[#333333] bg-[#121212] p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-[18px] font-semibold text-[#E0E0E0]">Completed tasks by member</h2>
            <p className="mt-1 text-sm text-[#9CA3AF]">
              Completed task totals from team member sample records
            </p>
          </div>
          <div className="h-64 min-w-0">
            {memberTaskData.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={memberTaskData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid stroke="#333333" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="member" stroke="#9CA3AF" tickLine={false} axisLine={false} />
                  <YAxis allowDecimals={false} stroke="#9CA3AF" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F1F1F',
                      border: '1px solid #333333',
                      borderRadius: 8,
                      color: '#E0E0E0',
                    }}
                  />
                  <Bar
                    dataKey="tasks"
                    name="Completed tasks"
                    fill="#8B5CF6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="flex h-full items-center justify-center text-sm text-[#9CA3AF]">
                No team members to chart.
              </p>
            )}
          </div>
        </article>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Recent Tasks */}
        <div className="lg:col-span-2 bg-[#121212] rounded-xl border border-[#333333] overflow-hidden">
          <div className="p-6 border-b border-[#333333] flex items-center justify-between">
            <div>
              <h2 className="text-[18px] font-semibold text-[#E0E0E0]">Team Tasks</h2>
              <p className="text-[14px] text-[#9CA3AF] mt-1">Recent team assignments</p>
            </div>
            <Link
              to="/manager/tasks"
              className="text-[15px] text-[#8B5CF6] hover:text-[#A78BFA] font-medium transition-colors"
            >
              View All
            </Link>
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
                    Due
                  </th>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-[#121212] rounded-xl border border-[#333333] overflow-hidden">
          <div className="p-6 border-b border-[#333333] flex items-center justify-between">
            <h2 className="text-[18px] font-semibold text-[#E0E0E0]">Team Status</h2>
            <Link
              to="/manager/team"
              className="text-[15px] text-[#8B5CF6] hover:text-[#A78BFA] font-medium transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="p-4 space-y-3">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1F1F1F] transition-colors"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#8B5CF6] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[13px] font-medium">{member.avatar}</span>
                  </div>
                  <div
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#121212]"
                    style={{ backgroundColor: statusColors[member.status] }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-medium text-[#E0E0E0] truncate">
                    {member.name}
                  </div>
                  <div className="text-[13px] text-[#9CA3AF]">{member.role}</div>
                </div>
                <div className="text-right">
                  <div className="text-[15px] font-semibold text-[#E0E0E0]">
                    {member.tasksCompleted}
                  </div>
                  <div className="text-[12px] text-[#6B7280]">tasks</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Leave Approvals */}
      <div className="bg-[#121212] rounded-xl border border-[#333333] overflow-hidden">
        <div className="p-6 border-b border-[#333333] flex items-center justify-between">
          <div>
            <h2 className="text-[18px] font-semibold text-[#E0E0E0]">Pending Leave Approvals</h2>
            <p className="text-[14px] text-[#9CA3AF] mt-1">
              {leaves.length} request{leaves.length !== 1 ? 's' : ''} awaiting your review
            </p>
          </div>
          <Link
            to="/manager/leave-approvals"
            className="text-[15px] text-[#8B5CF6] hover:text-[#A78BFA] font-medium transition-colors"
          >
            View All
          </Link>
        </div>
        {leaves.length === 0 ? (
          <div className="p-8 text-center text-[#6B7280] text-[15px]">
            All caught up! No pending leave requests.
          </div>
        ) : (
          <div className="divide-y divide-[#333333]">
            {leaves.map((leave) => (
              <div
                key={leave.id}
                className="flex items-center gap-4 p-5 hover:bg-[#1A1A1A] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#8B5CF6] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[13px] font-medium">{leave.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-medium text-[#E0E0E0]">{leave.name}</div>
                  <div className="text-[14px] text-[#9CA3AF]">
                    {leave.type} · {leave.from} – {leave.to} ({leave.days} days)
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(leave.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00BF6B1A] text-[#00BF6B] rounded-lg hover:bg-[#00BF6B] hover:text-white transition-all duration-200 text-[14px] font-medium"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(leave.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EF44441A] text-[#EF4444] rounded-lg hover:bg-[#EF4444] hover:text-white transition-all duration-200 text-[14px] font-medium"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
