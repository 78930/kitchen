import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone: { type: String, trim: true, maxlength: 30, default: '' },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    resolved: { type: Boolean, default: false, index: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
)

export default mongoose.models.ContactMessage ||
  mongoose.model('ContactMessage', contactSchema)
