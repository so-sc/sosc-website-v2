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

export const collections = {
  events,
};
