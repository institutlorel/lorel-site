// Next 16 renamed `middleware.ts` to `proxy.ts` (same mechanism, new file/export
// name — see node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md).
//
// Locale routing, "as-needed" prefix strategy:
//   - fr (default): no prefix — "/formations" serves app/[locale]/formations with locale="fr"
//   - ar, en: prefixed — "/ar/formations", "/en/formations" resolve natively via the
//     [locale] dynamic segment, no rewrite needed
//   - a bare "/fr/..." request is also passed through unchanged (rather than double-rewritten)
//     so it never 404s, even though it's not the canonical unprefixed URL
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LANGUES, LANGUE_DEFAUT } from "@/lib/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocalePrefix = LANGUES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocalePrefix) return NextResponse.next();

  // No recognized locale prefix → rewrite internally to the default locale (fr)
  // so it resolves under app/[locale]/*, while the visible URL stays unprefixed.
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${LANGUE_DEFAUT}` : `/${LANGUE_DEFAUT}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Skip API routes, Next internals, and any path with a file extension
    // (favicon.ico, icon.png, sitemap.xml, robots.txt, /logo-symbol.png, etc.)
    "/((?!api/|_next/static/|_next/image/|.*\\..*).*)",
  ],
};
