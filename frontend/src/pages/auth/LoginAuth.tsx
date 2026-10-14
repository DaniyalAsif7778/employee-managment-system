import React, { useState } from 'react'
import { IconMail, IconLock, IconEye, IconEyeOff } from '@tabler/icons-react'
import { useContentByRoleInLogin } from '../../store/useContentByRoleInLogin.js'
import Input, { inputBase } from '../../componenets/ui/Input.js'
import { Link, useNavigate } from 'react-router'
import { Users, Shield, Briefcase, Heart, User } from 'lucide-react'

const roles = [
  {
    value: 'admin',
    label: 'Administrator',
    description: 'Full system access — manage employees, departments & settings',
    icon: Shield,
    color: '#009F8E',
    bg: '#009F8E1A',
    path: '/admin',
  },
  {
    value: 'manager',
    label: 'Manager',
    description: 'Team oversight — approve leaves, assign tasks & view reports',
    icon: Briefcase,
    color: '#8B5CF6',
    bg: '#8B5CF61A',
    path: '/manager',
  },
  {
    value: 'hr',
    label: 'HR',
    description: 'People operations — recruitment, onboarding & leave policies',
    icon: Heart,
    color: '#EC4899',
    bg: '#EC48991A',
    path: '/hr',
  },
  {
    value: 'employee',
    label: 'Employee',
    description: 'Personal workspace — tasks, schedule & leave requests',
    icon: User,
    color: '#12C4D3',
    bg: '#12C4D31A',
    path: '/employee',
  },
]
const fieldClass = `${inputBase} pl-9`
const fieldWithSuffixClass = `${inputBase} pl-9 pr-10`

const primaryBtnClass =
  'w-full rounded-md py-2.5 text-base font-medium bg-primary text-primary-fg hover:bg-primary-hover active:bg-primary-pressed transition'

export default function LoginAuth() {
  const setActiveRole = useContentByRoleInLogin((state) => state.setActiveRoleInLogin)
  const [showPw, setShowPw] = useState(false)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState('admin')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const activeRole = roles.find((r) => r.value === selectedRole)!

  const validate = () => {
    const e: Record<string, string> = {}
    if (!email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email address'
    if (!password) e.password = 'Password is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) navigate(activeRole.path)
  }

  return (
    <div className="w-full max-w-115">
      {/* Mobile logo */}
      <div className="flex items-center gap-3 mb-8 lg:hidden">
        <div className="w-9 h-9 rounded-xl bg-[#009F8E] flex items-center justify-center">
          <Users className="w-4 h-4 text-white" />
        </div>
        <span className="text-[18px] font-semibold text-[#E0E0E0]">EMS</span>
      </div>

      <h1 className="text-[28px] font-semibold text-[#E0E0E0] mb-2">Sign in to your account</h1>
      <p className="text-[15px] text-[#9CA3AF] mb-8">
        Choose your role and enter your credentials to continue.
      </p>

      {/* Role selector */}
      <div className="mb-6">
        <label className="block text-[14px] font-medium text-[#9CA3AF] mb-3">Sign in as</label>
        <div className="grid grid-cols-2 gap-2">
          {roles.map((role) => {
            const Icon = role.icon
            const isSelected = selectedRole === role.value
            return (
              <label key={role.value} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value={role.value}
                  checked={isSelected}
                  onChange={() => {
                    setSelectedRole(role.value)
                    setActiveRole(role.value)
                  }}
                  className="sr-only"
                />
                <div
                  className="flex items-center gap-3 px-3 py-3 rounded-xl border transition-all duration-200"
                  style={{
                    borderColor: isSelected ? role.color : '#333333',
                    backgroundColor: isSelected ? role.bg : '#121212',
                    boxShadow: isSelected ? `0 0 0 1px ${role.color}` : 'none',
                  }}
                >
                  {/* custom radio */}
                  <div
                    className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-150"
                    style={{ borderColor: isSelected ? role.color : '#4B5563' }}
                  >
                    {isSelected && (
                      <div
                        className="w-2 h-2 rounded-full transition-all"
                        style={{ backgroundColor: role.color }}
                      />
                    )}
                  </div>
                  <Icon
                    className="w-4 h-4 shrink-0 transition-colors"
                    style={{ color: isSelected ? role.color : '#6B7280' }}
                  />
                  <span
                    className="text-[14px] font-medium transition-colors"
                    style={{ color: isSelected ? '#E0E0E0' : '#9CA3AF' }}
                  >
                    {role.label}
                  </span>
                </div>
              </label>
            )
          })}
        </div>
      </div>

      <form className="space-y-4">
        <div className="mb-4">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="you@company.com"

            className={`w-full h-11 pl-10 pr-4 rounded-lg border bg-[#121212] text-[#E0E0E0] placeholder:text-[#4B5563] focus:outline-none focus:ring-2 transition-all text-[15px]  `}
            prefix={<IconMail size={16} className="text-text-disabled" />}
          />
        </div>

        <div className="mb-4">
          <Input
            label="Password"
            type={showPw ? 'text' : 'password'}
            name="password"
            placeholder="••••••••"

            className={`w-full h-11 pl-10 pr-4 rounded-lg border bg-[#121212] text-[#E0E0E0] placeholder:text-[#4B5563] focus:outline-none focus:ring-2 transition-all text-[15px] 
                    `}
            prefix={<IconLock size={16} className="text-text-disabled" />}
            suffix={
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="text-text-disabled"
                tabIndex={-1}
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? <IconEyeOff size={16} /> : <IconEye size={16} />}
              </button>
            }
          />
        </div>

       

        {/* Remember me */}
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => setRememberMe((v) => !v)}
            className="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-150"
            style={{
              borderColor: rememberMe ? activeRole.color : '#4B5563',
              backgroundColor: rememberMe ? activeRole.color : 'transparent',
            }}
          >
            {rememberMe && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-[14px] text-[#9CA3AF]">Remember me for 30 days</span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-11 rounded-lg text-white font-semibold text-[15px] transition-all duration-200 mt-2 hover:opacity-90"
          style={{ backgroundColor: activeRole.color }}
        >
          Sign in as {activeRole.label}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-[#1F1F1F]" />
        <span className="text-[13px] text-[#4B5563]">New to EMS?</span>
        <div className="flex-1 h-px bg-[#1F1F1F]" />
      </div>

      <Link
        to="/singup"
        className="w-full h-11 rounded-lg border border-[#333333] text-[#9CA3AF] font-medium text-[15px] flex items-center justify-center hover:bg-[#121212] hover:text-[#E0E0E0] hover:border-border-secondary transition-all duration-200"
      >
        Register your organization
      </Link>

      <p className="text-[13px] text-[#4B5563] text-center mt-6">
        © 2026 EMS. All rights reserved.
      </p>
    </div>
  )
}
