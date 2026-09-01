"use client";

import { useState } from "react";

import { QuickConsultationModal } from "@/components/QuickConsultationModal";

export function PortfolioConsultationCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          inline-flex items-center justify-center
          rounded-full border border-brand-dark/15
          bg-white/70 px-5 py-3
          font-ui text-sm text-brand-dark
          backdrop-blur
          transition-all duration-300
          hover:-translate-y-0.5
          hover:border-brand-green/35
          hover:bg-white
          hover:shadow-[0_12px_30px_rgba(0,0,0,0.07)]
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-brand-green/30
        "
      >
        Бесплатная консультация
        <span aria-hidden="true" className="ml-2">
          →
        </span>
      </button>

      <QuickConsultationModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export function PortfolioConsultationBottomCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section
        className="
          mt-16 overflow-hidden rounded-[2rem]
          border border-brand-dark/10
          bg-white px-6 py-10
          text-center
          shadow-[0_12px_36px_rgba(0,0,0,0.05)]
          sm:px-10 sm:py-12
          lg:mt-20
        "
      >
        <p className="font-ui text-xs uppercase tracking-[0.16em] text-brand-brown/50">
          Следующий проект может быть вашим
        </p>

        <h2 className="mx-auto mt-3 max-w-2xl font-display font-light text-3xl leading-[1.05] tracking-[-0.02em] text-brand-dark sm:text-4xl">
          Хотите обсудить вашу свадьбу?
        </h2>

        <p className="mx-auto mt-4 max-w-xl font-ui text-sm leading-[1.75] text-brand-brown/75 sm:text-base">
          Расскажите немного о вашем событии — я свяжусь с вами и предложу
          удобное время для бесплатной консультации.
        </p>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="
            mt-7 inline-flex items-center justify-center
            rounded-full bg-brand-green px-6 py-3.5
            font-ui text-sm font-medium text-brand-paper
            transition-all duration-300
            hover:-translate-y-0.5
            hover:bg-brand-hover
            hover:shadow-[0_14px_34px_rgba(0,0,0,0.10)]
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-brand-green/35
          "
        >
          Бесплатная консультация
          <span aria-hidden="true" className="ml-2">
            →
          </span>
        </button>
      </section>

      <QuickConsultationModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
