// @ts-check
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "static",
  base: "/",
  compressHTML: true,
  prefetch: true,

  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },

  adapter: vercel({ webAnalytics: { enabled: true } }),
});
