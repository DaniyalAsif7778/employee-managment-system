import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  PieChart,
  Pie,
  Legend,
  AreaChart,
  Area,
} from 'recharts'
import { TrendingUp, TrendingDown, Download } from 'lucide-react'

const employeePerformance = [
  { name: 'Sarah Johnson', completed: 28, total: 32, rate: 87.5 },
  { name: 'Michael Chen', completed: 24, total: 28, rate: 85.7 },
  { name: 'David Wilson', completed: 31, total: 35, rate: 88.6 },
  { name: 'Lisa Anderson', completed: 22, total: 26, rate: 84.6 },
  { name: 'Emily Davis', completed: 19, total: 24, rate: 79.2 },
]

const departmentData = [
  { name: 'HR', completion: 85 },
  { name: 'Finance', completion: 92 },
  { name: 'IT', completion: 88 },
  { name: 'Marketing', completion: 79 },
  { name: 'Sales', completion: 95 },
  { name: 'Operations', completion: 82 },
]

const monthlyTrends = [
  { month: 'Jan', tasks: 120, completed: 108, employees: 240 },
  { month: 'Feb', tasks: 135, completed: 125, employees: 242 },
  { month: 'Mar', tasks: 148, completed: 140, employees: 247 },
  { month: 'Apr', tasks: 142, completed: 135, employees: 247 },
  { month: 'May', tasks: 156, completed: 148, employees: 250 },
  { month: 'Jun', tasks: 165, completed: 158, employees: 252 },
]

const taskDistribution = [
  { name: 'Completed', value: 156, color: '#00BF6B' },
  { name: 'In Progress', value: 38, color: '#12C4D3' },
  { name: 'Pending', value: 24, color: '#FFC107' },
  { name: 'Overdue', value: 8, color: '#EF4444' },
]

const productivityData = [
  { week: 'Week 1', productivity: 78 },
  { week: 'Week 2', productivity: 82 },
  { week: 'Week 3', productivity: 85 },
  { week: 'Week 4', productivity: 89 },
]

const COLORS = ['#009F8E', '#12C4D3', '#00BF6B', '#FFC107', '#EF4444', '#8B5CF6']

export default function AdminReports() {
  return (
    <>
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">Reports & Analytics</h1>
          <p className="text-[15px] text-[#9CA3AF]">
            Comprehensive insights and performance metrics
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#009F8E] text-white rounded-lg hover:bg-[#12C4D3] transition-all duration-200 text-[15px] font-medium">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="text-[14px] text-[#9CA3AF] mb-2 font-medium">Overall Completion Rate</div>
          <div className="text-[30px] font-semibold text-[#E0E0E0] mb-2">87.3%</div>
          <div className="flex items-center gap-1.5 text-[13px] text-[#00BF6B] font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>5.2% from last month</span>
          </div>
        </div>
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="text-[14px] text-[#9CA3AF] mb-2 font-medium">Active Employees</div>
          <div className="text-[30px] font-semibold text-[#E0E0E0] mb-2">247</div>
          <div className="flex items-center gap-1.5 text-[13px] text-[#00BF6B] font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>12 new this month</span>
          </div>
        </div>
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="text-[14px] text-[#9CA3AF] mb-2 font-medium">Avg Tasks per Employee</div>
          <div className="text-[30px] font-semibold text-[#E0E0E0] mb-2">12.4</div>
          <div className="flex items-center gap-1.5 text-[13px] text-[#00BF6B] font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>2.1 from last month</span>
          </div>
        </div>
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="text-[14px] text-[#9CA3AF] mb-2 font-medium">On-Time Completion</div>
          <div className="text-[30px] font-semibold text-[#E0E0E0] mb-2">92.1%</div>
          <div className="flex items-center gap-1.5 text-[13px] text-[#EF4444] font-medium">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>1.3% from last month</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Department Performance Chart */}
        <div className="bg-[#121212] rounded-xl border border-[#333333] p-6">
          <h2 className="text-[18px] font-semibold text-[#E0E0E0] mb-6">
            Department Completion Rates
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis dataKey="name" stroke="#9CA3AF" style={{ fontSize: '14px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '14px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F1F1F',
                  border: '1px solid #333333',
                  borderRadius: '8px',
                  color: '#E0E0E0',
                }}
                cursor={{ fill: '#1F1F1F' }}
              />
              <Bar dataKey="completion" radius={[8, 8, 0, 0]}>
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length] ?? '#009F8E'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Task Distribution Pie Chart */}
        <div className="bg-[#121212] rounded-xl border border-[#333333] p-6">
          <h2 className="text-[18px] font-semibold text-[#E0E0E0] mb-6">Task Distribution</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={taskDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {taskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color ?? '#8884d8'} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F1F1F',
                  border: '1px solid #333333',
                  borderRadius: '8px',
                  color: '#E0E0E0',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trends Line Chart */}
        <div className="bg-[#121212] rounded-xl border border-[#333333] p-6">
          <h2 className="text-[18px] font-semibold text-[#E0E0E0] mb-6">Monthly Task Trends</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: '14px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '14px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F1F1F',
                  border: '1px solid #333333',
                  borderRadius: '8px',
                  color: '#E0E0E0',
                }}
              />
              <Legend wrapperStyle={{ color: '#9CA3AF' }} iconType="circle" />
              <Line
                type="monotone"
                dataKey="tasks"
                stroke="#009F8E"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#00BF6B"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Productivity Area Chart */}
        <div className="bg-[#121212] rounded-xl border border-[#333333] p-6">
          <h2 className="text-[18px] font-semibold text-[#E0E0E0] mb-6">
            Weekly Productivity Trend
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={productivityData}>
              <defs>
                <linearGradient id="colorProductivity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#009F8E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#009F8E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis dataKey="week" stroke="#9CA3AF" style={{ fontSize: '14px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '14px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F1F1F',
                  border: '1px solid #333333',
                  borderRadius: '8px',
                  color: '#E0E0E0',
                }}
              />
              <Area
                type="monotone"
                dataKey="productivity"
                stroke="#009F8E"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorProductivity)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Employee Performance Table */}
      <div className="bg-[#121212] rounded-xl border border-[#333333] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#333333]">
          <h2 className="text-[18px] font-semibold text-[#E0E0E0]">Top Performers</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#333333]">
              <tr>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                  Completed Tasks
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                  Total Tasks
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                  Completion Rate
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody>
              {employeePerformance.map((employee) => (
                <tr
                  key={employee.name}
                  className="border-b border-[#333333] last:border-0 hover:bg-[#1F1F1F] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#009F8E] flex items-center justify-center">
                        <span className="text-white text-[14px] font-medium">
                          {employee.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </span>
                      </div>
                      <span className="text-[15px] font-medium text-[#E0E0E0]">
                        {employee.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[15px] text-[#E0E0E0]">{employee.completed}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[15px] text-[#9CA3AF]">{employee.total}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[15px] font-medium text-[#E0E0E0]">{employee.rate}%</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-[#1F1F1F] rounded-full h-2">
                      <div
                        className="bg-[#009F8E] h-2 rounded-full transition-all"
                        style={{ width: `${employee.rate}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
