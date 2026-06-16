"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Briefcase, Users, BadgeCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const SERVICES = [
  {
    slug: "vae",
    icon: Award,
    titre: "VAE — Validation des Acquis",
    shortTitre: "VAE",
    description:
      "Transformez votre expérience professionnelle en diplôme reconnu. Un processus accompagné de A à Z.",
    featured: true,
    badge: "Populaire",
  },
  {
    slug: "formation-entreprises",
    icon: Briefcase,
    titre: "Formation Entreprises",
    shortTitre: "Entreprises",
    description:
      "Programmes sur-mesure pour former vos équipes selon vos objectifs stratégiques et votre secteur.",
    featured: false,
  },
  {
    slug: "accompagnement",
    icon: Users,
    titre: "Accompagnement & Coaching",
    shortTitre: "Coaching",
    description:
      "Coaching professionnel et orientation personnalisée pour clarifier votre projet et accélérer votre réussite.",
    featured: false,
  },
  {
    slug: "certification",
    icon: BadgeCheck,
    titre: "Préparation aux Certifications",
    shortTitre: "Certifications",
    description:
      "Préparez et passez vos certifications professionnelles nationales et internationales avec nos formateurs.",
    featured: false,
  },
];

export function ServicesVAE() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="relative py-24 lg:py-32 bg-brand-dark overflow-hidden grain-bg">
      {/* Texture + glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-dark to-brand-dark" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/25 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/15 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-brand-blue/10 blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            className="font-body text-label-caps text-brand-gold mb-4"
          >
            NOS SERVICES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-white leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Au-delà de la formation.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="font-body text-white/45 text-sm leading-relaxed"
          >
            L&apos;Institut Lorel vous accompagne tout au long de votre parcours professionnel,
            de la formation initiale à la validation de vos acquis.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
              >
                <Link
                  href={`/services/${s.slug}`}
                  className={`group relative flex flex-col h-full p-7 rounded-xl border transition-all duration-300 hover:shadow-gold hover:-translate-y-0.5 ${
                    s.featured
                      ? "bg-white/5 border-brand-gold/35 hover:border-brand-gold"
                      : "bg-white/4 border-white/8 hover:border-brand-gold/30 hover:bg-white/6"
                  }`}
                >
                  {s.featured && s.badge && (
                    <div className="absolute -top-3 left-6">
                      <span className="font-body text-[10px] font-bold text-brand-dark bg-brand-gold px-3 py-1 rounded-full tracking-wide uppercase">
                        {s.badge}
                      </span>
                    </div>
                  )}

                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${
                    s.featured
                      ? "bg-brand-gold/15 border border-brand-gold/30"
                      : "bg-white/6 border border-white/10"
                  }`}>
                    <Icon className={`w-5 h-5 ${s.featured ? "text-brand-gold" : "text-white/60 group-hover:text-brand-gold transition-colors duration-300"}`} />
                  </div>

                  <h3 className="font-display text-lg font-semibold text-white mb-3 leading-snug">
                    {s.titre}
                  </h3>
                  <p className="font-body text-sm text-white/45 leading-relaxed mb-6 flex-1">
                    {s.description}
                  </p>

                  <div className={`flex items-center gap-2 font-body text-[12px] font-semibold transition-colors duration-200 ${
                    s.featured ? "text-brand-gold" : "text-white/40 group-hover:text-brand-gold"
                  }`}>
                    En savoir plus
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
