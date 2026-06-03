import { useState, useEffect } from 'react'
import {
  X, MessageCircle, User, Phone, CalendarDays,
  Users, ChevronDown, ClipboardList, MapPin, CheckCircle2, Send,
} from 'lucide-react'

const PHONE = '916303644615'
const SEP   = '|||'

const EVENT_TYPES = [
  'Wedding & Reception',
  'Engagement Ceremony',
  'Birthday Celebration',
  'Corporate Event',
  'Housewarming Party',
  'Baby Shower',
  'Anniversary Dinner',
  'Other',
]

const LINE = '---------------------------------------'

function buildWhatsAppMessage(form, selected) {
  // Collect flat item list
  const items = [...selected].map((k) => k.split(SEP)[2])

  let msg = `*NEW CATERING INQUIRY*\n`
  msg += `${LINE}\n\n`

  msg += `*CLIENT DETAILS*\n`
  msg += `🧑 *Name:* ${form.name}\n`
  msg += `📱 *Phone:* ${form.phone}\n`
  msg += `📅 *Event Date:* ${form.date}\n`
  msg += `👥 *Guest Count:* ${form.guests} pax\n`
  msg += `📍 *Venue/Area:* ${form.venue || 'Not specified'}\n`
  if (form.notes.trim()) msg += `📝 *Notes:* ${form.notes}\n`

  msg += `\n*MENU SELECTION*\n`
  msg += `🍽️ *Event Type:* ${form.eventType}\n`
  msg += `✅ *Items Selected (${items.length}):*\n`
  items.forEach((item) => { msg += `✅ ${item}\n` })

  msg += `\n${LINE}\n`
  msg += `_Sent via The Madhu's Kitchen Website_`

  return msg
}

export default function WhatsAppOrderModal({ open, onClose, selected, onClearSelection }) {
  const [form, setForm] = useState({
    name: '', phone: '', eventType: EVENT_TYPES[0],
    date: '', guests: '', venue: '', notes: '',
  })
  const [step, setStep]   = useState(1)
  const [sent, setSent]   = useState(false)

  useEffect(() => {
    if (open) { setStep(1); setSent(false) }
  }, [open])

  const set     = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const isValid = form.name.trim() && form.phone.trim() && form.date && form.guests

  function handleSend() {
    const msg = buildWhatsAppMessage(form, selected)
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, '_blank')
    setSent(true)
  }

  function handleClose() {
    if (sent) onClearSelection()
    onClose()
  }

  if (!open) return null

  // Flat list of selected items for the review step
  const itemList = [...selected].map((k) => k.split(SEP)[2])

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative z-10 w-full max-w-xl rounded-2xl bg-white shadow-[0_32px_80px_rgba(0,0,0,0.45)] overflow-hidden">

        {/* WA-style header */}
        <div className="flex items-center gap-3 bg-[#075E54] px-5 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#128C7E] text-sm font-bold text-white">MK</div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">The Madhu's Kitchen</p>
            <p className="text-xs text-green-300">{selected.size} item{selected.size !== 1 ? 's' : ''} selected · Enquiry via WhatsApp</p>
          </div>
          <button onClick={handleClose} className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:bg-white/15 hover:text-white transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Steps */}
        <div className="flex border-b border-gray-100">
          {['Client Details', 'Review & Send'].map((label, i) => (
            <button
              key={label}
              onClick={() => step === 2 && i === 0 && setStep(1)}
              className={`flex flex-1 items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-wide transition ${
                step === i + 1 ? 'border-b-2 border-[#25D366] text-[#075E54]' : 'text-gray-400'
              }`}
            >
              <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${step === i + 1 ? 'bg-[#25D366] text-white' : 'bg-gray-200 text-gray-500'}`}>
                {i + 1}
              </span>
              {label}
            </button>
          ))}
        </div>

        <div className="max-h-[72vh] overflow-y-auto">

          {/* ── Step 1: Client Details ── */}
          {step === 1 && (
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full Name" icon={User} required>
                  <input type="text" value={form.name} onChange={set('name')} placeholder="Your full name" className="field-input" />
                </Field>
                <Field label="Phone / WhatsApp" icon={Phone} required>
                  <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 ..." className="field-input" />
                </Field>
              </div>

              <Field label="Event Type" icon={ClipboardList} required>
                <div className="relative">
                  <select value={form.eventType} onChange={set('eventType')} className="field-input appearance-none pr-10">
                    {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Event Date" icon={CalendarDays} required>
                  <input type="date" value={form.date} onChange={set('date')} min={new Date().toISOString().split('T')[0]} className="field-input" />
                </Field>
                <Field label="Guest Count (pax)" icon={Users} required>
                  <input type="number" value={form.guests} onChange={set('guests')} placeholder="e.g. 200" min="1" className="field-input" />
                </Field>
              </div>

              <Field label="Venue / Area" icon={MapPin}>
                <input type="text" value={form.venue} onChange={set('venue')} placeholder="e.g. Jubilee Hills, Hyderabad" className="field-input" />
              </Field>

              <Field label="Special Notes" icon={null}>
                <textarea value={form.notes} onChange={set('notes')} rows={2} placeholder="Dietary requirements, timing, etc." className="field-input resize-none" />
              </Field>

              <button
                onClick={() => setStep(2)}
                disabled={!isValid}
                className="w-full rounded-full bg-[#075E54] py-3 text-sm font-semibold text-white transition hover:bg-[#064c45] disabled:opacity-40"
              >
                Review Order →
              </button>
            </div>
          )}

          {/* ── Step 2: Review & Send ── */}
          {step === 2 && !sent && (
            <div className="p-5 space-y-4">

              {/* WhatsApp message preview */}
              <div className="rounded-xl bg-[#ECE5DD] p-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">WhatsApp Message Preview</p>
                <div className="rounded-xl rounded-tl-none bg-white p-4 text-xs text-gray-700 shadow-sm leading-relaxed font-mono whitespace-pre-wrap">
{`*NEW CATERING INQUIRY*
${LINE}

*CLIENT DETAILS*
🧑 *Name:* ${form.name}
📱 *Phone:* ${form.phone}
📅 *Event Date:* ${form.date}
👥 *Guest Count:* ${form.guests} pax
📍 *Venue/Area:* ${form.venue || 'Not specified'}

*MENU SELECTION*
🍽️ *Event Type:* ${form.eventType}
✅ *Items Selected (${itemList.length}):*
${itemList.map((i) => `✅ ${i}`).join('\n')}

${LINE}
_Sent via The Madhu's Kitchen Website_`}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 rounded-full border border-gray-200 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50">
                  ← Edit
                </button>
                <button
                  onClick={handleSend}
                  className="flex flex-[2] items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-semibold text-white transition hover:bg-[#1ebe5d] active:scale-[0.98]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Send on WhatsApp
                </button>
              </div>
            </div>
          )}

          {/* ── Sent ── */}
          {sent && (
            <div className="flex flex-col items-center gap-4 p-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/15">
                <Send className="h-8 w-8 text-[#25D366]" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">Inquiry Sent!</p>
                <p className="mt-1.5 text-sm text-gray-500">Our team will reply on WhatsApp shortly with pricing and availability.</p>
              </div>
              <button onClick={handleClose} className="mt-2 rounded-full bg-[#25D366] px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1ebe5d]">
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ label, icon: Icon, required, children }) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {label}
        {required && <span className="ml-0.5 text-red-400">*</span>}
      </label>
      {children}
    </div>
  )
}
