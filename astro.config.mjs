// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  base: "/",
  compressHTML: true,
  prefetch: true,
  devToolbar: {
    enabled: false,
  },
  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
});
