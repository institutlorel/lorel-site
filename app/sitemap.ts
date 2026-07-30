import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getFormations, getArticles } from "@/lib/data/platform-api";
import { FORMATEURS } from "@/lib/data/formateurs";
import { SERVICES } from "@/lib/data/services";
import { LANGUES, LANGUE_DEFAUT } from "@/lib/i18n/config";
import { localeHref } from "@/lib/i18n/href";

// Each page appears once (fr, unprefixed — the canonical URL) with hreflang
// alternates for every locale + x-default, rather than 3 separate flat entries.
function alternatesFor(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of LANGUES) {
    languages[locale] = `${SITE_URL}${localeHref(path, locale)}`;
  }
  languages["x-default"] = `${SITE_URL}${localeHref(path, LANGUE_DEFAUT)}`;
  return { languages };
}

function entry(
  path: string,
  lastModified: Date,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number
): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}${localeHref(path, LANGUE_DEFAUT)}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: alternatesFor(path),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    entry("/", now, "weekly", 1.0),
    entry("/formations", now, "weekly", 0.9),
    entry("/formateurs", now, "monthly", 0.8),
    entry("/services", now, "monthly", 0.8),
    entry("/blog", now, "weekly", 0.7),
    entry("/about", now, "monthly", 0.6),
    entry("/contact", now, "monthly", 0.6),
    entry("/faq", now, "monthly", 0.5),
  ];

  const formations = await getFormations();
  const formationRoutes: MetadataRoute.Sitemap = formations.map((f) =>
    entry(`/formations/${f.slug}`, now, "weekly", 0.8)
  );

  const formateurRoutes: MetadataRoute.Sitemap = FORMATEURS.map((f) =>
    entry(`/formateurs/${f.slug}`, now, "monthly", 0.6)
  );

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) =>
    entry(`/services/${s.slug}`, now, "monthly", 0.7)
  );

  const articles = await getArticles();
  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) =>
    entry(`/blog/${a.slug}`, new Date(a.publishedAt), "monthly", 0.6)
  );

  return [...staticRoutes, ...formationRoutes, ...formateurRoutes, ...serviceRoutes, ...articleRoutes];
}
