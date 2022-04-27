import { categories } from '../services/categories'

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

export type Adresse = {
  housenumber: string,
  postcode: string,
  city: string,
  street: string,
  lat:number,
  lon:number,
} | {
  lat: number,
  lon: number,
}

export type Structure = {
  id: string,
  nomStructure: string,
  typeDispositif: string,
  nomOrganisation: string,
  adresse: Adresse,
  siteWeb: string,
  contact: string,
  tel: string,
  email: string,
}

type Link = {
  id: string,
  titre: string,
  createdAt: string,
} & ({ url: string} | { fichier: Asset })

export type Fiche = {
  id: string,
  categorie: keyof typeof categories,
  createdAt: string,
  updatedAt: string,
  titre: string,
  slug: string,
  illustration: Asset,
  description: string,
  contenu: string,
  date: string,
  tags: string[],
  structures?: Structure[],
  pourEnSavoirPlus?: Link[],
  outils?: Link[],
}
