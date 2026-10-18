import { Link, useNavigate, useSearchParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import Input from '../../componenets/ui/Input.js'
import { useAcceptEmployeeInvitation, getEmployeeInvitation } from '../../hooks/useAuth.js'
import { apiErrorMessage } from '../../utils/apiErrorMessage.js'

type AcceptInvitationForm = { password: string; confirmPassword: string }

export default function AcceptInvitation() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token') ?? ''
  const invitationQuery = useQuery({
    queryKey: ['employee-invitation', token],
    queryFn: () => getEmployeeInvitation(token),
    enabled: Boolean(token),
    retry: false,
  })
  const invitation = invitationQuery.data?.data?.invitation
  const acceptInvitation = useAcceptEmployeeInvitation()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<AcceptInvitationForm>()

  const onSubmit = ({ password }: AcceptInvitationForm) => {
    acceptInvitation.mutate(
      { token, password: password.trim() },
      {
        onSuccess: () => {
          const query = new URLSearchParams({
            invitation: 'accepted',
            email: invitation?.email ?? '',
            role: invitation?.role ?? 'employee',
          })
          navigate(`/login?${query.toString()}`)
        },
      }
    )
  }

  if (!token || invitationQuery.isError || (!invitationQuery.isPending && !invitation)) {
    return (
      <main className="min-h-screen bg-bg px-5 py-12 text-text-primary">
        <section className="mx-auto max-w-md">
          <h1 className="mb-3 text-2xl font-semibold">Invitation link is invalid or expired</h1>
          <p className="mb-5 text-sm text-text-secondary">
            Ask your organization admin to send a new invitation.
          </p>
          <Link to="/login" className="text-primary hover:underline">
            Go to login
          </Link>
        </section>
      </main>
    )
  }

  if (invitationQuery.isPending) {
    return (
      <main className="min-h-screen bg-bg p-8 text-text-secondary">Checking invitation...</main>
    )
  }

  return (
    <main className="min-h-screen bg-bg px-5 py-12 text-text-primary">
      <section className="mx-auto w-full max-w-md">
        <h1 className="mb-2 text-3xl font-semibold">Accept your invitation</h1>
        <p className="mb-8 text-sm text-text-secondary">
          Set a password to join {invitation?.fullName ?? invitation?.email} as {invitation?.role}.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Work email"
            type="email"
            value={invitation?.email ?? ''}
            readOnly
            disabled
          />
          <Input
            label="Password"
            type="password"
            autoComplete="new-password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Use at least 8 characters' },
            })}
            error={errors.password?.message}
          />
          <Input
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            {...register('confirmPassword', {
              required: 'Confirm your password',
              validate: (value) => value === getValues('password') || 'Passwords do not match',
            })}
            error={errors.confirmPassword?.message}
          />
          {acceptInvitation.isError && (
            <p role="alert" className="text-sm text-error">
              {apiErrorMessage(acceptInvitation.error, 'The invitation could not be accepted.')}
            </p>
          )}
          <button
            className="w-full rounded-md bg-primary px-4 py-3 font-medium text-primary-fg disabled:opacity-60"
            disabled={acceptInvitation.isPending}
          >
            {acceptInvitation.isPending ? 'Setting password...' : 'Set password and continue'}
          </button>
        </form>
      </section>
    </main>
  )
}
