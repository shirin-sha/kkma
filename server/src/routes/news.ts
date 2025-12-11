import { Router, Request, Response } from "express"
import { NewsPost } from "../models/NewsPost"
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const router = Router()

// Parse dd/mm/yyyy string to a timestamp (0 if invalid)
const toPublishedTs = (item: any): number => {
  if (item?.publishedDate && typeof item.publishedDate === 'string') {
    const parts = item.publishedDate.split('/')
    if (parts.length === 3) {
      const d = parseInt(parts[0], 10)
      const m = parseInt(parts[1], 10) - 1
      const y = parseInt(parts[2], 10)
      const dt = new Date(y, m, d)
      if (!isNaN(dt.getTime())) return dt.getTime()
    }
  }
  return 0
}

const uploadDir = path.resolve(__dirname, '../../../uploads/news')
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

// GET /api/news/latest - Get latest 3 news posts for homepage
router.get("/api/news/latest", async (req: Request, res: Response) => {
  try {
    const posts = await NewsPost.find({}).lean()
    const sorted = posts
      .slice()
      .sort((a, b) => toPublishedTs(b) - toPublishedTs(a))
      .slice(0, 3)

    // Transform the data to match the frontend NewsItem type
    const transformedItems = sorted.map((item: any) => ({
      id: item._id,
      date: item.date?.day || new Date(item.createdAt).getDate().toString(),
      month: item.date?.monthYear || new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short' }),
      link: item.href || '#',
      title: item.title,
      excerpt: item.excerpt || '',
      author: item.author,
      comments: item.comments?.toString() || '0',
      commentsLink: '#',
      img: item.imagePath || null
    }))

    return res.json(transformedItems)
  } catch (err) {
    console.error("[news latest] error:", err)
    return res.status(500).json({ ok: false, error: "Server error" })
  }
})

// GET /api/news - Get all news posts with filtering
router.get("/api/news", async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string
    const archiveKey = req.query.archiveKey as string
    const startDate = req.query.startDate as string
    const endDate = req.query.endDate as string

    // Build filter query
    const filter: any = {}

    // Filter by category
    if (category) {
      filter.category = { $regex: new RegExp(category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }
    }

    // Filter by archive (month/year) based on publishedDate string dd/mm/yyyy
    if (archiveKey) {
      const [year, month] = archiveKey.split('-')
      if (year && month) {
        const yearNum = parseInt(year, 10)
        const monthNum = parseInt(month, 10)
        // Match dd/mm/yyyy format (publishedDate is stored as dd/mm/yyyy with leading zeros)
        const monthPadded = String(monthNum).padStart(2, '0')
        const regex = new RegExp(`^\\d{1,2}\/${monthPadded}\/${yearNum}$`)
        const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        const legacy = new RegExp(`${monthNames[monthNum - 1]}'${String(yearNum).slice(-2)}`, 'i')
        filter.$or = [
          { publishedDate: { $regex: regex.source } },
          { 'date.monthYear': { $regex: legacy.source, $options: 'i' } }
        ]
      }
    }
    // Filter by date range using publishedDate (string format dd/mm/yyyy)
    else if (startDate || endDate) {
      filter.publishedDate = {}
      if (startDate) {
        // Convert startDate (ISO format) to dd/mm/yyyy for comparison
        const start = new Date(startDate)
        const startStr = `${String(start.getDate()).padStart(2, '0')}/${String(start.getMonth() + 1).padStart(2, '0')}/${start.getFullYear()}`
        filter.publishedDate.$gte = startStr
      }
      if (endDate) {
        // Convert endDate (ISO format) to dd/mm/yyyy for comparison
        const end = new Date(endDate)
        const endStr = `${String(end.getDate()).padStart(2, '0')}/${String(end.getMonth() + 1).padStart(2, '0')}/${end.getFullYear()}`
        filter.publishedDate.$lte = endStr
      }
    }

    const posts = await NewsPost.find(filter).lean()
    const sorted = posts
      .slice()
      .sort((a, b) => toPublishedTs(b) - toPublishedTs(a))

    return res.json({
      ok: true,
      items: sorted
    })
  } catch (err) {
    console.error("[news get] error:", err)
    return res.status(500).json({ ok: false, error: "Server error" })
  }
})

