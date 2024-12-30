import dotenv from "dotenv";
dotenv.config();

// import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import pagefind from "astro-pagefind";

import expressiveCode from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
// import remarkMermaid from 'remark-mermaidjs'

// import { rehypeHeadingIds } from '@astrojs/markdown-remark'
// import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// https://astro.build/config
export default defineConfig({
  output: "static",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
  cacheDir: ".cache",
  site: "https://danlevy.net",
  markdown: {
    // remarkPlugins: [remarkMermaid],
  },
  vite: {
    build: {
      assetsInlineLimit: 2048, // 2kb - default is 4096
    },
  },
  experimental: {
    contentIntellisense: true,
    svg: true,
    responsiveImages: true,
  },

  integrations: [
    pagefind(),
    react({}),
    expressiveCode({
      // themes: ['dracula', 'solarized-light'],
      themes: ["dracula"],
      plugins: ["line-numbers"],
    }),
    mdx({
      // rehypePlugins: [rehypeHeadingIds, rehypeAutolinkHeadings],
    }),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
    // partytown(),
  ],
  plugins: [
    pluginLineNumbers(),
    // visualizer({
    //   brotliSize: true,
    //   gzipSize: true,
    //   template: "treemap",
    //   // open: true,
    //   title: "Bundle Stats",
    //   emitFile: true,
    //   filename: "bundle-stats.html",
    // }),
  ],
  image: {
    service: {
      config: {
        limitInputPixels: false,
      },
    },
  },
});
