"use client";

import { useState } from "react";
import { QuickConsultationModal } from "@/components/QuickConsultationModal";

export function QuickConsultationButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
    inline-flex items-center justify-center
    rounded-2xl

    bg-brand-green
    px-5 py-3

    font-ui text-sm font-medium
    text-brand-paper

    shadow-sm

    transition-all duration-300

    hover:bg-brand-hover

    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-brand-green/35

    sm:w-auto
    sm:min-w-[320px]
  "
      >
        Записаться на бесплатную консультацию
      </button>

      <QuickConsultationModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
