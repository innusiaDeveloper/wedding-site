import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных | Александра Пирог",
  description:
    "Согласие на обработку персональных данных пользователей сайта aleksandra-pirog.ru.",
  alternates: {
    canonical: "/personal-data-consent",
  },
};

const SITE_URL = "https://aleksandra-pirog.ru";
const OPERATOR_EMAIL = "alekssandra170191@gmail.com";

export default function PersonalDataConsentPage() {
  return (
    <main className="min-h-screen bg-brand-paper text-brand-dark">
      <div className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
        <header>
          <p className="font-ui text-xs uppercase tracking-[0.16em] text-brand-brown/55">
            Редакция от 13 сентября 2026 года
          </p>

          <h1 className="mt-3 font-display text-4xl leading-[1.02] sm:text-5xl">
            Согласие на обработку персональных данных
          </h1>
        </header>

        <div className="mt-8 rounded-[2rem] border border-brand-dark/10 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-8">
          <div className="space-y-8 font-ui text-sm leading-8 text-brand-brown">
            <section>
              <div className={textGroupClass}>
                <p>
                  Настоящим я, пользователь сайта{" "}
                  <strong className="text-brand-dark">{SITE_URL}</strong>,
                  свободно, своей волей и в своём интересе даю согласие на
                  обработку моих персональных данных следующему оператору:
                </p>

                <div className="rounded-2xl border border-brand-dark/10 bg-brand-paper/55 p-5">
                  <p>
                    <strong className="text-brand-dark">
                      Индивидуальный предприниматель
                    </strong>
                    <br />
                    Пирог Александра Александровна
                  </p>

                  <p className="mt-3">
                    <strong className="text-brand-dark">ИНН:</strong>
                    <br />
                    232309553312
                  </p>

                  <p className="mt-3">
                    <strong className="text-brand-dark">ОГРНИП:</strong>
                    <br />
                    322237500319194
                  </p>

                  <p className="mt-3">
                    <strong className="text-brand-dark">
                      Электронная почта:
                    </strong>
                    <br />
                    <a
                      href={`mailto:${OPERATOR_EMAIL}`}
                      className="break-all underline underline-offset-2 transition hover:text-brand-deep"
                    >
                      {OPERATOR_EMAIL}
                    </a>
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className={headingClass}>
                1. Персональные данные, на обработку которых предоставляется
                согласие
              </h2>

              <div className={textGroupClass}>
                <p>
                  В зависимости от выбранной формы на Сайте я даю согласие на
                  обработку следующих персональных данных:
                </p>

                <ul className={listClass}>
                  <li>имя;</li>
                  <li>номер телефона;</li>
                  <li>желаемая дата консультации;</li>
                  <li>дата планируемого мероприятия;</li>
                  <li>город проведения мероприятия;</li>
                  <li>предполагаемое количество гостей;</li>
                  <li>выбранный ЗАГС, если он указан мной;</li>
                  <li>выбранный формат мероприятия;</li>
                  <li>выбранный тип площадки.</li>
                </ul>

                <p>
                  Состав обрабатываемых данных определяется сведениями, которые
                  я фактически указываю в соответствующей форме Сайта.
                </p>
              </div>
            </section>

            <section>
              <h2 className={headingClass}>
                2. Цели обработки персональных данных
              </h2>

              <div className={textGroupClass}>
                <p>
                  Я даю согласие на обработку персональных данных в следующих
                  целях:
                </p>

                <ul className={listClass}>
                  <li>приём и обработка моего обращения или заявки;</li>
                  <li>организация и проведение консультации;</li>
                  <li>
                    подготовка предварительного расчёта стоимости мероприятия;
                  </li>
                  <li>обратная связь со мной;</li>
                  <li>
                    уточнение даты, места, количества гостей, формата и иных
                    параметров мероприятия;
                  </li>
                  <li>подготовка индивидуального предложения;</li>
                  <li>
                    совершение действий, необходимых для заключения договора по
                    моей инициативе;
                  </li>
                  <li>
                    заключение и исполнение договора, если он будет заключён.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className={headingClass}>
                3. Действия с персональными данными
              </h2>

              <p className="mt-3">
                В рамках указанных целей Оператор вправе осуществлять следующие
                действия с моими персональными данными: сбор, запись,
                систематизацию, накопление, хранение, уточнение (обновление,
                изменение), извлечение, использование, передачу (предоставление,
                доступ) в предусмотренных настоящим Согласием случаях,
                блокирование, удаление и уничтожение.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>
                4. Способы обработки персональных данных
              </h2>

              <div className={textGroupClass}>
                <p>
                  Обработка персональных данных может осуществляться с
                  использованием средств автоматизации, а при необходимости —
                  без использования средств автоматизации.
                </p>

                <p>
                  Персональные данные, введённые мной в форму, передаются на
                  сервер Сайта по защищённому соединению HTTPS и сохраняются в
                  информационной системе Оператора.
                </p>
              </div>
            </section>

            <section>
              <h2 className={headingClass}>
                5. Передача данных посредством сервиса MAX
              </h2>

              <div className={textGroupClass}>
                <p>
                  Я уведомлён(а) и соглашаюсь с тем, что для оперативного
                  уведомления Оператора о поступившей заявке сведения,
                  содержащиеся в отправленной мной форме, могут передаваться
                  посредством сервиса MAX.
                </p>

                <p>
                  Оператором сервиса MAX является ООО «МАХ», ИНН 9714058267,
                  ОГРН 1247700595230.
                </p>

                <p>
                  В зависимости от выбранной формы посредством MAX могут
                  передаваться имя, номер телефона, дата консультации или
                  мероприятия, количество гостей, город, выбранный ЗАГС, формат
                  мероприятия, тип площадки и информация о факте предоставления
                  настоящего согласия.
                </p>

                <p>
                  Такая передача осуществляется исключительно для оперативного
                  получения Оператором моей заявки, её обработки и последующей
                  связи со мной.
                </p>
              </div>
            </section>

            <section>
              <h2 className={headingClass}>6. Срок действия согласия</h2>

              <div className={textGroupClass}>
                <p>
                  Настоящее согласие действует с момента его предоставления и до
                  достижения целей обработки персональных данных либо до его
                  отзыва мной, если отсутствуют иные предусмотренные
                  законодательством Российской Федерации основания для
                  продолжения обработки.
                </p>

                <p>
                  Если между мной и Оператором будет заключён договор, отдельные
                  персональные данные могут продолжать обрабатываться и
                  храниться в течение сроков, установленных законодательством
                  Российской Федерации, в том числе законодательством о
                  бухгалтерском и налоговом учёте.
                </p>
              </div>
            </section>

            <section>
              <h2 className={headingClass}>7. Отзыв согласия</h2>

              <div className={textGroupClass}>
                <p>
                  Я вправе отозвать настоящее согласие путём направления
                  соответствующего обращения Оператору по электронной почте:
                </p>

                <p>
                  <a
                    href={`mailto:${OPERATOR_EMAIL}`}
                    className="break-all font-medium text-brand-dark underline underline-offset-2 transition hover:text-brand-deep"
                  >
                    {OPERATOR_EMAIL}
                  </a>
                </p>

                <p>
                  Отзыв согласия не влияет на законность обработки,
                  осуществлённой до момента получения отзыва. После получения
                  отзыва Оператор прекращает обработку, основанную на настоящем
                  согласии, если отсутствуют иные законные основания для её
                  продолжения.
                </p>
              </div>
            </section>

            <section>
              <h2 className={headingClass}>
                8. Подтверждение предоставления согласия
              </h2>

              <div className={textGroupClass}>
                <p>
                  Устанавливая отметку в поле согласия на обработку персональных
                  данных перед отправкой формы и нажимая кнопку отправки, я
                  подтверждаю, что:
                </p>

                <ul className={listClass}>
                  <li>ознакомился(-ась) с настоящим Согласием;</li>
                  <li>
                    ознакомился(-ась) с{" "}
                    <Link
                      href="/privacy"
                      className="underline underline-offset-2 transition hover:text-brand-deep"
                    >
                      Политикой в отношении обработки персональных данных
                    </Link>
                    ;
                  </li>
                  <li>
                    понимаю цели, объём и порядок обработки моих персональных
                    данных;
                  </li>
                  <li>
                    предоставляю настоящее согласие свободно, своей волей и в
                    своём интересе.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className={headingClass}>9. Дополнительная информация</h2>

              <p className="mt-3">
                Подробная информация о порядке обработки, хранении, защите
                персональных данных, правах субъектов персональных данных и
                порядке обращения к Оператору содержится в{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-2 transition hover:text-brand-deep"
                >
                  Политике в отношении обработки персональных данных
                </Link>
                .
              </p>
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

const listClass = "list-disc space-y-2 pl-5";
