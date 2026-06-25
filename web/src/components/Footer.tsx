import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
  FaVk,
  FaEnvelope,
} from "react-icons/fa";

type SocialItem = {
  label: string;
  href: string;
  Icon: IconType;
};

type Props = {
  logoUrl?: string | null;
};

export function Footer({ logoUrl }: Props) {
  const year = new Date().getFullYear();

  const socials: SocialItem[] = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/aleksandra_pirog_/?hl=ru",
      Icon: FaInstagram,
    },
    {
      label: "Telegram",
      href: "https://t.me/aleksandra_pirog",
      Icon: FaTelegram,
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/+79648908341",
      Icon: FaWhatsapp,
    },
    {
      label: "Email",
      href: "mailto:alekssandra170191@gmail.com",
      Icon: FaEnvelope,
    },
    {
      label: "VK",
      href: "https://vk.com/alekssapirog",
      Icon: FaVk,
    },
  ];

  return (
    <footer className="border-t border-brand-dark/10 bg-brand-paper">
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid items-start gap-10 lg:grid-cols-[1.3fr_1fr_1fr]">
          {/* Логотип */}
          <div className="self-start">
            <div className="flex flex-col items-start">
              {logoUrl ? (
                <div className="-ml-3 w-[320px] max-w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoUrl}
                    alt="Александра Пирог"
                    className="-ml-1 block h-auto w-full object-contain object-left"
                    draggable={false}
                  />
                </div>
              ) : (
                <div className="font-display font-light text-2xl tracking-[-0.01em]">
                  Александра Пирог
                </div>
              )}

              <p className="mt-3 max-w-sm font-ui text-sm leading-[1.7] text-brand-brown/80">
                Эстетика • Натуральные цвета • Спокойная координация
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) => (
                <SocialIcon key={s.label} item={s} />
              ))}
            </div>

            <p className="mt-4 max-w-xs font-ui text-[11px] leading-relaxed text-brand-brown/65">
              *Instagram — продукт компании Meta, признанной экстремистской
              организацией и запрещённой на территории Российской Федерации.
            </p>
          </div>

          {/* Навигация */}
          <div className="self-start">
            <div className="font-ui text-[11px] uppercase tracking-[0.14em] text-brand-brown/50">
              Навигация
            </div>

            <div className="mt-4 grid gap-2">
              <FooterLink href="/portfolio">Портфолио</FooterLink>
              <FooterLink href="/venues">Площадки</FooterLink>
              <FooterLink href="/posts">Публикации</FooterLink>
              <FooterLink href="/#contact">Контакты</FooterLink>
            </div>
          </div>

          {/* Документы */}
          <div className="self-start">
            <div className="font-ui text-[11px] uppercase tracking-[0.14em] text-brand-brown/50">
              Документы
            </div>

            <div className="mt-4 grid gap-2">
              <FooterLink href="/privacy">
                Политика конфиденциальности
              </FooterLink>

              <FooterLink href="/terms">Пользовательское соглашение</FooterLink>

              <FooterLink href="/cookies">Политика cookies</FooterLink>

              <FooterLink href="/requisites">Реквизиты ИП</FooterLink>
            </div>

            <div className="mt-8 font-ui text-xs leading-relaxed text-brand-brown/80">
              <div className="font-medium">
                ИП Пирог Александра Александровна
              </div>

              <div>ИНН: 232309553312</div>
              <div>ОГРН: 322237500319194</div>
            </div>

            <p className="mt-6 font-ui text-xs text-brand-brown/80">
              © {year} Александра Пирог. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        font-ui text-sm text-brand-brown/80
        transition hover:text-brand-deep
      "
    >
      {children}
    </Link>
  );
}

function SocialIcon({ item }: { item: SocialItem }) {
  const Icon = item.Icon;
  const isMail = item.href.startsWith("mailto:");

  return (
    <a
      href={item.href}
      aria-label={item.label}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noreferrer"}
      className="
        inline-flex h-11 w-11 items-center justify-center
        rounded-2xl border border-brand-dark/12
        bg-white/55 text-brand-dark
        shadow-[0_10px_24px_rgba(0,0,0,0.06)]
        backdrop-blur-md transition
        hover:-translate-y-0.5
        hover:border-brand-green/35
        hover:text-brand-deep
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-brand-green/40
      "
    >
      <Icon size={20} />
    </a>
  );
}
