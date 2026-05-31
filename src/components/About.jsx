import { Quote } from 'lucide-react'

const FOUNDER_IMG =
  'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80'

export default function About() {
  return (
    <section id="about" className="section bg-cream">
      <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Image */}
        <div className="relative">
          <div className="absolute -left-4 -top-4 h-full w-full rounded-3xl border-2 border-gold/50" />
          <img
            src={FOUNDER_IMG}
            alt="The founder and master chef of The Madhu's Kitchen"
            className="relative z-10 aspect-[4/5] w-full rounded-3xl object-cover shadow-cardHover"
            loading="lazy"
          />
          <div className="absolute -bottom-6 -right-6 z-20 hidden rounded-2xl bg-emerald px-6 py-5 text-center text-white shadow-gold sm:block">
            <div className="font-serif text-3xl font-bold text-gold">15+</div>
            <div className="text-xs uppercase tracking-wider text-white/80">Years Legacy</div>
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="eyebrow">The Visionary — Meet Our Founder</p>
          <h2 className="mt-3 text-4xl font-semibold text-emerald-deep sm:text-5xl">
            A Legacy of Royal Flavors
          </h2>

          <blockquote className="mt-7 flex gap-4 rounded-2xl border-l-4 border-gold bg-white p-6 shadow-card">
            <Quote className="h-8 w-8 shrink-0 text-gold" />
            <p className="font-serif text-2xl italic leading-snug text-emerald-deep">
              Excellence is not a skill, it is an attitude.
            </p>
          </blockquote>

          <p className="mt-6 leading-relaxed text-emerald-deep/75">
            For over fifteen years, The Madhu's Kitchen has carried forward a proud legacy of bringing
            authentic Nizami and multi-cuisine flavors to the heart of Hyderabad. What began as a
            passion for royal kitchen recipes has grown into one of the city's most trusted names in
            premium catering.
          </p>
          <p className="mt-4 leading-relaxed text-emerald-deep/75">
            Every event is crafted with uncompromised quality — from the freshness of ingredients to
            the immaculate presentation at your table. We don't just serve food; we curate
            unforgettable experiences that honor your most precious celebrations.
          </p>
        </div>
      </div>
    </section>
  )
}
