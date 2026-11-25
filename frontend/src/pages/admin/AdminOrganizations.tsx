import { useState } from 'react'
import { Building2, Globe2, MapPin, Save, Users } from 'lucide-react'
import PageHeader from '../../componenets/ui/PageHeader.js'
import { workspaceFixtures } from '../../lib/workspaceFixtures.js'

export default function AdminOrganizations() {
  const [organization, setOrganization] = useState({
    ...workspaceFixtures.organization,
    description: 'A sample company profile for the admin UI preview.',
  })
  const [saved, setSaved] = useState(false)
  const update = (
    key:
      'name' | 'industry' | 'email' | 'phone' | 'website' | 'timezone' | 'address' | 'description',
    value: string
  ) => {
    setOrganization((current) => ({ ...current, [key]: value }))
    setSaved(false)
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-4 text-text-primary sm:p-6">
      <PageHeader
        title="Organization"
        description="Review and edit a local preview of organization details."
        icon={Building2}
      />
      <section className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center gap-3 text-primary">
            <Building2 size={18} />
            <span className="text-xs text-text-secondary">Organization</span>
          </div>
          <p className="mt-3 text-lg font-semibold">{organization.name}</p>
          <p className="mt-1 text-sm text-text-secondary">{organization.industry}</p>
        </article>
        <article className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center gap-3 text-primary">
            <Users size={18} />
            <span className="text-xs text-text-secondary">Members</span>
          </div>
          <p className="mt-3 text-lg font-semibold">{workspaceFixtures.employees.length}</p>
          <p className="mt-1 text-sm text-text-secondary">
            Across {workspaceFixtures.departments.length} departments
          </p>
        </article>
        <article className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center gap-3 text-primary">
            <Globe2 size={18} />
            <span className="text-xs text-text-secondary">Website</span>
          </div>
          <p className="mt-3 break-all text-sm font-semibold">{organization.website}</p>
          <p className="mt-1 text-sm text-text-secondary">{organization.timezone}</p>
        </article>
      </section>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          setSaved(true)
        }}
        className="rounded-xl border border-border bg-surface p-5 sm:p-6"
      >
        <div className="mb-5">
          <h2 className="text-base font-semibold">Company details</h2>
          <p className="mt-1 text-xs text-text-secondary">
            Changes on this sample form stay in this preview.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              ['name', 'Organization name'],
              ['industry', 'Industry'],
              ['email', 'Contact email'],
              ['phone', 'Phone'],
              ['website', 'Website'],
              ['timezone', 'Timezone'],
            ] as const
          ).map(([field, label]) => (
            <label key={field} className="grid gap-1.5 text-xs text-text-secondary">
              {label}
              <input
                type={field === 'email' ? 'email' : field === 'website' ? 'url' : 'text'}
                value={organization[field]}
                onChange={(event) => update(field, event.target.value)}
                className="h-10 min-w-0 rounded-lg border border-border bg-bg px-3 text-sm text-text-primary outline-none focus:border-primary"
              />
            </label>
          ))}
          <label className="grid gap-1.5 text-xs text-text-secondary sm:col-span-2">
            <span className="flex items-center gap-2">
              <MapPin size={14} /> Address
            </span>
            <input
              value={organization.address}
              onChange={(event) => update('address', event.target.value)}
              className="h-10 rounded-lg border border-border bg-bg px-3 text-sm text-text-primary outline-none focus:border-primary"
            />
          </label>
          <label className="grid gap-1.5 text-xs text-text-secondary sm:col-span-2">
            Description
            <textarea
              rows={3}
              value={organization.description ?? ''}
              onChange={(event) => update('description', event.target.value)}
              className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text-primary outline-none focus:border-primary"
            />
          </label>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-white"
          >
            <Save size={16} /> Save preview
          </button>
          {saved ? (
            <span role="status" className="text-sm text-success">
              Local preview saved.
            </span>
          ) : null}
        </div>
        <p className="mt-4 text-xs text-text-secondary">
          Sample UI data from the frontend fixture. No account data is changed.
        </p>
      </form>
    </main>
  )
}
