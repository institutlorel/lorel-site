import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { getFormations, CATEGORIES } from "@/lib/data/platform-api";
import { FormationsClientGrid } from "./FormationsClientGrid";

export const revalidate = 60;

export default async function FormationsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const formations = await getFormations(category ? { category } : undefined);
  const activeCategory = category ?? "";

  return (
    <>
      <SiteHeader />
      <main>
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
              <Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link>
              <span>/</span>
              <span className="text-white/60">Formations</span>
            </div>
            <h1
              className="font-display font-bold text-white leading-tight mb-4"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
            >
              {activeCategory
                ? (CATEGORIES.find((c) => c.key === activeCategory)?.label ?? "Nos Formations")
                : "Nos Formations"}
            </h1>
            <p className="font-body text-white/50 text-sm max-w-lg leading-relaxed">
              {formations.length > 0
                ? `Découvrez nos ${formations.length} formations professionnelles certifiées.`
                : "Explorez notre catalogue de formations professionnelles certifiées."}
            </p>
          </Container>
        </div>

        {/* Category navigation */}
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <Container>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3">
              <Link
                href="/formations"
                className={`font-body text-[12px] font-semibold px-4 py-1.5 rounded-full border whitespace-nowrap shrink-0 transition-all duration-200 ${
                  !activeCategory
                    ? "bg-brand-blue text-white border-brand-blue"
                    : "text-text-secondary border-gray-200 hover:border-brand-blue/40 hover:text-brand-blue"
                }`}
              >
                Toutes
              </Link>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.key}
                  href={cat.href}
                  className={`font-body text-[12px] font-semibold px-4 py-1.5 rounded-full border whitespace-nowrap shrink-0 transition-all duration-200 ${
                    activeCategory === cat.key
                      ? "bg-brand-blue text-white border-brand-blue"
                      : "text-text-secondary border-gray-200 hover:border-brand-blue/40 hover:text-brand-blue"
                  }`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </Container>
        </div>

        <FormationsClientGrid formations={formations} />
      </main>
      <SiteFooter />
    </>
  );
}
