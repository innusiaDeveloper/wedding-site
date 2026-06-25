import Link from "next/link";
import Image from "next/image";

import { Hero } from "@/components/Hero";
import { AwardsSection } from "@/components/AwardsSection";
import { HomeTiles } from "@/components/HomeTiles";
import { BudgetCalculator } from "@/components/BudgetCalculator";

import { directusAssetUrl } from "@/lib/seo";
import { getSiteSettings } from "@/lib/siteSettings";
import { getPostsWithMedia, type Post, type PostMedia } from "@/lib/posts";
import { directusFetch } from "@/lib/directus";

function pickCover(post: Post): PostMedia | null {
  const media = (post.media ?? [])
    .slice()
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));

  return media.find((m) => m.is_cover) || media[0] || null;
}

function clampText(text: string, max = 140) {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length > max ? t.slice(0, max).trim() + "…" : t;
}

type ProjectPreview = {
  id: number;
  cover?: string | { id: string } | null;
};

type VenuePreview = {
  id: number;
  cover?: string | { id: string } | null;
};

async function getPortfolioTileFallback(): Promise<string | null> {
  try {
    const res = await directusFetch<{ data: ProjectPreview[] }>(
      "/items/projects?fields=id,cover.id&filter[status][_eq]=published&sort=-date_created&limit=1",
      { next: { revalidate: 60 } },
    );

    const project = res.data?.[0];
    const coverId =
      typeof project?.cover === "string"
        ? project.cover
        : (project?.cover?.id ?? null);

    return coverId
      ? directusAssetUrl(coverId, {
          width: 1800,
          quality: 85,
          fit: "cover",
        })
      : null;
  } catch (e) {
    console.error("getPortfolioTileFallback error:", e);
    return null;
  }
}

async function getVenuesTileFallback(): Promise<string | null> {
  try {
    const res = await directusFetch<{ data: VenuePreview[] }>(
      "/items/venues?fields=id,cover.id&filter[status][_eq]=published&sort=-date_created&limit=1",
      { next: { revalidate: 60 } },
    );

    const venue = res.data?.[0];
    const coverId =
      typeof venue?.cover === "string"
        ? venue.cover
        : (venue?.cover?.id ?? null);

    return coverId
      ? directusAssetUrl(coverId, {
          width: 1800,
          quality: 85,
          fit: "cover",
        })
      : null;
  } catch (e) {
    console.error("getVenuesTileFallback error:", e);
    return null;
  }
}

