import { useEffect, useState } from 'react'
import { X, MessageCircle, ChevronRight } from 'lucide-react'

const PHONE = '916303644615'

const QUICK_MESSAGES = [
  { label: '🍛 Biryani Package Enquiry',   text: "Hi! I'd like to enquire about your Biryani packages for an upcoming event." },
  { label: '💍 Wedding Catering Quote',     text: "Hi! I'm planning a wedding and would love a catering quote from The Madhu's Kitchen." },
  { label: '🏢 Corporate Event Catering',  text: "Hi! I need catering for a corporate event. Can you share your packages and pricing?" },
  { label: '📞 Request a Callback',         text: "Hi! I'd like to get a callback from The Madhu's Kitchen team to discuss catering options." },
]

function waLink(text) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`
}

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 800)
    const t2 = setTimeout(() => setOpen(true), 4500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-6 right-6 z-[110] flex flex-col items-end gap-3">

      {/* Chat card */}
      {open && (
        <div className="animate-floatIn w-80 overflow-hidden rounded-2xl bg-white shadow-[0_24px_64px_rgba(0,0,0,0.25)]">

          {/* WA header */}
          <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#128C7E] text-sm font-bold text-white shadow">
              MK
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold leading-tight text-white">The Madhu's Kitchen</p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-green-300">
                <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
                Typically replies in minutes
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-white/70 transition hover:bg-white/15 hover:text-white"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Chat bubble */}
          <div className="bg-[#ECE5DD] px-4 pt-4 pb-3">
            <div className="max-w-[90%] rounded-2xl rounded-tl-none bg-white px-4 py-3 text-sm text-gray-700 shadow-sm">
              <p>👋 Hi there!</p>
              <p className="mt-1 text-sm leading-relaxed">
                Need catering? Pick a quick option below or chat with us directly — we'd love to make your event special!
              </p>
              <p className="mt-2 text-right text-[10px] text-gray-400">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>

          {/* Quick order options */}
          <div className="bg-[#ECE5DD] px-4 pb-3 space-y-2">
            {QUICK_MESSAGES.map((q) => (
              <a
                key={q.label}
                href={waLink(q.text)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-[#25D366]/30 bg-white px-3.5 py-2.5 text-xs font-medium text-[#075E54] shadow-sm transition hover:bg-[#25D366]/8 hover:border-[#25D366]/60"
              >
                <span>{q.label}</span>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#25D366]" />
              </a>
            ))}
          </div>

          {/* Main CTA */}
          <div className="bg-white px-4 py-3">
            <a
              href={waLink("Hi The Madhu's Kitchen! I'm interested in your catering services. Can we chat?")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-2.5 text-sm font-semibold text-white transition hover:bg-[#1ebe5d]"
            >
              <MessageCircle className="h-4 w-4" />
              Open WhatsApp Chat
            </a>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-transform duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        {!open && (
          <span className="absolute h-16 w-16 animate-ping rounded-full bg-[#25D366]/40" />
        )}
        {open
          ? <X className="relative h-7 w-7" />
          : <MessageCircle className="relative h-8 w-8" />
        }
      </button>
    </div>
  )
}
