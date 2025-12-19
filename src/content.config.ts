import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const events = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/events",
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      date: z.coerce.date(),
      location: z.string(),
      cover: image().optional(),
    }),
});

const blogs = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/blogs",
  }),
  schema: ({ image }) =>
    z.object({
      author: z.string(),
      cover: image().optional(),
      date: z.coerce.date(),
      description: z.string(),
      name: z.string(),
      tags: z.string().optional(),
      title: z.string(),
    }),
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cover: image().optional(),
      date: z.coerce.date(),
      techStack: z.array(z.string()),
      maintainers: z.array(z.string()),
      status: z.enum(["active", "maintained", "archived", "completed", "in-progress"]),
      category: z.string(),
      tags: z.array(z.string()).optional(),
      github: z.string().optional(),
      demo: z.string().optional(),
      documentation: z.string().optional(),
      featured: z.boolean().optional().default(false),
    }),
});

export const collections = {
  events,
  blogs,
  projects,
};
