import React, { useState } from 'react'
import { NavLink } from 'react-router'
import { IconMail, IconLock, IconEye, IconEyeOff } from '@tabler/icons-react'

import Input, { inputBase } from '../../componenets/ui/Input.js'
import Button from '../../componenets/ui/Button.js'

const fieldClass = `${inputBase} pl-9`
const fieldWithSuffixClass = `${inputBase} pl-9 pr-10`

const primaryBtnClass =
  'w-full rounded-md py-2.5 text-base font-medium bg-primary text-primary-fg hover:bg-primary-hover active:bg-primary-pressed transition'

export default function LoginAuth() {
  const [showPw, setShowPw] = useState(false)
  const [form, setForm] = useState({ email: '', password: '', remember: false })

  return (
    <div className="w-full max-w-[380px]">
      <h1 className="text-[26px] font-semibold text-text-primary mb-1.5">Welcome back</h1>
      <p className="text-sm text-text-secondary mb-7">Continue managing your organization.</p>

      <form onSubmit={(e) => e.preventDefault()} noValidate>
        <div className="mb-4">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="you@company.com"
            value={form.email}
            onchange={(e) => setForm({ ...form, email: e.target.value })}
            className={fieldClass}
            prefix={<IconMail size={16} className="text-text-disabled" />}
          />
        </div>

        <div className="mb-4">
          <Input
            label="Password"
            type={showPw ? 'text' : 'password'}
            name="password"
            placeholder="••••••••"
            value={form.password}
            onchange={(e) => setForm({ ...form, password: e.target.value })}
            className={fieldWithSuffixClass}
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

        <div className="flex items-center justify-between mb-6 mt-1">
          <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer select-none">
            <Input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onchange={(e) => setForm({ ...form, remember: e.target.checked })}
              className="w-3.5 h-3.5 rounded accent-primary"
            />
            Remember me
          </label>
          <a href="#" className="text-primary hover:text-primary-hover text-sm font-medium">
            Forgot password?
          </a>
        </div>

        <Button type="submit" disabled={false} text="Login" className={primaryBtnClass} />
      </form>

      <p className="text-sm text-text-secondary text-center mt-6">
        Don&apos;t have an organization yet?{' '}
        <NavLink to="/singup" className="text-primary hover:text-primary-hover font-medium">
          Create account
        </NavLink>
      </p>
    </div>
  )
}
