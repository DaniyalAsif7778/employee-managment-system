import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { ArrowLeft, Mail } from 'lucide-react'
import Input from '../../componenets/ui/Input.js'
import { useRequestPasswordResetOtp } from '../../hooks/useAuth.js'
type ForgotPasswordForm = { email: string }

export default function ForgotPassword() {
  const { mutate, isPending, isError } = useRequestPasswordResetOtp()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({ defaultValues: { email: '' } })

  const onSubmit = ({ email }: ForgotPasswordForm) => {
    const normalizedEmail = email.trim().toLowerCase()
    mutate({ email: normalizedEmail })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-5 py-12 text-text-primary">
      <section className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-xl sm:p-8">
        <Link
          to="/login"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary"
        >
          <ArrowLeft size={16} /> Back to login
        </Link>
        <div className="mb-5 grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
          <Mail size={22} />
        </div>
        <h1 className="mb-2 text-3xl font-semibold">Forgot your password?</h1>
        <p className="mb-7 text-sm leading-6 text-text-secondary">
          Enter the email address on your account. We’ll show the six-digit verification step next.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Account email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
            })}
            onChange={(event) =>
              setValue('email', event.target.value.trimStart().toLowerCase(), {
                shouldDirty: true,
                shouldValidate: false,
              })
            }
            onBlur={(event) =>
              setValue('email', event.target.value.trim().toLowerCase(), {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
            error={errors.email?.message}
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-fg transition hover:bg-primary-hover"
          >
            Continue
          </button>
        </form>
      </section>
    </main>
  )
}
