import { getSiteSettings } from "@/lib/data/platform-api";
import { Footer } from "@/components/home/Footer";

export async function SiteFooter() {
  const { principal } = await getSiteSettings();
  return <Footer waNumber={principal} />;
}
