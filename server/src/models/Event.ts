import mongoose, { Schema, Document, Model } from 'mongoose'

export interface EventDoc extends Document {
  title: string
  description?: string
  category?: string
  startDate?: string
  endDate?: string
  startTime?: string
  endTime?: string
  venueCity?: string
  venueState?: string
  venueCountry?: string
  cost?: string
  organizerName?: string
  organizerPhone?: string
  organizerEmail?: string
  organizerWebsite?: string
  imagePath?: string
  createdAt: Date
  updatedAt: Date
}

const EventSchema = new Schema<EventDoc>({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  startDate: { type: String }, // e.g., 2024-09-25
  endDate: { type: String },
  startTime: { type: String }, // e.g., 08:00
  endTime: { type: String },
  venueCity: { type: String },
  venueState: { type: String },
  venueCountry: { type: String },
  cost: { type: String },
  organizerName: { type: String },
  organizerPhone: { type: String },
  organizerEmail: { type: String },
  organizerWebsite: { type: String },
  imagePath: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

EventSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

export const EventModel: Model<EventDoc> = mongoose.models.Event || mongoose.model<EventDoc>('Event', EventSchema) 