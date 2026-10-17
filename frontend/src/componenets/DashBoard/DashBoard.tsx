import React from 'react'
import { Outlet } from 'react-router'
import DashBordHeader from '../ui/DashBordHeader.js'
import HeaderDrawer from '../ui/HeaderDrawer.js'
import { useMenue } from '../../hooks/hooks.js'

const DashBoard = () => {
  const { dashBoardDrawer, toggleDashBoardDrawer } = useMenue()

  return (
    <div className="min-h-[calc(100dvh-2.5rem)] overflow-x-clip bg-bg text-text-primary">
      <DashBordHeader />
      {dashBoardDrawer && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={toggleDashBoardDrawer}
          className="fixed bottom-0 left-0 right-0 top-10 z-20 bg-black/55 sm:hidden"
        />
      )}
      {!dashBoardDrawer && (
        <HeaderDrawer className="fixed left-3 top-12 z-40 bg-[#1f1f1f] shadow-lg sm:hidden" />
      )}
      <main
        className={`min-h-[calc(100dvh-2.5rem)] min-w-0 overflow-x-clip pt-14 transition-[margin] duration-200 sm:pt-0 ${
          dashBoardDrawer ? 'sm:ml-60' : 'sm:ml-15'
        }`}
      >
        <Outlet />
      </main>
    </div>
  )
}

export default DashBoard
