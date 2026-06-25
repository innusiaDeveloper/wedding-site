"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { directusAssetUrl } from "@/lib/seo";

type VenueRow = {
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

type FilterOption =
  | "Все"
  | "Винодельни"
  | "Побережье"
  | "Загородные"
  | "Краснодар"
  | "Сочи";

type GuestOption = "Все" | "До 30" | "50-100" | "100-200";

function fileIdFromGalleryItem(
  item:
    | { directus_files_id: { id: string; title?: string | null } | string }
    | undefined,
): string | null {
  if (!item) return null;

  return typeof item.directus_files_id === "string"
    ? item.directus_files_id
    : (item.directus_files_id?.id ?? null);
}

function getVenueImages(venue: VenueRow): string[] {
  const galleryUrls =
    venue.gallery
      ?.map((item) => {
        const id = fileIdFromGalleryItem(item);

        return id
          ? directusAssetUrl(id, {
              width: 1600,
              quality: 85,
              fit: "cover",
            })
          : null;
      })
      .filter((x): x is string => Boolean(x)) ?? [];

  const coverId =
    typeof venue.cover === "string" ? venue.cover : (venue.cover?.id ?? null);

  const coverUrl = coverId
    ? directusAssetUrl(coverId, {
        width: 1600,
        quality: 85,
        fit: "cover",
      })
    : null;

  const all = coverUrl ? [coverUrl, ...galleryUrls] : galleryUrls;

  return [...new Set(all)];
}

function normalize(value?: string | null) {
  return (value ?? "")
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/\s+/g, " ")
    .trim();
}

function getVenueSearchText(venue: VenueRow) {
  return normalize(
    [venue.title, venue.location, venue.excerpt, venue.capacity]
      .filter(Boolean)
      .join(" "),
  );
}

function matchesAny(value: string, words: string[]) {
  return words.some((word) => value.includes(normalize(word)));
}

function matchesFilter(venue: VenueRow, filter: FilterOption) {
  if (filter === "Все") return true;

  const value = getVenueSearchText(venue);

  if (filter === "Винодельни") {
    return matchesAny(value, [
      "винодель",
      "винодельня",
      "виноград",
      "винный",
      "винная",
      "шато",
      "chateau",
      "wine",
      "winery",
    ]);
  }

  if (filter === "Побережье") {
    return matchesAny(value, [
      "побереж",
      "море",
      "морской",
      "берег",
      "пляж",
      "черное море",
      "чёрное море",
      "адлер",
      "сочи",
      "геленджик",
      "анапа",
      "новороссийск",
    ]);
  }

  if (filter === "Загородные") {
    return matchesAny(value, [
      "загород",
      "загородный",
      "загородная",
      "коттедж",
      "усадьб",
      "вилла",
      "villa",
      "лес",
      "парк",
      "резиденц",
      "территория",
      "природа",
      "горы",
    ]);
  }

  if (filter === "Краснодар") {
    return matchesAny(value, ["краснодар", "краснодарский"]);
  }

  if (filter === "Сочи") {
    return matchesAny(value, ["сочи", "адлер", "красная поляна"]);
  }

  return true;
}

function extractCapacityNumbers(capacity?: string | null): number[] {
  if (!capacity) return [];

  const matches = capacity.match(/\d+/g);

  return matches ? matches.map(Number).filter((n) => Number.isFinite(n)) : [];
}

function matchesGuests(
  capacity: string | null | undefined,
  guests: GuestOption,
) {
  if (guests === "Все") return true;

  const numbers = extractCapacityNumbers(capacity);
  if (!numbers.length) return false;

  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  if (guests === "До 30") {
    return min <= 30 || max <= 30;
  }

  if (guests === "50-100") {
    return max >= 50 && min <= 100;
  }

  if (guests === "100-200") {
    return max >= 100 && min <= 200;
  }

  return true;
}

