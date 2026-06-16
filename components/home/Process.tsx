"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, ClipboardCheck, GraduationCap, Trophy } from "lucide-react";
import { Container } from "@/components/ui/Container";

const STEPS = [
  {
    num: "01",
    icon: Search,
    titre: "Choisissez",
    desc: "Explorez nos formations et trouvez celle qui correspond à vos objectifs et votre emploi du temps.",
  },
  {
    num: "02",
    icon: ClipboardCheck,
    titre: "Inscrivez-vous",
    desc: "Remplissez le formulaire d'inscription. Nos conseillers vous contactent sous 24h.",
  },
  {
    num: "03",
    icon: GraduationCap,
    titre: "Formez-vous",
    desc: "Suivez votre formation en présentiel, en ligne ou hybride selon votre disponibilité.",
  },
  {
    num: "04",
    icon: Trophy,
    titre: "Réussissez",
    desc: "Obtenez votre certification et intégrez le marché du travail avec l'appui de notre réseau.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-brand-cream">
      <Container>
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="font-body text-label-caps text-brand-gold mb-4"
          >
            SIMPLE &amp; RAPIDE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-display font-bold text-brand-blue leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Votre parcours en 4 étapes.
          </motion.h2>
        </div>

        {/* Steps */}
        <div ref={ref} className="relative">
          {/* Connecting line — desktop */}
          <div
            ref={lineRef}
            className="absolute top-11 left-[12.5%] right-[12.5%] h-px bg-gray-200 hidden lg:block overflow-hidden"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={lineInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-brand-gold/40 origin-left"
            />
          </div>

          <div className="grid lg:grid-cols-4 gap-8 lg:gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 28 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.12 }}
                  className="relative flex flex-col items-center text-center lg:items-center"
                >
                  {/* Step circle */}
                  <div className="relative mb-6 z-10">
                    <div className="w-[88px] h-[88px] rounded-full bg-white border-2 border-brand-gold/30 flex flex-col items-center justify-center shadow-card group-hover:border-brand-gold transition-colors duration-300">
                      <Icon className="w-6 h-6 text-brand-gold mb-0.5" />
                      <span className="font-body text-[10px] font-bold text-brand-gold/70 tracking-widest">
                        {step.num}
                      </span>
                    </div>
                    {/* Pulse ring */}
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
                      className="absolute inset-0 rounded-full border border-brand-gold/20"
                    />
                  </div>

                  {/* Connector line — mobile vertical */}
                  {i < STEPS.length - 1 && (
                    <div className="lg:hidden absolute left-1/2 top-[88px] w-px h-8 bg-brand-gold/20 -translate-x-1/2 mt-0" />
                  )}

                  <h3 className="font-display text-lg font-semibold text-brand-blue mb-2">
                    {step.titre}
                  </h3>
                  <p className="font-body text-sm text-text-secondary leading-relaxed max-w-[200px]">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
