import { defineConfig } from "vite"

export default defineConfig({
  server: {
    allowedHosts: [".ngrok-free.dev", ".ngrok.io", "bulk-wannabe-deletion.ngrok-free.dev", "localhost", "127.0.0.1"],
  },
})
