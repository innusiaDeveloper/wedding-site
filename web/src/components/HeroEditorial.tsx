import Link from "next/link";
import { DirectusImage } from "@/components/DirectusImage";

type Props = {
  title: string;
  subtitle?: string | null;
  imageUrl?: string | null;

  phone?: string | null; // "+7 918 496 55 51"
  phoneLabel?: string | null; // "Перезвоните мне"

  badge?: string | null; // можно убрать
  ctaHref?: string;
  ctaLabel?: string;

  scriptLine?: string | null; // "Оценка бюджета за 5 минут"
};

export function Hero({
  title,
  subtitle,
  imageUrl,
  phone = null,
  phoneLabel = "Перезвоните мне",
  ctaHref = "/#contact",
  ctaLabel = "Рассчитать бюджет",
  scriptLine = "Оценка бюджета за 5 минут",
}: Props) {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-10 sm:pt-14">
      <div
        className="
          relative overflow-hidden rounded-[2.5rem]
          border border-brand-dark/10
          bg-brand-paper
          shadow-[0_18px_60px_rgba(0,0,0,0.08)]
        "
      >
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          {imageUrl ? (
            <DirectusImage
              src={imageUrl}
              alt=""
              fill
              sizes="(min-width: 1024px) 1100px, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-brand-olive/10" />
          )}

          {/* затемнение, но “в твоём стиле” (не глухо чёрное) */}
          <div className="absolute inset-0 bg-brand-dark/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/65 via-brand-dark/45 to-transparent" />
        </div>

        {/* TOP BAR (телефон + меню/кнопка) */}
        <div className="relative z-10 flex items-start justify-end gap-6 px-6 pt-6 sm:px-10">
          {phone ? (
            <div className="text-right">
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="font-display text-2xl text-brand-paper sm:text-3xl"
              >
                {phone}
              </a>
              <div className="mt-1 font-ui text-sm text-brand-paper/75">
                {phoneLabel}
              </div>
            </div>
          ) : null}

          {/* “бургер” — просто декоративно/под меню, можешь заменить на реальный */}
          <button
            type="button"
            aria-label="Menu"
            className="
              mt-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl
              border border-brand-paper/20 bg-brand-paper/10
              text-brand-paper
              backdrop-blur
              hover:bg-brand-paper/15
            "
          >
            <span className="block h-[2px] w-5 bg-current" />
            <span className="mt-1 block h-[2px] w-5 bg-current" />
            <span className="mt-1 block h-[2px] w-5 bg-current" />
          </button>
        </div>

        {/* FRAME (тонкая “золотистая” рамка внутри) */}
        <div
          className="
            pointer-events-none absolute inset-6 rounded-[2rem]
            border border-brand-olive/35
            sm:inset-10
          "
        />

        {/* CONTENT */}
        <div className="relative z-10 px-6 pb-12 pt-14 sm:px-10 sm:pb-16 sm:pt-16">
          <div className="max-w-2xl">
            <h1 className="font-display text-5xl leading-[0.95] text-brand-paper sm:text-6xl">
              {title}
            </h1>

            {subtitle ? (
              <p className="mt-6 font-ui text-base leading-relaxed text-brand-paper/80 sm:text-lg">
                {subtitle}
              </p>
            ) : null}

            {/* “рукописная” строка — если нет скриптового шрифта, просто делаем italic + tracking */}
            {scriptLine ? (
              <p className="mt-8 font-ui text-lg italic tracking-wide text-brand-olive/90">
                {scriptLine}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={ctaHref}
                className="
                  inline-flex items-center justify-center
                  rounded-2xl
                  border border-brand-paper/25
                  bg-brand-paper/10
                  px-7 py-3
                  font-ui text-sm font-medium text-brand-paper
                  backdrop-blur
                  transition
                  hover:bg-brand-paper/15 hover:border-brand-olive/50
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-olive/40
                "
              >
                {ctaLabel}
                <span className="ml-2" aria-hidden></span>
              </Link>

              <Link
                href="/portfolio"
                className="
                  inline-flex items-center justify-center
                  rounded-2xl
                  bg-brand-green
                  px-7 py-3
                  font-ui text-sm font-medium text-brand-paper
                  hover:bg-brand-paper/15
                "
              >
                Смотреть работы
              </Link>
            </div>
          </div>
        </div>

        {/* высота для красоты на мобилке */}
        <div className="relative z-10 h-10 sm:h-16" />
      </div>
    </section>
  );
}
