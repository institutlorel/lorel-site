"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import Link from "next/link";
import { MapPin, Award, Target, Heart } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { CentersSection } from "@/components/home/CentersSection";

// Inline animated counter (client component context)
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const steps = 50;
    const timer = setInterval(() => {
      frame++;
      setCount(Math.min(Math.round((frame / steps) * target), target));
      if (frame >= steps) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref} className="font-display text-4xl sm:text-5xl font-bold text-white">
      {count.toLocaleString("fr-MA")}
      {suffix}
    </div>
  );
}

const TIMELINE = [
  {
    year: "2015",
    event: "Fondation à Marrakech — lancement de la première filière Beauté",
  },
  {
    year: "2017",
    event: "Ouverture du centre de Casablanca",
  },
  {
    year: "2019",
    event: "Accréditation OFPPT — 200+ diplômés",
  },
  {
    year: "2021",
    event: "Lancement de la plateforme e-learning",
  },
  {
    year: "2023",
    event: "500ème diplômé — partenariat européen LOREL PRO",
  },
  {
    year: "2025",
    event: "LOREL LAUNCH — programme d&apos;incubation",
  },
];

const TEAM_PREVIEW = [
  {
    slug: "youssef-kabbaj",
    nomComplet: "Youssef Kabbaj",
    specialite: "Photographie & Arts Visuels",
    photo: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400",
    initials: "YK",
  },
  {
    slug: "sara-benali",
    nomComplet: "Sara Benali",
    specialite: "Marketing Digital & Réseaux Sociaux",
    photo: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    initials: "SB",
  },
  {
    slug: "amina-tazi",
    nomComplet: "Amina Tazi",
    specialite: "Esthétique & Soins du Visage",
    photo: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400",
    initials: "AT",
  },
  {
    slug: "hassan-idrissi",
    nomComplet: "Hassan Idrissi",
    specialite: "Comptabilité & Gestion PME",
    photo: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
    initials: "HI",
  },
];

