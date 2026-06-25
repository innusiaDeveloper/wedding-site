import Link from "next/link";
import Image from "next/image";

type Props = {
  portfolioImage?: string | null;
  venuesImage?: string | null;
};

function Tile({
  eyebrow,
  title,
  text,
  href,
  cta,
  imageUrl,
}: {
  eyebrow: string;
  title: string;
  text: string;
  href: string;
  cta: string;
  imageUrl?: string | null;
}) {
  return (
    <Link
      href={href}
      className="
        group relative overflow-hidden rounded-[3.25rem]
        border border-brand-dark/10 bg-white
        shadow-[0_28px_100px_rgba(0,0,0,0.08)]
        transition-all duration-500
        hover:shadow-[0_36px_120px_rgba(0,0,0,0.12)]
      "
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-[5rem] bg-black/[0.03] blur-3xl opacity-80" />
        <div className="absolute -right-32 -bottom-32 h-[32rem] w-[32rem] rounded-[6rem] bg-black/[0.03] blur-[120px] opacity-70" />
      </div>

      <div className="relative lg:grid lg:grid-cols-[1fr_1.4fr] lg:min-h-[600px]">
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-dark/10 bg-brand-paper/70 px-5 py-2.5 font-ui text-[11px] uppercase tracking-[0.14em] text-brand-brown/60">
            <span className="h-2 w-2 rounded-full bg-brand-green" />
            {eyebrow}
          </div>

          <h3 className="mt-8 font-display font-light text-5xl leading-[0.98] tracking-[-0.02em] text-brand-dark sm:text-6xl">
            {title}
          </h3>

          <p className="mt-6 max-w-xl font-ui text-lg leading-[1.75] text-brand-brown/85">
            {text}
          </p>

          <div className="mt-10 inline-flex w-full items-center justify-center rounded-2xl bg-brand-green px-8 py-4 font-ui text-sm font-medium text-brand-paper transition hover:bg-brand-hover lg:w-auto">
            {cta}
          </div>
        </div>

        <div className="relative h-[260px] sm:h-[320px] lg:h-auto lg:min-h-[600px]">
          {imageUrl ? (
            <>
              <Image
                src={imageUrl}
                alt={title}
                fill
                unoptimized
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-brand-dark/10" />
            </>
          ) : (
            <div className="absolute inset-0 bg-brand-olive/10" />
          )}
        </div>
      </div>
    </Link>
  );
}

export function HomeTiles({
  portfolioImage = null,
  venuesImage = null,
}: Props) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:py-24">
      <header className="mb-16">
        <h2 className="font-display font-light text-4xl leading-[0.98] tracking-[-0.02em] text-brand-dark sm:text-5xl lg:text-6xl">
          Выберите направление или вдохновение
        </h2>

        <p className="mt-6 max-w-3xl font-ui text-lg leading-[1.75] text-brand-brown/85">
          Посмотрите, как оживают идеи,
          <br className="hidden sm:block" />
          или выберите место, где начнётся ваша мечта.
        </p>
      </header>

      <div className="grid gap-12">
        <Tile
          eyebrow="Раздел сайта"
          title="Портфолио"
          text="Истории свадеб, детали, атмосфера и визуальные серии."
          href="/portfolio"
          cta="Смотреть проекты"
          imageUrl={portfolioImage}
        />

        <Tile
          eyebrow="Раздел сайта"
          title="Площадки"
          text="Подборка красивых мест и мои рекомендации."
          href="/venues"
          cta="Открыть площадки"
          imageUrl={venuesImage}
        />
      </div>
    </section>
  );
}
