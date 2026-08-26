import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных | Александра Пирог",
};

export default function PersonalDataConsentPage() {
  return (
    <main className="min-h-screen bg-brand-paper text-brand-dark">
      <div className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
        <h1 className="font-display text-4xl sm:text-5xl">
          Согласие на обработку персональных данных
        </h1>

        <div className="mt-8 rounded-[2rem] border border-brand-dark/10 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          <div className="space-y-6 font-ui text-sm leading-8 text-brand-brown">
            <p>
              Настоящим, оставляя свои данные на сайте
              <strong> https://aleksandra-pirog.ru</strong>, я свободно, своей
              волей и в своем интересе даю согласие оператору персональных
              данных:
            </p>

            <div className="rounded-2xl bg-brand-paper/60 p-6">
              <p>
                <strong>Индивидуальный предприниматель</strong>
                <br />
                Пирог Александра Александровна
                <br />
                ИНН: 232309553312
                <br />
                ОГРНИП: 322237500319194
              </p>
            </div>

            <section>
              <h2 className="font-medium text-brand-dark">
                Какие данные обрабатываются
              </h2>

              <ul className="list-disc space-y-2 pl-5">
                <li>имя;</li>
                <li>номер телефона;</li>
                <li>адрес электронной почты (если указан);</li>
                <li>
                  иная информация, добровольно предоставленная пользователем.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-medium text-brand-dark">
                Цели обработки персональных данных
              </h2>

              <ul className="list-disc space-y-2 pl-5">
                <li>обработка обращений пользователя;</li>
                <li>обратная связь;</li>
                <li>подготовка коммерческого предложения;</li>
                <li>организация консультаций;</li>
                <li>заключение и исполнение договора;</li>
                <li>информирование об оказываемых услугах.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-medium text-brand-dark">Способы обработки</h2>

              <p>
                Персональные данные могут обрабатываться как с использованием
                средств автоматизации, так и без их использования путем сбора,
                записи, систематизации, хранения, уточнения, использования,
                передачи в случаях, предусмотренных законодательством Российской
                Федерации, блокирования, удаления и уничтожения.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-brand-dark">
                Срок действия согласия
              </h2>

              <p>
                Настоящее согласие действует до достижения целей обработки
                персональных данных либо до момента его отзыва субъектом
                персональных данных.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-brand-dark">Отзыв согласия</h2>

              <p>
                Согласие может быть отозвано пользователем путем направления
                письменного обращения оператору по электронной почте:
              </p>

              <p className="font-medium text-brand-dark">
                alekssandra170191@gmail.com
              </p>
            </section>

            <section>
              <h2 className="font-medium text-brand-dark">
                Подтверждение пользователя
              </h2>

              <p>
                Нажимая кнопку отправки формы на сайте, пользователь
                подтверждает, что ознакомился с настоящим согласием, Политикой
                обработки персональных данных и принимает их условия.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
