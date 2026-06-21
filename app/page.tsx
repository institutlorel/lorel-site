export const revalidate = 60;

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
import { getSiteSettings, getTemoignages } from "@/lib/data/platform-api";

export default async function Home() {
  const [{ principal }, temoignages] = await Promise.all([
    getSiteSettings(),
    getTemoignages(),
  ]);
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <TrustBadges />
        <DomainesGrid />
        <FormationsPopulairesWrapper />
        <ModesSection />
        <WhyLorel />
        <ServicesVAE />
        <FormateursSection />
        <Temoignages temoignages={temoignages} />
        <Process />
        <BlogPreview />
        <CentersSection />
        <CTASection waNumber={principal} />
      </main>
      <Footer waNumber={principal} />
    </>
  );
}
