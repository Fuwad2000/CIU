import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
      "@backend": path.resolve(__dirname, "backend"),
      "@frontend": path.resolve(__dirname, "frontend"),
      "@email": path.resolve(__dirname, "services/email"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
});
