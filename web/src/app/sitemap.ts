import type { MetadataRoute } from "next";
import { directusFetch } from "@/lib/directus";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await directusFetch<{
    data: Array<{ slug: string | null; date_updated?: string | null }>;
  }>("/items/projects?fields=slug,date_updated&filter[status][_eq]=published");

  const projects = (res.data ?? []).filter(
    (p): p is { slug: string; date_updated?: string | null } =>
      typeof p.slug === "string" && p.slug.trim().length > 0
  );

  return [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/portfolio`, lastModified: new Date() },
    ...projects.map((p) => ({
      url: `${SITE_URL}/portfolio/${p.slug}`,
      lastModified: p.date_updated ? new Date(p.date_updated) : new Date(),
    })),
  ];
}
