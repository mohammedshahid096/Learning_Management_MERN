import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "shahid-34",
    project: "javascript-react"
  })],

  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },

  build: {
    sourcemap: true
  }
});