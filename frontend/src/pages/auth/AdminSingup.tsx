import React, { useState } from 'react'
import { NavLink } from 'react-router'
import {
  IconUsers,
  IconMail,
  IconPhone,
  IconLock,
  IconEye,
  IconEyeOff,
  IconArrowLeft,
} from '@tabler/icons-react'

import Input, { inputBase } from '../../componenets/ui/Input.js'
import Button from '../../componenets/ui/Button.js'

const fieldClass = `${inputBase} pl-9`
const fieldWithSuffixClass = `${inputBase} pl-9 pr-10`

const ghostBtnClass =
  'rounded-md px-4 py-2.5 text-sm font-medium inline-flex items-center gap-1.5 border-[1.5px] border-border text-text-secondary hover:border-border-secondary hover:text-text-primary transition'

const primaryBtnClass =
  'rounded-md py-2.5 text-base font-medium bg-primary text-primary-fg hover:bg-primary-hover active:bg-primary-pressed active:scale-[0.98] transition'

export default function AdminSingup() {
  const [showPw, setShowPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)
  const [personal, setPersonal] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const passwordToggle = (visible: boolean, toggle: () => void, label: string) => (
    <button
      type="button"
      onClick={toggle}
      className="text-text-disabled"
      tabIndex={-1}
      aria-label={label}
    >
      {visible ? <IconEyeOff size={16} /> : <IconEye size={16} />}
    </button>
  )

  return (
    <div className="w-full max-w-[420px]">
      <h1 className="text-2xl font-semibold text-text-primary mb-1">Personal information</h1>
      <p className="text-sm text-text-secondary mb-6">
        Tell us who&apos;ll be managing this organization.
      </p>

      <div className="mb-4">
        <Input
        type='text'
          label="Full name"
          name="fullName"
          placeholder="Jordan Malik"
          value={personal.fullName}
          onchange={(e) => setPersonal({ ...personal, fullName: e.target.value })}
          className={fieldClass}
          prefix={<IconUsers size={16} className="text-text-disabled" />}
        />
      </div>

      <div className="mb-4">
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="you@company.com"
          value={personal.email}
          onchange={(e) => setPersonal({ ...personal, email: e.target.value })}
          className={fieldClass}
          prefix={<IconMail size={16} className="text-text-disabled" />}
        />
      </div>

      <div className="mb-4">
        <Input
        type='tel'
          label="Phone number"
          name="phone"
          placeholder="+1 (555) 000-0000"
          value={personal.phone}
          onchange={(e) => setPersonal({ ...personal, phone: e.target.value })}
          className={fieldClass}
          prefix={<IconPhone size={16} className="text-text-disabled" />}
        />
      </div>

      <div className="mb-4">
        <Input
          label="Password"
          type={showPw ? 'text' : 'password'}
          name="password"
          placeholder="At least 8 characters"
          value={personal.password}
          onchange={(e) => setPersonal({ ...personal, password: e.target.value })}
          className={fieldWithSuffixClass}
          prefix={<IconLock size={16} className="text-text-disabled" />}
          suffix={passwordToggle(showPw, () => setShowPw((s) => !s), showPw ? 'Hide password' : 'Show password')}
        />
      </div>

      <div className="mb-4">
        <Input
          label="Confirm password"
          type={showConfirmPw ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="Re-enter your password"
          value={personal.confirmPassword}
          onchange={(e) => setPersonal({ ...personal, confirmPassword: e.target.value })}
          className={fieldWithSuffixClass}
          prefix={<IconLock size={16} className="text-text-disabled" />}
          suffix={passwordToggle(
            showConfirmPw,
            () => setShowConfirmPw((s) => !s),
            showConfirmPw ? 'Hide password' : 'Show password'
          )}
        />
      </div>

      <div className="flex items-center gap-3 mt-6">
        <NavLink to="/login" className={ghostBtnClass}>
          <IconArrowLeft size={15} /> Login
        </NavLink>
        <Button
          type="button"
          disabled={false}
          text="Continue"
          className={`flex-1 ${primaryBtnClass}`}
        />
      </div>
    </div>
  )
}
