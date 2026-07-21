import React, { useEffect } from 'react'
import AdminDashbord from '../../pages/admin/AdminDashboard.js'
import EmpolyDashBoard from '../../pages/employee/EmpolyDashboard.js'
import useMenue from '../../hooks/useMenue.js'

const OverView = () => {
  const { setDashBoardStatus } = useMenue()

  useEffect(() => {
    setDashBoardStatus(true)
  }, [setDashBoardStatus])

  return (
    <AdminDashbord />

    // <EmpolyDashBoard />
  )
}

export default OverView
