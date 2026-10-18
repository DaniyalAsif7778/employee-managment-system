import { Link, useLocation, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import Input from '../../componenets/ui/Input.js'
import { useResetPassword } from '../../hooks/useAuth.js'
import { apiErrorMessage } from '../../utils/apiErrorMessage.js'

type ResetPasswordForm = { password: string; confirmPassword: string }
type ResetLocationState = { email?: string; resetToken?: string }

export default function ResetPassword() {
  const location = useLocation()
  const navigate = useNavigate()
  const { email, resetToken } = (location.state ?? {}) as ResetLocationState
  const { mutate, isPending, isError, error } = useResetPassword()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ResetPasswordForm>()

  const onSubmit = ({ password }: ResetPasswordForm) => {
    if (!email || !resetToken) return
    mutate(
      { email, resetToken, password: password.trim() },
      { onSuccess: () => navigate('/login?passwordReset=success') }
    )
  }

  if (!email || !resetToken) {
    return (
      <main className="min-h-screen bg-bg px-5 py-12 text-text-primary">
        <section className="mx-auto max-w-md">
          <h1 className="mb-3 text-2xl font-semibold">Reset session expired</h1>
          <p className="mb-5 text-sm text-text-secondary">
            Verify a new code to reset your password.
          </p>
          <Link to="/forgot-password" className="text-primary hover:underline">
            Start again
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-bg px-5 py-12 text-text-primary">
      <section className="mx-auto w-full max-w-md">
        <h1 className="mb-2 text-3xl font-semibold">Choose a new password</h1>
        <p className="mb-8 text-sm text-text-secondary">Updating password for {email}</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="New password"
            type="password"
            autoComplete="new-password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Use at least 8 characters' },
            })}
            error={errors.password?.message}
          />
          <Input
            label="Confirm new password"
            type="password"
            autoComplete="new-password"
            {...register('confirmPassword', {
              required: 'Confirm your password',
              validate: (value) => value === getValues('password') || 'Passwords do not match',
            })}
            error={errors.confirmPassword?.message}
          />
          {isError && (
            <p role="alert" className="text-sm text-error">
              {apiErrorMessage(error, 'Password could not be updated.')}
            </p>
          )}
          <button
            className="w-full rounded-md bg-primary px-4 py-3 font-medium text-primary-fg disabled:opacity-60"
            disabled={isPending}
          >
            {isPending ? 'Updating...' : 'Update password'}
          </button>
        </form>
      </section>
    </main>
  )
}
