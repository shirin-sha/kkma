import mongoose, { Schema, Document, Model } from 'mongoose'

export interface QuizSubmissionDoc extends Document {
  quizId: mongoose.Types.ObjectId
  year: number
  day: number
  fullName: string
  phoneNumber: string
  location: string
  residenceCountry: string
  answer: string // selected option value
  isCorrect: boolean
  isWinner: boolean
  submittedAt: Date
  ipAddress?: string
}

const QuizSubmissionSchema = new Schema<QuizSubmissionDoc>({
  quizId: { type: Schema.Types.ObjectId, ref: 'RamadanQuiz', required: true, index: true },
  year: { type: Number, required: true, index: true },
  day: { type: Number, required: true, index: true },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true, index: true },
  location: { type: String, required: true },
  residenceCountry: { type: String, required: true },
  answer: { type: String, required: true },
  isCorrect: { type: Boolean, default: false },
  isWinner: { type: Boolean, default: false, index: true },
  submittedAt: { type: Date, default: Date.now },
  ipAddress: { type: String }
}, { collection: 'quizsubmissions' })

// Prevent duplicate submissions from same phone number for same quiz
QuizSubmissionSchema.index({ quizId: 1, phoneNumber: 1 }, { unique: true })

// Compound index for winner selection queries (day + year + isCorrect)
QuizSubmissionSchema.index({ day: 1, year: 1, isCorrect: 1 })

export const QuizSubmission: Model<QuizSubmissionDoc> = mongoose.models.QuizSubmission || mongoose.model<QuizSubmissionDoc>("QuizSubmission", QuizSubmissionSchema)
