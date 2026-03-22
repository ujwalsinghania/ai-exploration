import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import istanbul from "vite-plugin-istanbul";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    istanbul({
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["node_modules"],
      extension: [".ts", ".tsx"],
      requireEnv: true,
      forceBuildInstrument: false,
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test-setup.ts",
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json"],
      reportsDirectory: ".coverage-unit",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/main.tsx", "src/vite-env.d.ts", "src/test-setup.ts"],
    },
  },
});
