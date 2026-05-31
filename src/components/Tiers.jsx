import { useState } from 'react'
import { Check, Crown, Star, Gem, Sparkles, Leaf, Drumstick } from 'lucide-react'
import { tiers } from '../data/tiers'

const ICONS = { silver: Star, gold: Crown, diamond: Gem, platinum: Sparkles }

export default function Tiers({ onBook }) {
  const [diet, setDiet] = useState('veg') // 'veg' | 'nonveg'

  return (
    <section id="tiers" className="section bg-emerald-deep text-white">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold">Choose Your Experience</p>
          <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
            Premium Service Tiers
          </h2>
          <div className="gold-rule mx-auto mt-6 w-24" />
        </div>

        {/* Diet toggle */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur">
            <ToggleBtn active={diet === 'veg'} onClick={() => setDiet('veg')} icon={Leaf}>
              Vegetarian
            </ToggleBtn>
            <ToggleBtn active={diet === 'nonveg'} onClick={() => setDiet('nonveg')} icon={Drumstick}>
              Non-Vegetarian
            </ToggleBtn>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {tiers.map((t) => {
            const Icon = ICONS[t.id]
            const items = t.items[diet]
            return (
              <article
                key={t.id}
                className={`card-lift relative flex flex-col rounded-3xl p-7 transition-all duration-300 ${
                  t.popular
                    ? 'bg-white text-emerald-deep ring-2 ring-gold shadow-gold md:-translate-y-3'
                    : 'border border-white/12 bg-white/5 text-white backdrop-blur'
                }`}
              >
                {t.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold uppercase tracking-wider text-emerald shadow-gold">
                    Popular
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      t.popular ? 'bg-emerald text-gold' : 'bg-gold/15 text-gold'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-bold leading-none">{t.name}</h3>
                    <p
                      className={`mt-1 text-xs font-medium uppercase tracking-wider ${
                        t.popular ? 'text-gold-dark' : 'text-gold'
                      }`}
                    >
                      {t.tagline}
                    </p>
                  </div>
                </div>

                <div
                  className={`mt-5 flex flex-wrap gap-1.5 border-t pt-4 ${
                    t.popular ? 'border-emerald/10' : 'border-white/10'
                  }`}
                >
                  {t.highlights.map((h) => (
                    <span
                      key={h}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        t.popular ? 'bg-emerald/8 text-emerald-deep' : 'bg-white/10 text-white/90'
                      }`}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          t.popular ? 'text-emerald-soft' : 'text-gold'
                        }`}
                      />
                      <span className={t.popular ? 'text-emerald-deep/80' : 'text-white/80'}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onBook({ tier: t.name, diet })}
                  className={`mt-7 w-full ${t.popular ? 'btn-emerald' : 'btn-gold'}`}
                >
                  Select {t.name}
                </button>
              </article>
            )
          })}
        </div>

        <p className="mt-8 text-center text-sm text-white/60">
          Per-plate pricing is tailored to guest count, menu and venue. Select a tier to request a
          custom quote.
        </p>
      </div>
    </section>
  )
}

function ToggleBtn({ active, onClick, icon: Icon, children }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
        active ? 'bg-gold text-emerald shadow-gold' : 'text-white/70 hover:text-white'
      }`}
    >
      <Icon className="h-4 w-4" />
      {children}
    </button>
  )
}
