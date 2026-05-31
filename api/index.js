// Vercel serverless entry point. All /api/* requests are rewritten here
// (see vercel.json) and routed by the Express app in /server.
import { buildApp } from '../server/app.js'

const app = buildApp()

export default app
