import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react'
import { useState } from 'react'
import { StatusBadge } from '../../componenets/ui/StatusBadge.js'

type LeaveStatus = 'pending' | 'approved' | 'rejected'

interface LeaveRequest {
  id: number
  employee: string
  avatar: string
  department: string
  leaveType: string
  startDate: string
  endDate: string
  days: number
  status: LeaveStatus
  reason: string
}

const initialLeaves: LeaveRequest[] = [
  {
    id: 1,
    employee: 'John Smith',
    avatar: 'JS',
    department: 'Engineering',
    leaveType: 'Vacation',
    startDate: 'Apr 10',
    endDate: 'Apr 12',
    days: 3,
    status: 'pending',
    reason: 'Family trip',
  },
  {
    id: 2,
    employee: 'Priya Nair',
    avatar: 'PN',
    department: 'Engineering',
    leaveType: 'Sick Leave',
    startDate: 'Apr 5',
    endDate: 'Apr 5',
    days: 1,
    status: 'pending',
    reason: 'Medical appointment',
  },
  {
    id: 3,
    employee: 'Lisa Anderson',
    avatar: 'LA',
    department: 'Marketing',
    leaveType: 'Personal',
    startDate: 'Apr 8',
    endDate: 'Apr 9',
    days: 2,
    status: 'pending',
    reason: 'Personal matters',
  },
  {
    id: 4,
    employee: 'Sam Okafor',
    avatar: 'SO',
    department: 'Engineering',
    leaveType: 'Vacation',
    startDate: 'Apr 14',
    endDate: 'Apr 18',
    days: 5,
    status: 'pending',
    reason: 'Annual vacation',
  },
  {
    id: 5,
    employee: 'Jordan Lee',
    avatar: 'JL',
    department: 'Engineering',
    leaveType: 'Sick Leave',
    startDate: 'Mar 29',
    endDate: 'Mar 29',
    days: 1,
    status: 'pending',
    reason: 'Not feeling well',
  },
  {
    id: 6,
    employee: 'Michael Chen',
    avatar: 'MC',
    department: 'Finance',
    leaveType: 'Vacation',
    startDate: 'Mar 25',
    endDate: 'Mar 27',
    days: 3,
    status: 'approved',
    reason: 'Weekend trip',
  },
  {
    id: 7,
    employee: 'Sarah Johnson',
    avatar: 'SJ',
    department: 'HR',
    leaveType: 'Personal',
    startDate: 'Mar 22',
    endDate: 'Mar 22',
    days: 1,
    status: 'approved',
    reason: 'Personal errand',
  },
  {
    id: 8,
    employee: 'Emily Davis',
    avatar: 'ED',
    department: 'HR',
    leaveType: 'Sick Leave',
    startDate: 'Mar 20',
    endDate: 'Mar 21',
    days: 2,
    status: 'approved',
    reason: 'Flu',
  },
  {
    id: 9,
    employee: 'David Wilson',
    avatar: 'DW',
    department: 'IT',
    leaveType: 'Vacation',
    startDate: 'Mar 15',
    endDate: 'Mar 19',
    days: 5,
    status: 'approved',
    reason: 'Planned vacation',
  },
  {
    id: 10,
    employee: 'Alex Turner',
    avatar: 'AT',
    department: 'Engineering',
    leaveType: 'Personal',
    startDate: 'Mar 10',
    endDate: 'Mar 10',
    days: 1,
    status: 'rejected',
    reason: 'Sprint deadline conflict',
  },
  {
    id: 11,
    employee: 'Maya Patel',
    avatar: 'MP',
    department: 'Engineering',
    leaveType: 'Vacation',
    startDate: 'Mar 8',
    endDate: 'Mar 8',
    days: 1,
    status: 'rejected',
    reason: 'Deployment day',
  },
  {
    id: 12,
    employee: 'Chris Wong',
    avatar: 'CW',
    department: 'Engineering',
    leaveType: 'Personal',
    startDate: 'Mar 5',
    endDate: 'Mar 5',
    days: 1,
    status: 'rejected',
    reason: 'Team meeting conflict',
  },
]

const tabs: { id: LeaveStatus | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'approved', label: 'Approved' },
  { id: 'rejected', label: 'Rejected' },
]

