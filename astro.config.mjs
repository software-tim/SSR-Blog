import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [
    react(),
    tailwind()
  ],
  build: {
    client: './client',
    server: './server'
  },
  vite: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    },
    server: {
      proxy: {
        // Proxy search API calls to our MCP search server
        '/api': {
          target: process.env.SEARCH_SERVER_URL || 'http://localhost:8081',
          changeOrigin: true,
          secure: false
        }
      }
    }
  },
  server: {
    host: process.env.HOST || "0.0.0.0",
    port: parseInt(process.env.PORT) || 8080
  }
});
