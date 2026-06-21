import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { SERVICES, getServiceBySlug, getRelatedServices } from "@/lib/data/services";
import { getSiteSettings } from "@/lib/data/platform-api";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service introuvable" };
  return buildMetadata({
    title: service.titre,
    description: service.shortDesc,
    image: service.image,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedServices(slug);
  const { principal } = await getSiteSettings();

  return (
    <>
      <SiteHeader />

      {/* Hero with photo background */}
      <div className="relative overflow-hidden min-h-[320px] flex items-end">
        <div className="absolute inset-0 bg-brand-dark" />
        <img
          src={service.image}
          alt={service.titre}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/40" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/25 to-transparent" />

        <Container className="relative z-10 py-16 lg:py-20 w-full">
          <div className="flex items-center gap-2 font-body text-[11px] text-white/35 mb-6">
            <Link href="/" className="hover:text-white/60 transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white/60 transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-white/60">{service.titreCourt}</span>
          </div>
          <span className="inline-block font-body text-[10px] font-bold uppercase tracking-widest bg-brand-gold text-brand-dark px-3 py-1 rounded-sm mb-4">
            {service.type}
          </span>
          <h1
            className="font-display font-bold text-white mb-5"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}
          >
            {service.titre}
          </h1>
          <div className="flex flex-wrap gap-3">
            {service.prix && (
              <span className="font-body text-sm text-white/70 border border-white/20 px-4 py-1.5 rounded-sm">
                {service.prix}
              </span>
            )}
            {service.duree && (
              <span className="font-body text-sm text-white/70 border border-white/20 px-4 py-1.5 rounded-sm">
                {service.duree}
              </span>
            )}
          </div>
        </Container>
      </div>

      {/* Main Body */}
      <div className="bg-brand-cream py-12 lg:py-16">
        <Container>
          <div className="lg:grid lg:grid-cols-12 gap-10">
            {/* LEFT */}
            <div className="lg:col-span-7 space-y-10">
              {/* Description */}
              <div>
                {service.description.map((para, i) => (
                  <p key={i} className="font-body text-base text-text-secondary leading-relaxed mb-4 last:mb-0">
                    {para}
                  </p>
                ))}
              </div>

              {/* Avantages */}
              <div>
                <h2 className="font-display font-bold text-brand-dark text-2xl mb-5">
                  Pourquoi choisir ce service ?
                </h2>
                <ul className="space-y-3">
                  {service.avantages.map((av, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                      <span className="font-body text-sm text-text-secondary leading-relaxed">{av}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Processus */}
              <div>
                <h2 className="font-display font-bold text-brand-dark text-2xl mb-6">
                  Notre processus
                </h2>
                <div className="space-y-6">
                  {service.processus.map((step) => (
                    <div key={step.numero} className="flex gap-4">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-body font-bold text-brand-dark text-sm"
                        style={{ backgroundColor: service.accent + "30", border: `2px solid ${service.accent}` }}
                      >
                        {step.numero}
                      </div>
                      <div>
                        <p className="font-body font-semibold text-text-primary text-sm mb-1">{step.titre}</p>
                        <p className="font-body text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — sticky sidebar */}
            <div className="lg:col-span-5 mt-10 lg:mt-0">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                  {/* Thumbnail */}
                  <div className="relative h-40">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`} />
                    <img
                      src={service.image}
                      alt={service.titre}
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                  </div>

                  <div className="p-6">
                    {/* Price / Duration */}
                    {(service.prix || service.duree) && (
                      <div className="flex justify-between mb-5 pb-5 border-b border-gray-100">
                        {service.prix && (
                          <div>
                            <p className="font-body text-[10px] text-text-muted uppercase tracking-wider mb-0.5">
                              Tarif
                            </p>
                            <p className="font-display font-bold text-brand-dark text-sm">{service.prix}</p>
                          </div>
                        )}
                        {service.duree && (
                          <div className="text-right">
                            <p className="font-body text-[10px] text-text-muted uppercase tracking-wider mb-0.5">
                              Durée
                            </p>
                            <p className="font-display font-bold text-brand-dark text-sm">{service.duree}</p>
                          </div>
                        )}
                      </div>
                    )}

                    <h3 className="font-display font-bold text-brand-dark text-xl mb-4">
                      Intéressé ?
                    </h3>

                    <div className="space-y-3">
                      <a
                        href={principal ? `https://wa.me/${principal}` : "/contact"}
                        className="flex items-center justify-center gap-2 w-full bg-brand-blue hover:bg-brand-blue-light text-white font-body font-bold text-sm py-3 rounded-sm transition-colors"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp — Réponse rapide
                      </a>
                      <Link
                        href="/contact"
                        className="flex items-center justify-center w-full border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-body font-semibold text-sm py-3 rounded-sm transition-colors"
                      >
                        Demander un rappel
                      </Link>
                    </div>

                    <p className="font-body text-[11px] text-text-muted text-center mt-3">
                      Consultation gratuite sans engagement
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* FAQ */}
      {service.faq.length > 0 && (
        <section className="bg-white py-14">
          <Container>
            <h2 className="font-display font-bold text-brand-dark text-2xl mb-8">
              Questions fréquentes
            </h2>
            <div className="max-w-2xl divide-y divide-gray-100">
              {service.faq.map((item, i) => (
                <details key={i} className="group">
                  <summary className="font-body text-[13px] font-semibold text-text-primary cursor-pointer py-4 flex items-center justify-between list-none hover:text-brand-blue transition-colors">
                    {item.q}
                    <span className="ml-4 shrink-0 text-text-muted group-open:rotate-180 transition-transform duration-200">
                      ▾
                    </span>
                  </summary>
                  <p className="font-body text-sm text-text-secondary leading-relaxed pb-4">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Related Services */}
      {related.length > 0 && (
        <section className="bg-brand-cream py-14">
          <Container>
            <h2 className="font-display font-bold text-brand-dark text-2xl mb-8">
              Autres services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="group bg-white rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow flex items-start gap-4"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: rel.accent + "20" }}
                  >
                    <span className="font-body text-xs font-bold" style={{ color: rel.accent }}>
                      {rel.type.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-text-primary text-sm mb-1 group-hover:text-brand-blue transition-colors">
                      {rel.titreCourt}
                    </h3>
                    <p className="font-body text-xs text-text-muted leading-relaxed line-clamp-2">
                      {rel.shortDesc}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-text-muted shrink-0 group-hover:text-brand-gold transition-colors" />
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

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
