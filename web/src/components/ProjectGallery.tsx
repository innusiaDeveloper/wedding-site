"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  type: "image" | "video";
  poster: string | null;
};

type Props = {
  title?: string;
  subtitle?: string;
  images: GalleryItem[];
};

export function ProjectGallery({
  title = "Фотографии проекта",
  subtitle,
  images,
}: Props) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeItem =
    activeIndex !== null ? (safeImages[activeIndex] ?? null) : null;

  function openAt(index: number) {
    setActiveIndex(index);
  }

  function close() {
    setActiveIndex(null);
  }

  function goPrev() {
    if (activeIndex === null) return;

    setActiveIndex((prev) =>
      prev === null ? 0 : prev === 0 ? safeImages.length - 1 : prev - 1,
    );
  }

  function goNext() {
    if (activeIndex === null) return;

    setActiveIndex((prev) =>
      prev === null ? 0 : prev === safeImages.length - 1 ? 0 : prev + 1,
    );
  }

  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (activeIndex === null) return;

      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, safeImages.length]);

  if (!safeImages.length) {
    return (
      <section className="mt-10 rounded-3xl border border-brand-dark/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-8">
        <p className="font-ui text-brand-brown/70">
          Пока нет фотографий в галерее для этого проекта.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-10 rounded-3xl border border-brand-dark/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-8">
      <div className="max-w-3xl">
        <h2 className="font-display text-3xl text-brand-dark">{title}</h2>

        {subtitle ? (
          <p className="mt-3 font-ui text-sm leading-relaxed text-brand-brown">
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {safeImages.map((item, index) => (
          <button
            key={`${item.id}-${index}`}
            type="button"
            onClick={() => openAt(index)}
            className="
              group relative overflow-hidden rounded-2xl
              border border-brand-dark/10 bg-brand-olive/10
              focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/35
            "
          >
            <div className="relative aspect-[4/5]">
              {item.type === "video" ? (
                <>
                  <video
                    src={item.src}
                    poster={item.poster ?? undefined}
                    muted
                    playsInline
                    preload="metadata"
                    className="
                      h-full w-full object-cover
                      transition duration-500 group-hover:scale-[1.02]
                    "
                  />

                  <div className="absolute inset-0 bg-black/10" />

                  <div className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 font-ui text-xs text-white backdrop-blur">
                    Видео
                  </div>
                </>
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="
                    object-cover
                    transition duration-500 group-hover:scale-[1.02]
                  "
                />
              )}
            </div>
          </button>
        ))}
      </div>

      {activeItem ? (
        <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-[3px]">
          <button
            type="button"
            onClick={close}
            className="absolute inset-0"
            aria-label="Закрыть галерею"
          />

          <div className="relative z-[121] flex h-full w-full items-center justify-center p-4 sm:p-6">
            <div
              className="
                relative w-full max-w-[1280px]
                rounded-[2rem] border border-black/10 bg-white
                shadow-[0_30px_100px_rgba(0,0,0,0.25)]
              "
            >
              <div className="flex items-center justify-between gap-4 border-b border-brand-dark/10 px-6 py-5">
                <div className="font-ui text-sm text-brand-brown">
                  Фото {activeIndex! + 1} из {safeImages.length}
                </div>

                <button
                  type="button"
                  onClick={close}
                  className="
                    inline-flex items-center justify-center
                    rounded-2xl border border-brand-dark/10
                    bg-white px-5 py-3
                    font-ui text-sm text-brand-dark
                    transition
                    hover:border-brand-hover/45 hover:text-brand-hover
                  "
                >
                  Закрыть ✕
                </button>
              </div>

              <div
                className="
                  relative flex min-h-[70vh]
                  items-center justify-center
                  bg-white px-16 py-6 sm:px-20
                "
              >
                <button
                  type="button"
                  onClick={goPrev}
                  className="
                    absolute left-4 top-1/2 z-10 -translate-y-1/2
                    inline-flex h-12 w-12 items-center justify-center
                    rounded-full border border-brand-dark/10
                    bg-white text-brand-dark
                    shadow-[0_10px_25px_rgba(0,0,0,0.08)]
                    transition
                   hover:border-brand-hover/45 hover:text-brand-hover
                  "
                >
                  ←
                </button>

                <div className="relative flex max-h-[70vh] w-full items-center justify-center overflow-hidden">
                  {activeItem.type === "video" ? (
                    <video
                      src={activeItem.src}
                      poster={activeItem.poster ?? undefined}
                      controls
                      autoPlay
                      playsInline
                      className="
                        max-h-[70vh] max-w-full
                        rounded-xl object-contain
                      "
                    />
                  ) : (
                    <Image
                      src={activeItem.src}
                      alt={activeItem.alt}
                      width={1400}
                      height={1800}
                      unoptimized
                      className="
                        max-h-[70vh] w-auto max-w-full
                        rounded-xl object-contain
                      "
                    />
                  )}
                </div>

                <button
                  type="button"
                  onClick={goNext}
                  className="
                    absolute right-4 top-1/2 z-10 -translate-y-1/2
                    inline-flex h-12 w-12 items-center justify-center
                    rounded-full border border-brand-dark/10
                    bg-white text-brand-dark
                    shadow-[0_10px_25px_rgba(0,0,0,0.08)]
                    transition
                   hover:border-brand-hover/45 hover:text-brand-hover
                  "
                >
                  →
                </button>
              </div>

              <div className="border-t border-brand-dark/10 px-6 py-4">
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {safeImages.map((item, index) => (
                    <button
                      key={`${item.id}-thumb-${index}`}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={[
                        "relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border transition",
                        index === activeIndex
                          ? "border-brand-green shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
                          : "border-brand-dark/10 hover:border-brand-hover/45",
                      ].join(" ")}
                    >
                      {item.type === "video" ? (
                        <video
                          src={item.src}
                          poster={item.poster ?? undefined}
                          muted
                          playsInline
                          preload="metadata"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
