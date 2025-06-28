import { handler } from './server/entry.mjs';
import { createServer } from 'http';

const PORT = process.env.PORT || 8080;

createServer(handler).listen(PORT, () => {
  console.log(`✅ Astro SSR server running on http://localhost:${PORT}`);
});
