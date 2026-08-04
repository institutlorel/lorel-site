import type { Metadata } from "next";
import { getPageSeo } from "@/lib/data/platform-api";
import { buildMetadata, resolvePageMeta } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params; // locale threaded through for future use (I2+); not consumed yet
  const seo = await getPageSeo();
  const m = resolvePageMeta(seo, "services");
  return buildMetadata({ ...m, path: "/services" });
}

import { LocaleLink as Link } from "@/components/LocaleLink";
import {
  Award,
  Briefcase,
  Target,
  BadgeCheck,
  BookOpen,
  ArrowUpRight,
  Star,
  CheckCircle,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { SERVICES } from "@/lib/data/services";
import { getSiteSettings } from "@/lib/data/platform-api";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Langue } from "@/lib/i18n/config";

const ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  Award,
  Briefcase,
  Target,
  BadgeCheck,
  BookOpen,
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Langue);
  const { principal } = await getSiteSettings();
  return (
    <>
      <SiteHeader dict={dict} />

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
              {dict.common.accueil}
            </Link>
            <span>/</span>
            <span className="text-white/60">{dict.nav.services}</span>
          </div>
          <p className="font-body text-label-caps text-brand-gold mb-3">{dict.servicesPage.hero.badge}</p>
          <h1
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            {dict.servicesPage.hero.titreLigne1}
            <br />
            {dict.servicesPage.hero.titreLigne2}
          </h1>
          <p className="font-body text-white/60 text-base max-w-xl">
            {dict.servicesPage.hero.sousTitre}
          </p>
        </Container>
      </div>

      {/* Services Grid */}
      <section className="bg-brand-cream py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => {
              const Icon = ICON_MAP[service.iconName] ?? Award;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`} />
                    <img
                      src={service.image}
                      alt={service.titre}
                      className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    {/* Type badge */}
                    <div className="absolute top-3 start-3 flex items-center gap-2">
                      <span className="font-body text-[10px] font-bold uppercase tracking-widest bg-white/15 backdrop-blur-sm border border-white/25 text-white px-2.5 py-1 rounded-sm">
                        {service.type}
                      </span>
                      {service.slug === "vae" && (
                        <span className="font-body text-[10px] font-bold uppercase tracking-widest bg-brand-gold text-brand-dark px-2.5 py-1 rounded-sm">
                          {dict.servicesPage.servicePhare}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: service.accent + "20" }}
                        >
                          <Icon className="w-4 h-4" style={{ color: service.accent }} />
                        </div>
                        <h3 className="font-display font-bold text-text-primary text-[1.05rem] leading-tight">
                          {service.titreCourt}
                        </h3>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-text-muted shrink-0 mt-0.5 group-hover:text-brand-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="font-body text-sm text-text-secondary leading-relaxed mb-4">
                      {service.shortDesc}
                    </p>
                    {service.prix && (
                      <div className="pt-3 border-t border-gray-100">
                        <span className="font-body text-[11px] text-text-muted uppercase tracking-wider">
                          {dict.common.aPartirDe}
                        </span>
                        <p className="font-display font-bold text-brand-dark text-sm mt-0.5">
                          {service.prix}
                        </p>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Trust Band */}
      <section className="bg-white border-y border-gray-100 py-10">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-gray-100">
            {[
              { icon: Star, ...dict.servicesPage.trust.expertise },
              { icon: CheckCircle, ...dict.servicesPage.trust.accompagnement },
              { icon: Award, ...dict.servicesPage.trust.resultats },
              { icon: BadgeCheck, ...dict.servicesPage.trust.tarifs },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex flex-col items-center text-center px-4 lg:px-6">
                <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-brand-gold" />
                </div>
                <p className="font-body font-semibold text-text-primary text-sm mb-1">{label}</p>
                <p className="font-body text-xs text-text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <Container className="relative z-10 text-center">
          <p className="font-body text-label-caps text-brand-gold mb-4">{dict.servicesPage.cta.badge}</p>
          <h2
            className="font-display font-bold text-white mb-3"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            {dict.servicesPage.cta.titre}
          </h2>
          <p className="font-body text-white/60 text-sm mb-8 max-w-md mx-auto">
            {dict.servicesPage.cta.sousTitre}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {principal && (
              <a
                href={`https://wa.me/${principal}`}
                className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-dark font-body font-bold text-sm px-8 py-3.5 rounded-sm transition-colors"
              >
                {dict.aboutPage.cta.whatsapp}
              </a>
            )}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-white/30 hover:border-white/60 text-white font-body font-semibold text-sm px-8 py-3.5 rounded-sm transition-colors"
            >
              {dict.common.formulaireContact}
            </Link>
          </div>
        </Container>
      </section>

      <SiteFooter dict={dict} />
    </>
  );
}
