import { Quote, CheckCircle2 } from 'lucide-react'

const FOUNDER_IMG =
  'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80'

const HIGHLIGHTS = [
  'Authentic Nizami royal recipes',
  'Fresh, sourced-daily ingredients',
  'Immaculate hygiene at every stage',
  'Bespoke menus for every event',
]

export default function About() {
  return (
    <section id="about" className="section bg-cream">
      <div className="container-x grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        {/* Image column */}
        <div className="relative">
          {/* Decorative border frame */}
          <div className="absolute -left-4 -top-4 h-full w-full rounded-3xl border-2 border-gold/40" />
          <img
            src={FOUNDER_IMG}
            alt="The founder and master chef of The Madhu's Kitchen"
            className="relative z-10 aspect-[4/5] w-full rounded-3xl object-cover shadow-cardHover"
            loading="lazy"
          />
          {/* Years badge */}
          <div className="absolute -bottom-6 -right-4 z-20 rounded-2xl bg-black px-6 py-5 text-center shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
            <div className="font-serif text-3xl font-bold text-gold">15+</div>
            <div className="mt-0.5 text-xs uppercase tracking-wider text-white/70">Years Legacy</div>
          </div>
          {/* Gold corner accent */}
          <div className="absolute -left-2 -top-2 z-20 h-8 w-8 rounded-tl-2xl border-l-2 border-t-2 border-gold" />
          <div className="absolute -bottom-2 -right-2 z-20 h-8 w-8 rounded-br-2xl border-b-2 border-r-2 border-gold" />
        </div>

        {/* Text column */}
        <div>
          <p className="eyebrow">The Visionary — Meet Our Founder</p>
          <h2 className="mt-3 text-4xl font-semibold text-emerald-deep sm:text-5xl">
            A Legacy of Royal Flavors
          </h2>
          <div className="gold-rule mt-6 w-20" />

          {/* Quote */}
          <blockquote className="mt-7 flex gap-4 rounded-2xl border border-gold/20 bg-white p-6 shadow-card">
            <Quote className="mt-1 h-7 w-7 shrink-0 text-gold" />
            <div>
              <p className="font-serif text-xl italic leading-snug text-emerald-deep">
                Excellence is not a skill, it is an attitude.
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-emerald-deep/40">
                — Founder, The Madhu's Kitchen
              </p>
            </div>
          </blockquote>

          <p className="mt-6 leading-relaxed text-emerald-deep/70">
            For over fifteen years, The Madhu's Kitchen has carried forward a proud legacy of bringing
            authentic Nizami and multi-cuisine flavors to the heart of Hyderabad. What began as a
            passion for royal kitchen recipes has grown into one of the city's most trusted names in
            premium catering.
          </p>

          {/* Highlights */}
          <ul className="mt-6 space-y-2.5">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-center gap-3 text-sm text-emerald-deep/80">
                <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-gold-dark" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
