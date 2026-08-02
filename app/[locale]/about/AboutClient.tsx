"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { LocaleLink as Link } from "@/components/LocaleLink";
import { MapPin, Award, Target, Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CentersSection } from "@/components/home/CentersSection";
import type { Dictionary } from "@/lib/i18n/dictionaries";

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

const TEAM_PREVIEW = [
  { slug: "youssef-kabbaj", nomComplet: "Youssef Kabbaj", specialite: "Photographie & Arts Visuels", photo: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400", initials: "YK" },
  { slug: "sara-benali", nomComplet: "Sara Benali", specialite: "Marketing Digital & Réseaux Sociaux", photo: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400", initials: "SB" },
  { slug: "amina-tazi", nomComplet: "Amina Tazi", specialite: "Esthétique & Soins du Visage", photo: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400", initials: "AT" },
  { slug: "hassan-idrissi", nomComplet: "Hassan Idrissi", specialite: "Comptabilité & Gestion PME", photo: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400", initials: "HI" },
];

interface Props {
  waNumber: string;
  dict: Dictionary;
}

export function AboutClient({ waNumber, dict }: Props) {
  return (
    <>
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
            <Link href="/" className="hover:text-white/60 transition-colors">{dict.common.accueil}</Link>
            <span>/</span>
            <span className="text-white/60">{dict.nav.about}</span>
          </div>
          <p className="font-body text-label-caps text-brand-gold mb-3">{dict.aboutPage.hero.badge}</p>
          <h1 className="font-display font-bold text-white mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
            {dict.aboutPage.hero.titre}
          </h1>
          <p className="font-body text-white/60 text-base max-w-xl">
            {dict.aboutPage.hero.sousTitre}
          </p>
        </Container>
      </div>

      {/* Story */}
      <section className="bg-white py-20">
        <Container>
          <div className="lg:grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-label-caps text-brand-gold mb-3">{dict.aboutPage.story.badge}</p>
              <h2 className="font-display font-bold text-brand-dark mb-6" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
                {dict.aboutPage.story.titre}
              </h2>
              <div className="space-y-4">
                <p className="font-body text-base text-text-secondary leading-relaxed">
                  {dict.aboutPage.story.paragraphe1}
                </p>
                <p className="font-body text-base text-text-secondary leading-relaxed">
                  {dict.aboutPage.story.paragraphe2}
                </p>
                <p className="font-body text-base text-text-secondary leading-relaxed">
                  {dict.aboutPage.story.paragraphe3}
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
              <div className="absolute -bottom-5 -left-5 bg-brand-gold text-brand-dark rounded-xl p-4 shadow-gold">
                <p className="font-display font-bold text-2xl">500+</p>
                <p className="font-body text-xs font-semibold">{dict.hero.stats.diplomes}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-brand-cream py-16">
        <Container>
          <div className="text-center mb-10">
            <p className="font-body text-label-caps text-brand-gold mb-2">{dict.aboutPage.engagements.badge}</p>
            <h2 className="font-display font-bold text-brand-dark" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
              {dict.aboutPage.engagements.titre}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Target, ...dict.aboutPage.engagements.items.mission, accent: "#C9A84C" },
              { icon: Award, ...dict.aboutPage.engagements.items.vision, accent: "#1B3A5C" },
              { icon: Heart, ...dict.aboutPage.engagements.items.valeurs, accent: "#4CAF9D" },
            ].map(({ icon: Icon, titre, texte, accent }) => (
              <div key={titre} className="bg-white rounded-2xl p-7 shadow-card">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: accent + "20" }}>
                  <Icon className="w-6 h-6" style={{ color: accent }} />
                </div>
                <h3 className="font-display font-bold text-brand-dark text-xl mb-3">{titre}</h3>
                <p className="font-body text-sm text-text-secondary leading-relaxed">{texte}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-brand-dark py-16">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-white/10">
            {[
              { target: 500, suffix: "+", label: dict.hero.stats.diplomes },
              { target: 15, suffix: "+", label: dict.hero.stats.formations },
              { target: 95, suffix: "%", label: dict.hero.stats.satisfaction },
              { target: 2, suffix: "", label: dict.aboutPage.stats.centres },
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
            <p className="font-body text-label-caps text-brand-gold mb-2">{dict.aboutPage.timeline.badge}</p>
            <h2 className="font-display font-bold text-brand-dark" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
              {dict.aboutPage.timeline.titre}
            </h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="relative border-l-2 border-brand-gold/30 pl-8 space-y-8">
              {dict.aboutPage.timeline.evenements.map(({ annee, texte }) => (
                <div key={annee} className="relative">
                  <div className="absolute -left-[2.65rem] top-1 w-5 h-5 rounded-full bg-brand-gold border-4 border-white" />
                  <p className="font-display font-bold text-brand-gold mb-1" style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}>{annee}</p>
                  <p className="font-body text-sm text-text-secondary leading-relaxed">{texte}</p>
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
            <p className="font-body text-label-caps text-brand-gold mb-2">{dict.aboutPage.equipe.badge}</p>
            <h2 className="font-display font-bold text-brand-dark" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
              {dict.aboutPage.equipe.titre}
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {TEAM_PREVIEW.map((f) => (
              <Link key={f.slug} href={`/formateurs/${f.slug}`} className="group text-center">
                <div className="relative w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden ring-2 ring-white group-hover:ring-brand-gold transition-all">
                  <div className="absolute inset-0 bg-brand-blue" />
                  <img src={f.photo} alt={f.nomComplet} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <p className="font-display font-bold text-brand-dark text-sm">{f.nomComplet}</p>
                <p className="font-body text-xs text-brand-gold mt-0.5">{f.specialite}</p>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/formateurs" className="inline-flex items-center gap-2 font-body font-semibold text-sm text-brand-blue border border-brand-blue hover:bg-brand-blue hover:text-white px-6 py-3 rounded-sm transition-colors">
              {dict.aboutPage.equipe.cta}
              <MapPin className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Container>
      </section>

      <CentersSection dict={dict} />

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <Container className="relative z-10 text-center">
          <p className="font-body text-label-caps text-brand-gold mb-4">{dict.aboutPage.cta.badge}</p>
          <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
            {dict.aboutPage.cta.titre}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {waNumber && (
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-dark font-body font-bold text-sm px-8 py-3.5 rounded-sm transition-colors"
              >
                {dict.aboutPage.cta.whatsapp}
              </a>
            )}
            <Link href="/contact" className="inline-flex items-center justify-center border border-white/30 hover:border-white/60 text-white font-body font-semibold text-sm px-8 py-3.5 rounded-sm transition-colors">
              {dict.common.formulaireContact}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
