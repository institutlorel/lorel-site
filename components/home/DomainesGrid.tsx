"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { LocaleLink as Link } from "@/components/LocaleLink";
import {
  Sparkles,
  Camera,
  Smartphone,
  Shirt,
  Calculator,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/lib/i18n/dictionaries";

function buildDomaines(dict: Dictionary) {
  return [
    { slug: "beaute-esthetique", ...dict.domainesGrid.domaines.beauteEsthetique, count: 4, icon: Sparkles, accent: "#E07A9B" },
    { slug: "arts-visuels", ...dict.domainesGrid.domaines.artsVisuels, count: 3, icon: Camera, accent: "#6B8FD4" },
    { slug: "digital-marketing", ...dict.domainesGrid.domaines.digitalMarketing, count: 5, icon: Smartphone, accent: "#4CAF9D" },
    { slug: "mode-stylisme", ...dict.domainesGrid.domaines.modeStylisme, count: 2, icon: Shirt, accent: "#9B6BD4" },
    { slug: "finance-gestion", ...dict.domainesGrid.domaines.financeGestion, count: 3, icon: Calculator, accent: "#5BA85B" },
    { slug: "developpement-personnel", ...dict.domainesGrid.domaines.developpementPersonnel, count: 4, icon: Users, accent: "#E0A04C" },
  ];
}

function DomaineCard({
  domaine,
  index,
  formationsSuffix,
}: {
  domaine: ReturnType<typeof buildDomaines>[number];
  index: number;
  formationsSuffix: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const Icon = domaine.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/domaines/${domaine.slug}`}
        className="group block bg-white border rounded-xl p-6 transition-all duration-300 hover:shadow-card-hover relative overflow-hidden"
        style={{ borderColor: hovered ? `${domaine.accent}45` : "#f3f4f6" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Top row: icon + arrow */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 border"
            style={{
              backgroundColor: hovered ? `${domaine.accent}22` : `${domaine.accent}12`,
              borderColor: hovered ? `${domaine.accent}55` : `${domaine.accent}28`,
            }}
          >
            <Icon className="w-5 h-5" style={{ color: domaine.accent }} />
          </div>
          <div
            className="w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300"
            style={{
              borderColor: hovered ? domaine.accent : "#e5e7eb",
              backgroundColor: hovered ? domaine.accent : "transparent",
            }}
          >
            <ArrowUpRight
              className="w-3.5 h-3.5 transition-colors duration-300"
              style={{ color: hovered ? "#fff" : "#9ca3af" }}
            />
          </div>
        </div>

        {/* Name */}
        <h3 className="font-display text-lg font-semibold text-brand-blue group-hover:text-brand-dark transition-colors duration-200 leading-snug mb-1.5">
          {domaine.nom}
        </h3>

        {/* Description */}
        <p className="font-body text-sm text-text-secondary mb-4 leading-relaxed">
          {domaine.description}
        </p>

        {/* Count */}
        <div className="flex items-center gap-1.5">
          <span className="font-body text-xs font-semibold" style={{ color: domaine.accent }}>
            {domaine.count} {formationsSuffix}
          </span>
          <span
            className="w-12 h-px transition-colors duration-300"
            style={{ backgroundColor: hovered ? `${domaine.accent}60` : `${domaine.accent}22` }}
          />
        </div>

        {/* Bottom hover accent bar */}
        <div
          className="absolute bottom-0 inset-x-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
          style={{ backgroundColor: domaine.accent }}
        />
      </Link>
    </motion.div>
  );
}

export function DomainesGrid({ dict }: { dict: Dictionary }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const DOMAINES = buildDomaines(dict);

  return (
    <section className="py-24 lg:py-32 bg-brand-cream">
      <Container>
        {/* Header */}
        <div ref={headerRef} className="max-w-2xl mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-body text-label-caps text-brand-gold mb-4"
          >
            {dict.domainesGrid.badge}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-brand-blue leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            {dict.domainesGrid.titreLigne1}
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #B8941F 0%, #C9A84C 45%, #E8D08A 70%, #C9A84C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {dict.domainesGrid.titreAccent}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-text-secondary text-sm leading-relaxed"
          >
            {dict.domainesGrid.description}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {DOMAINES.map((d, i) => (
            <DomaineCard key={d.slug} domaine={d} index={i} formationsSuffix={dict.common.formations} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link
            href="/domaines"
            className="group inline-flex items-center gap-3 border border-brand-blue/30 hover:border-brand-blue text-brand-blue font-body font-semibold text-sm px-8 py-3.5 rounded-sm hover:bg-brand-blue/5 transition-all duration-200"
          >
            {dict.domainesGrid.voirTousLesDomaines}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
