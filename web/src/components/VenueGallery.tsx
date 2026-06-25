"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type VenueGalleryImage = {
  id: string;
  alt?: string | null;
};

export function VenueGallery({
  title,
  subtitle,
  images,
}: {
  title?: string;
  subtitle?: string;
  images: VenueGalleryImage[];
}) {
  const safeImages = useMemo(
    () => images.filter((i) => typeof i?.id === "string" && i.id.length > 0),
    [images],
  );

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const current = safeImages[index] ?? null;

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const close = () => setOpen(false);

  const prev = () =>
    setIndex((i) => (i - 1 + safeImages.length) % safeImages.length);

  const next = () => setIndex((i) => (i + 1) % safeImages.length);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, safeImages.length]);

  if (!safeImages.length) return null;

  return (
    <section className="mt-12">
      {title || subtitle ? (
        <header className="mb-6">
          {title ? (
            <h2 className="font-display text-3xl text-brand-dark">{title}</h2>
          ) : null}
          {subtitle ? (
            <p className="mt-2 font-ui text-base text-brand-brown">
              {subtitle}
            </p>
          ) : null}
        </header>
      ) : null}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {safeImages.map((img, i) => (
          <button
            key={`${img.id}-${i}`}
            type="button"
            onClick={() => openAt(i)}
            className="
              group relative aspect-[4/3] overflow-hidden rounded-2xl
              border border-brand-dark/10 bg-brand-paper
              shadow-[0_10px_30px_rgba(0,0,0,0.05)]
              transition
              hover:-translate-y-0.5 hover:border-brand-green/35
              hover:shadow-[0_18px_55px_rgba(0,0,0,0.10)]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40
            "
            aria-label={`Открыть фото ${i + 1}`}
          >
            <Image
              src={img.id}
              alt={img.alt ?? ""}
              fill
              unoptimized
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-dark/20 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
          </button>
        ))}
      </div>

      {open && current ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фотографий"
        >
          <button
            type="button"
            onClick={close}
            className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
            aria-label="Закрыть"
          />

          <div
            className="
              relative z-[101] w-full max-w-6xl overflow-hidden rounded-3xl
              border border-brand-paper/15 bg-brand-paper
              shadow-[0_30px_100px_rgba(0,0,0,0.35)]
            "
          >
            <div className="flex items-center justify-between gap-3 border-b border-brand-dark/10 px-4 py-3 sm:px-6">
              <div className="font-ui text-sm text-brand-brown">
                Фото <span className="text-brand-dark">{index + 1}</span> из{" "}
                <span className="text-brand-dark">{safeImages.length}</span>
              </div>

              <button
                type="button"
                onClick={close}
                className="
                  rounded-xl border border-brand-dark/15 bg-brand-paper px-3 py-2
                  font-ui text-sm text-brand-dark
                  transition hover:border-brand-green/40 hover:text-brand-hover
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40
                "
              >
                Закрыть ✕
              </button>
            </div>

            <div className="relative aspect-[16/10] w-full bg-brand-paper">
              <Image
                src={current.id}
                alt={current.alt ?? ""}
                fill
                unoptimized
                className="object-contain"
                priority
              />

              {safeImages.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="
                      absolute left-3 top-1/2 -translate-y-1/2
                      rounded-2xl border border-brand-dark/15 bg-brand-paper/90
                      px-3 py-3 font-ui text-sm text-brand-dark
                      shadow-[0_10px_24px_rgba(0,0,0,0.12)]
                      transition hover:border-brand-green/45 hover:text-brand-hover
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40
                    "
                    aria-label="Предыдущее фото"
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    className="
                      absolute right-3 top-1/2 -translate-y-1/2
                      rounded-2xl border border-brand-dark/15 bg-brand-paper/90
                      px-3 py-3 font-ui text-sm text-brand-dark
                      shadow-[0_10px_24px_rgba(0,0,0,0.12)]
                      transition hover:border-brand-green/45 hover:text-brand-hover
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40
                    "
                    aria-label="Следующее фото"
                  >
                    →
                  </button>
                </>
              ) : null}
            </div>

            {safeImages.length > 1 ? (
              <div className="border-t border-brand-dark/10 bg-white px-3 py-3 sm:px-6">
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {safeImages.map((img, i) => {
                    const active = i === index;
                    return (
                      <button
                        key={`${img.id}-thumb-${i}`}
                        type="button"
                        onClick={() => setIndex(i)}
                        className={[
                          "relative h-16 w-24 flex-none overflow-hidden rounded-xl border bg-brand-paper transition",
                          active
                            ? "border-brand-green/60 ring-2 ring-brand-green/25"
                            : "border-brand-dark/10 hover:border-brand-green/35",
                        ].join(" ")}
                        aria-label={`Перейти к фото ${i + 1}`}
                      >
                        <Image
                          src={img.id}
                          alt={img.alt ?? ""}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </button>
                    );
                  })}
                </div>

                <p className="mt-2 font-ui text-xs text-brand-brown"></p>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
