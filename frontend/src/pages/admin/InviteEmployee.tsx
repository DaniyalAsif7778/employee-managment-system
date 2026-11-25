import { UserPlus } from 'lucide-react'
import PageHeader from '../../componenets/ui/PageHeader.js'

export default function InviteEmployee() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 p-4 text-text-primary sm:p-6">
      <PageHeader
        title="Invite employee"
        description="Sample invitation form for UI preview."
        icon={UserPlus}
      />
      <form className="grid gap-4 rounded-xl border border-border bg-surface p-5 sm:grid-cols-2 sm:p-6">
        <label className="grid gap-1.5 text-sm text-text-secondary">
          First name
          <input
            className="h-10 rounded-lg border border-border bg-bg px-3 text-text-primary"
            placeholder="First name"
          />
        </label>
        <label className="grid gap-1.5 text-sm text-text-secondary">
          Last name
          <input
            className="h-10 rounded-lg border border-border bg-bg px-3 text-text-primary"
            placeholder="Last name"
          />
        </label>
        <label className="grid gap-1.5 text-sm text-text-secondary sm:col-span-2">
          Work email
          <input
            type="email"
            className="h-10 rounded-lg border border-border bg-bg px-3 text-text-primary"
            placeholder="name@company.com"
          />
        </label>
        <label className="grid gap-1.5 text-sm text-text-secondary">
          Department
          <select className="h-10 rounded-lg border border-border bg-bg px-3 text-text-primary">
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Finance</option>
            <option>Marketing</option>
          </select>
        </label>
        <label className="grid gap-1.5 text-sm text-text-secondary">
          Role
          <select className="h-10 rounded-lg border border-border bg-bg px-3 text-text-primary">
            <option>Employee</option>
            <option>Manager</option>
            <option>HR</option>
          </select>
        </label>
        <button
          type="button"
          className="h-10 rounded-lg bg-primary px-4 text-sm font-medium text-white sm:col-span-2"
        >
          Preview invitation
        </button>
        <p className="text-xs text-text-secondary sm:col-span-2">
          This sample form does not send invitations or contact the server.
        </p>
      </form>
    </main>
  )
}
