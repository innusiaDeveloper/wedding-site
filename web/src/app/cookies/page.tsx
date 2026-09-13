import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Политика использования файлов cookie | Александра Пирог",
  description:
    "Информация об использовании файлов cookie на сайте aleksandra-pirog.ru.",
  alternates: {
    canonical: "/cookies",
  },
};

const SITE_URL = "https://aleksandra-pirog.ru";

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-brand-paper text-brand-dark">
      <div className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
        <header>
          <p className="font-ui text-xs uppercase tracking-[0.16em] text-brand-brown/55">
            Редакция от 13 сентября 2026 года
          </p>

          <h1 className="mt-3 font-display text-4xl leading-[1.02] sm:text-5xl">
            Политика использования файлов cookie
          </h1>

          <p className="mt-5 max-w-3xl font-ui text-sm leading-7 text-brand-brown/80 sm:text-base">
            Настоящая Политика содержит информацию об использовании файлов
            cookie и аналогичных технических технологий на сайте {SITE_URL}.
          </p>
        </header>

        <div className="mt-8 rounded-[2rem] border border-brand-dark/10 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-8">
          <div className="space-y-8 font-ui text-sm leading-8 text-brand-brown">
            <section>
              <h2 className={headingClass}>1. Что такое файлы cookie</h2>

              <div className={textGroupClass}>
                <p>
                  1.1. Cookie — это небольшие фрагменты данных, которые могут
                  сохраняться браузером пользователя при посещении сайта.
                </p>

                <p>
                  1.2. Cookie и аналогичные технические технологии могут
                  использоваться для обеспечения корректной и безопасной работы
                  сайта и его отдельных функций.
                </p>
              </div>
            </section>

            <section>
              <h2 className={headingClass}>
                2. Какие cookie могут использоваться
              </h2>

              <div className={textGroupClass}>
                <p>
                  2.1. На сайте могут использоваться технически необходимые
                  cookie, требующиеся для корректной работы сайта, его
                  интерфейса и отдельных функций.
                </p>

                <p>
                  2.2. При использовании таких технологий могут обрабатываться
                  технические сведения о браузере, устройстве, сессии и
                  взаимодействии пользователя с сайтом.
                </p>

                <p>
                  2.3. На дату настоящей редакции на сайте не используются
                  Google Analytics, Яндекс Метрика, Meta Pixel и аналогичные
                  сторонние системы аналитического или рекламного отслеживания
                  пользователей.
                </p>
              </div>
            </section>

            <section>
              <h2 className={headingClass}>
                3. Для чего используются технические данные
              </h2>

              <p className="mt-3">
                Технические данные могут обрабатываться для обеспечения
                функционирования сайта, корректного отображения его страниц и
                элементов, обеспечения безопасности, диагностики технических
                ошибок и предотвращения неправомерного использования сайта.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>4. Управление файлами cookie</h2>

              <div className={textGroupClass}>
                <p>
                  4.1. Пользователь может самостоятельно управлять файлами
                  cookie посредством настроек своего браузера, в том числе
                  ограничивать или удалять их.
                </p>

                <p>
                  4.2. Ограничение или отключение технически необходимых cookie
                  может повлиять на корректную работу отдельных функций сайта.
                </p>
              </div>
            </section>

            <section>
              <h2 className={headingClass}>5. Сторонние сайты и сервисы</h2>

              <div className={textGroupClass}>
                <p>
                  5.1. На сайте могут размещаться обычные ссылки на сторонние
                  интернет-ресурсы и сервисы.
                </p>

                <p>
                  5.2. Переход по такой ссылке осуществляется пользователем
                  самостоятельно. После перехода обработка данных и
                  использование файлов cookie соответствующим сторонним ресурсом
                  регулируются документами и настройками этого ресурса.
                </p>
              </div>
            </section>

            <section>
              <h2 className={headingClass}>6. Персональные данные</h2>

              <p className="mt-3">
                Информация о порядке обработки и защиты персональных данных
                пользователей содержится в{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-2 transition hover:text-brand-deep"
                >
                  Политике в отношении обработки персональных данных
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className={headingClass}>7. Изменение настоящей Политики</h2>

              <div className={textGroupClass}>
                <p>
                  7.1. Политика может быть изменена при изменении
                  законодательства, функциональности сайта или состава
                  используемых технологий.
                </p>

                <p>
                  7.2. Новая редакция вступает в силу с момента её размещения на
                  сайте, если иной срок не указан в новой редакции.
                </p>

                <p>
                  Актуальная версия постоянно доступна по адресу:
                  <br />
                  <strong className="break-all text-brand-dark">
                    {SITE_URL}/cookies
                  </strong>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

const headingClass =
  "font-display text-2xl font-light leading-tight text-brand-dark sm:text-3xl";

const textGroupClass = "mt-3 space-y-3";
