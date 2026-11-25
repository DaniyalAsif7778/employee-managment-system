import { CheckCircle, XCircle, Clock, Filter } from 'lucide-react'
import { useState } from 'react'

type LeaveStatus = 'pending' | 'approved' | 'rejected'

const initialLeaves = [
  {
    id: 1,
    name: 'Alex Martinez',
    avatar: 'AM',
    type: 'Vacation',
    from: '2026-04-20',
    to: '2026-04-25',
    days: 6,
    reason: 'Family trip planned months ahead',
    status: 'pending' as LeaveStatus,
    submitted: 'Mar 28, 2026',
  },
  {
    id: 2,
    name: 'Jessica Wong',
    avatar: 'JW',
    type: 'Sick Leave',
    from: '2026-03-30',
    to: '2026-03-31',
    days: 2,
    reason: 'Doctor appointment and recovery',
    status: 'pending' as LeaveStatus,
    submitted: 'Mar 27, 2026',
  },
  {
    id: 3,
    name: 'Ryan Cooper',
    avatar: 'RC',
    type: 'Personal',
    from: '2026-04-05',
    to: '2026-04-05',
    days: 1,
    reason: 'Personal errands',
    status: 'pending' as LeaveStatus,
    submitted: 'Mar 26, 2026',
  },
  {
    id: 4,
    name: 'Chris Lee',
    avatar: 'CL',
    type: 'Vacation',
    from: '2026-04-10',
    to: '2026-04-14',
    days: 5,
    reason: 'Annual leave - booked in advance',
    status: 'pending' as LeaveStatus,
    submitted: 'Mar 25, 2026',
  },
  {
    id: 5,
    name: 'Priya Sharma',
    avatar: 'PS',
    type: 'Sick Leave',
    from: '2026-03-18',
    to: '2026-03-19',
    days: 2,
    reason: 'Flu recovery',
    status: 'approved' as LeaveStatus,
    submitted: 'Mar 17, 2026',
  },
  {
    id: 6,
    name: 'Daniel Park',
    avatar: 'DP',
    type: 'Personal',
    from: '2026-03-12',
    to: '2026-03-12',
    days: 1,
    reason: 'Home repair appointment',
    status: 'rejected' as LeaveStatus,
    submitted: 'Mar 10, 2026',
  },
]

const leaveTypeColors: Record<string, { bg: string; text: string }> = {
  Vacation: { bg: '#009F8E1A', text: '#009F8E' },
  'Sick Leave': { bg: '#EF44441A', text: '#EF4444' },
  Personal: { bg: '#8B5CF61A', text: '#8B5CF6' },
  Maternity: { bg: '#EC48991A', text: '#EC4899' },
}

export default function ManagerLeaveApprovals() {
  const [leaves, setLeaves] = useState(initialLeaves)
  const [filter, setFilter] = useState<'all' | LeaveStatus>('all')
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const filtered = leaves.filter((l) => filter === 'all' || l.status === filter)

  const handleAction = (id: number, action: 'approved' | 'rejected') => {
    setLeaves((prev) => prev.map((l) => (l.id === id ? { ...l, status: action } : l)))
  }

  const pending = leaves.filter((l) => l.status === 'pending').length
  const approved = leaves.filter((l) => l.status === 'approved').length
  const rejected = leaves.filter((l) => l.status === 'rejected').length

  return (
    <>
      <div className="mb-8">
        <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">Leave Approvals</h1>
        <p className="text-[15px] text-[#9CA3AF]">Review and action your team's leave requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-[#121212] rounded-xl p-5 border border-[#333333]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[#FFC1071A] flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#FFC107]" />
            </div>
            <span className="text-[14px] text-[#9CA3AF] font-medium">Pending</span>
          </div>
          <p className="text-[28px] font-semibold text-[#E0E0E0]">{pending}</p>
        </div>
        <div className="bg-[#121212] rounded-xl p-5 border border-[#333333]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[#00BF6B1A] flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-[#00BF6B]" />
            </div>
            <span className="text-[14px] text-[#9CA3AF] font-medium">Approved</span>
          </div>
          <p className="text-[28px] font-semibold text-[#E0E0E0]">{approved}</p>
        </div>
        <div className="bg-[#121212] rounded-xl p-5 border border-[#333333]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[#EF44441A] flex items-center justify-center">
              <XCircle className="w-5 h-5 text-[#EF4444]" />
            </div>
            <span className="text-[14px] text-[#9CA3AF] font-medium">Rejected</span>
          </div>
          <p className="text-[28px] font-semibold text-[#E0E0E0]">{rejected}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-[15px] font-medium capitalize transition-all duration-200 ${
              filter === f
                ? 'bg-[#8B5CF6] text-white'
                : 'bg-[#121212] text-[#9CA3AF] border border-[#333333] hover:text-[#E0E0E0]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Leave Requests */}
      <div className="space-y-3">
        {filtered.map((leave) => {
          const typeStyle = leaveTypeColors[leave.type] || { bg: '#1F1F1F', text: '#9CA3AF' }
          const isExpanded = expandedId === leave.id

          return (
            <div
              key={leave.id}
              className="bg-[#121212] rounded-xl border border-[#333333] overflow-hidden"
            >
              <div
                className="flex items-center gap-4 p-5 cursor-pointer hover:bg-[#1A1A1A] transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : leave.id)}
              >
                <div className="w-10 h-10 rounded-full bg-[#8B5CF6] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[13px] font-medium">{leave.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[15px] font-medium text-[#E0E0E0]">{leave.name}</span>
                    <span
                      className="px-2 py-0.5 rounded-md text-[13px] font-medium"
                      style={{ backgroundColor: typeStyle.bg, color: typeStyle.text }}
                    >
                      {leave.type}
                    </span>
                  </div>
                  <div className="text-[14px] text-[#9CA3AF]">
                    {leave.from} → {leave.to} · {leave.days} day{leave.days !== 1 ? 's' : ''}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {leave.status === 'pending' ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAction(leave.id, 'approved')
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00BF6B1A] text-[#00BF6B] rounded-lg hover:bg-[#00BF6B] hover:text-white transition-all duration-200 text-[14px] font-medium"
                      >
                        <CheckCircle className="w-4 h-4" /> Approve
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAction(leave.id, 'rejected')
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EF44441A] text-[#EF4444] rounded-lg hover:bg-[#EF4444] hover:text-white transition-all duration-200 text-[14px] font-medium"
                      >
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                    </>
                  ) : (
                    <span
                      className="px-3 py-1.5 rounded-lg text-[14px] font-medium capitalize"
                      style={{
                        backgroundColor: leave.status === 'approved' ? '#00BF6B1A' : '#EF44441A',
                        color: leave.status === 'approved' ? '#00BF6B' : '#EF4444',
                      }}
                    >
                      {leave.status}
                    </span>
                  )}
                </div>
              </div>
              {isExpanded && (
                <div className="px-5 pb-5 border-t border-[#333333] pt-4">
                  <div className="grid grid-cols-2 gap-4 text-[14px]">
                    <div>
                      <div className="text-[#6B7280] mb-1">Reason</div>
                      <div className="text-[#E0E0E0]">{leave.reason}</div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] mb-1">Submitted</div>
                      <div className="text-[#E0E0E0]">{leave.submitted}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#6B7280] text-[15px]">
            No leave requests found.
          </div>
        )}
      </div>
    </>
  )
}
