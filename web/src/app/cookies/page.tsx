import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика Cookies | Александра Пирог",
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-brand-paper text-brand-dark">
      <div className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
        <h1 className="font-display text-4xl sm:text-5xl">
          Политика использования Cookie
        </h1>

        <div className="mt-8 rounded-[2rem] border border-brand-dark/10 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          <div className="space-y-6 font-ui text-sm leading-8 text-brand-brown">
            <section>
              <h2 className="font-medium text-brand-dark">
                1. Что такое Cookie
              </h2>
              <p>
                Cookie — небольшие текстовые файлы, сохраняемые браузером
                пользователя.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-brand-dark">
                2. Для чего используются Cookie
              </h2>
              <ul className="list-disc pl-5">
                <li>Корректная работа сайта</li>
                <li>Сохранение пользовательских настроек</li>
                <li>Аналитика посещаемости</li>
              </ul>
            </section>

            <section>
              <h2 className="font-medium text-brand-dark">
                3. Управление Cookie
              </h2>
              <p>
                Пользователь может отключить Cookie через настройки браузера.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-brand-dark">
                4. Изменение политики
              </h2>
              <p>
                Администрация сайта оставляет за собой право изменять настоящую
                Политику без предварительного уведомления.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
