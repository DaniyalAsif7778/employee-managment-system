import { BookOpen, CheckCircle, Circle, Plus, X, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface ChecklistItem {
  id: number
  label: string
  done: boolean
}

interface NewHire {
  id: number
  name: string
  avatar: string
  position: string
  startDate: string
  expanded: boolean
  checklist: ChecklistItem[]
}

const defaultChecklist = (): ChecklistItem[] => [
  { id: 1, label: 'IT Setup (laptop, accounts, tools)', done: false },
  { id: 2, label: 'Benefits Enrollment', done: false },
  { id: 3, label: 'Policy Review & Handbook Sign-off', done: false },
  { id: 4, label: 'Team Introduction Meeting', done: false },
  { id: 5, label: 'First Week Goals Defined', done: false },
  { id: 6, label: 'Office Tour & Access Cards', done: false },
]

const initialHires: NewHire[] = [
  {
    id: 1,
    name: 'Noah Williams',
    avatar: 'NW',
    position: 'Backend Engineer',
    startDate: 'Apr 1, 2026',
    expanded: true,
    checklist: [
      { id: 1, label: 'IT Setup (laptop, accounts, tools)', done: true },
      { id: 2, label: 'Benefits Enrollment', done: true },
      { id: 3, label: 'Policy Review & Handbook Sign-off', done: true },
      { id: 4, label: 'Team Introduction Meeting', done: false },
      { id: 5, label: 'First Week Goals Defined', done: false },
      { id: 6, label: 'Office Tour & Access Cards', done: true },
    ],
  },
  {
    id: 2,
    name: 'Zoe Harris',
    avatar: 'ZH',
    position: 'ML Engineer',
    startDate: 'Apr 7, 2026',
    expanded: false,
    checklist: [
      { id: 1, label: 'IT Setup (laptop, accounts, tools)', done: true },
      { id: 2, label: 'Benefits Enrollment', done: false },
      { id: 3, label: 'Policy Review & Handbook Sign-off', done: false },
      { id: 4, label: 'Team Introduction Meeting', done: false },
      { id: 5, label: 'First Week Goals Defined', done: false },
      { id: 6, label: 'Office Tour & Access Cards', done: false },
    ],
  },
  {
    id: 3,
    name: 'Aiden Lee',
    avatar: 'AL',
    position: 'Product Manager',
    startDate: 'Apr 14, 2026',
    expanded: false,
    checklist: [
      { id: 1, label: 'IT Setup (laptop, accounts, tools)', done: true },
      { id: 2, label: 'Benefits Enrollment', done: true },
      { id: 3, label: 'Policy Review & Handbook Sign-off', done: true },
      { id: 4, label: 'Team Introduction Meeting', done: true },
      { id: 5, label: 'First Week Goals Defined', done: true },
      { id: 6, label: 'Office Tour & Access Cards', done: true },
    ],
  },
]

interface NewHireForm {
  name: string
  position: string
  startDate: string
}

export default function HROnboarding() {
  const [hires, setHires] = useState<NewHire[]>(initialHires)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState<NewHireForm>({ name: '', position: '', startDate: '' })

  const toggleExpanded = (id: number) => {
    setHires((prev) => prev.map((h) => (h.id === id ? { ...h, expanded: !h.expanded } : h)))
  }

  const toggleItem = (hireId: number, itemId: number) => {
    setHires((prev) =>
      prev.map((h) => {
        if (h.id !== hireId) return h
        return {
          ...h,
          checklist: h.checklist.map((item) =>
            item.id === itemId ? { ...item, done: !item.done } : item
          ),
        }
      })
    )
  }

  const getProgress = (hire: NewHire) => {
    const done = hire.checklist.filter((i) => i.done).length
    return Math.round((done / hire.checklist.length) * 100)
  }

  const handleAdd = () => {
    if (!form.name.trim() || !form.position.trim() || !form.startDate.trim()) return
    const initials = form.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
    setHires((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: form.name,
        avatar: initials,
        position: form.position,
        startDate: form.startDate,
        expanded: true,
        checklist: defaultChecklist(),
      },
    ])
    setForm({ name: '', position: '', startDate: '' })
    setShowModal(false)
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">Onboarding</h1>
          <p className="text-[15px] text-[#9CA3AF]">
            Track new hire onboarding progress and checklists
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#EC4899] text-white rounded-lg hover:bg-[#DB2777] transition-all duration-200 text-[15px] font-medium"
        >
          <Plus className="w-4 h-4" />
          Add New Hire
        </button>
      </div>

      <div className="space-y-4">
        {hires.map((hire) => {
          const progress = getProgress(hire)
          const doneCount = hire.checklist.filter((i) => i.done).length
          return (
            <div
              key={hire.id}
              className="bg-[#121212] rounded-xl border border-[#333333] hover:border-[#444444] transition-all duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#EC4899] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[16px] font-medium">{hire.avatar}</span>
                    </div>
                    <div>
                      <h3 className="text-[17px] font-semibold text-[#E0E0E0]">{hire.name}</h3>
                      <p className="text-[14px] text-[#9CA3AF]">
                        {hire.position} · Starts {hire.startDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-[20px] font-semibold text-[#E0E0E0]">{progress}%</p>
                      <p className="text-[13px] text-[#9CA3AF]">
                        {doneCount}/{hire.checklist.length} tasks
                      </p>
                    </div>
                    <div className="w-20 h-2 bg-[#1F1F1F] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${progress}%`,
                          backgroundColor: progress === 100 ? '#00BF6B' : '#EC4899',
                        }}
                      />
                    </div>
                    <button
                      onClick={() => toggleExpanded(hire.id)}
                      className="p-2 hover:bg-[#1F1F1F] rounded-lg transition-colors"
                    >
                      {hire.expanded ? (
                        <ChevronUp className="w-5 h-5 text-[#9CA3AF]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#9CA3AF]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {hire.expanded && (
                <div className="px-6 pb-6 border-t border-[#333333]">
                  <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {hire.checklist.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => toggleItem(hire.id, item.id)}
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 text-left ${
                          item.done
                            ? 'border-[#00BF6B]/30 bg-[#00BF6B]/5'
                            : 'border-[#333333] hover:border-[#444444] bg-[#1F1F1F]'
                        }`}
                      >
                        {item.done ? (
                          <CheckCircle className="w-5 h-5 text-[#00BF6B] flex-shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-[#6B7280] flex-shrink-0" />
                        )}
                        <span
                          className={`text-[14px] font-medium ${item.done ? 'text-[#9CA3AF] line-through' : 'text-[#E0E0E0]'}`}
                        >
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Add New Hire Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#121212] rounded-2xl border border-[#333333] w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-[#333333]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EC4899]/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#EC4899]" />
                </div>
                <h2 className="text-[20px] font-semibold text-[#E0E0E0]">Add New Hire</h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-[#1F1F1F] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#9CA3AF]" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Jane Doe"
                  className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent transition-all text-[15px]"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                  Position
                </label>
                <input
                  type="text"
                  value={form.position}
                  onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))}
                  placeholder="e.g. Software Engineer"
                  className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent transition-all text-[15px]"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                  Start Date
                </label>
                <input
                  type="text"
                  value={form.startDate}
                  onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
                  placeholder="e.g. May 1, 2026"
                  className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent transition-all text-[15px]"
                />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-[#333333]">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 border border-[#333333] text-[#9CA3AF] rounded-lg hover:bg-[#1F1F1F] transition-colors text-[15px] font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!form.name.trim() || !form.position.trim() || !form.startDate.trim()}
                className="flex-1 px-4 py-2.5 bg-[#EC4899] text-white rounded-lg hover:bg-[#DB2777] transition-all duration-200 text-[15px] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add New Hire
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
