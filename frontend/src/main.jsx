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
      staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    },
  },
})
import {
  OverView,
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
  VerifyOtp,
  ResetPassword,
  AuthErrorScreen,
  AcceptInvitation,
  Singup,
} from './import.js'
import {
  createBrowserRouter,
  createRoutesFromElements,
 
  Route,
  RouterProvider,
} from 'react-router'
import { MenueProvider } from './hooks/hooks.js';
import WorkspacePage from './pages/WorkspacePage.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Login/>} />
       <Route element={<ProtectedRoutes />}>
        <Route path="DashBoard" element={<DashBoard />}>
          <Route index element={<OverView />} />

          <Route element={<AdminRoutes />}>
            <Route path="Dashbord" element={<AdminDashboard />} />
            <Route path="Department" element={<AdminDepartment />} />
            <Route path="Employees" element={<AdminEmployees />} />
            <Route path="Profile" element={<AdminProfile />} />
            <Route path="Reports" element={<AdminReports />} />
            <Route path="Tasks" element={<AdminTasks />} />
            <Route path="Announcements" element={<AdminAnnocment />}></Route>
            <Route path="InviteEmployee" element={<InviteEmployee />} />
          </Route>
          <Route element={<EmployeeRoutes />}>
            <Route path="EmployeeDashboard" element={<EmpolyDashboard />} />

            <Route path="Annoucments" element={<Annoucments />} />
            <Route path="Colleagues" element={<Colleagues />} />
            <Route path="EmployeeLeave" element={<Leave />} />
            <Route path="EmployeeSchedule" element={<Schedule />} />
            <Route path="EmployeeTasks" element={<Tasks />} />
          </Route>
          <Route element={<ManagerRoutes />}>
            <Route path="ManagerDashboard" element={<ManagerDashboard />} />
          </Route>
          <Route element={<HRRoutes />}>
            <Route path="HRDashboard" element={<HRDashboard />} />
          </Route>
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="admin" element={<DashBoard />}>
          <Route element={<AdminRoutes />}>
            <Route index element={<AdminDashboard />} />
            <Route path="organizations" element={<WorkspacePage title="Organizations" />} />
            <Route path="employees" element={<AdminEmployees />} />
            <Route path="departments" element={<AdminDepartment />} />
            <Route path="tasks" element={<AdminTasks />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="messages" element={<WorkspacePage title="Messages" />} />
            <Route path="announcements" element={<AdminAnnocment />} />
            <Route path="notifications" element={<WorkspacePage title="Notifications" />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="employee" element={<DashBoard />}>
          <Route element={<EmployeeRoutes />}>
            <Route index element={<EmpolyDashboard />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="leave" element={<Leave />} />
            <Route path="colleagues" element={<Colleagues />} />
            <Route path="messages" element={<WorkspacePage title="Messages" />} />
            <Route path="announcements" element={<Annoucments />} />
            <Route path="notifications" element={<WorkspacePage title="Notifications" />} />
            <Route path="profile" element={<WorkspacePage title="Profile" />} />
          </Route>
        </Route>

        <Route path="manager" element={<DashBoard />}>
          <Route element={<ManagerRoutes />}>
            <Route index element={<ManagerDashboard />} />
            <Route path="team" element={<WorkspacePage title="My Team" />} />
            <Route path="tasks" element={<WorkspacePage title="Team Tasks" />} />
            <Route path="leave-approvals" element={<WorkspacePage title="Leave Approvals" />} />
            <Route path="reports" element={<WorkspacePage title="Team Reports" />} />
            <Route path="messages" element={<WorkspacePage title="Messages" />} />
            <Route path="announcements" element={<WorkspacePage title="Announcements" />} />
            <Route path="notifications" element={<WorkspacePage title="Notifications" />} />
            <Route path="profile" element={<WorkspacePage title="Profile" />} />
          </Route>
        </Route>

        <Route path="hr" element={<DashBoard />}>
          <Route element={<HRRoutes />}>
            <Route index element={<HRDashboard />} />
            <Route path="recruitment" element={<WorkspacePage title="Recruitment" />} />
            <Route path="employees" element={<WorkspacePage title="Employees" />} />
            <Route path="leaves" element={<WorkspacePage title="Leave Management" />} />
            <Route path="onboarding" element={<WorkspacePage title="Onboarding" />} />
            <Route path="messages" element={<WorkspacePage title="Messages" />} />
            <Route path="announcements" element={<WorkspacePage title="Announcements" />} />
            <Route path="notifications" element={<WorkspacePage title="Notifications" />} />
            <Route path="profile" element={<WorkspacePage title="Profile" />} />
          </Route>
        </Route>
      </Route>

      <Route path="singup" element={<Singup />} />

      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="verify-otp" element={<VerifyOtp />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="accept-invite" element={<AcceptInvitation />} />
      <Route path="error" element={<AuthErrorScreen />} />
      <Route path="*" element={<AuthErrorScreen />} />
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MenueProvider>
 <RouterProvider router={router}/>
 </MenueProvider>
     </QueryClientProvider>
  </StrictMode>
)
