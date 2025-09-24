import { Router, Request, Response } from 'express'
import { ContactMessage } from '../models/ContactMessage'

const router = Router()

router.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body as { name?: string; email?: string; subject?: string; message?: string }
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' })
    }

    const doc = await ContactMessage.create({ name, email, subject, message })
    return res.json({ ok: true, id: doc._id })
  } catch (err) {
    console.error('[contact] error:', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
})

router.get('/api/contact', async (req: Request, res: Response) => {
  try {
    const page = Math.max(parseInt(String(req.query.page || '1'), 10) || 1, 1)
    const limit = Math.min(Math.max(parseInt(String(req.query.limit || '20'), 10) || 20, 1), 100)
    const skip = (page - 1) * limit

    const [items, total] = await Promise.all([
      ContactMessage.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      ContactMessage.countDocuments({}),
    ])

    return res.json({ ok: true, items, page, limit, total })
  } catch (err) {
    console.error('[contact list] error:', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
})

export default router 