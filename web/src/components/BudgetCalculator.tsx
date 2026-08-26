"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";

type FormState = {
  name: string;
  phone: string;
  date: string;
  guests: string;
  city: string;
  registryOffice: string;
  format: "classic" | "chamber" | "luxury";
  venue: "restaurant" | "country" | "loft" | "openair";
};

const initial: FormState = {
  name: "",
  phone: "",
  date: "",
  guests: "",
  city: "",
  registryOffice: "",
  format: "classic",
  venue: "restaurant",
};

type SubmitStatus = "idle" | "sending" | "sent" | "error";

type Props = {
  onSuccess?: () => void;
};

function parseGuests(value: string) {
  const guests = Number(value.replace(/[^\d]/g, ""));

  return Number.isFinite(guests) ? guests : 0;
}

function sanitizePhone(value: string) {
  return value.replace(/[^\d+()\-\s]/g, "").slice(0, 24);
}

export function BudgetCalculator({ onSuccess }: Props) {
  const [state, setState] = useState<FormState>(initial);
  const [personalDataConsent, setPersonalDataConsent] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const isValid = useMemo(() => {
    const nameOk = state.name.trim().length >= 2;
    const phoneOk = state.phone.replace(/\D/g, "").length >= 10;
    const dateOk = state.date.trim().length > 0;
    const guestsOk = parseGuests(state.guests) > 0;
    const cityOk = state.city.trim().length >= 2;

    return (
      nameOk && phoneOk && dateOk && guestsOk && cityOk && personalDataConsent
    );
  }, [state, personalDataConsent]);

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
      const response = await fetch("/api/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: state.name.trim(),
          phone: state.phone.trim(),
          date: state.date,
          guests: String(parseGuests(state.guests)),
          city: state.city.trim(),
          registryOffice: state.registryOffice.trim() || null,
          format: state.format,
          venue: state.venue,
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

      onSuccess?.();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="w-full">
      <div className="mb-10 text-center">
        <h2
          className="
            font-display
            text-4xl
            font-light
            leading-[0.98]
            tracking-[-0.02em]
            text-brand-dark
            sm:text-5xl
            lg:text-6xl
          "
        >
          Рассчитать свадьбу
        </h2>

        <p
          className="
            mx-auto mt-4 max-w-2xl
            font-ui text-base leading-[1.75]
            text-brand-brown/75
            sm:text-lg
          "
        >
          Ответьте на несколько вопросов — и я подготовлю персональное
          предложение для вашего события.
        </p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Ваше имя" htmlFor="budget-name">
            <input
              id="budget-name"
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

          <Field label="Телефон" htmlFor="budget-phone">
            <input
              id="budget-phone"
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

          <Field label="Дата свадьбы" htmlFor="budget-date">
            <input
              id="budget-date"
              name="date"
              type="date"
              value={state.date}
              onChange={(event) => updateField("date", event.target.value)}
              className={inputCls}
              required
            />
          </Field>

          <Field label="Количество гостей" htmlFor="budget-guests">
            <input
              id="budget-guests"
              name="guests"
              type="text"
              value={state.guests}
              onChange={(event) => updateField("guests", event.target.value)}
              placeholder="Например, 60"
              inputMode="numeric"
              className={inputCls}
              required
            />
          </Field>

          <Field label="Город мероприятия" htmlFor="budget-city">
            <input
              id="budget-city"
              name="city"
              type="text"
              value={state.city}
              onChange={(event) => updateField("city", event.target.value)}
              placeholder="Например, Москва"
              className={inputCls}
              autoComplete="address-level2"
              minLength={2}
              required
            />
          </Field>

          <Field label="Формат свадьбы" htmlFor="budget-format">
            <div className="relative">
              <select
                id="budget-format"
                name="format"
                value={state.format}
                onChange={(event) =>
                  updateField(
                    "format",
                    event.target.value as FormState["format"],
                  )
                }
                className={`${inputCls} appearance-none pr-14`}
              >
                <option value="classic">Классическая</option>
                <option value="chamber">Камерная</option>
                <option value="luxury">Премиальная</option>
              </select>

              <SelectArrow />
            </div>
          </Field>

          <Field label="Тип площадки" htmlFor="budget-venue">
            <div className="relative">
              <select
                id="budget-venue"
                name="venue"
                value={state.venue}
                onChange={(event) =>
                  updateField("venue", event.target.value as FormState["venue"])
                }
                className={`${inputCls} appearance-none pr-14`}
              >
                <option value="restaurant">Ресторан</option>
                <option value="country">Загородная площадка</option>
                <option value="loft">Лофт</option>
                <option value="openair">Открытая площадка</option>
              </select>

              <SelectArrow />
            </div>
          </Field>

          <Field label="Какой ЗАГС" htmlFor="budget-registry-office">
            <input
              id="budget-registry-office"
              name="registryOffice"
              type="text"
              value={state.registryOffice}
              onChange={(event) =>
                updateField("registryOffice", event.target.value)
              }
              placeholder="Например, Дворец бракосочетания № 1"
              className={inputCls}
            />
          </Field>
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-brand-dark/10 bg-white/60 p-4">
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
            className="
              mt-1 h-4 w-4 shrink-0 cursor-pointer
              accent-brand-green
            "
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

        <Button
          type="submit"
          disabled={!isValid || status === "sending"}
          className="
            mt-2 w-full rounded-2xl
            !bg-brand-green px-6 py-4
            font-ui text-sm font-medium tracking-[0.01em]
            !text-brand-paper
            transition
            hover:!bg-brand-deep
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {status === "sending" ? "Отправляем..." : "Отправить"}
        </Button>

        <div aria-live="polite">
          {status === "sent" ? (
            <div className="rounded-2xl border border-brand-green/25 bg-brand-olive/10 p-4 font-ui text-sm text-brand-deep">
              ✅ Заявка отправлена! Я скоро свяжусь с вами.
            </div>
          ) : null}

          {status === "error" ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 font-ui text-sm text-red-700">
              ❗ Не удалось отправить заявку. Проверьте данные и попробуйте ещё
              раз.
            </div>
          ) : null}
        </div>
      </form>
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
        className="mb-2 block font-ui text-[11px] uppercase tracking-[0.14em] text-brand-brown/45"
      >
        {label}
      </label>

      {children}
    </div>
  );
}

function SelectArrow() {
  return (
    <span
      className="
        pointer-events-none absolute right-5 top-1/2
        h-3 w-3 -translate-y-[60%] rotate-45
        border-b-[1.5px] border-r-[1.5px]
        border-brand-brown/40
      "
      aria-hidden="true"
    />
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
  focus:ring-2 focus:ring-brand-green/35
`;
