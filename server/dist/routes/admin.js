"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminUser_1 = require("../models/AdminUser");
const password_1 = require("../utils/password");
const router = (0, express_1.Router)();
router.post('/api/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ ok: false, error: 'Missing credentials' });
        }
        const admin = await AdminUser_1.AdminUser.findOne({ username });
        if (!admin) {
            return res.status(401).json({ ok: false, error: 'Invalid credentials' });
        }
        const isValid = (0, password_1.verifyPassword)(password, admin.passwordSalt, admin.passwordHash);
        if (!isValid) {
            return res.status(401).json({ ok: false, error: 'Invalid credentials' });
        }
        return res.json({ ok: true });
    }
    catch (err) {
        console.error('[admin login] error:', err);
        return res.status(500).json({ ok: false, error: 'Server error' });
    }
});
exports.default = router;
