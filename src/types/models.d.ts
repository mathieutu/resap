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

type Image = {
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
  photo: Image,
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
  createdAt: Date,
  nom: string,
  specialites: string[],
  adresse: Adresse,
  email: string,
}

export type Link = {
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
  illustration: Image,
  description: string,
  contenu: string,
  auteur: Auteur,
  date: string,
  tags: string[],
  structures: Structure[],
  pourEnSavoirPlus: Link[],
}
