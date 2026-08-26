"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { directusAssetUrl } from "@/lib/seo";
import type { Post, PostMedia } from "@/lib/posts";

type FeedSlide = {
  id: number;
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
};

function isVideoType(type?: string | null) {
  const value = (type ?? "").toLowerCase();

  return (
    value.includes("video") ||
    value.includes("видео") ||
    value.includes("reels")
  );
}

function getFileId(value: string | { id: string } | null | undefined) {
  if (!value) return null;
  return typeof value === "string" ? value : value.id;
}

function sortMedia(media: PostMedia[]) {
  return [...media].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
}

function makeSlides(post: Post): FeedSlide[] {
  return sortMedia(post.media ?? [])
    .map((item) => {
      const fileId = getFileId(item.file);
      if (!fileId) return null;

      const posterId = getFileId(item.poster);
      const isVideo = isVideoType(item.type);

      return {
        id: item.id,
        type: isVideo ? "video" : "image",
        src: isVideo
          ? directusAssetUrl(fileId)
          : directusAssetUrl(fileId, {
              width: 900,
              quality: 76,
              fit: "cover",
            }),
        poster: posterId
          ? directusAssetUrl(posterId, {
              width: 900,
              quality: 76,
              fit: "cover",
            })
          : undefined,
        alt: item.caption ?? post.title ?? "Публикация",
      };
    })
    .filter(Boolean) as FeedSlide[];
}

function clampText(text: string, max = 260) {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length > max ? t.slice(0, max).trim() + "…" : t;
}

function PostCard({ post }: { post: Post }) {
  const slides = useMemo(() => makeSlides(post), [post]);
  const [activeIndex, setActiveIndex] = useState(0);

  const active = slides[activeIndex] ?? null;
  const hasMultiple = slides.length > 1;

  const prev = () => {
    setActiveIndex((current) =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

  const next = () => {
    setActiveIndex((current) =>
      current === slides.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <article className="overflow-hidden rounded-[2.5rem] border border-brand-dark/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-olive/10">
        {active ? (
          active.type === "video" ? (
            <video
              key={active.id}
              poster={active.poster}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full bg-black object-cover"
            >
              <source src={active.src} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={active.src}
              alt={active.alt}
              fill
              unoptimized
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          )
        ) : (
          <div className="flex h-full items-center justify-center font-ui text-sm text-brand-brown/60">
            Медиа не добавлено
          </div>
        )}

        {active?.type === "video" && (
          <div className="absolute left-5 top-5 rounded-full bg-black/50 px-3 py-1.5 font-ui text-xs text-white backdrop-blur">
            ● Reels
          </div>
        )}

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Предыдущее фото"
              className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-brand-dark shadow-lg backdrop-blur transition hover:bg-white"
            >
              ←
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Следующее фото"
              className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-brand-dark shadow-lg backdrop-blur transition hover:bg-white"
            >
              →
            </button>

            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Открыть слайд ${index + 1}`}
                  className={[
                    "h-2.5 w-2.5 rounded-full border border-white/70 transition",
                    index === activeIndex ? "bg-white" : "bg-white/40",
                  ].join(" ")}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-5 sm:p-6">
        <h2 className="font-display font-light text-2xl leading-[1.05] tracking-[-0.015em] text-brand-dark">
          {post.title ?? "Публикация"}
        </h2>

        {post.caption ? (
          <p className="mt-3 whitespace-pre-line font-ui text-sm leading-[1.75] text-brand-brown/80">
            {clampText(post.caption, 420)}
          </p>
        ) : (
          <p className="mt-3 font-ui text-sm text-brand-brown/60">
            Описание отсутствует
          </p>
        )}
      </div>
    </article>
  );
}

export function PostsFeed({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-[2rem] border border-brand-dark/10 bg-white p-8 text-center shadow-[0_12px_36px_rgba(0,0,0,0.06)]">
        <h2 className="font-display font-light text-3xl tracking-[-0.015em] text-brand-dark">
          Публикации скоро появятся
        </h2>

        <p className="mt-3 font-ui text-brand-brown/75">
          Мы готовим новые материалы.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
