import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ContactMessageDoc extends Document {
  name: string
  email: string
  subject?: string
  message: string
  createdAt: Date
}

const ContactMessageSchema = new Schema<ContactMessageDoc>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export const ContactMessage: Model<ContactMessageDoc> = mongoose.models.ContactMessage || mongoose.model<ContactMessageDoc>('ContactMessage', ContactMessageSchema) 