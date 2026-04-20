import mongoose, { Document, Model, Schema } from 'mongoose'

export const TEAM_GROUPS = [
  'pmt_executives',
  'central_committee_office_bearers',
  'ahmadi_zonal_committee',
  'city_zonal_committee',
  'farwaniya_zonal_committee',
] as const
export type TeamGroup = (typeof TEAM_GROUPS)[number]

export interface TeamMemberDoc extends Document {
  name: string
  role: string
  group: TeamGroup
  email?: string
  phone?: string
  photoPath?: string
  social?: {
    facebook?: string
    instagram?: string
    linkedin?: string
  }
  displayOrder: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const TeamMemberSchema = new Schema<TeamMemberDoc>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    group: { type: String, required: true, enum: TEAM_GROUPS, index: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    photoPath: { type: String },
    social: {
      facebook: { type: String, trim: true },
      instagram: { type: String, trim: true },
      linkedin: { type: String, trim: true },
    },
    displayOrder: { type: Number, required: true, min: 1 },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
)

TeamMemberSchema.index({ group: 1, displayOrder: 1 }, { unique: true })

export const TeamMemberModel: Model<TeamMemberDoc> =
  mongoose.models.TeamMember || mongoose.model<TeamMemberDoc>('TeamMember', TeamMemberSchema)

