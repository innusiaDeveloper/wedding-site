"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { VenueGallery } from "@/components/VenueGallery";

type Hall = {
  id: number;
  title: string;
  description?: string | null;
  coverUrl?: string | null;
  images: Array<{ id: string; alt: string }>;
};

export function VenueHallsTabs({ halls }: { halls: Hall[] }) {
  const safeHalls = useMemo(() => halls ?? [], [halls]);
  const [activeId, setActiveId] = useState<number>(safeHalls[0]?.id ?? 0);

  const active = safeHalls.find((h) => h.id === activeId) ?? safeHalls[0];
  if (!active) return null;

  return (
    <section className="mt-6">
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {safeHalls.map((h) => {
          const activeTab = h.id === activeId;

          return (
            <button
              key={h.id}
              type="button"
              onClick={() => setActiveId(h.id)}
              className={[
                "rounded-full border px-4 py-2 font-ui text-sm transition",
                activeTab
                  ? "border-brand-green/35 bg-brand-green text-brand-paper"
                  : "border-brand-dark/10 bg-white text-brand-brown hover:border-brand-green/30 hover:text-brand-deep",
              ].join(" ")}
            >
              {h.title}
            </button>
          );
        })}
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-brand-dark/10 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
        <div className="relative h-[260px] sm:h-[380px] lg:h-[460px]">
          {active.coverUrl ? (
            <>
              <Image
                src={active.coverUrl}
                alt={active.title}
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
            </>
          ) : (
            <div className="h-full w-full bg-brand-olive/10" />
          )}

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <h3 className="font-display font-light text-3xl leading-[1] tracking-[-0.02em] text-white drop-shadow-lg sm:text-5xl">
              {active.title}
            </h3>
          </div>
        </div>

        {active.description ? (
          <div className="border-t border-brand-dark/10 bg-brand-paper p-6 sm:p-8">
            <div
              className="
        prose prose-lg max-w-none

        prose-headings:font-display
        prose-headings:font-light
        prose-headings:text-brand-dark

        prose-h3:mt-8
        prose-h3:mb-4
        prose-h3:text-2xl

        prose-p:text-brand-brown
        prose-p:leading-8

        prose-ul:my-5
        prose-ul:pl-6

        prose-li:text-brand-brown
        prose-li:leading-8
        prose-li:marker:text-brand-green
      "
              dangerouslySetInnerHTML={{
                __html: active.description,
              }}
            />
          </div>
        ) : null}

        <div className="p-6 sm:p-8">
          {active.images.length > 0 ? (
            <VenueGallery
              title={`Фото зала: ${active.title}`}
              subtitle="Атмосфера, детали, расстановка."
              images={active.images}
            />
          ) : (
            <div className="font-ui text-sm text-brand-brown/75">
              Добавь фото в галерею этого зала в Directus — и они появятся
              здесь.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
