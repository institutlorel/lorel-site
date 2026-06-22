import type { Formation } from "./formations";

export type SiteFormation = Formation;

export const CATEGORIES = [
  { key: "en-ligne", label: "Formations en ligne", description: "Vidéos, à votre rythme", href: "/formations?category=en-ligne" },
  { key: "continue", label: "Formations encadrées", description: "Live avec formateur", href: "/formations?category=continue" },
  { key: "diplomante", label: "Formations diplômantes", description: "Diplôme reconnu", href: "/formations?category=diplomante" },
  { key: "individuel", label: "Formations individuelles", description: "Séances 1-on-1", href: "/formations?category=individuel" },
  { key: "vae", label: "VAE", description: "Validation des acquis", href: "/formations?category=vae" },
  { key: "consulting", label: "Consulting", description: "2h avec un expert", href: "/formations?category=consulting" },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]["key"];

const CATEGORY_LABELS: Record<string, string> = {
  "en-ligne": "Formations en ligne",
  "continue": "Formations encadrées",
  "diplomante": "Formations diplômantes",
  "individuel": "Formations individuelles",
  "vae": "VAE",
  "consulting": "Consulting",
};

const GRADIENTS: Record<string, string> = {
  "en-ligne": "from-[#1a2e52] via-[#1B3A5C] to-[#0a1628]",
  "continue": "from-[#1a3a2a] via-[#1a4030] to-[#0D1F35]",
  "diplomante": "from-[#3a1a2a] via-[#2a1020] to-[#0D1F35]",
  "individuel": "from-[#2a1a3a] via-[#1e1228] to-[#0D1F35]",
  "vae": "from-[#2a1a0a] via-[#1e1408] to-[#0D1F35]",
  "consulting": "from-[#1a2a3a] via-[#0e2030] to-[#0D1F35]",
};

const BASE = process.env.PLATFORM_API_URL ?? "https://app.institutlorel.com";

export interface SiteCode {
  head: string | null;
  bodyStart: string | null;
  footer: string | null;
}

export interface SiteSettings {
  casablanca: string;
  marrakech: string;
  enLigne: string;
  principalKey: string;
  principal: string;
  code: SiteCode;
}

