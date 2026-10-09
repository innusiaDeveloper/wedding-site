"use client";

import { useEffect, useState } from "react";
import { QuickConsultationModal } from "@/components/QuickConsultationModal";

const OFFER_END = Date.parse("2026-11-01T00:00:00+03:00");

const offers = [
  {
    number: "01",
    title: "100 000 ₽",
    subtitle: "в бюджет вашей свадьбы",
    description: "При бюджете свадьбы от 1 000 000 ₽.",
    cta: "Узнать условия",
  },
  {
    number: "02",
    title: "200 000 ₽",
    subtitle: "в бюджет вашей свадьбы",
    description: "При бюджете свадьбы от 1 500 000 ₽.",
    cta: "Узнать условия",
  },
  {
    number: "03",
    title: "Свадебное утро",
    subtitle: "в подарок",
    description:
      "Букет невесты и оформление свадебного утра при бронировании до 31 октября.",
    cta: "Узнать условия",
  },
  {
    number: "04",
    title: "Подбор 3 площадок",
    subtitle: "с расчётом",
    description:
      "Бесплатно подберём три площадки под бюджет и формат свадьбы и сделаем детальный расчёт.",
    cta: "Получить подбор",
  },
];

export function SpecialOffers() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [octoberOfferActive, setOctoberOfferActive] = useState(false);

  useEffect(() => {
    function updateOfferStatus() {
      setOctoberOfferActive(Date.now() < OFFER_END);
    }

    updateOfferStatus();

    const timer = window.setInterval(updateOfferStatus, 60_000);

    return () => window.clearInterval(timer);
  }, []);

  const visibleOffers = offers.filter(
    (offer) => offer.number === "04" || octoberOfferActive,
  );

  return (
    <>
      <section
        id="special-offers"
        className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:py-24"
      >
        <div className="mb-10 max-w-3xl sm:mb-14">
          <div className="font-ui text-[11px] uppercase tracking-[0.22em] text-brand-brown/50">
            Для наших пар
          </div>

          <h2 className="mt-4 font-display text-4xl font-light leading-[0.98] tracking-[-0.02em] text-brand-dark sm:text-5xl lg:text-6xl">
            Особые условия
          </h2>

          <p className="mt-5 max-w-2xl font-ui text-base leading-[1.8] text-brand-brown/80 sm:text-lg">
            Для пар, которые планируют свадьбу вместе с нами.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {visibleOffers.map((offer) => (
            <article
              key={offer.number}
              className="
                group relative overflow-hidden
                rounded-[2.25rem]
                border border-brand-dark/10
                bg-white
                p-7
                shadow-[0_18px_55px_rgba(0,0,0,0.045)]
                transition-all duration-500
                hover:-translate-y-1
                hover:border-brand-green/30
                hover:shadow-[0_28px_80px_rgba(0,0,0,0.09)]
                sm:p-9
                lg:p-10
              "
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand-olive/10 blur-3xl transition-all duration-500 group-hover:bg-brand-olive/20" />

              <div className="relative flex min-h-[300px] flex-col">
                <div className="flex items-start justify-between gap-6">
                  <div className="font-ui text-[10px] uppercase tracking-[0.18em] text-brand-brown/45">
                    Особые условия
                  </div>

                  <div className="font-display text-xl font-light text-brand-brown/25">
                    {offer.number}
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="font-display text-4xl font-light leading-[0.95] tracking-[-0.025em] text-brand-dark sm:text-5xl">
                    {offer.title}
                  </h3>

                  <div className="mt-2 font-display text-2xl font-light leading-[1.05] tracking-[-0.015em] text-brand-brown sm:text-3xl">
                    {offer.subtitle}
                  </div>

                  <div className="mt-6 h-px w-12 bg-brand-green/35 transition-all duration-500 group-hover:w-20" />

                  <p className="mt-5 max-w-md font-ui text-sm leading-[1.8] text-brand-brown/75 sm:text-base">
                    {offer.description}
                  </p>
                </div>

                <div className="mt-auto pt-8">
                  <button
                    type="button"
                    onClick={() => setConsultationOpen(true)}
                    className="inline-flex items-center gap-2 font-ui text-sm font-medium text-brand-dark transition-colors hover:text-brand-deep"
                  >
                    {offer.cta}

                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 max-w-3xl font-ui text-xs leading-[1.7] text-brand-brown/50">
          Условия предложений обсуждаются индивидуально и зависят от даты,
          формата и бюджета свадьбы.
        </p>
      </section>

      <QuickConsultationModal
        open={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </>
  );
}
