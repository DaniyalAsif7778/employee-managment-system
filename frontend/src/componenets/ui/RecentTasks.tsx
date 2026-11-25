import { useMemo, useState } from 'react'
import { Check, ClipboardList, RotateCcw } from 'lucide-react'
import { Link } from 'react-router'
import { workspaceFixtures } from '../../lib/workspaceFixtures.js'
import { useLoginSlice } from '../../store/LoginSlice.js'

type TaskFilter = 'all' | 'open' | 'done'

const filters: { id: TaskFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'open', label: 'Open' },
  { id: 'done', label: 'Completed' },
]

function formatDueDate(value: string) {
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value || 'No due date'
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(date)
}

const RecentTasks = () => {
  const role = useLoginSlice((state) => state.role)
  const userId = useLoginSlice((state) => state.userId)
  const [tasks, setTasks] = useState(() => workspaceFixtures.tasks.map((task) => ({ ...task })))
  const [filter, setFilter] = useState<TaskFilter>('all')
  const tasksPath =
    role && userId ? `/dashboard/${role}/${encodeURIComponent(userId)}/tasks` : '/login'
  const visibleTasks = useMemo(() => {
    if (filter === 'open') return tasks.filter((task) => task.status !== 'done')
    if (filter === 'done') return tasks.filter((task) => task.status === 'done')
    return tasks
  }, [filter, tasks])

  const toggleTask = (taskId: string) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === 'done' ? 'in-progress' : 'done' }
          : task
      )
    )
  }

  const resetTasks = () => {
    setTasks(workspaceFixtures.tasks.map((task) => ({ ...task })))
    setFilter('all')
  }

  return (
    <section className="flex min-w-0 flex-1 flex-col rounded-2xl border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4 sm:p-5">
        <div>
          <h2 className="font-semibold text-text-primary">Recent tasks</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Try updating a sample task to preview the interaction.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to={tasksPath}
            className="shrink-0 text-sm font-medium text-primary hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            View tasks
          </Link>
          <button
            type="button"
            onClick={resetTasks}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="Reset sample tasks"
            title="Reset sample tasks"
          >
            <RotateCcw aria-hidden="true" size={15} />
          </button>
        </div>
      </div>

      <div
        className="flex flex-wrap gap-2 border-b border-border px-4 py-3 sm:px-5"
        aria-label="Filter sample tasks"
      >
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${filter === item.id ? 'bg-primary/15 text-primary' : 'text-text-secondary hover:bg-muted hover:text-text-primary'}`}
          >
            {item.label}
            <span className="ml-1.5 tabular-nums">
              {item.id === 'all'
                ? tasks.length
                : tasks.filter((task) =>
                    item.id === 'done' ? task.status === 'done' : task.status !== 'done'
                  ).length}
            </span>
          </button>
        ))}
      </div>

      {visibleTasks.length ? (
        <ul className="divide-y divide-border">
          {visibleTasks.map((task) => {
            const isDone = task.status === 'done'
            return (
              <li key={task.id} className="flex min-w-0 items-center gap-3 px-4 py-4 sm:px-5">
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  aria-label={`${isDone ? 'Reopen' : 'Complete'} ${task.name}`}
                  aria-pressed={isDone}
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${isDone ? 'border-primary bg-primary text-white' : 'border-border text-transparent hover:border-primary'}`}
                >
                  <Check aria-hidden="true" size={14} />
                </button>
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-sm font-medium ${isDone ? 'text-text-secondary line-through' : 'text-text-primary'}`}
                  >
                    {task.name}
                  </p>
                  <p className="mt-1 truncate text-xs text-text-secondary">
                    {task.assignee} · Due {formatDueDate(task.dueDate)}
                  </p>
                </div>
                <span
                  className={`hidden shrink-0 rounded-full px-2.5 py-1 text-xs capitalize sm:inline-flex ${task.priority === 'urgent' || task.priority === 'high' ? 'bg-error/10 text-error' : 'bg-muted text-text-secondary'}`}
                >
                  {task.priority}
                </span>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className="flex min-h-36 flex-col items-center justify-center px-4 py-8 text-center">
          <ClipboardList aria-hidden="true" size={20} className="mb-3 text-text-secondary" />
          <p className="text-sm font-medium text-text-primary">No tasks in this filter</p>
          <p className="mt-1 text-xs text-text-secondary">
            Choose another filter to see sample tasks.
          </p>
        </div>
      )}
    </section>
  )
}

export default RecentTasks
