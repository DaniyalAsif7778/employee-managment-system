import type { ChangeEvent, FocusEvent } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

export function trimInputRegistration(registration: UseFormRegisterReturn, lowercase = false) {
  const normalize = (value: string, trimEnd: boolean) => {
    const normalized = trimEnd ? value.trim() : value.trimStart()
    return lowercase ? normalized.toLowerCase() : normalized
  }

  return {
    ...registration,
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      event.currentTarget.value = normalize(event.currentTarget.value, false)
      registration.onChange(event)
    },
    onBlur: (event: FocusEvent<HTMLInputElement>) => {
      event.currentTarget.value = normalize(event.currentTarget.value, true)
      registration.onBlur(event)
    },
  }
}
