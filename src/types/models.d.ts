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

export type Auteur = {
  id: string,
  createdAt: Date,
  nom: string,
  prenom: string,
  titre: string,
  photo: Asset,
  structure: string,
  email: string,
  femme: boolean,
}

type Adresse = {
  lon: number,
  lat: number,
}

export type Structure = {
  id: string,
  createdAt: string,
  nom: string,
  specialites: string[],
  adresse: Adresse,
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
  auteur: Auteur,
  date: string,
  tags: string[],
  structures?: Structure[],
  pourEnSavoirPlus?: Link[],
  outils?: Link[],
}
