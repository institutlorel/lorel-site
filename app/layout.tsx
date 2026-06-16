import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Tajawal } from "next/font/google";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { getSiteSettings } from "@/lib/data/platform-api";
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

export const metadata: Metadata = {
  title: "Institut Lorel — Formation Professionnelle au Maroc",
  description:
    "Formations professionnelles certifiées à Marrakech et Casablanca. Présentiel, en ligne et hybride. VAE et accompagnement. +500 diplômés.",
  keywords:
    "formation professionnelle maroc, formation marrakech, formation casablanca, VAE maroc, formation en ligne maroc, institut lorel",
  metadataBase: new URL("https://institutlorel.com"),
  openGraph: {
    title: "Institut Lorel — Formation Professionnelle au Maroc",
    description: "Formez-vous avec les meilleurs au Maroc.",
    type: "website",
    locale: "fr_MA",
    siteName: "Institut Lorel",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { principal } = await getSiteSettings();
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${inter.variable} ${tajawal.variable}`}
    >
      <body>
        {children}
        <WhatsAppFloat number={principal} />
      </body>
    </html>
  );
}
