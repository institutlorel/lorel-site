import type { Metadata } from "next";
import { getPageSeo, getSiteSettings } from "@/lib/data/platform-api";
import { buildMetadata, resolvePageMeta } from "@/lib/seo";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Langue } from "@/lib/i18n/config";
import { ContactClient } from "./ContactClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params; // locale threaded through for future use (I2+); not consumed yet
  const seo = await getPageSeo();
  const m = resolvePageMeta(seo, "contact");
  return buildMetadata({ ...m, path: "/contact" });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Langue);
  const { casablanca, marrakech, enLigne } = await getSiteSettings();
  return (
    <>
      <SiteHeader dict={dict} />
      <ContactClient waSettings={{ casablanca, marrakech, enLigne }} dict={dict} />
      <SiteFooter dict={dict} />
    </>
  );
}
