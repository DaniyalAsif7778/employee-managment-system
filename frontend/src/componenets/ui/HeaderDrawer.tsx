import useMenue from '../../hooks/useMenue.js'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

type HeaderDrawerProps = {
  className?: string
}

const HeaderDrawer = ({ className = '' }: HeaderDrawerProps) => {
  const { dashBoardDrawer, toggleDashBoardDrawer } = useMenue()

  return (
    <button
      type="button"
      onClick={toggleDashBoardDrawer}
      className={`grid size-9 shrink-0 place-items-center rounded-lg text-[#b6b9c0] transition-colors hover:bg-[#171717] hover:text-white focus-visible:outline-2 focus-visible:outline-[#009f8e] ${className}`}
      aria-label={dashBoardDrawer ? 'Collapse dashboard navigation' : 'Expand dashboard navigation'}
      aria-expanded={dashBoardDrawer}
      aria-controls="dashboard-sidebar"
      title={dashBoardDrawer ? 'Collapse navigation' : 'Expand navigation'}
    >
      {dashBoardDrawer ? <IconChevronLeft size={20} /> : <IconChevronRight size={20} />}
    </button>
  )
}

export default HeaderDrawer
