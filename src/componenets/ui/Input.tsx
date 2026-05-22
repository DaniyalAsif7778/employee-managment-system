import React, { forwardRef, type ReactNode } from 'react'

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface InputProps {
  type?: 'text' | 'number' | 'password' | 'email' | 'tel' | 'search' | 'select' | 'radio' | 'checkbox'
  labelClassName?: string
  value?: string
  prefix?: ReactNode
  suffix?: ReactNode
  placeholder?: string
  error?: string
  className?: string
  onchange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  label?: string
  name?: string
  required?: boolean
  checked?: boolean
  options?: SelectOption[]
}

const Input = forwardRef<HTMLInputElement | HTMLSelectElement, InputProps>(
  (
    {
      type = 'text',
      labelClassName = '',
      value = '',
      prefix = '',
      suffix = '',
      placeholder = '',
      error = '',
      className = '',
      onchange = () => {},
      label = '',
      name = '',
      required,
      checked,
      options = [],
    },
    ref,
  ) => {
    const isSelect = type === 'select'

    return (
      <>
        {label && (
          <label
            className={
              type === 'radio'
                ? `text-sm text-text-primary ${labelClassName}`
                : `text-sm text-text-secondary ${labelClassName}`
            }
            htmlFor={name}
          >
            {label}
          </label>
        )}

        {isSelect ? (
          <select
            id={name}
            name={name}
            ref={ref as React.Ref<HTMLSelectElement>}
            value={value}
            onChange={onchange}
            className={className}
            required={required}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            id={name}
            onChange={onchange}
            ref={ref as React.Ref<HTMLInputElement>}
            value={value}
            className={className}
            name={name}
            placeholder={placeholder}
            required={required}
            checked={checked}
          />
        )}

        {error && <p className="text-xs text-error">{error}</p>}
      </>
    )
  },
)

export default Input;
 