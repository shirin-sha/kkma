"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const MemberApplication_1 = require("../models/MemberApplication");
const router = (0, express_1.Router)();
const uploadDir = path_1.default.resolve(__dirname, '../../uploads/members');
fs_1.default.mkdirSync(uploadDir, { recursive: true });
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path_1.default.extname(file.originalname) || '.jpg';
        cb(null, `${unique}${ext}`);
    }
});
const upload = (0, multer_1.default)({ storage });
// POST /api/membership/applications - submit an application
router.post('/api/membership/applications', upload.single('photo'), async (req, res) => {
    try {
        const { applicationType, fullName, branch, phone, email, website, address, remarks, categories, extra } = req.body;
        if (!applicationType || !fullName) {
            return res.status(400).json({ ok: false, error: 'Missing required fields' });
        }
        const file = req.file;
        const photoPath = file ? `/uploads/members/${file.filename}` : undefined;
        const app = new MemberApplication_1.MemberApplication({
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
        });
        await app.save();
        return res.json({ ok: true, item: app });
    }
    catch (err) {
        console.error('[membership create] error:', err);
        return res.status(500).json({ ok: false, error: 'Server error' });
    }
});
// GET /api/membership/applications - list with pagination (admin)
router.get('/api/membership/applications', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const items = await MemberApplication_1.MemberApplication.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
        const total = await MemberApplication_1.MemberApplication.countDocuments();
        return res.json({ ok: true, items, page, limit, total });
    }
    catch (err) {
        console.error('[membership list] error:', err);
        return res.status(500).json({ ok: false, error: 'Server error' });
    }
});
exports.default = router;
