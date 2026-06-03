import { useEffect, useRef, useState } from 'react'
import { Award, Users, Sparkles } from 'lucide-react'

function useCountUp(target, run, duration = 1600) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, target, duration])
  return value
}

const STATS = [
  { icon: Award,    value: 15,  suffix: '+',  label: 'Years Hands-On Experience' },
  { icon: Users,    value: 5,   suffix: 'K+', label: 'Happy Clients Served' },
  { icon: Sparkles, value: 100, suffix: '%',  label: 'Immaculate Hygiene Standards' },
]

export default function StatsBanner() {
  const ref = useRef(null)
  const [run, setRun] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRun(true); obs.disconnect() } },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative z-10 overflow-hidden bg-black">
      {/* Subtle gold top border */}
      <div className="gold-rule" />
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_100%_at_50%_50%,rgba(243,185,66,0.05),transparent)]" />

      <div className="container-x grid grid-cols-1 divide-y divide-white/8 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {STATS.map((s) => (
          <Stat key={s.label} {...s} run={run} />
        ))}
      </div>

      <div className="gold-rule" />
    </section>
  )
}

function Stat({ icon: Icon, value, suffix, label, run }) {
  const count = useCountUp(value, run)
  return (
    <div className="group flex items-center justify-center gap-4 px-8 py-12 text-center transition-all duration-300 hover:bg-white/3 sm:flex-col sm:gap-4">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10 transition-all duration-300 group-hover:border-gold/40 group-hover:bg-gold/15">
        <Icon className="h-7 w-7 text-gold" />
      </span>
      <div className="text-left sm:text-center">
        <div className="font-serif text-4xl font-bold text-gold sm:text-5xl">
          {count}<span>{suffix}</span>
        </div>
        <p className="mt-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">{label}</p>
      </div>
    </div>
  )
}
