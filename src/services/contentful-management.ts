'use server'

import { createClient } from 'contentful-management'

const { CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN } = process.env

if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN) {
  throw new Error('CONTENTFUL env vars needed (SPACE_ID, MANAGEMENT_API_ACCESS_TOKEN).')
}

const getContentfulEnvironment = async () => {
  const client = createClient({
    accessToken: CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
  })

  const space = await client.getSpace(CONTENTFUL_SPACE_ID)

  return space.getEnvironment('master')
}

export type CreateStructureData = {
  nom: string
  organisation: string
  type: string
  description: string
  adresse: string
  siteWeb: string
  email: string
  tel: string
}

const findCoordinates = async (address: string): Promise<{ lat: number, lon: number }> => {
  try {
    const encodedAddress = encodeURIComponent(address)
    const response = await fetch(
      `https://data.geopf.fr/geocodage/search?index=address&q=${encodedAddress}&limit=1`,
    )

    if (!response.ok) {
      throw new Error('Erreur lors du géocodage')
    }

    const data = await response.json()

    if (!data || !data.features?.length) {
      return { lat: 0, lon: 0 }
    }

    return {
      lat: parseFloat(data.features[0].geometry.coordinates[1]),
      lon: parseFloat(data.features[0].geometry.coordinates[0]),
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erreur lors du géocodage:', error)
    return { lat: 0, lon: 0 }
  }
}

export const createStructureInContentful = async (data: CreateStructureData): Promise<{ id: string, url: string }> => {
  const environment = await getContentfulEnvironment()

  const { lat, lon } = await findCoordinates(data.adresse)

  const structureEntry = await environment.createEntry('structure', {
    fields: {
      nom: {
        fr: data.nom,
      },
      organisation: data.organisation ? {
        fr: data.organisation,
      } : undefined,
      type: {
        fr: data.type,
      },

      adresse: {
        fr: data.adresse,
      },
      siteWeb: data.siteWeb ? {
        fr: data.siteWeb,
      } : undefined,
      email: data.email ? {
        fr: data.email,
      } : undefined,
      tel: data.tel ? {
        fr: data.tel,
      } : undefined,
      latLon: {
        fr: {
          lat,
          lon,
        },
      },
    },
  })

  const contentfulUrl = `https://app.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/entries/${structureEntry.sys.id}`

  return {
    id: structureEntry.sys.id,
    url: contentfulUrl,
  }
}

export type FicheWithStatus = {
  id: string
  titre: string
  slug: string
  categorie: string
  description: string
  createdAt: string
  updatedAt: string
  isPublished: boolean
  publishedAt?: string
}

export const getAllFichesForAdmin = async (): Promise<FicheWithStatus[]> => {
  const environment = await getContentfulEnvironment()

  const entries = await environment.getEntries({
    content_type: 'fiche',
    limit: 1000,
  })

  return entries.items.map((entry) => ({
    id: entry.sys.id,
    titre: entry.fields.titre?.fr || '',
    slug: entry.fields.slug?.fr || '',
    categorie: entry.fields.categorie?.fr || '',
    description: entry.fields.description?.fr || '',
    createdAt: entry.sys.createdAt,
    updatedAt: entry.sys.updatedAt,
    isPublished: entry.isPublished(),
    publishedAt: entry.sys.publishedAt,
  }))
}
