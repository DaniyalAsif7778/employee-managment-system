import React, { type ReactNode } from 'react'
 export const inputBase =
  'w-full rounded-md text-base px-3 py-2.5 bg-navbar border-[1.5px] border-border text-text-primary placeholder:text-text-disabled transition focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/30'

// ✅ Extends native attributes to allow form handlers (onChange, onBlur, ref)
// ✅ Fix: Omit native 'prefix' string type to allow your custom ReactNode prefix
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  type: string
  labelClassName?: string
  prefix?: ReactNode // ✅ Now accepts icons, strings, elements safely
  suffix?: ReactNode
  placeholder?: string
  error?: string | undefined
  className?: string
  label?: string
  name?: string
  onclick?: () => void
  disabled?: boolean
}


const Input = (
    {
      type = 'text',
      labelClassName = '',
       
      prefix,
      suffix,
      placeholder = '',
      error = '',
      className = '',
       
      label = '',
      name = '',
      disabled,
 onclick ,
     ...props
    }: InputProps
  ) => {
    const hasAffixes = Boolean(prefix || suffix)

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
        <div className={hasAffixes ? 'relative' : undefined}>
          {prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">{prefix}</span>
          )}
          <input
            type={type}
            id={name || undefined}
             
           disabled={disabled}
            className={className || inputBase}
            name={name}
            placeholder={placeholder}
            onClick={onclick}
            {...props}
            
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">{suffix}</span>
          )}
        </div>
        {error && <p className="text-xs text-error mt-1">{error}</p>}
      </>
    )
  }

export default Input
