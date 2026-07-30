import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { LANGUES } from "@/lib/i18n/config";
import { localeHref } from "@/lib/i18n/href";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", ...LANGUES.map((l) => localeHref("/merci", l))],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
