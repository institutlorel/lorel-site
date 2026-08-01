"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { X, ArrowRight } from "lucide-react";
import { LANGUE_DEFAUT, type Langue } from "@/lib/i18n/config";
import { localeHref } from "@/lib/i18n/href";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function AnnouncementBar({ dict }: { dict: Dictionary }) {
  const [visible, setVisible] = useState(true);
  const params = useParams<{ locale?: string }>();
  const locale = (params?.locale as Langue | undefined) ?? LANGUE_DEFAUT;

  if (!visible) return null;

  return (
    <div className="bg-brand-navy border-b border-white/5 h-9 flex items-center relative z-50">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 w-full flex items-center justify-center gap-3">
        {/* Gold dot */}
        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />

        {/* Message */}
        <p className="font-body text-[12px] text-white/70 tracking-wide">
          {dict.announcementBar.message}{" "}
          <span className="text-white/90">{dict.announcementBar.messageHighlight}</span>
        </p>

        {/* CTA */}
        <a
          href={localeHref("/formations", locale)}
          className="hidden sm:inline-flex items-center gap-1 font-body text-[11px] font-semibold text-brand-gold hover:text-brand-gold-light transition-colors duration-200 tracking-wide"
        >
          {dict.announcementBar.cta}
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      {/* Dismiss */}
      <button
        onClick={() => setVisible(false)}
        aria-label={dict.announcementBar.fermer}
        className="absolute right-4 lg:right-10 p-1 text-white/30 hover:text-white/70 transition-colors duration-200"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
