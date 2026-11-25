import { useLocation } from 'react-router'
import { useForm } from 'react-hook-form'
import Input from '../../componenets/ui/Input.js'
import { LockKeyhole } from 'lucide-react'
import { useResetPassword } from '../../hooks/useAuth.js'
type ResetPasswordForm = { password: string; confirmPassword: string }

export default function ResetPassword() {
  const { mutate, isPending, isError, error } = useResetPassword()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ResetPasswordForm>()

  const onSubmit = (_form: ResetPasswordForm) => {
    const { password } = _form

    mutate({ newPassword: password })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-5 py-12 text-text-primary">
      <section className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-xl sm:p-8">
        <div className="mb-5 grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
          <LockKeyhole size={22} />
        </div>
        <h1 className="mb-2 text-3xl font-semibold">Choose a new password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="New password"
            type="password"
            autoComplete="new-password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Use at least 8 characters' },
              validate: (value) =>
                value.trim().length >= 8 || 'Password must contain at least 8 non-space characters',
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
          <button
            className="w-full rounded-md bg-primary px-4 py-3 font-medium text-primary-fg disabled:opacity-60"
            disabled={!!errors.password || !!errors.confirmPassword}
            type="submit"
          >
            Save password
          </button>
        </form>
      </section>
    </main>
  )
}
