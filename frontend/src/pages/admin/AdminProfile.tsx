import { Mail, MapPin, Shield, UserRound } from 'lucide-react'
import PageHeader from '../../componenets/ui/PageHeader.js'
import { workspaceFixtures } from '../../lib/workspaceFixtures.js'

export default function AdminProfile() {
  const profile = workspaceFixtures.employees.find((employee) => employee.role === 'admins')
  const details = [
    { icon: Mail, label: 'Email', value: profile?.email },
    { icon: MapPin, label: 'Location', value: profile?.location },
    { icon: UserRound, label: 'Department', value: profile?.department },
    { icon: Shield, label: 'Account role', value: 'Administrator' },
  ]
  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 p-4 text-text-primary sm:p-6">
      <PageHeader
        title="Admin profile"
        description="Sample administrator profile preview."
        icon={UserRound}
      />
      <section className="grid gap-5 rounded-xl border border-border bg-surface p-5 sm:grid-cols-[220px_minmax(0,1fr)] sm:p-6">
        <div className="grid content-center justify-items-center rounded-lg bg-muted p-6 text-center">
          <span className="grid size-20 place-items-center rounded-full bg-primary/15 text-xl font-semibold text-primary">
            {profile?.firstName?.[0]}
            {profile?.lastName?.[0]}
          </span>
          <h2 className="mt-4 font-semibold">{profile?.fullName ?? 'Administrator'}</h2>
          <p className="mt-1 text-sm text-text-secondary">
            {profile?.position ?? 'System Administrator'}
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-text-secondary">
            <Shield size={14} /> Administrator
          </span>
        </div>
        <dl className="grid content-center gap-3 sm:grid-cols-2">
          {details.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-lg border border-border p-4">
              <dt className="flex items-center gap-2 text-xs text-text-secondary">
                <Icon size={15} />
                {label}
              </dt>
              <dd className="mt-2 break-words text-sm font-medium">{value || 'Not provided'}</dd>
            </div>
          ))}
        </dl>
      </section>
      <p className="text-xs text-text-secondary">Sample UI data from the frontend fixture.</p>
    </main>
  )
}
