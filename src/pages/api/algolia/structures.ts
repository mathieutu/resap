/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next'
import {
  CONTENT_TYPES,
  ContentType,
  fetchAllStructuresForIndexing,
  findAllStructuresLinkedToAssetForIndexing,
  findAllStructuresLinkedToEntryForIndexing,
  findAStructureForIndexing,
  SYS_TYPES,
  SysType,
} from '../../../services/contentful'
import { deleteStructure, refreshStructures, saveStructure, saveStructures } from '../../../services/algolia.server'

const deleteStructureFromAlgolia = async (structureId: string, res: NextApiResponse) => {
  console.log(`Deleting ${structureId}`)
  return res.json(await deleteStructure(structureId))
}

const updateStructureInAlgolia = async (structureId: string, res: NextApiResponse) => {
  console.log(`Updating ${structureId}...`)
  const structure = await findAStructureForIndexing(structureId)

  if (!structure) return res.status(404).json({ error: 'Structure not found' })

  console.log('Structure found.')

  const savedObjectResponse = await saveStructure(structure)

  return res.json(savedObjectResponse)
}

const updateAllStructuresLinkedToAsset = async (assetId: string, res: NextApiResponse) => {
  console.log(`Updating structures linked with asset ${assetId}...`)
  const structures = await findAllStructuresLinkedToAssetForIndexing(assetId)

  if (!structures) return res.status(404).json({ error: 'No structures linked to that asset.' })

  console.log(`Found ${structures.length} structures linked to that asset.`)

  const savedObjectResponse = await saveStructures(structures)

  return res.json(savedObjectResponse)
}

const updateAllStructuresLinkedToEntry = async (entryId: string, res: NextApiResponse) => {
  console.log(`Updating structures linked with entry ${entryId}...`)
  const structures = await findAllStructuresLinkedToEntryForIndexing(entryId)

  if (!structures) return res.status(404).json({ error: 'No structures linked to that entry.' })

  console.log(`Found ${structures.length} structures linked to that entry.`)

  const savedObjectResponse = await saveStructures(structures)

  return res.json(savedObjectResponse)
}

const refreshStructuresIndex = async (res: NextApiResponse) => {
  console.log('Refreshing all the structures')
  const structures = await fetchAllStructuresForIndexing()

  if (!structures) return res.status(404).json({ error: 'No structure found in contentful.' })

  console.log(`Found ${structures.length} structures in contentful.`)

  const savedObjectResponse = await refreshStructures(structures)

  const { length } = savedObjectResponse.objectIDs

  res.json({ length, ...savedObjectResponse })

  console.log(`Inserted ${length} objects in Algolia.`)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as { id: string, sysType: SysType, contentType: ContentType }

  if (req.method === 'DELETE') return deleteStructureFromAlgolia(body.id, res)

  if (req.method === 'GET') return refreshStructuresIndex(res)

  if (req.method === 'PUT') {
    if (body.sysType === SYS_TYPES.asset) return updateAllStructuresLinkedToAsset(body.id, res)
    if (body.contentType !== CONTENT_TYPES.structure) return updateAllStructuresLinkedToEntry(body.id, res)

    return updateStructureInAlgolia(body.id, res)
  }

  return res
    .status(405)
    .json({ error: `Method ${req.method} not allowed. You can only DELETE and PUT objects.` })
}
