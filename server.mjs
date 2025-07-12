// server.mjs
import { handler } from './server/entry.mjs';
import express from 'express';
import searchRouter from './lib/search-router.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Mount the search API under /api
app.use('/api', searchRouter);

// Mount the Astro SSR handler for all other routes
app.all('*', handler);

app.listen(PORT, () => {
  console.log(`✅ Astro SSR + Search API running at http://localhost:${PORT}`);
});
