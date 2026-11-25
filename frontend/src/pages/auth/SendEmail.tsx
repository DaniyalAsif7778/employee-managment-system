import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { useSendVerificationEmail } from '../../hooks/useAuth.js'
import { apiErrorMessage } from '../../utils/apiErrorMessage.js'

export default function SendVerification() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const hasRun = useRef(false)

  // 1. Read the parameter cleanly on initial render
  const emailFromUrl = searchParams.get('email')?.trim() || ''

  // 2. State to hold onto the captured email so it survives the URL erasure
  const [userEmail, setUserEmail] = useState('')

  // 3. Capture email AND strip the parameter safely without triggering an infinite rendering loop
  useEffect(() => {
    if (emailFromUrl && !userEmail) {
      setUserEmail(emailFromUrl)

      // Clear the parameter right after saving it to React state
      setSearchParams(
        (prev) => {
          const nextParams = new URLSearchParams(prev)
          nextParams.delete('email')
          return nextParams
        },
        { replace: true }
      )
    }
  }, [emailFromUrl, userEmail, setSearchParams])

  const { mutate, data, isPending, isSuccess, isError, error } = useSendVerificationEmail()

  // 4. Trigger the API request to SEND the email only after userEmail is successfully saved to local state
  useEffect(() => {
    if (!userEmail || hasRun.current) return
    hasRun.current = true

    mutate({ email: userEmail })
  }, [userEmail, mutate])

  // 5. Fallback screen if there was no email in the URL and nothing is processing
  if (!userEmail && !emailFromUrl && !isPending && !isSuccess) {
    return (
      <main className="min-h-screen bg-bg px-5 py-12 text-text-primary text-center">
        <h1 className="mb-2 text-2xl font-semibold text-error">Email Required</h1>
        <p className="mb-5 text-sm text-text-secondary">
          We couldn't detect an email address to send a verification link to.
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
        {(isPending || (!userEmail && emailFromUrl)) && (
          <>
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <h1 className="mb-2 text-2xl font-semibold">Sending Email...</h1>
            <p className="text-sm text-text-secondary">
              Generating your verification link for {userEmail || emailFromUrl}
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
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </div>
            <h1 className="mb-2 text-2xl font-semibold text-primary">Email Sent Successfully</h1>
            <p className="mb-6 text-sm text-text-secondary">
              A verification link has been dispatched to{' '}
              <span className="font-medium text-text-primary">{userEmail}</span>. Please check your
              inbox and spam folder.
            </p>
            <Link
              to="/login"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
            >
              Proceed to Login
            </Link>
          </>
        )}

        {isError && (
          <>
            <h1 className="mb-2 text-2xl font-semibold text-error">Failed to send email</h1>
            <p role="alert" className="mb-5 text-sm text-error">
              {apiErrorMessage(error, 'We ran into an issue dispatching the email link.')}
            </p>
            <Link to="/login" className="text-primary hover:underline">
              Try again from login
            </Link>
          </>
        )}
      </section>
    </main>
  )
}
