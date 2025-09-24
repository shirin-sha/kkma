"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./db");
const admin_1 = __importDefault(require("./routes/admin"));
const AdminUser_1 = require("./models/AdminUser");
const contact_1 = __importDefault(require("./routes/contact"));
const news_1 = __importDefault(require("./routes/news"));
const events_1 = __importDefault(require("./routes/events"));
const membership_1 = __importDefault(require("./routes/membership"));
// Load env from project root first, then override with server/.env if present
dotenv_1.default.config();
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Serve static uploads
app.use('/uploads', express_1.default.static(path_1.default.resolve(__dirname, '../uploads')));
app.get('/', (_req, res) => {
    res.send('KKMA API is running. Try GET /api/health');
});
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.use(admin_1.default);
app.use(contact_1.default);
app.use(news_1.default);
app.use(events_1.default);
app.use(membership_1.default);
const PORT = process.env.PORT || 4001;
async function start() {
    await (0, db_1.connectToDatabase)();
    await (0, AdminUser_1.ensureAdminUser)();
    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    });
}
start().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
