import { Router, Request, Response } from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { EventModel } from '../models/Event'

const router = Router()

const uploadDir = path.resolve(__dirname, '../../../uploads/events')
fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const ext = path.extname(file.originalname) || '.jpg'
    cb(null, `${unique}${ext}`)
  },
})

const upload = multer({ storage })

// List events
router.get('/api/events', async (req: Request, res: Response) => {
  try {
    const page = Math.max(parseInt(String(req.query.page || '1'), 10) || 1, 1)
    const limit = Math.min(Math.max(parseInt(String(req.query.limit || '10'), 10) || 10, 1), 100)
    const skip = (page - 1) * limit

    const [items, total] = await Promise.all([
      EventModel.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      EventModel.countDocuments({}),
    ])

    return res.json({ ok: true, items, page, limit, total })
  } catch (err) {
    console.error('[events list] error:', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
})

// Get single event
router.get('/api/events/:id', async (req: Request, res: Response) => {
  try {
    const item = await EventModel.findById(req.params.id).lean()
    if (!item) return res.status(404).json({ ok: false, error: 'Not found' })
    return res.json({ ok: true, item })
  } catch (err) {
    console.error('[events get] error:', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
})

// Create event
router.post('/api/events', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const body: any = req.body
    const file = (req as any).file as Express.Multer.File | undefined
    const imagePath = file ? `/uploads/events/${file.filename}` : undefined

    const created = await EventModel.create({
      title: body.title,
      description: body.description,
      category: body.category,
      startDate: body.startDate,
      endDate: body.endDate,
      startTime: body.startTime,
      endTime: body.endTime,
      venueCity: body.venueCity,
      venueState: body.venueState,
      venueCountry: body.venueCountry,
      cost: body.cost,
      organizerName: body.organizerName,
      organizerPhone: body.organizerPhone,
      organizerEmail: body.organizerEmail,
      organizerWebsite: body.organizerWebsite,
      imagePath,
    })

    return res.json({ ok: true, item: created })
  } catch (err) {
    console.error('[events create] error:', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
})

// Update event
router.put('/api/events/:id', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const body: any = req.body
    const file = (req as any).file as Express.Multer.File | undefined

    const update: any = {
      title: body.title,
      description: body.description,
      category: body.category,
      startDate: body.startDate,
      endDate: body.endDate,
      startTime: body.startTime,
      endTime: body.endTime,
      venueCity: body.venueCity,
      venueState: body.venueState,
      venueCountry: body.venueCountry,
      cost: body.cost,
      organizerName: body.organizerName,
      organizerPhone: body.organizerPhone,
      organizerEmail: body.organizerEmail,
      organizerWebsite: body.organizerWebsite,
      updatedAt: new Date(),
    }

    if (file) {
      update.imagePath = `/uploads/events/${file.filename}`
    }

    const updated = await EventModel.findByIdAndUpdate(req.params.id, update, { new: true })
    if (!updated) return res.status(404).json({ ok: false, error: 'Not found' })
    return res.json({ ok: true, item: updated })
  } catch (err) {
    console.error('[events update] error:', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
})

// Delete event
router.delete('/api/events/:id', async (req: Request, res: Response) => {
  try {
    const item = await EventModel.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).json({ ok: false, error: 'Not found' })

    // Optionally remove file from disk
    if (item.imagePath && item.imagePath.startsWith('/uploads/')) {
      const fp = path.resolve(__dirname, '../../', item.imagePath.replace(/^\//, ''))
      fs.promises.unlink(fp).catch(() => {})
    }

    return res.json({ ok: true })
  } catch (err) {
    console.error('[events delete] error:', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
})

export default router 