"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Clock,
  Star,
  Users,
  MapPin,
  CheckCircle,
  ChevronDown,
  MonitorPlay,
  Building,
  Layers,
  Award,
  Calendar,
  BookOpen,
  Target,
  MessageSquare,
  ArrowUpRight,
  Phone,
} from "lucide-react";
import type { Formation } from "@/lib/data/formations";
import { FormationCard } from "@/components/formations/FormationCard";
import { Container } from "@/components/ui/Container";
import { InscriptionModal } from "@/components/InscriptionModal";

const MODE_LABELS: Record<string, string> = {
  EN_LIGNE: "En ligne",
  PRESENTIEL: "Présentiel",
  HYBRIDE: "Hybride",
};
const MODE_ICONS = { EN_LIGNE: MonitorPlay, PRESENTIEL: Building, HYBRIDE: Layers };

const TABS = [
  { id: "programme", label: "Programme", icon: BookOpen },
  { id: "objectifs", label: "Objectifs", icon: Target },
  { id: "formateur", label: "Formateur", icon: Users },
  { id: "faq", label: "FAQ", icon: MessageSquare },
] as const;
type TabId = (typeof TABS)[number]["id"];

function AccordionItem({
  title,
  children,
  index,
}: {
  title: string;
  children: React.ReactNode;
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="font-body text-[13px] font-semibold text-text-primary group-hover:text-brand-blue transition-colors pr-4">
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-text-muted shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="font-body text-[13px] font-semibold text-text-primary group-hover:text-brand-blue transition-colors pr-4">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-text-muted shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="font-body text-sm text-text-secondary leading-relaxed pb-4">{a}</p>
      )}
    </div>
  );
}

