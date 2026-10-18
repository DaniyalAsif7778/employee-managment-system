import { useEffect } from 'react'
import { Navigate, Outlet, useParams } from 'react-router'
import { getCurrentUser } from './lib/api/auth.service.js'
import { useLoginSlice } from './store/LoginSlice.js'

function ProtectedRoutes() {
  const role = useLoginSlice((state) => state.role)
  const userId = useLoginSlice((state) => state.userId)
  const sessionReady = useLoginSlice((state) => state.sessionReady)
  const setAuthenticatedUser = useLoginSlice((state) => state.setAuthenticatedUser)
  const finishSessionRestore = useLoginSlice((state) => state.finishSessionRestore)

  useEffect(() => {
    if (sessionReady) return

    let isActive = true
    getCurrentUser()
      .then((response) => {
        const responseRole = response.data?.user?.[0]?.role?.trim().toLowerCase()
        const responseUserId = response.data?.user?.[0]?.id
        const validRoles = ['admin', 'employee', 'manager', 'hr']
        if (isActive && responseRole && responseUserId && validRoles.includes(responseRole)) {
          setAuthenticatedUser(responseRole, responseUserId)
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
  }, [finishSessionRestore, sessionReady, setAuthenticatedUser])

  if (!sessionReady) {
    return <div className="p-6 text-text-secondary">Restoring your session...</div>
  }

  return role ? <Outlet /> : <Navigate to="/login" replace />
}

function RoleRoutes({ allowedRole }) {
  const role = useLoginSlice((state) => state.role)
  const userId = useLoginSlice((state) => state.userId)
  const routeUserId = useParams().userId
  if (!role || !userId) return <Navigate to="/login" replace />
  if (role !== allowedRole || routeUserId !== userId) {
    return <Navigate to={`/dashboard/${role}/${encodeURIComponent(userId)}`} replace />
  }
  return <Outlet />
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
