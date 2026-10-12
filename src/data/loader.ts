import { z } from "zod";
import coordinatorData from "./coordinators.json";
import { coordinatorSchema } from "./coordinatorType";
import { teamArraySchema } from "./team/type";

// Export Team Data
const modules = import.meta.glob("../data/team/*.json", { eager: true });
// batchYYYY.json: passout year YYYY, roster year two years before (batch2027 -> "2025-26")
const rawTeamData = Object.entries(modules).flatMap(
  ([path, mod]: [string, any]) => {
    const passout = Number(path.match(/batch(\d{4})\.json$/)?.[1]);
    if (!passout) return mod.default;
    const year = `${passout - 2}-${String(passout - 1).slice(2)}`;
    return mod.default.map((member: any) => ({
      ...member,
      year,
      graduation: passout,
    }));
  },
);
export const team = teamArraySchema.parse(rawTeamData);

export const coordinators = z.array(coordinatorSchema).parse(coordinatorData);
