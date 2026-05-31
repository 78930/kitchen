import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema(
  {
    customer_name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    event_date: { type: Date, required: true },
    guest_count: { type: Number, required: true, min: 1 },
    event_type: { type: String, required: true, trim: true, maxlength: 80 },
    selected_tier: { type: String, required: true, trim: true, maxlength: 60 },
    custom_notes: { type: String, trim: true, maxlength: 1000, default: '' },
    status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'CANCELLED'],
      default: 'PENDING',
      index: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
)

// Avoid model overwrite errors on serverless hot reloads.
export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema)
