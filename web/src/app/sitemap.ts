import type { MetadataRoute } from "next";
import { directusFetch } from "@/lib/directus";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aleksandra-pirog.ru"
).replace(/\/$/, "");

type SitemapItem = {
  slug: string | null;
  date_updated?: string | null;
  published_at?: string | null;
};

function validSlug(slug: string | null): slug is string {
  return typeof slug === "string" && slug.trim().length > 0;
}

function safeDate(value?: string | null): Date | undefined {
  if (!value) return undefined;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectsResult, venuesResult, postsResult] = await Promise.allSettled([
    directusFetch<{ data: SitemapItem[] }>(
      "/items/projects?fields=slug,date_updated&filter[status][_eq]=published&limit=-1",
      { next: { revalidate: 3600 } },
    ),

    directusFetch<{ data: SitemapItem[] }>(
      "/items/venues?fields=slug,date_updated&filter[status][_eq]=published&limit=-1",
      { next: { revalidate: 3600 } },
    ),

    directusFetch<{ data: SitemapItem[] }>(
      "/items/posts?fields=slug,published_at&filter[status][_eq]=published&limit=-1",
      { next: { revalidate: 3600 } },
    ),
  ]);

  const projects =
    projectsResult.status === "fulfilled"
      ? (projectsResult.value.data ?? [])
      : [];

  const venues =
    venuesResult.status === "fulfilled" ? (venuesResult.value.data ?? []) : [];

  const posts =
    postsResult.status === "fulfilled" ? (postsResult.value.data ?? []) : [];

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/portfolio`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/venues`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/posts`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const projectPages: MetadataRoute.Sitemap = projects
    .filter((project) => validSlug(project.slug))
    .map((project) => ({
      url: `${SITE_URL}/portfolio/${project.slug}`,
      lastModified: safeDate(project.date_updated),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const venuePages: MetadataRoute.Sitemap = venues
    .filter((venue) => validSlug(venue.slug))
    .map((venue) => ({
      url: `${SITE_URL}/venues/${venue.slug}`,
      lastModified: safeDate(venue.date_updated),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const postPages: MetadataRoute.Sitemap = posts
    .filter((post) => validSlug(post.slug))
    .map((post) => ({
      url: `${SITE_URL}/posts/${post.slug}`,
      lastModified: safeDate(post.published_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticPages, ...projectPages, ...venuePages, ...postPages];
}
