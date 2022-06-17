/* eslint-disable quote-props */

export const types = {
  'CDS': {
    nom: 'CDS',
    colorClassname: 'bg-red-200 text-red-700',
    markerClassname: 'text-red-500',
  },
  'MSP': {
    nom: 'MSP',
    colorClassname: 'bg-orange-200 text-orange-700',
    markerClassname: 'text-orange-500',
  },
  'Associations caritatives - Distribution Alimentaire': {
    nom: 'Associations caritatives - Distribution Alimentaire',
    colorClassname: 'bg-amber-200 text-amber-700',
    markerClassname: 'text-amber-500',
  },
  'CSAPA': {
    nom: 'CSAPA',
    colorClassname: 'bg-rose-200 text-rose-700',
    markerClassname: 'text-rose-500',
  },
  'Filières gérontologiques': {
    nom: 'Filières gérontologiques',
    colorClassname: 'bg-sky-200 text-sky-700',
    markerClassname: 'text-sky-500',
  },
  'PASS': {
    nom: 'PASS',
    colorClassname: 'bg-green-200 text-green-700',
    markerClassname: 'text-green-500',
  },
  'CADA': {
    nom: 'CADA',
    colorClassname: 'bg-pink-200 text-pink-700',
    markerClassname: 'text-pink-500',
  },
  'HUDA': {
    nom: 'HUDA',
    colorClassname: 'bg-emerald-200 text-emerald-700',
    markerClassname: 'text-emerald-500',
  },
  "Association d'aide aux migrants": {
    nom: "Association d'aide aux migrants",
    colorClassname: 'bg-cyan-200 text-cyan-700',
    markerClassname: 'text-cyan-500',
  },
  'CEGIDD': {
    nom: 'CEGIDD',
    colorClassname: 'bg-lime-200 text-lime-700',
    markerClassname: 'text-lime-500',
  },
  'Accompagnement MNA': {
    nom: 'Accompagnement MNA',
    colorClassname: 'bg-violet-200 text-violet-700',
    markerClassname: 'text-violet-500',
  },
  'CPH': {
    nom: 'CPH',
    colorClassname: 'bg-violet-200 text-violet-700',
    markerClassname: 'text-violet-500',
  },

} as const

export type StructureType = keyof typeof types
export type Type = typeof types[StructureType]
