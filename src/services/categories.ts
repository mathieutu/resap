import { ChartBarIcon, CursorClickIcon, RefreshIcon, ShieldCheckIcon } from '@heroicons/react/outline'

export const categories = {
  sante: {
    name: 'Santé',
    description: 'Description de la thématique',
    icon: ChartBarIcon,
    href: 'fiches/sante',
    bgColor: 'bg-pink-600',
    groupHoverBgColor: 'group-hover:bg-pink-600',
    textColor: 'text-pink-600',
    borderColor: 'border-pink-600',
  },
  'besoins-primaires': {
    name: 'Besoins Primaires',
    description: 'Description de la thématique',
    icon: ShieldCheckIcon,
    href: 'fiches/besoins-primaires',
    bgColor: 'bg-cyan-600',
    groupHoverBgColor: 'group-hover:bg-cyan-600',
    textColor: 'text-cyan-600',
    borderColor: 'border-cyan-600',
  },
  interpretariat: {
    name: 'Interprétariat',
    description: 'Description de la thématique',
    icon: CursorClickIcon,
    href: 'fiches/interpretariat',
    bgColor: 'bg-yellow-500',
    groupHoverBgColor: 'group-hover:bg-yellow-500',
    textColor: 'text-yellow-500',
    borderColor: 'border-yellow-500',
  },
  social: {
    name: 'Social',
    description: 'Description de la thématique',
    icon: RefreshIcon,
    href: 'fiches/social',
    bgColor: 'bg-green-500',
    groupHoverBgColor: 'group-hover:bg-green-500',
    textColor: 'text-green-500',
    borderColor: 'border-green-500',
  },
} as const

export type CategorieSlug = keyof typeof categories
export type Categorie = typeof categories[CategorieSlug]
