import { teamArraySchema } from "./team/type";

// Export Team Data
const modules = import.meta.glob("../data/team/*.json", { eager: true });
const rawTeamData = Object.values(modules).flatMap((mod: any) => mod.default);
export const team = teamArraySchema.parse(rawTeamData);
