// Local development server. Run with: npm run server
import 'dotenv/config'
import { buildApp } from './server/app.js'

const app = buildApp()
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`\n  The Madhu's Kitchen API running on http://localhost:${PORT}`)
  console.log(`  Health check: http://localhost:${PORT}/api/health\n`)
})
