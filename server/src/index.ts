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

// Serve static uploads
app.use('/uploads', express.static(path.resolve(__dirname, '../../uploads')));

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

// Serve static files from client dist (both development and production)
// Try multiple possible paths to find client dist
const possiblePaths = [
  path.resolve(__dirname, '../../../client/dist'),  // Production: /app/server/dist/src -> /app/client/dist
  path.resolve(__dirname, '../../client/dist'),     // Alternative path
  path.resolve(__dirname, '../../../../client/dist'), // Another alternative
  path.resolve(process.cwd(), 'client/dist'),       // From current working directory
];

let clientDistPath = possiblePaths[0]; // Default to first path
let found = false;

for (const testPath of possiblePaths) {
  if (fs.existsSync(testPath) && fs.existsSync(path.join(testPath, 'index.html'))) {
    clientDistPath = testPath;
    found = true;
    console.log(`[INFO] Serving client from: ${clientDistPath}`);
    break;
  }
}

if (!found) {
  console.error('[ERROR] Client dist directory not found! Tried:');
  possiblePaths.forEach(p => console.error(`  - ${p}`));
  console.error(`[DEBUG] __dirname: ${__dirname}`);
  console.error(`[DEBUG] process.cwd(): ${process.cwd()}`);
}

app.use(express.static(clientDistPath));

// Handle SPA routing - serve index.html for all non-API routes
app.get('*', (_req: Request, res: Response) => {
  const indexPath = path.join(clientDistPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ error: 'Frontend not found. Client dist directory may not be built correctly.' });
  }
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