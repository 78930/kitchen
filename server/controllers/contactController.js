import ContactMessage from '../models/ContactMessage.js'
import { validateContact } from '../middleware/validate.js'
import { sendContactEmails } from '../utils/mailer.js'

// POST /api/contact
export async function createContact(req, res) {
  const { valid, fields, data } = validateContact(req.body || {})
  if (!valid) {
    return res.status(422).json({ message: 'Please correct the highlighted fields.', fields })
  }

  try {
    const msg = await ContactMessage.create(data)
    sendContactEmails(msg.toObject()).catch((e) =>
      console.error('Contact email error:', e.message),
    )
    return res.status(201).json({ message: 'Message received. We will be in touch soon.' })
  } catch (err) {
    console.error('createContact error:', err)
    return res.status(500).json({ message: 'Could not send your message. Please try again.' })
  }
}
