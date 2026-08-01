import { getSiteSettings } from "@/lib/data/platform-api";
import { Footer } from "@/components/home/Footer";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export async function SiteFooter({ dict }: { dict: Dictionary }) {
  const { principal } = await getSiteSettings();
  return <Footer waNumber={principal} dict={dict} />;
}
