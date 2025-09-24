"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ContactMessage_1 = require("../models/ContactMessage");
const router = (0, express_1.Router)();
router.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ ok: false, error: 'Missing required fields' });
        }
        const doc = await ContactMessage_1.ContactMessage.create({ name, email, subject, message });
        return res.json({ ok: true, id: doc._id });
    }
    catch (err) {
        console.error('[contact] error:', err);
        return res.status(500).json({ ok: false, error: 'Server error' });
    }
});
router.get('/api/contact', async (req, res) => {
    try {
        const page = Math.max(parseInt(String(req.query.page || '1'), 10) || 1, 1);
        const limit = Math.min(Math.max(parseInt(String(req.query.limit || '20'), 10) || 20, 1), 100);
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            ContactMessage_1.ContactMessage.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            ContactMessage_1.ContactMessage.countDocuments({}),
        ]);
        return res.json({ ok: true, items, page, limit, total });
    }
    catch (err) {
        console.error('[contact list] error:', err);
        return res.status(500).json({ ok: false, error: 'Server error' });
    }
});
exports.default = router;
