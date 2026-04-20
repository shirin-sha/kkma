import { Router, Request, Response } from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { TEAM_GROUPS, TeamGroup, TeamMemberModel } from '../models/TeamMember'

const router = Router()

const uploadDir = path.resolve(__dirname, '../../../uploads/team')
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

function isTeamGroup(value: unknown): value is TeamGroup {
  return typeof value === 'string' && TEAM_GROUPS.includes(value as TeamGroup)
}

async function getNextOrder(group: TeamGroup): Promise<number> {
  const last = await TeamMemberModel.findOne({ group }).sort({ displayOrder: -1 }).lean()
  return (last?.displayOrder || 0) + 1
}

async function normalizeGroupOrder(group: TeamGroup): Promise<void> {
  const items = await TeamMemberModel.find({ group }).sort({ displayOrder: 1, createdAt: 1 })
  for (let i = 0; i < items.length; i += 1) {
    const wanted = i + 1
    if (items[i].displayOrder !== wanted) {
      items[i].displayOrder = wanted
      await items[i].save()
    }
  }
}

// Public list for homepage
router.get('/api/team', async (_req: Request, res: Response) => {
  try {
    const items = await TeamMemberModel.find({ isActive: true })
      .sort({ group: 1, displayOrder: 1, createdAt: 1 })
      .lean()
    return res.json({ ok: true, items })
  } catch (err) {
    console.error('[team list] error:', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
})

// Admin list
router.get('/api/admin/team', async (_req: Request, res: Response) => {
  try {
    const items = await TeamMemberModel.find({})
      .sort({ group: 1, displayOrder: 1, createdAt: 1 })
      .lean()
    return res.json({ ok: true, items })
  } catch (err) {
    console.error('[admin team list] error:', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
})

// Create member
router.post('/api/admin/team', upload.single('photo'), async (req: Request, res: Response) => {
  try {
    const body: any = req.body || {}
    if (!body.name || !body.role || !isTeamGroup(body.group)) {
      return res.status(400).json({ ok: false, error: 'name, role, and valid group are required' })
    }

    const nextOrder = await getNextOrder(body.group)
    const file = (req as any).file as Express.Multer.File | undefined
    const created = await TeamMemberModel.create({
      name: String(body.name).trim(),
      role: String(body.role).trim(),
      group: body.group,
      email: body.email || '',
      phone: body.phone || '',
      photoPath: file ? `/uploads/team/${file.filename}` : undefined,
      social: {
        facebook: body.facebook || '',
        instagram: body.instagram || '',
        linkedin: body.linkedin || '',
      },
      displayOrder: nextOrder,
      isActive: body.isActive === 'false' ? false : true,
    })

    return res.json({ ok: true, item: created })
  } catch (err) {
    console.error('[admin team create] error:', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
})

// Update member
router.put('/api/admin/team/:id', upload.single('photo'), async (req: Request, res: Response) => {
  try {
    const body: any = req.body || {}
    const existing = await TeamMemberModel.findById(req.params.id)
    if (!existing) return res.status(404).json({ ok: false, error: 'Not found' })

    const nextGroup = isTeamGroup(body.group) ? body.group : existing.group
    if (nextGroup !== existing.group) {
      existing.group = nextGroup
      existing.displayOrder = await getNextOrder(nextGroup)
    }

    if (body.name !== undefined) existing.name = String(body.name).trim()
    if (body.role !== undefined) existing.role = String(body.role).trim()
    if (body.email !== undefined) existing.email = String(body.email)
    if (body.phone !== undefined) existing.phone = String(body.phone)
    if (body.facebook !== undefined) existing.social = { ...existing.social, facebook: String(body.facebook) }
    if (body.instagram !== undefined) existing.social = { ...existing.social, instagram: String(body.instagram) }
    if (body.linkedin !== undefined) existing.social = { ...existing.social, linkedin: String(body.linkedin) }
    if (body.isActive !== undefined) existing.isActive = body.isActive === 'true' || body.isActive === true

    const file = (req as any).file as Express.Multer.File | undefined
    if (file) {
      existing.photoPath = `/uploads/team/${file.filename}`
    }

    await existing.save()
    await normalizeGroupOrder(existing.group)

    return res.json({ ok: true, item: existing })
  } catch (err) {
    console.error('[admin team update] error:', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
})

// Move member within the same group
router.post('/api/admin/team/:id/move', async (req: Request, res: Response) => {
  try {
    const direction = (req.body?.direction || '').toString()
    if (!['up', 'down'].includes(direction)) {
      return res.status(400).json({ ok: false, error: 'direction must be up or down' })
    }

    const item = await TeamMemberModel.findById(req.params.id)
    if (!item) return res.status(404).json({ ok: false, error: 'Not found' })

    const targetOrder = direction === 'up' ? item.displayOrder - 1 : item.displayOrder + 1
    if (targetOrder < 1) return res.json({ ok: true, item })

    const swapWith = await TeamMemberModel.findOne({ group: item.group, displayOrder: targetOrder })
    if (!swapWith) return res.json({ ok: true, item })

    const currentOrder = item.displayOrder
    item.displayOrder = targetOrder
    swapWith.displayOrder = currentOrder

    await swapWith.save()
    await item.save()

    return res.json({ ok: true })
  } catch (err) {
    console.error('[admin team move] error:', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
})

// Reorder members within a group using full ordered ID list
router.post('/api/admin/team/reorder', async (req: Request, res: Response) => {
  try {
    const group = req.body?.group
    const ids = Array.isArray(req.body?.ids) ? req.body.ids : []

    if (!isTeamGroup(group)) {
      return res.status(400).json({ ok: false, error: 'Invalid group' })
    }
    if (ids.length === 0 || !ids.every((id: unknown) => typeof id === 'string' && id.trim().length > 0)) {
      return res.status(400).json({ ok: false, error: 'ids must be a non-empty array of strings' })
    }

    const groupItems = await TeamMemberModel.find({ group }).select('_id').lean()
    const currentIds = groupItems.map((item) => String(item._id))

    if (currentIds.length !== ids.length) {
      return res.status(400).json({ ok: false, error: 'ids length does not match group size' })
    }

    const currentIdSet = new Set(currentIds)
    if (new Set(ids).size !== ids.length || !ids.every((id: string) => currentIdSet.has(id))) {
      return res.status(400).json({ ok: false, error: 'ids do not match existing group members' })
    }

    // Avoid unique index collisions on (group, displayOrder) during reorder:
    // step 1 assigns all rows temporary large order values, step 2 assigns final order.
    const tempBase = currentIds.length + 1000
    const tempUpdates = ids.map((id: string, index: number) => ({
      updateOne: {
        filter: { _id: id, group },
        update: { $set: { displayOrder: tempBase + index } },
      },
    }))
    await TeamMemberModel.bulkWrite(tempUpdates, { ordered: true })

    const finalUpdates = ids.map((id: string, index: number) => ({
      updateOne: {
        filter: { _id: id, group },
        update: { $set: { displayOrder: index + 1 } },
      },
    }))
    await TeamMemberModel.bulkWrite(finalUpdates, { ordered: true })

    return res.json({ ok: true })
  } catch (err) {
    console.error('[admin team reorder] error:', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
})

// Delete member
router.delete('/api/admin/team/:id', async (req: Request, res: Response) => {
  try {
    const item = await TeamMemberModel.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).json({ ok: false, error: 'Not found' })
    await normalizeGroupOrder(item.group)
    return res.json({ ok: true })
  } catch (err) {
    console.error('[admin team delete] error:', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
})

export default router

