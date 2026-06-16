"use client";

import { useState } from "react";
import { X, ArrowRight } from "lucide-react";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-brand-navy border-b border-white/5 h-9 flex items-center relative z-50">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 w-full flex items-center justify-center gap-3">
        {/* Gold dot */}
        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />

        {/* Message */}
        <p className="font-body text-[12px] text-white/70 tracking-wide">
          Nouvelles sessions Janvier 2026 —{" "}
          <span className="text-white/90">Inscriptions ouvertes</span>
        </p>

        {/* CTA */}
        <a
          href="/formations"
          className="hidden sm:inline-flex items-center gap-1 font-body text-[11px] font-semibold text-brand-gold hover:text-brand-gold-light transition-colors duration-200 tracking-wide"
        >
          En savoir plus
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      {/* Dismiss */}
      <button
        onClick={() => setVisible(false)}
        aria-label="Fermer"
        className="absolute right-4 lg:right-10 p-1 text-white/30 hover:text-white/70 transition-colors duration-200"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
