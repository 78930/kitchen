import jwt from 'jsonwebtoken'

function getSecret() {
  return process.env.JWT_SECRET || 'sa-caterers-dev-secret-change-me'
}

// Issue a short-lived admin token after a correct password.
export function issueAdminToken() {
  return jwt.sign({ role: 'admin' }, getSecret(), { expiresIn: '8h' })
}

// Protect admin-only routes.
export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) {
    return res.status(401).json({ message: 'Authentication required.' })
  }
  try {
    const payload = jwt.verify(token, getSecret())
    if (payload.role !== 'admin') throw new Error('forbidden')
    req.admin = payload
    next()
  } catch {
    return res.status(401).json({ message: 'Session expired or invalid. Please sign in again.' })
  }
}
