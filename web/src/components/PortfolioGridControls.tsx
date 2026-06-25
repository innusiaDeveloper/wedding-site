"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DIRECTUS_URL } from "@/lib/config";

type Project = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  date_created?: string | null;
  cover?: string | { id: string } | null;
  hasPhotos: boolean;
  hasReels: boolean;
};

type Filter = "all" | "photos" | "reels";
type Sort = "newest" | "oldest" | "title-az" | "title-za";

export function PortfolioGridControls({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("newest");

  const counts = useMemo(() => {
    const all = projects.length;
    const photos = projects.filter((p) => p.hasPhotos).length;
    const reels = projects.filter((p) => p.hasReels).length;
    return { all, photos, reels };
  }, [projects]);

  const filteredSorted = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = projects;

    // filter
    if (filter === "photos") list = list.filter((p) => p.hasPhotos);
    if (filter === "reels") list = list.filter((p) => p.hasReels);

    // search (title + excerpt)
    if (q) {
      list = list.filter((p) => {
        const inTitle = p.title.toLowerCase().includes(q);
        const inExcerpt = (p.excerpt ?? "").toLowerCase().includes(q);
        return inTitle || inExcerpt;
      });
    }

    // sort
    const toTime = (s?: string | null) => (s ? new Date(s).getTime() : 0);

    const sorted = [...list].sort((a, b) => {
      if (sort === "newest")
        return toTime(b.date_created) - toTime(a.date_created);
      if (sort === "oldest")
        return toTime(a.date_created) - toTime(b.date_created);
      if (sort === "title-az") return a.title.localeCompare(b.title);
      if (sort === "title-za") return b.title.localeCompare(a.title);
      return 0;
    });

    return sorted;
  }, [projects, query, filter, sort]);

  const showClear =
    query.trim().length > 0 || filter !== "all" || sort !== "newest";

  return (
    <section className="mt-8">
      {/* Controls */}
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        {/* Search */}
        <div className="flex flex-1 items-center gap-3">
          <div className="relative w-full">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or excerpt..."
              className="w-full rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 pr-24 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
            />

            {showClear ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setFilter("all");
                  setSort("newest");
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 transition hover:bg-white/10"
              >
                Clear
              </button>
            ) : null}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <FilterButton
            active={filter === "all"}
            onClick={() => setFilter("all")}
          >
            All <span className="text-white/50">({counts.all})</span>
          </FilterButton>

          <FilterButton
            active={filter === "photos"}
            onClick={() => setFilter("photos")}
            disabled={counts.photos === 0}
          >
            Photos <span className="text-white/50">({counts.photos})</span>
          </FilterButton>

          <FilterButton
            active={filter === "reels"}
            onClick={() => setFilter("reels")}
            disabled={counts.reels === 0}
          >
            Reels <span className="text-white/50">({counts.reels})</span>
          </FilterButton>
        </div>

        {/* Sort */}
        <div className="sm:ml-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="w-full rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 text-sm text-white outline-none focus:border-white/20 sm:w-auto"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="title-az">Title A–Z</option>
            <option value="title-za">Title Z–A</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSorted.map((p) => {
          const coverId = typeof p.cover === "string" ? p.cover : p.cover?.id;

          // Directus image transform for fast thumbnails:
          // width=900 fits 3-col grid, quality=80 is fine
          const coverUrl = coverId
            ? `${DIRECTUS_URL}/assets/${coverId}?width=900&quality=80&fit=cover`
            : null;

          return (
            <Link
              key={p.id}
              href={`/portfolio/${p.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition hover:border-white/20"
            >
              <div className="relative aspect-4/5 w-full">
                {coverUrl ? (
                  <Image
                    src={coverUrl}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/5" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/15 to-transparent" />

                {/* Badges */}
                <div className="absolute left-4 top-4 flex gap-2">
                  {p.hasReels ? (
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80">
                      Reels
                    </span>
                  ) : null}
                  {p.hasPhotos ? (
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80">
                      Photos
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-lg font-semibold tracking-tight">
                  {p.title}
                </h2>

                {p.excerpt ? (
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/70">
                    {p.excerpt}
                  </p>
                ) : (
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    View project details.
                  </p>
                )}

                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/90">
                  Open project <span aria-hidden></span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredSorted.length === 0 && (
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-white/70">
          Nothing found. Try another search or filter.
        </div>
      )}
    </section>
  );
}

function FilterButton({
  children,
  active,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "rounded-2xl px-4 py-2 text-sm transition",
        active
          ? "bg-white/10 text-white"
          : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
        disabled ? "cursor-not-allowed opacity-40 hover:bg-white/5" : "",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
