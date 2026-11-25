import { Plus, Users, TrendingUp, MoreVertical, Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const departments = [
  {
    id: 1,
    name: 'Engineering',
    manager: 'David Wilson',
    employees: 45,
    budget: '$2.4M',
    performance: 94,
    color: '#009F8E',
  },
  {
    id: 2,
    name: 'Design',
    manager: 'Sarah Johnson',
    employees: 12,
    budget: '$680K',
    performance: 88,
    color: '#12C4D3',
  },
  {
    id: 3,
    name: 'Product',
    manager: 'Michael Chen',
    employees: 18,
    budget: '$920K',
    performance: 92,
    color: '#00BF6B',
  },
  {
    id: 4,
    name: 'Marketing',
    manager: 'Lisa Anderson',
    employees: 22,
    budget: '$1.2M',
    performance: 85,
    color: '#FFC107',
  },
  {
    id: 5,
    name: 'Sales',
    manager: 'James Brown',
    employees: 38,
    budget: '$1.8M',
    performance: 91,
    color: '#3B82F6',
  },
  {
    id: 6,
    name: 'HR',
    manager: 'Emily Davis',
    employees: 8,
    budget: '$450K',
    performance: 96,
    color: '#8B5CF6',
  },
  {
    id: 7,
    name: 'Finance',
    manager: 'Robert Taylor',
    employees: 15,
    budget: '$780K',
    performance: 90,
    color: '#EC4899',
  },
  {
    id: 8,
    name: 'Operations',
    manager: 'Jennifer Lee',
    employees: 28,
    budget: '$1.1M',
    performance: 87,
    color: '#F97316',
  },
]

export default function AdminDepartments() {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.manager.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">Departments</h1>
          <p className="text-[15px] text-[#9CA3AF]">Manage company departments and teams</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#009F8E] text-white rounded-lg hover:bg-[#12C4D3] transition-all duration-200 text-[15px] font-medium">
          <Plus className="w-4 h-4" />
          Add Department
        </button>
      </div>

      {/* Search & Stats */}
      <div className="mb-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]"
            />
          </div>
        </div>
        <div className="lg:col-span-3 grid grid-cols-3 gap-4">
          <div className="bg-[#121212] rounded-xl p-4 border border-[#333333]">
            <p className="text-[13px] text-[#9CA3AF] mb-1">Total Departments</p>
            <p className="text-[24px] font-semibold text-[#E0E0E0]">{departments.length}</p>
          </div>
          <div className="bg-[#121212] rounded-xl p-4 border border-[#333333]">
            <p className="text-[13px] text-[#9CA3AF] mb-1">Total Employees</p>
            <p className="text-[24px] font-semibold text-[#E0E0E0]">
              {departments.reduce((sum, d) => sum + d.employees, 0)}
            </p>
          </div>
          <div className="bg-[#121212] rounded-xl p-4 border border-[#333333]">
            <p className="text-[13px] text-[#9CA3AF] mb-1">Avg Performance</p>
            <p className="text-[24px] font-semibold text-[#E0E0E0]">
              {Math.round(
                departments.reduce((sum, d) => sum + d.performance, 0) / departments.length
              )}
              %
            </p>
          </div>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDepartments.map((dept) => (
          <div
            key={dept.id}
            className="bg-[#121212] rounded-xl border border-[#333333] hover:border-[#444444] transition-all duration-200 overflow-hidden group cursor-pointer"
            onClick={() => navigate(String(dept.id), { relative: 'path' })}
          >
            <div className="h-2" style={{ backgroundColor: dept.color }}></div>
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-[18px] font-semibold text-[#E0E0E0] mb-1">{dept.name}</h3>
                  <p className="text-[14px] text-[#9CA3AF]">{dept.manager}</p>
                </div>
                <button className="p-1.5 hover:bg-[#1F1F1F] rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                  <MoreVertical className="w-4 h-4 text-[#9CA3AF]" />
                </button>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#9CA3AF]" />
                    <span className="text-[14px] text-[#9CA3AF]">Employees</span>
                  </div>
                  <span className="text-[15px] font-medium text-[#E0E0E0]">{dept.employees}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-[#9CA3AF]">Budget</span>
                  <span className="text-[15px] font-medium text-[#E0E0E0]">{dept.budget}</span>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#9CA3AF]" />
                      <span className="text-[14px] text-[#9CA3AF]">Performance</span>
                    </div>
                    <span className="text-[15px] font-medium text-[#E0E0E0]">
                      {dept.performance}%
                    </span>
                  </div>
                  <div className="h-2 bg-[#1F1F1F] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${dept.performance}%`,
                        backgroundColor: dept.color,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                className="mt-4 w-full py-2 text-[15px] font-medium text-[#009F8E] hover:text-[#12C4D3] transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(String(dept.id), { relative: 'path' })
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
