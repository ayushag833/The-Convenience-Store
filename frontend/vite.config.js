import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://the-convenience-store.onrender.com/",
      "/uploads/": "https://the-convenience-store.onrender.com/",
    },
  },
});
