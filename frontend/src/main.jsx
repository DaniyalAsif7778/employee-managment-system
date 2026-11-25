import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import Layout from './Layout'
import {
  ProtectedRoutes,
  AdminRoutes,
  EmployeeRoutes,
  ManagerRoutes,
  HRRoutes,
} from './ProtectedRoutes.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevents aggressive refetching on tab switch
      retry: 1, // Retry failed requests once before showing error
    },
  },
})
import {
  EmpolyDashboard,
  AdminDashboard,
  DashBoard,
  Login,
  Settings,
  AdminDepartment,
  AdminEmployees,
  AdminProfile,
  AdminReports,
  AdminTasks,
  AdminAnnocment,
  Annoucments,
  Colleagues,
  Leave,
  Schedule,
  Tasks,
  ManagerDashboard,
  HRDashboard,
  InviteEmployee,
  ForgotPassword,
  SendVerification,
  ResetPassword,
  VerifyPasswordOtp,
  AuthErrorScreen,
  AcceptInvitation,
  Singup,
  VerifyEmailToken,
} from './import.js'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router'
import { MenueProvider } from './hooks/hooks.js'
import AdminOrganizations from './pages/admin/AdminOrganizations.js'
import AdminMessages from './pages/admin/AdminMessages.js'
import AdminNotifications from './pages/admin/AdminNotifications.js'
import AdminAnnouncements from './pages/admin/AdminAnnouncements.js'
import EmployeeMessages from './pages/employee/EmployeeMessages.js'
import EmployeeNotifications from './pages/employee/EmployeeNotifications.js'
import EmployeeAnnouncements from './pages/employee/EmployeeAnnouncements.js'
import EmployeeProfile from './pages/employee/EmployeeProfile.js'
import ManagerTeam from './pages/manager/ManagerTeam.js'
import ManagerTasks from './pages/manager/ManagerTasks.js'
import ManagerLeaveApprovals from './pages/manager/ManagerLeaveApprovals.js'
import ManagerReports from './pages/manager/ManagerReports.js'
import ManagerMessages from './pages/manager/ManagerMessages.js'
import ManagerAnnouncements from './pages/manager/ManagerAnnouncements.js'
import ManagerNotifications from './pages/manager/ManagerNotifications.js'
import ManagerProfile from './pages/manager/ManagerProfile.js'
import HRRecruitment from './pages/hr/HRRecruitment.js'
import HREmployees from './pages/hr/HREmployees.js'
import HRLeaves from './pages/hr/HRLeaves.js'
import HROnboarding from './pages/hr/HROnboarding.js'
import HRMessages from './pages/hr/HRMessages.js'
import HRAnnouncements from './pages/hr/HRAnnouncements.js'
import HRNotifications from './pages/hr/HRNotifications.js'
import HRProfile from './pages/hr/HRProfile.js'
import AdminSettings from './pages/admin/AdminSettings.js'
import DepartmentDetail from './pages/admin/DepartmentDetail.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="dashboard/admins/:userId" element={<DashBoard />}>
          <Route element={<AdminRoutes />}>
            <Route index element={<AdminDashboard />} />
            <Route path="organizations" element={<AdminOrganizations />} />
            <Route path="employees" element={<AdminEmployees />} />
            <Route path="departments" element={<AdminDepartment />} />
            <Route path="departments/:id" element={<DepartmentDetail />} />
            <Route path="tasks" element={<AdminTasks />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="invite-employee" element={<InviteEmployee />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>

        <Route path="dashboard/employees/:userId" element={<DashBoard />}>
          <Route element={<EmployeeRoutes />}>
            <Route index element={<EmpolyDashboard />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="leave" element={<Leave />} />
            <Route path="colleagues" element={<Colleagues />} />
            <Route path="messages" element={<EmployeeMessages />} />
            <Route path="announcements" element={<EmployeeAnnouncements />} />
            <Route path="notifications" element={<EmployeeNotifications />} />
            <Route path="profile" element={<EmployeeProfile />} />
          </Route>
        </Route>

        <Route path="dashboard/managers/:userId" element={<DashBoard />}>
          <Route element={<ManagerRoutes />}>
            <Route index element={<ManagerDashboard />} />
            <Route path="team" element={<ManagerTeam />} />
            <Route path="tasks" element={<ManagerTasks />} />
            <Route path="leave-approvals" element={<ManagerLeaveApprovals />} />
            <Route path="reports" element={<ManagerReports />} />
            <Route path="messages" element={<ManagerMessages />} />
            <Route path="announcements" element={<ManagerAnnouncements />} />
            <Route path="notifications" element={<ManagerNotifications />} />
            <Route path="profile" element={<ManagerProfile />} />
          </Route>
        </Route>

        <Route path="dashboard/hrs/:userId" element={<DashBoard />}>
          <Route element={<HRRoutes />}>
            <Route index element={<HRDashboard />} />
            <Route path="recruitment" element={<HRRecruitment />} />
            <Route path="employees" element={<HREmployees />} />
            <Route path="leaves" element={<HRLeaves />} />
            <Route path="onboarding" element={<HROnboarding />} />
            <Route path="messages" element={<HRMessages />} />
            <Route path="announcements" element={<HRAnnouncements />} />
            <Route path="notifications" element={<HRNotifications />} />
            <Route path="profile" element={<HRProfile />} />
          </Route>
        </Route>
      </Route>

      <Route path="singup" element={<Singup />} />
      <Route path="register" element={<Singup />} />
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="verify-reset-otp" element={<VerifyPasswordOtp />} />
      <Route path="sendEmail" element={<SendVerification />} />
      <Route path="verifyOtp" element={<VerifyEmailToken />} />

      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="accept-invite" element={<AcceptInvitation />} />
      <Route path="error" element={<AuthErrorScreen />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MenueProvider>
        <RouterProvider router={router} />
      </MenueProvider>
    </QueryClientProvider>
  </StrictMode>
)
