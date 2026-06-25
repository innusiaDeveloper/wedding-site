import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { directusAssetUrl } from "@/lib/seo";
import { getPostsWithMedia, type Post, type PostMedia } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Публикации | ALEKSANDRA.PIROG.RU",
  description: "Публикации, Reels, фото и истории проектов.",
};

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

export default async function PostsPage() {
  const posts = await getPostsWithMedia();

  const safePosts = posts.filter(
    (post) => typeof post.slug === "string" && post.slug.trim().length > 0,
  );

  return (
    <main className="min-h-screen bg-brand-paper text-brand-dark">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:py-24">
        <header className="mb-10">
          <h1 className="font-display font-light text-4xl leading-[0.98] tracking-[-0.02em] text-brand-dark sm:text-5xl lg:text-6xl">
            Публикации
          </h1>

          <p className="mt-4 max-w-2xl font-ui text-base leading-[1.75] text-brand-brown/85">
            Reels, фотографии, детали и визуальные истории проектов.
          </p>
        </header>

        {safePosts.length === 0 ? (
          <div className="rounded-[2rem] border border-brand-dark/10 bg-white p-8 text-center shadow-[0_12px_36px_rgba(0,0,0,0.06)]">
            <h2 className="font-display font-light text-3xl tracking-[-0.015em] text-brand-dark">
              Публикации скоро появятся
            </h2>

            <p className="mt-3 font-ui text-brand-brown/75">
              Мы готовим новые материалы.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {safePosts.map((post) => {
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
                            {post.title ?? "Публикация"}
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
        )}
      </div>
    </main>
  );
}
