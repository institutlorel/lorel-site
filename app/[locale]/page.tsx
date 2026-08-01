import type { Metadata } from "next";
import { getPageSeo } from "@/lib/data/platform-api";
import { buildMetadata, resolvePageMeta } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params; // locale threaded through for future use (I2+); not consumed yet
  const seo = await getPageSeo();
  const m = resolvePageMeta(seo, "home");
  return buildMetadata({ ...m, path: "/" });
}

import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { TrustBadges } from "@/components/home/TrustBadges";
import { DomainesGrid } from "@/components/home/DomainesGrid";
import { FormationsPopulairesWrapper } from "@/components/home/FormationsPopulairesWrapper";
import { ModesSection } from "@/components/home/ModesSection";
import { WhyLorel } from "@/components/home/WhyLorel";
import { ServicesVAE } from "@/components/home/ServicesVAE";
import { FormateursSection } from "@/components/home/FormateursSection";
import { Temoignages } from "@/components/home/Temoignages";
import { Process } from "@/components/home/Process";
import { BlogPreview } from "@/components/home/BlogPreview";
import { CentersSection } from "@/components/home/CentersSection";
import { CTASection } from "@/components/home/CTASection";
import { Footer } from "@/components/home/Footer";
import { getSiteSettings, getTemoignages, getArticles } from "@/lib/data/platform-api";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Langue } from "@/lib/i18n/config";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Langue);
  const [{ principal }, temoignages, previewArticles] = await Promise.all([
    getSiteSettings(),
    getTemoignages(),
    getArticles(),
  ]);
  return (
    <>
      <AnnouncementBar dict={dict} />
      <Navbar dict={dict} />
      <main>
        <Hero dict={dict} />
        <TrustBar dict={dict} />
        <TrustBadges dict={dict} />
        <DomainesGrid dict={dict} />
        <FormationsPopulairesWrapper dict={dict} />
        <ModesSection dict={dict} />
        <WhyLorel dict={dict} />
        <ServicesVAE dict={dict} />
        <FormateursSection dict={dict} />
        <Temoignages temoignages={temoignages} dict={dict} />
        <Process dict={dict} />
        <BlogPreview articles={previewArticles.slice(0, 3)} dict={dict} />
        <CentersSection dict={dict} />
        <CTASection waNumber={principal} dict={dict} />
      </main>
      <Footer waNumber={principal} dict={dict} />
    </>
  );
}
