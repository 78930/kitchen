// Sends a WhatsApp message to the admin via CallMeBot.
// Setup: visit https://www.callmebot.com/blog/free-api-whatsapp-messages/
// and send the activation message from your WhatsApp to get your API key.

const PHONE   = (process.env.WHATSAPP_NOTIFY_PHONE || '').replace(/\D/g, '')
const APIKEY  = process.env.CALLMEBOT_APIKEY || ''

export async function sendWhatsAppAlert(text) {
  if (!PHONE || !APIKEY) return

  const url =
    `https://api.callmebot.com/whatsapp.php` +
    `?phone=${PHONE}&text=${encodeURIComponent(text)}&apikey=${APIKEY}`

  try {
    await fetch(url)
  } catch (err) {
    console.error('WhatsApp alert error:', err.message)
  }
}
