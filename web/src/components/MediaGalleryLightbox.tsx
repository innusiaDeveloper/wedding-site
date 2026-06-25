"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

export type MediaLightboxItem = {
  id: number;
  type: "Photo" | "Video";
  src: string;
  alt?: string | null;
};

export function MediaGalleryLightbox({
  items,
}: {
  items: MediaLightboxItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const open = (index: number) => setOpenIndex(index);
  const close = () => setOpenIndex(null);

  const hasItems = items.length > 0;

  const current = useMemo(() => {
    if (openIndex === null) return null;
    return items[openIndex] ?? null;
  }, [items, openIndex]);

  const prev = () => {
    if (openIndex === null) return;
    setOpenIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  };

  const next = () => {
    if (openIndex === null) return;
    setOpenIndex((i) => (i === items.length - 1 ? 0 : i + 1));
  };

  useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKeyDown);

    // Prevent background scroll while modal open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex, items.length]);

  if (!hasItems) return null;

  return (
    <>
      {/* GRID */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => open(idx)}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left"
            aria-label={`Open ${item.type.toLowerCase()}`}
          >
            {/* Thumb */}
            {item.type === "Video" ? (
              <div className="relative aspect-4/5 w-full">
                <video
                  src={item.src}
                  className="h-full w-full object-cover"
                  preload="metadata"
                  muted
                  playsInline
                />
                <div className="pointer-events-none absolute inset-0 grid place-items-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-black/60 ring-1 ring-white/20 backdrop-blur">
                    ▶
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative aspect-4/5 w-full">
                <Image
                  src={item.src}
                  alt={item.alt ?? ""}
                  fill
                  unoptimized
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}

            {/* Hover overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
            </div>
          </button>
        ))}
      </div>

      {/* MODAL */}
      {openIndex !== null && current && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            // Click outside closes
            if (e.target === e.currentTarget) close();
          }}
        >
          {/* Top bar */}
          <div className="absolute left-0 right-0 top-0 flex items-center justify-between gap-3 p-4">
            <div className="text-xs text-white/70">
              {openIndex + 1} / {items.length}
            </div>

            <button
              type="button"
              onClick={close}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Close
            </button>
          </div>

          {/* Prev/Next */}
          <button
            type="button"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white/90 hover:bg-white/10"
            aria-label="Previous"
          ></button>

          <button
            type="button"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white/90 hover:bg-white/10"
            aria-label="Next"
          ></button>

          {/* Content */}
          <div className="mx-auto grid h-full max-w-6xl place-items-center px-5 py-16">
            <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              {current.type === "Video" ? (
                <video
                  src={current.src}
                  controls
                  preload="metadata"
                  playsInline
                  className="max-h-[80vh] w-full bg-black"
                />
              ) : (
                <div className="relative h-[80vh] w-full">
                  <Image
                    src={current.src}
                    alt={current.alt ?? ""}
                    fill
                    unoptimized
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
