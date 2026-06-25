import Link from "next/link";
import Image from "next/image";
import { directusAssetUrl } from "@/lib/seo";

export type FeaturedProject = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  cover?: { id: string } | string | null;
};

export function FeaturedProjects({
  projects,
}: {
  projects: FeaturedProject[];
}) {
  if (!projects.length) return null;

  const safe = projects.filter(
    (p) => typeof p.slug === "string" && p.slug.trim().length > 0,
  );
  if (!safe.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      {/* HEADER */}
      <header className="mb-12 flex items-end justify-between gap-6">
        <div>
          <h2 className="font-display text-4xl text-brand-dark">
            Featured projects
          </h2>
          <p className="mt-2 font-ui text-base text-brand-brown">
            A curated selection from recent stories.
          </p>
        </div>

        <Link
          href="/portfolio"
          className="
            inline-flex items-center justify-center rounded-2xl
            border border-brand-dark/15 bg-brand-paper
            px-4 py-2 text-sm font-ui font-medium text-brand-dark
            transition
            hover:border-brand-green/35 hover:text-brand-deep
            hover:shadow-[0_14px_34px_rgba(0,0,0,0.08)]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30
          "
        >
          View all <span className="ml-2" aria-hidden></span>
        </Link>
      </header>

      {/* GRID */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {safe.map((p) => {
          const coverId = !p.cover
            ? null
            : typeof p.cover === "string"
              ? p.cover
              : p.cover.id;

          const imgSrc = coverId
            ? directusAssetUrl(coverId, {
                width: 1600,
                quality: 85,
                fit: "cover",
              })
            : null;

          return (
            <Link
              key={p.id}
              href={`/portfolio/${p.slug}`}
              className="
                group block rounded-3xl
                focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30
              "
            >
              <article
                className="
                  relative overflow-hidden rounded-3xl
                  border border-brand-dark/15 bg-brand-paper
                  shadow-[0_12px_36px_rgba(0,0,0,0.06)]
                  transition
                  hover:-translate-y-1
                  hover:border-brand-green/40
                  hover:shadow-[0_26px_70px_rgba(0,0,0,0.14)]
                "
              >
                {/* subtle glow on hover */}
                <div
                  className="
                    pointer-events-none absolute inset-0
                    opacity-0 transition-opacity duration-300
                    group-hover:opacity-100
                    shadow-[inset_0_0_0_1px_rgba(61,80,24,0.22)]
                  "
                />

                {/* IMAGE */}
                <div className="relative aspect-[4/5] w-full">
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={p.title}
                      fill
                      unoptimized
                      className="
                        object-cover
                        transition-transform duration-700
                        group-hover:scale-[1.04]
                      "
                    />
                  ) : (
                    <div className="absolute inset-0 bg-brand-olive/20" />
                  )}

                  {/* OVERLAY: base */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/20 to-transparent" />
                  {/* OVERLAY: hover boost */}
                  <div
                    className="
                      absolute inset-0
                      opacity-0 transition-opacity duration-300
                      group-hover:opacity-100
                      bg-gradient-to-t from-brand-dark/80 via-brand-dark/30 to-transparent
                    "
                  />
                </div>

                {/* TEXT */}
                <div className="absolute bottom-0 z-10 p-8">
                  <h3 className="font-display text-2xl text-brand-paper">
                    {p.title}
                  </h3>

                  {p.excerpt ? (
                    <p className="mt-2 max-w-md font-ui text-sm text-brand-paper/85">
                      {p.excerpt}
                    </p>
                  ) : null}

                  <span
                    className="
                      mt-4 inline-flex items-center gap-2
                      font-ui text-sm text-brand-light
                    "
                  >
                    Open project
                    <span
                      className="
                        transition-transform duration-300
                        group-hover:translate-x-1
                      "
                      aria-hidden
                    ></span>
                  </span>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
