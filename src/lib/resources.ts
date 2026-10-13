import { type CollectionEntry, getCollection } from "astro:content";
import { RESOURCE_TYPES } from "@/content.config";

export { RESOURCE_TYPES };

export type Track = CollectionEntry<"tracks">["data"] & { slug: string };
export type Resource = Track["resources"][number];
export type ResourceType = (typeof RESOURCE_TYPES)[number];

export const TYPE_LABELS: Record<ResourceType, [string, string]> = {
  course: ["Course", "Courses"],
  guide: ["Guide", "Guides"],
  docs: ["Docs", "Docs"],
  video: ["Video", "Videos"],
  book: ["Book", "Books"],
  roadmap: ["Roadmap", "Roadmaps"],
  cheatsheet: ["Cheatsheet", "Cheatsheets"],
  practice: ["Practice", "Practice"],
  tool: ["Tool", "Tools"],
  repo: ["Repo", "Repos"],
  article: ["Article", "Articles"],
  podcast: ["Podcast", "Podcasts"],
  community: ["Community", "Communities"],
};

export async function getTracks(): Promise<Track[]> {
  const entries = await getCollection("tracks");
  return entries
    .map((e) => ({ ...e.data, slug: e.id }))
    .sort((a, b) => a.order - b.order);
}

export const domain = (url: string) =>
  new URL(url).hostname.replace(/^www\./, "");

export const searchText = (r: Resource, track?: Track) =>
  [r.title, r.description, r.type, ...r.tags, track?.title ?? ""]
    .join(" ")
    .toLowerCase();

export const CONTRIBUTING_URL =
  "https://github.com/so-sc/sosc-website-v2/blob/main/CONTRIBUTING.md";
