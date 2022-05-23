import algoliaSearch, { SearchIndex } from 'algoliasearch'
import { Fiche, Structure } from '../types/models'

const { NEXT_PUBLIC_ALGOLIA_APP_ID: appId, ALGOLIA_ADMIN_API_KEY: apiKey } = process.env

if (!appId || !apiKey) {
  throw new Error('Algolia env vars needed (NEXT_PUBLIC_ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY).')
}

const algoliaClient = algoliaSearch(appId, apiKey)

// eslint-disable-next-line no-underscore-dangle,one-var-declaration-per-line,one-var
let _fichesIndex: SearchIndex, _structuresIndex: SearchIndex

const getFichesIndex = () => {
  if (!_fichesIndex) _fichesIndex = algoliaClient.initIndex('fiches')

  return _fichesIndex
}

const getStructuresIndex = () => {
  if (!_structuresIndex) _structuresIndex = algoliaClient.initIndex('structures')

  return _structuresIndex
}

export const deleteFiche = (objectId: string) => getFichesIndex().deleteObject(objectId)

const prepareFicheForIndexing = (fiche: Fiche) => ({
  ...fiche,
  url: `/fiches/${fiche.slug}`,
  objectID: fiche.id,
})

export const saveFiche = (fiche: Fiche) => {
  const objectToIndex = prepareFicheForIndexing(fiche)

  return getFichesIndex().saveObject(objectToIndex)
}

export const saveFiches = (fiches: Fiche[]) => {
  const objectsToIndex = fiches.map(prepareFicheForIndexing)

  return getFichesIndex().saveObjects(objectsToIndex)
}

export const refreshFiches = async (fiches: Fiche[]) => {
  const objectsToIndex = fiches.map(prepareFicheForIndexing)

  await getFichesIndex().clearObjects()
  return getFichesIndex().saveObjects(objectsToIndex)
}

const prepareStructureForIndexing = (structure: Structure) => ({
  ...structure,
  url: `/structures/${structure.id}`,
  objectID: structure.id,
  _geoloc: {
    lat: structure.latLon.lat,
    lng: structure.latLon.lon,
  },
})

export const deleteStructure = (objectId: string) => getStructuresIndex().deleteObject(objectId)

export const saveStructure = (structure: Structure) => {
  const objectToIndex = prepareStructureForIndexing(structure)

  return getStructuresIndex().saveObject(objectToIndex)
}

export const saveStructures = (structures: Structure[]) => {
  const objectsToIndex = structures.map(prepareStructureForIndexing)
  return getStructuresIndex().saveObjects(objectsToIndex)
}

export const refreshStructures = async (structures: Structure[]) => {
  await getStructuresIndex().clearObjects()
  console.log('Structures index cleared.')

  return saveStructures(structures)
}
