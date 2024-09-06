import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import pagefind from "astro-pagefind";
import criticalCSS from "astro-critical-css";

// https://astro.build/config
export default defineConfig({
  output: "static",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },

  site: "https://danlevy.net",
  integrations: [
    pagefind(),
    react({
    }),
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
			nesting: true,
    }),
    criticalCSS(),
  ],
  image: {
    service: {
       config: {
        limitInputPixels: false,
      },
     },
  },
});