function VenueCard({ venue }: { venue: VenueRow }) {
  const images = getVenueImages(venue);
  const [index, setIndex] = useState(0);

  const active = images[index] ?? null;
  const hasMultiple = images.length > 1;

  const prev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const next = () => {
    setIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <article
      className="
        overflow-hidden rounded-[2.5rem]
        border border-brand-dark/10 bg-white
        shadow-[0_16px_50px_rgba(0,0,0,0.06)]
      "
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-olive/10">
        {active ? (
          <Image
            src={active}
            alt={venue.title}
            fill
            unoptimized
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-brand-olive/10" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {hasMultiple ? (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Предыдущее фото"
              className="
                absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2
                items-center justify-center rounded-full
                border border-white/35 bg-white/88 text-brand-dark
                shadow-[0_10px_30px_rgba(0,0,0,0.18)]
                backdrop-blur transition
                hover:bg-white hover:scale-[1.03]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
              "
            >
              ←
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Следующее фото"
              className="
                absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2
                items-center justify-center rounded-full
                border border-white/35 bg-white/88 text-brand-dark
                shadow-[0_10px_30px_rgba(0,0,0,0.18)]
                backdrop-blur transition
                hover:bg-white hover:scale-[1.03]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
              "
            >
              →
            </button>

            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
              {Array.from({ length: Math.min(images.length, 5) }).map(
                (_, dotIndex) => {
                  const activeDot =
                    images.length <= 5
                      ? dotIndex === index
                      : dotIndex ===
                        Math.min(4, Math.floor((index / images.length) * 5));

                  return (
                    <button
                      key={dotIndex}
                      type="button"
                      onClick={() => {
                        const nextIndex =
                          images.length <= 5
                            ? dotIndex
                            : Math.floor((dotIndex / 5) * images.length);

                        setIndex(nextIndex);
                      }}
                      aria-label={`Перейти к группе фото ${dotIndex + 1}`}
                      className={[
                        "h-2.5 w-2.5 rounded-full border border-white/50 transition",
                        activeDot
                          ? "bg-brand-green"
                          : "bg-white/85 hover:bg-white",
                      ].join(" ")}
                    />
                  );
                },
              )}
            </div>
          </>
        ) : null}
      </div>

      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display font-light text-2xl leading-[1.02] tracking-[-0.015em] text-brand-dark">
              {venue.title}
            </h2>

            {venue.location ? (
              <p className="mt-2 font-ui text-sm leading-[1.7] text-brand-brown/75">
                {venue.location}
              </p>
            ) : null}

            {venue.capacity ? (
              <p className="mt-1 font-ui text-sm leading-[1.7] text-brand-brown/60">
                Вместимость: {venue.capacity}
              </p>
            ) : null}
          </div>
        </div>

        {venue.excerpt ? (
          <p className="mt-4 font-ui text-sm leading-[1.75] text-brand-brown/85">
            {venue.excerpt}
          </p>
        ) : null}

        <div className="mt-6">
          <Link
            href={`/venues/${venue.slug}`}
            className="
              inline-flex items-center justify-center rounded-2xl
              bg-brand-green px-5 py-3 font-ui text-sm font-medium text-brand-paper
              shadow-sm transition-all duration-300
              hover:bg-brand-hover
              focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/35
            "
          >
            Открыть площадку
          </Link>
        </div>
      </div>
    </article>
  );
}

export function VenuesGallery({ venues }: { venues: VenueRow[] }) {
  const [filter, setFilter] = useState<FilterOption>("Все");
  const [guests, setGuests] = useState<GuestOption>("Все");

  const filteredVenues = useMemo(() => {
    return venues.filter(
      (venue) =>
        matchesFilter(venue, filter) && matchesGuests(venue.capacity, guests),
    );
  }, [venues, filter, guests]);

  return (
    <section>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-end">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <label
            htmlFor="venue-filter"
            className="font-ui text-sm text-brand-brown/75"
          >
            Категория
          </label>

          <div className="relative">
            <select
              id="venue-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterOption)}
              className="
                min-w-[240px] appearance-none rounded-2xl
                border border-brand-dark/10 bg-white
                px-5 py-3 pr-12 font-ui text-sm text-brand-dark
                outline-none transition
                hover:border-brand-hover/45
                focus:border-brand-green/45
              "
            >
              <option value="Все">Все</option>
              <option value="Винодельни">Винодельни</option>
              <option value="Побережье">Побережье</option>
              <option value="Загородные">Загородные</option>
              <option value="Краснодар">Краснодар</option>
              <option value="Сочи">Сочи</option>
            </select>

            <span
              className="
                pointer-events-none absolute right-5 top-1/2
                h-3 w-3 -translate-y-[60%] rotate-45
                border-b-[1.5px] border-r-[1.5px]
                border-brand-brown/40
              "
              aria-hidden
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <label
            htmlFor="guests-filter"
            className="font-ui text-sm text-brand-brown/75"
          >
            Количество гостей
          </label>

          <div className="relative">
            <select
              id="guests-filter"
              value={guests}
              onChange={(e) => setGuests(e.target.value as GuestOption)}
              className="
                min-w-[240px] appearance-none rounded-2xl
                border border-brand-dark/10 bg-white
                px-5 py-3 pr-12 font-ui text-sm text-brand-dark
                outline-none transition
                hover:border-brand-hover/45
                focus:border-brand-green/45
              "
            >
              <option value="Все">Все</option>
              <option value="До 30">До 30</option>
              <option value="50-100">50-100</option>
              <option value="100-200">100-200</option>
            </select>

            <span
              className="
                pointer-events-none absolute right-5 top-1/2
                h-3 w-3 -translate-y-[60%] rotate-45
                border-b-[1.5px] border-r-[1.5px]
                border-brand-brown/40
              "
              aria-hidden
            />
          </div>
        </div>
      </div>

      {filteredVenues.length === 0 ? (
        <div className="rounded-[2rem] border border-brand-dark/10 bg-white p-8 text-center shadow-[0_12px_36px_rgba(0,0,0,0.06)]">
          <h2 className="font-display font-light text-3xl tracking-[-0.015em]">
            Площадки не найдены
          </h2>

          <p className="mt-3 font-ui text-brand-brown/75">
            Попробуй выбрать другую категорию или диапазон гостей.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          {filteredVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      )}
    </section>
  );
}
