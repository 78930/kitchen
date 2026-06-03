import { Quote, Star } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Priya Reddy',
    event: 'Wedding Reception',
    location: 'Secunderabad',
    rating: 5,
    text: 'The Madhu\'s Kitchen turned our wedding into an absolute dream. Every dish — from the Mutton Biryani to the dessert spread — was exquisite. Guests are still talking about the food three months later!',
    avatar: 'PR',
    color: 'from-rose-400 to-pink-600',
  },
  {
    name: 'Ravi Kumar',
    event: 'Corporate Annual Dinner',
    location: 'Banjara Hills',
    rating: 5,
    text: 'We hired them for our company\'s annual event with 300+ guests. The setup was impeccable, the food was served hot and on time, and our executives were thoroughly impressed. Will book again without hesitation.',
    avatar: 'RK',
    color: 'from-blue-400 to-indigo-600',
  },
  {
    name: 'Sunita Sharma',
    event: 'Engagement Ceremony',
    location: 'Jubilee Hills',
    rating: 5,
    text: 'From the first consultation to the last dish, the team was professional, warm, and talented. The paneer dishes and starters were incredible. Made our daughter\'s engagement truly special.',
    avatar: 'SS',
    color: 'from-amber-400 to-orange-600',
  },
  {
    name: 'Mohammed Farhan',
    event: 'Housewarming Party',
    location: 'Uppal, Hyderabad',
    rating: 5,
    text: 'Absolutely loved the authentic Nizami flavors. The Haleem and Biryani were outstanding — just like royal kitchen food. Everyone in my family was delighted. Highly recommend for any occasion.',
    avatar: 'MF',
    color: 'from-emerald-400 to-teal-600',
  },
  {
    name: 'Lakshmi Prasad',
    event: 'Birthday Celebration',
    location: 'Kukatpally',
    rating: 5,
    text: 'We had a surprise birthday party for 80 people and everything was flawless. The custom menu they crafted for us was perfect, and the presentation was beautiful. The team cleaned up without leaving a trace!',
    avatar: 'LP',
    color: 'from-purple-400 to-violet-600',
  },
  {
    name: 'Deepa Nair',
    event: 'Baby Shower',
    location: 'Madhapur',
    rating: 5,
    text: 'The team was so thoughtful with the menu — light, fresh, and perfect for a baby shower. The sweets were divine and the service was gentle and attentive throughout. A truly blessed experience.',
    avatar: 'DN',
    color: 'from-sky-400 to-cyan-600',
  },
]

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-gold text-gold" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="section bg-black overflow-hidden">
      <div className="container-x">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold">Customer Reviews</p>
          <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
            What Our Guests Say
          </h2>
          <div className="gold-rule mx-auto mt-6 w-24" />
          <p className="mt-5 text-sm leading-relaxed text-white/50">
            Over 5,000 happy families have trusted The Madhu's Kitchen for their most precious celebrations.
          </p>
        </div>

        {/* Overall rating bar */}
        <div className="mx-auto mt-10 flex max-w-sm flex-col items-center gap-2 rounded-2xl border border-gold/20 bg-white/5 px-8 py-5 backdrop-blur-sm">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-gold text-gold" />
            ))}
          </div>
          <p className="font-serif text-3xl font-bold text-gold">5.0 <span className="text-lg text-white/40 font-sans font-normal">/ 5.0</span></p>
          <p className="text-xs uppercase tracking-widest text-white/40">Based on 500+ reviews</p>
        </div>

        {/* Review grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <article
              key={r.name}
              className="group flex flex-col rounded-2xl border border-white/8 bg-white/5 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/25 hover:bg-white/8 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              {/* Quote icon */}
              <Quote className="h-7 w-7 text-gold/40 transition-colors duration-300 group-hover:text-gold/60" />

              {/* Review text */}
              <p className="mt-4 flex-1 text-sm leading-relaxed text-white/65 group-hover:text-white/75 transition-colors duration-300">
                "{r.text}"
              </p>

              {/* Stars */}
              <div className="mt-5">
                <Stars count={r.rating} />
              </div>

              {/* Author */}
              <div className="mt-4 flex items-center gap-3 border-t border-white/8 pt-4">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${r.color} text-xs font-bold text-white shadow-lg`}>
                  {r.avatar}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{r.name}</p>
                  <p className="text-xs text-white/40">{r.event} · {r.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <p className="mt-12 text-center text-sm text-white/35">
          Join thousands of happy families — <span className="text-gold cursor-pointer hover:underline">book your event today.</span>
        </p>
      </div>
    </section>
  )
}
