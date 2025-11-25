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

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static uploads
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

// API health check
app.get('/api/health', (_req: Request, res: Response) => {
	res.json({ status: 'ok' });
});

app.use(adminRouter);
app.use(contactRouter);
app.use(newsRouter);
app.use(eventsRouter);
app.use(membershipRouter);
app.use('/api/user', userRouter);
app.use('/api/classifieds', classifiedsRouter);

// Root endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({ 
    message: 'KKMA API Server',
    status: 'running',
    endpoints: {
      health: '/api/health',
      admin: '/api/admin/*',
      contact: '/api/contact',
      news: '/api/news',
      events: '/api/events',
      membership: '/api/membership',
      user: '/api/user/*',
      classifieds: '/api/classifieds/*'
    }
  });
});

const PORT = process.env.PORT || 4001;

async function start() {
  await connectToDatabase();
  await ensureAdminUser();
  app.listen(PORT, () => {
  	console.log(`Server listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
}); 