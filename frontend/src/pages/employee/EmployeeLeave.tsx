import { Calendar, Plus, X, Trash2 } from 'lucide-react'
import { StatusBadge } from '../../componenets/ui/StatusBadge.js'
import { useState } from 'react'

const leaveBalance = {
  total: 20,
  used: 8,
  remaining: 12,
}

const initialLeaveHistory = [
  {
    id: 1,
    type: 'Vacation',
    startDate: '2026-02-15',
    endDate: '2026-02-19',
    days: 5,
    status: 'approved' as const,
  },
  {
    id: 2,
    type: 'Sick Leave',
    startDate: '2026-03-10',
    endDate: '2026-03-11',
    days: 2,
    status: 'approved' as const,
  },
  {
    id: 3,
    type: 'Vacation',
    startDate: '2026-04-20',
    endDate: '2026-04-21',
    days: 2,
    status: 'pending' as const,
  },
  {
    id: 4,
    type: 'Personal',
    startDate: '2026-01-08',
    endDate: '2026-01-08',
    days: 1,
    status: 'approved' as const,
  },
]

const upcomingLeaves = [
  {
    id: 1,
    employee: 'Sarah Johnson',
    type: 'Vacation',
    startDate: '2026-04-01',
    endDate: '2026-04-05',
  },
  {
    id: 2,
    employee: 'Michael Chen',
    type: 'Sick Leave',
    startDate: '2026-03-30',
    endDate: '2026-03-31',
  },
]

const leaveTypes = [
  'Vacation',
  'Sick Leave',
  'Personal',
  'Maternity/Paternity',
  'Bereavement',
  'Unpaid',
]

