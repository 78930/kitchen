import { useEffect, useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

const WA_LINK =
  "https://wa.me/916303644615?text=Hi%20The%20Madhu's%20Kitchen,%20I%20am%20interested%20in%20booking%20a%20catering%20package..."

export default function WhatsAppWidget() {
  const [showTip, setShowTip] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowTip(true), 2600)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-[110] flex flex-col items-end gap-3">
      {showTip && (
        <div className="animate-floatIn relative max-w-[230px] rounded-2xl rounded-br-sm bg-white px-4 py-3 text-sm text-emerald-deep shadow-cardHover">
          <button
            onClick={() => setShowTip(false)}
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald text-white shadow"
            aria-label="Dismiss"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          Hi! Need catering help? Let&apos;s chat 👋
        </div>
      )}

      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setShowTip(false)}
        className="group flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-cardHover transition-transform duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute h-16 w-16 animate-ping rounded-full bg-[#25D366]/40" />
        <MessageCircle className="relative h-8 w-8" />
      </a>
    </div>
  )
}
