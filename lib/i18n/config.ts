export const LANGUES = ["fr", "ar", "en"] as const;
export type Langue = (typeof LANGUES)[number];
export const LANGUE_DEFAUT: Langue = "fr";

export const LANGUE_INFO: Record<Langue, { nom: string; dir: "ltr" | "rtl"; flag: string }> = {
  fr: { nom: "Français", dir: "ltr", flag: "🇫🇷" },
  ar: { nom: "العربية", dir: "rtl", flag: "🇲🇦" },
  en: { nom: "English", dir: "ltr", flag: "🇬🇧" },
};

export function isRtl(langue: Langue): boolean {
  return LANGUE_INFO[langue].dir === "rtl";
}
