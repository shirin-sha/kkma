"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const MemberApplication_1 = require("../models/MemberApplication");
const puppeteer_1 = __importDefault(require("puppeteer"));
const router = express_1.default.Router();
// Configure multer for file uploads
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path_1.default.join(__dirname, '../../uploads/members');
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage });
// Get all applications with pagination
router.get('/api/membership/applications', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const total = await MemberApplication_1.MemberApplication.countDocuments();
        const items = await MemberApplication_1.MemberApplication.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        res.json({
            ok: true,
            items,
            page,
            limit,
            total
        });
    }
    catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ ok: false, error: 'Failed to fetch applications' });
    }
});
// Get single application
router.get('/api/membership/applications/:id', async (req, res) => {
    try {
        const item = await MemberApplication_1.MemberApplication.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ ok: false, error: 'Application not found' });
        }
        res.json({ ok: true, item });
    }
    catch (error) {
        console.error('Error fetching application:', error);
        res.status(500).json({ ok: false, error: 'Failed to fetch application' });
    }
});
// Generate PDF for membership application
router.get('/api/membership/applications/:id/pdf', async (req, res) => {
    try {
        const item = await MemberApplication_1.MemberApplication.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ ok: false, error: 'Application not found' });
        }
        console.log('Starting PDF generation for application:', req.params.id);
        const browser = await puppeteer_1.default.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-web-security',
                '--allow-running-insecure-content'
            ]
        });
        const page = await browser.newPage();
        // Set viewport and user agent
        await page.setViewport({ width: 1200, height: 800 });
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        // Set the client URL - adjust this to match your client URL
        const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
        const pageUrl = `${clientUrl}/admin/memberships/${req.params.id}?pdf=true`;
        console.log('Navigating to:', pageUrl);
        try {
            await page.goto(pageUrl, {
                waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
                timeout: 60000
            });
            // Wait for React to load
            await page.waitForFunction(() => typeof window !== 'undefined', { timeout: 10000 }).catch(() => {
                console.log('React not detected, continuing anyway...');
            });
            // Wait a bit more for the app to initialize
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
        catch (navError) {
            console.error('Navigation error:', navError);
            await browser.close();
            return res.status(500).json({ ok: false, error: 'Failed to load page for PDF generation' });
        }
        // Wait for content to load
        try {
            // Wait for basic page content
            await page.waitForSelector('body', { timeout: 10000 });
            console.log('Page body loaded');
            // Try to find the PDF content
            const pdfRoot = await page.$('.pdf-root');
            if (pdfRoot) {
                console.log('PDF root found');
            }
            else {
                console.log('PDF root not found, proceeding anyway');
            }
            console.log('PDF content loaded successfully');
        }
        catch (selectorError) {
            console.error('Selector wait error:', selectorError);
            // Debug: Take a screenshot and log page content
            try {
                const screenshot = await page.screenshot({ encoding: 'base64' });
                console.log('Page screenshot taken, length:', screenshot.length);
            }
            catch (screenshotError) {
                console.log('Could not take screenshot:', screenshotError.message);
            }
            try {
                const content = await page.content();
                console.log('Page content preview:', content.substring(0, 500));
            }
            catch (contentError) {
                console.log('Could not get page content:', contentError.message);
            }
            await browser.close();
            return res.status(500).json({ ok: false, error: 'PDF content failed to load' });
        }
        // Hide any elements that shouldn't be in PDF
        await page.addStyleTag({
            content: `
        .print-footer { display: none !important; }
        nav, header, .admin-nav { display: none !important; }
        @media print {
          .print-footer { display: none !important; }
        }
      `
        });
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: false,
            displayHeaderFooter: false,
            margin: {
                top: '10mm',
                right: '10mm',
                bottom: '10mm',
                left: '10mm'
            }
        });
        await browser.close();
        console.log('PDF generated successfully');
        const safeName = String(item.fullName || 'application').replace(/[^a-z0-9\-]+/gi, '_');
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${safeName}_application.pdf"`);
        res.send(pdf);
    }
    catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ ok: false, error: 'Failed to generate PDF' });
    }
});
// Submit new application
router.post('/api/membership/apply', upload.single('photo'), async (req, res) => {
    try {
        const applicationData = {
            ...req.body,
            photoPath: req.file ? `/uploads/members/${req.file.filename}` : undefined,
            status: 'submitted',
            createdAt: new Date()
        };
        // Parse JSON fields
        if (req.body.extra) {
            try {
                applicationData.extra = JSON.parse(req.body.extra);
            }
            catch (e) {
                console.error('Error parsing extra data:', e);
            }
        }
        const application = new MemberApplication_1.MemberApplication(applicationData);
        await application.save();
        res.json({ ok: true, message: 'Application submitted successfully' });
    }
    catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ ok: false, error: 'Failed to submit application' });
    }
});
exports.default = router;
