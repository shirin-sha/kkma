import { Router, Request, Response } from 'express';
import { AdminUser } from '../models/AdminUser';
import { verifyPassword } from '../utils/password';
import Classified from '../models/Classified';

const router = Router();

// Admin login
router.post('/api/admin/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as { username?: string; password?: string };
    if (!username || !password) {
      return res.status(400).json({ ok: false, error: 'Missing credentials' });
    }

    const admin = await AdminUser.findOne({ username });
    if (!admin) {
      return res.status(401).json({ ok: false, error: 'Invalid credentials' });
    }

    const isValid = verifyPassword(password, admin.passwordSalt, admin.passwordHash);
    if (!isValid) {
      return res.status(401).json({ ok: false, error: 'Invalid credentials' });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error('[admin login] error:', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
});

// Admin classifieds management
router.get('/api/admin/classifieds', async (_req: Request, res: Response) => {
  try {
    const classifieds = await Classified.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name email phone');

    res.json({ ok: true, classifieds });
  } catch (err) {
    console.error('[admin classifieds] error:', err);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
});

router.put('/api/admin/classifieds/:id/approve', async (req: Request, res: Response) => {
  try {
    const classified = await Classified.findById(req.params.id);
    if (!classified) {
      return res.status(404).json({ ok: false, error: 'Classified not found' });
    }

    classified.status = 'active';
    await classified.save();

    res.json({ ok: true, message: 'Classified approved successfully', classified });
  } catch (err) {
    console.error('[admin approve classified] error:', err);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
});

router.put('/api/admin/classifieds/:id/reject', async (req: Request, res: Response) => {
  try {
    const classified = await Classified.findById(req.params.id);
    if (!classified) {
      return res.status(404).json({ ok: false, error: 'Classified not found' });
    }

    classified.status = 'inactive';
    await classified.save();

    res.json({ ok: true, message: 'Classified rejected', classified });
  } catch (err) {
    console.error('[admin reject classified] error:', err);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
});

router.delete('/api/admin/classifieds/:id', async (req: Request, res: Response) => {
  try {
    const classified = await Classified.findById(req.params.id);
    if (!classified) {
      return res.status(404).json({ ok: false, error: 'Classified not found' });
    }

    await classified.deleteOne();

    res.json({ ok: true, message: 'Classified deleted successfully' });
  } catch (err) {
    console.error('[admin delete classified] error:', err);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
});

export default router;
