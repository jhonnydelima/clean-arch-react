/// <reference types="vitest" />

import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@domain": path.resolve(__dirname, "./src/domain"),
    },
  },
  test: {
    globals: true,
    setupFiles: ["./test/setup.ts"],
    environment: "happy-dom",
    include: ["**/(*.)?{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", "dist", ".idea", ".git", ".cache"],
    coverage: {
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
      include: ["**/(*.)?{test,spec}.{ts,tsx}"],
    },
  },
});
