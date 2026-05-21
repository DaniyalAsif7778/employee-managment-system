import { Navigate, Outlet } from "react-router";

function ProtectedRoutes() {
  return <Outlet />
}

function AdminRoutes() {
  return <Outlet />
}
function EmployeeRoutes() {
  return <Outlet />
}
export { ProtectedRoutes, AdminRoutes, EmployeeRoutes }