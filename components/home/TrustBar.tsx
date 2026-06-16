"use client";

const PARTNERS = [
  "OFPPT",
  "CCIS",
  "ANAPEC",
  "CGEM",
  "Microsoft",
  "Google",
];

export function TrustBar() {
  // Duplicate for seamless marquee loop
  const items = [...PARTNERS, ...PARTNERS];

  return (
    <div className="bg-white border-y border-gray-100 py-5 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 mb-4">
        <p className="font-body text-label-caps text-text-muted text-center">
          Ils nous font confiance
        </p>
      </div>

      {/* Desktop: static row */}
      <div className="hidden lg:flex items-center justify-center gap-12 px-10">
        {PARTNERS.map((p) => (
          <span
            key={p}
            className="font-body text-lg font-bold text-text-primary opacity-30 hover:opacity-60 transition-opacity duration-200 cursor-default tracking-wide select-none"
          >
            {p}
          </span>
        ))}
      </div>

      {/* Mobile: marquee */}
      <div className="lg:hidden relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {items.map((p, i) => (
            <span
              key={i}
              className="inline-block font-body text-base font-bold text-text-primary opacity-30 mx-8 tracking-wide select-none"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
