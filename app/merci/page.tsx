import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";

export default function MerciPage() {
  return (
    <>
      <SiteHeader />
      <div className="bg-brand-cream min-h-[60vh] flex items-center">
        <Container>
          <div className="max-w-lg mx-auto text-center py-20">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1
              className="font-display font-bold text-brand-dark mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
            >
              Merci pour votre inscription !
            </h1>
            <p className="font-body text-text-secondary text-base leading-relaxed mb-8">
              Votre demande a bien été enregistrée. Si vous avez payé, votre place est confirmée.
              Un conseiller vous contactera sous 24h pour finaliser votre inscription.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-brand-blue hover:bg-brand-dark text-white font-body font-bold text-sm px-6 py-3 rounded-sm transition-colors"
              >
                Retour à l&apos;accueil
              </Link>
              <Link
                href="/formations"
                className="inline-flex items-center justify-center border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-body font-semibold text-sm px-6 py-3 rounded-sm transition-colors"
              >
                Voir les formations
              </Link>
            </div>
          </div>
        </Container>
      </div>
      <SiteFooter />
    </>
  );
}
