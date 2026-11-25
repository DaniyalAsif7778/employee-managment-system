import { StatusBadge } from '../../componenets/ui/StatusBadge.js'
import { PriorityBadge } from '../../componenets/ui/PriorityBadge.js'
import { Calendar } from 'lucide-react'
import { Link } from 'react-router'
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

const myTasks = [
  {
    id: 1,
    name: 'Review project proposal',
    priority: 'high' as const,
    dueDate: '2026-03-29',
    status: 'in-progress' as const,
  },
  {
    id: 2,
    name: 'Complete quarterly report',
    priority: 'high' as const,
    dueDate: '2026-03-29',
    status: 'in-progress' as const,
  },
  {
    id: 3,
    name: 'Team standup meeting',
    priority: 'medium' as const,
    dueDate: '2026-03-29',
    status: 'pending' as const,
  },
  {
    id: 4,
    name: 'Update documentation',
    priority: 'low' as const,
    dueDate: '2026-03-30',
    status: 'in-progress' as const,
  },
  {
    id: 5,
    name: 'Code review for PR #245',
    priority: 'medium' as const,
    dueDate: '2026-03-30',
    status: 'in-progress' as const,
  },
]

const schedule = [
  { id: 1, time: '09:00 AM', title: 'Team Standup', type: 'meeting' },
  { id: 2, time: '11:00 AM', title: 'Project Review', type: 'meeting' },
  { id: 3, time: '02:00 PM', title: 'Client Presentation', type: 'meeting' },
  { id: 4, time: '04:00 PM', title: '1-on-1 with Manager', type: 'meeting' },
]

const taskStatuses = ['pending', 'in-progress', 'done']
const taskStatusData = taskStatuses
  .map((status) => ({
    status: status.replace('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()),
    count: myTasks.filter((task) => task.status === status).length,
  }))
  .filter((entry) => entry.count > 0)
const priorityColors: Record<string, string> = {
  high: '#EF4444',
  medium: '#FFC107',
  low: '#009F8E',
}
const taskPriorityData = ['high', 'medium', 'low']
  .map((priority) => ({
    priority: priority.charAt(0).toUpperCase() + priority.slice(1),
    count: myTasks.filter((task) => task.priority === priority).length,
    color: priorityColors[priority] ?? '#009F8E',
  }))
  .filter((entry) => entry.count > 0)

export default function EmployeeDashboard() {
  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">Welcome back, John!</h1>
        <p className="text-[15px] text-[#9CA3AF]">Here's what's on your plate today.</p>
      </div>

      <section
        className="mb-8 grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-2"
        aria-label="My task charts"
      >
        <article className="min-w-0 rounded-xl border border-[#333333] bg-[#121212] p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-[18px] font-semibold text-[#E0E0E0]">Tasks by status</h2>
            <p className="mt-1 text-sm text-[#9CA3AF]">Breakdown of your sample task list</p>
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
                        fill={['#FFC107', '#009F8E', '#12C4D3'][index % 3] ?? '#009F8E'}
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
                No tasks to chart.
              </p>
            )}
          </div>
        </article>
        <article className="min-w-0 rounded-xl border border-[#333333] bg-[#121212] p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-[18px] font-semibold text-[#E0E0E0]">Tasks by priority</h2>
            <p className="mt-1 text-sm text-[#9CA3AF]">
              Priority counts from your sample task list
            </p>
          </div>
          <div className="h-64 min-w-0">
            {taskPriorityData.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={taskPriorityData}
                  margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
                >
                  <CartesianGrid stroke="#333333" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="priority" stroke="#9CA3AF" tickLine={false} axisLine={false} />
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
                    {taskPriorityData.map((entry) => (
                      <Cell key={entry.priority} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="flex h-full items-center justify-center text-sm text-[#9CA3AF]">
                No tasks to chart.
              </p>
            )}
          </div>
        </article>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Tasks */}
        <div className="lg:col-span-2">
          <div className="bg-[#121212] rounded-xl border border-[#333333] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#333333] flex items-center justify-between">
              <h2 className="text-[18px] font-semibold text-[#E0E0E0]">My Tasks</h2>
              <Link
                to="/employee/tasks"
                className="text-[15px] text-[#009F8E] hover:text-[#12C4D3] font-medium transition-colors"
              >
                View All
              </Link>
            </div>

            <div className="divide-y divide-[#333333]">
              {myTasks.map((task) => (
                <div key={task.id} className="p-4 hover:bg-[#1F1F1F] transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-[15px] font-medium text-[#E0E0E0] mb-2">{task.name}</h3>
                      <div className="flex items-center gap-2">
                        <PriorityBadge priority={task.priority} size="sm" />
                        <span className="text-[13px] text-[#9CA3AF]">Due: {task.dueDate}</span>
                      </div>
                    </div>
                    <StatusBadge status={task.status} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Schedule */}
        <div className="lg:col-span-1">
          <div className="bg-[#121212] rounded-xl border border-[#333333] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#333333]">
              <h2 className="text-[18px] font-semibold text-[#E0E0E0]">Today's Schedule</h2>
            </div>

            <div className="p-4 space-y-3">
              {schedule.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-lg hover:bg-[#1F1F1F] transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-[#009F8E1A] flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#009F8E]" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-medium text-[#E0E0E0] mb-1">{item.title}</div>
                    <div className="text-[14px] text-[#9CA3AF]">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
