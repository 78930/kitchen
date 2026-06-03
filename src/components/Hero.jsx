import { UtensilsCrossed, CalendarHeart, ChevronDown, Star } from 'lucide-react'

const HERO_IMG =
  'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1920&q=80'

export default function Hero({ onBook }) {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-black">
      {/* Background layers */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Premium catering spread"
          className="h-full w-full object-cover opacity-45"
          loading="eager"
        />
        {/* Bottom-heavy gradient fade to black */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
        {/* Top fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
        {/* Gold ambient glow from center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_60%,rgba(243,185,66,0.07),transparent)]" />
      </div>

      {/* Content */}
      <div className="container-x relative z-10 py-36 text-center">
        {/* Eyebrow with flanking lines */}
        <div className="flex animate-fadeUp items-center justify-center gap-4">
          <span className="h-px w-10 bg-gold/50" />
          <p className="eyebrow text-gold tracking-[0.32em]">Est. 2014 · Hyderabad</p>
          <span className="h-px w-10 bg-gold/50" />
        </div>

        {/* Main heading */}
        <h1
          className="mt-5 animate-fadeUp font-serif font-bold leading-[1.05] text-white"
          style={{ animationDelay: '0.08s', fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}
        >
          The Madhu's{' '}
          <span className="text-gold drop-shadow-[0_0_32px_rgba(243,185,66,0.4)]">Kitchen</span>
        </h1>

        {/* Tagline */}
        <p
          className="mx-auto mt-5 max-w-2xl animate-fadeUp font-serif text-xl italic text-white/75 sm:text-2xl"
          style={{ animationDelay: '0.16s' }}
        >
          Where Every Plate Tells a Story of a Tasty Soul
        </p>

        {/* Gold divider */}
        <div
          className="gold-rule mx-auto mt-7 animate-fadeUp"
          style={{ animationDelay: '0.20s', width: '120px' }}
        />

        {/* Description */}
        <p
          className="mx-auto mt-6 max-w-xl animate-fadeUp text-sm leading-relaxed text-white/55 sm:text-base"
          style={{ animationDelay: '0.24s' }}
        >
          Premium Nizami &amp; multi-cuisine catering for weddings, corporate events, and
          celebrations — crafted with passion and royal precision.
        </p>

        {/* CTA buttons */}
        <div
          className="mt-9 flex animate-fadeUp flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ animationDelay: '0.32s' }}
        >
          <a href="#menu" className="btn-gold w-full px-8 py-3.5 text-base sm:w-auto">
            <UtensilsCrossed className="h-4 w-4" />
            Explore Menu
          </a>
          <button onClick={onBook} className="btn-ghost w-full px-8 py-3.5 text-base sm:w-auto">
            <CalendarHeart className="h-4 w-4" />
            Book An Event
          </button>
        </div>

        {/* Trust indicators */}
        <div
          className="mt-12 flex animate-fadeUp flex-wrap items-center justify-center gap-3 sm:gap-6"
          style={{ animationDelay: '0.42s' }}
        >
          {[
            { value: '15+', label: 'Years Legacy' },
            { value: '5K+', label: 'Events Catered' },
            { value: '100%', label: 'Hygiene Standard' },
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <Star className="h-3 w-3 text-gold" fill="currentColor" />
              <span className="font-semibold text-gold text-sm">{t.value}</span>
              <span className="text-white/50 text-xs">{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#services"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/40 transition hover:text-gold"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8 animate-bounce" />
      </a>
    </section>
  )
}
