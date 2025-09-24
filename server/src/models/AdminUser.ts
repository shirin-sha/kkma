import mongoose, { Schema, Document, Model } from 'mongoose'
import { hashPassword } from '../utils/password'

export interface AdminUserDoc extends Document {
  username: string
  passwordSalt: string
  passwordHash: string
}

const AdminUserSchema = new Schema<AdminUserDoc>({
  username: { type: String, required: true, unique: true, index: true },
  passwordSalt: { type: String, required: true },
  passwordHash: { type: String, required: true },
})

export const AdminUser: Model<AdminUserDoc> = mongoose.models.AdminUser || mongoose.model<AdminUserDoc>('AdminUser', AdminUserSchema)

export async function ensureAdminUser(): Promise<void> {
  const username: string = process.env.ADMIN_USERNAME || 'admin'
  const password: string = process.env.ADMIN_PASSWORD || 'admin123'

  try {
    const existing = await AdminUser.findOne({ username }).lean()
    if (existing) {
      console.log(`[AdminUser] exists, skipping seed: ${username}`)
      return
    }

    const { salt, hash } = hashPassword(password)
    await AdminUser.create({ username, passwordSalt: salt, passwordHash: hash })
    console.log(`[AdminUser] seeded default admin user: ${username}`)
  } catch (err) {
    console.error('[AdminUser] seed failed:', err)
  }
} 