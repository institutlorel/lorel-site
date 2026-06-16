"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Clock, Star, ArrowUpRight, ArrowRight, MonitorPlay, Building, Layers } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { Formation } from "@/lib/data/formations";

const MODE_ICONS: Record<Formation["mode"], typeof MonitorPlay> = {
  EN_LIGNE: MonitorPlay,
  PRESENTIEL: Building,
  HYBRIDE: Layers,
};

const MODE_LABELS: Record<Formation["mode"], string> = {
  EN_LIGNE: "En ligne",
  PRESENTIEL: "Présentiel",
  HYBRIDE: "Hybride",
};

function FormationCard({ f, index }: { f: Formation; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const ModeIcon = MODE_ICONS[f.mode] ?? MonitorPlay;
  const modeLabel = MODE_LABELS[f.mode] ?? f.mode;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link
        href={`/formations/${f.slug}`}
        className="block bg-white border border-gray-100 hover:border-brand-gold/25 rounded-2xl overflow-hidden hover:shadow-card-hover transition-all duration-300"
      >
        {/* Image area */}
        <div className="relative h-48 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient}`} />
          {f.image && (
            <img
              src={f.image}
              alt={f.titreFr}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />

          <div className="absolute top-3 left-3">
            <span className="font-body text-[10px] font-bold text-brand-dark bg-brand-gold px-2.5 py-1 rounded-full uppercase tracking-wide">
              {f.category}
            </span>
          </div>

          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1.5 font-body text-[10px] font-semibold text-white bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
              <ModeIcon className="w-3 h-3" />
              {modeLabel}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          <h3 className="font-display text-[17px] font-semibold text-brand-blue leading-snug mb-1.5 line-clamp-2 group-hover:text-brand-dark transition-colors duration-200">
            {f.titreFr}
          </h3>
          <p className="font-body text-xs text-text-muted mb-4 truncate">{f.shortDesc}</p>

          <div className="h-px bg-gray-100 mb-4" />

          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
              <span className="font-display text-[11px] font-bold text-brand-blue">
                {f.formateurInitials || (f.formateur ? f.formateur.charAt(0) : "L")}
              </span>
            </div>
            <div>
              <div className="font-body text-[12px] font-semibold text-text-primary">
                {f.formateur || "Institut Lorel"}
              </div>
              <div className="font-body text-[10px] text-text-muted">Formateur</div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-5">
            {f.duree && (
              <>
                <span className="flex items-center gap-1 font-body text-[11px] text-text-muted">
                  <Clock className="w-3 h-3" />
                  {f.duree}
                </span>
                <span className="w-px h-3 bg-gray-200" />
              </>
            )}
            {f.niveau && (
              <>
                <span className="font-body text-[11px] text-text-muted">{f.niveau}</span>
                <span className="w-px h-3 bg-gray-200" />
              </>
            )}
            {f.rating > 0 && (
              <span className="flex items-center gap-0.5 font-body text-[11px] text-text-muted">
                <Star className="w-3 h-3 text-brand-gold fill-brand-gold" />
                {f.rating}
              </span>
            )}
          </div>

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
    </motion.div>
  );
}

export function FormationsPopulaires({ formations }: { formations: Formation[] }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  if (formations.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white">
      <Container>
        <div ref={headerRef} className="flex items-end justify-between mb-10 sm:mb-14 flex-wrap gap-4">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              className="font-body text-label-caps text-brand-gold mb-4"
            >
              FORMATIONS POPULAIRES
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-display font-bold text-brand-blue leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              Les plus demandées.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/formations"
              className="group flex items-center gap-2 font-body text-sm font-semibold text-brand-blue hover:text-brand-gold transition-colors duration-200"
            >
              Voir toutes les formations
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {formations.map((f, i) => (
            <FormationCard key={f.slug} f={f} index={i} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/formations"
            className="group inline-flex items-center gap-2 border border-brand-blue/30 text-brand-blue hover:bg-brand-blue hover:text-white rounded-sm px-8 py-3.5 font-body font-semibold text-sm transition-all duration-200"
          >
            Voir toutes les formations
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
