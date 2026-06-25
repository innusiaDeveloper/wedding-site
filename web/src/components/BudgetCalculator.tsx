"use client";

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

function parseGuests(v: string) {
  const n = Number(String(v).replace(/[^\d]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function sanitizePhone(value: string) {
  return value.replace(/[^\d+()\-\s]/g, "").slice(0, 24);
}

type Props = {
  onSuccess?: () => void;
};

export function BudgetCalculator({ onSuccess }: Props) {
  const [state, setState] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const isValid = useMemo(() => {
    const nameOk = state.name.trim().length >= 2;
    const phoneOk = state.phone.replace(/\D/g, "").length >= 10;
    const guestsOk = parseGuests(state.guests) > 0;
    const cityOk = state.city.trim().length >= 2;
    const dateOk = state.date.trim().length > 0;

    return nameOk && phoneOk && guestsOk && cityOk && dateOk;
  }, [state]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || status === "sending") return;

    setStatus("sending");

    try {
      const res = await fetch("/api/budget", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...state,
          guests: String(parseGuests(state.guests)),
          phone: state.phone.trim(),
          registryOffice: state.registryOffice.trim() || null,
        }),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) throw new Error();

      setStatus("sent");
      onSuccess?.();
      setState(initial);
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
          font-light
          text-4xl
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
          <Field label="Ваше имя">
            <input
              value={state.name}
              onChange={(e) =>
                setState((s) => ({ ...s, name: e.target.value }))
              }
              placeholder="Например, Анна"
              className={inputCls}
              autoComplete="name"
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

          <Field label="Дата свадьбы">
            <input
              type="date"
              value={state.date}
              onChange={(e) =>
                setState((s) => ({ ...s, date: e.target.value }))
              }
              className={inputCls}
            />
          </Field>

          <Field label="Количество гостей">
            <input
              value={state.guests}
              onChange={(e) =>
                setState((s) => ({ ...s, guests: e.target.value }))
              }
              placeholder="Например, 60"
              inputMode="numeric"
              className={inputCls}
            />
          </Field>

          <Field label="Город мероприятия">
            <input
              value={state.city}
              onChange={(e) =>
                setState((s) => ({ ...s, city: e.target.value }))
              }
              placeholder="Краснодар"
              className={inputCls}
              autoComplete="address-level2"
            />
          </Field>

          <Field label="Формат свадьбы">
            <div className="relative">
              <select
                value={state.format}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    format: e.target.value as FormState["format"],
                  }))
                }
                className={`${inputCls} appearance-none pr-14`}
              >
                <option value="classic">Классическая</option>
                <option value="chamber">Камерная</option>
                <option value="luxury">Премиальная</option>
              </select>

              <span
                className="
    pointer-events-none absolute right-5 top-1/2
    h-3 w-3 -translate-y-[60%] rotate-45
    border-b-[1.5px] border-r-[1.5px]
    border-brand-brown/40
  "
                aria-hidden
              />
            </div>
          </Field>

          <Field label="Тип площадки">
            <div className="relative">
              <select
                value={state.venue}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    venue: e.target.value as FormState["venue"],
                  }))
                }
                className={`${inputCls} appearance-none pr-14`}
              >
                <option value="restaurant">Ресторан</option>
                <option value="country">Загородная</option>
                <option value="loft">Лофт</option>
                <option value="openair">Открытая площадка</option>
              </select>

              <span
                className="
    pointer-events-none absolute right-5 top-1/2
    h-3 w-3 -translate-y-[60%] rotate-45
    border-b-[1.5px] border-r-[1.5px]
    border-brand-brown/40
  "
                aria-hidden
              />
            </div>
          </Field>

          <Field label="Какой ЗАГС">
            <input
              value={state.registryOffice}
              onChange={(e) =>
                setState((s) => ({ ...s, registryOffice: e.target.value }))
              }
              placeholder="Например: Дворец бракосочетания №1"
              className={inputCls}
            />
          </Field>
        </div>

        <Button
          type="submit"
          disabled={!isValid || status === "sending"}
          className="
            mt-6 w-full rounded-2xl
            !bg-brand-green px-6 py-4
            font-ui text-sm font-medium tracking-[0.01em] !text-brand-paper
            transition
            hover:!bg-brand-deep
            disabled:opacity-100
            disabled:!bg-brand-green
            disabled:!text-brand-paper
            disabled:cursor-not-allowed
          "
        >
          {status === "sending" ? "Отправляем..." : "Отправить"}
        </Button>

        {status === "sent" && (
          <div className="rounded-2xl border border-brand-green/25 bg-brand-olive/10 p-4 font-ui text-sm text-brand-deep">
            ✅ Заявка отправлена! Я скоро свяжусь с вами 💚
          </div>
        )}

        {status === "error" && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 font-ui text-sm">
            ❗ Не удалось отправить. Попробуйте ещё раз.
          </div>
        )}
      </form>
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
      <div className="mb-2 font-ui text-[11px] uppercase tracking-[0.14em] text-brand-brown/45">
        {label}
      </div>
      {children}
    </label>
  );
}

const inputCls = `
  w-full rounded-2xl border border-brand-dark/15 bg-white
  px-4 py-3 font-ui text-base text-brand-dark
  placeholder:text-brand-brown/45
  outline-none transition
  focus:ring-2 focus:ring-brand-green/35
`;