export default async function HomePage() {
  const settings = await getSiteSettings();
  const posts = await getPostsWithMedia();
  const latestPosts = posts
    .filter(
      (post) => typeof post.slug === "string" && post.slug.trim().length > 0,
    )
    .slice(0, 3);

  const heroImage = settings?.hero_image
    ? directusAssetUrl(settings.hero_image, {
        width: 1400,
        quality: 85,
        fit: "cover",
      })
    : null;

  const [portfolioTileImage, venuesTileImage] = await Promise.all([
    getPortfolioTileFallback(),
    getVenuesTileFallback(),
  ]);

  return (
    <main className="min-h-screen bg-brand-paper text-brand-dark">
      <Hero
        title="Александра Пирог"
        subtitle={`Руководитель креативного агентства событий,
превращаем ожидания в публикации на Pinterest.
Вижу любовь через смыслы.`}
        imageUrl={heroImage}
        ctaHref="#budget"
        ctaLabel="Рассчитать за 5 минут"
        secondaryHref="#about"
        secondaryLabel="Обо мне"
      />

      <AwardsSection />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:py-24">
        <div className="rounded-[3rem] border border-brand-dark/10 bg-white p-8 shadow-[0_30px_100px_rgba(0,0,0,0.06)] sm:p-12 lg:p-14">
          <div className="mb-12 text-center">
            <div className="font-ui text-[11px] uppercase tracking-[0.22em] text-brand-brown/50">
              Наш опыт в цифрах
            </div>

            <h2 className="mt-4 font-display font-light text-3xl leading-[0.98] tracking-[-0.02em] text-brand-dark sm:text-4xl lg:text-6xl">
              Наш опыт и масштаб
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["700+", "организованных мероприятий под ключ"],
              ["300+", "проработанных площадок в ЮФО"],
              ["900+", "проверенных специалистов"],
              ["10 000+", "довольных гостей заказчиков"],
            ].map(([num, text]) => (
              <div
                key={num}
                className="
        group relative overflow-hidden
        rounded-[2rem]
        border border-brand-dark/10

        bg-gradient-to-br
        from-white
        via-brand-paper/80
        to-[#f8efec]

        p-6 text-center
        transition-all duration-500

        hover:-translate-y-2
        hover:border-[#c99890]/40
        hover:shadow-[0_25px_80px_rgba(190,110,95,0.18)]

        sm:p-8
      "
              >
                {/* декоративное свечение */}
                <div
                  className="
          absolute -right-12 -top-12
          h-32 w-32 rounded-full
          bg-[#d9a198]/20 blur-3xl

          opacity-0
          transition-all duration-500
          group-hover:opacity-100
        "
                />

                <div
                  className="
          absolute -left-10 -bottom-10
          h-24 w-24 rounded-full
          bg-[#c58c83]/10 blur-3xl

          opacity-0
          transition-all duration-500
          group-hover:opacity-100
        "
                />

                <div
                  className="
          relative z-10

          font-display font-light
          text-3xl leading-none
          tracking-[-0.02em]

          text-brand-dark

          transition-all duration-500
          group-hover:scale-105
          group-hover:text-[#b86f63]

          sm:text-4xl
        "
                >
                  {num}
                </div>

                <div
                  className="
          mx-auto mt-4 h-px w-10

          bg-gradient-to-r
          from-transparent
          via-[#c48b81]
          to-transparent

          transition-all duration-500
          group-hover:w-16
        "
                />

                <p
                  className="
          relative z-10
          mt-4

          font-ui text-sm
          leading-[1.7]

          text-brand-brown/78

          transition-colors duration-300
          group-hover:text-brand-brown

          sm:text-base
        "
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeTiles
        portfolioImage={portfolioTileImage}
        venuesImage={venuesTileImage}
      />

      {latestPosts.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:py-24">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <h2 className="font-display font-light text-4xl leading-[0.98] tracking-[-0.02em] text-brand-dark sm:text-5xl lg:text-6xl">
                Последние публикации
              </h2>
            </div>

            <Link
              href="/posts"
              className="hidden sm:inline-flex items-center justify-center rounded-2xl border border-brand-dark/20 bg-brand-paper px-6 py-3 font-ui text-sm font-medium text-brand-dark transition hover:border-brand-green/40 hover:text-brand-deep"
            >
              Смотреть все
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => {
              if (!post.slug) return null;

              const cover = pickCover(post);

              const imageFileId =
                cover?.type === "video"
                  ? ((typeof cover?.poster === "string"
                      ? cover.poster
                      : cover?.poster?.id) ?? null)
                  : ((typeof cover?.file === "string"
                      ? cover.file
                      : cover?.file?.id) ?? null);

              const imageUrl = imageFileId
                ? directusAssetUrl(imageFileId, {
                    width: 900,
                    quality: 85,
                    fit: "cover",
                  })
                : null;

              const videoFileId =
                cover?.type === "video"
                  ? ((typeof cover?.file === "string"
                      ? cover.file
                      : cover?.file?.id) ?? null)
                  : null;

              const videoUrl = videoFileId
                ? directusAssetUrl(videoFileId)
                : null;

              return (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className="
                    group block overflow-hidden rounded-[2.5rem]
                    border border-brand-dark/10 bg-white
                    shadow-[0_20px_60px_rgba(0,0,0,0.06)]
                    transition-all duration-500
                    hover:-translate-y-1
                    hover:shadow-[0_28px_90px_rgba(0,0,0,0.12)]
                  "
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-brand-olive/10">
                    {cover?.type === "video" && videoUrl ? (
                      <video
                        src={videoUrl}
                        poster={imageUrl ?? undefined}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                      />
                    ) : imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={post.title ?? ""}
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex h-full items-end p-6">
                        <div className="w-full rounded-2xl bg-black/55 p-4 text-white backdrop-blur">
                          <div className="font-display font-light text-2xl tracking-[-0.015em]">
                            {post.title ?? "Пост"}
                          </div>
                          <div className="mt-2 font-ui text-sm text-white/85">
                            Открыть публикацию
                          </div>
                        </div>
                      </div>
                    )}

                    {cover?.type === "video" && (
                      <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 font-ui text-xs text-white backdrop-blur">
                        <span className="h-2 w-2 rounded-full bg-white/80" />
                        Reels
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="font-display font-light text-2xl leading-[1.05] tracking-[-0.015em] text-brand-dark">
                      {post.title ?? ""}
                    </div>

                    {post.caption ? (
                      <div className="mt-2 font-ui text-sm leading-[1.7] text-brand-brown/78">
                        {clampText(post.caption, 140)}
                      </div>
                    ) : (
                      <div className="mt-2 font-ui text-sm text-brand-brown/70">
                        Открыть публикацию
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 sm:hidden">
            <Link
              href="/posts"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-brand-green px-6 py-3 font-ui text-sm font-medium text-brand-paper transition hover:bg-brand-hover"
            >
              Смотреть все публикации
            </Link>
          </div>
        </section>
      )}

      <section
        id="about"
        className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:py-24"
      >
        <div className="rounded-[2.5rem] border border-brand-dark/10 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div className="rounded-[2rem] border border-brand-dark/10 bg-white p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-dark/10 bg-brand-paper/70 px-4 py-2 font-ui text-[11px] uppercase tracking-[0.14em] text-brand-brown/60">
                <span className="h-2 w-2 rounded-full bg-brand-green" />
                Обо мне
              </div>

              <h2 className="mt-5 font-display font-light text-4xl leading-[0.98] tracking-[-0.02em] text-brand-dark sm:text-5xl">
                Ваш личный режиссер событий.
              </h2>

              <p className="mt-4 font-ui text-base leading-[1.8] text-brand-brown/90">
                Меня зовут Александра Пирог, я организатор, режиссер и
                руководитель команды креативного event-агентства в г. Краснодар.
                Финалист престижной премии Wedding Awards South 21, 22, 24, 25.
                Автор курса «Организатор со смыслом», в рамках которого
                выпустила более 30 учениц. Я и моя команда создаем эстетичные
                креативные проекты, наполненные смыслом и режиссурой с 2017
                года. На моем счету более 500 организованных проектов под ключ в
                Краснодаре, Сочи и Москве.
              </p>

              <div className="mt-6 h-px w-16 bg-brand-green/30" />

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#budget"
                  className="inline-flex items-center justify-center rounded-2xl bg-brand-green px-6 py-3 font-ui text-sm font-medium text-brand-paper transition hover:bg-brand-hover"
                >
                  Рассчитать за 5 минут
                </Link>

                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center rounded-2xl border border-brand-dark/20 bg-brand-paper px-6 py-3 font-ui text-sm font-medium text-brand-dark transition hover:border-brand-green/40 hover:text-brand-deep"
                >
                  Связаться
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-brand-dark/10 bg-white p-6 sm:p-8">
              <h3 className="font-display font-light text-2xl leading-[1.02] tracking-[-0.015em] text-brand-dark sm:text-3xl">
                Мой подход
              </h3>

              <div className="mt-6 grid gap-4">
                {[
                  ["Спокойствие", "Чёткий план и понятные шаги."],
                  [
                    "Эстетика",
                    "Чистая визуальная история и внимание к деталям.",
                  ],
                  [
                    "Контроль",
                    "Сроки, бюджет, подрядчики — всё под контролем.",
                  ],
                  ["Забота", "Сервис и поддержка на каждом этапе."],
                ].map(([t, d]) => (
                  <div
                    key={t}
                    className="rounded-2xl border border-brand-dark/10 bg-white p-5"
                  >
                    <div className="font-ui text-[11px] uppercase tracking-[0.14em] text-brand-brown/45">
                      {t}
                    </div>
                    <div className="mt-2 font-ui text-sm leading-[1.7] text-brand-brown/88">
                      {d}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="budget"
        className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:py-24"
      >
        <div className="rounded-[2.5rem] border border-brand-dark/10 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-10">
          <BudgetCalculator />
        </div>
      </section>
    </main>
  );
}
