"use client";

import { ReactNode } from "react";

export function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      aria-modal
      role="dialog"
    >
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* CONTENT */}
      <div
        className="
          relative z-10 w-full max-w-xl
          rounded-[2rem]
          bg-brand-paper
          p-8
          shadow-[0_40px_120px_rgba(0,0,0,0.25)]
        "
      >
        {/* close */}
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="
            absolute right-5 top-5
            grid h-9 w-9 place-items-center
            rounded-full
            border border-brand-dark/15
            text-brand-brown
            transition hover:bg-brand-olive/10
          "
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
