import { useNavigate, NavLink } from 'react-router'
import { useMenue } from '../../hooks/hooks.js'
import { useLoginSlice } from '../../store/LoginSlice.js'
import { logoutUser } from '../../lib/api/auth.service.js'
import iconLogo from '../../assets/icon-dark.svg'
import {
  LayoutDashboard,
  Building2,
  Users,
  CheckSquare,
  FileText,
  MessageSquare,
  Megaphone,
  Bell,
  Settings,
  Calendar,
  Briefcase,
  UserCircle,
  UserCheck,
  TrendingUp,
  UserPlus,
  BookOpen,
  LogOut as Logout,
} from 'lucide-react'

import HeaderDrawer from './HeaderDrawer.js'

const DashBordHeader = () => {
  const navigate = useNavigate()
  const role = useLoginSlice((state) => state.role)
  const userId = useLoginSlice((state) => state.userId)
  const clearAuthentication = useLoginSlice((state) => state.clearAuthentication)
  const { dashBoardDrawer, setDashBoardStatus } = useMenue()

  const linksByRole = {
    admin: [
      { path: '', icon: LayoutDashboard, label: 'Dashboard', end: true },
      { path: '/organizations', icon: Building2, label: 'Organizations' },
      { path: '/employees', icon: Users, label: 'Employees' },
      { path: '/departments', icon: Building2, label: 'Departments' },
      { path: '/tasks', icon: CheckSquare, label: 'Tasks' },
      { path: '/reports', icon: FileText, label: 'Reports' },
      { path: '/messages', icon: MessageSquare, label: 'Messages' },
      { path: '/announcements', icon: Megaphone, label: 'Announcements' },
      { path: '/notifications', icon: Bell, label: 'Notifications' },
      { path: '/settings', icon: Settings, label: 'Settings' },
    ],
    employee: [
      { path: '', icon: LayoutDashboard, label: 'Dashboard', end: true },
      { path: '/tasks', icon: CheckSquare, label: 'My Tasks' },
      { path: '/schedule', icon: Briefcase, label: 'Schedule' },
      { path: '/leave', icon: Calendar, label: 'Leave' },
      { path: '/colleagues', icon: Users, label: 'Colleagues' },
      { path: '/messages', icon: MessageSquare, label: 'Messages' },
      { path: '/announcements', icon: Megaphone, label: 'Announcements' },
      { path: '/notifications', icon: Bell, label: 'Notifications' },
      { path: '/profile', icon: UserCircle, label: 'Profile' },
    ],
    manager: [
      { path: '', icon: LayoutDashboard, label: 'Dashboard', end: true },
      { path: '/team', icon: Users, label: 'My Team' },
      { path: '/tasks', icon: CheckSquare, label: 'Team Tasks' },
      { path: '/leave-approvals', icon: UserCheck, label: 'Leave Approvals' },
      { path: '/reports', icon: TrendingUp, label: 'Team Reports' },
      { path: '/messages', icon: MessageSquare, label: 'Messages' },
      { path: '/announcements', icon: Megaphone, label: 'Announcements' },
      { path: '/notifications', icon: Bell, label: 'Notifications' },
      { path: '/profile', icon: UserCircle, label: 'Profile' },
    ],
    hr: [
      { path: '', icon: LayoutDashboard, label: 'Dashboard', end: true },
      { path: '/recruitment', icon: UserPlus, label: 'Recruitment' },
      { path: '/employees', icon: Users, label: 'Employees' },
      { path: '/leaves', icon: Calendar, label: 'Leave Management' },
      { path: '/onboarding', icon: BookOpen, label: 'Onboarding' },
      { path: '/messages', icon: MessageSquare, label: 'Messages' },
      { path: '/announcements', icon: Megaphone, label: 'Announcements' },
      { path: '/notifications', icon: Bell, label: 'Notifications' },
      { path: '/profile', icon: UserCircle, label: 'Profile' },
    ],
  }

  const dashboardBasePath =
    role && userId ? `/dashboard/${role}/${encodeURIComponent(userId)}` : '/login'
  const links = linksByRole[role ?? 'admin'].map((link) => ({
    ...link,
    path: `${dashboardBasePath}${link.path}`,
  }))

  const closeDrawerOnMobile = () => {
    if (window.matchMedia('(max-width: 639px)').matches) {
      setDashBoardStatus(false)
    }
  }

  const handleLogout = () => {
    logoutUser()
      .catch(() => undefined)
      .finally(() => {
        clearAuthentication()
        navigate('/login', { replace: true })
      })
  }

  return (
    <nav
      id="dashboard-sidebar"
      aria-label="Dashboard navigation"
      className={`fixed bottom-0 left-0 top-10 z-30 flex flex-col border-r border-[#333] bg-[#1f1f1f] text-[#e0e0e0] shadow-xl transition-[width,transform] duration-200 ease-out ${
        dashBoardDrawer ? 'w-60 translate-x-0' : 'w-60 -translate-x-full sm:w-15 sm:translate-x-0'
      }`}
    >
      <div className="flex h-15 shrink-0 items-center border-b border-[#333] px-2">
        {dashBoardDrawer ? (
          <>
            <div className="flex min-w-0 items-center gap-3">
              <img src={iconLogo} alt="" className="size-8 shrink-0" />
              <span className="text-xl font-bold text-text-primary">EMS</span>
            </div>
            <HeaderDrawer className="ml-auto" />
          </>
        ) : (
          <div className="group relative mx-auto size-9">
            <img
              src={iconLogo}
              alt="EMS"
              className="size-9 transition-opacity group-hover:opacity-0 group-focus-within:opacity-0"
            />
            <HeaderDrawer className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100" />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-3">
        <ul className="flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={Boolean(link.end)}
                onClick={closeDrawerOnMobile}
                title={dashBoardDrawer ? undefined : link.label}
                aria-label={link.label}
                className={({ isActive }) =>
                  `flex h-11 items-center gap-3 overflow-hidden rounded-xl px-3 text-sm font-medium transition-colors ${
                    dashBoardDrawer ? '' : 'sm:justify-center sm:px-0'
                  } ${
                    isActive
                      ? 'bg-[#009f8e] text-white shadow-[0_6px_18px_rgba(0,159,142,0.18)]'
                      : 'text-[#b6b9c0] hover:bg-[#171717] hover:text-white'
                  }`
                }
              >
                <link.icon size={20} strokeWidth={1.8} className="shrink-0" />
                {dashBoardDrawer && <span className="truncate">{link.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="shrink-0 border-t border-[#333] p-2">
        <button
          type="button"
          onClick={handleLogout}
          title={dashBoardDrawer ? undefined : 'Logout'}
          aria-label="Logout"
          className={`flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-[#b6b9c0] transition-colors hover:bg-[#171717] hover:text-white ${
            dashBoardDrawer ? '' : 'sm:justify-center sm:px-0'
          }`}
        >
          <Logout size={20} strokeWidth={1.8} className="shrink-0" />
          {dashBoardDrawer && <span>Logout</span>}
        </button>
      </div>
    </nav>
  )
}

export default DashBordHeader
