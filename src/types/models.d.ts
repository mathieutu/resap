import { CategorieSlug } from '@/data/categories'
import { StructureType } from '@/data/structures_types'

type ImageSize = {
  width: number,
  height: number,
}

type Details = {
  size: number,
  image: ImageSize,
}

type File = {
  url: string,
  details: Details,
  fileName: string,
  contentType: string,
}

type Asset = {
  id: string,
  createdAt: Date,
  title: string,
  file: File,
}

type LatLon = {
  lat: number,
  lon: number,
}

export type Structure = {
  id: string,
  createdAt: string,
  nom: string,
  organisation?: string,
  type: StructureType,
  specialites: string[],
  departement: string,
  adresse: string,
  latLon: LatLon,
  siteWeb?: string,
  email?: string,
  tel?: string,
}

export type Lien = {
  id: string,
  titre: string,
  createdAt: string,
} & ({ url: string } | { fichier: Asset })

export type Fiche = {
  id: string,
  categorie: CategorieSlug,
  createdAt: string,
  updatedAt: string,
  titre: string,
  slug: string,
  illustration: Asset,
  description: string,
  resume: string,
  contenu: string,
  date: string,
  tags: string[],
  pourEnSavoirPlus?: Lien[],
  outils?: Lien[],
  patients?: Lien[],
  typeDispositif: StructureType[],
  structures: Structure[],
}
