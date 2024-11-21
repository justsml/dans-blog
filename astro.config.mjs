import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import pagefind from "astro-pagefind";

import expressiveCode from "astro-expressive-code";
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

// https://astro.build/config
export default defineConfig({
  output: "static",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
  cacheDir: ".cache",
  site: "https://danlevy.net",
  integrations: [
    pagefind(),
    react({}),
    expressiveCode({
      // themes: ['dracula', 'solarized-light'],
      themes: ['dracula', 'solarized-dark'],
    }),
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
  ],
  plugins: [pluginLineNumbers()],
  image: {
    service: {
      config: {
        limitInputPixels: false,
      },
    },
  },
});
