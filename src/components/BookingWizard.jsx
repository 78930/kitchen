import { useEffect, useMemo, useState } from 'react'
import {
  X, Calendar, Users, PartyPopper, Crown, User, Check, ArrowLeft, ArrowRight, CheckCircle2,
} from 'lucide-react'
import { api } from '../lib/api'
import { useToast } from './Toast'
import Spinner from './Spinner'

const EVENT_TYPES = [
  'Wedding & Reception',
  'Engagement',
  'Birthday',
  'Corporate Event',
  'Housewarming',
  'Private Party',
]
const TIERS = ['Silver', 'Gold', 'Diamond', 'Platinum']

const todayISO = () => new Date().toISOString().split('T')[0]

const EMPTY = {
  event_date: '',
  guest_count: '',
  event_type: '',
  selected_tier: '',
  customer_name: '',
  email: '',
  phone: '',
  custom_notes: '',
}

export default function BookingWizard({ open, onClose, initial }) {
  const toast = useToast()
  const [step, setStep] = useState(0)
  const [data, setData] = useState(EMPTY)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (open) {
      setStep(0)
      setDone(false)
      setData({ ...EMPTY, ...(initial?.tier ? { selected_tier: initial.tier } : {}) })
    }
  }, [open, initial])

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }))

  const steps = ['Date', 'Guests', 'Event', 'Package', 'Contact']

  const stepValid = useMemo(() => {
    switch (step) {
      case 0:
        return data.event_date && data.event_date >= todayISO()
      case 1:
        return Number(data.guest_count) >= 10
      case 2:
        return !!data.event_type
      case 3:
        return !!data.selected_tier
      case 4:
        return (
          data.customer_name.trim().length >= 2 &&
          /^\S+@\S+\.\S+$/.test(data.email) &&
          /^[+\d][\d\s-]{7,}$/.test(data.phone)
        )
      default:
        return false
    }
  }, [step, data])

  if (!open) return null

  const next = () => {
    if (!stepValid) {
      toast.error('Please complete this step before continuing.')
      return
    }
    setStep((s) => Math.min(s + 1, steps.length - 1))
  }
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const submit = async () => {
    if (!stepValid) {
      toast.error('Please complete your contact details.')
      return
    }
    setLoading(true)
    try {
      await api.createBooking({ ...data, guest_count: Number(data.guest_count) })
      setDone(true)
      toast.success('Booking request received! Check your email for confirmation.')
    } catch (err) {
      if (err.fields) toast.error(Object.values(err.fields)[0])
      else toast.error(err.message || 'Could not submit booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[130] flex items-end justify-center bg-emerald-deep/70 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="animate-floatIn flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-cardHover sm:rounded-3xl">
        {/* Header */}
        <div className="flex items-center justify-between bg-emerald px-6 py-5 text-white">
          <div>
            <h3 className="font-serif text-2xl font-semibold">Book Your Event</h3>
            <p className="text-xs uppercase tracking-wider text-gold">The Madhu's Kitchen</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {done ? (
          <div className="flex flex-col items-center px-8 py-16 text-center">
            <CheckCircle2 className="h-20 w-20 text-emerald-soft" />
            <h4 className="mt-5 font-serif text-3xl font-semibold text-emerald-deep">
              Thank You, {data.customer_name.split(' ')[0]}!
            </h4>
            <p className="mt-3 max-w-md text-emerald-deep/70">
              Your booking request for a <strong>{data.event_type}</strong> on{' '}
              <strong>{data.event_date}</strong> is now under review. A styled confirmation has been
              emailed to <strong>{data.email}</strong> and our team will call you shortly.
            </p>
            <button onClick={onClose} className="btn-emerald mt-8">
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Progress */}
            <div className="border-b border-emerald/10 px-6 py-4">
              <div className="flex items-center justify-between">
                {steps.map((label, i) => (
                  <div key={label} className="flex flex-1 items-center last:flex-none">
                    <div className="flex flex-col items-center gap-1">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition ${
                          i < step
                            ? 'bg-emerald-soft text-white'
                            : i === step
                              ? 'bg-gold text-emerald shadow-gold'
                              : 'bg-emerald/10 text-emerald/40'
                        }`}
                      >
                        {i < step ? <Check className="h-4 w-4" /> : i + 1}
                      </span>
                      <span
                        className={`hidden text-[11px] font-semibold sm:block ${
                          i === step ? 'text-emerald-deep' : 'text-emerald/40'
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className={`mx-1 h-0.5 flex-1 rounded ${
                          i < step ? 'bg-emerald-soft' : 'bg-emerald/10'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-7">
              {step === 0 && (
                <StepShell icon={Calendar} title="When is your event?" hint="Select a future date.">
                  <input
                    type="date"
                    min={todayISO()}
                    value={data.event_date}
                    onChange={(e) => set('event_date', e.target.value)}
                    className="w-full rounded-xl border border-emerald/20 px-4 py-3 text-base text-emerald-deep outline-none transition focus:border-gold"
                  />
                </StepShell>
              )}

              {step === 1 && (
                <StepShell icon={Users} title="How many guests?" hint="Minimum 10 guests.">
                  <input
                    type="number"
                    min="10"
                    value={data.guest_count}
                    onChange={(e) => set('guest_count', e.target.value)}
                    placeholder="e.g. 250"
                    className="w-full rounded-xl border border-emerald/20 px-4 py-3 text-base text-emerald-deep outline-none transition focus:border-gold"
                  />
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[50, 100, 250, 500, 1000].map((n) => (
                      <button
                        key={n}
                        onClick={() => set('guest_count', String(n))}
                        className="rounded-full border border-emerald/20 px-4 py-1.5 text-sm text-emerald-deep/80 transition hover:border-gold hover:bg-gold/10"
                      >
                        {n}+
                      </button>
                    ))}
                  </div>
                </StepShell>
              )}

              {step === 2 && (
                <StepShell icon={PartyPopper} title="What's the occasion?">
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {EVENT_TYPES.map((t) => (
                      <OptionCard
                        key={t}
                        active={data.event_type === t}
                        onClick={() => set('event_type', t)}
                      >
                        {t}
                      </OptionCard>
                    ))}
                  </div>
                </StepShell>
              )}

              {step === 3 && (
                <StepShell icon={Crown} title="Choose your package">
                  <div className="grid grid-cols-2 gap-2.5">
                    {TIERS.map((t) => (
                      <OptionCard
                        key={t}
                        active={data.selected_tier === t}
                        onClick={() => set('selected_tier', t)}
                      >
                        {t}
                      </OptionCard>
                    ))}
                  </div>
                </StepShell>
              )}

              {step === 4 && (
                <StepShell icon={User} title="Your contact details">
                  <div className="space-y-4">
                    <LabeledInput
                      label="Full Name"
                      value={data.customer_name}
                      onChange={(e) => set('customer_name', e.target.value)}
                      placeholder="Your name"
                    />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <LabeledInput
                        label="Email"
                        type="email"
                        value={data.email}
                        onChange={(e) => set('email', e.target.value)}
                        placeholder="you@email.com"
                      />
                      <LabeledInput
                        label="Phone"
                        type="tel"
                        value={data.phone}
                        onChange={(e) => set('phone', e.target.value)}
                        placeholder="+91 ..."
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-emerald-deep/60">
                        Special Requests (optional)
                      </label>
                      <textarea
                        rows={3}
                        value={data.custom_notes}
                        onChange={(e) => set('custom_notes', e.target.value)}
                        placeholder="Dietary needs, venue, theme..."
                        className="w-full rounded-xl border border-emerald/20 px-4 py-3 text-sm text-emerald-deep outline-none transition focus:border-gold"
                      />
                    </div>
                  </div>
                </StepShell>
              )}
            </div>

            {/* Footer nav */}
            <div className="flex items-center justify-between border-t border-emerald/10 px-6 py-4">
              <button
                onClick={back}
                disabled={step === 0}
                className="btn-outline disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              {step < steps.length - 1 ? (
                <button onClick={next} className="btn-emerald">
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button onClick={submit} disabled={loading} className="btn-gold disabled:opacity-70">
                  {loading ? <Spinner label="Submitting..." /> : <>Confirm Booking <Check className="h-4 w-4" /></>}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function StepShell({ icon: Icon, title, hint, children }) {
  return (
    <div className="animate-fadeUp">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald/8 text-emerald">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <h4 className="font-serif text-xl font-semibold text-emerald-deep">{title}</h4>
          {hint && <p className="text-sm text-emerald-deep/55">{hint}</p>}
        </div>
      </div>
      {children}
    </div>
  )
}

function OptionCard({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
        active
          ? 'border-gold bg-gold/10 text-emerald-deep shadow-sm'
          : 'border-emerald/15 text-emerald-deep/75 hover:border-emerald/40 hover:bg-cream'
      }`}
    >
      {children}
      {active && <Check className="h-4 w-4 text-gold-dark" />}
    </button>
  )
}

function LabeledInput({ label, type = 'text', ...props }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-emerald-deep/60">
        {label}
      </label>
      <input
        type={type}
        {...props}
        className="w-full rounded-xl border border-emerald/20 px-4 py-3 text-sm text-emerald-deep outline-none transition focus:border-gold"
      />
    </div>
  )
}
