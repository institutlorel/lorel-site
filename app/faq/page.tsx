"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  categorie: string;
  questions: FaqItem[];
}

const FAQ_DATA: FaqCategory[] = [
  {
    categorie: "Inscriptions",
    questions: [
      {
        q: "Comment s'inscrire à une formation ?",
        a: "Remplissez le formulaire sur la page de la formation ou contactez-nous directement sur WhatsApp. Notre équipe vous rappelle sous 24h pour confirmer votre inscription et vous guider dans les prochaines étapes.",
      },
      {
        q: "Quelles sont les conditions d'admission ?",
        a: "La plupart de nos formations sont accessibles sans prérequis particuliers. Pour les niveaux avancés ou les programmes Pro, un entretien préalable permet de s'assurer que la formation correspond à votre profil.",
      },
      {
        q: "Peut-on s'inscrire en cours de session ?",
        a: "Oui, dans la limite des places disponibles. Nous proposons des rattrapages pour les modules déjà dispensés. Contactez-nous pour connaître les possibilités selon la formation souhaitée.",
      },
      {
        q: "Y a-t-il une liste d'attente ?",
        a: "Oui, pour les formations affichant complet, une liste d'attente est gérée. En cas de désistement, vous serez contacté en priorité. Nous organisons une nouvelle session dès que la liste d'attente atteint un nombre suffisant.",
      },
    ],
  },
  {
    categorie: "Formations",
    questions: [
      {
        q: "Quelle est la différence entre présentiel, en ligne et hybride ?",
        a: "Le présentiel se déroule dans nos centres à Marrakech ou Casablanca. L'en ligne est 100% à distance via notre plateforme, accessible 24h/24. L'hybride combine 80% de cours en ligne avec 20% d'ateliers pratiques présentiels — c'est notre format le plus populaire pour les actifs.",
      },
      {
        q: "Les formations sont-elles reconnues par les employeurs ?",
        a: "Oui. Nos certifications sont accréditées par l'OFPPT et reconnues par les employeurs marocains. Les programmes LOREL PRO disposent d'équivalences européennes reconnues en France, en Belgique et au Canada.",
      },
      {
        q: "Comment se déroule une journée de formation en ligne ?",
        a: "Vous accédez aux modules vidéo quand vous le souhaitez, à votre rythme. Des sessions de questions/réponses en direct avec le formateur sont organisées chaque semaine. Les exercices pratiques sont soumis via la plateforme et corrigés sous 48h.",
      },
      {
        q: "Peut-on suivre plusieurs formations simultanément ?",
        a: "C'est techniquement possible mais nous le déconseillons pour garantir la qualité de votre apprentissage. Nous recommandons de terminer une formation avant d'en commencer une autre, sauf pour des formations très courtes.",
      },
    ],
  },
  {
    categorie: "Paiement",
    questions: [
      {
        q: "Quels modes de paiement sont acceptés ?",
        a: "Virement bancaire, carte bancaire, espèces au guichet de nos centres, et paiement mobile (CIH Mobile, Attijariwafa, etc.). Nous acceptons également les chèques pour les montants supérieurs à 2 000 DH.",
      },
      {
        q: "Peut-on payer en plusieurs fois ?",
        a: "Oui, nous proposons des facilités de paiement en 2 à 6 mensualités sans frais pour la plupart de nos formations. Un acompte de 30% est généralement requis à l'inscription. Contactez-nous pour connaître les modalités selon votre formation.",
      },
      {
        q: "Y a-t-il des bourses ou réductions disponibles ?",
        a: "Nous proposons des réductions pour les inscriptions anticipées (jusqu'à 20%), les groupes familiaux (2ème membre -15%), et les demandeurs d'emploi sur justificatif. Contactez notre équipe pour discuter de votre situation.",
      },
      {
        q: "La formation est-elle remboursable en cas d'abandon ?",
        a: "En cas d'abandon dans les 7 premiers jours, nous remboursons 80% des frais de formation. Au-delà, les frais déjà engagés ne sont pas remboursables, mais nous pouvons reporter votre inscription sur une session ultérieure.",
      },
    ],
  },
  {
    categorie: "Certifications",
    questions: [
      {
        q: "Les certifications sont-elles reconnues officiellement ?",
        a: "Oui. Nos certifications sont émises en partenariat avec l'OFPPT et des organismes certificateurs reconnus au niveau national. Les programmes LOREL PRO disposent d'accréditations permettant des équivalences en France et dans plusieurs pays d'Afrique.",
      },
      {
        q: "Comment se déroule l'examen de certification ?",
        a: "Selon la formation, l'examen comprend une ou plusieurs des modalités suivantes : QCM théorique, réalisation d'un projet pratique, et soutenance orale devant un jury professionnel. La date d'examen est communiquée 3 semaines à l'avance.",
      },
      {
        q: "Que se passe-t-il si on échoue à l'examen ?",
        a: "Vous disposez de deux sessions de rattrapage sans frais supplémentaires. Un accompagnement personnalisé est proposé entre les deux tentatives pour travailler les points faibles identifiés lors du premier examen.",
      },
      {
        q: "Peut-on partager son diplôme sur LinkedIn ?",
        a: "Oui, chaque diplôme est accompagné d'une version numérique avec un QR code de vérification. Un guide est fourni pour ajouter facilement votre certification à votre profil LinkedIn.",
      },
    ],
  },
  {
    categorie: "VAE",
    questions: [
      {
        q: "Qui peut bénéficier de la VAE ?",
        a: "Toute personne ayant au moins un an d'expérience professionnelle — salariée, bénévole ou indépendante — dans le domaine du diplôme visé. Aucun diplôme minimum n'est requis.",
      },
      {
        q: "Combien de temps dure une VAE ?",
        a: "Le processus complet dure entre 12 et 18 mois selon la complexité du dossier et les délais de l'organisme certificateur. Notre accompagnement accélère sensiblement ce délai en structurant efficacement votre dossier dès le début.",
      },
      {
        q: "Quel est le coût d'un accompagnement VAE ?",
        a: "Notre accompagnement VAE est proposé entre 5 000 et 15 000 DH selon le niveau du diplôme visé et l'intensité de l'accompagnement souhaité. Une consultation gratuite préalable permet d'évaluer précisément votre situation.",
      },
      {
        q: "Mon employeur peut-il financer ma VAE ?",
        a: "Oui, la VAE peut être prise en charge dans le cadre du plan de développement des compétences de votre entreprise. Nous vous aidons à monter le dossier de financement et à convaincre votre service RH.",
      },
    ],
  },
];

