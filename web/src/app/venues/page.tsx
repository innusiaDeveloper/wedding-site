import type { Metadata } from "next";
import { directusFetch } from "@/lib/directus";
import { VenuesGallery } from "@/components/VenuesGallery";

export const metadata: Metadata = {
  title: "Свадебные площадки Краснодара и Краснодарского края",
  description:
    "Свадебные площадки Краснодара и Краснодарского края: условия, вместимость, аренда, фотографии и рекомендации свадебного организатора Александры Пирог.",
  alternates: {
    canonical: "/venues",
  },
  openGraph: {
    title: "Свадебные площадки Краснодара и Краснодарского края",
    description:
      "Подборка площадок для свадьбы в Краснодаре и Краснодарском крае: условия, вместимость, аренда и фотографии.",
    url: "/venues",
    type: "website",
  },
};

export type VenueRow = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  location?: string | null;
  capacity?: string | null;
  cover?: string | { id: string } | null;
  gallery?: Array<{
    directus_files_id: { id: string; title?: string | null } | string;
  }> | null;
};

export default async function VenuesPage() {
  let venues: VenueRow[] = [];

  try {
    const res = await directusFetch<{ data: VenueRow[] }>(
      `/items/venues?fields=id,title,slug,excerpt,location,capacity,cover.id&filter[status][_eq]=published&sort=title`,
      { next: { revalidate: 3600 } },
    );

    venues = res.data ?? [];
  } catch {
    venues = [];
  }

  const safe = venues.filter(
    (v) => typeof v.slug === "string" && v.slug.trim().length > 0,
  );

  return (
    <main className="min-h-screen bg-brand-paper text-brand-dark">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:py-24">
        <header className="mb-10">
          <h1 className="font-display font-light text-4xl leading-[0.98] tracking-[-0.02em] text-brand-dark sm:text-5xl lg:text-6xl">
            Свадебные площадки Краснодара и Краснодарского края
          </h1>

          <p className="mt-4 max-w-2xl font-ui text-base leading-[1.75] text-brand-brown/85">
            Подборка площадок для свадьбы в Краснодаре и Краснодарском крае:
            условия, вместимость, аренда, фотографии и рекомендации свадебного
            организатора.
          </p>
        </header>

        {safe.length === 0 ? (
          <div className="rounded-[2rem] border border-brand-dark/10 bg-white p-8 text-center shadow-[0_12px_36px_rgba(0,0,0,0.06)]">
            <h2 className="font-display font-light text-3xl tracking-[-0.015em] text-brand-dark">
              Площадки скоро появятся
            </h2>

            <p className="mt-3 font-ui text-brand-brown/75">
              Мы готовим подборку локаций и актуальные условия.
            </p>
          </div>
        ) : (
          <VenuesGallery venues={safe} />
        )}
      </div>
    </main>
  );
}
