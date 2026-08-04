import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import cloudflare from "@astrojs/cloudflare"
import vercel from "@astrojs/vercel"

const isVercel = Boolean(process.env.VERCEL)

export default defineConfig({
  integrations: [react()],
  adapter: isVercel ? vercel() : cloudflare(),
  site: isVercel ? "https://karsa-uniform.vercel.app" : "https://rollercustomize.com",
  server: {
    host: true,
  },
  vite: {
    server: {
      allowedHosts: [".ngrok-free.dev", ".ngrok.io", "bulk-wannabe-deletion.ngrok-free.dev", "localhost", "127.0.0.1"],
    },
  },
})
