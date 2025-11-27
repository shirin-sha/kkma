import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
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

// Health checks FIRST - before anything else (so Coolify can check status)
app.get('/health', (_req: Request, res: Response) => {
	res.status(200).send('OK');
});

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

app.use(adminRouter);
app.use(contactRouter);
app.use(newsRouter);
app.use(eventsRouter);
app.use(membershipRouter);
app.use('/api/user', userRouter);
app.use('/api/classifieds', classifiedsRouter);

// Serve static files from client dist (both development and production)
const clientDistPath = path.resolve(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

// Handle SPA routing - serve index.html for all non-API routes
app.get('*', (_req: Request, res: Response) => {
  const indexPath = path.join(clientDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('[static] Error serving index.html:', err.message);
      res.status(500).json({ error: 'Frontend not built or not found' });
    }
  });
});

const PORT = process.env.PORT || 4001;

async function start() {
  // Start server first (so health checks work)
  app.listen(PORT, () => {
  	console.log(`Server listening on http://localhost:${PORT}`);
  	console.log(`Health check available at http://localhost:${PORT}/health`);
  });

  // Connect to database (non-blocking, health check works without it)
  try {
    await connectToDatabase();
    await ensureAdminUser();
    console.log('[startup] Database connected and admin user ready');
  } catch (err) {
    console.error('[startup] Database connection failed, but server is running:', err);
    console.error('[startup] Health checks will work, but API endpoints may fail');
    // Don't exit - let health checks work even if DB is down
  }
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
}); 