"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type FormState = {
  name: string;
  phone: string;
  preferredDate: string;
};

type SubmitStatus = "idle" | "sending" | "sent" | "error";

const initial: FormState = {
  name: "",
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
  const [personalDataConsent, setPersonalDataConsent] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const isValid = useMemo(() => {
    const nameOk = state.name.trim().length >= 2;
    const phoneOk = state.phone.replace(/\D/g, "").length >= 10;
    const dateOk = state.preferredDate.trim().length > 0;

    return nameOk && phoneOk && dateOk && personalDataConsent;
  }, [state, personalDataConsent]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setState(initial);
      setPersonalDataConsent(false);
      setStatus("idle");
    }
  }, [open]);

  function updateField<K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) {
    setState((current) => ({
      ...current,
      [field]: value,
    }));

    if (status === "error" || status === "sent") {
      setStatus("idle");
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValid || status === "sending") return;

    setStatus("sending");

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: state.name.trim(),
          phone: state.phone.trim(),
          preferredDate: state.preferredDate,
          personalDataConsent: true,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        throw new Error("Не удалось отправить заявку");
      }

      setState(initial);
      setPersonalDataConsent(false);
      setStatus("sent");

      window.setTimeout(() => {
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
      aria-labelledby="consultation-modal-title"
      aria-describedby="consultation-modal-description"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-[3px]"
        aria-label="Закрыть окно консультации"
      />

      <div className="relative z-[121] w-full max-w-3xl rounded-[2rem] border border-brand-dark/10 bg-white p-6 shadow-[0_30px_100px_rgba(0,0,0,0.18)] sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="consultation-modal-title"
              className="font-display text-3xl text-brand-dark sm:text-4xl"
            >
              Бесплатная консультация
            </h2>

            <p
              id="consultation-modal-description"
              className="mt-3 max-w-2xl font-ui text-sm leading-[1.75] text-brand-brown"
            >
              Оставьте данные — я свяжусь с вами и предложу удобное время.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              inline-flex h-11 w-11 shrink-0 items-center justify-center
              rounded-2xl border border-brand-dark/10
              bg-brand-paper text-brand-dark
              transition
              hover:border-brand-green/35
              hover:text-brand-deep
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-brand-green/40
            "
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-8 grid gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Имя" htmlFor="consultation-name">
              <input
                id="consultation-name"
                name="name"
                type="text"
                value={state.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Например, Анна"
                className={inputCls}
                autoComplete="name"
                minLength={2}
                required
              />
            </Field>

            <Field label="Телефон" htmlFor="consultation-phone">
              <input
                id="consultation-phone"
                name="phone"
                type="tel"
                value={state.phone}
                onChange={(event) =>
                  updateField("phone", sanitizePhone(event.target.value))
                }
                placeholder="+7 (___) ___-__-__"
                className={inputCls}
                inputMode="tel"
                autoComplete="tel"
                required
              />
            </Field>

            <Field
              label="Желаемая дата свадьбы"
              htmlFor="consultation-preferred-date"
            >
              <input
                id="consultation-preferred-date"
                name="preferredDate"
                type="date"
                value={state.preferredDate}
                onChange={(event) =>
                  updateField("preferredDate", event.target.value)
                }
                className={inputCls}
                required
              />
            </Field>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-brand-dark/10 bg-brand-paper/45 p-4">
            <input
              type="checkbox"
              name="personalDataConsent"
              checked={personalDataConsent}
              onChange={(event) => {
                setPersonalDataConsent(event.target.checked);

                if (status === "error" || status === "sent") {
                  setStatus("idle");
                }
              }}
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-brand-green"
              required
            />

            <span className="font-ui text-xs leading-[1.65] text-brand-brown/75 sm:text-sm">
              Я даю{" "}
              <Link
                href="/personal-data-consent"
                target="_blank"
                className="
                  text-brand-dark underline underline-offset-2
                  transition hover:text-brand-deep
                "
              >
                согласие на обработку персональных данных
              </Link>{" "}
              и подтверждаю, что ознакомилась с{" "}
              <Link
                href="/privacy"
                target="_blank"
                className="
                  text-brand-dark underline underline-offset-2
                  transition hover:text-brand-deep
                "
              >
                Политикой в отношении обработки персональных данных
              </Link>
              .
            </span>
          </label>

          <button
            type="submit"
            disabled={!isValid || status === "sending"}
            className="
              inline-flex w-full items-center justify-center
              rounded-2xl bg-brand-green px-6 py-4
              font-ui text-sm font-medium text-brand-paper
              transition
              hover:bg-brand-hover
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-brand-green/40
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {status === "sending"
              ? "Отправляем..."
              : "Записаться на бесплатную консультацию"}
          </button>

          <div aria-live="polite">
            {status === "sent" ? (
              <div className="rounded-2xl border border-brand-green/25 bg-brand-olive/10 p-4 font-ui text-sm text-brand-deep">
                ✅ Заявка отправлена! Я скоро свяжусь с вами.
              </div>
            ) : null}

            {status === "error" ? (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 font-ui text-sm text-red-700">
                ❗ Не удалось отправить заявку. Проверьте данные и попробуйте
                ещё раз.
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="block">
      <label
        htmlFor={htmlFor}
        className="mb-2 block font-ui text-xs uppercase tracking-[0.12em] text-brand-brown/55"
      >
        {label}
      </label>

      {children}
    </div>
  );
}

const inputCls = `
  w-full rounded-2xl
  border border-brand-dark/15
  bg-white px-4 py-3
  font-ui text-base text-brand-dark
  placeholder:text-brand-brown/45
  outline-none transition
  focus:border-brand-green/35
  focus:ring-2 focus:ring-brand-green/20
`;