export default function AboutPage() {
  const [waPrincipal, setWaPrincipal] = useState("");

  useEffect(() => {
    fetch("https://app.institutlorel.com/api/public/site-settings")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data?.whatsapp?.principal) setWaPrincipal(data.whatsapp.principal); })
      .catch(() => {});
  }, []);

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
        <Container className="relative z-10 py-16 lg:py-24">
          <div className="flex items-center gap-2 font-body text-[11px] text-white/35 mb-6">
            <Link href="/" className="hover:text-white/60 transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <span className="text-white/60">À propos</span>
          </div>
          <p className="font-body text-label-caps text-brand-gold mb-3">À PROPOS</p>
          <h1
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            À propos de l&apos;Institut Lorel
          </h1>
          <p className="font-body text-white/60 text-base max-w-xl">
            Depuis 2015, nous formons les talents de demain au Maroc et en Afrique.
          </p>
        </Container>
      </div>

      {/* Story Section */}
      <section className="bg-white py-20">
        <Container>
          <div className="lg:grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-label-caps text-brand-gold mb-3">NOTRE HISTOIRE</p>
              <h2
                className="font-display font-bold text-brand-dark mb-6"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
              >
                15 ans de passion pour la formation.
              </h2>
              <div className="space-y-4">
                <p className="font-body text-base text-text-secondary leading-relaxed">
                  Fondé en 2015 à Marrakech par une équipe de passionnés de pédagogie, Institut Lorel
                  est né d&apos;une conviction simple : chaque individu mérite d&apos;accéder à une
                  formation professionnelle de qualité, quel que soit son parcours initial.
                </p>
                <p className="font-body text-base text-text-secondary leading-relaxed">
                  En 2017, l&apos;ouverture de notre centre de Casablanca marque notre ambition
                  nationale. Avec deux pôles d&apos;excellence, nous répondons aux besoins d&apos;un
                  Maroc en pleine transformation économique, formant des professionnels opérationnels
                  dans les secteurs les plus porteurs.
                </p>
                <p className="font-body text-base text-text-secondary leading-relaxed">
                  Aujourd&apos;hui, avec le programme LOREL PRO, nous visons l&apos;Afrique. Nos
                  certifications homologuées en France ouvrent des horizons nouveaux à nos diplômés
                  africains, positionnant Institut Lorel comme la référence continentale en formation
                  professionnelle certifiée.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 relative">
              <div className="relative rounded-2xl overflow-hidden h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-brand-dark" />
                <img
                  src="https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Institut Lorel — ambiance formation"
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />
              </div>
              {/* Floating stat badge */}
              <div className="absolute -bottom-5 -left-5 bg-brand-gold text-brand-dark rounded-xl p-4 shadow-gold">
                <p className="font-display font-bold text-2xl">500+</p>
                <p className="font-body text-xs font-semibold">Diplômés</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-brand-cream py-16">
        <Container>
          <div className="text-center mb-10">
            <p className="font-body text-label-caps text-brand-gold mb-2">NOS ENGAGEMENTS</p>
            <h2
              className="font-display font-bold text-brand-dark"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              Mission, Vision &amp; Valeurs
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                titre: "Mission",
                texte:
                  "Former pour transformer. Chaque diplômé qui réussit est notre plus grande fierté.",
                accent: "#C9A84C",
              },
              {
                icon: Award,
                titre: "Vision",
                texte:
                  "Devenir la référence en formation professionnelle certifiée en Afrique du Nord.",
                accent: "#1B3A5C",
              },
              {
                icon: Heart,
                titre: "Valeurs",
                texte:
                  "Excellence, bienveillance, impact. Nous plaçons l&apos;humain au centre de chaque formation.",
                accent: "#4CAF9D",
              },
            ].map(({ icon: Icon, titre, texte, accent }) => (
              <div key={titre} className="bg-white rounded-2xl p-7 shadow-card">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: accent + "20" }}
                >
                  <Icon className="w-6 h-6" style={{ color: accent }} />
                </div>
                <h3 className="font-display font-bold text-brand-dark text-xl mb-3">{titre}</h3>
                <p className="font-body text-sm text-text-secondary leading-relaxed">{texte}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Animated Stats */}
      <section className="bg-brand-dark py-16">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-white/10">
            {[
              { target: 500, suffix: "+", label: "Diplômés" },
              { target: 15, suffix: "+", label: "Formations" },
              { target: 95, suffix: "%", label: "Satisfaction" },
              { target: 2, suffix: "", label: "Centres" },
            ].map(({ target, suffix, label }) => (
              <div key={label} className="text-center px-4 lg:px-8">
                <AnimatedCounter target={target} suffix={suffix} />
                <p className="font-body text-white/50 text-sm mt-2">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="bg-white py-16">
        <Container>
          <div className="text-center mb-12">
            <p className="font-body text-label-caps text-brand-gold mb-2">NOTRE PARCOURS</p>
            <h2
              className="font-display font-bold text-brand-dark"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              10 ans de jalons
            </h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="relative border-l-2 border-brand-gold/30 pl-8 space-y-8">
              {TIMELINE.map(({ year, event }) => (
                <div key={year} className="relative">
                  {/* Gold dot */}
                  <div className="absolute -left-[2.65rem] top-1 w-5 h-5 rounded-full bg-brand-gold border-4 border-white" />
                  <p
                    className="font-display font-bold text-brand-gold mb-1"
                    style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
                  >
                    {year}
                  </p>
                  <p className="font-body text-sm text-text-secondary leading-relaxed">{event}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Team Preview */}
      <section className="bg-brand-cream py-16">
        <Container>
          <div className="text-center mb-10">
            <p className="font-body text-label-caps text-brand-gold mb-2">L&apos;ÉQUIPE</p>
            <h2
              className="font-display font-bold text-brand-dark"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              Notre équipe de formateurs
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {TEAM_PREVIEW.map((f) => (
              <Link
                key={f.slug}
                href={`/formateurs/${f.slug}`}
                className="group text-center"
              >
                <div className="relative w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden ring-2 ring-white group-hover:ring-brand-gold transition-all">
                  <div className="absolute inset-0 bg-brand-blue" />
                  <img
                    src={f.photo}
                    alt={f.nomComplet}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <p className="font-display font-bold text-brand-dark text-sm">{f.nomComplet}</p>
                <p className="font-body text-xs text-brand-gold mt-0.5">{f.specialite}</p>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/formateurs"
              className="inline-flex items-center gap-2 font-body font-semibold text-sm text-brand-blue border border-brand-blue hover:bg-brand-blue hover:text-white px-6 py-3 rounded-sm transition-colors"
            >
              Voir tous nos formateurs
              <MapPin className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Centers Section (imported component) */}
      <CentersSection />

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <Container className="relative z-10 text-center">
          <p className="font-body text-label-caps text-brand-gold mb-4">REJOIGNEZ-NOUS</p>
          <h2
            className="font-display font-bold text-white mb-5"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            Prêt à transformer votre carrière ?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {waPrincipal && (
              <a
                href={`https://wa.me/${waPrincipal}`}
                target="_blank"
                rel="noopener noreferrer"
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
