import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getFormations, getArticles } from "@/lib/data/platform-api";
import { FORMATEURS } from "@/lib/data/formateurs";
import { SERVICES } from "@/lib/data/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/formations`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/formateurs`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const formations = await getFormations();
  const formationRoutes: MetadataRoute.Sitemap = formations.map((f) => ({
    url: `${SITE_URL}/formations/${f.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const formateurRoutes: MetadataRoute.Sitemap = FORMATEURS.map((f) => ({
    url: `${SITE_URL}/formateurs/${f.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articles = await getArticles();
  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/blog/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...formationRoutes, ...formateurRoutes, ...serviceRoutes, ...articleRoutes];
}
