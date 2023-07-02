import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import { createProxyMiddleware } from "http-proxy-middleware";
import dns from "dns";
import path from 'path';

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), mkcert()],
//   base: '/',
//   server: {
//     host: "localhost",
//     proxy: {
//       '/api': {
//         target: 'https://localhost:7135',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//     },
//   },
// });

export default defineConfig(({command, mode}) => ({
  plugins: [react(), mkcert()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
      port: 5173,
      proxy: {
          '/api': {
              target: 'https://localhost:7135',
              changeOrigin: true,
              headers: { cookie: 'JSESSIONID=FRCm9jB1wsuNd4sRhPrxsGVF' },
          },
      },
  },
}));
