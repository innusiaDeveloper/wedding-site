import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { QuickConsultationButton } from "@/components/QuickConsultationButton";

import { directusFetch } from "@/lib/directus";
import { absoluteUrl, directusAssetUrl } from "@/lib/seo";
import { VenueGallery } from "@/components/VenueGallery";
import { VenueHallsTabs } from "@/components/VenueHallsTabs";

type FileRef =
  | string
  | {
      id: string;
      title?: string | null;
    };

type VenueHall = {
  id: number;
  title: string;
  description?: string | null;
  sort?: number | null;
  cover?: string | { id: string } | null;
  gallery?: Array<{
    directus_files_id: FileRef;
  }> | null;
};

type Venue = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  cover?: string | { id: string } | null;
  logo?: string | { id: string } | null;

  capacity?: string | null;
  ceremony?: boolean | null;
  working_hours?: string | null;
  rooms?: string | null;
  fireworks?: boolean | null;
  avg_check?: string | null;
  buyout_deposit?: string | null;
  venue_rent?: string | null;
  service?: string | null;
  alcohol?: string | null;
  location?: string | null;

  halls?: VenueHall[] | null;

  gallery?: Array<{
    directus_files_id: FileRef;
  }> | null;
};

function fileId(file: FileRef): string | null {
  return typeof file === "string" ? file : (file?.id ?? null);
}

function fileTitle(file: FileRef): string | null {
  return typeof file === "string" ? null : (file?.title ?? null);
}

function normalizeSlug(value: string) {
  return decodeURIComponent(value).trim().toLowerCase();
}

async function getVenueBySlug(slug: string): Promise<Venue | null> {
  const res = await directusFetch<{ data: Venue[] }>(
    `/items/venues?fields=*,cover.id,gallery.directus_files_id.id,gallery.directus_files_id.title` +
      `,halls.id,halls.title,halls.description,halls.sort,halls.cover.id` +
      `,halls.gallery.directus_files_id.id,halls.gallery.directus_files_id.title` +
      `&filter[status][_eq]=published` +
      `&sort=halls.sort,halls.title`,
    { cache: "no-store" },
  );

  const normalized = normalizeSlug(slug);

  return (
    res.data?.find((item) => normalizeSlug(item.slug) === normalized) ?? null
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);

  if (!venue) {
    return {
      title: "Площадка не найдена",
      robots: { index: false, follow: false },
    };
  }

  const coverId =
    typeof venue.cover === "string" ? venue.cover : (venue.cover?.id ?? null);

  const ogImage = coverId
    ? directusAssetUrl(coverId, {
        width: 1200,
        height: 630,
        quality: 85,
        fit: "cover",
      })
    : undefined;

  const url = absoluteUrl(`/venues/${venue.slug}`);

  const description =
    (venue.excerpt ?? "").trim() ||
    "Описание площадки, условия, депозит, аренда, сервис и фотографии.";

  return {
    title: `${venue.title} | Площадки`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: venue.title,
      description,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630 }]
        : undefined,
    },
  };
}

