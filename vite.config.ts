import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@engine": resolve(__dirname, "src/engine"),
      "@game": resolve(__dirname, "src/game"),
      "@assets": resolve(__dirname, "src/assets"),
    },
  },
});