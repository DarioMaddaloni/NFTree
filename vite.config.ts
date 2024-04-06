import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import checker from "vite-plugin-checker"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
    }),
  ],
  define: {
    "process.env": process.env,
  },
  server: {
    open: true,
  },
})
