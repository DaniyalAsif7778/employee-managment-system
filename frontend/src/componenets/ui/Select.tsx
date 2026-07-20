import React from 'react'
import { IconChevronDown } from '@tabler/icons-react'

import { inputBase } from './Input.js'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  label: string
  name?: string
  value?: string
  placeholder?: string
  options: SelectOption[]
  error?: string
  onchange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function Select({
  label,
  name = '',
  value = '',
  placeholder = 'Select an option',
  options,
  error = '',
  onchange,
}: SelectProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-text-secondary mb-1.5">{label}</label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onchange}
          className={`${inputBase} appearance-none pr-9 ${error ? 'border-error' : ''}`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <IconChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-disabled pointer-events-none"
        />
      </div>
      {error && <p className="text-xs text-error mt-1">{error}</p>}
    </div>
  )
}
