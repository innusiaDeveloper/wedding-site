import Image from "next/image";

export function AwardsSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:py-24">
      <div className="rounded-[3rem] border border-brand-dark/10 bg-white p-8 shadow-[0_30px_100px_rgba(0,0,0,0.06)] sm:p-12 lg:p-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_auto] lg:gap-12">
          <div>
            <div className="mb-3 text-m uppercase tracking-[0.3em] text-brand-brown/70">
              Наши награды
            </div>

            <h2
              className="
    mt-4
    font-display
    font-light
    text-4xl
    sm:text-5xl
    lg:text-6xl
    leading-[0.98]
    tracking-[-0.02em]
    text-brand-dark
  "
            >
              Финалист WA Юг
            </h2>

            <div className="mt-3 h-px w-16 bg-brand-green/30" />

            <div className="mt-3 font-ui text-m tracking-[0.4em] uppercase text-brand-brown/90">
              2021 · 2022 · 2024 · 2025
            </div>

            <p className="mt-6 max-w-2xl font-ui text-base leading-relaxed text-brand-brown sm:text-lg">
              Признание профессионального сообщества и подтверждение высокого
              уровня качества, эстетики и сервиса.
            </p>
          </div>

          <div className="flex justify-start lg:justify-end">
            <Image
              src="/images/wedding-awards-yug.png"
              alt="Wedding Awards Юг — финалист 2021, 2022, 2024, 2025"
              width={520}
              height={260}
              priority
              className="h-auto w-[320px] max-w-full sm:w-[380px] lg:w-[420px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
