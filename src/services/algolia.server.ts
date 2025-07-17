/* eslint-disable no-console */
import { algoliasearch } from 'algoliasearch'
import { Fiche, Structure } from '../types/models'

const { NEXT_PUBLIC_ALGOLIA_APP_ID: appId, ALGOLIA_ADMIN_API_KEY: apiKey } = process.env

if (!appId || !apiKey) {
  throw new Error('Algolia env vars needed (NEXT_PUBLIC_ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY).')
}

const client = algoliasearch(appId, apiKey)

const fichesIndex = <T extends Record<string, any>>(payload: T) => ({ indexName: 'fiches', ...payload })
const structuresIndex = <T extends Record<string, any>>(payload: T) => ({ indexName: 'structures', ...payload })

const prepareFicheForIndexing = (fiche: Fiche) => ({
  ...fiche,
  url: `/fiches/${fiche.slug}`,
  objectID: fiche.id,
})

export const deleteFiche = (objectID: string) => client.deleteObject(fichesIndex({ objectID }))

export const saveFiche = (fiche: Fiche) => {
  const body = prepareFicheForIndexing(fiche)

  return client.saveObject(fichesIndex({ body }))
}

export const saveFiches = (fiches: Fiche[]) => {
  const objects = fiches.map(prepareFicheForIndexing)

  return client.saveObjects(fichesIndex({ objects }))
}

export const refreshFiches = async (fiches: Fiche[]) => {
  await client.clearObjects(fichesIndex({}))

  return saveFiches(fiches)
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

export const deleteStructure = (objectID: string) => client.deleteObject(structuresIndex({ objectID }))

export const saveStructure = (structure: Structure) => {
  const body = prepareStructureForIndexing(structure)

  return client.saveObject(structuresIndex({ body }))
}

export const saveStructures = (structures: Structure[]) => {
  const objects = structures.map(prepareStructureForIndexing)
  return client.saveObjects(structuresIndex({ objects }))
}

export const refreshStructures = async (structures: Structure[]) => {
  await client.clearObjects(structuresIndex({}))
  console.log('Structures index cleared.')

  return saveStructures(structures)
}
