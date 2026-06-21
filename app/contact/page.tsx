import type { Metadata } from "next";
import { getPageSeo, getSiteSettings } from "@/lib/data/platform-api";
import { buildMetadata, resolvePageMeta } from "@/lib/seo";
import { ContactClient } from "./ContactClient";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo();
  const m = resolvePageMeta(seo, "contact");
  return buildMetadata({ ...m, path: "/contact" });
}

export default async function ContactPage() {
  const { casablanca, marrakech, enLigne } = await getSiteSettings();
  return <ContactClient waSettings={{ casablanca, marrakech, enLigne }} />;
}
