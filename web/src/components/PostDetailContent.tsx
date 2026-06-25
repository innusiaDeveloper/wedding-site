"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { directusAssetUrl } from "@/lib/seo";
import type { Post, PostMedia } from "@/lib/posts";

type Slide = {
  id: number;
  type: string;
  fileUrl: string;
  posterUrl: string | undefined;
};

function sortMedia(media: PostMedia[]) {
  return [...media].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
}

export function PostDetailContent({
  post,
  compact = false,
}: {
  post: Post;
  compact?: boolean;
}) {
  const media = useMemo(() => sortMedia(post.media ?? []), [post.media]);

  const slides = useMemo<Slide[]>(() => {
    return media
      .map((item) => {
        const fileId =
          typeof item.file === "string" ? item.file : item.file?.id;

        if (!fileId) return null;

        const posterId =
          typeof item.poster === "string" ? item.poster : item.poster?.id;

        return {
          id: item.id,
          type: item.type ?? "",
          fileUrl: directusAssetUrl(fileId),
          posterUrl: posterId
            ? directusAssetUrl(posterId, {
                width: 1400,
                quality: 85,
                fit: "cover",
              })
            : undefined,
        };
      })
      .filter((slide): slide is Slide => Boolean(slide));
  }, [media]);

  const [activeIndex, setActiveIndex] = useState(0);

  const active = slides[activeIndex] ?? null;

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const isVideo = (type: string) => type.startsWith("video");

  if (compact) {
    return (
      <div className="grid h-full grid-cols-1 md:grid-cols-[minmax(0,1fr)_380px]">
        <div className="relative flex min-h-[320px] items-center justify-center bg-black">
          {active ? (
            <>
              <div className="relative h-full w-full">
                {isVideo(active.type) ? (
                  <video
                    key={active.id}
                    src={active.fileUrl}
                    poster={active.posterUrl}
                    controls
                    playsInline
                    className="h-full w-full object-contain bg-black"
                  />
                ) : (
                  <Image
                    src={active.fileUrl}
                    alt={post.title ?? ""}
                    fill
                    unoptimized
                    className="object-contain bg-black"
                  />
                )}
              </div>

              {slides.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Предыдущее"
                    className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/75"
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Следующее"
                    className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/75"
                  >
                    →
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="font-ui text-sm text-white/70">Нет медиа</div>
          )}
        </div>

        <div className="flex min-h-0 flex-col bg-white">
          <div className="border-b border-brand-dark/10 px-5 py-4 pr-16">
            <h1 className="font-display text-2xl sm:text-3xl">{post.title}</h1>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
            {post.caption ? (
              <p className="whitespace-pre-line font-ui text-sm leading-relaxed text-brand-brown">
                {post.caption}
              </p>
            ) : (
              <p className="font-ui text-sm text-brand-brown/70">
                Описание отсутствует
              </p>
            )}

            {slides.length > 1 && (
              <div className="mt-6">
                <div className="mb-3 font-ui text-xs uppercase tracking-[0.16em] text-brand-olive">
                  Галерея
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={[
                        "relative aspect-square overflow-hidden rounded-xl border transition",
                        index === activeIndex
                          ? "border-brand-green"
                          : "border-brand-dark/10",
                      ].join(" ")}
                    >
                      {isVideo(slide.type) ? (
                        slide.posterUrl ? (
                          <Image
                            src={slide.posterUrl}
                            alt={post.title ?? ""}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-black text-xs text-white">
                            Video
                          </div>
                        )
                      ) : (
                        <Image
                          src={slide.fileUrl}
                          alt={post.title ?? ""}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between gap-6">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl">{post.title}</h1>

            {post.caption && (
              <p className="mt-4 max-w-3xl whitespace-pre-line font-ui text-sm leading-relaxed text-brand-brown">
                {post.caption}
              </p>
            )}
          </div>

          <Link
            href="/posts"
            className="hidden sm:inline-flex items-center justify-center rounded-2xl border border-brand-dark/20 bg-brand-paper px-6 py-3 font-ui text-sm font-medium text-brand-dark transition hover:border-brand-green/40 hover:text-brand-deep"
          >
            Все публикации
          </Link>
        </div>

        {slides.length === 0 ? (
          <div className="rounded-[2rem] border border-brand-dark/10 bg-white p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <p className="font-ui text-brand-brown/75">
              Медиа для этой публикации пока не добавлены.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            {slides.map((slide) =>
              isVideo(slide.type) ? (
                <video
                  key={slide.id}
                  src={slide.fileUrl}
                  poster={slide.posterUrl}
                  controls
                  playsInline
                  className="aspect-[9/16] w-full rounded-[2rem] bg-black object-cover"
                />
              ) : (
                <div
                  key={slide.id}
                  className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-brand-olive/10"
                >
                  <Image
                    src={slide.fileUrl}
                    alt={post.title ?? ""}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              ),
            )}
          </div>
        )}

        <div className="mt-10 sm:hidden">
          <Link
            href="/posts"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-brand-green px-6 py-3 font-ui text-sm font-medium text-brand-paper transition hover:bg-brand-hover"
          >
            Все публикации
          </Link>
        </div>
      </div>
    </div>
  );
}
