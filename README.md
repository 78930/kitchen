# SA Caterers · Sri Adithya — Luxury Catering Website

A premium, production-ready full-stack website for a luxury catering business.
React + Vite + Tailwind frontend, an Express API running as Vercel serverless
functions, MongoDB (Mongoose) for data, and a Nodemailer email engine.

---

## ✨ Features

- **Luxury design system** — Emerald `#0F3D2E` / Royal Gold `#F3B942` / Cream `#F9F9F9`, serif display headings (Cormorant Garamond) + Inter body, micro-interactions and card-lift hovers throughout.
- **Single-page experience** — sticky blurred navbar, full-bleed hero, animated stat counters, services grid, interactive deep menu explorer, premium tiers with a Veg / Non-Veg toggle, founder section, and a rich contact footer.
- **Booking wizard** — a 5-step flow (Date → Guests → Event → Package → Contact) with per-step validation, loading spinners, toasts, and a success screen.
- **Admin dashboard** — protected at `#admin`; sign in, filter bookings by status, and confirm/cancel with one click.
- **WhatsApp floating widget** — sticky badge with tooltip that deep-links to `wa.me/919030927239` with a prefilled message.
- **Secure backend** — input sanitization, future-date & guest-count validation, JWT-protected admin routes, rate limiting, and CORS.
- **Automated emails** — on every booking and contact submission, two styled HTML emails fire: a client receipt and an admin summary (to `sa.hyderabadcaterers@gmail.com`).

---

## 🧱 Tech Stack

| Layer     | Technology |
|-----------|------------|
| Frontend  | React 18, Vite 5, Tailwind CSS 3, lucide-react |
| Backend   | Node.js, Express 4 (serverless on Vercel) |
| Database  | MongoDB + Mongoose 8 |
| Email     | Nodemailer (SMTP / Gmail App Password) |
| Auth      | JSON Web Tokens |
| Hosting   | Vercel (static frontend + `/api` functions) |

---

## 📂 Project Structure

```
sa-caterers/
├── api/
│   └── index.js              # Vercel serverless entry → imports server/app.js
├── server/                   # Express implementation (kept out of /api so Vercel
│   │                         #   builds ONE function, not one per file)
│   ├── app.js                # buildApp(): middleware, routes, error handling
│   ├── db.js                 # cached Mongoose connection (serverless-safe)
│   ├── models/               # Booking.js, ContactMessage.js
│   ├── controllers/          # booking / contact / auth controllers
│   ├── routes/               # bookings.js, contact.js, admin.js
│   ├── middleware/           # auth.js (JWT), validate.js (sanitize + rules)
│   └── utils/mailer.js       # Nodemailer + styled HTML email templates
├── src/
│   ├── App.jsx               # hash router (site vs #admin), booking modal state
│   ├── components/           # Navbar, Hero, StatsBanner, Services, MenuExplorer,
│   │                         #   Tiers, About, Footer, WhatsAppWidget,
│   │                         #   BookingWizard, AdminDashboard, Toast, Spinner
│   ├── data/                 # menu.js (full dataset), tiers.js (4 tiers × diet)
│   └── lib/api.js            # fetch client
├── server.js                 # local dev API server (Express on :5000)
├── vercel.json               # build + rewrites (/api/* → function, SPA fallback)
└── .env.example              # all required environment variables
```

---

## 🚀 Local Development

```bash
npm install

# Terminal 1 — API on http://localhost:5000
npm run server

# Terminal 2 — Vite dev server on http://localhost:5173 (proxies /api → :5000)
npm run dev
```

Create a `.env` from `.env.example` first (see below). The admin dashboard lives
at `http://localhost:5173/#admin`.

---

## 🔐 Environment Variables

Copy `.env.example` → `.env` (local) or add these in **Vercel → Settings →
Environment Variables**:

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | SMTP server (Gmail: `smtp.gmail.com` / `465` / `true`) |
| `SMTP_USER` / `SMTP_PASS` | Gmail address + 16-char **App Password** |
| `MAIL_FROM` | From header, e.g. `"SA Caterers <you@gmail.com>"` |
| `ADMIN_EMAIL` | Where admin notifications go (`sa.hyderabadcaterers@gmail.com`) |
| `ADMIN_PASSWORD` | Password for the admin dashboard login |
| `JWT_SECRET` | Long random string for signing admin tokens |
| `CORS_ORIGINS` | (optional) comma-separated allowed origins |

> Email is optional: if SMTP isn't configured, bookings still save — emails are
> simply skipped (logged server-side).

### Getting a Gmail App Password
1. Enable 2-Step Verification on the Google account.
2. Visit <https://myaccount.google.com/apppasswords>, create an app password.
3. Use it as `SMTP_PASS` (no spaces).

---

## ☁️ Deploy to Vercel

1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket).
2. **Import** it in Vercel — the framework auto-detects as **Vite**.
3. Add all environment variables above (Production + Preview).
4. Deploy. Vercel serves the static build and routes `/api/*` to the Express
   function via `vercel.json`.

A free **MongoDB Atlas** cluster works perfectly; whitelist `0.0.0.0/0` (or
Vercel's egress) under Network Access.

---

## 🔌 API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/bookings` | — | Create a booking; validates + fires emails |
| `GET`  | `/api/bookings?status=PENDING` | Admin | List bookings (filterable) |
| `PATCH`| `/api/bookings/:id` | Admin | Update status (`PENDING`/`CONFIRMED`/`CANCELLED`) |
| `POST` | `/api/contact` | — | Store a contact enquiry; fires emails |
| `POST` | `/api/admin/login` | — | Exchange `ADMIN_PASSWORD` for a JWT |
| `GET`  | `/api/health` | — | Health check |

### Booking payload
```json
{
  "customer_name": "Asha Rao",
  "email": "asha@example.com",
  "phone": "+91 90309 27239",
  "event_date": "2026-08-15",
  "guest_count": 250,
  "event_type": "Wedding & Reception",
  "selected_tier": "Gold",
  "custom_notes": "Pure veg, outdoor lawn"
}
```

---

## 🛡️ Validation & Security

- Inputs are sanitized (angle brackets + control chars stripped) and length-capped.
- Guest count must be a positive number; event date must be in the future.
- Admin routes require a valid `Bearer` JWT (8-hour expiry).
- Write endpoints are rate-limited (30 requests / 10 min / IP).
- The Mongoose connection is cached across serverless invocations.

---

© SA Caterers · Sri Adithya. Crafted with love in Hyderabad.
