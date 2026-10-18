import {
  Bell,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  CheckSquare,
  FolderOpen,
  MessageSquare,
  Megaphone,
  LayoutDashboard,
  TrendingUp,
  UserCheck,
  UserCircle,
  UserPlus,
  Users,
  type LucideIcon,
} from 'lucide-react'
import PageHeader from '../componenets/ui/PageHeader.js'

type WorkspacePageProps = {
  title: string
  description?: string
  icon?: LucideIcon
}

const titleIcons: Record<string, LucideIcon> = {
  Organizations: Building2,
  Employees: Users,
  Dashboard: LayoutDashboard,
  'Employee Dashboard': LayoutDashboard,
  'Manager Dashboard': Briefcase,
  'HR Dashboard': Users,
  Messages: MessageSquare,
  Notifications: Bell,
  Profile: UserCircle,
  'My Team': Users,
  'Team Tasks': CheckSquare,
  'Leave Approvals': UserCheck,
  'Team Reports': TrendingUp,
  Reports: TrendingUp,
  Announcements: Megaphone,
  Recruitment: UserPlus,
  'Leave Management': CalendarDays,
  Onboarding: BookOpen,
}

export default function WorkspacePage({ title, description, icon }: WorkspacePageProps) {
  const PageIcon = icon ?? titleIcons[title] ?? FolderOpen

  return (
    <div className="p-4 sm:p-6">
      <PageHeader title={title} icon={PageIcon} {...(description ? { description } : {})} />
      <section className="overflow-hidden rounded-lg border border-border bg-surface">
        <div className="border-b border-border px-4 py-3 text-sm font-medium text-text-primary">
          {title}
        </div>
        <div className="grid min-h-48 place-content-center justify-items-center gap-3 px-4 py-10 text-center">
          <FolderOpen aria-hidden="true" className="size-8 text-text-disabled" />
          <p className="text-sm text-text-secondary">No {title.toLowerCase()} to display yet.</p>
        </div>
      </section>
    </div>
  )
}
