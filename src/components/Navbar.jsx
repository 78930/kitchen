import { useEffect, useState } from 'react'
import { Menu, X, CalendarHeart } from 'lucide-react'
import Logo from './Logo'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Premium Plans', href: '#tiers' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ onBook }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
        scrolled
          ? 'bg-emerald-deep/90 shadow-lg shadow-emerald-deep/20 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-20 items-center justify-between">
        {/* Brand */}
        <a href="#home" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo size={44} />
          <span className="leading-tight">
            <span className="block font-serif text-xl font-semibold text-white">The Madhu's Kitchen</span>
          </span>
        </a>

        {/* Center links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-sm font-medium text-white/85 transition hover:text-gold after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button onClick={onBook} className="btn-gold hidden sm:inline-flex">
            <CalendarHeart className="h-4 w-4" />
            Book Event
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 text-white transition hover:bg-white/10 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden">
          <div className="animate-floatIn border-t border-white/10 bg-emerald-deep/95 backdrop-blur-xl">
            <ul className="container-x flex flex-col gap-1 py-4">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-white/90 transition hover:bg-white/10 hover:text-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="px-2 pt-2">
                <button
                  onClick={() => {
                    setOpen(false)
                    onBook()
                  }}
                  className="btn-gold w-full"
                >
                  <CalendarHeart className="h-4 w-4" />
                  Book Event
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}
