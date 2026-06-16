import { getFormations } from "@/lib/data/platform-api";
import { FormationsPopulaires } from "./FormationsPopulaires";

export async function FormationsPopulairesWrapper() {
  const all = await getFormations();
  const top6 = [...all].sort((a, b) => b.rating - a.rating).slice(0, 6);
  return <FormationsPopulaires formations={top6} />;
}
