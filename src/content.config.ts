import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const events = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/events",
  }),
  schema: z.object({
    name: z.string(),
    date: z.coerce.date(),
    location: z.string(),
    cover: z.string().optional(),
  }),
});

const blogs = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/blogs",
  }),
  schema: z.object({
    author: z.string(),
    cover: z.string().optional(),
    date: z.coerce.date(),
    description: z.string(),
    name: z.string(),
    tags: z.string().optional(),
    title: z.string(),
  }),
});

export const collections = {
  events,
  blogs,
};
