import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { apiErrorMessage } from '../../utils/apiErrorMessage.js'
import { useVerifyEmailOtp } from '../../hooks/useAuth.js'

export default function VerifyEmailToken() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const hasRun = useRef(false)

  // 1. Instantly read the 'token' parameter from the URL on load
  const tokenFromUrl = searchParams.get('token')?.trim() || ''

  // 2. Local state to preserve the token once the URL is cleaned up
  const [verificationToken, setVerificationToken] = useState('')

  // 3. Extract the token and clear the query parameter smoothly without render loops
  useEffect(() => {
    if (tokenFromUrl && !verificationToken) {
      setVerificationToken(tokenFromUrl)

      setSearchParams(
        (prev) => {
          const nextParams = new URLSearchParams(prev)
          nextParams.delete('token')
          return nextParams
        },
        { replace: true }
      )
    }
  }, [tokenFromUrl, verificationToken, setSearchParams])

  const { mutate, data, isPending, isSuccess, isError, error } = useVerifyEmailOtp()

  // 4. Trigger mutation only after the verification token is firmly saved into state
  useEffect(() => {
    if (!verificationToken || hasRun.current) return
    hasRun.current = true

    // NOTE: If your useVerifyEmailOtp hook expects an object, use: mutate({ token: verificationToken })
    // If it expects a raw string, keep it as: mutate(verificationToken)
    mutate({ token: verificationToken })
  }, [verificationToken, mutate])

  // 5. Fallback screen if there is no token anywhere
  if (!verificationToken && !tokenFromUrl && !isPending && !isSuccess) {
    return (
      <main className="min-h-screen bg-bg px-5 py-12 text-text-primary text-center">
        <h1 className="mb-2 text-2xl font-semibold text-error">Missing Verification Token</h1>
        <p className="mb-5 text-sm text-text-secondary">
          No valid verification token was detected in the URL link address.
        </p>
        <Link to="/login" className="text-primary hover:underline">
          Return to login
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-bg px-5 py-12 text-text-primary">
      <section className="mx-auto w-full max-w-md text-center">
        {(isPending || (!verificationToken && tokenFromUrl)) && (
          <>
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <h1 className="mb-2 text-2xl font-semibold">Verifying Link...</h1>
            <p className="text-sm text-text-secondary">
              Please wait while we validate your verification token.
            </p>
          </>
        )}

        {isSuccess && (
          <>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg
                xmlns="http://w3.org"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="mb-2 text-2xl font-semibold text-primary">Account Verified!</h1>
            <p className="mb-6 text-sm text-text-secondary">
              Your email has been successfully confirmed. You can now log into your account
              dashboard.
            </p>
            <Link
              to="/login"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
            >
              Go to Login
            </Link>
          </>
        )}

        {isError && (
          <>
            <h1 className="mb-2 text-2xl font-semibold text-error">Verification Link Expired</h1>
            <p role="alert" className="mb-5 text-sm text-error">
              {apiErrorMessage(error, 'This token is invalid or has expired.')}
            </p>
            <Link to="/register" className="text-primary hover:underline">
              Return to registration
            </Link>
          </>
        )}
      </section>
    </main>
  )
}
