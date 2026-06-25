import type { Metadata } from "next";
import Link from "next/link";
import { BudgetCalculator } from "@/components/BudgetCalculator";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Services | Aleksandra Pirog",
  description:
    "Услуги свадебного организатора: полный цикл, координация дня, подбор площадки. Рассчитать свадьбу за 5 минут.",
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-brand-dark/10 bg-white px-4 py-2 text-xs font-ui text-brand-brown">
      {children}
    </span>
  );
}

function Card({
  title,
  price,
  points,
  ctaHref,
  ctaLabel,
  accent = false,
}: {
  title: string;
  price?: string;
  points: string[];
  ctaHref: string;
  ctaLabel: string;
  accent?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-[2rem] border bg-white p-7 shadow-[0_18px_60px_rgba(0,0,0,0.06)]",
        accent ? "border-brand-green/25" : "border-brand-dark/10",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl text-brand-dark">{title}</h3>
          {price ? (
            <p className="mt-2 font-ui text-sm text-brand-brown">{price}</p>
          ) : null}
        </div>

        {accent ? (
          <span className="rounded-full bg-brand-olive/10 px-3 py-1 text-xs font-ui text-brand-deep">
            Популярно
          </span>
        ) : null}
      </div>

      <ul className="mt-5 space-y-3">
        {points.map((p) => (
          <li key={p} className="flex gap-3 text-sm font-ui text-brand-brown">
            <span
              className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green"
              aria-hidden
            />
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <Link
        href={ctaHref}
        className={[
          "mt-6 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-ui font-medium transition",
          accent
            ? "bg-brand-green text-brand-paper hover:bg-brand-hover"
            : "border border-brand-dark/15 bg-brand-paper text-brand-dark hover:border-brand-green/35 hover:text-brand-deep",
        ].join(" ")}
      >
        {ctaLabel}
        <span className="ml-2" aria-hidden></span>
      </Link>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-brand-paper text-brand-dark">
      <section className="mx-auto max-w-6xl px-5 pt-12 pb-10 sm:pt-16 sm:pb-14">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="rounded-2xl border border-brand-dark/10 bg-white px-4 py-2 text-sm font-ui text-brand-brown transition hover:border-brand-green/35 hover:text-brand-deep"
          >
            ← На главную
          </Link>

          <div className="hidden sm:flex items-center gap-2">
            <Pill>Services</Pill>
            <Pill>Краснодар и выезд</Pill>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <h1 className="font-display text-5xl leading-tight sm:text-6xl">
              Services
            </h1>
            <p className="mt-5 max-w-xl font-ui text-base leading-relaxed text-brand-brown">
              Спокойная организация, эстетика в деталях и чёткая структура
              процесса — чтобы вы наслаждались подготовкой и самим днём.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#budget"
                className="
                  inline-flex items-center justify-center
                  rounded-2xl bg-brand-green
                  px-6 py-3 font-ui text-sm font-medium
                  text-brand-paper transition hover:bg-brand-hover
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40
                "
              >
                Рассчитать за 5 минут
              </Link>

              <Link
                href="/#contact"
                className="
                  inline-flex items-center justify-center
                  rounded-2xl border border-brand-dark/20
                  px-6 py-3 font-ui text-sm font-medium text-brand-dark
                  transition hover:border-brand-green/40 hover:text-brand-deep
                "
              >
                Задать вопрос
              </Link>
            </div>

            <p className="mt-6 font-ui text-xs text-brand-olive">
              Elegant storytelling • Natural colors • Calm direction
            </p>
          </div>

          <div className="rounded-[2rem] border border-brand-dark/10 bg-white p-7 shadow-[0_18px_60px_rgba(0,0,0,0.06)]">
            <div className="font-display text-2xl">Как это работает</div>
            <div className="mt-5 grid gap-4">
              {[
                ["01", "Созвон и запрос"],
                ["02", "Смета и концепция"],
                ["03", "Подрядчики и план"],
                ["04", "Координация дня"],
              ].map(([n, t]) => (
                <div
                  key={n}
                  className="flex items-center justify-between rounded-2xl border border-brand-dark/10 bg-brand-paper px-5 py-4"
                >
                  <div className="font-ui text-xs text-brand-olive">{n}</div>
                  <div className="font-ui text-sm text-brand-brown">{t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Card
            title="Полная организация"
            price="Для пар, которым важен результат без стресса"
            points={[
              "Подбор площадки, концепция и тайминг",
              "Смета, подрядчики, договоры, контроль бюджета",
              "Детальная координация дня и команды",
            ]}
            ctaHref="#budget"
            ctaLabel="Рассчитать бюджет"
            accent
          />
          <Card
            title="Координация дня"
            price="Если подготовка уже сделана, нужен контроль дня"
            points={[
              "План дня, чек-листы, точки контроля",
              "Команда и подрядчики под контролем",
              "Вы спокойны — всё идёт по сценарию",
            ]}
            ctaHref="/#contact"
            ctaLabel="Уточнить детали"
          />
          <Card
            title="Подбор площадки"
            price="Если вы на старте и нужна сильная база"
            points={[
              "Подбор площадок под бюджет и стиль",
              "Плюсы/минусы и условия по договору",
              "Список вариантов и дальнейший план",
            ]}
            ctaHref="/venues"
            ctaLabel="Смотреть площадки"
          />
        </div>

        <FAQAccordion
          title="FAQ"
          subtitle="Ответы на вопросы, которые обычно возникают в начале."
          items={[
            {
              q: "Сколько заранее нужно начинать подготовку?",
              a: "Оптимально — за 4–8 месяцев. Но можно и быстрее: если сроки сжаты, мы просто строим план плотнее и быстрее фиксируем ключевых подрядчиков.",
            },
            {
              q: "Как формируется бюджет и что влияет на сумму сильнее всего?",
              a: "Больше всего влияют: количество гостей, площадка и формат банкета, декор/флористика и техническое оснащение. После формы я пришлю ориентир и варианты под ваш стиль.",
            },
            {
              q: "Можно ли работать частично — только координация или только площадка?",
              a: "Да. Можно выбрать координацию дня, подбор площадки или полный цикл. Формат подстраиваем под ваш этап подготовки.",
            },
            {
              q: "Вы работаете только в Краснодаре?",
              a: "Нет, возможен выезд. В форме укажите город — я уточню логистику и предложу сценарий работы.",
            },
            {
              q: "Как быстро вы отвечаете на заявку?",
              a: "Обычно в течение дня. Если заявка приходит поздно вечером — отвечу на следующий день утром.",
            },
          ]}
        />
      </section>

      {/* ✅ ОДНА секция формы */}
      <section
        id="budget"
        className="border-t border-brand-dark/10 bg-white/40"
      >
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-16">
          <div className="rounded-[2.5rem] border border-brand-dark/10 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-10">
            <BudgetCalculator />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
