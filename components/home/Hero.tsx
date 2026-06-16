"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, CalendarDays, Star, Building2, ArrowRight, BadgeCheck, Users } from "lucide-react";
import Link from "next/link";
import { SITE_IMAGES } from "@/lib/data/images";

const POPULAR = ["Photographie", "Marketing Digital", "Esthétique", "Comptabilité"];

const goldText: React.CSSProperties = {
  background: "linear-gradient(135deg, #B8941F 0%, #C9A84C 45%, #E8D08A 70%, #C9A84C 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

function FloatingCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const [query, setQuery] = useState("");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] bg-brand-navy overflow-hidden flex items-center"
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-72 h-72 rounded-full bg-brand-blue/20 blur-[70px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,168,76,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.8) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-brand-navy/60 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-5 lg:px-10 pt-10 pb-16 lg:pt-12 lg:pb-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">

          {/* LEFT COLUMN */}
          <motion.div
            style={{ y: textY, opacity }}
            className="lg:col-span-7 flex flex-col"
          >
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-body text-label-caps text-brand-gold/70 mb-5"
            >
              INSTITUT DE FORMATION · DEPUIS 2015
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-white leading-[1.0] mb-6"
              style={{ fontSize: "clamp(2rem, 5.5vw, 4.8rem)" }}
            >
              Votre avenir commence
              <br />
              par une formation{" "}
              <span style={goldText}>d&apos;excellence.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="font-body text-white/50 text-sm sm:text-base leading-[1.8] max-w-md mb-8"
            >
              Formations présentiel, en ligne et hybride à Marrakech et Casablanca.
              Certifications reconnues, formateurs experts,{" "}
              <span className="text-white/75">accompagnement VAE.</span>
            </motion.p>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mb-4"
            >
              <div className="flex items-center bg-white rounded-xl shadow-gold overflow-hidden group">
                <Search className="w-5 h-5 text-text-muted ml-4 shrink-0 group-focus-within:text-brand-blue transition-colors" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Quelle formation recherchez-vous ?"
                  className="flex-1 py-4 px-3 font-body text-sm text-text-primary placeholder-text-muted outline-none bg-transparent min-w-0"
                />
                <Link
                  href={`/formations${query ? `?q=${encodeURIComponent(query)}` : ""}`}
                  className="m-1.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-dark font-body font-bold text-[13px] px-5 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200 shrink-0 whitespace-nowrap"
                >
                  Chercher
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Popular */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="font-body text-[11px] text-white/30">Populaires :</span>
                {POPULAR.map((term) => (
                  <Link
                    key={term}
                    href={`/formations?q=${encodeURIComponent(term)}`}
                    className="font-body text-[11px] text-white/40 hover:text-brand-gold border border-white/10 hover:border-brand-gold/30 px-3 py-1 rounded-full transition-all duration-200"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Inline trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.62 }}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-1"
            >
              {[
                { icon: BadgeCheck, label: "Certifié OFPPT" },
                { icon: Users, label: "+500 diplômés" },
                { icon: Star, label: "4.9/5 · 200+ avis" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                  <span className="font-body text-[11px] text-white/55">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap items-center gap-0 mt-5 pt-5 border-t border-white/10"
            >
              {[
                { value: "500+", label: "Diplômés" },
                { value: "15+", label: "Formations" },
                { value: "95%", label: "Satisfaction" },
              ].map((s, i) => (
                <div key={i} className="flex items-center">
                  {i > 0 && <div className="w-px h-8 bg-white/10 mx-5" />}
                  <div>
                    <div className="font-display text-2xl font-bold text-white leading-none">{s.value}</div>
                    <div className="font-body text-[11px] text-white/35 mt-0.5 tracking-wide uppercase">{s.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN — hidden on mobile, shows on lg+ */}
          <div className="hidden lg:col-span-5 lg:relative lg:flex items-center justify-center">
            {/* Decorative rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full border border-brand-gold/15" />
              <div className="absolute w-56 h-56 rounded-full border border-brand-gold/8" />
            </div>

            {/* Main photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-56 h-80 lg:w-60 lg:h-[340px] rounded-2xl overflow-hidden shadow-blue"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-blue-light to-brand-dark" />
              <img
                src={SITE_IMAGES.hero.main}
                alt="Étudiante Institut Lorel"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 right-4">
                <span className="font-body text-[9px] text-white/60 tracking-widest uppercase">
                  Étudiante · Promotion 2025
                </span>
              </div>
            </motion.div>

            {/* Floating card — Session */}
            <FloatingCard delay={0.6} className="absolute -left-2 lg:-left-8 top-12 z-10">
              <div className="bg-white rounded-xl shadow-card-hover px-4 py-3 flex items-center gap-3 min-w-[170px]">
                <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-4 h-4 text-brand-blue" />
                </div>
                <div>
                  <div className="font-body text-[10px] text-text-muted uppercase tracking-wide">Prochaine session</div>
                  <div className="font-display text-sm font-semibold text-text-primary">15 Jan 2026</div>
                </div>
              </div>
            </FloatingCard>

            {/* Floating card — Rating */}
            <FloatingCard delay={0.8} className="absolute -right-2 lg:-right-6 bottom-20 z-10">
              <div className="bg-white rounded-xl shadow-card-hover px-4 py-3 min-w-[140px]">
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3 h-3 text-brand-gold fill-brand-gold" />
                  ))}
                </div>
                <div className="font-display text-lg font-bold text-text-primary leading-none">
                  4.9<span className="text-text-muted font-body text-xs">/5</span>
                </div>
                <div className="font-body text-[10px] text-text-muted mt-0.5">Note moyenne</div>
              </div>
            </FloatingCard>

            {/* Floating card — Partners */}
            <FloatingCard delay={1.0} className="absolute -left-4 lg:-left-10 bottom-10 z-10">
              <div className="bg-brand-gold rounded-xl shadow-gold px-4 py-3 flex items-center gap-3 min-w-[160px]">
                <div className="w-7 h-7 rounded-lg bg-brand-dark/20 flex items-center justify-center shrink-0">
                  <Building2 className="w-3.5 h-3.5 text-brand-dark" />
                </div>
                <div>
                  <div className="font-display text-sm font-bold text-brand-dark leading-none">+200</div>
                  <div className="font-body text-[10px] text-brand-dark/70">Entreprises partenaires</div>
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </div>
    </section>
  );
}
