import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router'
import { getCurrentUser } from './lib/api/auth.service.js'
import { useLoginSlice } from './store/LoginSlice.js'

function ProtectedRoutes() {
  const role = useLoginSlice((state) => state.role)
  const sessionReady = useLoginSlice((state) => state.sessionReady)
  const setAuthenticatedRole = useLoginSlice((state) => state.setAuthenticatedRole)
  const finishSessionRestore = useLoginSlice((state) => state.finishSessionRestore)

  useEffect(() => {
    if (sessionReady) return

    let isActive = true
    getCurrentUser()
      .then((response) => {
        const responseRole = response.data?.user?.[0]?.role?.trim().toLowerCase()
        const validRoles = ['admin', 'employee', 'manager', 'hr']
        if (isActive && responseRole && validRoles.includes(responseRole)) {
          setAuthenticatedRole(responseRole)
        } else if (isActive) {
          finishSessionRestore()
        }
      })
      .catch(() => {
        if (isActive) finishSessionRestore()
      })

    return () => {
      isActive = false
    }
  }, [finishSessionRestore, sessionReady, setAuthenticatedRole])

  if (!sessionReady) {
    return <div className="p-6 text-text-secondary">Restoring your session...</div>
  }

  return role ? <Outlet /> : <Navigate to="/login" replace />
}

function RoleRoutes({ allowedRole }) {
  const role = useLoginSlice((state) => state.role)
  return role === allowedRole ? <Outlet /> : <Navigate to="/login" replace />
}

function AdminRoutes() {
  return <RoleRoutes allowedRole="admin" />
}

function EmployeeRoutes() {
  return <RoleRoutes allowedRole="employee" />
}

function ManagerRoutes() {
  return <RoleRoutes allowedRole="manager" />
}

function HRRoutes() {
  return <RoleRoutes allowedRole="hr" />
}

export { ProtectedRoutes, AdminRoutes, EmployeeRoutes, ManagerRoutes, HRRoutes }
