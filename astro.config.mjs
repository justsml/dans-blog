import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  output: "static",
  trailingSlash: "ignore",
  build: {
    format: "directory"
  },
  site: "https://danlevy.net",
  integrations: [pagefind(), preact({ compat: true }), mdx(), sitemap(), tailwind({
    applyBaseStyles: false,
    nesting: true
  })],
  image: {
    service: {
      config: {
        limitInputPixels: false
      }
    }
  }
});