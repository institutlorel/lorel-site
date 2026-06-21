import type { Metadata } from "next";
import { getPageSeo, getSiteSettings } from "@/lib/data/platform-api";
import { buildMetadata, resolvePageMeta } from "@/lib/seo";
import { FaqClient } from "./FaqClient";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo();
  const m = resolvePageMeta(seo, "faq");
  return buildMetadata({ ...m, path: "/faq" });
}

export default async function FaqPage() {
  const { principal } = await getSiteSettings();
  return <FaqClient waNumber={principal} />;
}
