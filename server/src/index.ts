import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { connectToDatabase } from './db';
import adminRouter from './routes/admin';
import { ensureAdminUser } from './models/AdminUser';
import contactRouter from './routes/contact';
import newsRouter from './routes/news';
import eventsRouter from './routes/events';
import membershipRouter from './routes/membership';
import userRouter from './routes/user';
import classifiedsRouter from './routes/classifieds';

// Load env from project root first, then override with server/.env if present
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

// Health check for Coolify - MUST be first
app.get('/health', (_req: Request, res: Response) => {
	res.status(200).send('OK');
});

// API health check with DB status
app.get('/api/health', async (_req: Request, res: Response) => {
	try {
		const mongoose = require('mongoose');
		const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
		res.json({ 
			status: 'ok',
			database: dbStatus,
			timestamp: new Date().toISOString()
		});
	} catch (error) {
		res.status(500).json({ 
			status: 'error',
			message: 'Health check failed'
		});
	}
});

// Serve static uploads
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

// API routes
app.use(adminRouter);
app.use(contactRouter);
app.use(newsRouter);
app.use(eventsRouter);
app.use(membershipRouter);
app.use('/api/user', userRouter);
app.use('/api/classifieds', classifiedsRouter);

// Serve static files from client dist
const clientDistPath = path.resolve(__dirname, '../../client/dist');
const indexPath = path.join(clientDistPath, 'index.html');

console.log('[startup] Client dist path:', clientDistPath);
console.log('[startup] Index.html path:', indexPath);
console.log('[startup] Client dist exists:', fs.existsSync(clientDistPath));
console.log('[startup] Index.html exists:', fs.existsSync(indexPath));

if (fs.existsSync(clientDistPath)) {
	console.log('[startup] Serving static files from:', clientDistPath);
	app.use(express.static(clientDistPath));
} else {
	console.error('[startup] ERROR: Client dist folder not found at:', clientDistPath);
	console.error('[startup] Current working directory:', process.cwd());
	console.error('[startup] __dirname:', __dirname);
}

// Handle SPA routing - serve index.html for all non-API routes (must be LAST)
app.get('*', (req: Request, res: Response) => {
	// Skip API routes
	if (req.path.startsWith('/api/')) {
		return res.status(404).json({ error: 'API route not found' });
	}
	
	if (fs.existsSync(indexPath)) {
		console.log('[spa] Serving index.html for:', req.path);
		res.sendFile(indexPath, (err) => {
			if (err) {
				console.error('[spa] Error serving index.html:', err.message);
				if (!res.headersSent) {
					res.status(500).json({ error: 'Failed to serve frontend' });
				}
			}
		});
	} else {
		console.error('[spa] ERROR: index.html not found at:', indexPath);
		if (!res.headersSent) {
			res.status(500).json({ 
				error: 'Frontend not built',
				message: 'Please ensure the client is built: npm run build -w @kkma/client',
				path: indexPath
			});
		}
	}
});

const PORT = process.env.PORT || 4001;

async function start() {
	// Start server FIRST (so health checks work immediately)
	app.listen(PORT, () => {
		console.log(`[startup] Server listening on http://localhost:${PORT}`);
		console.log(`[startup] Health check: http://localhost:${PORT}/health`);
	});

	// Connect to database in background (non-blocking)
	try {
		console.log('[startup] Connecting to database...');
		await connectToDatabase();
		console.log('[startup] Database connected successfully');
		
		await ensureAdminUser();
		console.log('[startup] Admin user ready');
	} catch (err) {
		console.error('[startup] Database connection failed (server still running):', err);
		console.error('[startup] Health checks will work, but API endpoints may fail');
		// Don't exit - let health checks work even if DB is down
	}
}

start().catch((err) => {
	console.error('[startup] Failed to start server:', err);
	process.exit(1);
}); 