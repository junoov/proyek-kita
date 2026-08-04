import { defineConfig } from "astro/config"
import react from "@astrojs/react"

export default defineConfig({
  integrations: [react()],
  site: "https://rollercustomize.com",
  server: {
    host: true,
  },
  vite: {
    server: {
      allowedHosts: [".ngrok-free.dev", ".ngrok.io", "bulk-wannabe-deletion.ngrok-free.dev", "localhost", "127.0.0.1"],
    },
  },
})
