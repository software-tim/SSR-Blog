import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
    port: parseInt(process.env.PORT) || 8080,
    integrations: [react()],
  }),
   integrations: [
    tailwind(), 
      ],
  build: {
    client: './client',
    server: './server'
  }
});
