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
import { NewsPost } from './models/NewsPost';

// Load env from project root first, then override with server/.env if present
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

// Serve static uploads with cache headers for faster loading
app.use('/uploads', express.static(path.resolve(__dirname, '../../uploads'), {
  maxAge: '1y', // Cache for 1 year
  etag: true,
  lastModified: true
}));

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

// Helper to detect social media crawlers
function isSocialCrawler(userAgent: string): boolean {
  const crawlers = [
    'facebookexternalhit',
    'Facebot',
    'Twitterbot',
    'LinkedInBot',
    'WhatsApp',
    'whatsapp',
    'TelegramBot',
    'Slackbot',
    'SkypeUriPreview',
    'Googlebot',
    'bingbot'
  ];
  const ua = userAgent.toLowerCase();
  const isCrawler = crawlers.some(c => ua.includes(c.toLowerCase()));
  if (isCrawler) {
    console.log(`[meta] Detected crawler: ${userAgent}`);
  }
  return isCrawler;
}

// Handle SPA routing - serve index.html for all non-API routes
app.get('*', async (req: Request, res: Response) => {
  const indexPath = path.join(clientDistPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    return res.status(404).json({ error: 'Frontend not found. Client dist directory may not be built correctly.' });
  }

  // For social crawlers on news pages, inject meta tags server-side
  const newsMatch = req.path.match(/^\/media\/news-and-updates\/([a-fA-F0-9]{24})$/);
  const userAgent = req.headers['user-agent'] || '';

  const origin = `${req.protocol}://${req.get('host')}`;
  const pageUrl = `${origin}${req.path}`;
  const logoUrl = `${origin}/logo/KKMA-LOGO.png`;

  // For all crawlers, set absolute URLs immediately (faster loading)
  if (isSocialCrawler(userAgent)) {
    let html = fs.readFileSync(indexPath, 'utf-8');
    
    let imageUrl = logoUrl; // Default to logo
    
    // For news pages, get the news image and update title
    if (newsMatch) {
      try {
        const newsId = newsMatch[1];
        console.log(`[meta] Fetching news for ID: ${newsId}`);
        const newsItem = await NewsPost.findById(newsId).lean();
        if (newsItem) {
          const title = newsItem.title || 'KKMA News';
          console.log(`[meta] Setting title: ${title}`);
          
          // Use news image if available, otherwise fall back to logo
          if (newsItem.imagePath) {
            imageUrl = `${origin}${newsItem.imagePath}`;
            console.log(`[meta] Using news image: ${imageUrl}`);
          } else if (newsItem.img) {
            imageUrl = newsItem.img.startsWith('http') ? newsItem.img : `${origin}${newsItem.img}`;
            console.log(`[meta] Using news img: ${imageUrl}`);
          } else {
            console.log(`[meta] No news image found, using default logo: ${logoUrl}`);
          }
          
          // Update document title
          html = html.replace(/<title>[^<]*<\/title>/i, `<title>${title.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</title>`);
          
          // Update or add og:title
          if (html.includes('property="og:title"')) {
            html = html.replace(
              /<meta\s+property=["']og:title["'][^>]*>/i,
              `<meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />`
            );
          } else {
            // Insert after og:type if og:title doesn't exist
            html = html.replace(
              /(<meta\s+property=["']og:type["'][^>]*>)/i,
              `$1\n\t\t<meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />`
            );
          }
        } else {
          console.log(`[meta] News item not found for ID: ${newsId}`);
        }
      } catch (err) {
        console.error('[meta] Error fetching news:', err);
      }
    }
    
    // Set absolute URLs for og:image and og:url (faster for crawlers)
    // Remove existing og:image meta tags first
    html = html.replace(/<meta\s+property=["']og:image[^>]*>/gi, '');
    html = html.replace(/<meta\s+property=["']og:image:width[^>]*>/gi, '');
    html = html.replace(/<meta\s+property=["']og:image:height[^>]*>/gi, '');
    html = html.replace(/<meta\s+property=["']og:image:type[^>]*>/gi, '');
    html = html.replace(/<meta\s+property=["']og:image:secure_url[^>]*>/gi, '');
    
    // Use HTTPS for secure_url if origin is HTTPS, otherwise use same protocol
    const secureImageUrl = origin.startsWith('https') ? imageUrl.replace('http://', 'https://') : imageUrl;
    
    // Insert og:image meta tags after og:type for better compatibility
    html = html.replace(
      /(<meta\s+property=["']og:type["'][^>]*>)/i,
      `$1\n\t\t<meta property="og:image" content="${imageUrl}" />\n\t\t<meta property="og:image:secure_url" content="${secureImageUrl}" />\n\t\t<meta property="og:image:type" content="image/jpeg" />`
    );
    
    html = html.replace(
      /<meta\s+property=["']og:url["'][^>]*>/i,
      `<meta property="og:url" content="${pageUrl}" />`
    );
    html = html.replace(
      /<meta\s+name=["']twitter:image["'][^>]*>/i,
      `<meta name="twitter:image" content="${imageUrl}" />`
    );
    
    return res.send(html);
  }

  res.sendFile(indexPath);
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