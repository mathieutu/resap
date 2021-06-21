import algoliaSearch from 'algoliasearch'
import { Fiche } from '../types/models'

const { ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY } = process.env

if (!ALGOLIA_APP_ID || !ALGOLIA_ADMIN_KEY) {
  throw new Error('Algolia env vars needed (ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY).')
}

const algoliaClient = algoliaSearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY)

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
