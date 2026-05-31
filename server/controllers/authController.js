import { issueAdminToken } from '../middleware/auth.js'

// POST /api/admin/login
export async function adminLogin(req, res) {
  const provided = String(req.body?.password || '')
  const expected = process.env.ADMIN_PASSWORD

  if (!expected) {
    return res
      .status(500)
      .json({ message: 'Admin password is not configured on the server.' })
  }
  if (provided.length === 0 || provided !== expected) {
    return res.status(401).json({ message: 'Incorrect admin password.' })
  }

  const token = issueAdminToken()
  return res.json({ message: 'Authenticated.', token })
}