const DEFAULT_SETTINGS: SiteSettings = {
  casablanca: "",
  marrakech: "",
  enLigne: "",
  principalKey: "EN_LIGNE",
  principal: "",
  code: { head: null, bodyStart: null, footer: null },
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch(`${BASE}/api/public/site-settings`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return DEFAULT_SETTINGS;
    const data = await res.json();
    const wa = data?.whatsapp ?? {};
    const c = data?.code ?? {};
    return {
      casablanca: wa.casablanca ?? "",
      marrakech: wa.marrakech ?? "",
      enLigne: wa.enLigne ?? "",
      principalKey: wa.principalKey ?? "EN_LIGNE",
      principal: wa.principal ?? "",
      code: {
        head: c.head ?? null,
        bodyStart: c.bodyStart ?? null,
        footer: c.footer ?? null,
      },
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function initials(name?: string): string {
  if (!name) return "IL";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapFormation(api: any): SiteFormation {
  const siteCategory: string = api.siteCategory ?? "";
  const category = CATEGORY_LABELS[siteCategory] ?? siteCategory ?? "Formation";

  const modeRaw: string = api.modeFormation ?? "EN_LIGNE";
  const mode = (["EN_LIGNE", "PRESENTIEL", "HYBRIDE"].includes(modeRaw)
    ? modeRaw
    : "EN_LIGNE") as Formation["mode"];

  const prix: number = typeof api.prix === "number" ? api.prix : 0;
  const priceDisplay = prix > 0 ? `${prix.toLocaleString("fr-MA")} DH` : "Sur devis";

  let faqRaw: { question: string; answer: string }[] = [];
  if (Array.isArray(api.faqPublic)) {
    faqRaw = api.faqPublic;
  } else if (typeof api.faqPublic === "string" && api.faqPublic) {
    try {
      faqRaw = JSON.parse(api.faqPublic);
    } catch {}
  }

  const formateurName: string =
    typeof api.formateur === "object" && api.formateur !== null
      ? api.formateur.nom ?? api.formateur.name ?? ""
      : typeof api.formateur === "string"
      ? api.formateur
      : "";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const programmeFr = (api.programmePublic ?? []).map((p: any) => ({
    titre: p.titre ?? p.title ?? "",
    brief: p.description ?? p.brief ?? p.contenu ?? "",
  }));

  return {
    id: String(api.id ?? ""),
    slug: api.slug ?? "",
    titreFr: api.titre ?? "",
    shortDesc: api.shortDescSite ?? (api.description ?? "").slice(0, 160),
    descriptionFr: api.description ?? "",
    category,
    domaine: category,
    mode,
    duree: api.duree ?? "",
    dureeHeures: api.dureeHeures ?? 0,
    niveau: api.niveau ?? api.niveauDiplome ?? "",
    rating: typeof api.ratingSite === "number" ? api.ratingSite : 0,
    ratingCount: typeof api.ratingSite === "number" ? Math.round(api.ratingSite * 20) : 0,
    studentsCount: api.studentsCountSite ?? 0,
    prix,
    priceDisplay,
    prixPromo: api.prixPromo ?? undefined,
    formateur: formateurName,
    formateurSlug: api.formateurSlug ?? "",
    formateurSpecialite: api.formateurSpecialite ?? category,
    formateurBio: api.formateurBio ?? "",
    formateurExperience: api.formateurExperience ?? "",
    formateurInitials: initials(formateurName),
    formateurGradient: "from-brand-blue to-brand-dark",
    gradient: GRADIENTS[siteCategory] ?? "from-[#1a2e52] via-[#1B3A5C] to-[#0a1628]",
    image: api.imageFinal ?? api.imageMarketing ?? api.image ?? "",
    nextSession: api.prochaineSession ?? "",
    placesDispo: api.placesDispo ?? 0,
    villes: api.villesSite ?? [],
    certification: api.certificationSite ?? "",
    programmeFr,
    objectifsFr: api.objectifsSite ?? [],
    prerequis: api.prerequisSite ?? "",
    faqFr: faqRaw.map((item) => ({ q: item.question, a: item.answer })),
    seoTitle: api.seoTitle ?? undefined,
    seoDescription: api.seoDescription ?? undefined,
    seoImage: api.seoImage ?? undefined,
  };
}

export async function getFormations(params?: {
  category?: string;
  ville?: string;
  individuel?: boolean;
}): Promise<SiteFormation[]> {
  try {
    const qs = new URLSearchParams();
    if (params?.category && params.category !== "individuel") qs.set("category", params.category);
    if (params?.category === "individuel") qs.set("individuel", "true");
    if (params?.ville) qs.set("ville", params.ville);
    if (params?.individuel) qs.set("individuel", "true");
    const url = `${BASE}/api/public/formations${qs.toString() ? "?" + qs : ""}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.formations ?? []).map(mapFormation);
  } catch (e) {
    console.error("[platform-api] getFormations failed:", e);
    return [];
  }
}

export async function getFormation(slug: string): Promise<SiteFormation | null> {
  try {
    const res = await fetch(`${BASE}/api/public/formations/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.formation ? mapFormation(data.formation) : null;
  } catch (e) {
    console.error("[platform-api] getFormation failed:", e);
    return null;
  }
}

export async function getRelatedFormations(
  slug: string,
  category: string
): Promise<SiteFormation[]> {
  const catKey = Object.entries(CATEGORY_LABELS).find(([, v]) => v === category)?.[0];
  const all = await getFormations(catKey ? { category: catKey } : undefined);
  return all.filter((f) => f.slug !== slug).slice(0, 3);
}

const TEMOIGNAGE_GRADIENTS = [
  "from-brand-blue to-brand-dark",
  "from-[#1a3a2a] to-brand-dark",
  "from-[#3a1a2a] to-brand-dark",
  "from-[#2a1a0a] to-brand-dark",
  "from-[#4a1a6a] to-brand-dark",
  "from-[#0a2a1a] to-brand-dark",
];

export interface SiteTemoignage {
  id: string;
  nom: string;
  quote: string;
  rating: number;
  formation: string;
  role: string;
  photo: string;
  annee: string | null;
  resultat: string | null;
  initials: string;
  gradient: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapTemoignage(api: any, idx: number): SiteTemoignage {
  return {
    id: String(api.id ?? ""),
    nom: api.nom ?? "",
    quote: api.texte ?? "",
    rating: typeof api.note === "number" ? api.note : 5,
    formation: api.formation ?? "",
    role: api.role ?? "",
    photo: api.photo ?? "",
    annee: api.annee ?? null,
    resultat: api.resultat ?? null,
    initials: initials(api.nom),
    gradient: TEMOIGNAGE_GRADIENTS[idx % TEMOIGNAGE_GRADIENTS.length],
  };
}

export async function getTemoignages(): Promise<SiteTemoignage[]> {
  try {
    const res = await fetch(`${BASE}/api/public/temoignages`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.temoignages ?? []).map(mapTemoignage);
  } catch {
    return [];
  }
}

export interface PageSeoEntry {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  keywords?: string | null;
}

export type PageSeoMap = Record<string, PageSeoEntry>;

export async function getPageSeo(): Promise<PageSeoMap> {
  try {
    const res = await fetch(`${BASE}/api/public/page-seo`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return {};
    const data = await res.json();
    return data.seo ?? {};
  } catch {
    return {};
  }
}

export interface SiteArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingMinutes: number;
  author: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
}

export interface SiteArticleFull extends SiteArticle {
  content: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapArticle(api: any): SiteArticle {
  return {
    id: String(api.id ?? ""),
    slug: api.slug ?? "",
    title: api.title ?? "",
    excerpt: api.excerpt ?? "",
    coverImage: api.coverImage ?? "",
    category: api.category ?? "",
    tags: Array.isArray(api.tags) ? api.tags : [],
    publishedAt: api.publishedAt ?? new Date().toISOString(),
    readingMinutes: typeof api.readingMinutes === "number" ? api.readingMinutes : 5,
    author: api.author ?? "Institut Lorel",
    metaTitle: api.metaTitle ?? undefined,
    metaDescription: api.metaDescription ?? undefined,
    ogImage: api.ogImage ?? undefined,
  };
}

export async function getArticles(category?: string): Promise<SiteArticle[]> {
  try {
    const qs = category ? `?category=${encodeURIComponent(category)}` : "";
    const res = await fetch(`${BASE}/api/public/blog${qs}`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.articles ?? []).map(mapArticle);
  } catch {
    return [];
  }
}

export async function getArticle(slug: string): Promise<SiteArticleFull | null> {
  try {
    const res = await fetch(`${BASE}/api/public/blog/${slug}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.article) return null;
    return { ...mapArticle(data.article), content: data.article.content ?? "" };
  } catch {
    return null;
  }
}
