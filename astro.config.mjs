// @ts-check
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "server",
  base: "/",
  compressHTML: true,
  prefetch: true,
  site: "https://ichiban-clone.vercel.app/",

  image: {
    domains: ["https://res.cloudinary.com"],
  },

  experimental: {
    svg: {
      mode: "sprite",
    },
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
