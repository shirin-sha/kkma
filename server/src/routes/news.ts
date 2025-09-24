import { Router, Request, Response } from "express"
import { NewsPost } from "../models/NewsPost"
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const router = Router()

const uploadDir = path.resolve(__dirname, '../../uploads/news')
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

// GET /api/news - Get all news posts with pagination
router.get("/api/news", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const posts = await NewsPost.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const total = await NewsPost.countDocuments()

    return res.json({
      ok: true,
      items: posts,
      page,
      limit,
      total
    })
  } catch (err) {
    console.error("[news get] error:", err)
    return res.status(500).json({ ok: false, error: "Server error" })
  }
})

// GET /api/news/:id - Get single news
router.get('/api/news/:id', async (req: Request, res: Response) => {
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
  { name: 'gallery', maxCount: 10 },
]), async (req: Request, res: Response) => {
  try {
    const { title, href, category, author, comments, content, contentHtml, excerpt, day, monthYear, slug, featuredAlt, featuredCaption, tags, seoTitle, seoDescription } = req.body as any

    if (!title || !category || !author || !day || !monthYear) {
      return res.status(400).json({ ok: false, error: "Missing required fields" })
    }

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
      date: { day, monthYear },
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
    const { title, href, category, author, comments, content, contentHtml, excerpt, day, monthYear, slug, featuredAlt, featuredCaption, tags, seoTitle, seoDescription } = req.body as any

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
      date: { day, monthYear },
      category,
      author,
      comments: comments ? Number(comments) : 0,
      updatedAt: new Date()
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

export default router