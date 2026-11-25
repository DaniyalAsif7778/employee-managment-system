import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { Download, TrendingUp } from 'lucide-react'

const memberPerformance = [
  { name: 'Alex M.', completed: 42, active: 5, rate: 89 },
  { name: 'Jessica W.', completed: 38, active: 3, rate: 93 },
  { name: 'Ryan C.', completed: 55, active: 6, rate: 85 },
  { name: 'Chris L.', completed: 71, active: 4, rate: 96 },
  { name: 'Priya S.', completed: 60, active: 7, rate: 90 },
  { name: 'Daniel P.', completed: 48, active: 4, rate: 92 },
]

const weeklyProgress = [
  { week: 'Wk 1', tasks: 24, completed: 20 },
  { week: 'Wk 2', tasks: 30, completed: 27 },
  { week: 'Wk 3', tasks: 28, completed: 25 },
  { week: 'Wk 4', tasks: 35, completed: 32 },
  { week: 'Wk 5', tasks: 32, completed: 30 },
  { week: 'Wk 6', tasks: 38, completed: 36 },
]

const taskDistribution = [
  { name: 'Development', value: 45, color: '#8B5CF6' },
  { name: 'QA & Testing', value: 20, color: '#12C4D3' },
  { name: 'Planning', value: 15, color: '#FFC107' },
  { name: 'DevOps', value: 12, color: '#009F8E' },
  { name: 'Design', value: 8, color: '#EC4899' },
]

const customTooltipStyle = {
  backgroundColor: '#1F1F1F',
  border: '1px solid #333333',
  borderRadius: '8px',
  color: '#E0E0E0',
  fontSize: '14px',
}

export default function ManagerReports() {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">Team Reports</h1>
          <p className="text-[15px] text-[#9CA3AF]">
            Performance and productivity analytics for your team
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-all duration-200 text-[15px] font-medium">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Tasks', value: '314', change: '+18%', positive: true },
          { label: 'Completed', value: '287', change: '+12%', positive: true },
          { label: 'Avg Performance', value: '91%', change: '+3%', positive: true },
          { label: 'On-Time Rate', value: '88%', change: '-2%', positive: false },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#121212] rounded-xl border border-[#333333] p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#8B5CF61A] flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <span className="text-[14px] text-[#9CA3AF]">{kpi.label}</span>
            </div>
            <div className="text-[26px] font-semibold text-[#E0E0E0] mb-1">{kpi.value}</div>
            <div
              className={`text-[13px] font-medium ${kpi.positive ? 'text-[#00BF6B]' : 'text-[#EF4444]'}`}
            >
              {kpi.change} vs last month
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Member Performance */}
        <div className="bg-[#121212] rounded-xl border border-[#333333] p-6">
          <h2 className="text-[18px] font-semibold text-[#E0E0E0] mb-6">Member Task Completion</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={memberPerformance} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis dataKey="name" stroke="#6B7280" tick={{ fontSize: 12 }} />
              <YAxis stroke="#6B7280" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Bar
                key="bar-completed"
                dataKey="completed"
                name="Completed"
                fill="#8B5CF6"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                key="bar-active"
                dataKey="active"
                name="Active"
                fill="#8B5CF633"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Progress */}
        <div className="bg-[#121212] rounded-xl border border-[#333333] p-6">
          <h2 className="text-[18px] font-semibold text-[#E0E0E0] mb-6">Weekly Task Progress</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyProgress} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis dataKey="week" stroke="#6B7280" tick={{ fontSize: 12 }} />
              <YAxis stroke="#6B7280" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Line
                key="line-tasks"
                type="monotone"
                dataKey="tasks"
                name="Assigned"
                stroke="#6B7280"
                strokeWidth={2}
                dot={false}
              />
              <Line
                key="line-completed"
                type="monotone"
                dataKey="completed"
                name="Completed"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={{ fill: '#8B5CF6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Distribution Pie */}
        <div className="bg-[#121212] rounded-xl border border-[#333333] p-6">
          <h2 className="text-[18px] font-semibold text-[#E0E0E0] mb-6">Task Categories</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={taskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {taskDistribution.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={customTooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '13px', color: '#9CA3AF' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Table */}
        <div className="lg:col-span-2 bg-[#121212] rounded-xl border border-[#333333] p-6">
          <h2 className="text-[18px] font-semibold text-[#E0E0E0] mb-6">Individual Performance</h2>
          <div className="space-y-4">
            {memberPerformance.map((member) => (
              <div key={member.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[15px] text-[#E0E0E0] font-medium">{member.name}</span>
                  <span className="text-[15px] font-semibold text-[#8B5CF6]">{member.rate}%</span>
                </div>
                <div className="h-2 bg-[#333333] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#8B5CF6] transition-all"
                    style={{ width: `${member.rate}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[12px] text-[#6B7280]">{member.completed} completed</span>
                  <span className="text-[12px] text-[#6B7280]">{member.active} active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
