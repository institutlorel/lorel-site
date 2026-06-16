"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Star, Quote, CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SITE_IMAGES } from "@/lib/data/images";

const TEMOIGNAGES = [
  {
    nom: "Fatima Zahra Alaoui",
    formation: "Photographie Professionnelle",
    annee: "2024",
    resultat: "A ouvert son propre studio",
    photo: SITE_IMAGES.temoignages.t1,
    initials: "FA",
    gradient: "from-brand-blue to-brand-dark",
    quote:
      "La formation m'a appris à voir différemment. Youssef partage non seulement des techniques, mais sa vision artistique. Six mois après l'obtention de mon certificat, j'ai ouvert mon studio à Marrakech avec 15 clients fidèles.",
    rating: 5,
  },
  {
    nom: "Karim El Mansouri",
    formation: "Marketing Digital",
    annee: "2024",
    resultat: "Recruté par une agence digitale",
    photo: SITE_IMAGES.temoignages.t2,
    initials: "KM",
    gradient: "from-[#1a3a2a] to-brand-dark",
    quote:
      "En deux mois, j'ai acquis des compétences directement applicables. Sara nous a immergés dans des cas réels dès la première semaine. J'ai été recruté avant même la fin de la formation.",
    rating: 5,
  },
  {
    nom: "Nour El Houda Benali",
    formation: "Esthétique & Soins",
    annee: "2023",
    resultat: "Gère son propre centre de beauté",
    photo: SITE_IMAGES.temoignages.t3,
    initials: "NB",
    gradient: "from-[#3a1a2a] to-brand-dark",
    quote:
      "Institut Lorel a transformé ma passion en carrière. La pédagogie est rigoureuse, les équipements professionnels, et le suivi après formation est exceptionnel. Mon centre de beauté emploie aujourd'hui 3 personnes.",
    rating: 5,
  },
  {
    nom: "Mehdi Chraibi",
    formation: "Comptabilité & Gestion PME",
    annee: "2023",
    resultat: "Comptable dans une PME de 50 salariés",
    photo: SITE_IMAGES.temoignages.t1,
    initials: "MC",
    gradient: "from-[#2a1a0a] to-brand-dark",
    quote:
      "J'ai suivi la formation en hybride depuis Casablanca. Hassan est un formateur exceptionnel qui donne des exemples concrets du marché marocain. La certification a été déterminante dans mon recrutement.",
    rating: 5,
  },
  {
    nom: "Amira Hdidou",
    formation: "Mode & Stylisme",
    annee: "2024",
    resultat: "Styliste indépendante — 20+ clients",
    photo: SITE_IMAGES.temoignages.t2,
    initials: "AH",
    gradient: "from-[#4a1a6a] to-brand-dark",
    quote:
      "Le programme de stylisme est d'une richesse incroyable. En six mois, j'ai appris à créer des collections complètes et à gérer mon activité. Aujourd'hui j'ai plus de 20 clients particuliers et je collabore avec deux boutiques à Casablanca.",
    rating: 5,
  },
  {
    nom: "Khalid Benachir",
    formation: "Entrepreneuriat & Startup",
    annee: "2023",
    resultat: "A créé sa société — 3 associés",
    photo: SITE_IMAGES.temoignages.t3,
    initials: "KB",
    gradient: "from-[#0a2a1a] to-brand-dark",
    quote:
      "La formation en entrepreneuriat m'a fourni des outils concrets : business plan, pitch, gestion financière. Six mois après ma certification, j'ai lancé ma société de services numériques. Le réseau de l'Institut Lorel m'a ouvert des portes.",
    rating: 5,
  },
];

export function Temoignages() {
  const [active, setActive] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % TEMOIGNAGES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const t = TEMOIGNAGES[active];

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white">
      <Container>
        <div ref={headerRef} className="mb-12 sm:mb-16">
          {/* Social proof header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center gap-3 mb-5"
          >
            <div className="flex -space-x-2">
              {[SITE_IMAGES.temoignages.t1, SITE_IMAGES.temoignages.t2, SITE_IMAGES.temoignages.t3].map(
                (img, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-brand-dark" />
                    <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  </div>
                )
              )}
            </div>
            <div>
              <div className="font-body text-xs font-semibold text-text-primary">
                Rejoignez{" "}
                <span className="text-brand-gold">500+ diplômés</span> satisfaits
              </div>
              <div className="flex items-center gap-0.5 mt-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3 h-3 text-brand-gold fill-brand-gold" />
                ))}
                <span className="font-body text-[10px] text-text-muted ml-1.5">Note moyenne 4.9/5</span>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            className="font-body text-label-caps text-brand-gold mb-4"
          >
            TÉMOIGNAGES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-display font-bold text-brand-blue leading-tight"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Ils ont transformé leur carrière.
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Featured large testimonial */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <Quote className="w-10 h-10 text-brand-gold/15 mb-4" style={{ transform: "scaleX(-1)" }} />

                <blockquote
                  className="font-accent italic text-text-primary leading-[1.75] mb-8"
                  style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient}`} />
                    <img
                      src={t.photo}
                      alt={t.nom}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="font-display text-base font-semibold text-brand-blue">{t.nom}</div>
                    <div className="font-body text-[12px] text-text-muted">
                      {t.formation} · {t.annee}
                    </div>
                  </div>
                  <div className="hidden sm:block ml-auto">
                    <span className="font-body text-[11px] font-semibold text-brand-gold bg-brand-gold/8 border border-brand-gold/20 px-3 py-1.5 rounded-full">
                      {t.resultat}
                    </span>
                  </div>
                </div>

                {/* Stars + verified badge */}
                <div className="flex items-center gap-3 mt-4">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-brand-gold fill-brand-gold" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3 text-green-600 shrink-0" />
                    <span className="font-body text-[10px] font-semibold text-green-700">Avis vérifié</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex items-center gap-2 mt-8">
              {TEMOIGNAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1 rounded-full transition-all duration-300 min-w-[16px] ${
                    i === active ? "w-8 bg-brand-gold" : "w-4 bg-gray-200 hover:bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right — small cards (desktop only) */}
          <div className="lg:col-span-5 hidden lg:flex flex-col gap-4">
            {TEMOIGNAGES.filter((_, i) => i !== active)
              .slice(0, 2)
              .map((item) => (
                <button
                  key={item.nom}
                  onClick={() => setActive(TEMOIGNAGES.indexOf(item))}
                  className="group text-left bg-brand-cream hover:bg-white border border-gray-100 hover:border-brand-gold/20 rounded-xl p-5 transition-all duration-200 hover:shadow-card"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
                      <img
                        src={item.photo}
                        alt={item.nom}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-sm font-semibold text-brand-blue">{item.nom}</div>
                      <div className="font-body text-[10px] text-text-muted truncate">{item.formation}</div>
                    </div>
                    <div className="flex items-center gap-1 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full shrink-0">
                      <CheckCircle className="w-2.5 h-2.5 text-green-500" />
                      <span className="font-body text-[9px] text-green-600">Vérifié</span>
                    </div>
                  </div>
                  <p className="font-body text-xs text-text-secondary leading-relaxed line-clamp-2">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </button>
              ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
