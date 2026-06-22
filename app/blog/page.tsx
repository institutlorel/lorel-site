import type { Metadata } from "next";
import { getPageSeo, getArticles } from "@/lib/data/platform-api";
import { buildMetadata, resolvePageMeta } from "@/lib/seo";
import { BlogListClient } from "./BlogListClient";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo();
  const m = resolvePageMeta(seo, "blog");
  return buildMetadata({ ...m, path: "/blog" });
}

export default async function BlogPage() {
  const articles = await getArticles();
  return <BlogListClient articles={articles} />;
}
