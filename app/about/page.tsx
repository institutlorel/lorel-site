import type { Metadata } from "next";
import { getPageSeo, getSiteSettings } from "@/lib/data/platform-api";
import { buildMetadata, resolvePageMeta } from "@/lib/seo";
import { AboutClient } from "./AboutClient";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo();
  const m = resolvePageMeta(seo, "about");
  return buildMetadata({ ...m, path: "/about" });
}

export default async function AboutPage() {
  const { principal } = await getSiteSettings();
  return <AboutClient waNumber={principal} />;
}
