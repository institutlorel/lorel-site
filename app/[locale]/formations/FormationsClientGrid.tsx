"use client";

import { useMemo, useState } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { FormationCard } from "@/components/formations/FormationCard";
import type { Formation } from "@/lib/data/formations";
import { Container } from "@/components/ui/Container";

const MODES = ["Tous", "Présentiel", "En ligne", "Hybride"] as const;
const NIVEAUX = ["Tous", "Débutant", "Intermédiaire", "Avancé"] as const;
const SORTS = [
  { label: "Populaires", value: "popular" },
  { label: "Prix croissant", value: "price_asc" },
  { label: "Prix décroissant", value: "price_desc" },
] as const;

const MODE_MAP: Record<string, string> = {
  Présentiel: "PRESENTIEL",
  "En ligne": "EN_LIGNE",
  Hybride: "HYBRIDE",
};

type Sort = (typeof SORTS)[number]["value"];

export function FormationsClientGrid({
  formations: initialFormations,
}: {
  formations: Formation[];
}) {
  const [query, setQuery] = useState("");
  const [activeMode, setActiveMode] = useState<(typeof MODES)[number]>("Tous");
  const [activeNiveau, setActiveNiveau] = useState<(typeof NIVEAUX)[number]>("Tous");
  const [sort, setSort] = useState<Sort>("popular");
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...initialFormations];

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (f) =>
          f.titreFr.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q) ||
          f.shortDesc.toLowerCase().includes(q)
      );
    }
    if (activeMode !== "Tous") {
      result = result.filter((f) => f.mode === MODE_MAP[activeMode]);
    }
    if (activeNiveau !== "Tous") {
      result = result.filter((f) => f.niveau === activeNiveau);
    }

    if (sort === "popular") result.sort((a, b) => b.studentsCount - a.studentsCount);
    if (sort === "price_asc") result.sort((a, b) => a.prix - b.prix);
    if (sort === "price_desc") result.sort((a, b) => b.prix - a.prix);

    return result;
  }, [query, activeMode, activeNiveau, sort, initialFormations]);

  const hasFilters = query || activeMode !== "Tous" || activeNiveau !== "Tous";

  const clearFilters = () => {
    setQuery("");
    setActiveMode("Tous");
    setActiveNiveau("Tous");
    setSort("popular");
  };

  return (
    <>
      {/* Sticky filter bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <Container>
          {/* Search row */}
          <div className="pt-3 pb-2">
            <div className="flex items-center bg-brand-cream rounded-xl overflow-hidden max-w-xl border border-gray-200">
              <Search className="w-4 h-4 text-text-muted ml-4 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une formation..."
                className="flex-1 py-2.5 px-3 font-body text-sm text-text-primary placeholder-text-muted outline-none bg-transparent"
              />
              {query && (
                <button onClick={() => setQuery("")} className="mr-3 text-text-muted hover:text-text-primary">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Filter chips row */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2">
            {MODES.map((m) => (
              <button
                key={m}
                onClick={() => setActiveMode(m)}
                className={`font-body text-[12px] font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-200 whitespace-nowrap shrink-0 ${
                  activeMode === m
                    ? "bg-brand-blue text-white border-brand-blue"
                    : "text-text-secondary border-gray-200 hover:border-brand-blue/40 hover:text-brand-blue"
                }`}
              >
                {m}
              </button>
            ))}

            <div className="w-px h-4 bg-gray-200 shrink-0 mx-1" />

            {NIVEAUX.map((n) => (
              <button
                key={n}
                onClick={() => setActiveNiveau(n)}
                className={`font-body text-[12px] font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-200 whitespace-nowrap shrink-0 ${
                  activeNiveau === n
                    ? "bg-brand-gold text-brand-dark border-brand-gold"
                    : "text-text-secondary border-gray-200 hover:border-brand-gold/40 hover:text-brand-gold"
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          {/* Count + sort + clear */}
          <div className="flex items-center justify-between pb-2 border-t border-gray-50 pt-2">
            <span className="font-body text-[12px] text-text-muted">
              <span className="font-semibold text-text-primary">{filtered.length}</span>{" "}
              formation{filtered.length !== 1 ? "s" : ""}
            </span>
            <div className="flex items-center gap-3">
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 font-body text-[11px] text-text-muted hover:text-text-primary transition-colors"
                >
                  <X className="w-3 h-3" /> Effacer
                </button>
              )}
              <div className="relative">
                <button
                  onClick={() => setSortOpen((v) => !v)}
                  className="flex items-center gap-1.5 font-body text-[12px] text-text-secondary hover:text-brand-blue border border-gray-200 rounded-full px-3 py-1.5 transition-colors"
                >
                  {SORTS.find((s) => s.value === sort)?.label}
                  <ChevronDown className={`w-3 h-3 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-card-hover z-20 min-w-[160px] overflow-hidden">
                    {SORTS.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => { setSort(s.value); setSortOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 font-body text-[12px] transition-colors hover:bg-brand-cream ${
                          sort === s.value ? "text-brand-blue font-semibold" : "text-text-secondary"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Grid */}
      <section className="py-12 lg:py-16 bg-brand-cream min-h-[60vh]">
        <Container>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-5">
                <Search className="w-7 h-7 text-text-muted" />
              </div>
              <h3 className="font-display text-xl font-semibold text-brand-blue mb-2">
                {initialFormations.length === 0
                  ? "Aucune formation disponible pour le moment"
                  : "Aucune formation trouvée"}
              </h3>
              <p className="font-body text-sm text-text-secondary mb-6 max-w-sm">
                {initialFormations.length === 0
                  ? "Revenez bientôt, de nouvelles formations arrivent."
                  : "Aucune formation ne correspond à vos critères. Essayez de modifier vos filtres."}
              </p>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="font-body text-sm font-semibold text-brand-blue hover:text-brand-gold border border-brand-blue/30 hover:border-brand-gold px-6 py-2.5 rounded-sm transition-all duration-200"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((f) => (
                <FormationCard key={f.slug} formation={f} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
