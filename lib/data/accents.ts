export const DOMAINE_ACCENTS: Record<string, string> = {
  "Beauté & Esthétique": "#E07A9B",
  "Arts Visuels": "#6B8FD4",
  "Digital & Marketing": "#4CAF9D",
  "Mode & Stylisme": "#9B6BD4",
  "Finance & Gestion": "#5BA85B",
  "Développement Personnel": "#E0A04C",
};

export const CATEGORY_ACCENTS: Record<string, string> = {
  "Beauté": "#E07A9B",
  "Arts Visuels": "#6B8FD4",
  "Digital": "#4CAF9D",
  "Mode": "#9B6BD4",
  "Finance": "#5BA85B",
  "Dev Personnel": "#E0A04C",
};

export function getDomaineAccent(domaine: string): string {
  return DOMAINE_ACCENTS[domaine] ?? "#C9A84C";
}

export function getCategoryAccent(category: string): string {
  return CATEGORY_ACCENTS[category] ?? "#C9A84C";
}

export function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}
