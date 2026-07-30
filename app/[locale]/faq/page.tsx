import type { Metadata } from "next";
import { getPageSeo, getSiteSettings } from "@/lib/data/platform-api";
import { buildMetadata, resolvePageMeta } from "@/lib/seo";
import { FaqClient } from "./FaqClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params; // locale threaded through for future use (I2+); not consumed yet
  const seo = await getPageSeo();
  const m = resolvePageMeta(seo, "faq");
  return buildMetadata({ ...m, path: "/faq" });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params; // locale threaded through for future use (I2+); not consumed yet
  const { principal } = await getSiteSettings();
  return <FaqClient waNumber={principal} />;
}
