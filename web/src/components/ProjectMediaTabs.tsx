"use client";

import { useMemo, useState } from "react";
import { MediaGalleryLightbox } from "@/components/MediaGalleryLightbox";

export type MediaTabItem = {
  id: number;
  type: "Photo" | "Video";
  src: string;
  alt?: string | null;
};

type Props = {
  reels: MediaTabItem[];
  photos: MediaTabItem[];
};

type Tab = "all" | "photos" | "reels";

export function ProjectMediaTabs({ reels, photos }: Props) {
  const hasReels = reels.length > 0;
  const hasPhotos = photos.length > 0;

  // Если есть только один тип — сразу открываем его, а не "all"
  const defaultTab: Tab =
    hasReels && hasPhotos ? "all" : hasPhotos ? "photos" : "reels";

  const [tab, setTab] = useState<Tab>(defaultTab);

  const allCount = reels.length + photos.length;

  const tabs = useMemo(() => {
    const result: Array<{ key: Tab; label: string; count: number }> = [];

    if (hasReels && hasPhotos) {
      result.push({ key: "all", label: "All", count: allCount });
    }

    if (hasPhotos)
      result.push({ key: "photos", label: "Photos", count: photos.length });
    if (hasReels)
      result.push({ key: "reels", label: "Reels", count: reels.length });

    return result;
  }, [hasReels, hasPhotos, allCount, photos.length, reels.length]);

  const showReels = (tab === "all" || tab === "reels") && hasReels;
  const showPhotos = (tab === "all" || tab === "photos") && hasPhotos;

  return (
    <section className="mt-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-xl font-semibold">Media</h2>

        {tabs.length > 1 ? (
          <div className="inline-flex w-fit items-center gap-1 rounded-2xl border border-white/10 bg-white/5 p-1">
            {tabs.map((t) => {
              const isActive = tab === t.key;

              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  className={[
                    "rounded-xl px-3 py-2 text-sm transition",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white",
                  ].join(" ")}
                >
                  {t.label}{" "}
                  <span className="ml-1 text-xs text-white/50">
                    ({t.count})
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      {/* REELS */}
      {showReels && (
        <div className="mt-6">
          <div className="mb-4 flex items-end justify-between gap-4">
            <h3 className="text-lg font-semibold">Reels</h3>
            <p className="text-xs text-white/50">Short videos (up to 30s)</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reels.map((item) => (
              <div
                key={`reel-${item.id}`}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <div className="relative aspect-[9/16] w-full bg-black">
                  <video
                    src={item.src}
                    controls
                    preload="metadata"
                    playsInline
                    muted
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <div className="text-xs text-white/60">
                    {item.alt ?? "Reel"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PHOTOS */}
      {showPhotos && (
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold">Gallery</h3>
          <MediaGalleryLightbox items={photos} />
        </div>
      )}

      {/* EMPTY */}
      {allCount === 0 && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
          No media yet. Add photos or reels in Directus.
        </div>
      )}
    </section>
  );
}
