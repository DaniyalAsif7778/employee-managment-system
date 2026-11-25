import { useMemo, useState } from 'react'
import { Search, UserRoundPlus } from 'lucide-react'
import { Link } from 'react-router'
import { workspaceFixtures } from '../../lib/workspaceFixtures.js'
import { useLoginSlice } from '../../store/LoginSlice.js'

const RecentHires = () => {
  const userId = useLoginSlice((state) => state.userId)
  const [search, setSearch] = useState('')
  const invitePath = userId
    ? `/dashboard/admins/${encodeURIComponent(userId)}/invite-employee`
    : '/login'
  const hires = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase()
    return [...workspaceFixtures.employees]
      .sort((left, right) => right.hireDate.localeCompare(left.hireDate))
      .filter((employee) =>
        `${employee.fullName} ${employee.position} ${employee.department}`
          .toLocaleLowerCase()
          .includes(normalizedSearch)
      )
      .slice(0, 3)
  }, [search])

  return (
    <section className="flex min-w-0 flex-col rounded-2xl border border-border bg-surface md:w-80 md:shrink-0">
      <div className="border-b border-border p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="font-semibold text-text-primary">Recent hires</h2>
            <p className="mt-1 text-sm text-text-secondary">Explore sample employee profiles.</p>
          </div>
          <span className="shrink-0 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
            Sample
          </span>
        </div>
        <label className="mt-4 flex h-10 items-center gap-2 rounded-lg border border-border bg-bg px-3 text-text-secondary focus-within:border-primary">
          <Search aria-hidden="true" size={16} />
          <span className="sr-only">Search sample employees</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search people"
            className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
          />
        </label>
      </div>

      {hires.length ? (
        <ul className="flex-1 divide-y divide-border">
          {hires.map((employee) => (
            <li key={employee.id} className="flex min-w-0 items-center gap-3 px-4 py-4">
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary"
              >
                {employee.firstName.slice(0, 1)}
                {employee.lastName.slice(0, 1)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-text-primary">
                  {employee.fullName}
                </p>
                <p className="truncate text-xs text-text-secondary">
                  {employee.position} · {employee.department}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex min-h-32 flex-col items-center justify-center px-4 py-6 text-center">
          <UserRoundPlus aria-hidden="true" size={20} className="mb-2 text-text-secondary" />
          <p className="text-sm font-medium text-text-primary">No matching people</p>
          <p className="mt-1 text-xs text-text-secondary">Try a different name or department.</p>
        </div>
      )}

      <div className="border-t border-border p-4">
        <Link
          to={invitePath}
          className="block rounded-lg border border-border px-3 py-2 text-center text-sm font-medium text-text-primary transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Invite an employee
        </Link>
      </div>
    </section>
  )
}

export default RecentHires
