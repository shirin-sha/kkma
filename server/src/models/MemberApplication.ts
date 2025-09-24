import mongoose, { Schema, Document, Model } from 'mongoose'

export interface MemberApplicationDoc extends Document {
  applicationType: 'new' | 'renew'
  fullName: string
  branch?: string
  phone?: string
  email?: string
  website?: string
  address?: string
  remarks?: string
  categories?: string[]
  extra?: Record<string, any>
  photoPath?: string
  status: 'submitted' | 'approved' | 'rejected'
  createdAt: Date
  updatedAt: Date
}

const MemberApplicationSchema = new Schema<MemberApplicationDoc>({
  applicationType: { type: String, enum: ['new', 'renew'], required: true },
  fullName: { type: String, required: true },
  branch: { type: String },
  phone: { type: String },
  email: { type: String },
  website: { type: String },
  address: { type: String },
  remarks: { type: String },
  categories: { type: [String], default: [] },
  extra: { type: Schema.Types.Mixed },
  photoPath: { type: String },
  status: { type: String, enum: ['submitted', 'approved', 'rejected'], default: 'submitted' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { collection: 'memberapplications' })

MemberApplicationSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export const MemberApplication: Model<MemberApplicationDoc> = mongoose.models.MemberApplication || mongoose.model<MemberApplicationDoc>('MemberApplication', MemberApplicationSchema) 