"use client";

import { useState } from "react";
import { LocaleLink as Link } from "@/components/LocaleLink";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface FaqItem { q: string; a: string; }
interface FaqCategory { categorie: string; questions: FaqItem[]; }

function buildFaqData(dict: Dictionary): FaqCategory[] {
  return [
    { categorie: dict.faqPage.categories.inscriptions, questions: dict.faqPage.questions.inscriptions },
    { categorie: dict.faqPage.categories.formations, questions: dict.faqPage.questions.formations },
    { categorie: dict.faqPage.categories.paiement, questions: dict.faqPage.questions.paiement },
    { categorie: dict.faqPage.categories.certifications, questions: dict.faqPage.questions.certifications },
    { categorie: dict.faqPage.categories.vae, questions: dict.faqPage.questions.vae },
  ];
}

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between py-4 text-start group">
        <span className="font-body text-[13px] font-semibold text-text-primary group-hover:text-brand-blue transition-colors pe-4">{q}</span>
        <ChevronDown className={`w-4 h-4 text-text-muted shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="font-body text-sm text-text-secondary leading-relaxed pb-4">{a}</p>}
    </div>
  );
}

interface Props {
  waNumber: string;
  dict: Dictionary;
}

export function FaqClient({ waNumber, dict }: Props) {
  const FAQ_DATA = buildFaqData(dict);
  const ALL_CATEGORIES = [dict.faqPage.categories.toutes, ...FAQ_DATA.map((c) => c.categorie)];
  const [activeCategory, setActiveCategory] = useState(dict.faqPage.categories.toutes);
  const [query, setQuery] = useState("");

  const filtered = FAQ_DATA.filter((cat) => {
    if (activeCategory !== dict.faqPage.categories.toutes && cat.categorie !== activeCategory) return false;
    if (!query.trim()) return true;
    return cat.questions.some((q) => q.q.toLowerCase().includes(query.toLowerCase()) || q.a.toLowerCase().includes(query.toLowerCase()));
  }).map((cat) => {
    if (!query.trim()) return cat;
    return {
      ...cat,
      questions: cat.questions.filter((q) => q.q.toLowerCase().includes(query.toLowerCase()) || q.a.toLowerCase().includes(query.toLowerCase())),
    };
  });

  return (
    <>
      <div className="bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/25 to-transparent" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.8) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
        <Container className="relative z-10 py-16 lg:py-20">
          <div className="flex items-center gap-2 font-body text-[11px] text-white/35 mb-6">
            <Link href="/" className="hover:text-white/60 transition-colors">{dict.common.accueil}</Link>
            <span>/</span>
            <span className="text-white/60">{dict.faqPage.breadcrumbLabel}</span>
          </div>
          <p className="font-body text-label-caps text-brand-gold mb-3">{dict.faqPage.hero.badge}</p>
          <h1 className="font-display font-bold text-white mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>{dict.faqPage.hero.titre}</h1>
          <p className="font-body text-white/60 text-base max-w-md">{dict.faqPage.hero.sousTitre}</p>
        </Container>
      </div>

      <section className="bg-brand-cream py-12 lg:py-16">
        <Container>
          <div className="max-w-lg mx-auto mb-8">
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={dict.faqPage.search.placeholder} className="w-full font-body text-sm border border-gray-200 rounded-sm px-4 py-3 bg-white focus:outline-none focus:border-brand-blue transition-colors placeholder:text-text-muted" />
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {ALL_CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`font-body text-xs font-semibold px-4 py-2 rounded-sm transition-colors ${activeCategory === cat ? "bg-brand-dark text-white" : "bg-white text-text-secondary border border-gray-200 hover:border-brand-blue hover:text-brand-blue"}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="max-w-2xl mx-auto space-y-8">
            {filtered.length === 0 || filtered.every((c) => c.questions.length === 0) ? (
              <p className="font-body text-sm text-text-muted text-center py-8">{dict.faqPage.aucunResultat}</p>
            ) : (
              filtered.map((cat) =>
                cat.questions.length === 0 ? null : (
                  <div key={cat.categorie}>
                    <h2 className="font-display font-bold text-brand-dark text-xl mb-4">{cat.categorie}</h2>
                    <div className="bg-white rounded-xl shadow-card px-5 divide-y divide-gray-100">
                      {cat.questions.map((item, i) => <AccordionItem key={i} q={item.q} a={item.a} />)}
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 border-t border-gray-100">
        <Container className="text-center">
          <p className="font-display font-bold text-brand-dark text-xl mb-2">{dict.faqPage.cta.titre}</p>
          <p className="font-body text-sm text-text-secondary mb-6">{dict.faqPage.cta.sousTitre}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {waNumber && (
              <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-dark font-body font-bold text-sm px-7 py-3 rounded-sm transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {dict.faqPage.cta.whatsapp}
              </a>
            )}
            <Link href="/contact" className="inline-flex items-center justify-center border border-gray-200 hover:border-brand-blue text-text-secondary hover:text-brand-blue font-body font-semibold text-sm px-7 py-3 rounded-sm transition-colors">
              {dict.common.formulaireContact}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
