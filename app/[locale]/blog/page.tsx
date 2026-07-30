import type { Metadata } from "next";
import { getPageSeo, getArticles } from "@/lib/data/platform-api";
import { buildMetadata, resolvePageMeta } from "@/lib/seo";
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
  await params; // locale threaded through for future use (I2+); not consumed yet
  const articles = await getArticles();
  return <BlogListClient articles={articles} />;
}
