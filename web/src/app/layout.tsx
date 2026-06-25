import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";

import { LogoSpinOnce } from "@/components/LogoSpinOnce";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { directusFetch } from "@/lib/directus";
import { directusAssetUrl } from "@/lib/seo";

type DirectusFile = string | { id: string } | null;

type SiteSettings = {
  logo_desktop: DirectusFile;
  logo_mobile: DirectusFile;
};

function getFileId(file: DirectusFile | undefined) {
  if (!file) return null;
  return typeof file === "string" ? file : file.id;
}

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ALEKSANDRA.PIROG.RU",
  description: "Wedding",
};

async function getSiteSettings(): Promise<SiteSettings | null> {
  const res = await directusFetch<{ data: SiteSettings }>(
    "/items/site_settings?fields=logo_desktop.id,logo_mobile.id,logo_footer.id",
    { cache: "no-store" },
  );

  return res.data ?? null;
}

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  const logoDesktopId = getFileId(settings?.logo_desktop);
  const logoMobileId = getFileId(settings?.logo_mobile);

  const logoDesktopUrl = logoDesktopId
    ? directusAssetUrl(logoDesktopId, { width: 600, quality: 90 })
    : null;

  const logoMobileUrl = logoMobileId
    ? directusAssetUrl(logoMobileId, { width: 360, quality: 90 })
    : null;

  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${manrope.variable} bg-brand-paper text-brand-dark font-ui antialiased`}
      >
        <LogoSpinOnce />
        <Header logoDesktopUrl={logoDesktopUrl} logoMobileUrl={logoMobileUrl} />
        {children}
        {modal}
        <Footer logoUrl={logoDesktopUrl} />
      </body>
    </html>
  );
}
