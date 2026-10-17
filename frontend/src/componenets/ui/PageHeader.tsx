import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

type PageHeaderProps = {
  title: string
  description?: string
  icon: LucideIcon
  action?: ReactNode
}

export default function PageHeader({ title, description, icon: Icon, action }: PageHeaderProps) {
  return (
    <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div className="flex min-w-0 items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-[#28534f] bg-[#102421] text-[#38d3b7]">
          <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
        </span>
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold text-text-primary">{title}</h1>
          {description && <p className="mt-1 text-sm text-text-secondary">{description}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  )
}