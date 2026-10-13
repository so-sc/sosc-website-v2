import type { APIRoute } from "astro";
import { domain, getTracks, searchText, TYPE_LABELS } from "@/lib/resources";

export const GET: APIRoute = async () => {
  const tracks = await getTracks();
  const items = tracks.flatMap((track) =>
    track.resources.map((r) => ({
      title: r.title,
      description: r.description,
      link: r.link,
      domain: domain(r.link),
      type: r.type,
      typeLabel: TYPE_LABELS[r.type][0],
      track: track.title,
      search: searchText(r, track),
    })),
  );
  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" },
  });
};
