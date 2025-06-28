import { startServer } from './dist/server/entry.mjs';

const port = process.env.PORT || 3000;
console.log(`Starting server at http://localhost:${port}`);

startServer({ port });
