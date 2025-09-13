import dotenv from "dotenv";
dotenv.config();
import { globSync } from "tinyglobby";

// import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

import expressiveCode from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
// import tailwindcss from "@tailwindcss/vite";
// import { PostCollections } from "./src/shared/dataCache";
// import { toDate } from "./src/shared/dateUtils";
import { statSync } from "fs";

// import remarkMermaid from 'remark-mermaidjs'

// import { rehypeHeadingIds } from '@astrojs/markdown-remark'
// import rehypeAutolinkHeadings from 'rehype-autolink-headings'
const siteUrl = "https://danlevy.net";
const ignorePaths = ["/404", "/404.html", "/500", "/500.html", "/pages/", "/category/"];

// https://astro.build/config
export default defineConfig({
  output: "static",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
  cacheDir: ".cache",
  site: siteUrl,
  markdown: {
    // remarkPlugins: [remarkMermaid],
  },
  
  vite: {
    // plugins: [tailwindcss({})],
    build: {
      target: 'es2020',
      assetsInlineLimit: 4096,
      // assetsInlineLimit: 2048, // 2kb - default is 4096
      rollupOptions: {
        treeshake: {
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          unknownGlobalSideEffects: false
        },
        output: {
          manualChunks: (id) => {
            // Quiz components - only load on quiz pages
            if (id.includes('QuizUI/') ||
                id.includes('QuizGrid') ||
                id.includes('QuizCard') ||
                id.includes('Challenge.tsx') ||
                id.includes('QuizFilter') ||
                id.includes('QuizContext') ||
                id.includes('HintTooltip') ||
                id.includes('QuestionStore')) {
              return 'quiz';
            }
            
            // Analytics - deferred loading
            if (id.includes('posthog-js')) {
              return 'analytics';
            }
            
            // Heavy UI libraries
            if (id.includes('lucide-react') ||
                id.includes('framer-motion') ||
                id.includes('@radix-ui/react-dialog') ||
                id.includes('@radix-ui/react-tooltip') ||
                id.includes('@radix-ui/react-popover') ||
                id.includes('embla-carousel')) {
              return 'ui-libs';
            }
            
            // React and core libs
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react';
            }
            
            // Astro core
            if (id.includes('astro')) {
              return 'astro-core';
            }
            
            // Lodash utilities
            if (id.includes('lodash')) {
              return 'utils';
            }
            
            // Node modules that are large
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
            return `[name]-[hash].js`;
          }
        }
      }
    },
    optimizeDeps: {
      exclude: [
        // Exclude quiz components from pre-bundling for better splitting
        '@/components/QuizUI/QuizUI',
        '@/components/QuizUI/QuizGrid',
        '@/components/QuizUI/Challenge',
        // Exclude analytics for deferred loading
        'posthog-js/dist/recorder',
        'posthog-js/dist/exception-autocapture',
        'posthog-js/dist/tracing-headers',
        'posthog-js/dist/web-vitals'
      ]
    }
  },
  // experimental: {
  //   contentIntellisense: true,
  //   svg: true,
  //   responsiveImages: true,
  // },

  integrations: [
    pagefind(),
    react({
    }),
    expressiveCode({
      // themes: ['dracula', 'solarized-light'],
      themes: ["dracula"],
      plugins: ["line-numbers"],
    }),
    mdx({
      // rehypePlugins: [rehypeHeadingIds, rehypeAutolinkHeadings],
    }),
    sitemap({
      lastmod: new Date(),
      entryLimit: 10000,
      serialize: (item) => {
        const slug = getSlugFromUrl(item.url);
        // const post = PostCollections.getPostsBySlugs([slug])[0];
        // const modified = toDate(post?.data?.modified ?? post?.data?.date ?? new Date());
        // use tinyglobby to get the file modified date
        const files = globSync(`**/*${slug}*/**/index.md*`, { cwd: "src", absolute: true });

        // const initialLastmod = item.lastmod;

        if (files.length > 0) {
          const file = files[0];
          const stats = statSync(file);
          item.lastmod = stats.mtime;
        }

        // console.log(item.url, item.lastmod, initialLastmod);

        return item;
      },
      filter: (page) => {
        

        const isIgnoredPath = ignorePaths.every((path) => {
          return !page.includes(path);
        });

        return isIgnoredPath;
      },
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

function getSlugFromUrl(url) {
  return url?.split(/\/+/).filter(Boolean).pop();
}