export default function EmployeeLeave() {
  const [leaveHistory, setLeaveHistory] = useState(initialLeaveHistory)
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  const [form, setForm] = useState({ type: 'Vacation', startDate: '', endDate: '', reason: '' })
  const [formError, setFormError] = useState('')

  const getDayCount = (start: string, end: string) => {
    if (!start || !end) return 0
    const diff = new Date(end).getTime() - new Date(start).getTime()
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1)
  }

  const handleSubmit = () => {
    setFormError('')
    if (!form.startDate || !form.endDate) {
      setFormError('Please select both start and end dates.')
      return
    }
    if (new Date(form.endDate) < new Date(form.startDate)) {
      setFormError('End date must be after start date.')
      return
    }
    const days = getDayCount(form.startDate, form.endDate)
    setLeaveHistory((prev) => [
      {
        id: Date.now(),
        type: form.type,
        startDate: form.startDate,
        endDate: form.endDate,
        days,
        status: 'pending' as const,
      },
      ...prev,
    ])
    setForm({ type: 'Vacation', startDate: '', endDate: '', reason: '' })
    setShowRequestModal(false)
  }

  const handleCancel = (id: number) => {
    setLeaveHistory((prev) => prev.filter((l) => l.id !== id))
    setShowDeleteConfirm(null)
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">Leave Management</h1>
          <p className="text-[15px] text-[#9CA3AF]">Request and track your time off</p>
        </div>
        <button
          onClick={() => setShowRequestModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#009F8E] text-white rounded-lg hover:bg-[#12C4D3] transition-all duration-200 text-[15px] font-medium"
        >
          <Plus className="w-4 h-4" />
          Request Leave
        </button>
      </div>

      {/* Leave Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#009F8E1A] flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#009F8E]" />
            </div>
            <div>
              <div className="text-[14px] text-[#9CA3AF] font-medium">Total Leave Days</div>
              <div className="text-[24px] font-semibold text-[#E0E0E0]">{leaveBalance.total}</div>
            </div>
          </div>
        </div>
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#FFC1071A] flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#FFC107]" />
            </div>
            <div>
              <div className="text-[14px] text-[#9CA3AF] font-medium">Used Days</div>
              <div className="text-[24px] font-semibold text-[#E0E0E0]">{leaveBalance.used}</div>
            </div>
          </div>
        </div>
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#12C4D31A] flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#12C4D3]" />
            </div>
            <div>
              <div className="text-[14px] text-[#9CA3AF] font-medium">Remaining Days</div>
              <div className="text-[24px] font-semibold text-[#E0E0E0]">
                {leaveBalance.remaining}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leave History */}
        <div className="lg:col-span-2">
          <div className="bg-[#121212] rounded-xl border border-[#333333] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#333333]">
              <h2 className="text-[18px] font-semibold text-[#E0E0E0]">My Leave History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-[#333333]">
                  <tr>
                    <th className="px-6 py-4 text-left text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                      Leave Type
                    </th>
                    <th className="px-6 py-4 text-left text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-4 text-left text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-6 py-4 text-left text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                      Days
                    </th>
                    <th className="px-6 py-4 text-left text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {leaveHistory.map((leave) => (
                    <tr
                      key={leave.id}
                      className="border-b border-[#333333] last:border-0 hover:bg-[#1F1F1F] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-[15px] font-medium text-[#E0E0E0]">{leave.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[15px] text-[#9CA3AF]">{leave.startDate}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[15px] text-[#9CA3AF]">{leave.endDate}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[15px] text-[#E0E0E0]">{leave.days} days</span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge
                          status={leave.status === 'approved' ? 'done' : 'pending'}
                          size="sm"
                        />
                      </td>
                      <td className="px-6 py-4">
                        {leave.status === 'pending' && (
                          <button
                            onClick={() => setShowDeleteConfirm(leave.id)}
                            className="p-1.5 hover:bg-[#EF44441A] rounded-lg transition-colors group"
                          >
                            <Trash2 className="w-4 h-4 text-[#6B7280] group-hover:text-[#EF4444] transition-colors" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Team Leaves */}
        <div className="lg:col-span-1">
          <div className="bg-[#121212] rounded-xl border border-[#333333] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#333333]">
              <h2 className="text-[18px] font-semibold text-[#E0E0E0]">Team Leaves</h2>
            </div>
            <div className="p-6 space-y-4">
              {upcomingLeaves.map((leave) => (
                <div
                  key={leave.id}
                  className="p-4 bg-[#1F1F1F] rounded-lg hover:bg-[#2A2A2A] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#009F8E] flex items-center justify-center">
                      <span className="text-white text-[13px] font-medium">
                        {leave.employee
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="text-[15px] font-medium text-[#E0E0E0]">{leave.employee}</div>
                      <div className="text-[13px] text-[#9CA3AF]">{leave.type}</div>
                    </div>
                  </div>
                  <div className="text-[13px] text-[#6B7280] ml-11">
                    {leave.startDate} to {leave.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Request Leave Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#121212] rounded-2xl border border-[#333333] w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-[#333333]">
              <h2 className="text-[20px] font-semibold text-[#E0E0E0]">Request Leave</h2>
              <button
                onClick={() => {
                  setShowRequestModal(false)
                  setFormError('')
                }}
                className="p-2 hover:bg-[#1F1F1F] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#9CA3AF]" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                  Leave Type
                </label>
                <select
                  value={form.type}
                  onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                  className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]"
                >
                  {leaveTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
                    className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px] [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={form.endDate}
                    min={form.startDate}
                    onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
                    className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px] [color-scheme:dark]"
                  />
                </div>
              </div>
              {form.startDate &&
                form.endDate &&
                new Date(form.endDate) >= new Date(form.startDate) && (
                  <div className="px-4 py-3 bg-[#009F8E1A] rounded-lg border border-[#009F8E33]">
                    <span className="text-[14px] text-[#009F8E] font-medium">
                      Duration: {getDayCount(form.startDate, form.endDate)} day
                      {getDayCount(form.startDate, form.endDate) !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              <div>
                <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                  Reason <span className="text-[#6B7280]">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={form.reason}
                  onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
                  placeholder="Briefly describe your reason..."
                  className="w-full px-4 py-3 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px] resize-none"
                />
              </div>
              {formError && <p className="text-[14px] text-[#EF4444]">{formError}</p>}
            </div>
            <div className="flex gap-3 p-6 border-t border-[#333333]">
              <button
                onClick={() => {
                  setShowRequestModal(false)
                  setFormError('')
                }}
                className="flex-1 px-4 py-2.5 border border-[#333333] text-[#9CA3AF] rounded-lg hover:bg-[#1F1F1F] transition-colors text-[15px] font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2.5 bg-[#009F8E] text-white rounded-lg hover:bg-[#12C4D3] transition-all duration-200 text-[15px] font-medium"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Leave Confirmation */}
      {showDeleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#121212] rounded-2xl border border-[#333333] w-full max-w-sm shadow-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-[#EF44441A] flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-[#EF4444]" />
            </div>
            <h3 className="text-[18px] font-semibold text-[#E0E0E0] mb-2">Cancel Leave Request</h3>
            <p className="text-[15px] text-[#9CA3AF] mb-6">
              Are you sure you want to cancel this pending leave request?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 border border-[#333333] text-[#9CA3AF] rounded-lg hover:bg-[#1F1F1F] transition-colors text-[15px] font-medium"
              >
                Keep It
              </button>
              <button
                onClick={() => handleCancel(showDeleteConfirm)}
                className="flex-1 px-4 py-2.5 bg-[#EF4444] text-white rounded-lg hover:bg-[#DC2626] transition-all duration-200 text-[15px] font-medium"
              >
                Cancel Request
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
