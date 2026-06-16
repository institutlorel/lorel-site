"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SITE_IMAGES } from "@/lib/data/images";

const goldText: React.CSSProperties = {
  background: "linear-gradient(135deg, #B8941F 0%, #C9A84C 45%, #E8D08A 70%, #C9A84C 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const VALUES = [
  {
    num: "01",
    titre: "Certifications reconnues",
    desc: "Nos diplômes sont validés par des organismes nationaux et internationaux, reconnus par les employeurs marocains et à l'étranger.",
  },
  {
    num: "02",
    titre: "Formateurs experts actifs",
    desc: "Chaque formateur exerce son métier en parallèle. Vous bénéficiez d'une pédagogie ancrée dans la réalité du marché.",
  },
  {
    num: "03",
    titre: "Réseau de 200+ entreprises",
    desc: "Un réseau dense de partenaires à Marrakech et Casablanca pour faciliter votre insertion ou votre reconversion professionnelle.",
  },
  {
    num: "04",
    titre: "Accompagnement personnalisé",
    desc: "De l'orientation à la certification, nos conseillers vous suivent à chaque étape pour maximiser vos chances de réussite.",
  },
];

export function WhyLorel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 sm:py-24 lg:py-36 bg-brand-cream overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start" ref={ref}>

          {/* LEFT */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="font-body text-label-caps text-brand-gold mb-5"
            >
              POURQUOI LOREL
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-bold text-brand-blue leading-[1.05] mb-8"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              L&apos;excellence à chaque
              <br />
              étape de votre{" "}
              <span style={goldText}>parcours.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="font-body text-text-secondary text-sm leading-relaxed mb-10 max-w-md"
            >
              Depuis 2015, Institut Lorel forme des professionnels qualifiés dans les secteurs porteurs
              de l&apos;économie marocaine. Notre approche combine rigueur académique et pratique terrain.
            </motion.p>

            <div className="space-y-0">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.num}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex gap-5 py-5 border-b border-gray-200/60 last:border-0 group"
                >
                  <span className="font-display text-3xl font-bold text-gray-100 group-hover:text-brand-gold/25 transition-colors duration-300 select-none shrink-0 leading-none mt-1">
                    {v.num}
                  </span>
                  <div>
                    <h3 className="font-display text-[17px] font-semibold text-brand-blue mb-1.5">{v.titre}</h3>
                    <p className="font-body text-sm text-text-secondary leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="mt-10"
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 font-body font-semibold text-sm text-brand-blue hover:text-brand-gold transition-colors duration-200"
              >
                En savoir plus sur l&apos;Institut
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — hidden on mobile to avoid overflow */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:col-span-6 lg:relative lg:flex items-center justify-center min-h-[420px]"
          >
            {/* Decorative rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-brand-gold/12 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full border border-brand-gold/8 pointer-events-none" />

            {/* Main photo */}
            <div className="relative w-64 h-80 lg:w-72 lg:h-96 rounded-2xl overflow-hidden shadow-blue">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-light via-brand-blue to-brand-dark" />
              <img
                src={SITE_IMAGES.about.ambiance1}
                alt="Ambiance Institut Lorel"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent" />
            </div>

            {/* Floating stat cards */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 lg:-right-8 top-16 bg-white rounded-xl shadow-card-hover px-5 py-4 min-w-[160px] border border-gray-100"
            >
              <div className="font-display text-2xl font-bold text-brand-blue leading-none mb-1">95%</div>
              <div className="font-body text-[11px] text-text-secondary">Taux d&apos;insertion professionnelle</div>
              <div className="mt-3 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[95%] bg-brand-gold rounded-full" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute -left-4 lg:-left-6 bottom-16 bg-brand-dark rounded-xl shadow-blue px-5 py-4 border border-white/8"
            >
              <div className="font-display text-xl font-bold text-brand-gold leading-none mb-1">500+</div>
              <div className="font-body text-[11px] text-white/50">Diplômés depuis 2015</div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
