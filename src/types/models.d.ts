import { categories } from '../services/categories'

export type Image = {
  width: number,
  height: number,
}

export type Details = {
  size: number,
  image: Image,
}

export type File = {
  url: string,
  details: Details,
  fileName: string,
  contentType: string,
}

export type Illustration = {
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
  photo: string,
  structure: string,
  email: string,
}

export type Adresse = {
  lon: number,
  lat: number,
}

export type Structure = {
  id: string,
  createdAt: Date,
  nom: string,
  specialites: string[],
  adresse: Adresse,
  email: string,
}

export type Url = {
  id: string,
  titre: string,
  url: string,
  createdAt: Date,
}

export type Fiche = {
  id: string,
  categorie: keyof typeof categories,
  createdAt: Date,
  titre: string,
  slug: string,
  illustration: Illustration,
  description: string,
  contenu: string,
  auteur: Auteur,
  date: string,
  tags: string[],
  structures: Structure[],
  pourEnSavoirPlus: Url[],
}
