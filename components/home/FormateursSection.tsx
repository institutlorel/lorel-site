"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SITE_IMAGES } from "@/lib/data/images";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const FORMATEURS = [
  {
    slug: "youssef-kabbaj",
    prenom: "Youssef",
    nom: "Kabbaj",
    specialite: "Photographie & Arts Visuels",
    bio: "Photographe professionnel avec 12 ans d'expérience. Collaborations avec des agences internationales.",
    formations: 3,
    etudiants: 120,
    photo: SITE_IMAGES.formateurs.f1,
    gradient: "from-brand-blue to-brand-dark",
  },
  {
    slug: "sara-benchekroun",
    prenom: "Sara",
    nom: "Benchekroun",
    specialite: "Marketing Digital",
    bio: "Directrice marketing dans une agence digitale casablancaise. Experte Meta Ads et stratégie de contenu.",
    formations: 5,
    etudiants: 200,
    photo: SITE_IMAGES.formateurs.f2,
    gradient: "from-[#1a3a2a] to-brand-dark",
  },
  {
    slug: "nadia-ouahbi",
    prenom: "Nadia",
    nom: "Ouahbi",
    specialite: "Esthétique & Beauté",
    bio: "Esthéticienne certifiée, gérante d'un institut à Marrakech. Formatrice agréée OFPPT.",
    formations: 4,
    etudiants: 180,
    photo: SITE_IMAGES.formateurs.f3,
    gradient: "from-[#3a1a2a] to-brand-dark",
  },
  {
    slug: "hassan-tazi",
    prenom: "Hassan",
    nom: "Tazi",
    specialite: "Finance & Gestion PME",
    bio: "Expert-comptable et consultant financier. Accompagne des PME marocaines depuis plus de 15 ans.",
    formations: 3,
    etudiants: 95,
    photo: SITE_IMAGES.formateurs.f4,
    gradient: "from-[#2a1a0a] to-brand-dark",
  },
];

function FormateurCard({ f, index }: { f: (typeof FORMATEURS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="bg-white border border-gray-100 hover:border-brand-gold/25 rounded-2xl p-6 hover:shadow-card-hover transition-all duration-300">
        {/* Avatar */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden mb-5 mx-auto group-hover:scale-105 transition-transform duration-300">
          <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient}`} />
          <img
            src={f.photo}
            alt={`${f.prenom} ${f.nom}`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="text-center mb-4">
          <h3 className="font-display text-lg font-semibold text-brand-blue">
            {f.prenom} {f.nom}
          </h3>
          <p className="font-body text-[11px] font-semibold text-brand-gold mt-0.5 uppercase tracking-wide">
            {f.specialite}
          </p>
        </div>

        <p className="font-body text-xs text-text-secondary leading-relaxed text-center mb-5">{f.bio}</p>

        <div className="h-px bg-gray-100 mb-4" />

        <div className="flex items-center justify-between">
          <div className="font-body text-[11px] text-text-muted">
            <span className="font-semibold text-text-primary">{f.formations}</span> formations
            {" · "}
            <span className="font-semibold text-text-primary">{f.etudiants}</span> étudiants
          </div>
          <a
            href="#"
            aria-label="LinkedIn"
            className="w-7 h-7 rounded border border-gray-200 hover:border-brand-blue flex items-center justify-center text-text-muted hover:text-brand-blue transition-all duration-200"
            onClick={(e) => e.preventDefault()}
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function FormateursSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-brand-cream">
      <Container>
        <div ref={headerRef} className="flex items-end justify-between mb-10 sm:mb-14 flex-wrap gap-4">
          <div className="max-w-lg">
            <motion.p
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              className="font-body text-label-caps text-brand-gold mb-4"
            >
              NOTRE ÉQUIPE
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-display font-bold text-brand-blue leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              Apprenez auprès
              <br />des meilleurs.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/formateurs"
              className="group flex items-center gap-2 font-body text-sm font-semibold text-brand-blue hover:text-brand-gold transition-colors duration-200"
            >
              Voir tous les formateurs
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex lg:grid lg:grid-cols-4 gap-5 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 no-scrollbar">
          {FORMATEURS.map((f, i) => (
            <div key={f.slug} className="shrink-0 w-[280px] sm:w-72 lg:w-auto">
              <FormateurCard f={f} index={i} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
