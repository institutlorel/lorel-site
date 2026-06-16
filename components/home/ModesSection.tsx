"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, Monitor, Layers, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";

const MODES = [
  {
    id: "presentiel",
    label: "Présentiel",
    icon: Building2,
    description:
      "Dans nos centres de Marrakech et Casablanca. Encadrement direct, équipements professionnels, ambiance d'apprentissage.",
    points: ["Salles équipées", "Formateurs présents", "Networking"],
    highlighted: false,
  },
  {
    id: "en-ligne",
    label: "En ligne",
    icon: Monitor,
    description:
      "Depuis chez vous, à votre rythme. Cours en direct et enregistrés, support continu, flexibilité totale.",
    points: ["Cours en direct", "Replay illimité", "Support 7j/7"],
    highlighted: true,
    badge: "Populaire",
  },
  {
    id: "hybride",
    label: "Hybride",
    icon: Layers,
    description:
      "Le meilleur des deux mondes. Alternez présentiel et distanciel selon votre emploi du temps.",
    points: ["Flexibilité maximale", "Présentiel + Online", "Suivi personnalisé"],
    highlighted: false,
  },
];

function ModeCard({
  mode,
  index,
}: {
  mode: (typeof MODES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = mode.icon;

  if (mode.highlighted) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-brand-dark rounded-2xl p-8 shadow-blue border border-white/5 lg:-mt-4 lg:-mb-4 z-10"
      >
        {/* Badge */}
        {mode.badge && (
          <div className="absolute -top-3 left-8">
            <span className="font-body text-[10px] font-bold text-brand-dark bg-brand-gold px-3 py-1 rounded-full tracking-wide uppercase">
              {mode.badge}
            </span>
          </div>
        )}

        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-brand-gold/15 border border-brand-gold/25 flex items-center justify-center mb-6">
          <Icon className="w-6 h-6 text-brand-gold" />
        </div>

        {/* Label */}
        <h3
          className="font-display font-bold text-white mb-4 leading-tight"
          style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
        >
          {mode.label}
        </h3>

        {/* Description */}
        <p className="font-body text-white/50 text-sm leading-[1.85] mb-7">
          {mode.description}
        </p>

        {/* Divider */}
        <div className="h-px bg-white/8 mb-7" />

        {/* Points */}
        <ul className="space-y-3">
          {mode.points.map((p) => (
            <li key={p} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-brand-gold/15 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-brand-gold" />
              </div>
              <span className="font-body text-sm text-white/70">{p}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-white border border-gray-100 hover:border-brand-gold/25 rounded-2xl p-8 hover:shadow-card-hover transition-all duration-300"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-brand-blue/6 border border-brand-blue/12 group-hover:bg-brand-gold/10 group-hover:border-brand-gold/25 flex items-center justify-center mb-6 transition-all duration-300">
        <Icon className="w-6 h-6 text-brand-blue group-hover:text-brand-gold transition-colors duration-300" />
      </div>

      {/* Label */}
      <h3
        className="font-display font-bold text-brand-blue mb-4 leading-tight"
        style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
      >
        {mode.label}
      </h3>

      {/* Description */}
      <p className="font-body text-text-secondary text-sm leading-[1.85] mb-7">
        {mode.description}
      </p>

      {/* Divider */}
      <div className="h-px bg-gray-100 group-hover:bg-brand-gold/20 mb-7 transition-colors duration-300" />

      {/* Points */}
      <ul className="space-y-3">
        {mode.points.map((p) => (
          <li key={p} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-brand-gold/8 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/15 transition-colors duration-300">
              <Check className="w-3 h-3 text-brand-gold" />
            </div>
            <span className="font-body text-sm text-text-secondary">{p}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function ModesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="py-24 lg:py-32 bg-white">
      <Container>
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-body text-label-caps text-brand-gold mb-4"
          >
            FLEXIBILITÉ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-brand-blue leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Apprenez comme vous voulez.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-text-secondary text-sm leading-relaxed"
          >
            Trois modes d&apos;apprentissage pour s&apos;adapter à votre vie, votre rythme et vos objectifs.
            Changez de mode en cours de formation si besoin.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-5 items-stretch">
          {MODES.map((mode, i) => (
            <ModeCard key={mode.id} mode={mode} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
