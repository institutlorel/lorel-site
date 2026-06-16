export interface Article {
  slug: string;
  titre: string;
  extrait: string;
  contenu: string[];
  image: string;
  categorie: string;
  auteur: string;
  auteurRole: string;
  date: string;
  readTime: number;
  tags: string[];
  featured?: boolean;
}

const BASE = "https://images.pexels.com/photos";

export const CATEGORIES_BLOG = [
  "Tous",
  "Carrière",
  "VAE",
  "Beauté",
  "Digital",
  "Entrepreneuriat",
  "Formation",
] as const;

export const ARTICLES: Article[] = [
  {
    slug: "comment-choisir-sa-formation-professionnelle-maroc",
    titre: "Comment choisir sa formation professionnelle au Maroc ?",
    extrait:
      "Face à la multitude d'offres de formation disponibles, comment trouver la formation qui correspond vraiment à vos objectifs, votre budget et votre emploi du temps ?",
    contenu: [
      "Le marché de la formation professionnelle au Maroc connaît une expansion sans précédent. En 2024, plus de 800 organismes de formation privés opèrent dans le Royaume, proposant des milliers de programmes allant du certificat de quelques jours au diplôme de niveau Master. Face à cette abondance, comment ne pas se perdre et trouver la formation qui correspond réellement à vos objectifs ?",
      "La première étape consiste à clarifier votre objectif. Cherchez-vous à changer de secteur ? À obtenir une promotion ? À lancer votre propre activité ? À acquérir une compétence technique précise ? Selon votre réponse, le type de formation idéal sera différent. Une formation courte intensive (2 à 6 semaines) conviendra pour une compétence technique ciblée, tandis qu'une formation longue diplômante (3 à 12 mois) sera nécessaire pour une reconversion complète.",
      "Vérifiez ensuite les accréditations de l'organisme. En priorité, privilégiez les établissements accrédités par l'OFPPT (Office de la Formation Professionnelle et de la Promotion du Travail) ou affiliés à des réseaux de certification internationaux reconnus. Une certification délivrée par un organisme non agréé aura très peu de valeur sur le marché du travail.",
      "Interrogez-vous sur le format : présentiel, en ligne ou hybride ? Le présentiel garantit un encadrement direct et des échanges avec vos pairs, mais nécessite une présence physique dans un centre. La formation en ligne offre une flexibilité maximale, idéale si vous êtes en activité. Le format hybride combine les avantages des deux. Chez Institut Lorel, nous proposons les trois formats selon les formations, avec un suivi individualisé dans tous les cas.",
      "Enfin, renseignez-vous sur les débouchés concrets. Quels sont les taux de placement des diplômés ? Des anciens étudiants sont-ils accessibles pour témoigner ? L'organisme a-t-il des partenariats avec des entreprises du secteur ? Ces indicateurs sont bien plus fiables que la brochure commerciale pour évaluer la vraie valeur d'une formation.",
    ],
    image: `${BASE}/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800`,
    categorie: "Carrière",
    auteur: "Institut Lorel",
    auteurRole: "Équipe pédagogique",
    date: "2025-11-15",
    readTime: 6,
    tags: ["formation", "conseils", "carrière", "maroc"],
    featured: true,
  },
  {
    slug: "vae-valorisez-votre-experience-professionnelle",
    titre: "VAE : valorisez votre expérience sans reprendre les bancs de l'école",
    extrait:
      "Vous avez des années d'expérience mais pas le diplôme qui va avec ? La VAE (Validation des Acquis de l'Expérience) peut changer votre situation professionnelle en moins de 18 mois.",
    contenu: [
      "Combien de professionnels compétents et expérimentés se retrouvent bloqués dans leur évolution de carrière faute d'un diplôme officiel ? Ce paradoxe, malheureusement fréquent au Maroc comme ailleurs, a une solution concrète : la Validation des Acquis de l'Expérience, plus connue sous l'acronyme VAE.",
      "Le principe est simple mais puissant : si vous justifiez d'au moins un an d'expérience professionnelle dans un domaine, vous pouvez demander à ce que vos compétences soient reconnues officiellement, sans suivre l'intégralité d'une formation. Un jury de professionnels évalue votre dossier — votre livret de présentation des acquis — et peut valider tout ou partie d'un diplôme.",
      "La VAE est particulièrement intéressante pour trois profils : les professionnels qui ont progressé dans leur carrière sans diplôme correspondant à leur niveau de responsabilité, les personnes qui souhaitent se reconvertir et faire reconnaître des compétences transférables, et les auto-entrepreneurs qui veulent officialiser leur expertise pour gagner en crédibilité.",
      "Le parcours VAE se déroule en plusieurs étapes clés. Après la vérification de la recevabilité de votre demande, vous rédigez votre livret de présentation des acquis — pièce maîtresse du dossier — dans lequel vous décrivez précisément vos activités professionnelles et démontrez comment elles correspondent aux compétences attendues du diplôme visé. C'est là qu'un accompagnement professionnel fait toute la différence.",
      "Chez Institut Lorel, notre équipe VAE accompagne les candidats à chaque étape : sélection du diplôme le plus adapté à votre profil, rédaction et structuration du livret, simulation de soutenance. Avec un taux de réussite de 87%, nous faisons partie des organismes d'accompagnement VAE les plus efficaces du Maroc.",
    ],
    image: `${BASE}/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800`,
    categorie: "VAE",
    auteur: "Hassan Idrissi",
    auteurRole: "Expert-comptable & formateur",
    date: "2025-10-28",
    readTime: 7,
    tags: ["VAE", "diplôme", "expérience", "reconversion"],
  },
  {
    slug: "metiers-beaute-qui-recrutent-2025",
    titre: "Les métiers de la beauté qui recrutent le plus en 2025",
    extrait:
      "Le secteur de la beauté et du bien-être au Maroc est en pleine expansion. Voici les métiers les plus porteurs et les formations pour y accéder rapidement.",
    contenu: [
      "Le marché marocain de la beauté et du bien-être affiche une croissance annuelle de 12% depuis 2020, portée par l'essor des instituts de beauté haut de gamme, des spas dans les hôtels 4 et 5 étoiles, et d'une clientèle de plus en plus exigeante et informée. Cette dynamique crée des opportunités d'emploi significatives pour les professionnels qualifiés.",
      "L'esthéticienne spécialisée en soins du visage reste le profil le plus recherché, notamment dans les instituts de beauté des grandes villes (Casablanca, Marrakech, Rabat, Tanger). La maîtrise des techniques de soin anti-âge, des traitements à base d'actifs naturels et des nouvelles technologies (LED, ultrasons) est un avantage concurrentiel majeur. Un(e) esthéticien(ne) expérimenté(e) peut prétendre à des salaires entre 4 000 et 12 000 DH par mois selon son niveau et son employeur.",
      "Le conseil en image et le maquillage professionnel constituent un autre créneau porteur, alimenté par le boom des mariages (le Maroc compte plus de 250 000 mariages annuels), les shootings photo, et l'influence des réseaux sociaux. Les maquilleurs professionnels qui maîtrisent à la fois les techniques traditionnelles marocaines et le maquillage contemporain sont particulièrement recherchés.",
      "Enfin, la gestion et la direction d'institut de beauté représentent un débouché entrepreneurial attractif. Avec le bon accompagnement, ouvrir son propre institut reste l'objectif de nombreuses étudiantes — et c'est réalisable avec un investissement initial de 80 000 à 200 000 DH selon la ville et la taille du projet.",
    ],
    image: `${BASE}/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=800`,
    categorie: "Beauté",
    auteur: "Amina Tazi",
    auteurRole: "Formatrice Esthétique",
    date: "2025-10-10",
    readTime: 5,
    tags: ["beauté", "esthétique", "emploi", "recrutement", "maroc"],
  },
  {
    slug: "marketing-digital-se-former-indispensable",
    titre: "Marketing digital : pourquoi se former est devenu indispensable",
    extrait:
      "En 2025, 78% des entreprises marocaines cherchent des profils en marketing digital. La formation n'est plus un atout — c'est un prérequis.",
    contenu: [
      "Le marketing digital n'est plus réservé aux startups tech. Aujourd'hui, de la PME familiale de Fès au groupe côté en Bourse de Casablanca, toutes les entreprises cherchent à développer leur présence en ligne, gérer leurs réseaux sociaux, lancer des campagnes publicitaires digitales et analyser leurs performances. Résultat : le marché du travail en marketing digital est en pénurie de talents qualifiés.",
      "Les compétences les plus recherchées en 2025 ? La gestion des campagnes Meta Ads et Google Ads, la création de contenu optimisé pour les réseaux sociaux (Reels, TikTok, YouTube Shorts), le SEO (référencement naturel), l'email marketing et l'analyse de données (Google Analytics, Meta Insights). Maîtriser l'ensemble de ces outils permet de prétendre à des postes de community manager, traffic manager, ou directeur marketing digital.",
      "Les salaires suivent : un profil junior en marketing digital gagne entre 5 000 et 8 000 DH à Casablanca ; un profil intermédiaire (2-4 ans d'expérience) entre 8 000 et 15 000 DH ; un directeur digital dans une grande entreprise peut atteindre 25 000 à 40 000 DH. Ces rémunérations s'accompagnent d'une forte demande pour les freelances et consultants qui peuvent facturer des missions entre 500 et 2 000 DH par jour.",
      "Se former au marketing digital ne signifie pas nécessairement suivre une formation de deux ans. Des programmes intensifs de 2 à 3 mois, comme celui proposé par Institut Lorel, permettent d'acquérir les compétences opérationnelles essentielles et de construire un portfolio de projets réels. L'essentiel est de choisir une formation pratique, avec des formateurs réellement actifs dans le secteur, et non de simples théoriciens.",
    ],
    image: `${BASE}/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=800`,
    categorie: "Digital",
    auteur: "Sara Benali",
    auteurRole: "Formatrice Marketing Digital",
    date: "2025-09-22",
    readTime: 6,
    tags: ["marketing digital", "formation", "emploi", "compétences digitales"],
  },
  {
    slug: "lancer-entreprise-maroc-etapes-cles",
    titre: "Lancer son entreprise au Maroc : les étapes incontournables",
    extrait:
      "De l'idée à l'immatriculation, en passant par le business plan et le financement — le guide complet pour créer votre société au Maroc en 2025.",
    contenu: [
      "Le Maroc a considérablement simplifié les procédures de création d'entreprise depuis 2020. Aujourd'hui, il est possible d'immatriculer une SARL au Maroc en moins de 48 heures via les guichets CRI (Centres Régionaux d'Investissement) ou leur plateforme en ligne. Mais si les démarches administratives sont devenues plus rapides, la réussite entrepreneuriale repose toujours sur une préparation rigoureuse en amont.",
      "La première étape est la validation de votre idée. Avant d'investir temps et argent, posez-vous les bonnes questions : qui sont vos clients cibles ? Quel problème résolvez-vous pour eux ? Quelle est votre proposition de valeur différenciante par rapport à la concurrence existante ? Une étude de marché, même simplifiée (20 à 30 entretiens avec des clients potentiels), peut vous éviter des mois d'efforts dans la mauvaise direction.",
      "Le business plan vient ensuite. Document indispensable pour convaincre vos associés, partenaires et banquiers, il doit inclure : une présentation de votre activité et de votre marché, un plan marketing et commercial, un plan opérationnel, et un plan financier sur 3 ans (compte de résultat prévisionnel, plan de trésorerie, bilan prévisionnel). Ne négligez pas cette étape — un business plan solide vous oblige à penser votre projet dans sa globalité.",
      "Pour le financement, les options disponibles au Maroc sont plus nombreuses qu'on ne le croit. Outre l'autofinancement, vous pouvez solliciter des micro-crédits auprès d'associations (Al Amana, Fondation Banque Populaire), des prêts aux jeunes entrepreneurs via la CCG (Caisse Centrale de Garantie), des subventions régionales via les CRI, ou des investisseurs angels du réseau MCMA (Moroccan Capital Markets Association). N'hésitez pas à combiner plusieurs sources.",
    ],
    image: `${BASE}/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800`,
    categorie: "Entrepreneuriat",
    auteur: "Omar Benali",
    auteurRole: "Formateur Entrepreneuriat",
    date: "2025-09-05",
    readTime: 8,
    tags: ["entrepreneuriat", "création d'entreprise", "maroc", "business plan"],
  },
  {
    slug: "formation-hybride-meilleur-des-deux-mondes",
    titre: "Formation hybride : le meilleur des deux mondes",
    extrait:
      "80% en ligne, 20% en présentiel — le format hybride révolutionne la formation professionnelle au Maroc et s'impose comme la modalité préférée des actifs.",
    contenu: [
      "La formation hybride n'est pas une simple adaptation Covid : c'est un format pédagogique à part entière qui combine les avantages de l'apprentissage en ligne (flexibilité, rythme personnalisé, accessibilité géographique) et les bénéfices irremplaçables du présentiel (pratique, échanges humains, réseau professionnel). Chez Institut Lorel, nos formations hybrides sont structurées à 80% en ligne et 20% en workshops présentiels — et ce ratio n'est pas anodin.",
      "Les 80% en ligne correspondent aux apprentissages théoriques, aux démonstrations techniques et aux exercices pratiques que chaque apprenant peut effectuer à son rythme, depuis chez lui, via notre plateforme. Ces modules vidéo sont disponibles 24h/24 et peuvent être revisionnés autant de fois que nécessaire — un avantage considérable pour les apprenants qui ont besoin de plus de temps sur certains concepts.",
      "Les 20% en présentiel sont concentrés sur ce que l'on ne peut pas reproduire à distance : la pratique des gestes professionnels (en esthétique, stylisme, photographie), les études de cas collectives, les simulations de situations professionnelles réelles, et surtout le networking entre étudiants et avec les formateurs. Ces séances de workshop, organisées typiquement un samedi sur deux, créent une cohésion de groupe et un ancrage pratique des savoirs théoriques acquis en ligne.",
      "Pour les professionnels en activité qui ne peuvent pas se permettre de suivre une formation en présentiel 5 jours par semaine, le format hybride est idéal. Vous gérez votre temps de formation en ligne autour de votre emploi du temps professionnel et familial, tout en bénéficiant de l'encadrement et de la dynamique de groupe lors des ateliers présentiels. C'est cette combinaison qui explique les taux de satisfaction et de complétion supérieurs de nos formations hybrides par rapport aux formations 100% en ligne.",
    ],
    image: `${BASE}/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800`,
    categorie: "Formation",
    auteur: "Institut Lorel",
    auteurRole: "Équipe pédagogique",
    date: "2025-08-18",
    readTime: 5,
    tags: ["formation hybride", "e-learning", "présentiel", "flexibilité"],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(currentSlug: string, categorie: string): Article[] {
  return ARTICLES.filter(
    (a) => a.slug !== currentSlug && a.categorie === categorie
  ).slice(0, 3);
}
