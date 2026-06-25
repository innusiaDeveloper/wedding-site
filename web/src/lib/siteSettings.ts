import { directusFetch } from "@/lib/directus";

export type SiteSettings = {
  hero_image: string | null;
  logo: string | null;
};

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const res = await directusFetch<{ data: SiteSettings }>(
      "/items/site_settings?fields=hero_image,logo",
    );

    return res.data ?? null;
  } catch (e) {
    console.error("getSiteSettings error:", e);
    return null;
  }
}
