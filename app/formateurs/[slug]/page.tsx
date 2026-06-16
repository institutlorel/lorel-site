import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, BookOpen, Users, Award } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { FORMATEURS, getFormateurBySlug } from "@/lib/data/formateurs";
import { getSiteSettings } from "@/lib/data/platform-api";

export function generateStaticParams() {
  return FORMATEURS.map((f) => ({ slug: f.slug }));
}

export default async function FormateurPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const formateur = getFormateurBySlug(slug);
  if (!formateur) notFound();
  const { principal } = await getSiteSettings();

  return (
    <>
      <SiteHeader />

      {/* Hero — full photo background */}
      <div className="relative min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-brand-dark" />
        <img
          src={formateur.photo}
          alt={formateur.nomComplet}
          className="absolute inset-0 w-full h-full object-cover object-top opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-brand-dark/20" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/25 to-transparent" />

        <Container className="relative z-10 py-16 lg:py-20 w-full">
          <div className="flex items-center gap-2 font-body text-[11px] text-white/35 mb-6">
            <Link href="/" className="hover:text-white/60 transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/formateurs" className="hover:text-white/60 transition-colors">
              Formateurs
            </Link>
            <span>/</span>
            <span className="text-white/60">{formateur.nomComplet}</span>
          </div>

          {/* Initials badge */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-bold text-xl text-white mb-4 shadow-gold"
            style={{ backgroundColor: formateur.accent }}
          >
            {formateur.initials}
          </div>

          <h1
            className="font-display font-bold text-white mb-2"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {formateur.nomComplet}
          </h1>
          <p className="font-body text-brand-gold font-medium mb-3">{formateur.specialite}</p>
          <span className="inline-block font-body text-[10px] font-bold uppercase tracking-widest bg-white/15 backdrop-blur-sm border border-white/25 text-white px-3 py-1 rounded-sm">
            {formateur.domaine}
          </span>
        </Container>
      </div>

      {/* Body */}
      <div className="bg-brand-cream py-12 lg:py-16">
        <Container>
          <div className="lg:grid lg:grid-cols-12 gap-10">
            {/* LEFT */}
            <div className="lg:col-span-7 space-y-8">
              {/* Bio */}
              <div>
                <h2 className="font-display font-bold text-brand-dark text-2xl mb-4">
                  À propos
                </h2>
                {formateur.bio.map((para, i) => (
                  <p key={i} className="font-body text-base text-text-secondary leading-relaxed mb-4 last:mb-0">
                    {para}
                  </p>
                ))}
              </div>

              {/* Certifications */}
              {formateur.certifications.length > 0 && (
                <div>
                  <h2 className="font-display font-bold text-brand-dark text-xl mb-4">
                    Certifications
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {formateur.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="font-body text-xs font-semibold border rounded-sm px-3 py-1.5"
                        style={{
                          color: formateur.accent,
                          borderColor: formateur.accent + "40",
                          backgroundColor: formateur.accent + "10",
                        }}
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Formations animées */}
              {formateur.formations.length > 0 && (
                <div>
                  <h2 className="font-display font-bold text-brand-dark text-xl mb-4">
                    Formations animées
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {formateur.formations.map((fSlug) => (
                      <Link
                        key={fSlug}
                        href={`/formations/${fSlug}`}
                        className="font-body text-xs font-semibold bg-white border border-gray-200 hover:border-brand-blue hover:text-brand-blue text-text-secondary px-3 py-1.5 rounded-sm transition-colors"
                      >
                        {fSlug.replace(/-/g, " ")}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT — Stats card */}
            <div className="lg:col-span-5 mt-10 lg:mt-0">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-card p-6">
                  <h3 className="font-display font-bold text-brand-dark text-lg mb-5">
                    En chiffres
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-brand-cream rounded-xl p-4 text-center">
                      <div className="flex justify-center mb-2">
                        <Award className="w-5 h-5 text-brand-gold" />
                      </div>
                      <p className="font-display font-bold text-brand-dark text-2xl">
                        {formateur.experience}
                      </p>
                      <p className="font-body text-[11px] text-text-muted mt-0.5">
                        ans d&apos;expérience
                      </p>
                    </div>
                    <div className="bg-brand-cream rounded-xl p-4 text-center">
                      <div className="flex justify-center mb-2">
                        <BookOpen className="w-5 h-5 text-brand-gold" />
                      </div>
                      <p className="font-display font-bold text-brand-dark text-2xl">
                        {formateur.formationsCount}
                      </p>
                      <p className="font-body text-[11px] text-text-muted mt-0.5">formations</p>
                    </div>
                    <div className="bg-brand-cream rounded-xl p-4 text-center">
                      <div className="flex justify-center mb-2">
                        <Users className="w-5 h-5 text-brand-gold" />
                      </div>
                      <p className="font-display font-bold text-brand-dark text-2xl">
                        {formateur.etudiantsCount}
                      </p>
                      <p className="font-body text-[11px] text-text-muted mt-0.5">étudiants</p>
                    </div>
                    <div className="bg-brand-cream rounded-xl p-4 text-center">
                      <div className="flex justify-center mb-2">
                        <Star className="w-5 h-5 text-brand-gold fill-brand-gold" />
                      </div>
                      <p className="font-display font-bold text-brand-dark text-2xl">
                        {formateur.rating}
                      </p>
                      <p className="font-body text-[11px] text-text-muted mt-0.5">note /5</p>
                    </div>
                  </div>

                  <a
                    href={
                      formateur.linkedinUrl ||
                      (principal
                        ? `https://wa.me/${principal}?text=Bonjour%2C+je+souhaite+contacter+${encodeURIComponent(formateur.nomComplet)}`
                        : "/contact")
                    }
                    target={formateur.linkedinUrl || principal ? "_blank" : undefined}
                    rel={formateur.linkedinUrl || principal ? "noopener noreferrer" : undefined}
                    className="flex items-center justify-center gap-2 w-full font-body font-bold text-sm py-3 rounded-sm transition-colors text-white"
                    style={{ backgroundColor: formateur.accent }}
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Contacter ce formateur
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

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
