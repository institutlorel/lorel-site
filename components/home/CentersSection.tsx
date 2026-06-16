"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

const CENTERS = [
  {
    ville: "Marrakech",
    quartier: "Guéliz",
    adresse: "Avenue Mohammed VI, Guéliz, Marrakech 40000",
    tel: "+212 5 24 43 XX XX",
    horaires: "Lun – Sam : 8h30 – 18h",
    image:
      "https://images.pexels.com/photos/3875086/pexels-photo-3875086.jpeg?auto=compress&cs=tinysrgb&w=600",
    gradient: "from-[#C9A84C] via-[#B8941F] to-[#8B6914]",
    mapsUrl: "https://maps.google.com/?q=Gueliz+Marrakech",
    accentHex: "#C9A84C",
  },
  {
    ville: "Casablanca",
    quartier: "Maarif",
    adresse: "Boulevard Zerktouni, Maarif, Casablanca 20100",
    tel: "+212 5 22 48 XX XX",
    horaires: "Lun – Sam : 8h30 – 18h",
    image:
      "https://images.pexels.com/photos/2129796/pexels-photo-2129796.jpeg?auto=compress&cs=tinysrgb&w=600",
    gradient: "from-[#1B3A5C] via-[#2C5378] to-[#0a1628]",
    mapsUrl: "https://maps.google.com/?q=Maarif+Casablanca",
    accentHex: "#1B3A5C",
  },
];

function CenterCard({
  center,
  index,
}: {
  center: (typeof CENTERS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-card-hover transition-all duration-300">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${center.gradient}`} />
          <img
            src={center.image}
            alt={`Centre ${center.ville}`}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/20 to-transparent" />

          {/* City label */}
          <div className="absolute bottom-4 left-5">
            <div className="font-display text-2xl font-bold text-white leading-none">
              {center.ville}
            </div>
            <div className="font-body text-[11px] text-white/60 mt-0.5 uppercase tracking-wider">
              {center.quartier}
            </div>
          </div>

          {/* Location pin */}
          <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="space-y-3 mb-5">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
              <span className="font-body text-[12px] text-text-secondary leading-relaxed">
                {center.adresse}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-brand-gold shrink-0" />
              <a
                href={`tel:${center.tel.replace(/\s/g, "")}`}
                className="font-body text-[12px] text-text-secondary hover:text-brand-blue transition-colors font-semibold"
              >
                {center.tel}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-brand-gold shrink-0" />
              <span className="font-body text-[12px] text-text-muted">{center.horaires}</span>
            </div>
          </div>

          <a
            href={center.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-[12px] font-semibold text-brand-blue hover:text-brand-gold border border-brand-blue/20 hover:border-brand-gold/40 px-4 py-2 rounded-sm transition-all duration-200"
          >
            <ExternalLinkIcon />
            Voir sur Google Maps
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function CentersSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="py-16 sm:py-24 bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.8) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <Container className="relative z-10">
        <div ref={headerRef} className="max-w-lg mb-10 sm:mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            className="font-body text-label-caps text-brand-gold mb-4"
          >
            NOS CENTRES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-display font-bold text-white leading-tight mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Deux centres à votre service.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="font-body text-white/50 text-sm leading-relaxed"
          >
            Des espaces équipés à Marrakech et Casablanca pour vous accueillir en présentiel.
            Formez-vous dans un cadre professionnel et motivant.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {CENTERS.map((c, i) => (
            <CenterCard key={c.ville} center={c} index={i} />
          ))}
        </div>

        {/* Bottom: phone CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-10 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="font-body text-sm text-white/50 text-center sm:text-left">
            Une question ? Appelez-nous directement — réponse garantie sous 24h.
          </p>
          <a
            href="tel:+212600000000"
            className="flex items-center gap-2 bg-brand-gold/10 hover:bg-brand-gold/20 border border-brand-gold/30 hover:border-brand-gold/60 text-brand-gold font-body text-sm font-semibold px-6 py-3 rounded-sm transition-all duration-200 whitespace-nowrap"
          >
            <Phone className="w-4 h-4" />
            +212 6 00 00 00 00
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
