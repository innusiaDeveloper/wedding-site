"use client";

import { useState } from "react";

export type FAQItem = {
  q: string;
  a: string;
};

export function FAQAccordion({
  title = "FAQ",
  subtitle = "Коротко о самом важном — сроки, бюджет, формат работы.",
  items,
}: {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mt-12">
      <header className="mb-6">
        <h2 className="font-display text-3xl text-brand-dark">{title}</h2>
        {subtitle ? (
          <p className="mt-2 max-w-2xl font-ui text-sm text-brand-brown">
            {subtitle}
          </p>
        ) : null}
      </header>

      <div className="space-y-4">
        {items.map((it, idx) => {
          const isOpen = open === idx;

          return (
            <div
              key={it.q}
              className="
                rounded-[1.75rem]
                border border-brand-dark/10
                bg-white
                shadow-[0_14px_40px_rgba(0,0,0,0.05)]
              "
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : idx)}
                className="
                  flex w-full items-center justify-between gap-4
                  px-6 py-5 text-left
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/35
                  rounded-[1.75rem]
                "
                aria-expanded={isOpen}
              >
                <span className="font-ui text-sm font-medium text-brand-dark">
                  {it.q}
                </span>

                <span
                  className={[
                    "grid h-9 w-9 place-items-center rounded-2xl border border-brand-dark/10 bg-brand-paper text-brand-brown transition",
                    isOpen ? "rotate-45" : "rotate-0",
                  ].join(" ")}
                  aria-hidden
                >
                  +
                </span>
              </button>

              <div
                className={[
                  "grid transition-[grid-template-rows] duration-200 ease-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                ].join(" ")}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 pt-0">
                    <div className="h-px w-full bg-brand-dark/10" />
                    <p className="mt-4 font-ui text-sm leading-relaxed text-brand-brown">
                      {it.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
