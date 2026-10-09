"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";

const STORAGE_KEY = "aleksandra-cookie-consent";
const METRIKA_ID = 113576139;

type Consent = "accepted" | "rejected" | null;

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function getSavedConsent(): Consent {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved === "accepted" || saved === "rejected") {
      return saved;
    }
  } catch {
    // Если localStorage недоступен, показываем баннер.
  }

  return null;
}

export function CookieConsentBanner() {
  const ready = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const [consentOverride, setConsentOverride] = useState<Consent>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const savedConsent = ready ? getSavedConsent() : null;
  const consent = consentOverride ?? savedConsent;

  function saveConsent(value: "accepted" | "rejected") {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      if (value === "accepted") {
        // Без сохранения согласия аналитику не запускаем.
        return;
      }
    }

    setConsentOverride(value);
    setSettingsOpen(false);

    if (value === "rejected") {
      window.location.reload();
    }
  }

  if (!ready) return null;

  return (
    <>
      {consent === "accepted" && (
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){
                  (m[i].a=m[i].a||[]).push(arguments)
                };

                m[i].l=1*new Date();

                for(var j=0;j<document.scripts.length;j++){
                  if(document.scripts[j].src===r){
                    return;
                  }
                }

                k=e.createElement(t);
                a=e.getElementsByTagName(t)[0];

                k.async=1;
                k.src=r;

                a.parentNode.insertBefore(k,a);
              })(
                window,
                document,
                "script",
                "https://mc.yandex.ru/metrika/tag.js",
                "ym"
              );

              ym(${METRIKA_ID},"init",{
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:false
              });
            `,
          }}
        />
      )}

      {consent === null && (
        <div
          role="region"
          aria-label="Настройки использования cookies"
          className="
            fixed inset-x-4 bottom-4 z-[150]
            mx-auto max-w-2xl
            rounded-[1.75rem]
            border border-brand-dark/10
            bg-brand-paper
            p-5 text-brand-dark
            shadow-[0_20px_80px_rgba(0,0,0,0.18)]
            sm:p-6
          "
        >
          <h2 className="font-display text-xl">Использование файлов cookie</h2>

          <p className="mt-2 font-ui text-sm leading-6 text-brand-brown">
            Мы используем необходимые технологии для работы сайта. С вашего
            согласия Яндекс.Метрика помогает нам улучшать сайт и делать его
            удобнее для посетителей. Подробнее — в нашей{" "}
            <Link
              href="/cookies"
              className="underline underline-offset-2 transition hover:opacity-70"
            >
              Политике cookie
            </Link>
            .
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => saveConsent("accepted")}
              className="
                rounded-xl
                bg-brand-green
                px-5 py-3
                font-ui text-sm
                text-brand-paper
                transition
                hover:opacity-90
              "
            >
              Принять все
            </button>

            <button
              type="button"
              onClick={() => saveConsent("rejected")}
              className="
                rounded-xl
                border border-brand-dark/20
                px-5 py-3
                font-ui text-sm
                transition
                hover:bg-brand-dark/5
              "
            >
              Только необходимые
            </button>
          </div>
        </div>
      )}

      {consent !== null && (
        <button
          type="button"
          onClick={() => setSettingsOpen(true)}
          className="
            fixed bottom-4 left-4 z-[140]
            rounded-full
            border border-brand-dark/10
            bg-brand-paper
            px-4 py-2
            font-ui text-xs
            text-brand-dark
            shadow-lg
            transition
            hover:bg-white
          "
        >
          Настройки cookies
        </button>
      )}

      {settingsOpen && (
        <div
          className="
            fixed inset-0 z-[160]
            flex items-center justify-center
            bg-black/40 p-4
          "
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
            className="
              w-full max-w-md
              rounded-3xl
              bg-brand-paper
              p-6
              text-brand-dark
              shadow-2xl
            "
          >
            <h2 id="cookie-settings-title" className="font-display text-2xl">
              Настройки cookies
            </h2>

            <p className="mt-3 font-ui text-sm leading-6 text-brand-brown">
              Вы можете разрешить или отключить Яндекс.Метрику. Необходимые
              технологии остаются активными.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => saveConsent("accepted")}
                className="
                  rounded-xl
                  bg-brand-green
                  px-4 py-3
                  font-ui text-sm
                  text-brand-paper
                  transition
                  hover:opacity-90
                "
              >
                Разрешить аналитику
              </button>

              <button
                type="button"
                onClick={() => saveConsent("rejected")}
                className="
                  rounded-xl
                  border border-brand-dark/20
                  px-4 py-3
                  font-ui text-sm
                  transition
                  hover:bg-brand-dark/5
                "
              >
                Отключить аналитику
              </button>
            </div>

            <button
              type="button"
              onClick={() => setSettingsOpen(false)}
              className="
                mt-5
                font-ui text-sm
                underline underline-offset-2
                transition
                hover:text-brand-deep
              "
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  );
}
