import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, Tag, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { getArticles, getArticle, getSiteSettings } from "@/lib/data/platform-api";
import { Markdown } from "@/components/Markdown";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, articleJsonLd, SITE_URL } from "@/lib/seo";

export const revalidate = 300;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article introuvable" };
  return buildMetadata({
    title: article.metaTitle ?? article.title,
    description: article.metaDescription ?? article.excerpt,
    image: article.ogImage ?? (article.coverImage || undefined),
    path: `/blog/${slug}`,
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-MA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article, allArticles, { principal }] = await Promise.all([
    getArticle(slug),
    getArticles(),
    getSiteSettings(),
  ]);
  if (!article) notFound();

  const related = allArticles
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, 3);

  const waShareUrl = `https://wa.me/?text=${encodeURIComponent(
    article.title + " - " + SITE_URL + "/blog/" + slug
  )}`;
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    SITE_URL + "/blog/" + slug
  )}`;

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      <SiteHeader />

      {/* Hero */}
      <div className="bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/25 to-transparent" />
        <Container className="relative z-10 py-14 lg:py-18">
          <div className="flex items-center gap-2 font-body text-[11px] text-white/35 mb-6">
            <Link href="/" className="hover:text-white/60 transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white/60 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-white/60 truncate max-w-[180px]">{article.title}</span>
          </div>
          <span className="inline-block font-body text-[10px] font-bold uppercase tracking-widest bg-brand-gold text-brand-dark px-3 py-1 rounded-sm mb-4">
            {article.category}
          </span>
          <h1
            className="font-display font-bold text-white mb-6 max-w-3xl"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/50">
            <div>
              <p className="font-body text-sm font-semibold text-white/80">{article.author}</p>
            </div>
            <span className="font-body text-xs flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="font-body text-xs flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readingMinutes} min de lecture
            </span>
          </div>
        </Container>
      </div>

      {/* Cover Image */}
      {article.coverImage && (
        <div className="bg-brand-dark">
          <Container>
            <div className="relative max-h-80 overflow-hidden rounded-2xl">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full max-h-80 object-cover"
              />
            </div>
          </Container>
        </div>
      )}

      {/* Article Body */}
      <section className="bg-white py-12">
        <Container>
          <div className="max-w-2xl mx-auto">
            {article.content ? (
              <Markdown>{article.content}</Markdown>
            ) : (
              <p className="font-body text-base text-text-muted italic">
                Contenu non disponible.
              </p>
            )}

            {/* Share */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-4">
                Partager cet article
              </p>
              <div className="flex gap-3">
                <a
                  href={waShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm font-semibold bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-sm transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
                <a
                  href={fbShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm font-semibold bg-[#1877F2] hover:bg-[#0d65d9] text-white px-4 py-2.5 rounded-sm transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
              </div>
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                <Tag className="w-3.5 h-3.5 text-text-muted mt-1" />
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-xs text-text-muted border border-gray-200 px-2.5 py-1 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="bg-brand-cream py-12">
          <Container>
            <h2 className="font-display font-bold text-brand-dark text-2xl mb-8">
              Articles similaires
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
                >
                  <div className="relative h-36 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-brand-dark" />
                    {rel.coverImage && (
                      <img
                        src={rel.coverImage}
                        alt={rel.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-brand-dark text-[0.95rem] leading-snug mb-2 group-hover:text-brand-blue transition-colors">
                      {rel.title}
                    </h3>
                    <div className="flex items-center justify-between text-text-muted">
                      <span className="font-body text-[10px]">{formatDate(rel.publishedAt)}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-brand-gold transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <Container className="relative z-10 text-center">
          <p className="font-body text-label-caps text-brand-gold mb-4">COMMENCEZ MAINTENANT</p>
          <h2
            className="font-display font-bold text-white mb-5"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            Prêt à transformer votre carrière ?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {principal && (
              <a
                href={`https://wa.me/${principal}`}
                className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-dark font-body font-bold text-sm px-8 py-3.5 rounded-sm transition-colors"
              >
                WhatsApp — Réponse immédiate
              </a>
            )}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-white/30 hover:border-white/60 text-white font-body font-semibold text-sm px-8 py-3.5 rounded-sm transition-colors"
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
