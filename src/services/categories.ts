import { Sante } from '../components/Icons/Sante'
import { Besoin } from '../components/Icons/Besoin'
import { Interpretariat } from '../components/Icons/Interpretariat'
import { Social } from '../components/Icons/Social'

export const categories = {
  sante: {
    name: 'Santé',
    description: 'Description de la thématique',
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
    description: 'Description de la thématique',
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
    description: 'Description de la thématique',
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
    description: 'Description de la thématique',
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
