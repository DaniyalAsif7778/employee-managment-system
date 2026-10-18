import { Shield, Briefcase, Heart, User } from 'lucide-react'
import LoginAuth from './auth/LoginAuth.js'
import { useContentByRoleInLogin } from '../store/useContentByRoleInLogin.js'
import type { UserRoleOption } from '../types/singupTypes.js'
import wordmarkLogo from '../assets/logo-dark.svg'
const roles = [
  {
    value: 'admin',
    label: 'Administrator',
    description: 'Full system access — manage employees, departments & settings',
    icon: Shield,
    color: '#009F8E',
    bg: '#009F8E1A',
    path: '/dashboard/admin/:userId',
  },
  {
    value: 'manager',
    label: 'Manager',
    description: 'Team oversight — approve leaves, assign tasks & view reports',
    icon: Briefcase,
    color: '#8B5CF6',
    bg: '#8B5CF61A',
    path: '/dashboard/manager/:userId',
  },
  {
    value: 'hr',
    label: 'HR',
    description: 'People operations — recruitment, onboarding & leave policies',
    icon: Heart,
    color: '#EC4899',
    bg: '#EC48991A',
    path: '/dashboard/hr/:userId',
  },
  {
    value: 'employee',
    label: 'Employee',
    description: 'Personal workspace — tasks, schedule & leave requests',
    icon: User,
    color: '#12C4D3',
    bg: '#12C4D31A',
    path: '/dashboard/employee/:userId',
  },
]

export default function Login() {
  const role = useContentByRoleInLogin((state) => state.role)
  console.log(role)
  const activeRole: UserRoleOption | undefined = roles.find((r) => r.value === role)

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Left decorative panel */}
      <div
        className="hidden lg:flex lg:w-115 xl:w-125 flex-col justify-between p-12 relative overflow-hidden"
        style={{ backgroundColor: '#0A0A0A' }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, ${activeRole?.color} 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${activeRole?.color} 0%, transparent 50%)`,
            transition: 'background-image 0.4s ease',
          }}
        />
        {/* large accent circle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 rounded-full opacity-[0.06] transition-all duration-500"
          style={{ backgroundColor: activeRole?.color }}
        />

        <div className="relative">
          <div className="flex items-center gap-3 mb-20">
            <img
              src={wordmarkLogo}
              alt="EmpoManager"
              className="h-13 w-70 max-w-full object-contain object-left"
            />
          </div>
          <div className="mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300"
              style={{
                backgroundColor: activeRole?.bg,
                border: `1px solid ${activeRole?.color}33`,
              }}
            >
              {activeRole?.icon && <activeRole.icon className="w-8 h-8 text-white" />}
            </div>
            <h2 className="text-[32px] font-semibold text-[#E0E0E0] leading-tight mb-3">
              Welcome back,
              <br />
              <span className="transition-all duration-300" style={{ color: activeRole?.color }}>
                {activeRole?.label}
              </span>
            </h2>
            <p className="text-[15px] text-[#6B7280] leading-relaxed max-w-75">
              {activeRole?.description}
            </p>
          </div>
        </div>

        {/* Role preview dots */}
        <div className="relative flex items-center gap-2">
          {roles.map((r) => (
            <div
              key={r.value}
              className="transition-all duration-300 rounded-full"
              style={{
                width: r.value === activeRole?.value ? 24 : 8,
                height: 8,
                backgroundColor: r.value === activeRole?.value ? r.color : '#333333',
              }}
            />
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <LoginAuth />
      </div>
    </div>
  )
}