// GET /api/news/:id - Get single news
router.get('/api/news/:id([0-9a-fA-F]{24})', async (req: Request, res: Response) => {
  try {
    const item = await NewsPost.findById(req.params.id).lean()
    if (!item) return res.status(404).json({ ok: false, error: 'Not found' })
    return res.json({ ok: true, item })
  } catch (err) {
    console.error('[news get one] error:', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
})

// POST /api/news - Create a new news post
router.post("/api/news", upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'gallery', maxCount: 20 },
]), async (req: Request, res: Response) => {
  try {
    const { title, href, category, author, comments, content, contentHtml, excerpt, publishedDate, slug, featuredAlt, featuredCaption, tags, seoTitle, seoDescription } = req.body as any

    if (!title || !category || !author) {
      return res.status(400).json({ ok: false, error: "Missing required fields" })
    }

    // Parse publishedDate from dd/mm/yyyy format (strict)
    if (!publishedDate || typeof publishedDate !== 'string') {
      return res.status(400).json({ ok: false, error: 'Missing publishedDate (dd/mm/yyyy)' })
    }
    const m = publishedDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
    if (!m) {
      return res.status(400).json({ ok: false, error: 'Invalid publishedDate. Expected dd/mm/yyyy' })
    }
    const dNum = parseInt(m[1], 10)
    const mmNum = parseInt(m[2], 10)
    const yyyy = parseInt(m[3], 10)
    const dObj = new Date(yyyy, mmNum - 1, dNum)
    if (isNaN(dObj.getTime())) {
      return res.status(400).json({ ok: false, error: 'Invalid publishedDate value' })
    }
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const legacyMonthYear = `${monthNames[Math.max(0, Math.min(11, mmNum - 1))]}'${String(yyyy).slice(-2)}`

    const files = (req as any).files as Record<string, Express.Multer.File[] | undefined>
    const featured = files?.image?.[0]
    const gallery = files?.gallery || []

    const imagePath = featured ? `/uploads/news/${featured.filename}` : undefined
    const galleryPaths = gallery.map((f) => `/uploads/news/${f.filename}`)

    const parsedTags = typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : Array.isArray(tags) ? tags : []

    const post = new NewsPost({
      title,
      href: href || '#',
      img: undefined,
      imagePath,
      galleryPaths,
      content,
      contentHtml,
      excerpt,
      slug,
      featuredAlt,
      featuredCaption,
      tags: parsedTags,
      seoTitle,
      seoDescription,
      date: { day: String(dNum), monthYear: legacyMonthYear },
      publishedDate: `${String(dNum).padStart(2,'0')}/${String(mmNum).padStart(2,'0')}/${String(yyyy)}`,
      category,
      author,
      comments: comments ? Number(comments) : 0
    })

    await post.save()

    return res.json({ ok: true, item: post })
  } catch (err) {
    console.error("[news create] error:", err)
    return res.status(500).json({ ok: false, error: "Server error" })
  }
})

// PUT /api/news/:id - Update a news post
router.put("/api/news/:id", upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'gallery', maxCount: 10 },
]), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, href, category, author, comments, content, contentHtml, excerpt, publishedDate, slug, featuredAlt, featuredCaption, tags, seoTitle, seoDescription } = req.body as any

    // Parse publishedDate from dd/mm/yyyy format
    let newPublishedDateStr: string | undefined
    let newLegacy: { day: string; monthYear: string } | undefined
    if (publishedDate && typeof publishedDate === 'string') {
      const m = publishedDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
      if (m) {
        const dNum = parseInt(m[1], 10)
        const mmNum = parseInt(m[2], 10)
        const yyyy = parseInt(m[3], 10)
        const dObj = new Date(yyyy, mmNum - 1, dNum)
        if (!isNaN(dObj.getTime())) {
          newPublishedDateStr = `${String(dNum).padStart(2,'0')}/${String(mmNum).padStart(2,'0')}/${String(yyyy)}`
          const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
          newLegacy = { day: String(dNum), monthYear: `${monthNames[Math.max(0, Math.min(11, mmNum - 1))]}'${String(yyyy).slice(-2)}` }
        }
      }
    }

    const files = (req as any).files as Record<string, Express.Multer.File[] | undefined>
    const featured = files?.image?.[0]
    const gallery = files?.gallery || []

    const update: any = {
      title,
      href,
      content,
      contentHtml,
      excerpt,
      slug,
      featuredAlt,
      featuredCaption,
      seoTitle,
      seoDescription,
      category,
      author,
      comments: comments ? Number(comments) : 0,
      updatedAt: new Date()
    }

    if (newPublishedDateStr) {
      update.publishedDate = newPublishedDateStr
      if (newLegacy) update.date = newLegacy
    }

    if (featured) {
      update.imagePath = `/uploads/news/${featured.filename}`
    }
    if (gallery.length > 0) {
      update.galleryPaths = gallery.map((f) => `/uploads/news/${f.filename}`)
    }

    if (typeof tags === 'string') {
      update.tags = tags.split(',').map((t: string) => t.trim()).filter(Boolean)
    } else if (Array.isArray(tags)) {
      update.tags = tags
    }

    const post = await NewsPost.findByIdAndUpdate(
      id,
      update,
      { new: true }
    )

    if (!post) {
      return res.status(404).json({ ok: false, error: "Post not found" })
    }

    return res.json({ ok: true, item: post })
  } catch (err) {
    console.error("[news update] error:", err)
    return res.status(500).json({ ok: false, error: "Server error" })
  }
})

