import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// View config documentation here:
// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true
  }
});
