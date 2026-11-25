import { Users, Plus, CheckCircle } from 'lucide-react'
import { Link } from 'react-router'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const recentApplications = [
  {
    id: 1,
    candidate: 'Olivia Brown',
    position: 'Frontend Engineer',
    stage: 'Interview',
    date: 'Mar 28, 2026',
  },
  {
    id: 2,
    candidate: 'Liam Carter',
    position: 'Product Designer',
    stage: 'Screening',
    date: 'Mar 27, 2026',
  },
  {
    id: 3,
    candidate: 'Sophia Martinez',
    position: 'Data Analyst',
    stage: 'Applied',
    date: 'Mar 27, 2026',
  },
  {
    id: 4,
    candidate: 'Noah Williams',
    position: 'Backend Engineer',
    stage: 'Offer',
    date: 'Mar 26, 2026',
  },
  {
    id: 5,
    candidate: 'Emma Thompson',
    position: 'HR Coordinator',
    stage: 'Applied',
    date: 'Mar 25, 2026',
  },
]

const stageColors: Record<string, string> = {
  Applied: 'bg-[#6B7280]/20 text-[#9CA3AF]',
  Screening: 'bg-[#FFC107]/20 text-[#FFC107]',
  Interview: 'bg-[#12C4D3]/20 text-[#12C4D3]',
  Offer: 'bg-[#00BF6B]/20 text-[#00BF6B]',
}
const applicationStageData = ['Applied', 'Screening', 'Interview', 'Offer']
  .map((stage, index) => ({
    stage,
    candidates: recentApplications.filter((application) => application.stage === stage).length,
    color: ['#6B7280', '#FFC107', '#12C4D3', '#00BF6B'][index] ?? '#EC4899',
  }))
  .filter((entry) => entry.candidates > 0)
const applicationPositionData = Object.values(
  recentApplications.reduce<Record<string, { position: string; candidates: number }>>(
    (groups, application) => {
      const group = groups[application.position] ?? {
        position: application.position,
        candidates: 0,
      }
      group.candidates += 1
      groups[application.position] = group
      return groups
    },
    {}
  )
)

export default function HRDashboard() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">HR Dashboard</h1>
        <p className="text-[15px] text-[#9CA3AF]">
          Overview of recruitment, headcount, and workforce metrics
        </p>
      </div>

      <section
        className="mb-8 grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-2"
        aria-label="Recruitment charts"
      >
        <article className="min-w-0 rounded-xl border border-[#333333] bg-[#121212] p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-[18px] font-semibold text-[#E0E0E0]">Recruitment pipeline</h2>
            <p className="mt-1 text-sm text-[#9CA3AF]">Candidate counts by current stage</p>
          </div>
          <div className="h-64 min-w-0">
            {applicationStageData.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={applicationStageData}
                  margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
                >
                  <CartesianGrid stroke="#333333" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="stage" stroke="#9CA3AF" tickLine={false} axisLine={false} />
                  <YAxis allowDecimals={false} stroke="#9CA3AF" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F1F1F',
                      border: '1px solid #333333',
                      borderRadius: 8,
                      color: '#E0E0E0',
                    }}
                  />
                  <Bar dataKey="candidates" name="Candidates" radius={[4, 4, 0, 0]}>
                    {applicationStageData.map((entry) => (
                      <Cell key={entry.stage} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="flex h-full items-center justify-center text-sm text-[#9CA3AF]">
                No applications to chart.
              </p>
            )}
          </div>
        </article>
        <article className="min-w-0 rounded-xl border border-[#333333] bg-[#121212] p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-[18px] font-semibold text-[#E0E0E0]">Applications by role</h2>
            <p className="mt-1 text-sm text-[#9CA3AF]">Candidate counts grouped by position</p>
          </div>
          <div className="h-64 min-w-0">
            {applicationPositionData.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={applicationPositionData}
                  margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
                >
                  <CartesianGrid stroke="#333333" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="position"
                    stroke="#9CA3AF"
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    angle={-12}
                    textAnchor="end"
                    height={56}
                  />
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
                    dataKey="candidates"
                    name="Candidates"
                    fill="#EC4899"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="flex h-full items-center justify-center text-sm text-[#9CA3AF]">
                No applications to chart.
              </p>
            )}
          </div>
        </article>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className="xl:col-span-2 bg-[#121212] rounded-xl border border-[#333333]">
          <div className="p-6 border-b border-[#333333] flex items-center justify-between">
            <h2 className="text-[18px] font-semibold text-[#E0E0E0]">Recent Job Applications</h2>
            <Link
              to="/hr/recruitment"
              className="text-[14px] font-medium text-[#EC4899] hover:text-[#F472B6] transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#333333]">
                  <th className="px-6 py-4 text-left text-[13px] font-medium text-[#6B7280] uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-4 text-left text-[13px] font-medium text-[#6B7280] uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-4 text-left text-[13px] font-medium text-[#6B7280] uppercase tracking-wider">
                    Stage
                  </th>
                  <th className="px-6 py-4 text-left text-[13px] font-medium text-[#6B7280] uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333333]">
                {recentApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-[#1F1F1F] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#EC4899] flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[12px] font-medium">
                            {app.candidate
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </span>
                        </div>
                        <span className="text-[15px] font-medium text-[#E0E0E0]">
                          {app.candidate}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[15px] text-[#9CA3AF]">{app.position}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[13px] font-medium ${stageColors[app.stage]}`}
                      >
                        {app.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[14px] text-[#6B7280]">{app.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#121212] rounded-xl border border-[#333333] p-6">
          <h2 className="text-[18px] font-semibold text-[#E0E0E0] mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/hr/recruitment"
              className="flex items-center gap-4 p-4 bg-[#EC4899]/10 border border-[#EC4899]/20 rounded-xl hover:bg-[#EC4899]/20 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-[#EC4899]/20 flex items-center justify-center">
                <Plus className="w-5 h-5 text-[#EC4899]" />
              </div>
              <div>
                <p className="text-[15px] font-medium text-[#E0E0E0]">Post New Job</p>
                <p className="text-[13px] text-[#9CA3AF]">Create a new job listing</p>
              </div>
            </Link>
            <Link
              to="/hr/leaves"
              className="flex items-center gap-4 p-4 bg-[#1F1F1F] border border-[#333333] rounded-xl hover:bg-[#2A2A2A] hover:border-[#444444] transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-[#FFC107]/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-[#FFC107]" />
              </div>
              <div>
                <p className="text-[15px] font-medium text-[#E0E0E0]">Review Leaves</p>
                <p className="text-[13px] text-[#9CA3AF]">8 pending requests</p>
              </div>
            </Link>
            <Link
              to="/hr/onboarding"
              className="flex items-center gap-4 p-4 bg-[#1F1F1F] border border-[#333333] rounded-xl hover:bg-[#2A2A2A] hover:border-[#444444] transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-[#12C4D3]/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#12C4D3]" />
              </div>
              <div>
                <p className="text-[15px] font-medium text-[#E0E0E0]">Onboard Employee</p>
                <p className="text-[13px] text-[#9CA3AF]">3 hires in progress</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
