import { Router } from 'express'
import {
  createBooking,
  listBookings,
  updateBookingStatus,
} from '../controllers/bookingController.js'
import { requireAdmin } from '../middleware/auth.js'

const router = Router()

router.post('/', createBooking)
router.get('/', requireAdmin, listBookings)
router.patch('/:id', requireAdmin, updateBookingStatus)

export default router
