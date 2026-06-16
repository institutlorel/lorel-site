"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const WA_ICON = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const goldText: React.CSSProperties = {
  background: "linear-gradient(135deg, #B8941F 0%, #C9A84C 45%, #E8D08A 70%, #C9A84C 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export function CTASection({ waNumber }: { waNumber?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 lg:py-36 bg-brand-dark overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark to-brand-navy" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/15 to-transparent" />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-brand-blue/15 blur-[120px] pointer-events-none" />
      {/* Fine grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.8) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="font-body text-label-caps text-brand-gold/60 mb-6"
        >
          COMMENCEZ AUJOURD&apos;HUI
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-white leading-[0.95] mb-7"
          style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
        >
          Prêt à transformer
          <br />
          <span style={goldText}>votre avenir ?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="font-body text-white/40 text-sm max-w-sm mx-auto mb-12 leading-relaxed"
        >
          Nos conseillers sont disponibles 7j/7 pour vous orienter vers la formation
          qui correspond à votre projet.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          {waNumber ? (
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-brand-gold hover:bg-brand-gold-light text-brand-dark font-body font-bold text-sm px-8 py-4 rounded-sm transition-colors duration-200 w-full sm:w-auto justify-center"
            >
              {WA_ICON}
              Écrire sur WhatsApp
            </a>
          ) : (
            <a
              href="/contact"
              className="group inline-flex items-center gap-3 bg-brand-gold hover:bg-brand-gold-light text-brand-dark font-body font-bold text-sm px-8 py-4 rounded-sm transition-colors duration-200 w-full sm:w-auto justify-center"
            >
              Nous contacter
            </a>
          )}
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-14 pt-10 border-t border-white/8"
        >
          {[
            { val: "Réponse", sub: "sous 24h" },
            { val: "Gratuit", sub: "Consultation initiale" },
            { val: "Sans", sub: "engagement" },
          ].map((s) => (
            <div key={s.val} className="text-center">
              <div className="font-display text-lg font-bold text-white/60">{s.val}</div>
              <div className="font-body text-[11px] text-white/30 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
