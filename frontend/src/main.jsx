import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import Layout from './Layout'
import { ProtectedRoutes, AdminRoutes, EmployeeRoutes } from './ProtectedRoutes.jsx'
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
  Home,
  Login,
  About,
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
  Singup,
} from './import.js'
import {
  createBrowserRouter,
  createRoutesFromElements,
 
  Route,
  RouterProvider,
} from 'react-router'
import { MenueProvider } from './hooks/hooks.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
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
          </Route>
          <Route element={<EmployeeRoutes />}>
            <Route path="Dashbord" element={<EmpolyDashboard />} />

            <Route path="Annoucments" element={<Annoucments />} />
            <Route path="Colleagues" element={<Colleagues />} />
            <Route path="EmployeeLeave" element={<Leave />} />
            <Route path="EmployeeSchedule" element={<Schedule />} />
            <Route path="EmployeeTasks" element={<Tasks />} />
          </Route>
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="singup" element={<Singup />} />

      <Route path="login" element={<Login />} />
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
