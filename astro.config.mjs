import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "static",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },

  site: "https://danlevy.net",
  integrations: [
    react({
      // experimentalReactChildren: true,
    }),
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: true,
			nesting: true,
			
    }),
  ],
  image: {
    // Example: Enable the Sharp-based image service with a custom config
    service: {
      //  entrypoint: 'astro/assets/services/sharp',
       config: {
         limitInputPixels: false,
      },
     },
  },

  // prefetch: {
  // 	defaultStrategy: 'viewport', // 'hover',
  // }
});
