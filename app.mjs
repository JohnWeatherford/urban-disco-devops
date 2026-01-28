// app.mjs
// we are in ES6, use this.
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();

// ES module equivalents of __dirname / __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* =========================
   GLOBAL MIDDLEWARE
========================= */

// parse JSON bodies
app.use(express.json());

// parse form data
app.use(express.urlencoded({ extended: true }));

// serve static files (css, js, images, etc.)
app.use(express.static(join(__dirname, 'public')));

/* =========================
   ROUTES
========================= */

// home route
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

// simple JSON response
app.get('/json', (req, res) => {
  const myVar = 'Hello from server!';
  res.json({ myVar });
});

// query param example
// /api/query?name=Barry
app.get('/api/query', (req, res) => {
  console.log('client request with query param:', req.query.name);
  res.json({ name: req.query.name });
});

// POST example (JSON or form)
app.post('/api/data', (req, res) => {
  console.log('POST body:', req.body);
  res.json({
    status: 'success',
    received: req.body
  });
});

/* =========================
   ERROR HANDLING
========================= */

// server error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong on the server'
  });
});

// 404 handler (must be last)
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
