import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import Input from '../../componenets/ui/Input.js'
import { useRequestPasswordResetOtp } from '../../hooks/useAuth.js'
import { apiErrorMessage } from '../../utils/apiErrorMessage.js'

type ForgotPasswordForm = { email: string }

export default function ForgotPassword() {
  const navigate = useNavigate()
  const { mutate, isPending, isError, error } = useRequestPasswordResetOtp()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({ defaultValues: { email: '' } })

  const onSubmit = ({ email }: ForgotPasswordForm) => {
    const normalizedEmail = email.trim().toLowerCase()
    mutate(
      { email: normalizedEmail },
      { onSuccess: () => navigate(`/verify-otp?email=${encodeURIComponent(normalizedEmail)}`) }
    )
  }

  return (
    <main className="min-h-screen bg-bg px-5 py-12 text-text-primary">
      <section className="mx-auto w-full max-w-md">
        <h1 className="mb-2 text-3xl font-semibold">Reset your password</h1>
        <p className="mb-8 text-sm text-text-secondary">
          Enter your account email and we will send a verification code.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="you@company.com"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
            })}
            onChange={(event) =>
              setValue('email', event.target.value.trimStart().toLowerCase(), { shouldDirty: true })
            }
            onBlur={(event) =>
              setValue('email', event.target.value.trim().toLowerCase(), {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
            error={errors.email?.message}
          />
          {isError && (
            <p role="alert" className="text-sm text-error">
              {apiErrorMessage(error, 'Could not send a verification code.')}
            </p>
          )}
          <button className="w-full rounded-md bg-primary px-4 py-3 font-medium text-primary-fg disabled:opacity-60" disabled={isPending}>
            {isPending ? 'Sending code...' : 'Send verification code'}
          </button>
        </form>
        <Link to="/login" className="mt-6 inline-block text-sm text-primary hover:underline">
          Back to login
        </Link>
      </section>
    </main>
  )
}