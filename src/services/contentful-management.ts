'use server'

import { createClient, Entry } from 'contentful-management'

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
  status: 'published' | 'draft' | 'updated' | 'archived' | 'unknown'
}

export type FicheData = {
  id: string
  titre: string
  slug: string
  categorie: string
  illustration: Asset // Asset complet au lieu de juste l'ID
  description: string
  resume: any // RichText content - required
  contenu: any // RichText content - required
  tags: string[]
  typeDispositif: string[]
  pourEnSavoirPlus: Link[] // Liens complets au lieu des IDs
  outils: Link[] // Liens complets au lieu des IDs
  patients: Link[] // Liens complets au lieu des IDs
}

export const getFicheForEdit = async (ficheId: string): Promise<FicheData | null> => {
  const environment = await getContentfulEnvironment()

  try {
    const entry = await environment.getEntry(ficheId)

    if (entry.sys.contentType.sys.id !== 'fiche') {
      return null
    }

    // Récupérer l'ID de l'illustration
    const illustrationId = entry.fields.illustration?.fr?.sys?.id

    // Récupérer les IDs des liens
    const pourEnSavoirPlusIds = entry.fields.pourEnSavoirPlus?.fr?.map((link: any) => link.sys.id) || []
    const outilsIds = entry.fields.outils?.fr?.map((link: any) => link.sys.id) || []
    const patientsIds = entry.fields.patients?.fr?.map((link: any) => link.sys.id) || []
    const allLinkIds = [...pourEnSavoirPlusIds, ...outilsIds, ...patientsIds]

    // Récupérer seulement l'illustration spécifique et les liens associés
    const [illustration, ficheLinks] = await Promise.all([
      getAssetById(illustrationId),
      getLinksForFiche(allLinkIds),
    ])

    // Organiser les liens par catégorie
    const pourEnSavoirPlus = ficheLinks.filter(link => pourEnSavoirPlusIds.includes(link.id))
    const outils = ficheLinks.filter(link => outilsIds.includes(link.id))
    const patients = ficheLinks.filter(link => patientsIds.includes(link.id))

    return {
      id: entry.sys.id,
      titre: entry.fields.titre?.fr || '',
      slug: entry.fields.slug?.fr || '',
      categorie: entry.fields.categorie?.fr || '',
      illustration: illustration || { id: '', title: '', url: '', fileName: '', contentType: '' },
      description: entry.fields.description?.fr || '',
      resume: entry.fields.resume?.fr || null,
      contenu: entry.fields.contenu?.fr || null,
      tags: entry.fields.tags?.fr || [],
      typeDispositif: entry.fields.typeDispositif?.fr || [],
      pourEnSavoirPlus,
      outils,
      patients,
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching fiche:', error)
    return null
  }
}

export const updateFiche = async (fiche: FicheData): Promise<void> => {
  const environment = await getContentfulEnvironment()

  try {
    const entry = await environment.getEntry(fiche.id)

    entry.fields.titre = { fr: fiche.titre }
    entry.fields.slug = { fr: fiche.slug }
    entry.fields.categorie = { fr: fiche.categorie }
    entry.fields.description = { fr: fiche.description }
    entry.fields.tags = { fr: fiche.tags }
    entry.fields.typeDispositif = { fr: fiche.typeDispositif }
    entry.fields.resume = { fr: fiche.resume }
    entry.fields.contenu = { fr: fiche.contenu }
    entry.fields.illustration = {
      fr: {
        sys: {
          type: 'Link',
          linkType: 'Asset',
          id: fiche.illustration.id,
        },
      },
    }

    entry.fields.pourEnSavoirPlus = {
      fr: fiche.pourEnSavoirPlus.map(link => ({
        sys: {
          type: 'Link',
          linkType: 'Entry',
          id: link.id,
        },
      })),
    }

    entry.fields.outils = {
      fr: fiche.outils.map(link => ({
        sys: {
          type: 'Link',
          linkType: 'Entry',
          id: link.id,
        },
      })),
    }

    entry.fields.patients = {
      fr: fiche.patients.map(link => ({
        sys: {
          type: 'Link',
          linkType: 'Entry',
          id: link.id,
        },
      })),
    }

    await entry.update()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error updating fiche:', error)
    throw error
  }
}

const getFicheStatus = (entry: Entry): FicheWithStatus['status'] => {
  if (entry.isArchived()) return 'archived'
  if (entry.isUpdated()) return 'updated'
  if (entry.isDraft()) return 'draft'
  if (entry.isPublished()) return 'published'
  return 'unknown'
}

const mapEntryToFiche = (entry: Entry) => ({
  id: entry.sys.id,
  titre: entry.fields.titre?.fr || '',
  slug: entry.fields.slug?.fr || '',
  categorie: entry.fields.categorie?.fr || '',
  description: entry.fields.description?.fr || '',
  createdAt: entry.sys.createdAt,
  updatedAt: entry.sys.updatedAt,
  status: getFicheStatus(entry),
})

export const getAllFichesForAdmin = async (): Promise<FicheWithStatus[]> => {
  const environment = await getContentfulEnvironment()

  const entries = await environment.getEntries({
    content_type: 'fiche',
    limit: 1000,
  })

  return entries.items.map(mapEntryToFiche)
}

// Types pour les assets et liens
export type Asset = {
  id: string
  title: string
  url: string
  fileName: string
  contentType: string
}

export type Link = {
  id: string
  titre: string
  url?: string // URL optionnelle
  fichier?: string // Asset ID optionnel
  description?: string
}

export type LinkFormData = {
  id?: string // Si undefined, c'est un nouveau lien
  titre: string
  url?: string // URL optionnelle
  fichier?: string // Asset ID optionnel pour fichier uploadé
  description?: string
}

// Récupérer tous les assets (images) disponibles
export const getAllAssets = async (): Promise<Asset[]> => {
  const environment = await getContentfulEnvironment()

  try {
    const assets = await environment.getAssets({ limit: 1000 })

    return assets.items.map(asset => ({
      id: asset.sys.id,
      title: asset.fields.title?.fr || asset.fields.title?.en || 'Sans titre',
      url: asset.fields.file?.fr?.url || asset.fields.file?.en?.url || '',
      fileName: asset.fields.file?.fr?.fileName || asset.fields.file?.en?.fileName || '',
      contentType: asset.fields.file?.fr?.contentType || asset.fields.file?.en?.contentType || '',
    }))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching assets:', error)
    return []
  }
}

// Récupérer tous les liens disponibles
export const getAllLinks = async (): Promise<Link[]> => {
  const environment = await getContentfulEnvironment()

  try {
    const entries = await environment.getEntries({
      content_type: 'lien',
      limit: 1000,
    })

    return entries.items.map(entry => ({
      id: entry.sys.id,
      titre: entry.fields.titre?.fr || '',
      url: entry.fields.url?.fr || undefined,
      fichier: entry.fields.fichier?.fr?.sys?.id || undefined,
      description: entry.fields.description?.fr || undefined,
    }))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching links:', error)
    return []
  }
}

// Récupérer les liens associés à une fiche spécifique
export const getLinksForFiche = async (linkIds: string[]): Promise<Link[]> => {
  if (linkIds.length === 0) return []

  const environment = await getContentfulEnvironment()

  try {
    // Récupérer seulement les liens dont les IDs sont dans le tableau
    const entries = await environment.getEntries({
      content_type: 'lien',
      'sys.id[in]': linkIds.join(','),
      limit: 1000,
    })

    return entries.items.map(entry => ({
      id: entry.sys.id,
      titre: entry.fields.titre?.fr || '',
      url: entry.fields.url?.fr || undefined,
      fichier: entry.fields.fichier?.fr?.sys?.id || undefined,
      description: entry.fields.description?.fr || undefined,
    }))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching links for fiche:', error)
    return []
  }
}

// Créer ou mettre à jour un lien
export const createOrUpdateLink = async (linkData: LinkFormData): Promise<string> => {
  const environment = await getContentfulEnvironment()

  try {
    let entry

    if (linkData.id) {
      // Mettre à jour un lien existant
      entry = await environment.getEntry(linkData.id)
      entry.fields.titre = { fr: linkData.titre }

      // Gérer URL ou fichier (mutuellement exclusifs)
      if (linkData.url) {
        entry.fields.url = { fr: linkData.url }
        entry.fields.fichier = { fr: null } // Effacer le fichier si on met une URL
      } else if (linkData.fichier) {
        entry.fields.fichier = {
          fr: {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: linkData.fichier,
            },
          },
        }
        entry.fields.url = { fr: null } // Effacer l'URL si on met un fichier
      }

      if (linkData.description) {
        entry.fields.description = { fr: linkData.description }
      }

      await entry.update()
    } else {
      // Créer un nouveau lien
      const fields: any = {
        titre: { fr: linkData.titre },
      }

      // Ajouter URL ou fichier selon ce qui est fourni
      if (linkData.url) {
        fields.url = { fr: linkData.url }
      } else if (linkData.fichier) {
        fields.fichier = {
          fr: {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: linkData.fichier,
            },
          },
        }
      }

      if (linkData.description) {
        fields.description = { fr: linkData.description }
      }

      entry = await environment.createEntry('lien', { fields })
    }

    return entry.sys.id
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating/updating link:', error)
    throw error
  }
}

