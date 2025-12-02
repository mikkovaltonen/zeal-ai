import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: 8080,
    open: true,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        faq: path.resolve(__dirname, "faq.html"),
        careers: path.resolve(__dirname, "careers.html"),
      },
    },
  },
  // Exclude api folder from processing (Vercel serverless functions)
  optimizeDeps: {
    exclude: ["api"],
  },
});
