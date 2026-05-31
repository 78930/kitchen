import { useState } from 'react'
import { Info, UtensilsCrossed } from 'lucide-react'
import { menuCategories } from '../data/menu'

export default function MenuExplorer() {
  const [active, setActive] = useState(menuCategories[0].id)
  const current = menuCategories.find((c) => c.id === active)

  return (
    <section id="menu" className="section bg-white">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Crafted With Love</p>
          <h2 className="mt-3 text-4xl font-semibold text-emerald-deep sm:text-5xl">
            Our Royal Menus
          </h2>
          <div className="gold-rule mx-auto mt-6 w-24" />
          <div className="mx-auto mt-6 flex max-w-2xl items-start gap-3 rounded-xl border border-gold/40 bg-gold/10 px-5 py-4 text-left">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" />
            <p className="text-sm text-emerald-deep/80">
              <span className="font-semibold">Note:</span> Cleaning staff and crockery are subject
              to packages. Transport charges extra.
            </p>
          </div>
        </div>

        {/* Sticky scrollable tab bar */}
        <div className="sticky top-20 z-40 mt-10 -mx-5 bg-white/85 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8">
          <div className="no-scrollbar flex gap-2.5 overflow-x-auto pb-1">
            {menuCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  active === c.id
                    ? 'border-emerald bg-emerald text-gold shadow-card'
                    : 'border-emerald/15 bg-cream text-emerald-deep/70 hover:border-emerald/40 hover:text-emerald'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active category */}
        <div key={current.id} className="mt-8 animate-fadeUp">
          <p className="mb-8 text-center text-base italic text-emerald-deep/70">{current.blurb}</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {current.groups.map((g) => (
              <article
                key={g.title}
                className="card-lift rounded-2xl border border-emerald/10 bg-cream/60 p-6 shadow-card"
              >
                <div className="flex items-center gap-2.5">
                  <UtensilsCrossed className="h-5 w-5 text-gold-dark" />
                  <h3 className="font-serif text-lg font-semibold text-emerald-deep">{g.title}</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="cursor-default rounded-full border border-emerald/10 bg-white px-3.5 py-1.5 text-sm text-emerald-deep/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10 hover:text-emerald-deep hover:shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
