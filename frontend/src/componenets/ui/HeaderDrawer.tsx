import React from 'react'
import useMenue from '../../hooks/useMenue.js'

const HeaderDrawer = () => {
  const { toggleDashBoardDrawer } = useMenue()

  return (
    <div className="hidden sm:flex">
      <button
        type="button"
        onClick={toggleDashBoardDrawer}
        className="text-text-primary focus:outline-none"
        aria-label="Toggle dashboard navigation"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  )
}

export default HeaderDrawer
