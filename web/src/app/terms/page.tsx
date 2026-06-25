import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Пользовательское соглашение | Александра Пирог",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-brand-paper text-brand-dark">
      <div className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
        <h1 className="font-display text-4xl sm:text-5xl">
          Пользовательское соглашение
        </h1>

        <div className="mt-8 rounded-[2rem] border border-brand-dark/10 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          <div className="space-y-6 font-ui text-sm leading-8 text-brand-brown">
            <section>
              <h2 className="font-medium text-brand-dark">
                1. Общие положения
              </h2>
              <p>
                Используя сайт, пользователь подтверждает согласие с условиями
                настоящего соглашения.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-brand-dark">
                2. Информация на сайте
              </h2>
              <p>
                Информация на сайте носит ознакомительный характер и не является
                публичной офертой.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-brand-dark">
                3. Авторские права
              </h2>
              <p>
                Все материалы сайта являются объектами интеллектуальной
                собственности и защищаются законодательством РФ.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-brand-dark">
                4. Ограничение ответственности
              </h2>
              <p>
                Администрация сайта не несёт ответственности за возможные
                последствия использования информации сайта.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-brand-dark">
                5. Контактная информация
              </h2>
              <p>
                ИП Пирог Александра Александровна
                <br />
                Телефон: +7 (964) 890-83-41
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
