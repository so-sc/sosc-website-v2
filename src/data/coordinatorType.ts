import { z } from "zod";

export const coordinatorSchema = z.object({
  name: z.string(),
  role: z.string(),
  title: z.string(),
  bio: z.string(),
  image: z.string(),
  linkedin: z.string().url().or(z.literal("")).optional(),
  email: z.string().email().or(z.literal("")).optional(),
});

export type Coordinator = z.infer<typeof coordinatorSchema>;
