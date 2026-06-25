import { directusFetch } from "@/lib/directus";

export type DirectusFile = {
  id: string;
  title?: string | null;
  filename_disk?: string;
};

export type VenueHall = {
  id: string;
  title: string;
  description?: string | null;
  cover?: DirectusFile | null;
  gallery?: { directus_files_id: DirectusFile }[]; // pivot
  sort?: number | null;
};

export type Venue = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  description?: string | null;
  cover?: DirectusFile | null;
  halls?: VenueHall[];
};

export async function getVenueBySlug(slug: string): Promise<Venue | null> {
  const res = await directusFetch<{ data: Venue[] }>(
    `/items/venues?filter[slug][_eq]=${encodeURIComponent(slug)}` +
      `&fields=id,title,slug,excerpt,description,cover.*` +
      `,halls.id,halls.title,halls.description,halls.sort,halls.cover.*` +
      `,halls.gallery.directus_files_id.*` +
      `&sort=halls.sort,halls.title`,
  );

  const venue = res?.data?.[0] ?? null;

  // Если в Directus связь называется не "halls", а иначе — поменяй тут.
  return venue;
}
