import express from 'express';
import jwt from 'jsonwebtoken';
import Classified from '../models/Classified';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/classifieds/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Middleware to verify JWT
const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    (req as any).userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all classifieds (public)
router.get('/', async (req, res) => {
  try {
    const { category, location, search, sortBy } = req.query;
    let query: any = { status: 'active' };

    if (category) query.category = category;
    if (location) query.location = new RegExp(location as string, 'i');
    if (search) query.title = new RegExp(search as string, 'i');

    let sort: any = { createdAt: -1 };
    if (sortBy === 'price-asc') sort = { price: 1 };
    if (sortBy === 'price-desc') sort = { price: -1 };
    if (sortBy === 'popular') sort = { views: -1 };

    const classifieds = await Classified.find(query).sort(sort).populate('userId', 'name email');

    res.json({ classifieds });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Server error';
    res.status(500).json({ message });
  }
});

// Get single classified
router.get('/:id', async (req, res) => {
  try {
    const classified = await Classified.findById(req.params.id).populate('userId', 'name email phone');

    if (!classified) {
      return res.status(404).json({ message: 'Classified not found' });
    }

    // Increment views
    classified.views += 1;
    await classified.save();

    res.json({ classified });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Server error';
    res.status(500).json({ message });
  }
});

// Get user's classifieds
router.get('/user/my-posts', authenticate, async (req, res) => {
  try {
    const userId = (req as any).userId;
    const classifieds = await Classified.find({ userId }).sort({ createdAt: -1 });

    res.json({ classifieds });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Server error';
    res.status(500).json({ message });
  }
});

// Create classified
router.post('/', authenticate, upload.array('images', 5), async (req, res) => {
  try {
    const userId = (req as any).userId;
    const { title, description, price, category, location, phone, email } = req.body;

    const images = (req.files as Express.Multer.File[])?.map((file) => `/uploads/classifieds/${file.filename}`) || [];

    const classified = new Classified({
      title,
      description,
      price,
      category,
      location,
      phone,
      email,
      images,
      userId,
    });

    await classified.save();

    res.status(201).json({ message: 'Classified created successfully', classified });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Server error';
    res.status(500).json({ message });
  }
});

// Update classified
router.put('/:id', authenticate, upload.array('images', 5), async (req, res) => {
  try {
    const userId = (req as any).userId;
    const classified = await Classified.findById(req.params.id);

    if (!classified) {
      return res.status(404).json({ message: 'Classified not found' });
    }

    if (classified.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { title, description, price, category, location, phone, email } = req.body;

    const newImages = (req.files as Express.Multer.File[])?.map((file) => `/uploads/classifieds/${file.filename}`) || [];

    classified.title = title || classified.title;
    classified.description = description || classified.description;
    classified.price = price || classified.price;
    classified.category = category || classified.category;
    classified.location = location || classified.location;
    classified.phone = phone || classified.phone;
    classified.email = email || classified.email;

    if (newImages.length > 0) {
      classified.images = [...classified.images, ...newImages];
    }

    await classified.save();

    res.json({ message: 'Classified updated successfully', classified });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Server error';
    res.status(500).json({ message });
  }
});

// Delete classified
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const userId = (req as any).userId;
    const classified = await Classified.findById(req.params.id);

    if (!classified) {
      return res.status(404).json({ message: 'Classified not found' });
    }

    if (classified.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await classified.deleteOne();

    res.json({ message: 'Classified deleted successfully' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Server error';
    res.status(500).json({ message });
  }
});

// Get categories with counts
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Classified.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.json({ categories });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Server error';
    res.status(500).json({ message });
  }
});

export default router;

