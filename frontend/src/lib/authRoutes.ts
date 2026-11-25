import type { UserRole } from '../types.js'

const dashboardPaths: Record<UserRole, string> = {
  admins: '/dashboard/admins',
  employees: '/dashboard/employees',
  managers: '/dashboard/managers',
  hrs: '/dashboard/hrs',
}

export function isUserRole(role: unknown): role is UserRole {
  return typeof role === 'string' && Object.hasOwn(dashboardPaths, role)
}

export function getDashboardPath(role: UserRole, userId: string) {
  return `${dashboardPaths[role]}/${encodeURIComponent(userId)}`
}