// Supprimer un lien
export const deleteLink = async (linkId: string): Promise<void> => {
  const environment = await getContentfulEnvironment()

  try {
    const entry = await environment.getEntry(linkId)

    // Dépublier d'abord si publié
    if (entry.isPublished()) {
      await entry.unpublish()
    }

    await entry.delete()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error deleting link:', error)
    throw error
  }
}

// Uploader un fichier vers Contentful Assets
export const uploadFileToContentful = async (file: File): Promise<string> => {
  const environment = await getContentfulEnvironment()

  try {
    // Créer l'asset avec les métadonnées du fichier
    const asset = await environment.createAssetFromFiles({
      fields: {
        title: {
          fr: file.name.split('.')[0], // Nom du fichier sans extension
        },
        description: {
          fr: `Fichier uploadé: ${file.name}`,
        },
        file: {
          fr: {
            contentType: file.type,
            fileName: file.name,
            file: await file.arrayBuffer(),
          },
        },
      },
    })

    // Traiter l'asset (nécessaire pour Contentful)
    await asset.processForAllLocales()

    // Attendre que le traitement soit terminé
    let processedAsset = asset
    let attempts = 0
    const maxAttempts = 30 // 30 secondes max

    while (attempts < maxAttempts) {
      processedAsset = await environment.getAsset(asset.sys.id)
      const fileInfo = processedAsset.fields.file?.fr

      if (fileInfo && fileInfo.url) {
        // Le fichier est prêt, on peut publier l'asset
        await processedAsset.publish()
        return asset.sys.id // Retourner l'ID de l'asset, pas l'URL
      }

      // Attendre 1 seconde avant de réessayer
      await new Promise(resolve => setTimeout(resolve, 1000))
      attempts++
    }

    throw new Error('Timeout: Le traitement du fichier a pris trop de temps')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error uploading file to Contentful:', error)
    throw error
  }
}

export const publishAllUpdatedFiches = async (): Promise<FicheWithStatus[]> => {
  const environment = await getContentfulEnvironment()

  // Récupérer toutes les fiches avec le statut "updated"
  const entries = await environment.getEntries({
    content_type: 'fiche',
    limit: 1000,
  })

  const updatedEntries = entries.items.filter(entry => entry.isUpdated())

  if (updatedEntries.length === 0) {
    return []
  }

  return Promise.all(updatedEntries.map(entry => entry.publish().then(mapEntryToFiche)))
}

// Récupérer un asset spécifique par son ID
export const getAssetById = async (assetId: string): Promise<Asset | null> => {
  if (!assetId) return null

  const environment = await getContentfulEnvironment()

  try {
    const asset = await environment.getAsset(assetId)

    return {
      id: asset.sys.id,
      title: asset.fields.title?.fr || asset.fields.title?.en || 'Sans titre',
      url: asset.fields.file?.fr?.url || asset.fields.file?.en?.url || '',
      fileName: asset.fields.file?.fr?.fileName || asset.fields.file?.en?.fileName || '',
      contentType: asset.fields.file?.fr?.contentType || asset.fields.file?.en?.contentType || '',
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching asset:', error)
    return null
  }
}
