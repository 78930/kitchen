import { UtensilsCrossed, CalendarHeart, ChevronDown } from 'lucide-react'

const HERO_IMG =
  'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1920&q=80'

export default function Hero({ onBook }) {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Premium catering spread"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep/80 via-emerald-deep/70 to-emerald-deep/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(243,185,66,0.16),transparent_55%)]" />
      </div>

      {/* Content */}
      <div className="container-x relative z-10 py-28 text-center">
        <p className="eyebrow animate-fadeUp text-gold">Welcome </p>
        <h1
          className="mt-4 animate-fadeUp font-serif text-6xl font-bold leading-none text-white sm:text-7xl md:text-8xl"
          style={{ animationDelay: '0.08s' }}
        >
          The Madhu's Kitchen
        </h1>
        <p
          className="mx-auto mt-5 max-w-2xl animate-fadeUp font-serif text-2xl italic text-gold-light sm:text-3xl"
          style={{ animationDelay: '0.16s' }}
        >
          Where Every Plate Tells a Story of a Tasty Soul
        </p>
        <p
          className="mx-auto mt-6 max-w-2xl animate-fadeUp text-base leading-relaxed text-white/80 sm:text-lg"
          style={{ animationDelay: '0.24s' }}
        >
          Experience the epitome of catering excellence since 2014. We blend traditional recipes
          from royal kitchens with modern global culinary standards.
        </p>

        <div
          className="mt-10 flex animate-fadeUp flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ animationDelay: '0.32s' }}
        >
          <a href="#menu" className="btn-gold w-full sm:w-auto">
            <UtensilsCrossed className="h-4 w-4" />
            Explore Menu
          </a>
          <button onClick={onBook} className="btn-ghost w-full sm:w-auto">
            <CalendarHeart className="h-4 w-4" />
            Book An Event
          </button>
        </div>
      </div>

      <a
        href="#services"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70 transition hover:text-gold"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8 animate-bounce" />
      </a>
    </section>
  )
}
