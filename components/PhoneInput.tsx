"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { COUNTRIES, getCountry, type CountryDial } from "@/lib/data/countries";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface Props {
  countryIso2: string;
  onCountryChange: (iso2: string) => void;
  localNumber: string;
  onLocalNumberChange: (v: string) => void;
  error?: string;
  inputClassName: string;
  dict: Dictionary;
}

function matches(country: CountryDial, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const digits = q.replace(/\D/g, "");
  return (
    country.name.toLowerCase().includes(q) ||
    country.dial.includes(digits) ||
    ("+" + country.dial).includes(q)
  );
}

export function PhoneInput({
  countryIso2,
  onCountryChange,
  localNumber,
  onLocalNumberChange,
  error,
  inputClassName,
  dict,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = getCountry(countryIso2);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [open]);

  const filtered = COUNTRIES.filter((c) => matches(c, query));

  function pick(c: CountryDial) {
    onCountryChange(c.iso2);
    setOpen(false);
  }

  let lastGroup: string | null = null;

  return (
    <div className="flex gap-2">
      <div ref={wrapRef} className="relative shrink-0">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="h-full flex items-center gap-1 border border-gray-200 rounded-lg px-2.5 py-2.5 bg-white hover:border-gray-300 transition-colors focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
          aria-label={dict.common.phoneCountryAriaLabel}
        >
          <span className="text-base leading-none">{selected.flag}</span>
          <span className="font-body text-sm text-text-primary whitespace-nowrap">
            +{selected.dial}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-text-muted transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="absolute z-50 top-full start-0 mt-1 w-72 max-w-[85vw] bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-80">
            <div className="p-2 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2.5 py-2 focus-within:border-brand-gold focus-within:ring-2 focus-within:ring-brand-gold/20">
                <Search className="w-3.5 h-3.5 text-text-muted shrink-0" />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={dict.common.phoneCountrySearchPlaceholder}
                  className="w-full font-body text-sm outline-none placeholder:text-text-muted"
                />
              </div>
            </div>
            <div className="overflow-y-auto flex-1">
              {filtered.length === 0 && (
                <p className="font-body text-xs text-text-muted text-center py-6">
                  {dict.common.phoneNoCountryFound}
                </p>
              )}
              {filtered.map((c) => {
                const showAfricaHeader = c.group === "africa" && lastGroup !== "africa";
                const showOtherHeader = c.group === "other" && lastGroup !== "other";
                lastGroup = c.group;
                return (
                  <div key={c.iso2}>
                    {showAfricaHeader && (
                      <p className="font-body text-[10px] font-bold text-text-muted uppercase tracking-wider px-3 pt-2.5 pb-1">
                        {dict.common.phoneRegionAfrica}
                      </p>
                    )}
                    {showOtherHeader && (
                      <p className="font-body text-[10px] font-bold text-text-muted uppercase tracking-wider px-3 pt-2.5 pb-1">
                        {dict.common.phoneRegionOther}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => pick(c)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-start hover:bg-brand-cream transition-colors ${
                        c.iso2 === selected.iso2 ? "bg-brand-gold/8" : ""
                      }`}
                    >
                      <span className="text-base leading-none shrink-0">{c.flag}</span>
                      <span className="font-body text-sm text-text-primary flex-1 min-w-0 truncate">
                        {c.name}
                      </span>
                      <span className="font-body text-xs text-text-muted shrink-0">+{c.dial}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <input
        type="tel"
        inputMode="tel"
        value={localNumber}
        onChange={(e) => onLocalNumberChange(e.target.value)}
        placeholder={dict.common.phoneLocalPlaceholder}
        className={inputClassName + " flex-1 min-w-0" + (error ? " !border-red-400 !ring-red-100" : "")}
      />
    </div>
  );
}