// DELETE /api/news/:id - Delete a news post
router.delete("/api/news/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const post = await NewsPost.findByIdAndDelete(id)

    if (!post) {
      return res.status(404).json({ ok: false, error: "Post not found" })
    }

    return res.json({ ok: true })
  } catch (err) {
    console.error("[news delete] error:", err)
    return res.status(500).json({ ok: false, error: "Server error" })
  }
})

// GET /api/news/archives - Get available archives based on publishedDate
router.get("/api/news/archives", async (_req: Request, res: Response) => {
  try {
    const items = await NewsPost.find({}, { publishedDate: 1, date: 1 }).lean()
    const monthKeyToCount = new Map<string, number>()
    const monthKeyToDate = new Map<string, Date>()

    for (const it of (Array.isArray(items) ? items : []) as any[]) {
      try {
        if (it && typeof it.publishedDate === 'string') {
          const m = it.publishedDate.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/)
          if (m) {
            const d = parseInt(m[1], 10)
            const mm = parseInt(m[2], 10)
            const yyyy = parseInt(m[3], 10)
            const dObj = new Date(yyyy, mm - 1, d)
            if (!isNaN(dObj.getTime())) {
              const key = `${dObj.getFullYear()}-${String(dObj.getMonth() + 1).padStart(2, '0')}`
              monthKeyToCount.set(key, (monthKeyToCount.get(key) || 0) + 1)
              if (!monthKeyToDate.has(key)) monthKeyToDate.set(key, dObj)
            }
          }
        } else if (it?.date?.monthYear) {
          const monthYearMatch = String(it.date.monthYear).match(/(\w+)'(\d{2})/)
          if (monthYearMatch) {
            const monthAbbrev = monthYearMatch[1]
            const year2Digit = parseInt(monthYearMatch[2], 10)
            const year = 2000 + year2Digit
            const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
            const monthIndex = monthNames.indexOf(monthAbbrev)
            if (monthIndex !== -1) {
              const created = new Date(year, monthIndex, 1)
              const key = `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, '0')}`
              monthKeyToCount.set(key, (monthKeyToCount.get(key) || 0) + 1)
              if (!monthKeyToDate.has(key)) monthKeyToDate.set(key, created)
            }
          }
        }
      } catch {}
    }

    const archives = Array.from(monthKeyToCount.entries())
      .map(([key, count]) => ({ key, count, date: monthKeyToDate.get(key)! }))
      .filter(a => a.date instanceof Date)
      .sort((a, b) => a.date && b.date ? (b.date.getTime() - a.date.getTime()) : 0)
      .map(a => ({ key: a.key, label: a.date.toLocaleString('en-US', { month: 'long', year: 'numeric' }), count: a.count }))

    return res.json({ ok: true, items: archives })
  } catch (err) {
    console.error('[news archives] error:', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
})

// GET /api/news/categories - Get available categories
router.get("/api/news/categories", async (_req: Request, res: Response) => {
  try {
    const items = await NewsPost.find({}, { category: 1 }).lean()
    const categoryToCount = new Map<string, number>()
    for (const it of (Array.isArray(items) ? items : []) as any[]) {
      try {
        const raw = (it?.category ?? '').toString()
        if (!raw) continue
        const parts = raw.split(',').map((s: string) => s.trim()).filter(Boolean)
        for (const cat of parts) {
          categoryToCount.set(cat, (categoryToCount.get(cat) || 0) + 1)
        }
      } catch {}
    }
    const categories = Array.from(categoryToCount.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }))
    return res.json({ ok: true, items: categories })
  } catch (err) {
    console.error('[news categories] error:', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
})

export default router