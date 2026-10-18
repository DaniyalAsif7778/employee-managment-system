import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router'
import BuildStatusBadge from './componenets/ui/BuildStatusBadge.js'
import './index.css'
function Layout() {
  return (
    <div className="w-full">
      <BuildStatusBadge />
      <Outlet />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          className: `
      bg-surface
      text-text-primary 
      border border-border
      rounded-xl px-5 py-4
      shadow-[0_8px_30px_rgba(0,0,0,0.5)]
      font-medium backdrop-blur-md
      transition-all duration-300
      hover:scale-[1.015]
    `,
          success: {
            icon: '✅',
            className: `
        border-l-4 border-[var(--color-success)]
        bg-surface
      `,
          },
          error: {
            icon: '❌',
            className: `
        border-l-4 border-[var(--color-error)]
        bg-surface
      `,
          },
          loading: {
            icon: '⏳',
            className: `
        border-l-4 border-[var(--color-primary)]
        bg-surface
      `,
          },
        }}
      />
    </div>
  )
}

export default Layout
