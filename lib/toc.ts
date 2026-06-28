import GithubSlugger from "github-slugger";

export interface TocEntry {
  depth: number;
  text: string;
  id: string;
}

export function extractToc(markdown: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];
  for (const line of markdown.split("\n")) {
    const m = line.match(/^(#{2,3})\s+(.+)$/);
    if (!m) continue;
    const depth = m[1].length;
    // Strip inline Markdown formatting for display text
    const raw = m[2]
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_`~]/g, "")
      .trim();
    entries.push({ depth, text: raw, id: slugger.slug(raw) });
  }
  return entries;
}
