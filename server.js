import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import { parseSlides } from './lib/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// Configurable HTTP Basic Authentication
const AUTH_USER = process.env.AUTH_USER;
const AUTH_PASS = process.env.AUTH_PASS;

if (AUTH_USER && AUTH_PASS) {
  console.log(`🔐 Basic Authentication enabled for user: "${AUTH_USER}"`);
  app.use((req, res, next) => {
    // Exclude healthcheck route from auth if needed
    if (req.path === '/health') return next();

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.setHeader('WWW-Authenticate', 'Basic realm="GDG Presentation Secure Portal"');
      return res.status(401).send('Authentication required to view presentation.');
    }

    const auth = Buffer.from(authHeader.split(' ')[1] || '', 'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];

    if (user === AUTH_USER && pass === AUTH_PASS) {
      return next();
    } else {
      res.setHeader('WWW-Authenticate', 'Basic realm="GDG Presentation Secure Portal"');
      return res.status(401).send('Invalid username or password.');
    }
  });
} else {
  console.log('🔓 Auth bypassed (AUTH_USER / AUTH_PASS environment variables not set).');
}

// Health check endpoint for Cloud Run
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Slides API endpoint
app.get('/api/slides', (req, res) => {
  try {
    const slidesPath = path.join(__dirname, 'slides.md');
    const slides = parseSlides(slidesPath);
    res.json({ success: true, count: slides.length, slides });
  } catch (err) {
    console.error('Error reading slides.md:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Active Server-Sent Events (SSE) clients for live reload
const liveReloadClients = new Set();

app.get('/api/live-reload', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // Disable proxy buffering (Nginx/Cloud Run)
  if (res.flushHeaders) res.flushHeaders();

  // Send initial connection packet
  res.write('data: {"type":"connected"}\n\n');
  liveReloadClients.add(res);

  // Heartbeat ping every 25 seconds
  const heartbeatTimer = setInterval(() => {
    try {
      res.write(': heartbeat\n\n');
    } catch {
      clearInterval(heartbeatTimer);
      liveReloadClients.delete(res);
    }
  }, 25000);

  req.on('close', () => {
    clearInterval(heartbeatTimer);
    liveReloadClients.delete(res);
  });
});

/**
 * Broadcast an event to all connected live-reload browser clients
 */
function broadcastLiveEvent(event) {
  const payload = `data: ${JSON.stringify(event)}\n\n`;
  for (const client of liveReloadClients) {
    try {
      client.write(payload);
    } catch {
      liveReloadClients.delete(client);
    }
  }
}

// Watch slides.md for live in-place slide content updates
const slidesFilePath = path.join(__dirname, 'slides.md');
let slidesDebounceTimer = null;
try {
  fs.watch(slidesFilePath, (eventType) => {
    clearTimeout(slidesDebounceTimer);
    slidesDebounceTimer = setTimeout(() => {
      console.log('⚡ [Live Reload] slides.md updated -> broadcasting in-place update');
      broadcastLiveEvent({ type: 'slides-updated', timestamp: Date.now() });
    }, 150);
  });
  console.log('👀 Watching slides.md for live updates');
} catch (err) {
  console.warn('⚠️ Could not attach file watcher to slides.md:', err.message);
}

// Watch public/ directory for frontend asset updates (CSS, JS, images, index.html)
const publicDirPath = path.join(__dirname, 'public');
let publicDebounceTimer = null;
try {
  fs.watch(publicDirPath, { recursive: true }, (eventType, filename) => {
    clearTimeout(publicDebounceTimer);
    publicDebounceTimer = setTimeout(() => {
      console.log(`⚡ [Live Reload] public asset changed (${filename}) -> broadcasting page reload`);
      broadcastLiveEvent({ type: 'page-reload', filename, timestamp: Date.now() });
    }, 200);
  });
  console.log('👀 Watching public/ directory for live updates');
} catch (err) {
  console.warn('⚠️ Could not attach file watcher to public/ directory:', err.message);
}

// Serve static frontend assets
app.use(express.static(path.join(__dirname, 'public')));

// Explicit route for /download
app.get('/download', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'download.html'));
});

// Catch-all route to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`🚀 GDG Presentation Server running on http://${HOST}:${PORT}`);
  console.log(`📡 Ready for Google Cloud Run deployment on port ${PORT}`);
});
