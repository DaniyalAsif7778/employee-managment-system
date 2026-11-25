import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { ArrowLeft, MailCheck } from 'lucide-react'
import { useVerifyPasswordResetOtp } from '../../hooks/useAuth.js'
const DEMO_OTP = '123456'

export default function VerifyPasswordOtp() {
  const { mutate, isPending, isError } = useVerifyPasswordResetOtp()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const email = searchParams.get('email')?.trim().toLowerCase() ?? ''
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')

  const submitOtp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    if (!email) {
      setError('Email is missing. Start the password reset again.')
      return
    }
    if (!/^\d{6}$/.test(otp)) {
      setError('Enter all six digits.')
      return
    }

    mutate({ email, otp })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-5 py-12 text-text-primary">
      <section className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-xl sm:p-8">
        <Link
          to="/forgot-password"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary"
        >
          <ArrowLeft size={16} /> Change email
        </Link>
        <div className="mb-5 grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
          <MailCheck size={22} />
        </div>
        <h1 className="mb-2 text-3xl font-semibold">Verify your email</h1>
        <p className="mb-6 text-sm leading-6 text-text-secondary">
          Enter the six-digit code for{' '}
          <span className="font-medium text-text-primary">{email || 'your account'}</span>.
        </p>
        {!email ? (
          <p
            role="alert"
            className="mb-5 rounded-lg border border-error/30 bg-error/10 p-3 text-sm text-error"
          >
            Email is missing from this reset link. Start again with your account email.
          </p>
        ) : null}
        <form onSubmit={submitOtp} className="space-y-5">
          <label
            htmlFor="password-reset-otp"
            className="block text-sm font-medium text-text-secondary"
          >
            6-digit code
          </label>
          <input
            id="password-reset-otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6}"
            maxLength={6}
            value={otp}
            onChange={(event) => {
              setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))
              setError('')
            }}
            placeholder="••••••"
            aria-invalid={Boolean(error)}
            aria-describedby="otp-help otp-error"
            className="h-14 w-full rounded-lg border border-border bg-bg text-center font-mono text-2xl tracking-[0.65em] text-text-primary outline-none transition focus:border-primary"
          />
           
          {error ? (
            <p id="otp-error" role="alert" className="text-sm text-error">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={!email || otp.length !== 6}
            className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-fg transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            Verify code
          </button>
        </form>
      </section>
    </main>
  )
}