export default async function VenuePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);

  if (!venue) return notFound();

  const venueCoverId =
    typeof venue.cover === "string" ? venue.cover : (venue.cover?.id ?? null);

  const coverUrl = venueCoverId
    ? directusAssetUrl(venueCoverId, {
        width: 2400,
        quality: 85,
        fit: "cover",
      })
    : null;

  const galleryItems =
    venue.gallery?.flatMap((g) => {
      const id = fileId(g.directus_files_id);
      if (!id) return [];

      return [
        {
          id: directusAssetUrl(id, {
            width: 2000,
            quality: 85,
            fit: "cover",
          }),
          alt: fileTitle(g.directus_files_id) ?? venue.title,
        },
      ];
    }) ?? [];

  const halls =
    venue.halls?.slice().sort((a, b) => (a.sort ?? 999) - (b.sort ?? 999)) ??
    [];

  const hallBlocks = halls.map((h) => {
    const hallCoverId =
      typeof h.cover === "string" ? h.cover : (h.cover?.id ?? null);

    const hallCoverUrl = hallCoverId
      ? directusAssetUrl(hallCoverId, {
          width: 2000,
          quality: 85,
          fit: "cover",
        })
      : null;

    const hallGallery =
      h.gallery?.flatMap((g) => {
        const id = fileId(g.directus_files_id);
        if (!id) return [];

        return [
          {
            id: directusAssetUrl(id, {
              width: 2000,
              quality: 85,
              fit: "cover",
            }),
            alt: fileTitle(g.directus_files_id) ?? h.title ?? venue.title,
          },
        ];
      }) ?? [];

    return {
      id: h.id,
      title: h.title,
      description: h.description ?? null,
      coverUrl: hallCoverUrl,
      images: hallGallery,
    };
  });

  const facts: Array<{ label: string; value: string }> = [
    { label: "Вместимость", value: venue.capacity ?? "—" },
    { label: "Выездная регистрация", value: venue.ceremony ? "Да" : "Нет" },
    { label: "Время / продление", value: venue.working_hours ?? "—" },
    { label: "Номерной фонд", value: venue.rooms ?? "—" },
    {
      label: "Пиротехника",
      value: venue.fireworks ? "Разрешена" : "Запрещена",
    },
    { label: "Средний чек", value: venue.avg_check ?? "—" },
    { label: "Депозит закрытия", value: venue.buyout_deposit ?? "—" },
    { label: "Аренда площадки", value: venue.venue_rent ?? "—" },
    { label: "Сервис", value: venue.service ?? "—" },
    { label: "Алкоголь", value: venue.alcohol ?? "—" },
    { label: "Локация", value: venue.location ?? "Краснодар" },
    { label: "Формат", value: "Условия уточняются индивидуально" },
  ];

  return (
    <main className="min-h-screen bg-brand-paper text-brand-dark">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:py-12">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/venues"
            className="
              inline-flex items-center gap-2 rounded-2xl
              border border-brand-dark/15 bg-brand-paper
              px-4 py-2 text-sm font-ui font-medium text-brand-dark
              transition
              hover:border-brand-green/35 hover:text-brand-deep
              hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)]
            "
          >
            <span aria-hidden>←</span>
            Все площадки
          </Link>

          <div className="hidden items-center gap-2 text-xs font-ui text-brand-brown sm:flex">
            <span className="rounded-full border border-brand-dark/10 bg-brand-olive/10 px-3 py-1">
              {venue.slug}
            </span>
          </div>
        </div>

        <header className="relative mt-8 overflow-hidden rounded-[2rem] border border-brand-dark/10 shadow-[0_18px_55px_rgba(0,0,0,0.08)]">
          {coverUrl ? (
            <div className="relative h-[420px] sm:h-[520px] lg:h-[650px] xl:h-[720px]">
              <Image
                src={coverUrl}
                alt={venue.title}
                fill
                unoptimized
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
            </div>
          ) : (
            <div className="h-[340px] bg-brand-olive/10 sm:h-[440px] lg:h-[560px]" />
          )}

          <div className="absolute inset-0 flex items-end">
            <div className="w-full px-6 pb-6 sm:px-10 sm:pb-10 lg:px-12 lg:pb-12">
              <h1 className="max-w-5xl font-display font-light text-3xl leading-[0.95] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                {venue.title}
              </h1>

              {venue.excerpt ? (
                <p className="mt-3 max-w-4xl font-ui text-sm leading-[1.7] text-white/85 sm:text-base lg:text-lg">
                  {venue.excerpt}
                </p>
              ) : null}
            </div>
          </div>
        </header>

        <section className="mx-auto mt-10 max-w-5xl rounded-[2rem] border border-brand-dark/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-8">
          <h2 className="font-display font-light text-3xl leading-none tracking-[-0.015em] text-brand-dark">
            Условия
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {facts.map((f) => (
              <div
                key={f.label}
                className="
                  flex min-h-[112px] flex-col justify-between
                  rounded-2xl border border-brand-dark/10
                  bg-brand-paper p-4
                "
              >
                <div className="font-ui text-[11px] uppercase tracking-[0.14em] text-brand-brown/45">
                  {f.label}
                </div>

                <div className="mt-3 font-ui text-sm leading-[1.6] text-brand-dark">
                  {f.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-6 max-w-5xl rounded-[2rem] border border-brand-dark/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-8">
          <div className="max-w-2xl">
            <h3 className="font-display font-light text-2xl leading-[1.02] tracking-[-0.015em] text-brand-dark sm:text-3xl">
              Быстрый запрос
            </h3>

            <p className="mt-3 font-ui text-sm leading-[1.75] text-brand-brown/80 sm:text-base">
              Хочешь узнать свободные даты и финальный расчёт под ваш формат?
            </p>
          </div>

          <div className="mt-6">
            <QuickConsultationButton />
          </div>
        </section>

        {venue.content ? (
          <section className="mx-auto mt-10 max-w-5xl rounded-[2rem] border border-brand-dark/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-8">
            <article
              className="
        prose prose-lg max-w-none
        prose-headings:font-display
        prose-headings:font-light
        prose-headings:text-brand-dark
        prose-h3:mt-8
        prose-h3:mb-4
        prose-h3:text-2xl
        prose-p:text-brand-brown
        prose-p:leading-8
        prose-ul:my-5
        prose-li:text-brand-brown
        prose-li:leading-8
        prose-li:marker:text-brand-green
      "
            >
              <div dangerouslySetInnerHTML={{ __html: venue.content }} />
            </article>
          </section>
        ) : null}

        {galleryItems.length > 0 ? (
          <section className="mx-auto mt-10 max-w-5xl rounded-[2rem] border border-brand-dark/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-8">
            {" "}
            <VenueGallery
              title="Фотографии площадки"
              subtitle="Общая атмосфера, территория и ключевые ракурсы."
              images={galleryItems}
            />
          </section>
        ) : null}

        {hallBlocks.length > 0 ? (
          <section className="mx-auto mt-10 max-w-5xl rounded-[2rem] border border-brand-dark/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-8">
            {" "}
            <h2 className="font-display font-light text-3xl leading-none tracking-[-0.015em] text-brand-dark">
              {hallBlocks.length === 1 ? "Зал площадки" : "Залы площадки"}
            </h2>
            {hallBlocks.length > 1 ? (
              <p className="mt-2 font-ui text-sm leading-[1.7] text-brand-brown/75">
                Выбери зал, чтобы посмотреть фото.
              </p>
            ) : null}
            {hallBlocks.length === 1 ? (
              <div className="mt-6 overflow-hidden rounded-3xl border border-brand-dark/10">
                <div className="relative h-[240px] sm:h-[320px]">
                  {hallBlocks[0].coverUrl ? (
                    <Image
                      src={hallBlocks[0].coverUrl}
                      alt={hallBlocks[0].title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-brand-olive/10" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <h3 className="font-display font-light text-2xl leading-[1.02] tracking-[-0.015em] text-white sm:text-4xl">
                      {hallBlocks[0].title}
                    </h3>

                    {hallBlocks[0].description ? (
                      <p className="mt-2 max-w-3xl font-ui text-sm leading-[1.7] text-white/80">
                        {hallBlocks[0].description}
                      </p>
                    ) : null}
                  </div>
                </div>

                {hallBlocks[0].images.length > 0 ? (
                  <div className="p-6 sm:p-8">
                    <VenueGallery
                      title="Фотографии зала"
                      subtitle="Атмосфера, детали, расстановка."
                      images={hallBlocks[0].images}
                    />
                  </div>
                ) : (
                  <div className="p-6 font-ui text-sm text-brand-brown/75 sm:p-8">
                    Добавь фото в галерею этого зала в Directus — и они появятся
                    здесь.
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-6">
                <VenueHallsTabs halls={hallBlocks} />
              </div>
            )}
          </section>
        ) : null}
      </div>
    </main>
  );
}
