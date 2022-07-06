export const types = {
  'Accompagnement MNA': {
    nom: 'Accompagnement MNA',
    colorClassname: 'bg-violet-200 text-violet-700',
    markerClassname: 'text-violet-500',
  },
  'Association LGBTQIA+': {
    nom: 'Association LGBTQIA+',
    colorClassname: 'bg-fuchsia-200 text-fuchsia-700',
    markerClassname: 'text-fuchsia-500',
  },
  "Association d'aide aux migrants": {
    nom: "Association d'aide aux migrants",
    colorClassname: 'bg-cyan-200 text-cyan-700',
    markerClassname: 'text-cyan-500',
  },
  'Associations caritatives - Distribution Alimentaire': {
    nom: 'Associations caritatives - Distribution Alimentaire',
    colorClassname: 'bg-amber-200 text-amber-700',
    markerClassname: 'text-amber-500',
  },
  'Associations d’accompagnement personnes en situation de prostitution': {
    nom: 'Associations d’accompagnement personnes en situation de prostitution',
    colorClassname: 'bg-fuchsia-200 text-fuchsia-700',
    markerClassname: 'text-fuchsia-500',
  },
  CAARUD: {
    nom: 'Centres d\'Accueil et d\'Accompagnement à la Réduction des risques pour Usagers de Drogues',
    colorClassname: 'bg-stone-200 text-stone-700',
    markerClassname: 'text-stone-400',
  },
  CADA: {
    nom: 'Centre d\'Accueil des Demandeurs d\'Asile',
    colorClassname: 'bg-pink-200 text-pink-700',
    markerClassname: 'text-pink-500',
  },
  CAES: {
    nom: 'Comité d’Action et d’Entraide Sociales',
    colorClassname: 'bg-stone-200 text-stone-700',
    markerClassname: 'text-stone-400',
  },
  CDS: {
    nom: 'Centre De Santé',
    colorClassname: 'bg-red-200 text-red-700',
    markerClassname: 'text-red-500',
  },
  CEGIDD: {
    nom: 'Centres Gratuits d\'Information, de Dépistage et de Diagnostic des infections',
    colorClassname: 'bg-lime-200 text-lime-700',
    markerClassname: 'text-lime-500',
  },
  CLAT: {
    nom: 'Centre de Lutte Antituberculeux',
    colorClassname: 'bg-stone-200 text-stone-700',
    markerClassname: 'text-stone-400',
  },
  COREVIH: {
    nom: 'Coordination Régionale de lutte contre le Virus de l\'Immunodéficience Humaine',
    colorClassname: 'bg-stone-200 text-stone-700',
    markerClassname: 'text-stone-400',
  },
  CPH: {
    nom: "Centres Provisoires d'Hébergement",
    colorClassname: 'bg-violet-200 text-violet-700',
    markerClassname: 'text-violet-500',
  },
  CPTS: {
    nom: 'Communautés Professionnelles Territoriales de Santé',
    colorClassname: 'bg-stone-200 text-stone-700',
    markerClassname: 'text-stone-400',
  },
  CSAPA: {
    nom: 'Centre de Soins, d\'Accompagnement et de Prévention en Addictologie',
    colorClassname: 'bg-rose-200 text-rose-700',
    markerClassname: 'text-rose-500',
  },
  'Centre de vaccination': {
    nom: 'Centre de vaccination',
    colorClassname: 'bg-teal-200 text-teal-700',
    markerClassname: 'text-teal-500',
  },
  'Filières gérontologiques': {
    nom: 'Filières gérontologiques',
    colorClassname: 'bg-sky-200 text-sky-700',
    markerClassname: 'text-sky-500',
  },
  HUDA: {
    nom: 'Hébergement d’Urgence pour les Demandeurs d’Asile',
    colorClassname: 'bg-emerald-200 text-emerald-700',
    markerClassname: 'text-emerald-500',
  },
  MDPH: {
    nom: 'Maison Départementale des Personnes Handicapées',
    colorClassname: 'bg-stone-200 text-stone-700',
    markerClassname: 'text-stone-400',
  },
  MSP: {
    nom: 'Maison de Santé Pluri-professionnelles',
    colorClassname: 'bg-orange-200 text-orange-700',
    markerClassname: 'text-orange-500',
  },
  OFII: {
    nom: "Office Français de l'Immigration et de l'Intégration",
    colorClassname: 'bg-stone-200 text-stone-700',
    markerClassname: 'text-stone-400',
  },
  PASS: {
    nom: 'Permanences d\'Accès aux Soins de Santé',
    colorClassname: 'bg-green-200 text-green-700',
    markerClassname: 'text-green-500',
  },
  PRAHDA: {
    nom: "Programme d'Accueil et d&#39;Hébergement des Demandeurs d'Asile",
    colorClassname: 'bg-stone-200 text-stone-700',
    markerClassname: 'text-stone-400',
  },
  Préfecture: {
    nom: 'Préfecture',
    colorClassname: 'bg-stone-200 text-stone-700',
    markerClassname: 'text-stone-400',
  },
  'Réseaux polyvalents (tous âges et toutes pathologies)': {
    nom: 'Réseau polyvalent (tous âges et toutes pathologies)',
    colorClassname: 'bg-stone-200 text-stone-700',
    markerClassname: 'text-stone-400',
  },
  SIAO: {
    nom: 'Service Intégré d\'Accueil et d\'Orientation',
    colorClassname: 'bg-indigo-200 text-indigo-700',
    markerClassname: 'text-indigo-500',
  },
  SPADA: {
    nom: 'Structure du Premier Accueil du Demandeur d\'Asile',
    colorClassname: 'bg-stone-200 text-stone-700',
    markerClassname: 'text-stone-400',
  },
} as const

export type StructureType = keyof typeof types
export type Type = typeof types[StructureType]
