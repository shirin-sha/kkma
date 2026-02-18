import mongoose, { Schema, Document, Model } from 'mongoose'

export interface RamadanQuizDoc extends Document {
  year: number
  day: number // 1-30
  title: string
  heading?: string // Main heading (e.g., "അറിവ് നേടൂ, ഒപ്പം സമ്മാനങ്ങളും....")
  subheading?: string // Subheading (e.g., "കെ.കെ.എം.എ "റമദാൻ ക്വിസ്സ് 2026" : Day 30")
  description?: string
  imagePath?: string
  videoUrl?: string
  question: string
  options: {
    value: string
    label: string
  }[]
  correctAnswer: string // value of the correct option
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const RamadanQuizSchema = new Schema<RamadanQuizDoc>({
  year: { type: Number, required: true, index: true },
  day: { type: Number, required: true, min: 1, max: 30 },
  title: { type: String, required: true },
  heading: { type: String },
  subheading: { type: String },
  description: { type: String },
  imagePath: { type: String },
  videoUrl: { type: String },
  question: { type: String, required: false, default: 'Question from video' },
  options: [{
    value: { type: String, required: true },
    label: { type: String, required: true }
  }],
  correctAnswer: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { collection: 'ramadanquizzes' })

// Ensure unique year+day combination
RamadanQuizSchema.index({ year: 1, day: 1 }, { unique: true })

RamadanQuizSchema.pre("save", function(next) {
  this.updatedAt = new Date()
  next()
})

export const RamadanQuiz: Model<RamadanQuizDoc> = mongoose.models.RamadanQuiz || mongoose.model<RamadanQuizDoc>("RamadanQuiz", RamadanQuizSchema)
