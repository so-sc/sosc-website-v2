import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import slugify from "slugify";

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
      status: z.enum([
        "active",
        "maintained",
        "archived",
        "completed",
        "in-progress",
      ]),
      category: z.string(),
      tags: z.array(z.string()).optional(),
      github: z.string().optional(),
      demo: z.string().optional(),
      documentation: z.string().optional(),
      community: z.boolean().optional().default(false),
      order: z.number().optional(),
    }),
});

export const RESOURCE_TYPES = [
  "course",
  "guide",
  "docs",
  "video",
  "book",
  "roadmap",
  "cheatsheet",
  "practice",
  "tool",
  "repo",
  "article",
  "podcast",
  "community",
] as const;

const resource = z
  .object({
    title: z.string(),
    id: z.string().optional(),
    link: z.url(),
    description: z.string(),
    type: z.enum(RESOURCE_TYPES),
    tags: z.array(z.string()).default([]),
  })
  .transform((r) => ({
    ...r,
    id: r.id ?? slugify(r.title, { lower: true, strict: true }),
  }));

const tracks = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/resources" }),
  schema: z
    .object({
      title: z.string(),
      tagline: z.string(),
      description: z.string(),
      order: z.number(),
      path: z
        .array(
          z.object({
            title: z.string(),
            note: z.string().optional(),
            resources: z.array(z.string()).min(1),
          }),
        )
        .default([]),
      resources: z.array(resource).min(1),
    })
    .superRefine((track, ctx) => {
      const ids = new Set<string>();
      track.resources.forEach((r, i) => {
        if (ids.has(r.id)) {
          ctx.addIssue({
            code: "custom",
            path: ["resources", i, "id"],
            message: `Duplicate resource id "${r.id}". Give one of them a unique \`id\`.`,
          });
        }
        ids.add(r.id);
      });
      track.path.forEach((step, s) => {
        step.resources.forEach((id, i) => {
          if (!ids.has(id)) {
            ctx.addIssue({
              code: "custom",
              path: ["path", s, "resources", i],
              message: `Unknown resource id "${id}" in step "${step.title}". Known ids: ${[...ids].join(", ")}`,
            });
          }
        });
      });
    }),
});

export const collections = {
  events,
  blogs,
  projects,
  tracks,
};
