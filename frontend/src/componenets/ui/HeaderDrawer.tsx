import React from 'react'
import { useDispatch } from 'react-redux'
import { setDashBoardStatus } from '../../features/menueSlice.js'

interface HeaderDrawerProps {
  status1: boolean
}

const HeaderDrawer = ({ status1 }: HeaderDrawerProps) => {
  const dispatch = useDispatch()
  return (
    <div className="hidden sm:flex">
      <button
        onClick={() => {
          dispatch(setDashBoardStatus(status1))
        }}
        className="text-text-primary focus:outline-none"
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
