import { useMemo } from 'react'
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Users,
} from 'lucide-react'
import { Link } from 'react-router'
import { workspaceFixtures } from '../../lib/workspaceFixtures.js'
import { useLoginSlice } from '../../store/LoginSlice.js'
import RecentTasks from '../ui/RecentTasks.js'

type DashboardRole = 'admin' | 'employee' | 'manager' | 'hr'

type DashboardAnalyticsProps = {
  role: DashboardRole
  chartsOnly?: boolean
}

const contentByRole = {
  admin: {
    title: 'Company overview',
    description: 'A clear view of your organization and its work.',
    items: [
      { label: 'Employees', path: 'employees', icon: Users },
      { label: 'Tasks', path: 'tasks', icon: ClipboardList },
      { label: 'Reports', path: 'reports', icon: BriefcaseBusiness },
    ],
  },
  employee: {
    title: 'Your overview',
    description: 'Your work and schedule in one place.',
    items: [
      { label: 'My tasks', path: 'tasks', icon: ClipboardList },
      { label: 'Schedule', path: 'schedule', icon: CalendarDays },
      { label: 'Leave', path: 'leave', icon: BriefcaseBusiness },
    ],
  },
  manager: {
    title: 'Team overview',
    description: 'Your team’s work and priorities in one place.',
    items: [
      { label: 'My team', path: 'team', icon: Users },
      { label: 'Team tasks', path: 'tasks', icon: ClipboardList },
      { label: 'Leave approvals', path: 'leave-approvals', icon: CalendarDays },
    ],
  },
  hr: {
    title: 'People overview',
    description: 'People operations and team resources in one place.',
    items: [
      { label: 'Employees', path: 'employees', icon: Users },
      { label: 'Recruitment', path: 'recruitment', icon: BriefcaseBusiness },
      { label: 'Leave management', path: 'leaves', icon: CalendarDays },
    ],
  },
} satisfies Record<
  DashboardRole,
  {
    title: string
    description: string
    items: { label: string; path: string; icon: typeof Users }[]
  }
>

const rolePaths = {
  admin: 'admins',
  employee: 'employees',
  manager: 'managers',
  hr: 'hrs',
} satisfies Record<DashboardRole, string>

function getStats(role: DashboardRole) {
  const { employees, departments, tasks, leaves, candidates, openPositions, onboarding, schedule } =
    workspaceFixtures
  const completedTasks = tasks.filter((task) => task.status === 'done').length
  const openTasks = tasks.length - completedTasks
  const pendingLeaves = leaves.filter((leave) => leave.status === 'pending').length

  if (role === 'employee') {
    return [
      { label: 'My tasks', value: tasks.length, detail: 'sample tasks', icon: ClipboardList },
      { label: 'Completed', value: completedTasks, detail: 'sample tasks', icon: CheckCircle2 },
      {
        label: 'Upcoming events',
        value: schedule.length,
        detail: 'sample events',
        icon: CalendarDays,
      },
      {
        label: 'Leave requests',
        value: leaves.length,
        detail: 'sample requests',
        icon: BriefcaseBusiness,
      },
    ]
  }

  if (role === 'manager') {
    const teamCount = employees.filter((employee) => employee.managerId === 'emp-006').length
    return [
      { label: 'Team members', value: teamCount, detail: 'sample records', icon: Users },
      { label: 'Open tasks', value: openTasks, detail: 'sample tasks', icon: ClipboardList },
      { label: 'To review', value: pendingLeaves, detail: 'sample requests', icon: CalendarDays },
      {
        label: 'Completed tasks',
        value: completedTasks,
        detail: 'sample tasks',
        icon: CheckCircle2,
      },
    ]
  }

  if (role === 'hr') {
    return [
      { label: 'Employees', value: employees.length, detail: 'sample records', icon: Users },
      {
        label: 'Open positions',
        value: openPositions.length,
        detail: 'sample roles',
        icon: BriefcaseBusiness,
      },
      { label: 'Candidates', value: candidates.length, detail: 'sample profiles', icon: Users },
      { label: 'Onboarding', value: onboarding.length, detail: 'sample plans', icon: CheckCircle2 },
    ]
  }

  return [
    { label: 'Employees', value: employees.length, detail: 'sample records', icon: Users },
    {
      label: 'Departments',
      value: departments.length,
      detail: 'sample records',
      icon: BriefcaseBusiness,
    },
    { label: 'Open tasks', value: openTasks, detail: 'sample tasks', icon: ClipboardList },
    { label: 'Pending leave', value: pendingLeaves, detail: 'sample requests', icon: CalendarDays },
  ]
}

export default function DashboardAnalytics({ role, chartsOnly = false }: DashboardAnalyticsProps) {
  const userId = useLoginSlice((state) => state.userId)
  const content = contentByRole[role]
  const stats = useMemo(() => getStats(role), [role])
  const basePath = userId ? `/dashboard/${rolePaths[role]}/${encodeURIComponent(userId)}` : '/login'

  return (
    <div className="w-full space-y-5 p-4 sm:space-y-6 sm:p-6">
      {!chartsOnly && (
        <header className="mb-2">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Dashboard
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
            {content.title}
          </h1>
          <p className="mt-2 text-sm text-text-secondary sm:text-base">{content.description}</p>
        </header>
      )}

      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, detail, icon: Icon }) => (
          <section
            key={label}
            className="flex min-w-0 items-center gap-4 rounded-2xl border border-border bg-surface p-4 sm:p-5"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon aria-hidden="true" size={19} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm text-text-secondary">{label}</p>
              <p className="mt-1 flex items-baseline gap-2 text-2xl font-semibold text-text-primary">
                {value}
                <span className="text-xs font-normal text-text-secondary">{detail}</span>
              </p>
            </div>
          </section>
        ))}
      </div>

      <section
        aria-label="Quick links"
        className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-3"
      >
        {content.items.map(({ label, path, icon: Icon }) => (
          <Link
            key={path}
            to={`${basePath}/${path}`}
            className="group flex min-h-20 min-w-0 items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-5"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-text-secondary transition-colors group-hover:bg-primary/10 group-hover:text-primary">
              <Icon aria-hidden="true" size={19} />
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-text-primary">
              {label}
            </span>
            <ArrowRight
              aria-hidden="true"
              size={16}
              className="shrink-0 text-text-secondary transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
            />
          </Link>
        ))}
      </section>

      {role !== 'admin' && <RecentTasks />}

      <p className="px-1 text-xs text-text-secondary">
        Preview data is for exploring the interface. Changes made to it stay in this page and are
        not saved to your EMS account.
      </p>
    </div>
  )
}
