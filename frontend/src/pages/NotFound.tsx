import { Link } from 'react-router'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center p-8">
      <div className="text-center">
        <div className="mb-8">
          <div className="inline-block w-24 h-24 rounded-2xl bg-[#121212] border border-[#333333] flex items-center justify-center mb-6">
            <span className="text-[48px] font-semibold text-[#009F8E]">?</span>
          </div>
        </div>
        <h1 className="text-[64px] font-semibold text-[#E0E0E0] mb-4 tracking-tight">404</h1>
        <h2 className="text-[24px] font-semibold text-[#E0E0E0] mb-4">Page Not Found</h2>
        <p className="text-[16px] text-[#9CA3AF] mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#009F8E] text-white px-6 py-3 rounded-lg hover:bg-[#12C4D3] transition-all duration-200 shadow-lg shadow-[#009F8E]/20 text-[15px] font-medium"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
