import type { Metadata } from "next";
import { getPageSeo, getSiteSettings } from "@/lib/data/platform-api";
import { buildMetadata, resolvePageMeta } from "@/lib/seo";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
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
  await params; // locale threaded through for future use (I2+); not consumed yet
  const { casablanca, marrakech, enLigne } = await getSiteSettings();
  return (
    <>
      <SiteHeader />
      <ContactClient waSettings={{ casablanca, marrakech, enLigne }} />
      <SiteFooter />
    </>
  );
}
