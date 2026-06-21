import type { Metadata } from "next";
import { getPageSeo } from "@/lib/data/platform-api";
import { buildMetadata, resolvePageMeta } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo();
  const m = resolvePageMeta(seo, "formateurs");
  return buildMetadata({ ...m, path: "/formateurs" });
}

import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { FORMATEURS } from "@/lib/data/formateurs";
import { getSiteSettings } from "@/lib/data/platform-api";

export default async function FormateursPage() {
  const { principal } = await getSiteSettings();
  return (
    <>
      <SiteHeader />

      {/* Hero */}
      <div className="bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/25 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,168,76,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.8) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <Container className="relative z-10 py-16 lg:py-20">
          <div className="flex items-center gap-2 font-body text-[11px] text-white/35 mb-6">
            <Link href="/" className="hover:text-white/60 transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <span className="text-white/60">Formateurs</span>
          </div>
          <p className="font-body text-label-caps text-brand-gold mb-3">L&apos;ÉQUIPE</p>
          <h1
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Notre équipe de formateurs
          </h1>
          <p className="font-body text-white/60 text-base max-w-xl">
            Des experts praticiens qui transmettent leur savoir-faire du terrain. Chaque formateur
            est sélectionné pour son expertise professionnelle, pas seulement académique.
          </p>
        </Container>
      </div>

      {/* Formateurs Grid */}
      <section className="bg-brand-cream py-16">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FORMATEURS.map((formateur) => (
              <Link
                key={formateur.slug}
                href={`/formateurs/${formateur.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                {/* Photo */}
                <div className="relative h-56 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${formateur.gradient}`}
                  />
                  <img
                    src={formateur.photo}
                    alt={formateur.nomComplet}
                    className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  {/* Domain badge */}
                  <div className="absolute top-3 left-3">
                    <span className="font-body text-[10px] font-bold uppercase tracking-widest bg-white/15 backdrop-blur-sm border border-white/25 text-white px-2.5 py-1 rounded-sm">
                      {formateur.domaine}
                    </span>
                  </div>
                  {/* Initials fallback */}
                  <div
                    className="absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center font-body font-bold text-sm text-white"
                    style={{ backgroundColor: formateur.accent }}
                  >
                    {formateur.initials}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display font-bold text-brand-dark text-lg leading-tight">
                      {formateur.nomComplet}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-text-muted shrink-0 mt-1 group-hover:text-brand-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <p className="font-body text-sm font-medium mb-4" style={{ color: formateur.accent }}>
                    {formateur.specialite}
                  </p>

                  {/* Stats row */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="text-center">
                      <p className="font-display font-bold text-brand-dark text-sm">
                        {formateur.experience} ans
                      </p>
                      <p className="font-body text-[10px] text-text-muted">Expérience</p>
                    </div>
                    <div className="w-px h-8 bg-gray-100" />
                    <div className="text-center">
                      <p className="font-display font-bold text-brand-dark text-sm">
                        {formateur.etudiantsCount}
                      </p>
                      <p className="font-body text-[10px] text-text-muted">Étudiants</p>
                    </div>
                    <div className="w-px h-8 bg-gray-100" />
                    <div className="text-center flex items-center gap-1">
                      <Star className="w-3 h-3 text-brand-gold fill-brand-gold" />
                      <p className="font-display font-bold text-brand-dark text-sm">
                        {formateur.rating}/5
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <Container className="relative z-10 text-center">
          <p className="font-body text-label-caps text-brand-gold mb-4">COMMENCEZ MAINTENANT</p>
          <h2
            className="font-display font-bold text-white mb-5"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            Prêt à transformer votre carrière ?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {principal && (
              <a
                href={`https://wa.me/${principal}`}
                className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-dark font-body font-bold text-sm px-8 py-3.5 rounded-sm transition-colors"
              >
                WhatsApp — Réponse immédiate
              </a>
            )}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-white/30 hover:border-white/60 text-white font-body font-semibold text-sm px-8 py-3.5 rounded-sm transition-colors"
            >
              Formulaire de contact
            </Link>
          </div>
        </Container>
      </section>

      <SiteFooter />
    </>
  );
}
