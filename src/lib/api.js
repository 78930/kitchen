// Lightweight fetch wrapper for the SA Caterers API.
const BASE = '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })

  let data = null
  try {
    data = await res.json()
  } catch {
    // non-JSON response
  }

  if (!res.ok) {
    const message = (data && (data.message || data.error)) || `Request failed (${res.status})`
    const err = new Error(message)
    err.status = res.status
    err.fields = data && data.fields
    throw err
  }
  return data
}

export const api = {
  createBooking: (payload) =>
    request('/bookings', { method: 'POST', body: JSON.stringify(payload) }),

  createContact: (payload) =>
    request('/contact', { method: 'POST', body: JSON.stringify(payload) }),

  adminLogin: (password) =>
    request('/admin/login', { method: 'POST', body: JSON.stringify({ password }) }),

  listBookings: (token, status) =>
    request(`/bookings${status ? `?status=${status}` : ''}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  updateBooking: (token, id, status) =>
    request(`/bookings/${id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    }),
}
