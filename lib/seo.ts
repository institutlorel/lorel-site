import type { Metadata } from "next";
import type { PageSeoEntry, SiteFormation } from "@/lib/data/platform-api";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://institutlorel.com";

export const DEFAULT_OG_IMAGE =
  "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200";

export const DEFAULT_SEO: Record<string, { title: string; description: string }> = {
  home: {
    title: "Institut Lorel — Formations Professionnelles à Marrakech & Casablanca",
    description:
      "Devenez un professionnel certifié avec Institut Lorel. Formations en présentiel, en ligne et hybride. +500 diplômés, taux de satisfaction 95%. VAE et accompagnement inclus.",
  },
  formations: {
    title: "Toutes Nos Formations Certifiées",
    description:
      "Photographie, marketing digital, esthétique, comptabilité, mode et plus. Formations certifiées en présentiel & en ligne à Marrakech et Casablanca.",
  },
  formateurs: {
    title: "Nos Formateurs Experts",
    description:
      "Rencontrez nos formateurs professionnels : experts terrain passionnés par la transmission. Chaque formateur est sélectionné pour son expertise et sa pédagogie.",
  },
  services: {
    title: "Nos Services d'Accompagnement",
    description:
      "VAE, formation en entreprise, accompagnement projet. Institut Lorel vous accompagne à chaque étape de votre développement professionnel.",
  },
  about: {
    title: "À Propos d'Institut Lorel",
    description:
      "Depuis 2015, Institut Lorel forme les talents au Maroc. Découvrez notre histoire, nos centres à Marrakech et Casablanca, notre mission et nos valeurs.",
  },
  contact: {
    title: "Contactez-nous",
    description:
      "Posez vos questions par WhatsApp, téléphone ou formulaire. Notre équipe vous répond sous 24h pour vous orienter vers la formation idéale.",
  },
  faq: {
    title: "Questions Fréquentes (FAQ)",
    description:
      "Inscriptions, paiement, certifications, VAE... Trouvez les réponses à vos questions sur les formations Institut Lorel.",
  },
};

interface BuildMetadataParams {
  title: string;
  description: string;
  image?: string;
  path: string;
  keywords?: string;
}

export function buildMetadata({
  title,
  description,
  image,
  path,
  keywords,
}: BuildMetadataParams): Metadata {
  const imageUrl = image ?? DEFAULT_OG_IMAGE;
  const canonical = `${SITE_URL}${path}`;

  return {
    title,
    description,
    ...(keywords ? { keywords: keywords.split(",").map((k) => k.trim()) } : {}),
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Institut Lorel",
      locale: "fr_MA",
      type: "website",
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Institut Lorel",
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE,
    description:
      "Formations professionnelles certifiées à Marrakech et Casablanca. Présentiel, en ligne et hybride. VAE et accompagnement.",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Quartier Guéliz",
        addressLocality: "Marrakech",
        postalCode: "40000",
        addressCountry: "MA",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Quartier Maârif",
        addressLocality: "Casablanca",
        postalCode: "20000",
        addressCountry: "MA",
      },
    ],
    areaServed: "MA",
    inLanguage: "fr",
  };
}

export function courseJsonLd(formation: SiteFormation) {
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: formation.titreFr,
    description: formation.shortDesc || formation.descriptionFr.slice(0, 160),
    provider: {
      "@type": "EducationalOrganization",
      name: "Institut Lorel",
      url: SITE_URL,
    },
    inLanguage: "fr",
    url: `${SITE_URL}/formations/${formation.slug}`,
  };
  if (formation.prix > 0) {
    base.offers = {
      "@type": "Offer",
      price: formation.prix,
      priceCurrency: "MAD",
    };
  }
  return base;
}

export function resolvePageMeta(
  seoMap: Record<string, PageSeoEntry>,
  key: string
): { title: string; description: string; image?: string; keywords?: string } {
  const entry = seoMap[key] ?? {};
  const defaults = DEFAULT_SEO[key] ?? { title: "Institut Lorel", description: "" };
  return {
    title: entry.metaTitle ?? defaults.title,
    description: entry.metaDescription ?? defaults.description,
    image: entry.ogImage ?? undefined,
    keywords: entry.keywords ?? undefined,
  };
}
