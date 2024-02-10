import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxying API requests to your local backend server
      "/api": {
        target: "http://localhost:3001", // Target your local Express server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Optionally rewrite the path
      },
    },
  },
});
