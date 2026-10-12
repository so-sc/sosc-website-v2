import { satteri } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import imgAttr from "satteri-imgattr";

export default defineConfig({
  site: "https://www.sosc.org.in",
  prefetch: {
    prefetchAll: false,
  },
  markdown: {
    processor: satteri({
      mdastPlugins: [
        imgAttr({ defaults: { loading: "lazy", decoding: "async" } }),
      ],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), mdx(), sitemap(), icon()],
});
