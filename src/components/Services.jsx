import { Heart, PartyPopper, Briefcase, Home } from 'lucide-react'

const SERVICES = [
  {
    icon: Heart,
    title: 'Wedding & Reception',
    text: 'Grand royal feasts handled with flawless precision and heartfelt care.',
    accent: 'from-rose-500/20 to-gold/10',
  },
  {
    icon: PartyPopper,
    title: 'Engagement & Birthdays',
    text: 'Delightful curated menus that celebrate your most precious milestones.',
    accent: 'from-gold/20 to-amber-400/10',
  },
  {
    icon: Briefcase,
    title: 'Corporate Events',
    text: 'Professional setups designed to impress your clients and leadership teams.',
    accent: 'from-blue-500/15 to-gold/10',
  },
  {
    icon: Home,
    title: 'Housewarming & Parties',
    text: 'Traditional flavors perfectly matched to intimate home celebrations.',
    accent: 'from-emerald-500/15 to-gold/10',
  },
]

export default function Services() {
  return (
    <section id="services" className="section bg-cream">
      <div className="container-x">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">What We Do</p>
          <h2 className="mt-3 text-4xl font-semibold text-emerald-deep sm:text-5xl">
            Services for Every Occasion
          </h2>
          <div className="gold-rule mx-auto mt-6 w-24" />
          <p className="mt-5 text-sm leading-relaxed text-emerald-deep/60">
            From intimate family gatherings to grand banquets — we bring royal flavors to every table.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="card-lift group relative overflow-hidden rounded-2xl border border-emerald/10 bg-white p-7 shadow-card"
            >
              {/* Gradient background blob */}
              <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${s.accent} blur-2xl transition-transform duration-500 group-hover:scale-150`} />

              <div className="relative">
                {/* Icon */}
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/20 to-gold/5 text-gold-dark transition-all duration-300 group-hover:border-gold/50 group-hover:bg-gradient-to-br group-hover:from-gold/30 group-hover:to-gold/10 group-hover:shadow-[0_0_20px_rgba(243,185,66,0.25)]">
                  <s.icon className="h-6 w-6" />
                </span>

                {/* Number */}
                <span className="absolute right-0 top-0 font-serif text-5xl font-bold text-emerald/5 select-none">
                  {String(SERVICES.indexOf(s) + 1).padStart(2, '0')}
                </span>

                <h3 className="mt-5 font-serif text-lg font-semibold leading-snug text-emerald-deep">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-emerald-deep/60">{s.text}</p>

                {/* Gold underline on hover */}
                <div className="mt-5 h-0.5 w-0 rounded-full bg-gradient-to-r from-gold to-gold-light transition-all duration-500 group-hover:w-full" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
