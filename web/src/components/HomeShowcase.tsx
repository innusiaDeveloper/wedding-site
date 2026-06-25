import Link from "next/link";
import Image from "next/image";

import { directusFetch } from "@/lib/directus";
import { directusAssetUrl } from "@/lib/seo";

type Item = {
  id: number;
  title: string;
  slug: string;
  cover?: { id: string } | string | null;
};

function coverUrl(cover: Item["cover"], w: number) {
  const id = typeof cover === "string" ? cover : (cover?.id ?? null);
  return id
    ? directusAssetUrl(id, { width: w, quality: 85, fit: "cover" })
    : null;
}

function Mosaic({ items }: { items: Item[] }) {
  // 3 картинки: большая + две маленьких
  const a = items[0];
  const b = items[1];
  const c = items[2];

  const aUrl = a ? coverUrl(a.cover, 1200) : null;
  const bUrl = b ? coverUrl(b.cover, 900) : null;
  const cUrl = c ? coverUrl(c.cover, 900) : null;

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="relative overflow-hidden rounded-3xl sm:col-span-2">
        {aUrl ? (
          <Image
            src={aUrl}
            alt={a?.title ?? ""}
            fill
            unoptimized
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            sizes="(min-width: 640px) 66vw, 100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-brand-olive/15" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/45 via-transparent to-transparent" />
      </div>

      <div className="grid gap-3">
        <div className="relative overflow-hidden rounded-3xl">
          {bUrl ? (
            <Image
              src={bUrl}
              alt={b?.title ?? ""}
              fill
              unoptimized
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
              sizes="(min-width: 640px) 33vw, 100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-brand-olive/15" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/35 via-transparent to-transparent" />
        </div>

        <div className="relative overflow-hidden rounded-3xl">
          {cUrl ? (
            <Image
              src={cUrl}
              alt={c?.title ?? ""}
              fill
              unoptimized
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
              sizes="(min-width: 640px) 33vw, 100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-brand-olive/15" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/35 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
}

function ShowcaseCard({
  href,
  title,
  subtitle,
  items,
  cta,
}: {
  href: string;
  title: string;
  subtitle: string;
  items: Item[];
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="
        group block
        rounded-[2.5rem]
        border border-brand-dark/10
        bg-white/60
        backdrop-blur-xl
        shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        transition
        hover:-translate-y-1 hover:border-brand-green/35 hover:shadow-[0_28px_80px_rgba(0,0,0,0.12)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40
      "
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="font-display text-3xl text-brand-dark sm:text-4xl">
              {title}
            </div>
            <p className="mt-3 max-w-xl font-ui text-sm text-brand-brown sm:text-base">
              {subtitle}
            </p>
          </div>

          <div
            className="
              hidden sm:inline-flex
              items-center gap-2
              rounded-2xl
              border border-brand-dark/10
              bg-brand-paper/70
              px-4 py-2
              font-ui text-sm text-brand-dark
              transition
              group-hover:border-brand-green/30 group-hover:text-brand-deep
            "
          >
            {cta} <span aria-hidden></span>
          </div>
        </div>

        <div className="mt-6">
          <Mosaic items={items} />
        </div>

        <div className="mt-6 sm:hidden">
          <div
            className="
              inline-flex items-center gap-2
              rounded-2xl
              border border-brand-dark/10
              bg-brand-paper/70
              px-4 py-2
              font-ui text-sm text-brand-dark
              transition
              group-hover:border-brand-green/30 group-hover:text-brand-deep
            "
          >
            {cta} <span aria-hidden></span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export async function HomeShowcase() {
  // ✅ Проекты (портфолио)
  const pr = await directusFetch<{ data: Item[] }>(
    `/items/projects?fields=id,title,slug,cover.id&filter[status][_eq]=published&sort=-date_created&limit=3`,
  );
  const projects = pr.data ?? [];

  // ✅ Площадки (если у тебя коллекция иначе — меняется ТОЛЬКО ЭТА строка)
  const vr = await directusFetch<{ data: Item[] }>(
    `/items/venues?fields=id,title,slug,cover.id&filter[status][_eq]=published&sort=-date_created&limit=3`,
  );
  const venues = vr.data ?? [];

  return (
    <section className="mx-auto max-w-6xl px-5 pb-16">
      <div className="mb-8">
        <h2 className="font-display text-4xl text-brand-dark sm:text-5xl">
          Выберите, куда перейти дальше
        </h2>
        <p className="mt-3 max-w-2xl font-ui text-base text-brand-brown">
          Живые проекты, атмосфера и площадки — всё в одном стиле и с понятной
          навигацией.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ShowcaseCard
          href="/portfolio"
          title="Портфолио"
          subtitle="Истории свадеб, детали, атмосфера и визуальная подача — как в журнале."
          items={projects}
          cta="Смотреть портфолио"
        />

        <ShowcaseCard
          href="/venues"
          title="Площадки"
          subtitle="Подборка красивых мест: рестораны, загородные, лофты — с моими рекомендациями."
          items={venues}
          cta="Открыть площадки"
        />
      </div>
    </section>
  );
}