const ALL_CATEGORIES = ["Toutes", ...FAQ_DATA.map((c) => c.categorie)];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="font-body text-[13px] font-semibold text-text-primary group-hover:text-brand-blue transition-colors pr-4">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-text-muted shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="font-body text-sm text-text-secondary leading-relaxed pb-4">{a}</p>
      )}
    </div>
  );
}

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState("Toutes");
  const [query, setQuery] = useState("");
  const [waPrincipal, setWaPrincipal] = useState("");

  useEffect(() => {
    fetch("https://app.institutlorel.com/api/public/site-settings")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data?.whatsapp?.principal) setWaPrincipal(data.whatsapp.principal); })
      .catch(() => {});
  }, []);

  const filtered = FAQ_DATA.filter((cat) => {
    if (activeCategory !== "Toutes" && cat.categorie !== activeCategory) return false;
    if (!query.trim()) return true;
    return cat.questions.some(
      (q) =>
        q.q.toLowerCase().includes(query.toLowerCase()) ||
        q.a.toLowerCase().includes(query.toLowerCase())
    );
  }).map((cat) => {
    if (!query.trim()) return cat;
    return {
      ...cat,
      questions: cat.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(query.toLowerCase()) ||
          q.a.toLowerCase().includes(query.toLowerCase())
      ),
    };
  });

  return (
    <>
      <SiteHeader />

      {/* Hero */}
      <div className="bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/25 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,168,76,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.8) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <Container className="relative z-10 py-16 lg:py-20">
          <div className="flex items-center gap-2 font-body text-[11px] text-white/35 mb-6">
            <Link href="/" className="hover:text-white/60 transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <span className="text-white/60">FAQ</span>
          </div>
          <p className="font-body text-label-caps text-brand-gold mb-3">FAQ</p>
          <h1
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Questions fréquentes
          </h1>
          <p className="font-body text-white/60 text-base max-w-md">
            Tout ce que vous voulez savoir sur nos formations, certifications et services.
          </p>
        </Container>
      </div>

      {/* Search + Filter + Accordion */}
      <section className="bg-brand-cream py-12 lg:py-16">
        <Container>
          {/* Search */}
          <div className="max-w-lg mx-auto mb-8">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une question..."
              className="w-full font-body text-sm border border-gray-200 rounded-sm px-4 py-3 bg-white focus:outline-none focus:border-brand-blue transition-colors placeholder:text-text-muted"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-body text-xs font-semibold px-4 py-2 rounded-sm transition-colors ${
                  activeCategory === cat
                    ? "bg-brand-dark text-white"
                    : "bg-white text-text-secondary border border-gray-200 hover:border-brand-blue hover:text-brand-blue"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion categories */}
          <div className="max-w-2xl mx-auto space-y-8">
            {filtered.length === 0 || filtered.every((c) => c.questions.length === 0) ? (
              <p className="font-body text-sm text-text-muted text-center py-8">
                Aucune question trouvée pour cette recherche.
              </p>
            ) : (
              filtered.map((cat) =>
                cat.questions.length === 0 ? null : (
                  <div key={cat.categorie}>
                    <h2 className="font-display font-bold text-brand-dark text-xl mb-4">
                      {cat.categorie}
                    </h2>
                    <div className="bg-white rounded-xl shadow-card px-5 divide-y divide-gray-100">
                      {cat.questions.map((item, i) => (
                        <AccordionItem key={i} q={item.q} a={item.a} />
                      ))}
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white py-12 border-t border-gray-100">
        <Container className="text-center">
          <p className="font-display font-bold text-brand-dark text-xl mb-2">
            Vous ne trouvez pas votre réponse ?
          </p>
          <p className="font-body text-sm text-text-secondary mb-6">
            Notre équipe est disponible pour répondre à toutes vos questions personnalisées.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {waPrincipal && (
            <a
              href={`https://wa.me/${waPrincipal}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-dark font-body font-bold text-sm px-7 py-3 rounded-sm transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            )}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-gray-200 hover:border-brand-blue text-text-secondary hover:text-brand-blue font-body font-semibold text-sm px-7 py-3 rounded-sm transition-colors"
            >
              Formulaire de contact
            </Link>
          </div>
        </Container>
      </section>

      <SiteFooter />
    </>
  );
}
