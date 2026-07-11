import React from 'react'
import AdminDashbord from '../../pages/admin/AdminDashboard.js'
import EmpolyDashBoard from '../../pages/employee/EmpolyDashboard.js'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store.js'
const OverView = () => {
  const currentUser = useSelector((state: RootState) => state.currentUser)

  return (
    <AdminDashbord />

    // <EmpolyDashBoard />
  )
}

export default OverView