function EnrollCard({
  formation: f,
  waNumber,
  onOpenModal,
}: {
  formation: Formation;
  waNumber?: string;
  onOpenModal: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card-hover overflow-hidden">
      {/* Image preview */}
      <div className={`h-32 bg-gradient-to-br ${f.gradient} relative overflow-hidden`}>
        <img
          src={f.image}
          alt={f.titreFr}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 to-transparent" />
        {f.placesDispo <= 5 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white font-body text-[10px] font-bold px-2 py-0.5 rounded-full">
            {f.placesDispo} places restantes
          </div>
        )}
      </div>

      {/* Urgency: places progress bar */}
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-body text-[10px] text-text-muted uppercase tracking-wide">
            Places disponibles
          </span>
          <span
            className={`font-body text-[11px] font-bold ${
              f.placesDispo <= 12 ? "text-amber-600" : "text-text-secondary"
            }`}
          >
            {f.placesDispo} / 30
          </span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              f.placesDispo <= 5
                ? "bg-red-500"
                : f.placesDispo <= 12
                ? "bg-amber-500"
                : "bg-brand-blue/40"
            }`}
            style={{
              width: `${Math.min(Math.round(((30 - f.placesDispo) / 30) * 100), 100)}%`,
            }}
          />
        </div>
        {f.placesDispo <= 12 && (
          <p className="font-body text-[10px] font-semibold mt-1.5 text-amber-600">
            Seulement {f.placesDispo} place{f.placesDispo > 1 ? "s" : ""} restante
            {f.placesDispo > 1 ? "s" : ""}
          </p>
        )}
      </div>

      <div className="p-5">
        <div className="mb-5">
          {f.prixPromo && (
            <div className="font-body text-xs text-text-muted line-through mb-0.5">{f.priceDisplay}</div>
          )}
          <div className="font-display text-2xl font-bold text-brand-gold">
            {f.prixPromo ? `${f.prixPromo.toLocaleString("fr-MA")} DH` : f.priceDisplay}
          </div>
          {f.prixPromo && (
            <div className="font-body text-[11px] text-green-600 font-semibold mt-0.5">Offre limitée</div>
          )}
        </div>

        <div className="space-y-2.5 mb-5">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-3.5 h-3.5 text-brand-gold shrink-0" />
            <span className="font-body text-[12px] text-text-secondary">
              Prochaine session : <span className="font-semibold text-text-primary">{f.nextSession}</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-3.5 h-3.5 text-brand-gold shrink-0" />
            <span className="font-body text-[12px] text-text-secondary">
              {f.duree} · {f.dureeHeures}h de formation
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Award className="w-3.5 h-3.5 text-brand-gold shrink-0" />
            <span className="font-body text-[12px] text-text-secondary">Certificat inclus</span>
          </div>
          {f.villes.length > 0 && (
            <div className="flex items-start gap-2.5">
              <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
              <span className="font-body text-[12px] text-text-secondary">{f.villes.join(" · ")}</span>
            </div>
          )}
        </div>

        <div className="h-px bg-gray-100 mb-5" />

        <div className="space-y-3">
          <button
            onClick={onOpenModal}
            className="flex items-center justify-center gap-2 w-full min-h-[46px] bg-brand-blue hover:bg-brand-dark text-white font-body text-sm font-semibold py-3.5 rounded-sm transition-all duration-300"
          >
            S&apos;inscrire maintenant
            <ArrowUpRight className="w-4 h-4" />
          </button>
          {waNumber ? (
            <a
              href={`https://wa.me/${waNumber}`}
              className="flex items-center justify-center gap-2 w-full min-h-[46px] bg-brand-cream hover:bg-brand-cream-dark text-brand-blue font-body text-sm font-semibold py-3.5 rounded-sm transition-all duration-300 border border-brand-blue/15"
            >
              Demander plus d&apos;infos
            </a>
          ) : (
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full min-h-[46px] bg-brand-cream hover:bg-brand-cream-dark text-brand-blue font-body text-sm font-semibold py-3.5 rounded-sm transition-all duration-300 border border-brand-blue/15"
            >
              Demander plus d&apos;infos
            </Link>
          )}
        </div>

        <div className="mt-4 text-center">
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            Paiement sécurisé · Satisfaction garantie
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="flex -space-x-1.5">
              {[
                "from-brand-blue to-brand-dark",
                "from-brand-gold to-amber-600",
                "from-[#E07A9B] to-[#c0547a]",
              ].map((g, i) => (
                <div
                  key={i}
                  className={`w-5 h-5 rounded-full border-2 border-white bg-gradient-to-br ${g}`}
                />
              ))}
            </div>
            <p className="font-body text-[10px] text-text-muted">
              <span className="font-semibold text-text-secondary">
                {8 + (parseInt(f.id, 10) * 7) % 19} personnes
              </span>{" "}
              consultent ceci
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FormationDetailClient({
  formation: f,
  related,
  waNumber,
}: {
  formation: Formation;
  related: Formation[];
  waNumber?: string;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("programme");
  const [inscOpen, setInscOpen] = useState(false);
  const ModeIcon = MODE_ICONS[f.mode];

  return (
    <>
      {/* Hero */}
      <div className="bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/25 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,168,76,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.8) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <Container className="relative z-10 py-10 lg:py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-body text-[11px] text-white/35 mb-5">
            <Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/formations" className="hover:text-white/60 transition-colors">Formations</Link>
            <span>/</span>
            <span className="text-white/60 truncate max-w-[160px]">{f.titreFr}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            {/* Left: hero content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="font-body text-[10px] font-bold text-brand-dark bg-brand-gold px-2.5 py-1 rounded-full uppercase tracking-wide">
                  {f.category}
                </span>
                <span className="flex items-center gap-1 font-body text-[10px] font-semibold text-white bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                  <ModeIcon className="w-3 h-3" />
                  {MODE_LABELS[f.mode]}
                </span>
                {f.placesDispo <= 5 && (
                  <span className="font-body text-[10px] font-bold text-white bg-red-500/80 px-2.5 py-1 rounded-full">
                    {f.placesDispo} places restantes
                  </span>
                )}
              </div>

              <h1
                className="font-display font-bold text-white leading-tight mb-4"
                style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}
              >
                {f.titreFr}
              </h1>
              <p className="font-body text-white/60 text-sm leading-relaxed max-w-xl mb-6">{f.shortDesc}</p>

              <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-6">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-brand-gold fill-brand-gold" />
                  <span className="font-body text-sm font-semibold text-white">{f.rating}</span>
                  <span className="font-body text-[11px] text-white/40">({f.ratingCount} avis)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-white/40" />
                  <span className="font-body text-[11px] text-white/60">{f.studentsCount} étudiants</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-white/40" />
                  <span className="font-body text-[11px] text-white/60">{f.duree} · {f.dureeHeures}h</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-white/40" />
                  <span className="font-body text-[11px] text-white/60">{f.niveau}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${f.formateurGradient} flex items-center justify-center shrink-0 overflow-hidden`}
                >
                  <span className="font-display text-xs font-bold text-white/80">{f.formateurInitials}</span>
                </div>
                <div>
                  <div className="font-body text-[11px] text-white/40 uppercase tracking-wide">Formateur</div>
                  <div className="font-body text-sm font-semibold text-white">{f.formateur}</div>
                </div>
              </div>
            </div>

            {/* Right: enrollment card (desktop) */}
            <div className="hidden lg:block w-80 shrink-0">
              <EnrollCard formation={f} waNumber={waNumber} onOpenModal={() => setInscOpen(true)} />
            </div>
          </div>
        </Container>
      </div>

      {/* Main body — pb-28 on mobile to clear the fixed CTA bar */}
      <div className="bg-brand-cream py-10 lg:py-12 pb-28 lg:pb-12">
        <Container>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            {/* Left: tabs */}
            <div className="flex-1 min-w-0">
              {/* Tabs — horizontal scroll on mobile */}
              <div className="flex items-center bg-white rounded-xl p-1 mb-8 overflow-x-auto no-scrollbar">
                {TABS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center gap-2 flex-1 justify-center py-2.5 px-3 rounded-lg font-body text-[12px] font-semibold whitespace-nowrap transition-all duration-200 min-h-[40px] ${
                      activeTab === id
                        ? "bg-brand-blue text-white shadow-blue"
                        : "text-text-secondary hover:text-brand-blue"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    {label}
                  </button>
                ))}
              </div>

              {/* About strip */}
              <div className="bg-white rounded-xl p-5 sm:p-6 mb-6 border border-gray-100">
                <h2 className="font-display text-xl font-semibold text-brand-blue mb-3">
                  À propos de la formation
                </h2>
                {f.descriptionFr.split("\n\n").map((para, i) => (
                  <p key={i} className="font-body text-sm text-text-secondary leading-relaxed mb-3 last:mb-0">
                    {para}
                  </p>
                ))}
              </div>

              {/* Tab panels */}
              {activeTab === "programme" && (
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <div className="px-5 sm:px-6 py-4 border-b border-gray-100">
                    <h3 className="font-display text-lg font-semibold text-brand-blue">
                      Programme ({f.programmeFr.length} modules)
                    </h3>
                  </div>
                  <div className="px-5 sm:px-6">
                    {f.programmeFr.map((module, i) => (
                      <AccordionItem key={i} title={`Module ${i + 1} — ${module.titre}`} index={i}>
                        <p className="font-body text-sm text-text-secondary leading-relaxed">{module.brief}</p>
                      </AccordionItem>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "objectifs" && (
                <div className="space-y-4">
                  <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6">
                    <h3 className="font-display text-lg font-semibold text-brand-blue mb-5">Objectifs pédagogiques</h3>
                    <ul className="space-y-3">
                      {f.objectifsFr.map((obj, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-brand-gold fill-brand-gold/20 shrink-0 mt-0.5" />
                          <span className="font-body text-sm text-text-secondary leading-relaxed">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {f.prerequis && (
                    <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6">
                      <h3 className="font-display text-lg font-semibold text-brand-blue mb-3">Prérequis</h3>
                      <p className="font-body text-sm text-text-secondary leading-relaxed">{f.prerequis}</p>
                    </div>
                  )}
                  <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6">
                    <h3 className="font-display text-lg font-semibold text-brand-blue mb-3">Certification</h3>
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                      <p className="font-body text-sm text-text-secondary leading-relaxed">{f.certification}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "formateur" && (
                <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6">
                  <div className="flex items-start gap-5 mb-6">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${f.formateurGradient} flex items-center justify-center shrink-0`}
                    >
                      <span className="font-display text-xl font-bold text-white/80">{f.formateurInitials}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-brand-blue">{f.formateur}</h3>
                      <p className="font-body text-sm text-text-muted">{f.formateurSpecialite}</p>
                      <p className="font-body text-xs text-brand-gold mt-1">{f.formateurExperience}</p>
                    </div>
                  </div>
                  <p className="font-body text-sm text-text-secondary leading-relaxed">{f.formateurBio}</p>
                </div>
              )}

              {activeTab === "faq" && (
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <div className="px-5 sm:px-6 py-4 border-b border-gray-100">
                    <h3 className="font-display text-lg font-semibold text-brand-blue">Questions fréquentes</h3>
                  </div>
                  <div className="px-5 sm:px-6">
                    {f.faqFr.map((item, i) => (
                      <FaqItem key={i} q={item.q} a={item.a} index={i} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: sticky enrollment card (desktop only) */}
            <div className="hidden lg:block w-80 shrink-0">
              <div className="sticky top-24">
                <EnrollCard formation={f} waNumber={waNumber} onOpenModal={() => setInscOpen(true)} />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Related formations */}
      {related.length > 0 && (
        <section className="py-12 sm:py-16 bg-white">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-brand-blue">
                Formations similaires
              </h2>
              <Link
                href="/formations"
                className="flex items-center gap-1.5 font-body text-[12px] font-semibold text-brand-blue hover:text-brand-gold transition-colors"
              >
                Voir tout <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {related.map((r) => (
                <FormationCard key={r.slug} formation={r} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-12 sm:py-16 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/25 to-transparent" />
        <Container className="relative z-10 text-center">
          <div className="max-w-lg mx-auto">
            <span className="font-body text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-4 block">
              Prêt à commencer ?
            </span>
            <h2
              className="font-display font-bold text-white mb-4"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)" }}
            >
              Rejoignez la prochaine session
            </h2>
            <p className="font-body text-white/50 text-sm leading-relaxed mb-8">
              Places limitées. La prochaine session commence le {f.nextSession}. Inscrivez-vous maintenant
              pour garantir votre place.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setInscOpen(true)}
                className="flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-dark font-body text-sm font-semibold px-8 py-4 rounded-sm transition-all duration-300 w-full sm:w-auto justify-center"
              >
                S&apos;inscrire maintenant
                <ArrowUpRight className="w-4 h-4" />
              </button>
              {waNumber && (
                <a
                  href={`tel:+${waNumber}`}
                  className="flex items-center gap-2 text-white/70 hover:text-white font-body text-sm font-semibold border border-white/20 hover:border-white/40 px-8 py-4 rounded-sm transition-all duration-300 w-full sm:w-auto justify-center"
                >
                  <Phone className="w-4 h-4" />
                  Nous appeler
                </a>
              )}
            </div>
          </div>
        </Container>
      </section>

      <InscriptionModal
        open={inscOpen}
        onClose={() => setInscOpen(false)}
        formationId={f.id}
        formationTitre={f.titreFr}
        formationSlug={f.slug}
      />

      {/* Fixed mobile bottom CTA bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3 px-4 py-3 max-w-screen-sm mx-auto">
          <div className="shrink-0">
            <div className="font-body text-[10px] text-text-muted uppercase tracking-wide leading-none mb-0.5">Prix</div>
            <div className="font-display text-lg font-bold text-brand-gold leading-none">
              {f.prixPromo ? `${f.prixPromo.toLocaleString("fr-MA")} DH` : f.priceDisplay}
            </div>
          </div>
          <button
            onClick={() => setInscOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-brand-blue text-white font-body text-sm font-semibold py-3 rounded-sm min-h-[44px]"
          >
            S&apos;inscrire
            <ArrowUpRight className="w-4 h-4" />
          </button>
          {waNumber && (
            <a
              href={`tel:+${waNumber}`}
              aria-label="Appeler"
              className="shrink-0 w-11 h-11 flex items-center justify-center border border-gray-200 rounded-sm text-text-secondary hover:border-brand-blue hover:text-brand-blue transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </>
  );
}
