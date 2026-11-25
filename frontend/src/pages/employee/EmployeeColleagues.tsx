import { Mail, Phone, MapPin, Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const colleagues = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'HR Manager',
    department: 'HR',
    email: 'sarah.j@company.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Senior Accountant',
    department: 'Finance',
    email: 'michael.c@company.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'Recruiter',
    department: 'HR',
    email: 'emily.d@company.com',
    phone: '+1 (555) 345-6789',
    location: 'New York, NY',
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'System Admin',
    department: 'IT',
    email: 'david.w@company.com',
    phone: '+1 (555) 456-7890',
    location: 'Austin, TX',
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    role: 'Marketing Lead',
    department: 'Marketing',
    email: 'lisa.a@company.com',
    phone: '+1 (555) 567-8901',
    location: 'Los Angeles, CA',
  },
  {
    id: 6,
    name: 'James Brown',
    role: 'Sales Manager',
    department: 'Sales',
    email: 'james.b@company.com',
    phone: '+1 (555) 678-9012',
    location: 'Chicago, IL',
  },
  {
    id: 7,
    name: 'Jennifer Lee',
    role: 'Developer',
    department: 'IT',
    email: 'jennifer.l@company.com',
    phone: '+1 (555) 789-0123',
    location: 'Austin, TX',
  },
  {
    id: 8,
    name: 'Robert Taylor',
    role: 'Operations Lead',
    department: 'Operations',
    email: 'robert.t@company.com',
    phone: '+1 (555) 890-1234',
    location: 'Seattle, WA',
  },
]

const departments = ['All Departments', 'HR', 'Finance', 'IT', 'Marketing', 'Sales', 'Operations']

export default function EmployeeColleagues() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments')

  const filteredColleagues = colleagues.filter((colleague) => {
    const matchesSearch =
      colleague.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      colleague.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment =
      selectedDepartment === 'All Departments' || colleague.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">Colleagues Directory</h1>
        <p className="text-[15px] text-[#9CA3AF]">Connect with your team members</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-[#121212] rounded-xl border border-[#333333] p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search colleagues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]"
            />
          </div>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="h-10 px-4 pr-8 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all appearance-none cursor-pointer text-[15px]"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Colleagues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColleagues.map((colleague) => (
          <div
            key={colleague.id}
            className="bg-[#121212] rounded-xl border border-[#333333] p-6 hover:border-[#444444] transition-all duration-200"
          >
            {/* Profile */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-[#009F8E] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[18px] font-medium">
                  {colleague.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[16px] font-semibold text-[#E0E0E0] mb-1 truncate">
                  {colleague.name}
                </h3>
                <p className="text-[14px] text-[#9CA3AF] mb-2">{colleague.role}</p>
                <span className="inline-block px-2 py-1 rounded-md text-[13px] font-medium bg-[#12C4D31A] text-[#12C4D3]">
                  {colleague.department}
                </span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 pt-4 border-t border-[#333333]">
              <div className="flex items-center gap-2 text-[14px] text-[#9CA3AF]">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{colleague.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[14px] text-[#9CA3AF]">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{colleague.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-[14px] text-[#9CA3AF]">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{colleague.location}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-4 border-t border-[#333333] flex gap-2">
              <button
                onClick={() => navigate('/employee/messages')}
                className="flex-1 px-4 py-2 bg-[#009F8E] text-white rounded-lg hover:bg-[#12C4D3] transition-all duration-200 text-[15px] font-medium"
              >
                Message
              </button>
              <button className="px-4 py-2 border border-[#333333] rounded-lg hover:bg-[#1F1F1F] transition-colors">
                <Mail className="w-4 h-4 text-[#9CA3AF]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
