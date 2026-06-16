import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { prenom, nom, telephone, email, formationId, cta, message, slug } = await req.json();
    if (!prenom || !nom || !telephone || !formationId) {
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
    }
    const r = await fetch(`${process.env.PLATFORM_API_URL}/api/public/inscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.PLATFORM_API_TOKEN}`,
      },
      cache: "no-store",
      body: JSON.stringify({
        prenom,
        nom,
        telephone,
        email,
        formationId,
        cta,
        message,
        successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/merci`,
        failureUrl: slug
          ? `${process.env.NEXT_PUBLIC_SITE_URL}/formations/${slug}?paiement=echec`
          : `${process.env.NEXT_PUBLIC_SITE_URL}/formations`,
      }),
    });
    const data = await r.json();
    return NextResponse.json(data, { status: r.status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur, réessayez." }, { status: 500 });
  }
}
