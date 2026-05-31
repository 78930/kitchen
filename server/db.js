import mongoose from 'mongoose'

// Cache the connection across serverless invocations to avoid exhausting
// the connection pool on each cold start.
let cached = global._mongoose
if (!cached) cached = global._mongoose = { conn: null, promise: null }

export async function connectDB() {
  if (cached.conn) return cached.conn

  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Add it to your environment variables.')
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 8000,
      })
      .then((m) => m)
  }

  try {
    cached.conn = await cached.promise
  } catch (err) {
    cached.promise = null
    throw err
  }
  return cached.conn
}
