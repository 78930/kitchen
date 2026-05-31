import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { connectDB } from './db.js'
import bookingsRouter from './routes/bookings.js'
import contactRouter from './routes/contact.js'
import adminRouter from './routes/admin.js'

export function buildApp() {
  const app = express()
  app.set('trust proxy', 1)
  app.use(express.json({ limit: '100kb' }))

  // CORS — allow same-origin by default, or explicit origins via env.
  const origins = (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  app.use(cors(origins.length ? { origin: origins } : {}))

  // Ensure the DB is connected before handling any /api request.
  app.use(async (req, res, next) => {
    try {
      await connectDB()
      next()
    } catch (err) {
      console.error('DB connection failed:', err.message)
      res.status(503).json({ message: 'Service temporarily unavailable. Please try again shortly.' })
    }
  })

  // Basic abuse protection on write endpoints.
  const writeLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many requests. Please try again later.' },
  })

  app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'sa-caterers-api' }))

  app.use('/api/bookings', (req, res, next) =>
    req.method === 'POST' ? writeLimiter(req, res, next) : next(),
  )
  app.use('/api/bookings', bookingsRouter)
  app.use('/api/contact', writeLimiter, contactRouter)
  app.use('/api/admin', adminRouter)

  // 404 + error handlers
  app.use('/api', (_req, res) => res.status(404).json({ message: 'Endpoint not found.' }))
  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    console.error('Unhandled error:', err)
    res.status(500).json({ message: 'Unexpected server error.' })
  })

  return app
}
