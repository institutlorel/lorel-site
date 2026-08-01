import { getFormations } from "@/lib/data/platform-api";
import { FormationsPopulaires } from "./FormationsPopulaires";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export async function FormationsPopulairesWrapper({ dict }: { dict: Dictionary }) {
  const all = await getFormations();
  const top6 = [...all].sort((a, b) => b.rating - a.rating).slice(0, 6);
  return <FormationsPopulaires formations={top6} dict={dict} />;
}
