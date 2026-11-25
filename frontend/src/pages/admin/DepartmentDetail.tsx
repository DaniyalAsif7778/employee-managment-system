import { useParams, useNavigate } from 'react-router'
import {
  ArrowLeft,
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Award,
  Target,
  Activity,
  MoreVertical,
  Edit,
  Trash2,
  UserPlus,
  Download,
  Share2,
  Archive,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { useState, useRef, useEffect } from 'react'
import EditDepartmentModal from '../../componenets/ui/EditDepartmentModal.js'
import DeleteConfirmationModal from '../../componenets/ui/DeleteConfirmationModal.js'
import EmployeeProfileSidebar from '../../componenets/ui/EmployeeProfileSidebar.js'

// Department data (in real app, this would come from an API)
const departments = [
  {
    id: 1,
    name: 'Engineering',
    manager: 'David Wilson',
    managerEmail: 'david.wilson@company.com',
    managerPhone: '+1 (555) 123-4567',
    location: 'Building A, Floor 3',
    employees: 45,
    budget: '$2.4M',
    budgetUsed: 1850000,
    budgetTotal: 2400000,
    performance: 94,
    color: '#009F8E',
    description:
      'Responsible for developing and maintaining all software products and technical infrastructure.',
    established: 'Jan 2018',
    objectives: [
      'Deliver high-quality software products',
      'Maintain 99.9% uptime for critical systems',
      'Reduce technical debt by 30%',
      'Implement CI/CD pipelines across all projects',
    ],
    recentProjects: [
      { name: 'Mobile App Redesign', status: 'In Progress', progress: 75 },
      { name: 'API Gateway Migration', status: 'Completed', progress: 100 },
      { name: 'Microservices Architecture', status: 'In Progress', progress: 45 },
      { name: 'Security Audit Implementation', status: 'Planning', progress: 15 },
    ],
    employees_list: [
      {
        id: 1,
        name: 'Alice Johnson',
        role: 'Senior Developer',
        avatar: 'AJ',
        performance: 95,
        status: 'Active',
      },
      {
        id: 2,
        name: 'Bob Smith',
        role: 'Frontend Developer',
        avatar: 'BS',
        performance: 88,
        status: 'Active',
      },
      {
        id: 3,
        name: 'Charlie Davis',
        role: 'Backend Developer',
        avatar: 'CD',
        performance: 92,
        status: 'Active',
      },
      {
        id: 4,
        name: 'Diana Prince',
        role: 'DevOps Engineer',
        avatar: 'DP',
        performance: 90,
        status: 'Active',
      },
      {
        id: 5,
        name: 'Ethan Hunt',
        role: 'QA Engineer',
        avatar: 'EH',
        performance: 87,
        status: 'On Leave',
      },
      {
        id: 6,
        name: 'Fiona Green',
        role: 'UI/UX Developer',
        avatar: 'FG',
        performance: 93,
        status: 'Active',
      },
    ],
  },
  {
    id: 2,
    name: 'Design',
    manager: 'Sarah Johnson',
    managerEmail: 'sarah.johnson@company.com',
    managerPhone: '+1 (555) 234-5678',
    location: 'Building B, Floor 2',
    employees: 12,
    budget: '$680K',
    budgetUsed: 520000,
    budgetTotal: 680000,
    performance: 88,
    color: '#12C4D3',
    description:
      'Creates exceptional user experiences and visual designs for all company products.',
    established: 'Mar 2019',
    objectives: [
      'Establish comprehensive design system',
      'Improve user satisfaction scores by 25%',
      'Launch new brand identity',
      'Conduct quarterly UX research',
    ],
    recentProjects: [
      { name: 'Design System V2', status: 'In Progress', progress: 60 },
      { name: 'Brand Refresh', status: 'Completed', progress: 100 },
      { name: 'Mobile UI Components', status: 'In Progress', progress: 35 },
      { name: 'User Research Study', status: 'Planning', progress: 20 },
    ],
    employees_list: [
      {
        id: 7,
        name: 'Grace Lee',
        role: 'Lead Designer',
        avatar: 'GL',
        performance: 96,
        status: 'Active',
      },
      {
        id: 8,
        name: 'Henry Wong',
        role: 'UI Designer',
        avatar: 'HW',
        performance: 84,
        status: 'Active',
      },
      {
        id: 9,
        name: 'Iris Chen',
        role: 'UX Researcher',
        avatar: 'IC',
        performance: 91,
        status: 'Active',
      },
      {
        id: 10,
        name: 'Jack Wilson',
        role: 'Graphic Designer',
        avatar: 'JW',
        performance: 86,
        status: 'Active',
      },
    ],
  },
  {
    id: 3,
    name: 'Product',
    manager: 'Michael Chen',
    managerEmail: 'michael.chen@company.com',
    managerPhone: '+1 (555) 345-6789',
    location: 'Building A, Floor 2',
    employees: 18,
    budget: '$920K',
    budgetUsed: 735000,
    budgetTotal: 920000,
    performance: 92,
    color: '#00BF6B',
    description:
      'Defines product strategy and roadmap, ensuring market fit and customer satisfaction.',
    established: 'Jun 2019',
    objectives: [
      'Launch 3 major product features per quarter',
      'Achieve 40% user adoption for new features',
      'Reduce customer churn by 15%',
      'Increase NPS score to 75+',
    ],
    recentProjects: [
      { name: 'Analytics Dashboard', status: 'In Progress', progress: 80 },
      { name: 'Mobile Feature Parity', status: 'In Progress', progress: 55 },
      { name: 'API Marketplace', status: 'Completed', progress: 100 },
      { name: 'Customer Portal Redesign', status: 'Planning', progress: 10 },
    ],
    employees_list: [
      {
        id: 11,
        name: 'Karen Martinez',
        role: 'Product Manager',
        avatar: 'KM',
        performance: 94,
        status: 'Active',
      },
      {
        id: 12,
        name: 'Leo Zhang',
        role: 'Product Analyst',
        avatar: 'LZ',
        performance: 89,
        status: 'Active',
      },
      {
        id: 13,
        name: 'Maria Garcia',
        role: 'Product Designer',
        avatar: 'MG',
        performance: 91,
        status: 'Active',
      },
    ],
  },
  {
    id: 4,
    name: 'Marketing',
    manager: 'Lisa Anderson',
    managerEmail: 'lisa.anderson@company.com',
    managerPhone: '+1 (555) 456-7890',
    location: 'Building C, Floor 1',
    employees: 22,
    budget: '$1.2M',
    budgetUsed: 980000,
    budgetTotal: 1200000,
    performance: 85,
    color: '#FFC107',
    description:
      'Drives brand awareness, lead generation, and customer engagement across all channels.',
    established: 'Feb 2018',
    objectives: [
      'Increase brand awareness by 50%',
      'Generate 10,000 qualified leads per quarter',
      'Launch 5 major campaigns annually',
      'Grow social media following by 100%',
    ],
    recentProjects: [
      { name: 'Q2 Product Launch Campaign', status: 'In Progress', progress: 70 },
      { name: 'Content Marketing Strategy', status: 'Completed', progress: 100 },
      { name: 'Influencer Partnership Program', status: 'In Progress', progress: 40 },
      { name: 'Event Marketing Series', status: 'Planning', progress: 25 },
    ],
    employees_list: [
      {
        id: 14,
        name: 'Nathan Brown',
        role: 'Marketing Director',
        avatar: 'NB',
        performance: 88,
        status: 'Active',
      },
      {
        id: 15,
        name: 'Olivia Taylor',
        role: 'Content Strategist',
        avatar: 'OT',
        performance: 85,
        status: 'Active',
      },
      {
        id: 16,
        name: 'Paul Robinson',
        role: 'Social Media Manager',
        avatar: 'PR',
        performance: 83,
        status: 'Active',
      },
    ],
  },
  {
    id: 5,
    name: 'Sales',
    manager: 'James Brown',
    managerEmail: 'james.brown@company.com',
    managerPhone: '+1 (555) 567-8901',
    location: 'Building A, Floor 1',
    employees: 38,
    budget: '$1.8M',
    budgetUsed: 1520000,
    budgetTotal: 1800000,
    performance: 91,
    color: '#3B82F6',
    description: 'Drives revenue growth through customer acquisition and relationship management.',
    established: 'Jan 2018',
    objectives: [
      'Achieve $15M in annual revenue',
      'Increase average deal size by 30%',
      'Reduce sales cycle by 20%',
      'Maintain 85%+ customer retention',
    ],
    recentProjects: [
      { name: 'Enterprise Sales Expansion', status: 'In Progress', progress: 65 },
      { name: 'CRM System Upgrade', status: 'Completed', progress: 100 },
      { name: 'Partner Channel Development', status: 'In Progress', progress: 50 },
      { name: 'Sales Training Program', status: 'In Progress', progress: 30 },
    ],
    employees_list: [
      {
        id: 17,
        name: 'Quinn Adams',
        role: 'Sales Director',
        avatar: 'QA',
        performance: 93,
        status: 'Active',
      },
      {
        id: 18,
        name: 'Rachel Green',
        role: 'Account Executive',
        avatar: 'RG',
        performance: 90,
        status: 'Active',
      },
      {
        id: 19,
        name: 'Steve Rogers',
        role: 'Sales Engineer',
        avatar: 'SR',
        performance: 89,
        status: 'Active',
      },
    ],
  },
  {
    id: 6,
    name: 'HR',
    manager: 'Emily Davis',
    managerEmail: 'emily.davis@company.com',
    managerPhone: '+1 (555) 678-9012',
    location: 'Building B, Floor 1',
    employees: 8,
    budget: '$450K',
    budgetUsed: 380000,
    budgetTotal: 450000,
    performance: 96,
    color: '#8B5CF6',
    description: 'Manages talent acquisition, employee development, and organizational culture.',
    established: 'Jan 2018',
    objectives: [
      'Reduce time-to-hire to 30 days',
      'Achieve 90%+ employee satisfaction',
      'Implement comprehensive L&D program',
      'Reduce turnover rate to <10%',
    ],
    recentProjects: [
      { name: 'Employee Wellness Program', status: 'In Progress', progress: 85 },
      { name: 'Performance Review System', status: 'Completed', progress: 100 },
      { name: 'Diversity & Inclusion Initiative', status: 'In Progress', progress: 60 },
      { name: 'Onboarding Automation', status: 'Planning', progress: 15 },
    ],
    employees_list: [
      {
        id: 20,
        name: 'Tina Turner',
        role: 'HR Manager',
        avatar: 'TT',
        performance: 97,
        status: 'Active',
      },
      {
        id: 21,
        name: 'Uma Patel',
        role: 'Recruiter',
        avatar: 'UP',
        performance: 95,
        status: 'Active',
      },
      {
        id: 22,
        name: 'Victor Cruz',
        role: 'HR Specialist',
        avatar: 'VC',
        performance: 94,
        status: 'Active',
      },
    ],
  },
  {
    id: 7,
    name: 'Finance',
    manager: 'Robert Taylor',
    managerEmail: 'robert.taylor@company.com',
    managerPhone: '+1 (555) 789-0123',
    location: 'Building C, Floor 3',
    employees: 15,
    budget: '$780K',
    budgetUsed: 650000,
    budgetTotal: 780000,
    performance: 90,
    color: '#EC4899',
    description: 'Manages financial planning, accounting, and compliance across the organization.',
    established: 'Jan 2018',
    objectives: [
      'Maintain healthy cash flow',
      'Reduce operational costs by 12%',
      'Ensure 100% audit compliance',
      'Implement automated reporting',
    ],
    recentProjects: [
      { name: 'Financial Forecasting Model', status: 'In Progress', progress: 55 },
      { name: 'Expense Management System', status: 'Completed', progress: 100 },
      { name: 'Budget Planning Tool', status: 'In Progress', progress: 70 },
      { name: 'Tax Compliance Audit', status: 'Planning', progress: 20 },
    ],
    employees_list: [
      {
        id: 23,
        name: 'Wendy White',
        role: 'Finance Manager',
        avatar: 'WW',
        performance: 92,
        status: 'Active',
      },
      {
        id: 24,
        name: 'Xavier Black',
        role: 'Financial Analyst',
        avatar: 'XB',
        performance: 88,
        status: 'Active',
      },
      {
        id: 25,
        name: 'Yara Khan',
        role: 'Accountant',
        avatar: 'YK',
        performance: 90,
        status: 'Active',
      },
    ],
  },
  {
    id: 8,
    name: 'Operations',
    manager: 'Jennifer Lee',
    managerEmail: 'jennifer.lee@company.com',
    managerPhone: '+1 (555) 890-1234',
    location: 'Building A, Floor 4',
    employees: 28,
    budget: '$1.1M',
    budgetUsed: 920000,
    budgetTotal: 1100000,
    performance: 87,
    color: '#F97316',
    description:
      'Ensures efficient business operations, process optimization, and resource management.',
    established: 'May 2018',
    objectives: [
      'Improve operational efficiency by 25%',
      'Reduce process bottlenecks',
      'Implement lean methodologies',
      'Achieve ISO certification',
    ],
    recentProjects: [
      { name: 'Process Automation Initiative', status: 'In Progress', progress: 68 },
      { name: 'Vendor Management System', status: 'Completed', progress: 100 },
      { name: 'Quality Assurance Program', status: 'In Progress', progress: 45 },
      { name: 'Facility Upgrade Project', status: 'Planning', progress: 10 },
    ],
    employees_list: [
      {
        id: 26,
        name: 'Zack Morris',
        role: 'Operations Manager',
        avatar: 'ZM',
        performance: 89,
        status: 'Active',
      },
      {
        id: 27,
        name: 'Amy Cooper',
        role: 'Operations Analyst',
        avatar: 'AC',
        performance: 86,
        status: 'Active',
      },
      {
        id: 28,
        name: 'Ben Parker',
        role: 'Process Engineer',
        avatar: 'BP',
        performance: 88,
        status: 'Active',
      },
    ],
  },
]

// Performance trend data (sample)
const performanceTrend = [
  { month: 'Jan', performance: 85 },
  { month: 'Feb', performance: 87 },
  { month: 'Mar', performance: 89 },
  { month: 'Apr', performance: 91 },
  { month: 'May', performance: 94 },
]

// Budget allocation data
const budgetData = [
  { name: 'Salaries', value: 60 },
  { name: 'Tools & Software', value: 20 },
  { name: 'Training', value: 10 },
  { name: 'Operations', value: 10 },
]

const COLORS = ['#009F8E', '#12C4D3', '#00BF6B', '#FFC107']

export default function DepartmentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  // State management
  const [showDropdown, setShowDropdown] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const department = departments.find((d) => d.id === Number(id))

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!department) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-96">
          <h2 className="text-[24px] font-semibold text-[#E0E0E0] mb-4">Department Not Found</h2>
          <button
            onClick={() => navigate('..', { relative: 'path' })}
            className="px-4 py-2 bg-[#009F8E] text-white rounded-lg hover:bg-[#12C4D3] transition-all"
          >
            Back to Departments
          </button>
        </div>
      </>
    )
  }

  const budgetPercentage = (department.budgetUsed / department.budgetTotal) * 100

  // Handler functions
  const handleEditDepartment = (updatedData: any) => {
    console.log('Department updated:', updatedData)
    // In real app, this would call an API to update the department
    setShowEditModal(false)
  }

  const handleDeleteDepartment = () => {
    console.log('Department deleted:', department.id)
    // In real app, this would call an API to delete the department
    setShowDeleteModal(false)
    navigate('..', { relative: 'path' })
  }

  const handleEmployeeClick = (employee: any) => {
    // Create complete employee profile data
    const employeeProfile = {
      ...employee,
      email: `${employee.name.toLowerCase().replace(' ', '.')}@company.com`,
      phone: '+1 (555) 000-0000',
      department: department.name,
      location: department.location,
      joinDate: 'Jan 15, 2023',
      manager: department.manager,
      employeeId: `EMP-${String(employee.id).padStart(4, '0')}`,
      recentActivity: [
        { action: 'Completed task: API Integration', date: 'May 14, 2026', time: '2:30 PM' },
        { action: 'Submitted report: Weekly Progress', date: 'May 13, 2026', time: '11:00 AM' },
        { action: 'Attended meeting: Team Standup', date: 'May 12, 2026', time: '9:00 AM' },
      ],
      stats: {
        tasksCompleted: 45,
        totalTasks: 52,
        attendanceRate: 96,
        leavesTaken: 5,
        totalLeaves: 15,
      },
    }
    setSelectedEmployee(employeeProfile)
  }

  return (
    <>
      {/* Back Button & Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('..', { relative: 'path' })}
          className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#009F8E] transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-[15px]">Back to Departments</span>
        </button>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: department.color }}
              ></div>
              <h1 className="text-[28px] font-semibold text-[#E0E0E0]">{department.name}</h1>
            </div>
            <p className="text-[15px] text-[#9CA3AF]">{department.description}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#121212] text-[#E0E0E0] rounded-lg hover:bg-[#1F1F1F] transition-all border border-[#333333]"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-2 bg-[#121212] text-[#E0E0E0] rounded-lg hover:bg-[#1F1F1F] transition-all border border-[#333333]"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 top-12 w-56 bg-[#121212] border border-[#333333] rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setShowEditModal(true)
                        setShowDropdown(false)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[#E0E0E0] hover:bg-[#1F1F1F] transition-colors"
                    >
                      <Edit className="w-4 h-4 text-[#9CA3AF]" />
                      <span className="text-[14px]">Edit Department</span>
                    </button>
                    <button
                      onClick={() => {
                        console.log('Export data')
                        setShowDropdown(false)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[#E0E0E0] hover:bg-[#1F1F1F] transition-colors"
                    >
                      <Download className="w-4 h-4 text-[#9CA3AF]" />
                      <span className="text-[14px]">Export Data</span>
                    </button>
                    <button
                      onClick={() => {
                        console.log('Share department')
                        setShowDropdown(false)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[#E0E0E0] hover:bg-[#1F1F1F] transition-colors"
                    >
                      <Share2 className="w-4 h-4 text-[#9CA3AF]" />
                      <span className="text-[14px]">Share</span>
                    </button>
                    <button
                      onClick={() => {
                        console.log('Archive department')
                        setShowDropdown(false)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[#E0E0E0] hover:bg-[#1F1F1F] transition-colors"
                    >
                      <Archive className="w-4 h-4 text-[#9CA3AF]" />
                      <span className="text-[14px]">Archive</span>
                    </button>
                  </div>
                  <div className="border-t border-[#333333] py-2">
                    <button
                      onClick={() => {
                        setShowDeleteModal(true)
                        setShowDropdown(false)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-[14px] font-medium">Delete Department</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#1F1F1F] rounded-lg">
              <Users className="w-5 h-5" style={{ color: department.color }} />
            </div>
            <span className="text-[14px] text-[#9CA3AF]">Total Employees</span>
          </div>
          <p className="text-[28px] font-semibold text-[#E0E0E0]">{department.employees}</p>
          <p className="text-[13px] text-[#6B7280] mt-1">Active members</p>
        </div>

        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#1F1F1F] rounded-lg">
              <DollarSign className="w-5 h-5" style={{ color: department.color }} />
            </div>
            <span className="text-[14px] text-[#9CA3AF]">Annual Budget</span>
          </div>
          <p className="text-[28px] font-semibold text-[#E0E0E0]">{department.budget}</p>
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[13px] text-[#6B7280]">Used</span>
              <span className="text-[13px] text-[#6B7280]">{budgetPercentage.toFixed(0)}%</span>
            </div>
            <div className="h-1.5 bg-[#1F1F1F] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${budgetPercentage}%`,
                  backgroundColor: department.color,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#1F1F1F] rounded-lg">
              <TrendingUp className="w-5 h-5" style={{ color: department.color }} />
            </div>
            <span className="text-[14px] text-[#9CA3AF]">Performance</span>
          </div>
          <p className="text-[28px] font-semibold text-[#E0E0E0]">{department.performance}%</p>
          <p className="text-[13px] text-[#00BF6B] mt-1">↑ 5% from last month</p>
        </div>

        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#1F1F1F] rounded-lg">
              <Calendar className="w-5 h-5" style={{ color: department.color }} />
            </div>
            <span className="text-[14px] text-[#9CA3AF]">Established</span>
          </div>
          <p className="text-[28px] font-semibold text-[#E0E0E0]">{department.established}</p>
          <p className="text-[13px] text-[#6B7280] mt-1">Department founded</p>
        </div>
      </div>

      {/* Manager Info & Objectives */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Manager Card */}
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <h3 className="text-[18px] font-semibold text-[#E0E0E0] mb-4">Department Manager</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#009F8E] to-[#12C4D3] flex items-center justify-center text-white text-[20px] font-semibold">
              {department.manager
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div>
              <p className="text-[16px] font-semibold text-[#E0E0E0]">{department.manager}</p>
              <p className="text-[14px] text-[#9CA3AF]">Department Head</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-[14px]">
              <Mail className="w-4 h-4 text-[#9CA3AF]" />
              <span className="text-[#9CA3AF]">{department.managerEmail}</span>
            </div>
            <div className="flex items-center gap-3 text-[14px]">
              <Phone className="w-4 h-4 text-[#9CA3AF]" />
              <span className="text-[#9CA3AF]">{department.managerPhone}</span>
            </div>
            <div className="flex items-center gap-3 text-[14px]">
              <MapPin className="w-4 h-4 text-[#9CA3AF]" />
              <span className="text-[#9CA3AF]">{department.location}</span>
            </div>
          </div>
        </div>

        {/* Objectives */}
        <div className="lg:col-span-2 bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5" style={{ color: department.color }} />
            <h3 className="text-[18px] font-semibold text-[#E0E0E0]">Key Objectives</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {department.objectives.map((objective, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-[#1F1F1F] rounded-lg">
                <div className="mt-0.5">
                  <Award className="w-4 h-4" style={{ color: department.color }} />
                </div>
                <span className="text-[14px] text-[#E0E0E0]">{objective}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Performance Trend */}
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <h3 className="text-[18px] font-semibold text-[#E0E0E0] mb-4">Performance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={performanceTrend}>
              <defs>
                <linearGradient id={`gradient-${department.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={department.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={department.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#333333"
                key={`grid-dept-${department.id}`}
              />
              <XAxis
                dataKey="month"
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
                key={`xaxis-dept-${department.id}`}
              />
              <YAxis
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
                key={`yaxis-dept-${department.id}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F1F1F',
                  border: '1px solid #333333',
                  borderRadius: '8px',
                  color: '#E0E0E0',
                }}
                key={`tooltip-area-dept-${department.id}`}
              />
              <Area
                type="monotone"
                dataKey="performance"
                stroke={department.color}
                strokeWidth={2}
                fill={`url(#gradient-${department.id})`}
                key={`area-dept-${department.id}`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Budget Allocation */}
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <h3 className="text-[18px] font-semibold text-[#E0E0E0] mb-4">Budget Allocation</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={budgetData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                key={`pie-dept-${department.id}`}
              >
                {budgetData.map((entry, index) => (
                  <Cell
                    key={`dept-${department.id}-cell-${index}`}
                    fill={COLORS[index % COLORS.length] ?? '#009F8E'}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F1F1F',
                  border: '1px solid #333333',
                  borderRadius: '8px',
                  color: '#E0E0E0',
                }}
                key={`tooltip-pie-dept-${department.id}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-[#121212] rounded-xl p-6 border border-[#333333] mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5" style={{ color: department.color }} />
            <h3 className="text-[18px] font-semibold text-[#E0E0E0]">Recent Projects</h3>
          </div>
          <button className="text-[14px] text-[#009F8E] hover:text-[#12C4D3] transition-colors">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {department.recentProjects.map((project, index) => (
            <div key={index} className="p-4 bg-[#1F1F1F] rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[15px] font-medium text-[#E0E0E0]">{project.name}</h4>
                <span
                  className={`px-3 py-1 rounded-full text-[13px] ${
                    project.status === 'Completed'
                      ? 'bg-[#00BF6B]/10 text-[#00BF6B]'
                      : project.status === 'In Progress'
                        ? 'bg-[#009F8E]/10 text-[#009F8E]'
                        : 'bg-[#FFC107]/10 text-[#FFC107]'
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-[#121212] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${project.progress}%`,
                      backgroundColor: department.color,
                    }}
                  ></div>
                </div>
                <span className="text-[14px] font-medium text-[#E0E0E0] min-w-[45px] text-right">
                  {project.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Employees List */}
      <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[18px] font-semibold text-[#E0E0E0]">Department Employees</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#009F8E] text-white rounded-lg hover:bg-[#12C4D3] transition-all text-[14px]">
            <UserPlus className="w-4 h-4" />
            Add Employee
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#333333]">
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#9CA3AF]">
                  Employee
                </th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#9CA3AF]">Role</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#9CA3AF]">
                  Performance
                </th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#9CA3AF]">
                  Status
                </th>
                <th className="text-right py-3 px-4 text-[14px] font-medium text-[#9CA3AF]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {department.employees_list.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-[#333333] hover:bg-[#1F1F1F] transition-colors cursor-pointer"
                  onClick={() => handleEmployeeClick(employee)}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[14px] font-semibold"
                        style={{ backgroundColor: department.color }}
                      >
                        {employee.avatar}
                      </div>
                      <span className="text-[15px] text-[#E0E0E0]">{employee.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[14px] text-[#9CA3AF]">{employee.role}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-[#1F1F1F] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${employee.performance}%`,
                            backgroundColor: department.color,
                          }}
                        ></div>
                      </div>
                      <span className="text-[14px] text-[#E0E0E0] min-w-[40px]">
                        {employee.performance}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[13px] ${
                        employee.status === 'Active'
                          ? 'bg-[#00BF6B]/10 text-[#00BF6B]'
                          : 'bg-[#FFC107]/10 text-[#FFC107]'
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log('Edit employee:', employee.id)
                        }}
                        className="p-2 hover:bg-[#121212] rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4 text-[#9CA3AF]" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log('Delete employee:', employee.id)
                        }}
                        className="p-2 hover:bg-[#121212] rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-[#9CA3AF]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showEditModal && (
        <EditDepartmentModal
          department={department}
          onClose={() => setShowEditModal(false)}
          onSave={handleEditDepartment}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          title="Delete Department"
          message="Are you sure you want to delete this department?"
          itemName={department.name}
          onConfirm={handleDeleteDepartment}
          onCancel={() => setShowDeleteModal(false)}
          confirmText="Delete Department"
          dangerLevel="high"
        />
      )}

      {/* Employee Profile Sidebar */}
      {selectedEmployee && (
        <EmployeeProfileSidebar
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          departmentColor={department.color}
        />
      )}
    </>
  )
}
