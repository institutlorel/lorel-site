export interface Formateur {
  slug: string;
  prenom: string;
  nom: string;
  nomComplet: string;
  specialite: string;
  domaine: string;
  bio: string[];
  photo: string;
  experience: number;
  formationsCount: number;
  etudiantsCount: number;
  rating: number;
  accent: string;
  gradient: string;
  initials: string;
  formations: string[];
  certifications: string[];
  linkedinUrl?: string;
}

const BASE = "https://images.pexels.com/photos";

export const FORMATEURS: Formateur[] = [
  {
    slug: "youssef-kabbaj",
    prenom: "Youssef",
    nom: "Kabbaj",
    nomComplet: "Youssef Kabbaj",
    specialite: "Photographie & Arts Visuels",
    domaine: "Arts Visuels",
    bio: [
      "Youssef Kabbaj est photographe professionnel avec 14 ans d'expérience dans la presse internationale, la publicité et le reportage documentaire. Ancien lauréat de l'École Nationale des Beaux-Arts de Casablanca, il a travaillé pour des agences telles que Reuters et AFP avant de se consacrer à la pédagogie.",
      "Passionné de transmission, il développe une approche pédagogique qui allie technique rigoureuse et sensibilité artistique. Ses étudiants le reconnaissent pour sa capacité à révéler le regard unique de chaque apprenant. Depuis 2018, il forme plus de 80 étudiants par an à Institut Lorel.",
    ],
    photo: `${BASE}/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400`,
    experience: 14,
    formationsCount: 3,
    etudiantsCount: 420,
    rating: 4.9,
    accent: "#6B8FD4",
    gradient: "from-brand-blue to-brand-dark",
    initials: "YK",
    formations: ["photographie-professionnelle", "montage-video", "retouche-graphisme"],
    certifications: ["Adobe Certified Expert", "Certification Presse AFP"],
  },
  {
    slug: "sara-benali",
    prenom: "Sara",
    nom: "Benali",
    nomComplet: "Sara Benali",
    specialite: "Marketing Digital & Réseaux Sociaux",
    domaine: "Digital & Marketing",
    bio: [
      "Sara Benali est experte en marketing digital avec 10 ans d'expérience en agences digitales marocaines et européennes. Certifiée Google Ads et Meta Blueprint, elle a géré des campagnes pour des marques de référence au Maroc, en France et aux Émirats Arabes Unis.",
      "Elle enseigne le marketing digital avec une approche résolument pratique : ses étudiants travaillent sur de vrais comptes publicitaires dès la première semaine. Son taux de placement professionnel de ses diplômés dépasse 85%, ce qui en fait l'une des formatrices les plus appréciées de l'Institut.",
    ],
    photo: `${BASE}/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400`,
    experience: 10,
    formationsCount: 2,
    etudiantsCount: 380,
    rating: 4.9,
    accent: "#4CAF9D",
    gradient: "from-[#1a3a2a] to-brand-dark",
    initials: "SB",
    formations: ["marketing-digital", "reseaux-sociaux-contenu"],
    certifications: ["Google Ads Certified", "Meta Blueprint", "HubSpot Content Marketing"],
  },
  {
    slug: "amina-tazi",
    prenom: "Amina",
    nom: "Tazi",
    nomComplet: "Amina Tazi",
    specialite: "Esthétique & Soins du Visage",
    domaine: "Beauté & Esthétique",
    bio: [
      "Amina Tazi est esthéticienne diplômée avec 12 ans d'expérience dans des instituts de beauté haut de gamme à Casablanca, Paris et Dubaï. Elle se spécialise dans les soins du visage, le maquillage professionnel et les techniques de conseil en image.",
      "Reconnue pour sa pédagogie bienveillante et ses techniques innovantes, Amina a formé plus de 200 esthéticiennes professionnelles qui exercent aujourd'hui au Maroc et à l'international. Elle est membre du jury de plusieurs concours d'esthétique professionnelle.",
    ],
    photo: `${BASE}/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400`,
    experience: 12,
    formationsCount: 2,
    etudiantsCount: 260,
    rating: 4.8,
    accent: "#E07A9B",
    gradient: "from-[#3a1a2a] to-brand-dark",
    initials: "AT",
    formations: ["esthetique-soins", "maquillage-professionnel"],
    certifications: ["CIDESCO International", "ITEC Beauty Therapy"],
  },
  {
    slug: "hassan-idrissi",
    prenom: "Hassan",
    nom: "Idrissi",
    nomComplet: "Hassan Idrissi",
    specialite: "Comptabilité & Gestion PME",
    domaine: "Finance & Gestion",
    bio: [
      "Hassan Idrissi est expert-comptable diplômé et consultant financier avec 16 ans d'expérience auprès de PME et ETI marocaines. Ancien directeur financier d'un groupe industriel de Casablanca, il connaît intimement les réalités comptables et fiscales du marché marocain.",
      "Sa pédagogie s'appuie sur des cas réels tirés de ses missions de conseil : factures, bilans, situations d'entreprise authentiques. Ses étudiants apprécient la dimension opérationnelle immédiate de ses enseignements, qui leur permettent d'être pleinement opérationnels dès leur premier poste.",
    ],
    photo: `${BASE}/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400`,
    experience: 16,
    formationsCount: 2,
    etudiantsCount: 310,
    rating: 4.9,
    accent: "#5BA85B",
    gradient: "from-[#0a2a1a] to-brand-dark",
    initials: "HI",
    formations: ["comptabilite-gestion", "gestion-ressources-humaines"],
    certifications: ["Expert-Comptable DPLE", "CPA International"],
  },
  {
    slug: "leila-chakraoui",
    prenom: "Leila",
    nom: "Chakraoui",
    nomComplet: "Leila Chakraoui",
    specialite: "Mode & Stylisme",
    domaine: "Mode & Stylisme",
    bio: [
      "Leila Chakraoui est styliste de mode avec 11 ans d'expérience dans la haute couture et le prêt-à-porter. Après des études à l'Institut Français de la Mode à Paris, elle a collaboré avec plusieurs créateurs marocains de renom et dirigé sa propre ligne de prêt-à-porter pendant 5 ans.",
      "Son enseignement couvre la création de collection, le stylisme personnel, le conseil en image et les tendances mode internationales vues sous l'angle du marché marocain et africain. Ses étudiants réalisent régulièrement des défilés professionnels organisés par l'Institut.",
    ],
    photo: `${BASE}/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400`,
    experience: 11,
    formationsCount: 1,
    etudiantsCount: 140,
    rating: 4.8,
    accent: "#9B6BD4",
    gradient: "from-[#4a1a6a] to-brand-dark",
    initials: "LC",
    formations: ["stylisme-mode"],
    certifications: ["Institut Français de la Mode", "Styliste Certifié ESMOD"],
  },
  {
    slug: "omar-benali",
    prenom: "Omar",
    nom: "Benali",
    nomComplet: "Omar Benali",
    specialite: "Entrepreneuriat & Gestion de Projet",
    domaine: "Développement Personnel",
    bio: [
      "Omar Benali est serial entrepreneur et mentor. Fondateur de trois startups marocaines dont l'une a été rachetée par un groupe français, il est aujourd'hui consultant en développement d'entreprise et formateur spécialisé en entrepreneuriat et gestion de projet.",
      "Son enseignement est résolument orienté action : business model canvas, lean startup, pitching, levée de fonds, et gestion opérationnelle sont abordés avec des cas concrets issus de sa propre expérience. Il anime également des masterclasses pour le réseau des entrepreneurs Lorel.",
    ],
    photo: `${BASE}/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=400`,
    experience: 13,
    formationsCount: 1,
    etudiantsCount: 180,
    rating: 4.7,
    accent: "#E0A04C",
    gradient: "from-[#2a1a0a] to-brand-dark",
    initials: "OB",
    formations: ["entrepreneuriat-startup"],
    certifications: ["MBA HEC Paris", "PMP Project Management Professional"],
  },
  {
    slug: "nadia-el-ouali",
    prenom: "Nadia",
    nom: "El Ouali",
    nomComplet: "Nadia El Ouali",
    specialite: "Communication & Leadership",
    domaine: "Développement Personnel",
    bio: [
      "Nadia El Ouali est coach certifiée et formatrice en communication interpersonnelle avec 9 ans d'expérience. Ancienne responsable RH d'un groupe bancaire marocain, elle s'est reconvertie dans la formation et le coaching professionnel après avoir obtenu sa certification ICF (International Coaching Federation).",
      "Elle enseigne la communication professionnelle, le leadership, la prise de parole en public et la gestion des conflits. Sa méthode combine la psychologie positive, les neurosciences de l'apprentissage et des exercices de mise en situation réels.",
    ],
    photo: `${BASE}/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=400`,
    experience: 9,
    formationsCount: 1,
    etudiantsCount: 220,
    rating: 4.8,
    accent: "#E07A9B",
    gradient: "from-[#3a0a2a] to-brand-dark",
    initials: "NE",
    formations: ["communication-leadership"],
    certifications: ["ICF Coach Certifié", "Praticien PNL"],
  },
  {
    slug: "karim-fassi",
    prenom: "Karim",
    nom: "Fassi",
    nomComplet: "Karim Fassi",
    specialite: "Design Graphique & Retouche",
    domaine: "Arts Visuels",
    bio: [
      "Karim Fassi est directeur artistique et designer graphique avec 10 ans d'expérience en agences créatives à Casablanca et Paris. Maîtrisant l'ensemble de la suite Adobe, il a travaillé pour des marques marocaines et internationales dans les secteurs du luxe, de la mode et de la communication institutionnelle.",
      "Sa formation en design graphique et retouche photo est reconnue pour sa rigueur technique et sa dimension créative. Karim encourage ses étudiants à développer leur identité visuelle propre tout en maîtrisant les standards professionnels du secteur.",
    ],
    photo: `${BASE}/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400`,
    experience: 10,
    formationsCount: 1,
    etudiantsCount: 195,
    rating: 4.8,
    accent: "#6B8FD4",
    gradient: "from-[#0a1a3a] to-brand-dark",
    initials: "KF",
    formations: ["retouche-graphisme"],
    certifications: ["Adobe Certified Expert Photoshop", "Adobe Certified Expert Illustrator"],
  },
];

export function getFormateurBySlug(slug: string): Formateur | undefined {
  return FORMATEURS.find((f) => f.slug === slug);
}
