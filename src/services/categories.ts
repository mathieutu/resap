import { Sante } from '../components/Icons/Sante'
import { Besoin } from '../components/Icons/Besoin'
import { Interpretariat } from '../components/Icons/Interpretariat'
import { Social } from '../components/Icons/Social'

export const categories = {
  sante: {
    name: 'Accès à la santé',
    description: 'L\'accès aux soins recouvrent différentes dimensions telle que l\'accessibilité physique et financière à une offre de soin. Mais d\'autres facteurs peuvent également intervenir dans la décision de recourir aux soins : l\'âge, le sexe, la profession, le statut familial, le lieu d’habitation, le degré de connaissance et d’acculturation à la complexité de l\'offre de soins, la culture d\'origine.',
    icon: Sante,
    href: 'fiches/sante',
    bgColor: 'bg-sante',
    groupHoverBgColor: 'group-hover:bg-sante',
    groupHoverTextColor: 'group-hover:text-sante',
    textColor: 'text-sante',
    borderColor: 'border-sante',
  },
  'besoins-primaires': {
    name: 'Besoins Primaires',
    description: 'Les conditions de vie des personnes que vous prenez en charge conditionnent leur capacité à prendre soin d\'elles et à s\'engager dans un parcours de soin. Il est donc important de connaitre et comprendre à minima les difficultés rencontrées par certaines catégories de population, dont celles qui vivent à la rue ou en logement très précaire et celles issues de la migration récente.',
    icon: Besoin,
    href: 'fiches/besoins-primaires',
    bgColor: 'bg-green-default',
    groupHoverBgColor: 'group-hover:bg-green-default',
    groupHoverTextColor: 'group-hover:text-green-default',
    textColor: 'text-green-default',
    borderColor: 'border-green-default',
  },
  interpretariat: {
    name: 'Interprétariat',
    description: 'Compte tenu de l\'augmentation des flux migratoires pour raisons politiques, économiques ou écologiques, vous êtes et/ou allez être de plus en plus confronté en médecine de ville ou à l\'hôpital à des personnes qui ne maîtrisent pas ou peu la langue française et/ou les usages de la culture occidentale. Des outils et dispositifs sont à votre disposition pour vous accompagner dans la prise en charge de ces patients.',
    icon: Interpretariat,
    href: 'fiches/interpretariat',
    bgColor: 'bg-interpretariat',
    groupHoverBgColor: 'group-hover:bg-interpretariat',
    groupHoverTextColor: 'group-hover:text-interpretariat',
    textColor: 'text-interpretariat',
    borderColor: 'border-interpretariat',
  },
  social: {
    name: 'Social',
    description: 'Les inégalités de santé n\'ont cessé de s\'accroître ces dernières années. L’accès aux droits et aux soins sont liés. Pour les personnes vivant en hébergement, à la rue ou chez un tiers leur accès est complexe. Des dispositifs existent pour favoriser l’accès à la santé pour ces personnes.',
    icon: Social,
    href: 'fiches/social',
    bgColor: 'bg-social',
    groupHoverBgColor: 'group-hover:bg-social',
    groupHoverTextColor: 'group-hover:text-social',
    textColor: 'text-social',
    borderColor: 'border-social',
  },
} as const

export type CategorieSlug = keyof typeof categories
export type Categorie = typeof categories[CategorieSlug]
