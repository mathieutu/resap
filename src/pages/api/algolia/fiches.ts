/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next'
import { flatten, pluck } from 'ramda'
import { ContentType, CONTENT_TYPES, fetchAllFichesForIndexing, findAFicheForIndexing, findAllFichesLinkedToAssetForIndexing, findAllFichesLinkedToEntryForIndexing, SysType, SYS_TYPES } from '../../../services/contentful'
import { deleteFiche, refreshFiches, saveFiche, saveFiches } from '../../../services/algolia.server'

const deleteFicheFromAlgolia = async (ficheId: string, res: NextApiResponse) => {
  console.log(`Deleting ${ficheId}`)
  return res.json(await deleteFiche(ficheId))
}

const updateFicheInAlgolia = async (ficheId: string, res: NextApiResponse) => {
  console.log(`Updating ${ficheId}...`)
  const fiche = await findAFicheForIndexing(ficheId)

  if (!fiche) return res.status(404).json({ error: 'Fiche not found' })

  console.log('Fiche found.')

  const savedObjectResponse = await saveFiche(fiche)

  return res.json(savedObjectResponse)
}

const updateAllFichesLinkedToAsset = async (assetId: string, res: NextApiResponse) => {
  console.log(`Updating fiches linked with asset ${assetId}...`)
  const fiches = await findAllFichesLinkedToAssetForIndexing(assetId)

  if (!fiches) return res.status(404).json({ error: 'No fiches linked to that asset.' })

  console.log(`Found ${fiches.length} fiches linked to that asset.`)

  const savedObjectResponse = await saveFiches(fiches)

  return res.json(savedObjectResponse)
}

const updateAllFichesLinkedToEntry = async (entryId: string, res: NextApiResponse) => {
  console.log(`Updating fiches linked with entry ${entryId}...`)
  const fiches = await findAllFichesLinkedToEntryForIndexing(entryId)

  if (!fiches) return res.status(404).json({ error: 'No fiches linked to that entry.' })

  console.log(`Found ${fiches.length} fiches linked to that entry.`)

  const savedObjectResponse = await saveFiches(fiches)

  return res.json(savedObjectResponse)
}

const refreshFichesIndex = async (res: NextApiResponse) => {
  console.log('Refreshing all the fiches')
  const fiches = await fetchAllFichesForIndexing()

  if (!fiches) return res.status(404).json({ error: 'No fiche found in contentful.' })

  console.log(`Found ${fiches.length} fiches in contentful.`)

  const savedObjectsResponse = await refreshFiches(fiches)

  const objectsIDs = flatten(pluck('objectIDs', savedObjectsResponse))

  res.json({ length: objectsIDs.length, objectsIDs })

  console.log(`Inserted ${objectsIDs.length} objects in Algolia.`)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as { id: string, sysType: SysType, contentType: ContentType }
  if (req.method === 'GET') return refreshFichesIndex(res)

  if (!body.id) return res.status(400).json({ error: 'Missing id in request body' })

  if (req.method === 'DELETE') return deleteFicheFromAlgolia(body.id, res)

  if (req.method === 'PUT') {
    if (body.sysType === SYS_TYPES.asset) return updateAllFichesLinkedToAsset(body.id, res)
    if (body.contentType !== CONTENT_TYPES.fiche) return updateAllFichesLinkedToEntry(body.id, res)

    return updateFicheInAlgolia(body.id, res)
  }

  return res
    .status(405)
    .json({ error: `Method ${req.method} not allowed. You can only GET, DELETE and PUT objects.` })
}
