import { Link, useNavigate, useSearchParams } from 'react-router'
import { useForm } from 'react-hook-form'
import Input from '../../componenets/ui/Input.js'
import { useVerifyPasswordResetOtp } from '../../hooks/useAuth.js'
import { apiErrorMessage } from '../../utils/apiErrorMessage.js'

type VerifyOtpForm = { otp: string }

export default function VerifyOtp() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const email = searchParams.get('email')?.trim().toLowerCase() ?? ''
  const { mutate, isPending, isError, error } = useVerifyPasswordResetOtp()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpForm>({ defaultValues: { otp: '' } })

  const onSubmit = ({ otp }: VerifyOtpForm) => {
    mutate(
      { email, otp: otp.trim() },
      {
        onSuccess: (response) => {
          const resetToken = response.data?.resetToken
          if (!resetToken) return
          navigate('/reset-password', { state: { email, resetToken } })
        },
      }
    )
  }

  if (!email) {
    return (
      <main className="min-h-screen bg-bg px-5 py-12 text-text-primary">
        <section className="mx-auto max-w-md">
          <h1 className="mb-3 text-2xl font-semibold">Verification link is incomplete</h1>
          <p className="mb-5 text-sm text-text-secondary">Request a new code to continue.</p>
          <Link to="/forgot-password" className="text-primary hover:underline">
            Request a code
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-bg px-5 py-12 text-text-primary">
      <section className="mx-auto w-full max-w-md">
        <h1 className="mb-2 text-3xl font-semibold">Enter your verification code</h1>
        <p className="mb-8 text-sm text-text-secondary">Code sent to {email}</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="6-digit code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="000000"
            {...register('otp', {
              required: 'Enter the code from your email',
              pattern: { value: /^\d{6}$/, message: 'Code must contain 6 digits' },
            })}
            error={errors.otp?.message}
          />
          {isError && (
            <p role="alert" className="text-sm text-error">
              {apiErrorMessage(error, 'The code could not be verified.')}
            </p>
          )}
          <button
            className="w-full rounded-md bg-primary px-4 py-3 font-medium text-primary-fg disabled:opacity-60"
            disabled={isPending}
          >
            {isPending ? 'Verifying...' : 'Verify code'}
          </button>
        </form>
        <Link
          to="/forgot-password"
          className="mt-6 inline-block text-sm text-primary hover:underline"
        >
          Send another code
        </Link>
      </section>
    </main>
  )
}
