import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { useInviteEmployee } from '../../hooks/useAuth.js'
import { apiErrorMessage } from '../../utils/apiErrorMessage.js'

export default function SendEmail() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const hasRun = useRef(false)
  
  // 🚀 FIX 1: Grab the email instantly during state initialization so it never depends on an extra render cycle
  const [userEmail] = useState(() => searchParams.get('email')?.trim() || '')
  
  const { mutate, data, isPending, isSuccess, isError, error } = useInviteEmployee()

  // 🚀 FIX 2: Clear the parameter immediately on mount using a clean check
  useEffect(() => {
    if (searchParams.has('email')) {
      setSearchParams((prev) => {
        const nextParams = new URLSearchParams(prev)
        nextParams.delete('email')
        return nextParams
      }, { replace: true }) // Keeps browser back-history clean
    }
  }, [searchParams, setSearchParams])

  useEffect(() => {
    // 🚀 FIX 3: Strict guard clause. If there is no email in the state, exit immediately.
    if (!userEmail || hasRun.current) return
    hasRun.current = true

    mutate(
      { email: userEmail },
      
      
    )
  }, [userEmail, mutate, navigate])

  // 🚀 FIX 4: Gracefully catch any edge cases where a user lands on the page with a completely missing email link
  if (!userEmail && !isPending && !isSuccess) {
    return (
      <main className="min-h-screen bg-bg px-5 py-12 text-text-primary text-center">
        <h1 className="mb-2 text-2xl font-semibold text-error">Missing Email Parameter</h1>
        <p className="mb-5 text-sm text-text-secondary">No email address was provided in the link verification request.</p>
        <Link to="/login" className="text-primary hover:underline">Return to login</Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-bg px-5 py-12 text-text-primary">
      <section className="mx-auto w-full max-w-md text-center">
        {isPending && (
          <>
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <h1 className="mb-2 text-2xl font-semibold">Verifying...</h1>
            <p className="text-sm text-text-secondary">Please wait while we verify {userEmail}</p>
          </>
        )}

        {isSuccess && (
          <>
            <h1 className="mb-2 text-2xl font-semibold text-primary">Verified</h1>
            <p className="mb-4 text-sm text-text-secondary">{userEmail} has been verified.</p>
            <pre className="rounded-md bg-black/5 p-3 text-left text-xs">
              {JSON.stringify(data, null, 2)}
            </pre>
          </>
        )}

        {isError && (
          <>
            <h1 className="mb-2 text-2xl font-semibold text-error">Verification failed</h1>
            <p role="alert" className="mb-5 text-sm text-error">
              {apiErrorMessage(error, 'The code could not be verified.')}
            </p>
            <Link to="/forgot-password" className="text-primary hover:underline">
              Request a new code
            </Link>
          </>
        )}
      </section>
    </main>
  )
}
