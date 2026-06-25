import Link from "next/link";
import { DirectusImage } from "@/components/DirectusImage";

type Props = {
  title: string;
  subtitle: string;
  imageUrl?: string | null;
  badge?: string;
  ctaHref: string;
  ctaLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  phone?: string;
  phoneLabel?: string;
};

export function Hero({
  title,
  subtitle,
  imageUrl,
  badge = "Организатор",
  ctaHref = "/portfolio",
  ctaLabel = "Смотреть портфолио",
  secondaryHref = "#about",
  secondaryLabel = "Обо мне",
  phone = "+7 964 890-83-41",
  phoneLabel = "Бесплатная консультация",
}: Props) {
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, "")}`;

  return (
    <section className="relative isolate overflow-hidden bg-brand-paper">
      <div className="mx-auto max-w-6xl px-5 pt-8 sm:pt-10 lg:pt-12">
        <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
            <div className="slow-shimmer absolute left-[34%] -top-24 bottom-[-72px] w-[980px] rounded-[6.5rem] bg-gradient-to-br from-black/[0.04] via-black/[0.02] to-transparent blur-2xl opacity-90" />
            <div className="absolute left-[36%] -top-16 bottom-[-56px] w-[920px] rounded-[6rem] border border-black/[0.05] bg-white/20 backdrop-blur-[2px] opacity-80" />
            <div className="absolute right-[-90px] top-[8%] h-[260px] w-[360px] rounded-[5rem] bg-black/[0.03] blur-xl opacity-80" />
          </div>

          <div className="relative z-10 reveal delay-1">
            <div className="relative overflow-hidden rounded-3xl border border-brand-dark/10 bg-brand-olive/10 shadow-[0_18px_55px_rgba(0,0,0,0.06)]">
              <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5]">
                {imageUrl ? (
                  <>
                    <DirectusImage
                      src={imageUrl}
                      alt=""
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      style={{ objectPosition: "50% 20%" }}
                    />

                    <div className="pointer-events-none absolute -right-10 top-1/2 hidden h-[380px] w-[220px] -translate-y-1/2 rounded-[3rem] bg-black/[0.04] blur-3xl opacity-40 lg:block" />
                  </>
                ) : null}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-brand-paper/20 via-transparent to-transparent sm:h-1/3" />
              </div>
            </div>
          </div>

          <div className="relative z-10 lg:pl-2 reveal delay-2">
            <div className="w-full rounded-3xl border border-brand-dark/10 bg-gradient-to-b from-white/75 to-white/60 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-9">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                {badge ? (
                  <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-dark/10 bg-brand-paper/70 px-5 py-2.5 font-ui text-[11px] uppercase tracking-[0.14em] text-brand-brown/60">
                    <span className="h-2 w-2 rounded-full bg-brand-green" />
                    {badge}
                  </div>
                ) : null}

                {phone ? (
                  <a
                    href={phoneHref}
                    className="
                      inline-flex items-center gap-2 rounded-full
                      border border-brand-dark/10 bg-brand-paper/70
                      px-5 py-2.5
                      font-ui text-[11px] uppercase tracking-[0.14em]
                      text-brand-brown/60
                      transition-all duration-300
                      hover:border-brand-hover/35
                      hover:text-brand-hover
                    "
                  >
                    <span className="h-2 w-2 rounded-full bg-brand-green/70" />
                    {phone}
                  </a>
                ) : null}
              </div>

              <h1 className="font-display font-light text-4xl leading-[0.95] tracking-[-0.02em] text-brand-dark sm:text-6xl">
                {title}
              </h1>

              {subtitle ? (
                <p className="mt-5 font-ui text-base leading-[1.75] text-brand-brown/90 sm:text-lg">
                  {subtitle}
                </p>
              ) : null}

              <div className="mt-8 flex flex-wrap items-center gap-4 reveal delay-3">
                <Link
                  href={ctaHref}
                  className="group inline-flex items-center justify-center rounded-2xl bg-brand-green px-7 py-3.5 font-ui text-sm font-medium tracking-[0.01em] text-brand-paper shadow-md shadow-brand-green/20 transition-all duration-300 hover:bg-brand-hover hover:shadow-lg hover:shadow-brand-deep/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50"
                >
                  {ctaLabel}
                </Link>

                <Link
                  href={secondaryHref}
                  className="group inline-flex items-center justify-center rounded-2xl border border-brand-dark/15 bg-brand-paper/70 px-7 py-3.5 font-ui text-sm font-medium tracking-[0.01em] text-brand-dark transition-all duration-300 hover:border-brand-green/40 hover:text-brand-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40"
                >
                  {secondaryLabel}
                </Link>
              </div>

              <div className="mt-9 h-px w-16 bg-brand-green/30" />

              <p className="mt-5 font-ui text-xs tracking-[0.14em] text-brand-brown/55">
                Элегантное повествование | Естественные цвета | Спокойная
                режиссура
              </p>
            </div>
          </div>
        </div>

        <div className="h-10 sm:h-14 lg:h-16" />
      </div>
    </section>
  );
}
