import React, { forwardRef, type ReactNode } from 'react'
 export const inputBase =
  'w-full rounded-md text-base px-3 py-2.5 bg-navbar border-[1.5px] border-border text-text-primary placeholder:text-text-disabled transition focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/30'

interface InputProps {
  type: string
  labelClassName?: string
   prefix?: ReactNode
  suffix?: ReactNode
  placeholder?: string
  error?: string | undefined
  className?: string
   label?: string
  name?: string
    
  
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
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
 
     ...props
    },
    ref
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
             
            ref={ref}
           
            className={className || inputBase}
            name={name}
            placeholder={placeholder}
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
)

export default Input
