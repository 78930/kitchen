import { useState } from 'react'
import { Info, UtensilsCrossed, MessageCircle, X, ShoppingBag } from 'lucide-react'
import { menuCategories } from '../data/menu'
import WhatsAppOrderModal from './WhatsAppOrderModal'

const SEP = '|||'

export default function MenuExplorer() {
  const [active,    setActive]   = useState(menuCategories[0].id)
  const [selected,  setSelected] = useState(new Set())
  const [modalOpen, setModalOpen] = useState(false)

  const current = menuCategories.find((c) => c.id === active)

  const key   = (cat, group, item) => `${cat}${SEP}${group}${SEP}${item}`
  const isSel = (cat, group, item) => selected.has(key(cat, group, item))

  function toggle(cat, group, item) {
    setSelected((prev) => {
      const next = new Set(prev)
      const k = key(cat, group, item)
      next.has(k) ? next.delete(k) : next.add(k)
      return next
    })
  }

  return (
    <section id="menu" className="section bg-white">
      <div className="container-x">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Crafted With Love</p>
          <h2 className="mt-3 text-4xl font-semibold text-emerald-deep sm:text-5xl">Our Royal Menus</h2>
          <div className="gold-rule mx-auto mt-6 w-24" />

          {/* Steps */}
          <div className="mx-auto mt-6 flex flex-wrap justify-center gap-3">
            {[
              { n: '1', label: 'Browse & tick dishes' },
              { n: '2', label: 'Fill event details' },
              { n: '3', label: 'Send via WhatsApp' },
            ].map((s) => (
              <div key={s.n} className="flex items-center gap-2 rounded-full border border-gold/30 bg-gold/8 px-4 py-2 text-xs font-medium text-emerald-deep/80">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-black">{s.n}</span>
                {s.label}
              </div>
            ))}
          </div>

          <div className="mx-auto mt-5 flex max-w-2xl items-start gap-3 rounded-xl border border-gold/40 bg-gold/10 px-5 py-4 text-left">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" />
            <p className="text-sm text-emerald-deep/80">
              <span className="font-semibold">Note:</span> Cleaning staff and crockery are subject to packages. Transport charges extra.
            </p>
          </div>
        </div>

        {/* Sticky category tab bar */}
        <div className="sticky top-20 z-40 mt-10 -mx-5 bg-white/95 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8">
          <div className="no-scrollbar flex gap-2.5 overflow-x-auto pb-1">
            {menuCategories.map((c) => {
              const cnt = [...selected].filter((k) => k.startsWith(c.label + SEP)).length
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`relative shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    active === c.id
                      ? 'border-emerald bg-emerald text-gold shadow-card'
                      : 'border-emerald/15 bg-cream text-emerald-deep/70 hover:border-emerald/40 hover:text-emerald'
                  }`}
                >
                  {c.label}
                  {cnt > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#25D366] text-[10px] font-bold text-white shadow">
                      {cnt}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Active category content */}
        <div key={current.id} className="mt-8 animate-fadeUp">
          <p className="mb-8 text-center text-base italic text-emerald-deep/60">{current.blurb}</p>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {current.groups.map((g) => (
              <article
                key={g.title}
                className="rounded-2xl border border-emerald/10 bg-white shadow-card overflow-hidden"
              >
                {/* Card header */}
                <div className="flex items-center gap-3 border-b border-emerald/8 bg-cream/60 px-5 py-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold/15">
                    <UtensilsCrossed className="h-4.5 w-4.5 text-gold-dark" />
                  </span>
                  <h3 className="font-serif text-base font-semibold text-emerald-deep leading-tight">{g.title}</h3>
                </div>

                {/* Checkbox list */}
                <ul className="divide-y divide-gray-50 px-1 py-1">
                  {g.items.map((item) => {
                    const sel = isSel(current.label, g.title, item)
                    return (
                      <li key={item}>
                        <button
                          onClick={() => toggle(current.label, g.title, item)}
                          className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm transition-all duration-150 ${
                            sel
                              ? 'bg-[#25D366]/8 text-emerald-deep font-medium'
                              : 'text-emerald-deep/75 hover:bg-gray-50'
                          }`}
                        >
                          {/* Custom checkbox */}
                          <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all duration-150 ${
                            sel
                              ? 'border-[#25D366] bg-[#25D366]'
                              : 'border-gray-300 bg-white'
                          }`}>
                            {sel && (
                              <svg className="h-3 w-3 text-white" viewBox="0 0 12 10" fill="none">
                                <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          <span className="flex-1">{item}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </article>
            ))}
          </div>
        </div>

        {selected.size > 0 && <div className="h-24" />}
      </div>

      {/* ── Sticky bottom order bar ── */}
      {selected.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-floatIn border-t border-white/10 bg-[#075E54] px-4 py-3.5 shadow-[0_-8px_32px_rgba(0,0,0,0.4)]">
          <div className="container-x flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-sm font-bold text-white shadow">
                {selected.size}
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Your Selection</p>
                <p className="text-xs text-white/60">Ready to customise your menu?</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelected(new Set())}
                className="flex h-9 items-center gap-1.5 rounded-full border border-white/25 px-3 text-xs font-semibold text-white/80 transition hover:border-white/50 hover:text-white"
              >
                <X className="h-3.5 w-3.5" /> Clear
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-[#1ebe5d] active:scale-95"
              >
                <MessageCircle className="h-4 w-4" />
                Enquire via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      <WhatsAppOrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        selected={selected}
        onClearSelection={() => setSelected(new Set())}
      />
    </section>
  )
}
