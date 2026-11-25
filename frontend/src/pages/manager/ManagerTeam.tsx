import { StatusBadge } from '../../componenets/ui/StatusBadge.js'
import { Search, Mail, Phone, TrendingUp, CheckSquare } from 'lucide-react'
import { useState } from 'react'

const teamMembers = [
  {
    id: 1,
    name: 'Alex Martinez',
    role: 'Software Engineer',
    email: 'alex.m@company.com',
    phone: '+1 (555) 201-0001',
    avatar: 'AM',
    status: 'online',
    department: 'Engineering',
    joinDate: 'Jan 2024',
    tasksCompleted: 42,
    tasksActive: 5,
    performance: 94,
    leaveBalance: 12,
  },
  {
    id: 2,
    name: 'Jessica Wong',
    role: 'Product Designer',
    email: 'jessica.w@company.com',
    phone: '+1 (555) 201-0002',
    avatar: 'JW',
    status: 'online',
    department: 'Engineering',
    joinDate: 'Mar 2024',
    tasksCompleted: 38,
    tasksActive: 3,
    performance: 91,
    leaveBalance: 15,
  },
  {
    id: 3,
    name: 'Ryan Cooper',
    role: 'Data Analyst',
    email: 'ryan.c@company.com',
    phone: '+1 (555) 201-0003',
    avatar: 'RC',
    status: 'away',
    department: 'Engineering',
    joinDate: 'Jun 2023',
    tasksCompleted: 55,
    tasksActive: 6,
    performance: 88,
    leaveBalance: 8,
  },
  {
    id: 4,
    name: 'Chris Lee',
    role: 'Backend Developer',
    email: 'chris.l@company.com',
    phone: '+1 (555) 201-0004',
    avatar: 'CL',
    status: 'offline',
    department: 'Engineering',
    joinDate: 'Sep 2022',
    tasksCompleted: 71,
    tasksActive: 4,
    performance: 96,
    leaveBalance: 10,
  },
  {
    id: 5,
    name: 'Priya Sharma',
    role: 'QA Engineer',
    email: 'priya.s@company.com',
    phone: '+1 (555) 201-0005',
    avatar: 'PS',
    status: 'online',
    department: 'Engineering',
    joinDate: 'Feb 2023',
    tasksCompleted: 60,
    tasksActive: 7,
    performance: 90,
    leaveBalance: 14,
  },
  {
    id: 6,
    name: 'Daniel Park',
    role: 'DevOps Engineer',
    email: 'daniel.p@company.com',
    phone: '+1 (555) 201-0006',
    avatar: 'DP',
    status: 'online',
    department: 'Engineering',
    joinDate: 'Nov 2022',
    tasksCompleted: 48,
    tasksActive: 4,
    performance: 93,
    leaveBalance: 11,
  },
]

const statusColors: Record<string, string> = {
  online: '#00BF6B',
  away: '#FFC107',
  offline: '#6B7280',
}

export default function ManagerTeam() {
  const [search, setSearch] = useState('')
  const [selectedMember, setSelectedMember] = useState<any>(null)

  const filtered = teamMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">My Team</h1>
          <p className="text-[15px] text-[#9CA3AF]">Manage and track your direct reports</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#8B5CF61A] rounded-lg">
          <span className="text-[15px] font-medium text-[#8B5CF6]">
            {teamMembers.length} Members
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-[#121212] rounded-xl border border-[#333333] p-4 mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search team members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all text-[15px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((member) => (
          <div
            key={member.id}
            className="bg-[#121212] rounded-xl border border-[#333333] p-6 hover:border-[#8B5CF6]/40 transition-all duration-200 cursor-pointer"
            onClick={() => setSelectedMember(member)}
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-[#8B5CF6] flex items-center justify-center">
                  <span className="text-white text-[18px] font-medium">{member.avatar}</span>
                </div>
                <div
                  className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#121212]"
                  style={{ backgroundColor: statusColors[member.status] }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[16px] font-semibold text-[#E0E0E0] truncate">{member.name}</h3>
                <p className="text-[14px] text-[#9CA3AF]">{member.role}</p>
                <p className="text-[13px] text-[#6B7280] mt-1">Since {member.joinDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="text-center p-3 bg-[#1F1F1F] rounded-lg">
                <div className="text-[18px] font-semibold text-[#E0E0E0]">
                  {member.tasksCompleted}
                </div>
                <div className="text-[12px] text-[#6B7280] mt-1">Done</div>
              </div>
              <div className="text-center p-3 bg-[#1F1F1F] rounded-lg">
                <div className="text-[18px] font-semibold text-[#FFC107]">{member.tasksActive}</div>
                <div className="text-[12px] text-[#6B7280] mt-1">Active</div>
              </div>
              <div className="text-center p-3 bg-[#1F1F1F] rounded-lg">
                <div className="text-[18px] font-semibold text-[#00BF6B]">
                  {member.performance}%
                </div>
                <div className="text-[12px] text-[#6B7280] mt-1">Perf.</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[13px] text-[#9CA3AF]">Performance</span>
                <span className="text-[13px] font-medium text-[#E0E0E0]">
                  {member.performance}%
                </span>
              </div>
              <div className="h-1.5 bg-[#333333] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#8B5CF6]"
                  style={{ width: `${member.performance}%` }}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#333333] space-y-1.5">
              <div className="flex items-center gap-2 text-[13px] text-[#9CA3AF]">
                <Mail className="w-3.5 h-3.5" />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-[#9CA3AF]">
                <Phone className="w-3.5 h-3.5" />
                <span>{member.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Member Detail Sidebar */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSelectedMember(null)}>
          <div
            className="absolute right-0 top-0 h-full w-80 bg-[#121212] border-l border-[#333333] p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMember(null)}
              className="text-[#9CA3AF] hover:text-[#E0E0E0] mb-6 text-[14px] font-medium"
            >
              ← Close
            </button>
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[#8B5CF6] flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-[24px] font-medium">{selectedMember.avatar}</span>
              </div>
              <h3 className="text-[18px] font-semibold text-[#E0E0E0]">{selectedMember.name}</h3>
              <p className="text-[14px] text-[#9CA3AF]">{selectedMember.role}</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[#1F1F1F] rounded-xl">
                <div className="text-[13px] text-[#6B7280] mb-3">Quick Stats</div>
                <div className="space-y-2">
                  {[
                    { label: 'Tasks Completed', value: selectedMember.tasksCompleted },
                    { label: 'Active Tasks', value: selectedMember.tasksActive },
                    { label: 'Performance', value: `${selectedMember.performance}%` },
                    { label: 'Leave Balance', value: `${selectedMember.leaveBalance} days` },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between">
                      <span className="text-[14px] text-[#9CA3AF]">{item.label}</span>
                      <span className="text-[14px] font-medium text-[#E0E0E0]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#1F1F1F] rounded-xl space-y-2">
                <div className="text-[13px] text-[#6B7280] mb-3">Contact</div>
                <div className="text-[14px] text-[#9CA3AF]">{selectedMember.email}</div>
                <div className="text-[14px] text-[#9CA3AF]">{selectedMember.phone}</div>
              </div>

              <button className="w-full py-2.5 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors text-[15px] font-medium">
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
