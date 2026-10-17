import { Link, useSearchParams } from 'react-router'

export default function AuthErrorScreen() {
  const [searchParams] = useSearchParams()
  const message = searchParams.get('message') || 'The page or action could not be completed.'

  return (
    <main className="min-h-screen bg-bg px-5 py-12 text-text-primary">
      <section className="mx-auto max-w-lg">
        <p className="mb-2 text-sm font-medium uppercase text-error">Something went wrong</p>
        <h1 className="mb-3 text-3xl font-semibold">We could not complete that request</h1>
        <p className="mb-8 text-text-secondary">{message}</p>
        <div className="flex gap-3">
          <button type="button" onClick={() => window.history.back()} className="rounded-md border border-border px-4 py-2.5">
            Go back
          </button>
          <Link to="/login" className="rounded-md bg-primary px-4 py-2.5 text-primary-fg">
            Return to login
          </Link>
        </div>
      </section>
    </main>
  )
}