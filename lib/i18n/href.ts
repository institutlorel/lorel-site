import { LANGUES, LANGUE_DEFAUT, type Langue } from "./config";

// fr (default) has no prefix; ar/en get /${locale} prepended. path="/" -> "/ar", not "/ar/".
export function localeHref(path: string, locale: Langue): string {
  if (locale === LANGUE_DEFAUT) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

// Reverse of the above: strips a leading /fr, /ar or /en prefix so the
// remaining path can be re-prefixed for a different target locale.
export function stripLocaleFromPathname(pathname: string): string {
  for (const locale of LANGUES) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(`/${locale}`.length);
  }
  return pathname;
}
