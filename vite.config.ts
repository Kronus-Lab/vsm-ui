import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import msw from "@iodigital/vite-plugin-msw";
import handlers from "./mocks/handlers";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    msw({ mode: "node", handlers }),
  ]
})
