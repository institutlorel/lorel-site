import type { Metadata } from "next";
import { getPageSeo, getArticles } from "@/lib/data/platform-api";
import { buildMetadata, resolvePageMeta } from "@/lib/seo";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Langue } from "@/lib/i18n/config";
import { BlogListClient } from "./BlogListClient";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params; // locale threaded through for future use (I2+); not consumed yet
  const seo = await getPageSeo();
  const m = resolvePageMeta(seo, "blog");
  return buildMetadata({ ...m, path: "/blog" });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Langue);
  const articles = await getArticles();
  return (
    <>
      <SiteHeader dict={dict} />
      <BlogListClient articles={articles} dict={dict} />
      <SiteFooter dict={dict} />
    </>
  );
}
