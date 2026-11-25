interface StatusBadgeProps {
  status:
    | 'active'
    | 'done'
    | 'overdue'
    | 'pending'
    | 'on-leave'
    | 'inactive'
    | 'approved'
    | 'rejected'
    | 'in-progress'
  size?: 'sm' | 'md'
}

const statusConfig = {
  active: {
    label: 'Active',
    bg: '#00BF6B1A',
    text: '#00BF6B',
  },
  done: {
    label: 'Done',
    bg: '#00BF6B1A',
    text: '#00BF6B',
  },
  'in-progress': {
    label: 'In Progress',
    bg: '#12C4D31A',
    text: '#12C4D3',
  },
  overdue: {
    label: 'Overdue',
    bg: '#EF44441A',
    text: '#EF4444',
  },
  pending: {
    label: 'Pending',
    bg: '#FFC1071A',
    text: '#FFC107',
  },
  'on-leave': {
    label: 'On Leave',
    bg: '#FFC1071A',
    text: '#FFC107',
  },
  approved: {
    label: 'Approved',
    bg: '#00BF6B1A',
    text: '#00BF6B',
  },
  rejected: {
    label: 'Rejected',
    bg: '#EF44441A',
    text: '#EF4444',
  },
  inactive: {
    label: 'Inactive',
    bg: '#6B72801A',
    text: '#9CA3AF',
  },
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status]
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
