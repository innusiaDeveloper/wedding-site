import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | Александра Пирог",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-brand-paper text-brand-dark">
      <div className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
        <h1 className="font-display text-4xl sm:text-5xl">
          Политика конфиденциальности
        </h1>

        <div className="mt-8 rounded-[2rem] border border-brand-dark/10 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          <div className="space-y-6 font-ui text-sm leading-8 text-brand-brown">
            <section>
              <h2 className="font-medium text-brand-dark">
                1. Общие положения
              </h2>
              <p>
                Настоящая Политика конфиденциальности определяет порядок
                обработки персональных данных пользователей сайта.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-brand-dark">
                2. Какие данные собираются
              </h2>
              <ul className="list-disc pl-5">
                <li>Имя</li>
                <li>Номер телефона</li>
                <li>Адрес электронной почты</li>
                <li>Иные данные, предоставленные пользователем</li>
              </ul>
            </section>

            <section>
              <h2 className="font-medium text-brand-dark">
                3. Цели обработки данных
              </h2>
              <p>
                Персональные данные используются для связи с пользователем,
                подготовки предложений и исполнения обязательств.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-brand-dark">
                4. Защита информации
              </h2>
              <p>
                Оператор принимает необходимые меры для защиты персональных
                данных от несанкционированного доступа.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-brand-dark">Реквизиты</h2>
              <p>
                ИП Пирог Александра Александровна
                <br />
                ИНН: 232309553312
                <br />
                ОГРН: 322237500319194
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
