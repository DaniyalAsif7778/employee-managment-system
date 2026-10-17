import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import Input from '../../componenets/ui/Input.js'
import { useInviteEmployee } from '../../hooks/useAuth.js'
import type { InviteEmployeeRequest } from '../../types.js'
import { apiErrorMessage } from '../../utils/apiErrorMessage.js'

type InviteEmployeeForm = InviteEmployeeRequest

export default function InviteEmployee() {
  const navigate = useNavigate()
  const { mutate, isPending, isError, error } = useInviteEmployee()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteEmployeeForm>({
    defaultValues: { fullName: '', email: '', role: 'employee' },
  })

  const onSubmit = (employee: InviteEmployeeForm) => {
    mutate(
      {
        fullName: employee.fullName.trim(),
        email: employee.email.trim().toLowerCase(),
        role: employee.role,
      },
      { onSuccess: () => navigate('/DashBoard/Employees') }
    )
  }

  return (
    <main className="mx-auto w-full max-w-2xl p-6 text-text-primary">
      <Link to="/DashBoard/Employees" className="mb-6 inline-block text-sm text-primary hover:underline">
        Back to employees
      </Link>
      <h1 className="mb-2 text-3xl font-semibold">Invite an employee</h1>
      <p className="mb-8 text-sm text-text-secondary">
        Choose the employee&apos;s organization role. They will set their password from the invitation email.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Full name"
          type="text"
          autoComplete="name"
          {...register('fullName', { required: 'Full name is required' })}
          error={errors.fullName?.message}
        />
        <Input
          label="Work email"
          type="email"
          autoComplete="email"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
          })}
          error={errors.email?.message}
        />
        <div>
          <label htmlFor="employee-role" className="mb-1.5 block text-sm text-text-secondary">Role</label>
          <select id="employee-role" {...register('role')} className="h-11 w-full rounded-md border border-border bg-surface px-3 text-text-primary">
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="hr">HR</option>
          </select>
        </div>
        {isError && (
          <p role="alert" className="text-sm text-error">
            {apiErrorMessage(error, 'The employee invitation could not be created.')}
          </p>
        )}
        <button className="rounded-md bg-primary px-5 py-3 font-medium text-primary-fg disabled:opacity-60" disabled={isPending}>
          {isPending ? 'Sending invitation...' : 'Send invitation'}
        </button>
      </form>
    </main>
  )
}