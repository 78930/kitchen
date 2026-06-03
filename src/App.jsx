import { useEffect, useState } from 'react'
import { ToastProvider } from './components/Toast'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBanner from './components/StatsBanner'
import Services from './components/Services'
import MenuExplorer from './components/MenuExplorer'
import Tiers from './components/Tiers'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import WhatsAppWidget from './components/WhatsAppWidget'
import BookingWizard from './components/BookingWizard'
import AdminDashboard from './components/AdminDashboard'

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return hash
}

export default function App() {
  const hash = useHashRoute()
  const isAdmin = hash === '#admin'

  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingInitial, setBookingInitial] = useState(null)

  const openBooking = (initial) => {
    setBookingInitial(initial && initial.tier ? initial : null)
    setBookingOpen(true)
  }

  const exitAdmin = () => {
    window.location.hash = ''
  }

  if (isAdmin) {
    return (
      <ToastProvider>
        <AdminDashboard onExit={exitAdmin} />
      </ToastProvider>
    )
  }

  return (
    <ToastProvider>
      <Navbar onBook={() => openBooking()} />
      <main>
        <Hero onBook={() => openBooking()} />
        <StatsBanner />
        <Services />
        <MenuExplorer />
        <Tiers onBook={openBooking} />
        <About />
        <Testimonials />
      </main>
      <Footer onBook={() => openBooking()} />

      <WhatsAppWidget />
      <BookingWizard
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initial={bookingInitial}
      />
    </ToastProvider>
  )
}
