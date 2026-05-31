import { Heart, PartyPopper, Briefcase, Home } from 'lucide-react'

const SERVICES = [
  {
    icon: Heart,
    title: 'Wedding & Reception Catering',
    text: 'Grand royal feasts handled with flawless precision.',
  },
  {
    icon: PartyPopper,
    title: 'Engagement & Birthdays',
    text: 'Delightful curated menus that celebrate major milestones.',
  },
  {
    icon: Briefcase,
    title: 'Corporate Events',
    text: 'Professional setups to impress your key clients and corporate teams.',
  },
  {
    icon: Home,
    title: 'Housewarming & Private Parties',
    text: 'Traditional flavors perfectly matched to your intimate home beginnings.',
  },
]

export default function Services() {
  return (
    <section id="services" className="section bg-cream">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">What We Do</p>
          <h2 className="mt-3 text-4xl font-semibold text-emerald-deep sm:text-5xl">
            Services We Offer For Every Occasion
          </h2>
          <div className="gold-rule mx-auto mt-6 w-24" />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="card-lift group relative overflow-hidden rounded-2xl border border-emerald/10 bg-white p-7 shadow-card"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/10 transition-transform duration-500 group-hover:scale-150" />
              <div className="relative">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-emerald">
                  <s.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold text-emerald-deep">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-emerald-deep/70">{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
