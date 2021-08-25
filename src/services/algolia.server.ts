import algoliaSearch from 'algoliasearch'
import { Fiche } from '../types/models'

const { NEXT_PUBLIC_ALGOLIA_APP_ID: appId, ALGOLIA_ADMIN_KEY: apiKey } = process.env

if (!appId || !apiKey) {
  throw new Error('Algolia env vars needed (NEXT_PUBLIC_ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY).')
}

const algoliaClient = algoliaSearch(appId, apiKey)

const fichesIndex = algoliaClient.initIndex('fiches')

export const deleteFiche = (objectId: string) => fichesIndex.deleteObject(objectId)

export const saveFiche = (fiche: Fiche) => {
  const objectToIndex = {
    ...fiche,
    url: `/fiches/${fiche.slug}`,
    objectID: fiche.id,
  }

  return fichesIndex.saveObject(objectToIndex)
}
