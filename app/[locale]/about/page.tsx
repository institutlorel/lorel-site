import type { Metadata } from "next";
import { getPageSeo, getSiteSettings } from "@/lib/data/platform-api";
import { buildMetadata, resolvePageMeta } from "@/lib/seo";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AboutClient } from "./AboutClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params; // locale threaded through for future use (I2+); not consumed yet
  const seo = await getPageSeo();
  const m = resolvePageMeta(seo, "about");
  return buildMetadata({ ...m, path: "/about" });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params; // locale threaded through for future use (I2+); not consumed yet
  const { principal } = await getSiteSettings();
  return (
    <>
      <SiteHeader />
      <AboutClient waNumber={principal} />
      <SiteFooter />
    </>
  );
}
