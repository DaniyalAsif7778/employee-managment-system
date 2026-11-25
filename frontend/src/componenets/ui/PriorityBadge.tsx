interface PriorityBadgeProps {
  priority: 'high' | 'medium' | 'low'
  size?: 'sm' | 'md'
}

const priorityConfig = {
  high: {
    label: 'High',
    bg: '#EF44441A',
    text: '#EF4444',
  },
  medium: {
    label: 'Medium',
    bg: '#FFC1071A',
    text: '#FFC107',
  },
  low: {
    label: 'Low',
    bg: '#6B72801A',
    text: '#9CA3AF',
  },
}

export function PriorityBadge({ priority, size = 'md' }: PriorityBadgeProps) {
  const config = priorityConfig[priority]
  const sizeClasses = size === 'sm' ? 'text-[13px] px-2 py-0.5' : 'text-[13px] px-2.5 py-1'

  return (
    <span
      className={`inline-flex items-center rounded-md font-medium ${sizeClasses}`}
      style={{
        backgroundColor: config.bg,
        color: config.text,
      }}
    >
      {config.label}
    </span>
  )
}
