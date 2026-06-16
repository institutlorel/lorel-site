"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { ARTICLES, CATEGORIES_BLOG } from "@/lib/data/blog";

const CATEGORY_COLORS: Record<string, string> = {
  Carrière: "bg-blue-100 text-blue-700",
  VAE: "bg-amber-100 text-amber-700",
  Beauté: "bg-pink-100 text-pink-700",
  Digital: "bg-purple-100 text-purple-700",
  Entrepreneuriat: "bg-emerald-100 text-emerald-700",
  Formation: "bg-teal-100 text-teal-700",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-MA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Tous");

  const featured = ARTICLES.find((a) => a.featured) ?? ARTICLES[0];

  const displayArticles = ARTICLES.filter((a) => {
    if (a.slug === featured.slug) return false;
    if (activeCategory === "Tous") return true;
    return a.categorie === activeCategory;
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
            <span className="text-white/60">Blog</span>
          </div>
          <p className="font-body text-label-caps text-brand-gold mb-3">BLOG & RESSOURCES</p>
          <h1
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Blog &amp; Ressources
          </h1>
          <p className="font-body text-white/60 text-base max-w-xl">
            Conseils carrière, guides formation et actualités du monde professionnel au Maroc.
          </p>
        </Container>
      </div>

      {/* Featured Article */}
      <section className="bg-white py-12">
        <Container>
          <Link
            href={`/blog/${featured.slug}`}
            className="group lg:grid lg:grid-cols-2 gap-8 items-center bg-brand-cream rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow block"
          >
            <div className="relative h-64 lg:h-80 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-brand-dark" />
              <img
                src={featured.image}
                alt={featured.titre}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-body text-[10px] font-bold uppercase tracking-widest bg-brand-gold text-brand-dark px-2.5 py-1 rounded-sm">
                  À la une
                </span>
                <span
                  className={`font-body text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm ${CATEGORY_COLORS[featured.categorie] ?? "bg-gray-100 text-gray-600"}`}
                >
                  {featured.categorie}
                </span>
              </div>
              <h2
                className="font-display font-bold text-brand-dark mb-3 group-hover:text-brand-blue transition-colors"
                style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)" }}
              >
                {featured.titre}
              </h2>
              <p className="font-body text-sm text-text-secondary leading-relaxed mb-4">
                {featured.extrait}
              </p>
              <div className="flex items-center gap-4 text-text-muted">
                <span className="font-body text-xs flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(featured.date)}
                </span>
                <span className="font-body text-xs flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featured.readTime} min
                </span>
              </div>
            </div>
          </Link>
        </Container>
      </section>

      {/* Category Filter + Grid */}
      <section className="bg-brand-cream py-12">
        <Container>
          {/* Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES_BLOG.map((cat) => (
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

          {/* Grid */}
          {displayArticles.length === 0 ? (
            <p className="font-body text-sm text-text-muted text-center py-12">
              Aucun article dans cette catégorie pour le moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-brand-dark" />
                    <img
                      src={article.image}
                      alt={article.titre}
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`font-body text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm ${CATEGORY_COLORS[article.categorie] ?? "bg-gray-100 text-gray-600"}`}
                      >
                        {article.categorie}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-display font-bold text-brand-dark text-[1.05rem] leading-tight mb-2 group-hover:text-brand-blue transition-colors">
                      {article.titre}
                    </h3>
                    <p className="font-body text-xs text-text-secondary leading-relaxed mb-4 line-clamp-2">
                      {article.extrait}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <p className="font-body text-[11px] font-semibold text-text-primary">
                          {article.auteur}
                        </p>
                        <div className="flex items-center gap-2 text-text-muted mt-0.5">
                          <span className="font-body text-[10px]">{formatDate(article.date)}</span>
                          <span className="text-[10px]">·</span>
                          <span className="font-body text-[10px] flex items-center gap-0.5">
                            <Clock className="w-2.5 h-2.5" />
                            {article.readTime} min
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-brand-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Contribute CTA */}
      <section className="bg-white py-12 border-t border-gray-100">
        <Container className="text-center">
          <p className="font-display font-bold text-brand-dark text-xl mb-2">
            Vous souhaitez contribuer ?
          </p>
          <p className="font-body text-sm text-text-secondary mb-6">
            Partagez votre expertise avec notre communauté de professionnels.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-dark font-body font-bold text-sm px-7 py-3 rounded-sm transition-colors"
          >
            Proposer un article
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </Container>
      </section>

      <SiteFooter />
    </>
  );
}
