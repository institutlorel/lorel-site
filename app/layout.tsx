import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Tajawal } from "next/font/google";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { CodeInjector } from "@/components/CodeInjector";
import { JsonLd } from "@/components/JsonLd";
import { getSiteSettings } from "@/lib/data/platform-api";
import { organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://institutlorel.com";
const DEFAULT_OG =
  "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Institut Lorel — Formations Professionnelles à Marrakech & Casablanca",
    template: "%s | Institut Lorel",
  },
  description:
    "Formations professionnelles certifiées à Marrakech et Casablanca. Présentiel, en ligne et hybride. VAE et accompagnement. +500 diplômés.",
  keywords: [
    "formation professionnelle maroc",
    "formation marrakech",
    "formation casablanca",
    "VAE maroc",
    "formation en ligne maroc",
    "institut lorel",
  ],
  openGraph: {
    type: "website",
    locale: "fr_MA",
    siteName: "Institut Lorel",
    images: [{ url: DEFAULT_OG }],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { principal, code } = await getSiteSettings();
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${inter.variable} ${tajawal.variable}`}
    >
      <body>
        {code.head && <CodeInjector html={code.head} position="head" />}
        {code.bodyStart && <CodeInjector html={code.bodyStart} position="body-start" />}
        <JsonLd data={organizationJsonLd()} />
        {children}
        <WhatsAppFloat number={principal} />
        {code.footer && <CodeInjector html={code.footer} position="body-end" />}
      </body>
    </html>
  );
}
