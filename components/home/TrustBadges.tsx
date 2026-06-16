import { BadgeCheck, Award, MapPin, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";

const BADGES = [
  {
    icon: BadgeCheck,
    label: "Certifications reconnues",
    sub: "OFPPT & organismes nationaux",
  },
  {
    icon: Award,
    label: "15 ans d'expérience",
    sub: "Formateurs en activité",
  },
  {
    icon: MapPin,
    label: "2 centres physiques",
    sub: "Marrakech & Casablanca",
  },
  {
    icon: ShieldCheck,
    label: "Paiement sécurisé",
    sub: "Facilités & versements",
  },
];

export function TrustBadges() {
  return (
    <section className="bg-brand-cream border-y border-brand-gold/15">
      <Container className="py-5 sm:py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {BADGES.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/15 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-gold" />
              </div>
              <div className="min-w-0">
                <div className="font-body text-[11px] sm:text-[12px] font-semibold text-text-primary leading-tight">
                  {label}
                </div>
                <div className="font-body text-[10px] text-text-muted mt-0.5 leading-tight">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
