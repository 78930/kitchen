import ContactMessage from '../models/ContactMessage.js'
import { validateContact } from '../middleware/validate.js'
import { sendContactEmails } from '../utils/mailer.js'
import { sendWhatsAppAlert } from '../utils/whatsapp.js'

// POST /api/contact
export async function createContact(req, res) {
  const { valid, fields, data } = validateContact(req.body || {})
  if (!valid) {
    return res.status(422).json({ message: 'Please correct the highlighted fields.', fields })
  }

  try {
    const msg = await ContactMessage.create(data)
    const c = msg.toObject()

    sendContactEmails(c).catch((e) => console.error('Contact email error:', e.message))
    sendWhatsAppAlert(
      `📩 New Enquiry!\n` +
      `Name: ${c.name}\n` +
      `Email: ${c.email}\n` +
      `Phone: ${c.phone || '—'}\n` +
      `Message: ${c.message.slice(0, 120)}`
    ).catch(() => {})
    return res.status(201).json({ message: 'Message received. We will be in touch soon.' })
  } catch (err) {
    console.error('createContact error:', err)
    return res.status(500).json({ message: 'Could not send your message. Please try again.' })
  }
}