const leaveTypeColors: Record<string, string> = {
  Vacation: 'bg-[#12C4D3]/20 text-[#12C4D3]',
  'Sick Leave': 'bg-[#EF4444]/20 text-[#EF4444]',
  Personal: 'bg-[#8B5CF6]/20 text-[#8B5CF6]',
}

export default function HRLeaves() {
  const [leaves, setLeaves] = useState(initialLeaves)
  const [activeTab, setActiveTab] = useState<LeaveStatus | 'all'>('all')

  const filteredLeaves = leaves.filter((l) => activeTab === 'all' || l.status === activeTab)

  const pending = leaves.filter((l) => l.status === 'pending').length
  const approved = leaves.filter((l) => l.status === 'approved').length
  const rejected = leaves.filter((l) => l.status === 'rejected').length
  const totalDays = leaves
    .filter((l) => l.status === 'approved')
    .reduce((sum, l) => sum + l.days, 0)
  const avgDays = approved > 0 ? (totalDays / approved).toFixed(1) : '0.0'

  const approve = (id: number) =>
    setLeaves((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'approved' as LeaveStatus } : l))
    )
  const reject = (id: number) =>
    setLeaves((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'rejected' as LeaveStatus } : l))
    )

  return (
    <>
      <div className="mb-8">
        <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">Leave Management</h1>
        <p className="text-[15px] text-[#9CA3AF]">Review and manage all employee leave requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#FFC107]/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#FFC107]" />
            </div>
            <p className="text-[14px] text-[#9CA3AF] font-medium">Pending</p>
          </div>
          <p className="text-[30px] font-semibold text-[#E0E0E0]">{pending}</p>
        </div>
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#00BF6B]/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-[#00BF6B]" />
            </div>
            <p className="text-[14px] text-[#9CA3AF] font-medium">Approved This Month</p>
          </div>
          <p className="text-[30px] font-semibold text-[#E0E0E0]">{approved}</p>
        </div>
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#EF4444]/20 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-[#EF4444]" />
            </div>
            <p className="text-[14px] text-[#9CA3AF] font-medium">Rejected</p>
          </div>
          <p className="text-[30px] font-semibold text-[#E0E0E0]">{rejected}</p>
        </div>
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#EC4899]/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#EC4899]" />
            </div>
            <p className="text-[14px] text-[#9CA3AF] font-medium">Avg Leave Days Used</p>
          </div>
          <p className="text-[30px] font-semibold text-[#E0E0E0]">{avgDays}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-[15px] font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-[#EC4899] text-white'
                : 'bg-[#121212] text-[#9CA3AF] border border-[#333333] hover:border-[#444444] hover:text-[#E0E0E0]'
            }`}
          >
            {tab.label}
          </button>
        ))}
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
                  Leave Type
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#6B7280] uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-4 text-left text-[13px] font-medium text-[#6B7280] uppercase tracking-wider">
                  Days
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
              {filteredLeaves.map((leave) => (
                <tr key={leave.id} className="hover:bg-[#1F1F1F] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#EC4899] flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[12px] font-medium">{leave.avatar}</span>
                      </div>
                      <div>
                        <p className="text-[15px] font-medium text-[#E0E0E0]">{leave.employee}</p>
                        <p className="text-[13px] text-[#6B7280]">{leave.department}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[13px] font-medium ${leaveTypeColors[leave.leaveType] || 'bg-[#1F1F1F] text-[#9CA3AF]'}`}
                    >
                      {leave.leaveType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[14px] text-[#E0E0E0]">
                      {leave.startDate} – {leave.endDate}
                    </p>
                    <p className="text-[13px] text-[#6B7280]">{leave.reason}</p>
                  </td>
                  <td className="px-6 py-4 text-[15px] font-medium text-[#E0E0E0]">
                    {leave.days}d
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={leave.status} />
                  </td>
                  <td className="px-6 py-4">
                    {leave.status === 'pending' && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => approve(leave.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#00BF6B]/15 text-[#00BF6B] hover:bg-[#00BF6B]/30 transition-colors text-[13px] font-medium"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          Approve
                        </button>
                        <button
                          onClick={() => reject(leave.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#EF4444]/15 text-[#EF4444] hover:bg-[#EF4444]/30 transition-colors text-[13px] font-medium"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Reject
                        </button>
                      </div>
                    )}
                    {leave.status !== 'pending' && (
                      <span className="text-[14px] text-[#6B7280]">—</span>
                    )}
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
