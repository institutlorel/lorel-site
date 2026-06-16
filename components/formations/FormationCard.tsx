import Link from "next/link";
import { Clock, Star, ArrowUpRight, MonitorPlay, Building, Layers } from "lucide-react";
import type { Formation } from "@/lib/data/formations";
import { getCategoryAccent } from "@/lib/data/accents";

const MODE_LABELS: Record<string, string> = {
  EN_LIGNE: "En ligne",
  PRESENTIEL: "Présentiel",
  HYBRIDE: "Hybride",
};

const MODE_ICONS = {
  EN_LIGNE: MonitorPlay,
  PRESENTIEL: Building,
  HYBRIDE: Layers,
};

function getUrgencyBadge(f: Formation): { label: string; color: string } | null {
  if (f.placesDispo <= 5) return { label: "Bientôt complet", color: "#EF4444" };
  if (f.placesDispo <= 10) return { label: `${f.placesDispo} places restantes`, color: "#F59E0B" };
  if (f.prixPromo) return { label: "Offre spéciale", color: "#0EA5E9" };
  return null;
}

export function FormationCard({ formation: f }: { formation: Formation }) {
  const ModeIcon = MODE_ICONS[f.mode];
  const modeLabel = MODE_LABELS[f.mode];
  const accentHex = getCategoryAccent(f.category);
  const urgency = getUrgencyBadge(f);

  return (
    <Link
      href={`/formations/${f.slug}`}
      className="group block bg-white border border-gray-100 hover:border-brand-gold/25 rounded-2xl overflow-hidden hover:shadow-card-hover transition-all duration-300"
    >
      {/* Image area */}
      <div className="relative h-48 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient}`} />
        <img
          src={f.image}
          alt={f.titreFr}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />

        {/* Category badge — accent color */}
        <div className="absolute top-3 left-3">
          <span
            className="font-body text-[10px] font-bold text-white px-2.5 py-1 rounded-full uppercase tracking-wide"
            style={{ backgroundColor: accentHex }}
          >
            {f.category}
          </span>
        </div>

        {/* Mode badge */}
        <div className="absolute top-3 right-3">
          <span className="flex items-center gap-1.5 font-body text-[10px] font-semibold text-white bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
            <ModeIcon className="w-3 h-3" />
            {modeLabel}
          </span>
        </div>

        {/* Urgency badge */}
        {urgency && (
          <div className="absolute bottom-3 left-3">
            <span
              className="font-body text-[10px] font-bold text-white px-2.5 py-1 rounded-full"
              style={{ backgroundColor: urgency.color }}
            >
              {urgency.label}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-display text-[17px] font-semibold text-brand-blue leading-snug mb-1.5 line-clamp-2 group-hover:text-brand-dark transition-colors duration-200">
          {f.titreFr}
        </h3>
        <p className="font-body text-xs text-text-muted mb-4 truncate">{f.shortDesc}</p>

        <div className="h-px bg-gray-100 mb-4" />

        {/* Formateur */}
        <div className="flex items-center gap-2.5 mb-4">
          <div
            className={`w-7 h-7 rounded-full bg-gradient-to-br ${f.formateurGradient} flex items-center justify-center shrink-0`}
          >
            <span className="font-display text-[11px] font-bold text-white/80">{f.formateurInitials}</span>
          </div>
          <div>
            <div className="font-body text-[12px] font-semibold text-text-primary">{f.formateur}</div>
            <div className="font-body text-[10px] text-text-muted">Formateur</div>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-5">
          <span className="flex items-center gap-1 font-body text-[11px] text-text-muted">
            <Clock className="w-3 h-3" />
            {f.duree}
          </span>
          <span className="w-px h-3 bg-gray-200" />
          <span className="font-body text-[11px] text-text-muted">{f.niveau}</span>
          <span className="w-px h-3 bg-gray-200" />
          <span className="flex items-center gap-0.5 font-body text-[11px] text-text-muted">
            <Star className="w-3 h-3 text-brand-gold fill-brand-gold" />
            {f.rating}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-body text-[10px] text-text-muted uppercase tracking-wide">À partir de</div>
            <div className="font-display text-lg font-bold text-brand-gold leading-none">{f.priceDisplay}</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-brand-blue/8 group-hover:bg-brand-gold flex items-center justify-center transition-all duration-300 border border-brand-blue/15 group-hover:border-brand-gold">
            <ArrowUpRight className="w-4 h-4 text-brand-blue group-hover:text-brand-dark transition-colors duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}
