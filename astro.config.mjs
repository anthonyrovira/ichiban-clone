// @ts-check
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "static",
  base: "/",
  compressHTML: true,
  prefetch: true,

  devToolbar: {
    enabled: false,
  },

  build: {
    assets: "/src/assets",
  },

  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },

  adapter: vercel({ webAnalytics: { enabled: true } }),
});
