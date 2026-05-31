import { useEffect, useState } from 'react'
import {
  Lock, LogOut, RefreshCw, Calendar, Users, Phone, Mail, ArrowLeft, Filter,
} from 'lucide-react'
import { api } from '../lib/api'
import { useToast } from './Toast'
import Spinner from './Spinner'

const STATUSES = ['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED']
const STATUS_STYLE = {
  PENDING: 'bg-gold/15 text-gold-dark border-gold/40',
  CONFIRMED: 'bg-emerald-soft/15 text-emerald-soft border-emerald-soft/40',
  CANCELLED: 'bg-red-100 text-red-600 border-red-300',
}

export default function AdminDashboard({ onExit }) {
  const toast = useToast()
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  const login = async (e) => {
    e.preventDefault()
    setAuthLoading(true)
    try {
      const res = await api.adminLogin(password)
      setToken(res.token)
      toast.success('Welcome back, Admin.')
    } catch (err) {
      toast.error(err.message || 'Invalid password.')
    } finally {
      setAuthLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-emerald-deep px-5">
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-cardHover"
        >
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald text-gold">
            <Lock className="h-7 w-7" />
          </span>
          <h1 className="mt-5 text-center font-serif text-2xl font-semibold text-emerald-deep">
            Admin Access
          </h1>
          <p className="mt-1 text-center text-sm text-emerald-deep/60">
            The Madhu's Kitchen booking dashboard
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="mt-6 w-full rounded-xl border border-emerald/20 px-4 py-3 text-sm outline-none transition focus:border-gold"
            autoFocus
          />
          <button type="submit" disabled={authLoading} className="btn-emerald mt-4 w-full disabled:opacity-70">
            {authLoading ? <Spinner label="Verifying..." /> : 'Sign In'}
          </button>
          <button
            type="button"
            onClick={onExit}
            className="mt-4 flex w-full items-center justify-center gap-1.5 text-sm text-emerald-deep/60 transition hover:text-emerald"
          >
            <ArrowLeft className="h-4 w-4" /> Back to website
          </button>
        </form>
      </div>
    )
  }

  return <Dashboard token={token} onLogout={() => setToken('')} onExit={onExit} />
}

function Dashboard({ token, onLogout, onExit }) {
  const toast = useToast()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')
  const [updatingId, setUpdatingId] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const res = await api.listBookings(token, filter === 'ALL' ? '' : filter)
      setBookings(res.bookings || res || [])
    } catch (err) {
      toast.error(err.message || 'Failed to load bookings.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const updateStatus = async (id, status) => {
    setUpdatingId(id)
    try {
      await api.updateBooking(token, id, status)
      toast.success(`Booking marked ${status.toLowerCase()}.`)
      setBookings((b) =>
        b.map((x) => ((x._id || x.id) === id ? { ...x, status } : x)).filter(
          (x) => filter === 'ALL' || x.status === filter,
        ),
      )
    } catch (err) {
      toast.error(err.message || 'Update failed.')
    } finally {
      setUpdatingId(null)
    }
  }

  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = s === 'ALL' ? bookings.length : bookings.filter((b) => b.status === s).length
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-emerald-deep text-white">
        <div className="container-x flex h-20 items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-semibold">Bookings Dashboard</h1>
            <p className="text-xs uppercase tracking-wider text-gold">The Madhu's Kitchen Admin</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={load} className="btn-ghost !border-white/30 !px-4" aria-label="Refresh">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button onClick={onExit} className="btn-ghost !border-white/30 hidden sm:inline-flex">
              View Site
            </button>
            <button onClick={onLogout} className="btn-gold">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container-x py-8">
        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-emerald-deep/50" />
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                filter === s
                  ? 'border-emerald bg-emerald text-gold'
                  : 'border-emerald/20 text-emerald-deep/70 hover:border-emerald/50'
              }`}
            >
              {s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-24 text-emerald">
            <Spinner className="h-8 w-8" label="Loading bookings..." />
          </div>
        ) : bookings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-emerald/20 bg-white py-24 text-center text-emerald-deep/50">
            No bookings found for this filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {bookings.map((b) => {
              const id = b._id || b.id
              return (
                <article key={id} className="rounded-2xl border border-emerald/10 bg-white p-6 shadow-card">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-emerald-deep">
                        {b.customer_name}
                      </h3>
                      <p className="text-sm text-emerald-deep/60">
                        {b.event_type} · {b.selected_tier}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold uppercase ${STATUS_STYLE[b.status]}`}
                    >
                      {b.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-emerald-deep/75">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gold-dark" />
                      {fmtDate(b.event_date)}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gold-dark" />
                      {b.guest_count} guests
                    </span>
                    <a href={`tel:${b.phone}`} className="flex items-center gap-2 hover:text-emerald">
                      <Phone className="h-4 w-4 text-gold-dark" />
                      {b.phone}
                    </a>
                    <a href={`mailto:${b.email}`} className="flex items-center gap-2 truncate hover:text-emerald">
                      <Mail className="h-4 w-4 shrink-0 text-gold-dark" />
                      <span className="truncate">{b.email}</span>
                    </a>
                  </div>

                  {b.custom_notes && (
                    <p className="mt-3 rounded-lg bg-cream px-3 py-2 text-sm italic text-emerald-deep/60">
                      “{b.custom_notes}”
                    </p>
                  )}

                  <div className="mt-5 flex gap-2 border-t border-emerald/10 pt-4">
                    <button
                      onClick={() => updateStatus(id, 'CONFIRMED')}
                      disabled={updatingId === id || b.status === 'CONFIRMED'}
                      className="btn-emerald flex-1 !py-2 !text-xs disabled:opacity-40"
                    >
                      {updatingId === id ? <Spinner className="h-4 w-4" /> : 'Confirm'}
                    </button>
                    <button
                      onClick={() => updateStatus(id, 'CANCELLED')}
                      disabled={updatingId === id || b.status === 'CANCELLED'}
                      className="btn-outline flex-1 !py-2 !text-xs disabled:opacity-40"
                    >
                      Cancel
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

function fmtDate(d) {
  try {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return d
  }
}
