import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import "./index.css";
import "./App.css";
import Layout from "./Layout";
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
  Annoucments,
  Colleagues,
  Leave,
  Schedule,
  Tasks,
  Singup
} from "./import.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
 

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="overview" element={<OverView />} />

      <Route path="dashboard" element={<DashBoard />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/department" element={<AdminDepartment />} />
        <Route path="admin/employees" element={<AdminEmployees />} />
        <Route path="admin/profile" element={<AdminProfile />} />
        <Route path="admin/reports" element={<AdminReports />} />
        <Route path="admin/tasks" element={<AdminTasks />} />

        <Route path="employee" element={<EmpolyDashboard />} />
        <Route path="employee/announcements" element={<Annoucments />} />
        <Route path="employee/colleagues" element={<Colleagues />} />
        <Route path="employee/leave" element={<Leave />} />
        <Route path="employee/schedule" element={<Schedule />} />
        <Route path="employee/tasks" element={<Tasks />} />

        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="singup" element={<Singup />} />

      <Route path="login" element={<Login />} />

    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
     
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    
  </StrictMode>
);
