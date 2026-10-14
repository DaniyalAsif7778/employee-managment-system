/**
 * Documentation-only component logic.
 *
 * This file is not imported by the app. It keeps the same rules as the
 * real components, written as valid JavaScript so it does not produce
 * compile or lint errors if opened on its own.
 *
 * Real implementations: frontend/src/componenets/
 */

import { useEffect, useState } from 'react'

export const ACCEPTED_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
]

export const ACCEPTED_COVER_TYPES = [...ACCEPTED_IMAGE_TYPES, 'image/svg+xml']

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024

export const inputBase =
  'w-full rounded-md text-base px-3 py-2.5 bg-navbar border-[1.5px] border-border text-text-primary placeholder:text-text-disabled transition focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/30'

/** Button: append "..." while loading. */
export function getButtonLabel(text, loading) {
  const label = text || ''
  return loading ? `${label}...` : label
}

/** Input: wrap field when prefix or suffix is present. */
export function hasInputAffixes(prefix, suffix) {
  return Boolean(prefix || suffix)
}

export function getInputLabelClass(type, extraClass) {
  const extra = extraClass || ''
  if (type === 'radio') {
    return `text-sm text-text-primary ${extra}`
  }
  return `text-sm text-text-secondary ${extra}`
}

/** Select: keep a placeholder row, then map options. */
export function buildSelectOptions(options, placeholder) {
  const list = Array.isArray(options) ? options : []
  const rows = [{ value: '', label: placeholder || 'Select an option' }]

  for (let i = 0; i < list.length; i += 1) {
    const option = list[i]
    if (option && option.value != null) {
      rows.push({ value: String(option.value), label: option.label || '' })
    }
  }

  return rows
}

/**
 * Stepper: compare store step to the 1-based index of a label.
 * Store: step starts at 1, max 3, min 1.
 */
export function getStepState(currentStep, index) {
  const n = index + 1
  const step = Number(currentStep) || 1
  return {
    n,
    done: step > n,
    active: step === n,
  }
}

export function nextStepperValue(step, maxStep) {
  const current = Number(step) || 1
  const max = Number(maxStep) || 3
  return current < max ? current + 1 : current
}

export function prevStepperValue(step, minStep) {
  const current = Number(step) || 1
  const min = Number(minStep) || 1
  return current >= min + 1 ? current - 1 : current
}

export function getStepperCircleClass(done, active) {
  if (done) return 'bg-primary'
  if (active) return 'border-2 border-primary bg-navbar text-primary'
  return 'bg-navbar'
}

export function getNavLinkClass(isActive) {
  const base =
    'flex sm:flex-row sm:justify-start gap-1 p-2 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm sm:transition-all sm:duration-150 sm:border-l-2 flex-col justify-center items-center'

  if (isActive) {
    return `${base} text-[#009F8E] sm:bg-[#009F8E]/10 border-[#009F8E]`
  }

  return `${base} text-[#888] border-transparent hover:text-white hover:bg-white/5`
}

export const STATUS_DOT = {
  overDue: 'bg-red-400 h-4 w-4',
  inProgress: 'bg-yellow-400 h-4 w-4',
  done: 'bg-green-500 h-3 w-3',
}

export function getStatusDotClass(status) {
  if (status === 'done') {
    return `${STATUS_DOT.done} rounded-2xl m-auto`
  }
  return STATUS_DOT[status] || ''
}

export function formatCompletionRate(rate, time) {
  const value = Number(rate) || 0
  const suffix = time || ''
  return `+${value}% ${suffix}`.trim()
}

export function clampProgress(value, max) {
  const safeMax = Number(max) > 0 ? Number(max) : 100
  const safeValue = Number(value)
  if (Number.isNaN(safeValue) || safeValue < 0) return 0
  if (safeValue > safeMax) return safeMax
  return safeValue
}

/**
 * Image pickers: type + size checks before creating a preview URL.
 * Returns { ok, file, error }. Never throws.
 */
export function validateImageFile(file, acceptedTypes, maxBytes) {
  if (!file) {
    return { ok: false, file: null, error: null }
  }

  const types = Array.isArray(acceptedTypes) ? acceptedTypes : ACCEPTED_IMAGE_TYPES
  const limit = Number(maxBytes) > 0 ? Number(maxBytes) : MAX_IMAGE_BYTES

  if (!types.includes(file.type)) {
    return {
      ok: false,
      file: null,
      error: 'Choose a PNG, JPEG, WebP, or GIF image.',
    }
  }

  if (file.size > limit) {
    return {
      ok: false,
      file: null,
      error: 'Choose an image smaller than 5 MB.',
    }
  }

  return { ok: true, file, error: null }
}

export function shouldShowDashboardNav(dashBoardDrawer) {
  return Boolean(dashBoardDrawer)
}

export function reviewValue(value) {
  if (value) return value
  return '—'
}

export function passwordsMatch(nextPassword, confirmPassword) {
  return Boolean(nextPassword) && nextPassword === confirmPassword
}

/**
 * Example: ChangePassword local state (same flow as the UI component).
 * Exported so the helpers above are exercised in a real component shape.
 */
export function ChangePasswordLogicExample() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = () => {
    if (!passwordsMatch(newPassword, confirmPassword)) {
      setMessage('Passwords do not match.')
      return
    }
    setMessage('Ready to send update request.')
  }

  return (
    <section className="bg-surface p-6 rounded-2xl border border-border mb-8">
      <h3 className="text-xl font-semibold mb-6">Change Password</h3>
      <input
        type="password"
        value={newPassword}
        onChange={(event) => setNewPassword(event.target.value)}
        placeholder="New Password"
        className={inputBase}
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        placeholder="Confirm Password"
        className={inputBase}
      />
      <button type="button" onClick={onSubmit} className="mt-6 bg-primary px-6 py-3 rounded-xl">
        {getButtonLabel('Update Password', false)}
      </button>
      {message ? <p className="text-xs text-error mt-1">{message}</p> : null}
    </section>
  )
}

/**
 * Example: preview URL lifecycle used by CoverImagePicker / ProfilePicturePicker.
 */
export function useObjectPreview(file) {
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null)
      return undefined
    }

    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [file])

  return previewUrl
}
