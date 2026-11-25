import { StatusBadge } from '../../componenets/ui/StatusBadge.js'
import { PriorityBadge } from '../../componenets/ui/PriorityBadge.js'
import { Plus, Search, MoreVertical, X, Trash2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const teamMembers = [
  'All',
  'Alex Martinez',
  'Jessica Wong',
  'Ryan Cooper',
  'Chris Lee',
  'Priya Sharma',
  'Daniel Park',
]

const initialTasks = [
  {
    id: 1,
    title: 'Q2 Feature Roadmap',
    assignee: 'Alex Martinez',
    assigneeAvatar: 'AM',
    priority: 'high' as const,
    status: 'in-progress' as const,
    dueDate: '2026-04-05',
    category: 'Planning',
  },
  {
    id: 2,
    title: 'API Integration Review',
    assignee: 'Jessica Wong',
    assigneeAvatar: 'JW',
    priority: 'medium' as const,
    status: 'pending' as const,
    dueDate: '2026-04-03',
    category: 'Development',
  },
  {
    id: 3,
    title: 'Performance Optimization',
    assignee: 'Ryan Cooper',
    assigneeAvatar: 'RC',
    priority: 'high' as const,
    status: 'in-progress' as const,
    dueDate: '2026-04-08',
    category: 'Development',
  },
  {
    id: 4,
    title: 'Security Audit',
    assignee: 'Chris Lee',
    assigneeAvatar: 'CL',
    priority: 'high' as const,
    status: 'done' as const,
    dueDate: '2026-03-28',
    category: 'Security',
  },
  {
    id: 5,
    title: 'Unit Test Coverage',
    assignee: 'Priya Sharma',
    assigneeAvatar: 'PS',
    priority: 'medium' as const,
    status: 'in-progress' as const,
    dueDate: '2026-04-10',
    category: 'QA',
  },
  {
    id: 6,
    title: 'CI/CD Pipeline Update',
    assignee: 'Daniel Park',
    assigneeAvatar: 'DP',
    priority: 'low' as const,
    status: 'pending' as const,
    dueDate: '2026-04-12',
    category: 'DevOps',
  },
  {
    id: 7,
    title: 'Design System Tokens',
    assignee: 'Jessica Wong',
    assigneeAvatar: 'JW',
    priority: 'low' as const,
    status: 'done' as const,
    dueDate: '2026-03-25',
    category: 'Design',
  },
  {
    id: 8,
    title: 'Database Schema Migration',
    assignee: 'Chris Lee',
    assigneeAvatar: 'CL',
    priority: 'high' as const,
    status: 'in-progress' as const,
    dueDate: '2026-04-06',
    category: 'Development',
  },
]

export default function ManagerTasks() {
  const [tasks, setTasks] = useState(initialTasks)
  const [search, setSearch] = useState('')
  const [memberFilter, setMemberFilter] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [form, setForm] = useState({
    title: '',
    assignee: 'Alex Martinez',
    priority: 'medium' as const,
    dueDate: '',
    category: 'Development',
  })
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setOpenDropdown(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filtered = tasks.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase())
    const matchMember = memberFilter === 'All' || t.assignee === memberFilter
    return matchSearch && matchMember
  })

  const handleAdd = () => {
    if (!form.title.trim() || !form.dueDate) return
    const avatarMap: Record<string, string> = {
      'Alex Martinez': 'AM',
      'Jessica Wong': 'JW',
      'Ryan Cooper': 'RC',
      'Chris Lee': 'CL',
      'Priya Sharma': 'PS',
      'Daniel Park': 'DP',
    }
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: form.title,
        assignee: form.assignee,
        assigneeAvatar: avatarMap[form.assignee] || 'XX',
        priority: form.priority,
        status: 'pending' as const,
        dueDate: form.dueDate,
        category: form.category,
      },
    ])
    setForm({
      title: '',
      assignee: 'Alex Martinez',
      priority: 'medium' as const,
      dueDate: '',
      category: 'Development',
    })
    setShowAddModal(false)
  }

  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
    setOpenDropdown(null)
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">Team Tasks</h1>
          <p className="text-[15px] text-[#9CA3AF]">Manage and track tasks across your team</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-all duration-200 text-[15px] font-medium"
        >
          <Plus className="w-4 h-4" />
          Assign Task
        </button>
      </div>

      {/* Filters */}
      <div className="bg-[#121212] rounded-xl border border-[#333333] p-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-48 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all text-[15px]"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {teamMembers.map((m) => (
              <button
                key={m}
                onClick={() => setMemberFilter(m)}
                className={`px-3 py-2 rounded-lg text-[14px] font-medium transition-all duration-200 ${
                  memberFilter === m
                    ? 'bg-[#8B5CF6] text-white'
                    : 'bg-[#1F1F1F] text-[#9CA3AF] hover:text-[#E0E0E0]'
                }`}
              >
                {m === 'All' ? 'All Members' : m.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Task List */}
      <div
        className="bg-[#121212] rounded-xl border border-[#333333] overflow-hidden"
        ref={dropdownRef}
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#333333]">
              <th className="text-left py-4 px-6 text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                Task
              </th>
              <th className="text-left py-4 px-6 text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                Assignee
              </th>
              <th className="text-left py-4 px-6 text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                Priority
              </th>
              <th className="text-left py-4 px-6 text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-4 px-6 text-[13px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                Due
              </th>
              <th className="w-12" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((task) => (
              <tr
                key={task.id}
                className="border-b border-[#333333] last:border-0 hover:bg-[#1F1F1F] transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="text-[15px] font-medium text-[#E0E0E0]">{task.title}</div>
                  <div className="text-[13px] text-[#6B7280] mt-0.5">{task.category}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#8B5CF6] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[12px] font-medium">
                        {task.assigneeAvatar}
                      </span>
                    </div>
                    <span className="text-[15px] text-[#9CA3AF]">{task.assignee}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <PriorityBadge priority={task.priority} size="sm" />
                </td>
                <td className="py-4 px-6">
                  <StatusBadge status={task.status} />
                </td>
                <td className="py-4 px-6 text-[15px] text-[#9CA3AF]">{task.dueDate}</td>
                <td className="py-4 px-6 relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === task.id ? null : task.id)}
                    className="p-1.5 hover:bg-[#333333] rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-4 h-4 text-[#6B7280]" />
                  </button>
                  {openDropdown === task.id && (
                    <div className="absolute right-4 top-10 w-36 bg-[#1F1F1F] border border-[#333333] rounded-xl shadow-xl z-20 overflow-hidden">
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="w-full flex items-center gap-2 px-4 py-3 text-[14px] text-[#EF4444] hover:bg-[#2A2A2A] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#6B7280] text-[15px]">No tasks found.</div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#121212] rounded-2xl border border-[#333333] w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-[#333333]">
              <h2 className="text-[20px] font-semibold text-[#E0E0E0]">Assign New Task</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-[#1F1F1F] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#9CA3AF]" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                  Task Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Enter task title..."
                  className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all text-[15px]"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                  Assign To
                </label>
                <select
                  value={form.assignee}
                  onChange={(e) => setForm((f) => ({ ...f, assignee: e.target.value }))}
                  className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all text-[15px]"
                >
                  {teamMembers
                    .filter((m) => m !== 'All')
                    .map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                    Priority
                  </label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value as any }))}
                    className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all text-[15px]"
                  >
                    {['low', 'medium', 'high'].map((p) => (
                      <option key={p} value={p}>
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
                    className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all text-[15px] [color-scheme:dark]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  placeholder="e.g. Development, QA, Design..."
                  className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all text-[15px]"
                />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-[#333333]">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2.5 border border-[#333333] text-[#9CA3AF] rounded-lg hover:bg-[#1F1F1F] transition-colors text-[15px] font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!form.title.trim() || !form.dueDate}
                className="flex-1 px-4 py-2.5 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-all duration-200 text-[15px] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Assign Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
