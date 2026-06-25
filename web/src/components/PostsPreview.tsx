import Link from "next/link";
import Image from "next/image";

import { directusAssetUrl } from "@/lib/seo";
import type { Post, PostMedia } from "@/lib/posts";

function pickCoverMedia(post: Post): PostMedia | null {
  const media = (post.media ?? [])
    .slice()
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));

  return media.find((m) => m.is_cover) || media[0] || null;
}

function clampText(text: string, max = 120) {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length > max ? t.slice(0, max).trim() + "…" : t;
}

function isVideo(type?: string | null) {
  return Boolean(type?.startsWith("video"));
}

function getFileId(value: string | { id: string } | null | undefined) {
  if (!value) return null;
  return typeof value === "string" ? value : value.id;
}

export function PostsPreview({
  title = "Публикации",
  posts,
}: {
  title?: string;
  posts: Post[];
}) {
  const safePosts = posts.filter(
    (post) => typeof post.slug === "string" && post.slug.trim().length > 0,
  );

  if (safePosts.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:py-24">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <h2 className="font-display text-5xl text-brand-dark sm:text-6xl">
            {title}
          </h2>

          <p className="mt-4 max-w-2xl font-ui text-lg leading-[1.7] text-brand-brown">
            Небольшое превью — остальные публикации смотрите в ленте.
          </p>
        </div>

        <Link
          href="/posts"
          className="
            hidden items-center justify-center rounded-2xl
            border border-brand-dark/20 bg-brand-paper
            px-6 py-3 font-ui text-sm font-medium text-brand-dark
            transition-all duration-300
            hover:border-brand-hover/40 hover:text-brand-hover
            focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/35
            sm:inline-flex
          "
        >
          Смотреть все
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {safePosts.map((post) => {
          const cover = pickCoverMedia(post);

          const coverFileId = isVideo(cover?.type)
            ? getFileId(cover?.poster)
            : getFileId(cover?.file);

          const coverUrl = coverFileId
            ? directusAssetUrl(coverFileId, {
                width: 900,
                quality: 85,
                fit: "cover",
              })
            : null;

          return (
            <Link
              key={post.id}
              href={`/posts/${post.slug}`}
              className="
                group relative block overflow-hidden
                rounded-[2.5rem]
                border border-brand-dark/10 bg-white
                shadow-[0_20px_60px_rgba(0,0,0,0.06)]
                transition-all duration-500
                hover:-translate-y-1
                hover:shadow-[0_28px_90px_rgba(0,0,0,0.12)]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/35
              "
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-olive/10">
                {coverUrl ? (
                  <Image
                    src={coverUrl}
                    alt={post.title ?? "Публикация"}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="
                      object-cover
                      transition duration-700
                      group-hover:scale-[1.03]
                    "
                  />
                ) : (
                  <div className="absolute inset-0 bg-brand-olive/10" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

                {isVideo(cover?.type) ? (
                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 font-ui text-xs text-white backdrop-blur">
                    <span className="h-2 w-2 rounded-full bg-white/80" />
                    Reels
                  </div>
                ) : null}

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl leading-[1.05] text-white">
                    {post.title ?? "Публикация"}
                  </h3>

                  {post.caption ? (
                    <p className="mt-2 font-ui text-sm leading-relaxed text-white/85">
                      {clampText(post.caption, 120)}
                    </p>
                  ) : (
                    <p className="mt-2 font-ui text-sm text-white/75">
                      Открыть публикацию
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 sm:hidden">
        <Link
          href="/posts"
          className="
            inline-flex w-full items-center justify-center
            rounded-2xl bg-brand-green
            px-6 py-3 font-ui text-sm font-medium text-brand-paper
            shadow-sm
            transition-all duration-300
            hover:bg-brand-hover
            focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/35
          "
        >
          Смотреть все публикации
        </Link>
      </div>
    </section>
  );
}
