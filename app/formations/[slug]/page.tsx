import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getFormations, getFormation, getRelatedFormations, getSiteSettings } from "@/lib/data/platform-api";
import { FormationDetailClient } from "./FormationDetailClient";

export const revalidate = 60;

export async function generateStaticParams() {
  const formations = await getFormations();
  return formations.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const formation = await getFormation(slug);
  if (!formation) return { title: "Formation introuvable | Institut Lorel" };
  return {
    title: formation.seoTitle
      ? `${formation.seoTitle} | Institut Lorel`
      : `${formation.titreFr} | Institut Lorel`,
    description: formation.seoDescription ?? formation.shortDesc,
  };
}

export default async function FormationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const formation = await getFormation(slug);
  if (!formation) notFound();

  const related = await getRelatedFormations(slug, formation.category);
  const { principal } = await getSiteSettings();

  return (
    <>
      <SiteHeader />
      <main>
        <FormationDetailClient formation={formation} related={related} waNumber={principal} />
      </main>
      <SiteFooter />
    </>
  );
}
