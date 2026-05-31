import { useState } from 'react'
import {
  MapPin, Phone, Mail, Send, Instagram, Facebook, Youtube, CalendarHeart,
} from 'lucide-react'
import { api } from '../lib/api'
import { useToast } from './Toast'
import Logo from './Logo'
import Spinner from './Spinner'

const EXPLORE = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Premium Plans', href: '#tiers' },
  { label: 'About', href: '#about' },
]
const SERVICES = [
  'Wedding & Reception',
  'Engagement & Birthdays',
  'Corporate Events',
  'Housewarming Parties',
]

export default function Footer({ onBook }) {
  const toast = useToast()
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [news, setNews] = useState('')
  const [newsLoading, setNewsLoading] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in your name, email and message.')
      return
    }
    setLoading(true)
    try {
      await api.createContact(form)
      toast.success("Message sent! Our team will reach out to you shortly.")
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      toast.error(err.message || 'Could not send your message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const subscribe = async (e) => {
    e.preventDefault()
    if (!news.trim()) return
    setNewsLoading(true)
    try {
      await api.createContact({
        name: 'Newsletter Subscriber',
        email: news,
        message: 'Newsletter subscription request.',
      })
      toast.success('Subscribed! Watch your inbox for royal updates.')
      setNews('')
    } catch (err) {
      toast.error(err.message || 'Subscription failed. Please try again.')
    } finally {
      setNewsLoading(false)
    }
  }

  return (
    <footer id="contact" className="bg-emerald-deep text-white">
      {/* CTA + contact form */}
      <div className="section">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow text-gold">Get In Touch</p>
            <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
              Ready to Start? Let&apos;s Make Your Event Special.
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-white/75">
              Tell us about your celebration and our team will craft a bespoke menu and quote
              tailored to your guests, venue and budget.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <a href="tel:+916303644615" className="flex items-start gap-3 text-white/85 transition hover:text-gold">
                <Phone className="mt-0.5 h-5 w-5 text-gold" />
                <span>+91 63036 44615</span>
              </a>
              <a href="mailto:sa.hyderabadcaterers@gmail.com" className="flex items-start gap-3 text-white/85 transition hover:text-gold">
                <Mail className="mt-0.5 h-5 w-5 text-gold" />
                <span>sa.hyderabadcaterers@gmail.com</span>
              </a>
              <p className="flex items-start gap-3 text-white/85">
                <MapPin className="mt-0.5 h-5 w-5 text-gold" />
                <span>Plot No. 4, RTC Colony, Tirumalgherry, Secunderabad — 500015</span>
              </p>
            </div>

            <button onClick={onBook} className="btn-gold mt-8">
              <CalendarHeart className="h-4 w-4" />
              Book Your Event
            </button>
          </div>

          {/* Contact form */}
          <form
            onSubmit={submit}
            className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur"
          >
            <h3 className="font-serif text-2xl font-semibold text-white">Send Us a Message</h3>
            <div className="mt-5 space-y-4">
              <Field label="Full Name" value={form.name} onChange={set('name')} placeholder="Your name" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Email" type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" />
                <Field label="Phone" type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 ..." />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={set('message')}
                  rows={4}
                  placeholder="Tell us about your event..."
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-gold focus:bg-white/15"
                />
              </div>
              <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-70">
                {loading ? <Spinner label="Sending..." /> : <><Send className="h-4 w-4" /> Send Message</>}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Multi-column footer */}
      <div className="border-t border-white/10">
        <div className="container-x grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <Logo size={44} />
              <span>
                <span className="block font-serif text-lg font-semibold">The Madhu's Kitchen</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Crafting royal Nizami &amp; multi-cuisine feasts in Hyderabad since 2014. Every plate, a
              story of a tasty soul.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-gold hover:bg-gold hover:text-emerald"
                  aria-label="Social link"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <FooterCol title="Explore">
            {EXPLORE.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-white/65 transition hover:text-gold">{l.label}</a>
              </li>
            ))}
          </FooterCol>

          {/* Services */}
          <FooterCol title="Services">
            {SERVICES.map((s) => (
              <li key={s}>
                <a href="#services" className="text-white/65 transition hover:text-gold">{s}</a>
              </li>
            ))}
          </FooterCol>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-gold">Get In Touch</h4>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Plot No. 4, RTC Colony, Tirumalgherry, Secunderabad — 500015
            </p>
            <p className="mt-2 text-sm text-white/65">+91 63036 44615</p>
            <p className="text-sm text-white/65">sa.hyderabadcaterers@gmail.com</p>

            <form onSubmit={subscribe} className="mt-5">
              <label className="text-xs font-semibold uppercase tracking-wider text-white/60">
                Newsletter
              </label>
              <div className="mt-2 flex overflow-hidden rounded-full border border-white/15 bg-white/10">
                <input
                  type="email"
                  value={news}
                  onChange={(e) => setNews(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none"
                />
                <button
                  type="submit"
                  disabled={newsLoading}
                  className="flex items-center justify-center bg-gold px-4 text-emerald transition hover:bg-gold-light disabled:opacity-70"
                  aria-label="Subscribe"
                >
                  {newsLoading ? <Spinner className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 py-6">
          <p className="container-x text-center text-xs text-white/50">
            © {new Date().getFullYear()} The Madhu's Kitchen. All rights reserved. Crafted with
            love in Hyderabad.
          </p>
        </div>
      </div>
    </footer>
  )
}

function Field({ label, type = 'text', value, onChange, placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/70">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-gold focus:bg-white/15"
      />
    </div>
  )
}

function FooterCol({ title, children }) {
  return (
    <div>
      <h4 className="font-serif text-lg font-semibold text-gold">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  )
}
