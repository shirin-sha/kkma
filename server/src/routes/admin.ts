import { Router, Request, Response } from 'express'
import { AdminUser } from '../models/AdminUser'
import { verifyPassword } from '../utils/password'

const router = Router()

router.post('/api/admin/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as { username?: string; password?: string }
    if (!username || !password) {
      return res.status(400).json({ ok: false, error: 'Missing credentials' })
    }

    const admin = await AdminUser.findOne({ username })
    if (!admin) {
      return res.status(401).json({ ok: false, error: 'Invalid credentials' })
    }

    const isValid = verifyPassword(password, admin.passwordSalt, admin.passwordHash)
    if (!isValid) {
      return res.status(401).json({ ok: false, error: 'Invalid credentials' })
    }

    return res.json({ ok: true })
  } catch (err) {
    console.error('[admin login] error:', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
})

export default router 