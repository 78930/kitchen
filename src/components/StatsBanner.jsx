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
  { icon: Award, value: 15, suffix: '+', label: 'Years Hands-On Experience' },
  { icon: Users, value: 5, suffix: 'K+', label: 'Happy Clients Served' },
  { icon: Sparkles, value: 100, suffix: '%', label: 'Immaculate Hygiene Standards' },
]

export default function StatsBanner() {
  const ref = useRef(null)
  const [run, setRun] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true)
          obs.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative z-10 bg-emerald text-white">
      <div className="container-x grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {STATS.map((s) => (
          <Stat key={s.label} {...s} run={run} />
        ))}
      </div>
    </section>
  )
}

function Stat({ icon: Icon, value, suffix, label, run }) {
  const count = useCountUp(value, run)
  return (
    <div className="flex items-center justify-center gap-4 px-6 py-10 text-center sm:flex-col sm:gap-3">
      <Icon className="h-9 w-9 shrink-0 text-gold" />
      <div className="text-left sm:text-center">
        <div className="font-serif text-4xl font-bold text-gold sm:text-5xl">
          {count}
          <span>{suffix}</span>
        </div>
        <p className="mt-1 text-sm font-medium uppercase tracking-wider text-white/75">{label}</p>
      </div>
    </div>
  )
}
