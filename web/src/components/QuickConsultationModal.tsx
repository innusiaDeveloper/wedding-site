"use client";

import { useEffect, useMemo, useState } from "react";

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  preferredDate: string;
};

const initial: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  preferredDate: "",
};

function sanitizePhone(value: string) {
  return value.replace(/[^\d+()\-\s]/g, "").slice(0, 24);
}

export function QuickConsultationModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [state, setState] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const isValid = useMemo(() => {
    const firstNameOk = state.firstName.trim().length >= 2;
    const lastNameOk = state.lastName.trim().length >= 2;
    const phoneOk = state.phone.replace(/\D/g, "").length >= 10;
    const dateOk = state.preferredDate.trim().length > 0;

    return firstNameOk && lastNameOk && phoneOk && dateOk;
  }, [state]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setState(initial);
      setStatus("idle");
    }
  }, [open]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || status === "sending") return;

    setStatus("sending");

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          firstName: state.firstName.trim(),
          lastName: state.lastName.trim(),
          phone: state.phone.trim(),
          preferredDate: state.preferredDate,
        }),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.ok) {
        throw new Error("Send failed");
      }

      setStatus("sent");

      setTimeout(() => {
        onClose();
      }, 1200);
    } catch {
      setStatus("error");
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Запись на бесплатную консультацию"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-[3px]"
        aria-label="Закрыть"
      />

      <div className="relative z-[121] w-full max-w-3xl rounded-[2rem] border border-brand-dark/10 bg-white p-6 shadow-[0_30px_100px_rgba(0,0,0,0.18)] sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-brand-dark sm:text-4xl">
              Бесплатная консультация
            </h2>
            <p className="mt-3 max-w-2xl font-ui text-sm leading-[1.75] text-brand-brown">
              Оставьте данные — я свяжусь с вами и предложу удобное время.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              inline-flex h-11 w-11 items-center justify-center rounded-2xl
              border border-brand-dark/10 bg-brand-paper text-brand-dark
              transition hover:border-brand-green/35 hover:text-brand-deep
            "
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-8 grid gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Имя">
              <input
                value={state.firstName}
                onChange={(e) =>
                  setState((s) => ({ ...s, firstName: e.target.value }))
                }
                placeholder="Например, Анна"
                className={inputCls}
                autoComplete="given-name"
              />
            </Field>

            <Field label="Фамилия">
              <input
                value={state.lastName}
                onChange={(e) =>
                  setState((s) => ({ ...s, lastName: e.target.value }))
                }
                placeholder="Например, Иванова"
                className={inputCls}
                autoComplete="family-name"
              />
            </Field>

            <Field label="Телефон">
              <input
                value={state.phone}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    phone: sanitizePhone(e.target.value),
                  }))
                }
                placeholder="+7 (___) ___-__-__"
                className={inputCls}
                inputMode="tel"
                autoComplete="tel"
              />
            </Field>

            <Field label="Желаемая дата свадьбы">
              <input
                type="date"
                value={state.preferredDate}
                onChange={(e) =>
                  setState((s) => ({ ...s, preferredDate: e.target.value }))
                }
                className={inputCls}
              />
            </Field>
          </div>

          <button
            type="submit"
            disabled={!isValid || status === "sending"}
            className="
              inline-flex w-full items-center justify-center rounded-2xl
              bg-brand-green px-6 py-4 font-ui text-sm font-medium text-brand-paper
              transition hover:bg-brand-hover
              disabled:cursor-not-allowed disabled:opacity-60
            "
          >
            {status === "sending"
              ? "Отправляем..."
              : "Записаться на бесплатную консультацию"}
          </button>

          {status === "sent" && (
            <div className="rounded-2xl border border-brand-green/25 bg-brand-olive/10 p-4 font-ui text-sm text-brand-deep">
              ✅ Заявка отправлена! Я скоро свяжусь с вами.
            </div>
          )}

          {status === "error" && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 font-ui text-sm text-red-700">
              ❗ Не удалось отправить заявку. Попробуйте ещё раз.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 font-ui text-xs uppercase tracking-[0.12em] text-brand-brown/55">
        {label}
      </div>
      {children}
    </label>
  );
}

const inputCls = `
  w-full rounded-2xl border border-brand-dark/15 bg-white
  px-4 py-3 font-ui text-base text-brand-dark
  outline-none transition
  focus:border-brand-green/35 focus:ring-2 focus:ring-brand-green/20
`;
