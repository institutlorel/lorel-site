"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { SiteArticle } from "@/lib/data/platform-api";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-MA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ArticleCard({ article, index }: { article: SiteArticle; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link href={`/blog/${article.slug}`} className="block">
        <div className="relative h-48 rounded-xl overflow-hidden mb-5">
          {article.coverImage ? (
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-blue to-brand-dark" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="font-body text-[10px] font-bold text-brand-dark bg-brand-gold px-2.5 py-1 rounded-full uppercase tracking-wide">
              {article.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span className="font-body text-[11px] text-text-muted">{formatDate(article.publishedAt)}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="font-body text-[11px] text-text-muted">{article.readingMinutes} min de lecture</span>
        </div>

        <h3 className="font-display text-[18px] font-semibold text-brand-blue group-hover:text-brand-gold transition-colors duration-200 leading-snug mb-3">
          {article.title}
        </h3>

        <p className="font-body text-sm text-text-secondary leading-relaxed mb-5 line-clamp-3">
          {article.excerpt}
        </p>

        <span className="inline-flex items-center gap-2 font-body text-xs font-semibold text-brand-blue group-hover:text-brand-gold transition-colors duration-200">
          Lire l&apos;article
          <span className="w-4 h-px bg-current group-hover:w-6 transition-all duration-200 inline-block" />
        </span>
      </Link>
    </motion.div>
  );
}

interface Props {
  articles: SiteArticle[];
}

export function BlogPreview({ articles }: Props) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  if (articles.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white">
      <Container>
        <div ref={headerRef} className="flex items-end justify-between mb-10 sm:mb-12 pb-6 border-b border-gray-100 flex-wrap gap-4">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              className="font-body text-label-caps text-brand-gold mb-3"
            >
              BLOG
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-display font-bold text-brand-blue leading-tight"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)" }}
            >
              Conseils &amp; Ressources
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/blog"
              className="group flex items-center gap-2 font-body text-sm font-semibold text-text-muted hover:text-brand-blue transition-colors"
            >
              Voir tout
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {articles.map((a, i) => (
            <ArticleCard key={a.slug} article={a} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
