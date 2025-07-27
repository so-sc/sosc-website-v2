import { z } from "zod";

export const teamMemberSchema = z.object({
  username: z.string(),
  name: z.string(),
  designation: z.string().optional(),
  email: z.string().or(z.literal("")).optional(),
  linkedin: z.string().or(z.literal("")).optional(),
  skills: z.array(z.string()).default([]).optional(),
  status: z.enum(["coordinator", "alumni", "active"]),
  image: z.string(),
});

export const teamArraySchema = z.array(teamMemberSchema);

export type TeamMember = z.infer<typeof teamMemberSchema>;
