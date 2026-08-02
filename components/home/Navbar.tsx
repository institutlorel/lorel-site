"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { LocaleLink as Link } from "@/components/LocaleLink";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  MonitorPlay,
  Users,
  Award,
  BookOpen,
  Search,
  Globe,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { LANGUES as LOCALES, LANGUE_INFO, LANGUE_DEFAUT, type Langue } from "@/lib/i18n/config";
import { localeHref, stripLocaleFromPathname } from "@/lib/i18n/href";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function Navbar({ dict }: { dict: Dictionary }) {
  const CATEGORIES = [
    { key: "en-ligne", ...dict.nav.categories.enLigne, icon: MonitorPlay },
    { key: "continue", ...dict.nav.categories.continue, icon: Users },
    { key: "diplomante", ...dict.nav.categories.diplomante, icon: Award },
    { key: "individuel", ...dict.nav.categories.individuel, icon: Sparkles },
    { key: "vae", ...dict.nav.categories.vae, icon: BookOpen },
    { key: "consulting", ...dict.nav.categories.consulting, icon: TrendingUp },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const routeParams = useParams<{ locale?: string }>();
  const activeLang = (routeParams?.locale as Langue | undefined) ?? LANGUE_DEFAUT;

  const NAV_LINKS = [
    { label: dict.nav.formations, href: "/formations" },
    { label: dict.nav.services, href: "/services" },
    { label: dict.nav.blog, href: "/blog" },
    { label: dict.nav.about, href: "/about" },
  ];

  function switchLocale(target: Langue) {
    const bare = stripLocaleFromPathname(pathname);
    // Read the query string at click-time (not via useSearchParams, which would
    // force this whole prerendered page to bail out to client-side rendering).
    const qs = typeof window !== "undefined" ? window.location.search : "";
    router.push(localeHref(bare, target) + qs);
    setLangOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 60);
    onScroll(); // run once on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // STATE 1 (top, over dark hero): transparent bg, white text
  // STATE 2 (scrolled, over any section): solid white bg, dark text
  const navLink = scrolled
    ? "text-brand-dark/75 hover:text-brand-gold"
    : "text-white/80 hover:text-white";
  const iconCls = scrolled
    ? "text-brand-dark/60 hover:text-brand-dark"
    : "text-white/60 hover:text-white";
  const logoText = scrolled ? "text-brand-blue" : "text-white";
  const ctaCls = scrolled
    ? "border-brand-blue/60 hover:border-brand-gold text-brand-blue hover:text-brand-gold hover:bg-brand-gold/5"
    : "border-brand-gold/60 hover:border-brand-gold text-brand-gold hover:bg-brand-gold/8";
  const hamburgerCls = scrolled ? "text-brand-dark" : "text-white";

  return (
    <nav
      className={`sticky top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-5 lg:px-10 h-16 flex items-center justify-between gap-4">
        {/* Logo — gold "L" box is always gold */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <Image
            src="/logo-symbol.png"
            alt="Institut Lorel"
            width={40}
            height={40}
            className="w-10 h-10 object-contain shrink-0"
            priority
          />
          <div className="leading-none">
            <div
              className={`font-display font-bold tracking-[0.14em] text-[13px] uppercase transition-colors duration-300 ${logoText}`}
            >
              Lorel
            </div>
            <div className="font-body text-[9px] text-brand-gold/50 tracking-[0.22em] uppercase mt-0.5">
              Institut
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7 flex-1 justify-center">
          {/* Domaines mega menu */}
          <div ref={megaRef} className="relative">
            <button
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
              className={`flex items-center gap-1 font-body text-[13px] font-medium transition-colors duration-200 tracking-wide py-5 ${navLink}`}
            >
              {dict.nav.domaines}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {megaOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[580px] bg-white rounded-xl shadow-card-hover border border-gray-100 overflow-hidden"
                >
                  <div className="grid grid-cols-3 gap-0 p-4">
                    <div className="col-span-2 grid grid-cols-2 gap-1 pe-4 border-e border-gray-100">
                      {CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <Link
                            key={cat.key}
                            href={`/formations?category=${cat.key}`}
                            className="group/item flex items-center gap-3 p-3 rounded-lg hover:bg-brand-cream transition-colors duration-150"
                          >
                            <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center shrink-0 group-hover/item:bg-brand-gold/20 transition-colors duration-200">
                              <Icon className="w-4 h-4 text-brand-gold" />
                            </div>
                            <div>
                              <div className="font-body text-[12px] font-semibold text-text-primary group-hover/item:text-brand-blue transition-colors">
                                {cat.label}
                              </div>
                              <div className="font-body text-[11px] text-text-muted">{cat.desc}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="ps-4 flex flex-col justify-center">
                      <Link
                        href="/formations"
                        className="group/item flex flex-col gap-3 p-4 rounded-xl bg-brand-gold/10 hover:bg-brand-gold/20 transition-colors duration-200 border border-brand-gold/20 hover:border-brand-gold/40"
                      >
                        <div className="w-8 h-8 rounded-lg bg-brand-gold flex items-center justify-center">
                          <ArrowRight className="w-4 h-4 text-brand-dark" />
                        </div>
                        <div>
                          <div className="font-display text-sm font-semibold text-brand-blue leading-snug">
                            {dict.nav.voirToutesLesFormations}
                          </div>
                          <div className="font-body text-[11px] text-text-secondary mt-1">{dict.nav.toutLeCatalogue}</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-body text-[13px] font-medium transition-colors duration-200 tracking-wide ${navLink}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-1">
          <button aria-label={dict.nav.rechercher} className={`p-2.5 transition-colors duration-200 ${iconCls}`}>
            <Search className="w-4 h-4" />
          </button>

          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className={`flex items-center gap-1.5 px-2.5 py-2 transition-colors duration-200 ${iconCls}`}
            >
              <Globe className="w-4 h-4" />
              <span className="font-body text-[11px] font-semibold tracking-wide">
                {activeLang.toUpperCase()}
              </span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute end-0 top-full mt-1 w-36 bg-brand-dark border border-white/10 rounded-lg overflow-hidden shadow-blue"
                >
                  {LOCALES.map((code) => (
                    <button
                      key={code}
                      onClick={() => switchLocale(code)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 font-body text-[12px] transition-colors duration-150 ${
                        activeLang === code
                          ? "text-brand-gold bg-white/5"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{LANGUE_INFO[code].nom}</span>
                      <span className="text-[10px] font-bold tracking-wide opacity-50">{code.toUpperCase()}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="https://app.institutlorel.com/login"
            className={`px-2.5 py-2 font-body text-[12px] font-semibold transition-colors duration-200 ${navLink}`}
          >
            {dict.nav.seConnecter}
          </a>

          <Link
            href="/formations"
            className={`ms-2 inline-flex items-center border text-[12px] font-body font-semibold px-5 py-2 rounded-sm transition-all duration-200 tracking-wide ${ctaCls}`}
          >
            {dict.nav.sInscrire}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className={`lg:hidden p-2.5 transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center ${hamburgerCls}`}
          aria-label={dict.nav.menu}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile full menu — always solid dark */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-brand-dark border-t border-white/8 overflow-hidden"
          >
            <div className="px-5 py-5 flex flex-col gap-0.5">
              <p className="font-body text-label-caps text-brand-gold/50 mb-3 mt-1">{dict.nav.formationsSection}</p>
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.key}
                    href={`/formations?category=${cat.key}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 py-3 min-h-[44px] text-white/60 hover:text-white border-b border-white/5 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-brand-gold/60 shrink-0" />
                    <span className="font-body text-sm">{cat.label}</span>
                    <span className="ms-auto font-body text-[11px] text-white/25">{cat.desc}</span>
                  </Link>
                );
              })}

              <p className="font-body text-label-caps text-brand-gold/50 mb-2 mt-5">{dict.nav.pagesSection}</p>
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-3 min-h-[44px] text-white/60 hover:text-white border-b border-white/5 font-body text-sm transition-colors"
                >
                  {l.label}
                  <ArrowRight className="w-3.5 h-3.5 text-brand-gold/30" />
                </Link>
              ))}

              <div className="flex items-center gap-2 mt-5">
                {LOCALES.map((code) => (
                  <button
                    key={code}
                    onClick={() => { switchLocale(code); setMenuOpen(false); }}
                    className={`flex-1 min-h-[40px] rounded-sm font-body text-[12px] font-semibold text-center transition-colors ${
                      activeLang === code
                        ? "bg-brand-gold/15 text-brand-gold"
                        : "text-white/50 border border-white/10 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {LANGUE_INFO[code].nom}
                  </button>
                ))}
              </div>

              <a
                href="https://app.institutlorel.com/login"
                onClick={() => setMenuOpen(false)}
                className="mt-3 min-h-[44px] flex items-center justify-center text-center text-white/60 hover:text-white font-body text-sm transition-colors"
              >
                {dict.nav.seConnecter}
              </a>

              <Link
                href="/formations"
                onClick={() => setMenuOpen(false)}
                className="mt-2 min-h-[48px] flex items-center justify-center text-center border border-brand-gold text-brand-gold font-body font-semibold text-sm py-3.5 rounded-sm"
              >
                {dict.common.sInscrireNow}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
