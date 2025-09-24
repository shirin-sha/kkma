import { Router, Request, Response } from 'express'
import path from 'path'
import fs from 'fs'
import multer from 'multer'
import { MemberApplication } from '../models/MemberApplication'

const router = Router()

const uploadDir = path.resolve(__dirname, '../../uploads/members')
fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const ext = path.extname(file.originalname) || '.jpg'
    cb(null, `${unique}${ext}`)
  }
})
const upload = multer({ storage })

// POST /api/membership/applications - submit an application
router.post('/api/membership/applications', upload.single('photo'), async (req: Request, res: Response) => {
  try {
    const {
      applicationType,
      fullName,
      branch,
      phone,
      email,
      website,
      address,
      remarks,
      categories,
      extra
    } = req.body as any

    if (!applicationType || !fullName) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' })
    }

    const file = (req as any).file as Express.Multer.File | undefined
    const photoPath = file ? `/uploads/members/${file.filename}` : undefined

    const app = new MemberApplication({
      applicationType: applicationType === 'renew' ? 'renew' : 'new',
      fullName,
      branch,
      phone,
      email,
      website,
      address,
      remarks,
      categories: typeof categories === 'string' ? categories.split(',').map((s) => s.trim()).filter(Boolean) : Array.isArray(categories) ? categories : [],
      extra: extra ? JSON.parse(extra) : undefined,
      photoPath
    })

    await app.save()

    return res.json({ ok: true, item: app })
  } catch (err) {
    console.error('[membership create] error:', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
})

// GET /api/membership/applications - list with pagination (admin)
router.get('/api/membership/applications', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 20
    const skip = (page - 1) * limit

    const items = await MemberApplication.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean()
    const total = await MemberApplication.countDocuments()

    return res.json({ ok: true, items, page, limit, total })
  } catch (err) {
    console.error('[membership list] error:', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
})

export default router 