import React, { type ReactNode } from 'react'
export const inputBase = 'w-full h-11 pl-10 pr-10 rounded-lg border bg-[#121212] text-[#E0E0E0] placeholder:text-[#4B5563] focus:outline-none focus:ring-2 transition-all text-[15px] autofill:transition-colors autofill:duration-[9999s]';

 
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  type: string
  labelClassName?: string
  prefix?: ReactNode 
  suffix?: ReactNode
  placeholder?: string
  error?: string | undefined
  className?: string
  label?: string
  name?: string
  onclick?: () => void
  disabled?: boolean
  readonly?: boolean
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
            className={`block text-[14px] font-medium text-[#9CA3AF] mb-1.5 ${type === 'radio'
                ? `text-sm text-text-primary ${labelClassName}`
                : `text-sm text-text-secondary ${labelClassName}`}`
              
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
