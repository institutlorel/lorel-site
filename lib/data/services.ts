export interface ProcessusStep {
  numero: number;
  titre: string;
  desc: string;
}

export interface Service {
  slug: string;
  titre: string;
  titreCourt: string;
  type: string;
  shortDesc: string;
  description: string[];
  avantages: string[];
  processus: ProcessusStep[];
  image: string;
  gradient: string;
  accent: string;
  prix?: string;
  duree?: string;
  iconName: string;
  faq: { q: string; a: string }[];
}

export const SERVICES: Service[] = [
  {
    slug: "vae",
    titre: "Validation des Acquis de l'Expérience",
    titreCourt: "VAE",
    type: "Certification",
    shortDesc:
      "Transformez votre expérience professionnelle en diplôme reconnu sans reprendre les bancs de l'école.",
    description: [
      "La Validation des Acquis de l'Expérience (VAE) est un dispositif légal qui permet à toute personne ayant au moins un an d'expérience professionnelle d'obtenir une certification reconnue en faisant valider les compétences acquises au fil de sa carrière.",
      "À Institut Lorel, notre équipe spécialisée vous accompagne tout au long du parcours VAE : de l'étude de recevabilité de votre dossier jusqu'à la préparation de la soutenance devant le jury. Nous avons accompagné plus de 120 candidats à la VAE avec un taux de réussite de 87%.",
      "Que vous visiez un certificat professionnel, un brevet de technicien supérieur ou un diplôme universitaire, notre accompagnement personnalisé maximise vos chances de succès et réduit considérablement le temps nécessaire à l'obtention de votre qualification.",
    ],
    avantages: [
      "Obtenir un diplôme reconnu sans formation complète",
      "Valoriser vos années d'expérience professionnelle",
      "Évoluer dans votre carrière ou changer de secteur",
      "Financement possible par votre employeur",
      "Accompagnement personnalisé par un expert VAE",
      "Taux de réussite de 87% avec nos candidats",
    ],
    processus: [
      {
        numero: 1,
        titre: "Étude de recevabilité",
        desc: "Analyse de votre profil, vos expériences et le diplôme visé. Vérification des conditions d'éligibilité.",
      },
      {
        numero: 2,
        titre: "Constitution du dossier",
        desc: "Rédaction de votre livret de présentation des acquis : description détaillée de vos compétences et expériences.",
      },
      {
        numero: 3,
        titre: "Accompagnement pédagogique",
        desc: "Sessions de travail avec votre conseiller VAE pour structurer et valoriser votre dossier.",
      },
      {
        numero: 4,
        titre: "Soumission au jury",
        desc: "Dépôt officiel du dossier auprès de l'organisme certificateur compétent.",
      },
      {
        numero: 5,
        titre: "Soutenance",
        desc: "Présentation de votre parcours devant un jury professionnel. Nous vous préparons en simulation.",
      },
      {
        numero: 6,
        titre: "Validation & Certificat",
        desc: "Obtention du diplôme ou des dispenses partielles selon la décision du jury.",
      },
    ],
    image:
      "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600",
    gradient: "from-[#B8941F] to-[#8B6914]",
    accent: "#C9A84C",
    prix: "5 000 – 15 000 DH",
    duree: "6 à 18 mois",
    iconName: "Award",
    faq: [
      {
        q: "Qui peut bénéficier de la VAE ?",
        a: "Toute personne ayant au moins un an d'expérience professionnelle — salariée, bénévole ou indépendante — dans le domaine du diplôme visé peut demander une VAE.",
      },
      {
        q: "Quels diplômes peut-on obtenir par VAE ?",
        a: "Tous les diplômes inscrits au répertoire national des certifications professionnelles sont accessibles par VAE : certificats, BTS, Licences, Masters et plus.",
      },
      {
        q: "Combien de temps dure une VAE ?",
        a: "Le processus dure en moyenne 12 à 18 mois selon la complexité du dossier. Notre accompagnement accélère sensiblement ce délai.",
      },
      {
        q: "Mon employeur peut-il financer ma VAE ?",
        a: "Oui, de nombreux employeurs prennent en charge tout ou partie de la VAE dans le cadre du plan de développement des compétences. Nous vous aidons à monter le dossier de financement.",
      },
      {
        q: "Que se passe-t-il en cas de validation partielle ?",
        a: "En cas de validation partielle, vous conservez les unités validées et pouvez compléter les unités manquantes via une formation ou une nouvelle soutenance.",
      },
    ],
  },
  {
    slug: "formation-entreprise",
    titre: "Formation sur mesure pour Entreprises",
    titreCourt: "Formation Entreprise",
    type: "B2B",
    shortDesc:
      "Des programmes de formation personnalisés pour développer les compétences de vos équipes.",
    description: [
      "Institut Lorel conçoit et délivre des programmes de formation intra-entreprise entièrement adaptés à vos besoins, votre secteur d'activité et vos objectifs stratégiques. Nos experts interviennent directement dans vos locaux ou à distance.",
      "Nous avons accompagné plus de 50 entreprises marocaines — PME, ETI et grandes entreprises — dans leur transformation des compétences. Marketing digital, management, comptabilité, communication, techniques de vente : nos formations couvrent l'ensemble des fonctions clés.",
      "Chaque programme débute par un audit de vos besoins, se poursuit par une formation animée par des experts praticiens, et se conclut par une évaluation des acquis et un bilan collectif.",
    ],
    avantages: [
      "Programme 100% personnalisé à votre secteur",
      "Formateurs experts avec expérience en entreprise",
      "Formation en présentiel, distanciel ou hybride",
      "Évaluation des acquis en fin de programme",
      "Attestation de formation pour chaque participant",
      "Tarifs dégressifs selon le nombre de participants",
    ],
    processus: [
      {
        numero: 1,
        titre: "Audit des besoins",
        desc: "Entretien avec vos RH et managers pour identifier précisément les compétences à développer.",
      },
      {
        numero: 2,
        titre: "Conception du programme",
        desc: "Élaboration d'un programme sur mesure avec objectifs pédagogiques, modules et calendrier.",
      },
      {
        numero: 3,
        titre: "Validation & devis",
        desc: "Présentation du programme et du budget. Ajustements selon vos retours.",
      },
      {
        numero: 4,
        titre: "Animation de la formation",
        desc: "Délivrance par un ou plusieurs formateurs experts, avec supports pédagogiques complets.",
      },
      {
        numero: 5,
        titre: "Évaluation & bilan",
        desc: "Tests d'acquis, feedback des participants, rapport de formation détaillé remis à vos RH.",
      },
    ],
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
    gradient: "from-[#1B3A5C] to-[#0a1628]",
    accent: "#1B3A5C",
    prix: "Sur devis",
    duree: "1 jour à 3 mois",
    iconName: "Briefcase",
    faq: [
      {
        q: "Quel est le nombre minimum de participants ?",
        a: "Nous intervenons à partir de 5 participants pour les formations intra-entreprise. Pour les formations inter-entreprises, nos groupes sont limités à 15 participants maximum.",
      },
      {
        q: "Les formations sont-elles certifiantes ?",
        a: "Certains programmes peuvent déboucher sur une certification reconnue. Nous proposons également des attestations de formation en notre nom, reconnues par les employeurs du secteur.",
      },
      {
        q: "Peut-on financer via l'OFPPT ?",
        a: "Oui, nous vous accompagnons dans les démarches de financement auprès de l'OFPPT et d'autres organismes de financement de la formation professionnelle au Maroc.",
      },
    ],
  },
  {
    slug: "accompagnement-projet",
    titre: "Accompagnement de Projet",
    titreCourt: "Accompagnement",
    type: "Coaching",
    shortDesc:
      "Un coaching personnalisé pour structurer, lancer et développer votre projet entrepreneurial.",
    description: [
      "Institut Lorel propose un accompagnement individuel et collectif pour les porteurs de projets qui souhaitent transformer leur idée en activité pérenne. Business plan, étude de marché, stratégie marketing, aspects juridiques et financiers : nous vous guidons à chaque étape.",
      "Notre programme LOREL LAUNCH allie formation intensive en management, marketing et comptabilité, à un coaching individuel avec un expert qui connaît le contexte économique marocain. Vous bénéficiez également d'un accès au réseau d'entrepreneurs et de partenaires de l'Institut.",
      "Que vous soyez primo-entrepreneur ou chef d'entreprise cherchant à structurer votre développement, notre programme s'adapte à votre stade et vos ambitions.",
    ],
    avantages: [
      "Coach dédié tout au long du programme",
      "Business plan professionnel inclus",
      "Accès au réseau d'entrepreneurs Lorel",
      "Ateliers pratiques avec des experts terrain",
      "Mise en relation avec investisseurs et partenaires",
      "Suivi post-programme pendant 3 mois",
    ],
    processus: [
      {
        numero: 1,
        titre: "Diagnostic projet",
        desc: "Analyse de votre idée, vos ressources et votre environnement concurrentiel.",
      },
      {
        numero: 2,
        titre: "Formation intensive",
        desc: "4 semaines de modules clés : marketing, finance, juridique, opérations.",
      },
      {
        numero: 3,
        titre: "Coaching individuel",
        desc: "8 séances de coaching avec un expert dédié pour structurer votre plan d'action.",
      },
      {
        numero: 4,
        titre: "Pitch & validation",
        desc: "Présentation de votre projet devant un panel d'experts et d'entrepreneurs.",
      },
      {
        numero: 5,
        titre: "Lancement accompagné",
        desc: "Support opérationnel pendant les 3 premiers mois de votre activité.",
      },
    ],
    image:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    gradient: "from-[#2C8C6C] to-[#0a1628]",
    accent: "#4CAF9D",
    prix: "2 000 – 8 000 DH",
    duree: "2 à 6 mois",
    iconName: "Target",
    faq: [
      {
        q: "Faut-il déjà avoir une idée précise ?",
        a: "Non, vous pouvez intégrer le programme avec une idée encore floue. Nous vous aidons à la clarifier, la valider et la structurer.",
      },
      {
        q: "Le programme inclut-il une formation ?",
        a: "Oui, l'accompagnement inclut des modules de formation en gestion, marketing et finance, adaptés à votre profil et votre projet.",
      },
    ],
  },
  {
    slug: "certification",
    titre: "Certification Professionnelle",
    titreCourt: "Certification",
    type: "Diplôme",
    shortDesc:
      "Obtenez des certifications reconnues au niveau national et international pour booster votre carrière.",
    description: [
      "Institut Lorel est accrédité pour délivrer des certifications professionnelles reconnues par l'OFPPT, le Ministère de l'Emploi marocain et plusieurs organismes internationaux partenaires. Nos certifications sont visées par des professionnels du secteur et ouvrent des portes concrètes sur le marché du travail.",
      "Que vous suiviez une formation courte Express ou une formation longue Pro, votre parcours se conclut par une évaluation rigoureuse : examen théorique, projet pratique et soutenance. Les certifications incluent des accréditations européennes pour le programme LOREL PRO, ciblant notamment les étudiants africains qui souhaitent une équivalence en France.",
      "Nous proposons également des préparations aux certifications tierces — Microsoft, Google, Adobe — avec un taux de réussite moyen de 91% pour nos étudiants.",
    ],
    avantages: [
      "Certifications reconnues OFPPT et internationales",
      "Jury de certification professionnel et indépendant",
      "Diplôme numérique vérifiable sur LinkedIn",
      "Équivalences européennes disponibles (LOREL PRO)",
      "Préparation aux certifications tierces disponible",
      "Taux de réussite de 91% avec nos étudiants",
    ],
    processus: [
      {
        numero: 1,
        titre: "Formation & préparation",
        desc: "Suivi de la formation ou du programme de préparation spécifique à votre certification.",
      },
      {
        numero: 2,
        titre: "Examen théorique",
        desc: "Évaluation des connaissances via QCM ou épreuves écrites selon la certification visée.",
      },
      {
        numero: 3,
        titre: "Projet pratique",
        desc: "Réalisation d'un projet professionnel démontrant vos compétences appliquées.",
      },
      {
        numero: 4,
        titre: "Soutenance",
        desc: "Présentation de votre projet devant un jury mixte : experts métier et organisme certificateur.",
      },
      {
        numero: 5,
        titre: "Remise du diplôme",
        desc: "Cérémonie officielle et délivrance du diplôme numérique et papier.",
      },
    ],
    image:
      "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600",
    gradient: "from-[#3B5B9B] to-[#0a1628]",
    accent: "#6B8FD4",
    prix: "Inclus dans la formation",
    duree: "Variable selon la formation",
    iconName: "BadgeCheck",
    faq: [
      {
        q: "Les certifications sont-elles reconnues en France ?",
        a: "Les certifications du programme LOREL PRO sont homologuées et reconnues en France. Pour les autres programmes, nous délivrons des attestations reconnues par les employeurs au Maroc et en Afrique.",
      },
      {
        q: "Peut-on passer une certification sans avoir suivi la formation ?",
        a: "Pour certaines certifications tierces, nous proposons des préparations intensives sans formation complète. Pour nos certifications internes, la formation est requise.",
      },
    ],
  },
  {
    slug: "bilan-competences",
    titre: "Bilan de Compétences",
    titreCourt: "Bilan de compétences",
    type: "Orientation",
    shortDesc:
      "Faites le point sur vos compétences, vos motivations et définissez votre projet professionnel.",
    description: [
      "Le bilan de compétences est un outil d'orientation professionnelle qui vous permet de faire le point sur votre parcours, identifier vos compétences et aptitudes, explorer vos motivations et définir un projet professionnel réaliste et cohérent.",
      "Nos conseillers en évolution professionnelle vous accompagnent dans une démarche en trois phases : investigation (qui suis-je ? que sais-je faire ?), exploration (quelles sont mes options ?) et conclusion (quel est mon plan d'action ?).",
      "À l'issue du bilan, vous disposez d'un document de synthèse complet que vous êtes seul à posséder, avec votre plan de développement professionnel pour les 3 à 5 prochaines années.",
    ],
    avantages: [
      "Clarifier votre projet professionnel",
      "Identifier des compétences transférables cachées",
      "Définir un plan d'action concret et réaliste",
      "Mieux négocier votre prochaine évolution",
      "100% confidentiel — document remis à vous seul",
      "Conseil d'orientation emploi inclus",
    ],
    processus: [
      {
        numero: 1,
        titre: "Phase préliminaire",
        desc: "Définition de vos objectifs, présentation de la méthode et analyse de votre situation initiale.",
      },
      {
        numero: 2,
        titre: "Phase d'investigation",
        desc: "Tests psychométriques, analyse de votre parcours et identification de vos compétences clés.",
      },
      {
        numero: 3,
        titre: "Phase de conclusion",
        desc: "Synthèse des résultats, validation de votre projet et construction de votre plan d'action.",
      },
      {
        numero: 4,
        titre: "Document de synthèse",
        desc: "Remise de votre bilan complet incluant toutes les analyses et recommandations personnalisées.",
      },
      {
        numero: 5,
        titre: "Suivi post-bilan",
        desc: "Une séance de suivi 6 mois après pour évaluer l'avancement de votre projet professionnel.",
      },
    ],
    image:
      "https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg?auto=compress&cs=tinysrgb&w=600",
    gradient: "from-[#6B3B9B] to-[#0a1628]",
    accent: "#9B6BD4",
    prix: "2 500 – 5 000 DH",
    duree: "8 à 24 heures sur 3 mois",
    iconName: "BookOpen",
    faq: [
      {
        q: "Le bilan de compétences est-il confidentiel ?",
        a: "Oui, strictement confidentiel. Le document de synthèse vous appartient exclusivement et ne peut être communiqué à un tiers, y compris votre employeur, sans votre accord écrit.",
      },
      {
        q: "Quand faire un bilan de compétences ?",
        a: "Lors d'un questionnement sur votre carrière, d'un souhait de reconversion, après un licenciement, ou simplement pour faire le point après plusieurs années d'expérience.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getRelatedServices(currentSlug: string): Service[] {
  return SERVICES.filter((s) => s.slug !== currentSlug).slice(0, 3);
}
