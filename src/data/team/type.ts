import { z } from "zod";

export const teamMemberSchema = z.object({
  id: z.string().optional(),
  username: z.string(),
  name: z.string(),
  designation: z.string().optional(),
  email: z.string().or(z.literal("")).optional(),
  linkedin: z.string().or(z.literal("")).optional(),
  skills: z.array(z.string()).default([]).optional(),
  status: z.enum(["alumni", "active"]),
  year: z.string().default("-"),
  /** Passout year, set by the loader from the batch file name */
  graduation: z.number().optional(),
});

export const teamArraySchema = z.array(teamMemberSchema);

export type TeamMember = z.infer<typeof teamMemberSchema>;
