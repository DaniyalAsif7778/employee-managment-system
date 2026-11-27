import React, { useEffect, useState } from 'react'
import { IconMail, IconLock, IconEye, IconEyeOff } from '@tabler/icons-react'
import { useContentByRoleInLogin } from '../../store/useContentByRoleInLogin.js'
import Input, { inputBase } from '../../componenets/ui/Input.js'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { Shield, Briefcase, Heart, User, type LucideIcon } from 'lucide-react'
import { useLogin } from '../../hooks/useAuth.js'
import { useLoginSlice } from '../../store/LoginSlice.js'
import type { LoginCredentials, LoginRole } from '../../types.js'
import { getDashboardPath, isUserRole } from '../../lib/authRoutes.js'
import { useForm } from 'react-hook-form'
import wordmarkLogo from '../../assets/logo-dark.svg'

const roles: Array<{
  value: LoginRole
  label: string
  description: string
  icon: LucideIcon
  color: string
  bg: string
}> = [
  {
    value: 'admins',
    label: 'Administrator',
    description: 'Full system access — manage employees, departments & settings',
    icon: Shield,
    color: '#009F8E',
    bg: '#009F8E1A',
  },
  {
    value: 'managers',
    label: 'Manager',
    description: 'Team oversight — approve leaves, assign tasks & view reports',
    icon: Briefcase,
    color: '#8B5CF6',
    bg: '#8B5CF61A',
  },
  {
    value: 'hrs',
    label: 'HR',
    description: 'People operations — recruitment, onboarding & leave policies',
    icon: Heart,
    color: '#EC4899',
    bg: '#EC48991A',
  },
  {
    value: 'employees',
    label: 'Employee',
    description: 'Personal workspace — tasks, schedule & leave requests',
    icon: User,
    color: '#12C4D3',
    bg: '#12C4D31A',
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
  const [searchParams] = useSearchParams()
  const { mutate, isPending, isError } = useLogin()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const setAuthenticatedUser = useLoginSlice((state) => state.setAuthenticatedUser)
  const setRolePreview = useLoginSlice((state) => state.setRolePreview)
  const requestedRole = searchParams.get('role')?.trim().toLowerCase()
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors: fieldErrors },
  } = useForm<LoginCredentials>({
    defaultValues: {
      email: '',
      password: '',
      role: isUserRole(requestedRole) ? requestedRole : 'admins',
      rememberMe: false,
    },
  })

  const selectedRole = watch('role')
  const activeRole = roles.find((r) => r.value === selectedRole)!
  useEffect(() => setActiveRole(selectedRole), [selectedRole, setActiveRole])
  const emailRegistration = register('email', {
    required: 'Email is required',
    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
  })
  const passwordRegistration = register('password', { required: 'Password is required' })
  const roleRegistration = register('role')
  const rememberRegistration = register('rememberMe')

  const submitLogin = (credentials: LoginCredentials) => {
    setErrors({})
    mutate(credentials, {
      onSuccess: (response) => {
        console.log('Login response:', response)
        const responseRole = response.data?.user?.[0]?.role
        const userId = response.data?.user?.[0]?.id
        console.log('Response user ID:', userId)
        if (!isUserRole(responseRole) || !userId) {
          console.log('Invalid user role or ID')
          setErrors({ form: 'Select your role.' })
          return
        }

        setAuthenticatedUser(responseRole, userId)
        navigate(getDashboardPath(responseRole, userId))
      },
    })
  }

  const openRolePreview = (role: LoginRole) => {
    const previewUserId = `preview-${role}`
    setRolePreview(role, previewUserId)
    navigate(getDashboardPath(role, previewUserId))
  }

  return (
    <div className="w-full max-w-115">
      {/* Mobile logo */}
      <div className="flex items-center gap-3 mb-8 lg:hidden">
        <img
          src={wordmarkLogo}
          alt="EmpoManager"
          className="h-13 w-70 max-w-full object-contain object-left"
        />
      </div>

      <h1 className="text-[28px] font-semibold text-[#E0E0E0] mb-2">Sign in to your account</h1>
      <p className="text-[15px] text-[#9CA3AF] mb-8">
        Choose your role and enter your credentials to continue.
      </p>
      {searchParams.get('invitation') === 'accepted' && (
        <p role="status" className="mb-5 text-sm text-success">
          Password created. Sign in to continue to your organization.
        </p>
      )}
      {searchParams.get('passwordReset') === 'success' && (
        <p role="status" className="mb-5 text-sm text-success">
          Password reset preview completed. Sign in to continue.
        </p>
      )}

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
                  value={role.value}
                  checked={isSelected}
                  {...roleRegistration}
                  onChange={(event) => {
                    roleRegistration.onChange(event)
                    setActiveRole(role.value)
                  }}
                  className="sr-only"
                />
                <div
                  className="flex items-center gap-3 px-3 py-3 rounded-xl border transition-all duration-200"
                  style={{
                    borderColor: isSelected ? role?.color : '#333333',
                    backgroundColor: isSelected ? role.bg : '#121212',
                    boxShadow: isSelected ? `0 0 0 1px ${role?.color}` : 'none',
                  }}
                >
                  {/* custom radio */}
                  <div
                    className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-150"
                    style={{ borderColor: isSelected ? role?.color : '#4B5563' }}
                  >
                    {isSelected && (
                      <div
                        className="w-2 h-2 rounded-full transition-all"
                        style={{ backgroundColor: role?.color }}
                      />
                    )}
                  </div>
                  <Icon
                    className="w-4 h-4 shrink-0 transition-colors"
                    style={{ color: isSelected ? role?.color : '#6B7280' }}
                  />
                  <span
                    className="text-[14px] font-medium transition-colors"
                    style={{ color: isSelected ? '#E0E0E0' : '#9CA3AF' }}
                  >
                    {role?.label}
                  </span>
                </div>
              </label>
            )
          })}
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(submitLogin)}>
        <div className="mb-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@company.com"
            {...emailRegistration}
            onChange={(event) => {
              setValue('email', event.target.value.trimStart().toLowerCase(), { shouldDirty: true })
            }}
            onBlur={(event) => {
              setValue('email', event.target.value.trim().toLowerCase(), {
                shouldDirty: true,
                shouldValidate: true,
              })
              emailRegistration.onBlur(event)
            }}
            error={fieldErrors.email?.message}

            className={`w-full h-11 pl-10 pr-4 rounded-lg border bg-[#121212] text-[#E0E0E0] placeholder:text-[#4B5563] focus:outline-none focus:ring-2 transition-all text-[15px]  `}
            prefix={<IconMail size={16} className="text-text-disabled" />}
          />
        </div>

        <div className="mb-4">
          <Input
            label="Password"
            type={showPw ? 'text' : 'password'}
            placeholder="••••••••"
            {...passwordRegistration}
            onChange={(event) => {
              setValue('password', event.target.value.trimStart(), { shouldDirty: true })
            }}
            onBlur={(event) => {
              setValue('password', event.target.value.trim(), {
                shouldDirty: true,
                shouldValidate: true,
              })
              passwordRegistration.onBlur(event)
            }}
            error={fieldErrors.password?.message}

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

        <div className="-mt-2 text-right">
          <Link to="/forgot-password" className="text-sm text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Remember me */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" {...rememberRegistration} className="w-4 h-4 accent-primary" />
          <span className="text-[14px] text-[#9CA3AF]">Remember me for 30 days</span>
        </label>

        {(errors.form || isError) && (
          <p role="alert" className="text-sm text-error">
            {errors.form || isError}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full h-11 rounded-lg text-white font-semibold text-[15px] transition-all duration-200 mt-2 hover:opacity-90"
          style={{ backgroundColor: activeRole?.color }}
        >
          {isPending ? 'Signing in...' : `Sign in as ${activeRole?.label}`}
        </button>
      </form>
  {import.meta.env.DEV  ? (
        <section
          className="mt-5 rounded-xl border border-[#28534f] bg-[#102421]/60 p-4"
          aria-label="Local role previews"
        >
          <div className="mb-3">
            <h2 className="text-sm font-semibold text-[#E0E0E0]">Local role previews</h2>
            <p className="mt-1 text-xs leading-5 text-[#9CA3AF]">
              Open protected role screens with sample data. No account or server login is used.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {roles.map((role) => (
              <button
                key={role.value}
                type="button"
                onClick={() => openRolePreview(role.value)}
                className="rounded-lg border border-[#333333] bg-[#121212] px-3 py-2.5 text-left text-xs font-medium text-[#E0E0E0] transition hover:border-primary hover:bg-[#1a1a1a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Preview {role.label}
              </button>
            ))}
          </div>
        </section>
      ) : null}

     
      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-[#1F1F1F]" />
        <span className="text-[13px] text-[#4B5563]">New to EMS?</span>
        <div className="flex-1 h-px bg-[#1F1F1F]" />
      </div>

      <Link
        to="/register"
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
