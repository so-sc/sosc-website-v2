type Sortable = { order?: number; community?: boolean; date: Date };

// Pinned projects (lowest `order` first), then community projects, then newest
export function compareProjects(a: Sortable, b: Sortable) {
  const ao = a.order ?? Number.POSITIVE_INFINITY;
  const bo = b.order ?? Number.POSITIVE_INFINITY;
  if (ao !== bo) return ao - bo;
  if (a.community !== b.community) return a.community ? -1 : 1;
  return b.date.getTime() - a.date.getTime();
}
