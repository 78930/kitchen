import Booking from '../models/Booking.js'
import { validateBooking } from '../middleware/validate.js'
import { sendBookingEmails } from '../utils/mailer.js'

// POST /api/bookings
export async function createBooking(req, res) {
  const { valid, fields, data } = validateBooking(req.body || {})
  if (!valid) {
    return res.status(422).json({ message: 'Please correct the highlighted fields.', fields })
  }

  try {
    const booking = await Booking.create(data)

    // Fire confirmation emails without blocking the response on failure.
    sendBookingEmails(booking.toObject()).catch((e) =>
      console.error('Booking email error:', e.message),
    )

    return res.status(201).json({
      message: 'Booking received. A confirmation email is on its way.',
      booking: { id: booking._id, status: booking.status },
    })
  } catch (err) {
    console.error('createBooking error:', err)
    return res.status(500).json({ message: 'Could not save your booking. Please try again.' })
  }
}

// GET /api/bookings?status=PENDING   (admin only)
export async function listBookings(req, res) {
  try {
    const query = {}
    const status = String(req.query.status || '').toUpperCase()
    if (['PENDING', 'CONFIRMED', 'CANCELLED'].includes(status)) query.status = status

    const bookings = await Booking.find(query).sort({ created_at: -1 }).limit(500).lean()
    return res.json({ count: bookings.length, bookings })
  } catch (err) {
    console.error('listBookings error:', err)
    return res.status(500).json({ message: 'Could not load bookings.' })
  }
}

// PATCH /api/bookings/:id   (admin only)
export async function updateBookingStatus(req, res) {
  const { id } = req.params
  const status = String(req.body?.status || '').toUpperCase()
  if (!['PENDING', 'CONFIRMED', 'CANCELLED'].includes(status)) {
    return res.status(422).json({ message: 'Invalid status value.' })
  }
  try {
    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true }).lean()
    if (!booking) return res.status(404).json({ message: 'Booking not found.' })
    return res.json({ message: `Booking marked ${status}.`, booking })
  } catch (err) {
    console.error('updateBookingStatus error:', err)
    return res.status(500).json({ message: 'Could not update the booking.' })
  }
}
