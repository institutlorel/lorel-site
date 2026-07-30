"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps } from "react";
import { LANGUE_DEFAUT, type Langue } from "@/lib/i18n/config";
import { localeHref } from "@/lib/i18n/href";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

// Drop-in replacement for next/link's <Link>: reads the current locale from
// the URL (via useParams) and prefixes internal hrefs accordingly, so a link
// clicked on /ar/... stays on /ar/..., and on the unprefixed fr pages stays
// unprefixed. Being "use client" itself, it works as a leaf inside both
// Server and Client parent components — no locale prop-drilling needed.
export function LocaleLink({ href, ...rest }: Props) {
  const params = useParams<{ locale?: string }>();
  const locale = (params?.locale as Langue | undefined) ?? LANGUE_DEFAUT;
  return <Link href={localeHref(href, locale)} {...rest} />;
}
