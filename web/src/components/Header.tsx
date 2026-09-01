"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";

import { QuickConsultationModal } from "@/components/QuickConsultationModal";

type Props = {
  logoDesktopUrl: string | null;
  logoMobileUrl: string | null;
};

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        rounded-xl px-3 py-2
        font-ui text-[15px] text-brand-brown
        transition-all duration-300
        hover:bg-brand-olive/10 hover:text-brand-deep hover:scale-105
        focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30
        relative after:absolute after:bottom-1 after:left-3 after:right-3 after:h-[2px]
        after:scale-x-0 after:bg-brand-green/50 after:transition-transform after:duration-300
        hover:after:scale-x-100
      "
    >
      {children}
    </Link>
  );
}

export function Header({ logoDesktopUrl, logoMobileUrl }: Props) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);

  const isPortfolioPage = pathname === "/portfolio";

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setOpen(false);
    }

    function onScroll() {
      setScrolled(window.scrollY > 20);
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const headerHeightCls = "h-24 md:h-28";

  return (
    <>
      <div aria-hidden className={headerHeightCls} />

      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="absolute inset-0 bg-brand-paper" />

        <div
          className={[
            "absolute inset-x-0 bottom-0 h-px bg-brand-dark/10",
            scrolled ? "opacity-100" : "opacity-70",
          ].join(" ")}
        />

        <div
          className={[
            "absolute inset-0 transition-shadow duration-300",
            scrolled ? "shadow-[0_10px_30px_rgba(0,0,0,0.06)]" : "shadow-none",
          ].join(" ")}
        />

        <div className={`relative mx-auto max-w-6xl px-5 ${headerHeightCls}`}>
          <div className="flex h-full items-center justify-between gap-3">
            <Link
              href="/"
              aria-label="На главную"
              className="flex shrink-0 items-center pt-1 transition hover:opacity-80"
              onClick={() => setOpen(false)}
            >
              {logoDesktopUrl || logoMobileUrl ? (
                <>
                  {logoMobileUrl ? (
                    <div className="relative block h-20 w-40 overflow-visible md:hidden">
                      <img
                        src={logoMobileUrl}
                        alt="ALEKSANDRA PIROG"
                        loading="eager"
                        draggable={false}
                        className="h-full w-full scale-[1.18] object-contain object-left"
                      />
                    </div>
                  ) : null}

                  {logoDesktopUrl ? (
                    <div className="relative hidden h-20 w-[min(470px,calc(100vw-110px))] overflow-visible md:block md:h-24">
                      <img
                        src={logoDesktopUrl}
                        alt="ALEKSANDRA PIROG"
                        loading="eager"
                        draggable={false}
                        className="
                          h-full w-full
                          origin-left
                          scale-[1.22]
                          object-contain object-left
                        "
                      />
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="h-20 w-52 rounded-xl bg-brand-olive/10" />
              )}
            </Link>

            <nav className="hidden items-center gap-2 md:flex">
              <NavLink href="/portfolio">Портфолио</NavLink>
              <NavLink href="/venues">Площадки</NavLink>
              <NavLink href="/posts">Публикации</NavLink>
              <NavLink href="/#contact">Контакты</NavLink>
            </nav>

            <div className="flex shrink-0 items-center gap-2">
              {isPortfolioPage ? (
                <button
                  type="button"
                  onClick={() => setConsultationOpen(true)}
                  className="
      hidden items-center justify-center rounded-2xl
      bg-brand-green px-5 py-2.5
      font-ui text-[15px] font-medium
      text-brand-paper shadow-sm
      transition-all duration-300
      hover:bg-brand-hover
      focus:outline-none
      focus-visible:ring-2
      focus-visible:ring-brand-green/35
      md:inline-flex
    "
                >
                  Бесплатная консультация <span className="ml-2">→</span>
                </button>
              ) : (
                <Link
                  href="/portfolio"
                  className="
      hidden items-center justify-center rounded-2xl
      bg-brand-green px-5 py-2.5
      font-ui text-[15px] font-medium
      text-brand-paper shadow-sm
      transition-all duration-300
      hover:bg-brand-hover
      focus:outline-none
      focus-visible:ring-2
      focus-visible:ring-brand-green/35
      md:inline-flex
    "
                >
                  Смотреть портфолио <span className="ml-2">→</span>
                </Link>
              )}

              <button
                type="button"
                aria-label={open ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="
                  inline-flex md:hidden
                  h-11 w-11
                  shrink-0 items-center justify-center
                  text-brand-dark
                  transition-all duration-300
                  hover:text-brand-hover
                  focus:outline-none
                "
              >
                <span className="relative block h-6 w-7">
                  <span
                    className={[
                      "absolute left-0 block h-[2.5px] w-7 bg-current transition-all duration-300",
                      open ? "top-3 rotate-45" : "top-1",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "absolute left-0 top-3 block h-[2.5px] w-7 bg-current transition-all duration-300",
                      open ? "scale-0 opacity-0" : "scale-100 opacity-100",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "absolute left-0 block h-[2.5px] w-7 bg-current transition-all duration-300",
                      open ? "top-3 -rotate-45" : "top-5",
                    ].join(" ")}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div
          className={[
            "border-b border-brand-dark/10 bg-brand-paper transition-all duration-300 ease-in-out md:hidden",
            open
              ? "max-h-screen overflow-y-auto opacity-100"
              : "pointer-events-none max-h-0 overflow-hidden border-transparent opacity-0",
          ].join(" ")}
        >
          <div className="mx-auto max-w-6xl px-8 pb-10 pt-6">
            <div className="flex flex-col gap-2">
              <NavLink href="/portfolio" onClick={() => setOpen(false)}>
                Портфолио
              </NavLink>

              <NavLink href="/venues" onClick={() => setOpen(false)}>
                Площадки
              </NavLink>

              <NavLink href="/posts" onClick={() => setOpen(false)}>
                Публикации
              </NavLink>

              <NavLink href="/#contact" onClick={() => setOpen(false)}>
                Контакты
              </NavLink>

              <div className="sticky bottom-0 mt-8 bg-brand-paper pb-4 pt-3">
                {isPortfolioPage ? (
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setConsultationOpen(true);
                    }}
                    className="
        flex w-full items-center justify-center
        rounded-2xl bg-brand-green
        px-5 py-4
        font-ui text-[16px] font-medium
        text-brand-paper
        shadow-md shadow-brand-green/20
        transition-colors duration-300
        hover:bg-brand-hover
      "
                  >
                    Бесплатная консультация <span className="ml-2">→</span>
                  </button>
                ) : (
                  <Link
                    href="/portfolio"
                    onClick={() => setOpen(false)}
                    className="
        flex w-full items-center justify-center
        rounded-2xl bg-brand-green
        px-5 py-4
        font-ui text-[16px] font-medium
        text-brand-paper
        shadow-md shadow-brand-green/20
        transition-colors duration-300
        hover:bg-brand-hover
      "
                  >
                    Смотреть портфолио <span className="ml-2">→</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <QuickConsultationModal
        open={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </>
  );
}
