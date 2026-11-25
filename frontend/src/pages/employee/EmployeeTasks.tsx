import { StatusBadge } from '../../componenets/ui/StatusBadge.js'
import { PriorityBadge } from '../../componenets/ui/PriorityBadge.js'
import { Filter } from 'lucide-react'
import { useState } from 'react'

const allTasks = [
  {
    id: 1,
    name: 'Review project proposal',
    description: 'Review and provide feedback on Q2 project proposal',
    priority: 'high' as const,
    dueDate: '2026-03-29',
    status: 'in-progress' as const,
    category: 'Project Management',
  },
  {
    id: 2,
    name: 'Complete quarterly report',
    description: 'Finalize Q1 performance report',
    priority: 'high' as const,
    dueDate: '2026-03-29',
    status: 'in-progress' as const,
    category: 'Documentation',
  },
  {
    id: 3,
    name: 'Team standup meeting',
    description: 'Daily team sync-up',
    priority: 'medium' as const,
    dueDate: '2026-03-29',
    status: 'pending' as const,
    category: 'Meetings',
  },
  {
    id: 4,
    name: 'Update documentation',
    description: 'Update API documentation with new endpoints',
    priority: 'low' as const,
    dueDate: '2026-03-30',
    status: 'in-progress' as const,
    category: 'Documentation',
  },
  {
    id: 5,
    name: 'Code review for PR #245',
    description: 'Review and approve pull request',
    priority: 'medium' as const,
    dueDate: '2026-03-30',
    status: 'in-progress' as const,
    category: 'Development',
  },
  {
    id: 6,
    name: 'Bug fix: Login issue',
    description: 'Fix authentication bug reported in staging',
    priority: 'high' as const,
    dueDate: '2026-04-01',
    status: 'in-progress' as const,
    category: 'Development',
  },
  {
    id: 7,
    name: 'Client presentation prep',
    description: 'Prepare slides for client demo',
    priority: 'medium' as const,
    dueDate: '2026-04-02',
    status: 'pending' as const,
    category: 'Project Management',
  },
  {
    id: 8,
    name: 'Weekly report submission',
    description: 'Submit weekly progress report',
    priority: 'low' as const,
    dueDate: '2026-03-28',
    status: 'done' as const,
    category: 'Documentation',
  },
]

const statusFilters = ['All', 'In Progress', 'Pending', 'Done']

export default function EmployeeTasks() {
  const [selectedStatus, setSelectedStatus] = useState('All')

  const filteredTasks = allTasks.filter((task) => {
    if (selectedStatus === 'All') return true
    return task.status.toLowerCase().replace('-', ' ') === selectedStatus.toLowerCase()
  })

  return (
    <>
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">My Tasks</h1>
          <p className="text-[15px] text-[#9CA3AF]">Manage your assigned tasks</p>
        </div>
      </div>

      {/* Status Filter */}
      <div className="bg-[#121212] rounded-xl border border-[#333333] p-4 mb-6">
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-[#9CA3AF]" />
          <div className="flex gap-2">
            {statusFilters.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg text-[15px] font-medium transition-all duration-200 ${
                  selectedStatus === status
                    ? 'bg-[#009F8E] text-white'
                    : 'bg-[#1F1F1F] text-[#9CA3AF] hover:text-[#E0E0E0] hover:bg-[#2A2A2A]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-[#121212] rounded-xl border border-[#333333] p-6 hover:border-[#444444] transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-[16px] font-semibold text-[#E0E0E0] mb-2">{task.name}</h3>
                <p className="text-[14px] text-[#9CA3AF] leading-relaxed">{task.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <PriorityBadge priority={task.priority} size="sm" />
              <StatusBadge status={task.status} size="sm" />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#333333]">
              <div>
                <div className="text-[13px] text-[#6B7280] mb-1">Category</div>
                <div className="text-[14px] text-[#E0E0E0] font-medium">{task.category}</div>
              </div>
              <div className="text-right">
                <div className="text-[13px] text-[#6B7280] mb-1">Due Date</div>
                <div className="text-[14px] text-[#E0E0E0] font-medium">{task.dueDate}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
