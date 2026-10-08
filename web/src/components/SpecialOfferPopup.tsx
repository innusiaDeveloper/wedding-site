"use client";

import { useEffect, useState } from "react";
import { QuickConsultationModal } from "@/components/QuickConsultationModal";

const STORAGE_KEY = "october-stylist-offer-closed";
const SHOW_AFTER_MS = 8000;
const HIDE_FOR_DAYS = 7;

// Акция заканчивается 31 октября 2026 года в 23:59 по Москве.
const OFFER_END = Date.parse("2026-11-01T00:00:00+03:00");

export function SpecialOfferPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);

  useEffect(() => {
    // После окончания акции баннер не показываем.
    if (Date.now() >= OFFER_END) return;

    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const closedAt = Number(saved);

      if (Number.isFinite(closedAt)) {
        const hideUntil = closedAt + HIDE_FOR_DAYS * 24 * 60 * 60 * 1000;

        if (Date.now() < hideUntil) return;
      }
    }

    const timer = window.setTimeout(() => {
      if (Date.now() < OFFER_END) {
        setIsVisible(true);
      }
    }, SHOW_AFTER_MS);

    return () => window.clearTimeout(timer);
  }, []);

  function closeOffer() {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setIsVisible(false);
  }

  function openConsultation() {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setIsVisible(false);

    window.setTimeout(() => {
      setConsultationOpen(true);
    }, 150);
  }

  return (
    <>
      {isVisible && (
        <div
          className="
            fixed inset-0 z-[100]
            flex items-end justify-center
            bg-brand-dark/25
            p-4
            backdrop-blur-[2px]
            sm:items-center
            sm:p-6
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="october-offer-title"
          onClick={closeOffer}
        >
          <div
            className="
              relative w-full max-w-3xl
              overflow-hidden
              rounded-[2.5rem]
              border border-white/10
              bg-brand-green
              px-7 py-9
              text-brand-paper
              shadow-[0_35px_120px_rgba(0,0,0,0.28)]
              sm:px-10 sm:py-11
              lg:px-12 lg:py-12
            "
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

            <button
              type="button"
              onClick={closeOffer}
              aria-label="Закрыть предложение"
              className="
                absolute right-5 top-5 z-20
                flex h-10 w-10 items-center justify-center
                rounded-full
                border border-white/20
                bg-white/10
                font-ui text-xl font-light
                text-brand-paper
                backdrop-blur
                transition
                hover:bg-white/20
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-white/40
              "
            >
              ×
            </button>

            <div className="relative z-10 max-w-2xl pr-8 sm:pr-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-ui text-[10px] uppercase tracking-[0.18em] text-brand-paper/85">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-paper" />
                Только до 31 октября
              </div>

              <h2
                id="october-offer-title"
                className="mt-6 font-display text-4xl font-light leading-[0.95] tracking-[-0.025em] text-brand-paper sm:text-5xl lg:text-6xl"
              >
                Свадебный стилист
                <span className="block text-brand-paper/70">в подарок</span>
              </h2>

              <p className="mt-6 max-w-xl font-ui text-sm leading-[1.8] text-brand-paper/80 sm:text-base">
                При бронировании организации свадьбы до 31 октября работа
                свадебного стилиста стоимостью до 50 000 ₽ в подарок.
              </p>

              <button
                type="button"
                onClick={openConsultation}
                className="
                  mt-8 inline-flex w-full items-center justify-center gap-3
                  rounded-2xl
                  bg-brand-paper
                  px-6 py-3.5
                  font-ui text-sm font-medium
                  text-brand-dark
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-white
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white/40
                  sm:w-auto
                "
              >
                Узнать больше
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <QuickConsultationModal
        open={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </>
  );
}
