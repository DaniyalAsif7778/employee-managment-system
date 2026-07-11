import React from 'react'

interface Progress {
  label?: string
  value?: number
  max?: number
  className?: string
  themeColor: string
}

const ProgressBar = ({
  label = 'Speed:',
  value = 100,
  max = 100,
  className = '',
  themeColor = 'red',
}: Progress) => {
  return (
    <>
      <label htmlFor="file">{label}</label>

      <progress
        className={`
          ${className}
          w-full
          h-2
          rounded-full
          appearance-none
          
          [&::-webkit-progress-bar]:rounded-full
          [&::-webkit-progress-bar]:bg-${themeColor}-500
          
          
        `}
        id="file"
        value={value}
        max={max}
      >
        32%
      </progress>
    </>
  )
}

export default ProgressBar
