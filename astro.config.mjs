// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

import icon from "astro-icon";

const rehypeLazyImages = () => {
  return (/** @type {any} */ tree) => {
    const visit = (/** @type {any} */ node) => {
      if (!node || typeof node !== "object") return;
      if (Array.isArray(node)) {
        node.forEach(visit);
        return;
      }

      if (node.type === "element" && node.tagName === "img") {
        node.properties ??= {};

        // Respect explicitly-set attributes
        node.properties.loading ??= "lazy";
        node.properties.decoding ??= "async";
      }

      if (Array.isArray(node.children)) node.children.forEach(visit);
    };

    visit(tree);
  };
};

// https://astro.build/config
export default defineConfig({
  site: "https://www.sosc.org.in",
  prefetch: {
    prefetchAll: false,
  },
  markdown: {
    rehypePlugins: [rehypeLazyImages],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), mdx({ rehypePlugins: [rehypeLazyImages] }), sitemap({}), icon()],
});
