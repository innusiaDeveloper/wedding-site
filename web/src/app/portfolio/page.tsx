import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { directusFetch } from "@/lib/directus";
import { directusAssetUrl } from "@/lib/seo";

import {
  PortfolioConsultationCTA,
  PortfolioConsultationBottomCTA,
} from "@/components/PortfolioConsultationCTA";

export const metadata: Metadata = {
  title: "Портфолио свадебного организатора",

  description:
    "Портфолио свадебного организатора Александры Пирог: реальные свадьбы в Краснодаре, Сочи, Москве и других городах России. Концепции, площадки, декор и детали проектов.",

  alternates: {
    canonical: "/portfolio",
  },

  openGraph: {
    type: "website",
    url: "/portfolio",
    title: "Портфолио свадебного организатора Александры Пирог",
    description:
      "Реальные свадьбы в Краснодаре, Сочи, Москве и других городах России: концепции, площадки, декор, детали и атмосфера проектов.",
  },
};

type Project = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  cover?: string | { id: string } | null;
};

export default async function PortfolioPage() {
  const res = await directusFetch<{ data: Project[] }>(
    `/items/projects?fields=id,title,slug,excerpt,cover.id&filter[status][_eq]=published&sort=-date_created&limit=50`,
  );

  const projects = res.data ?? [];

  const safeProjects = projects.filter(
    (project) =>
      typeof project.slug === "string" && project.slug.trim().length > 0,
  );

  return (
    <main className="min-h-screen bg-brand-paper text-brand-dark">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20 lg:py-24">
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display font-light text-4xl leading-[0.98] tracking-[-0.02em] text-brand-dark sm:text-5xl lg:text-6xl">
              Портфолио свадебного организатора
            </h1>

            <p className="mt-4 max-w-2xl font-ui text-base leading-[1.75] text-brand-brown/85">
              Реальные свадьбы в Краснодаре, Сочи, Москве и других городах
              России: концепции, площадки, декор, детали и атмосфера наших
              проектов.
            </p>
          </div>

          <div className="shrink-0">
            <PortfolioConsultationCTA />
          </div>
        </header>

        {safeProjects.length === 0 ? (
          <div className="rounded-[2rem] border border-brand-dark/10 bg-white p-8 text-center shadow-[0_12px_36px_rgba(0,0,0,0.06)]">
            <h2 className="font-display font-light text-3xl tracking-[-0.015em] text-brand-dark">
              Проекты скоро появятся
            </h2>

            <p className="mt-3 font-ui text-brand-brown/75">
              Мы готовим новые кейсы и визуальные истории.
            </p>
          </div>
        ) : (
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {safeProjects.map((p) => {
              const coverId =
                typeof p.cover === "string" ? p.cover : (p.cover?.id ?? null);

              const coverUrl = coverId
                ? directusAssetUrl(coverId, {
                    width: 900,
                    quality: 76,
                    fit: "cover",
                  })
                : null;

              return (
                <Link
                  key={p.id}
                  href={`/portfolio/${encodeURIComponent(p.slug)}`}
                  className="
                    group mb-6 block break-inside-avoid overflow-hidden rounded-3xl
                    border border-brand-dark/10 bg-white
                    shadow-[0_12px_36px_rgba(0,0,0,0.06)]
                    transition-all duration-500
                    hover:-translate-y-1 hover:border-brand-green/35
                    hover:shadow-[0_24px_70px_rgba(0,0,0,0.12)]
                  "
                >
                  <div className="relative overflow-hidden">
                    {coverUrl ? (
                      <Image
                        src={coverUrl}
                        alt={`${p.title} — свадебный проект Александры Пирог`}
                        width={1200}
                        height={1500}
                        unoptimized
                        className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="h-[420px] bg-brand-olive/20" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/75 via-brand-dark/20 to-transparent transition duration-500 group-hover:from-brand-dark/85" />

                    <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-ui text-[11px] uppercase tracking-[0.16em] text-white/90 backdrop-blur">
                      Project
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h2 className="font-display font-light text-2xl leading-[1.02] tracking-[-0.015em] text-white">
                        {p.title}
                      </h2>

                      {p.excerpt ? (
                        <p className="mt-2 line-clamp-2 font-ui text-sm leading-[1.7] text-white/82">
                          {p.excerpt}
                        </p>
                      ) : null}

                      <div className="mt-4 inline-flex items-center text-sm font-ui text-white/90 opacity-80 transition duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                        Открыть
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <PortfolioConsultationBottomCTA />
      </div>
    </main>
  );
}
