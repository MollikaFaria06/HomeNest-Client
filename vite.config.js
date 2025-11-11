import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // using the plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
