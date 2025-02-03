// @ts-check
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
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

  adapter: vercel({ webAnalytics: { enabled: true } }),
});
