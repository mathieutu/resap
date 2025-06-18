/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next'
import { flatten, pluck } from 'ramda'
import {
  ContentType,
  fetchAllStructuresForIndexing,
  findAStructureForIndexing,
  SysType,
} from '../../../services/contentful'
import { deleteStructure, refreshStructures, saveStructure } from '../../../services/algolia.server'

const deleteStructureFromAlgolia = async (structureId: string, res: NextApiResponse) => {
  console.log(`Deleting structure id ${structureId}`)
  return res.json(await deleteStructure(structureId))
}

const updateStructureInAlgolia = async (structureId: string, res: NextApiResponse) => {
  console.log(`Updating structure id ${structureId}...`)
  const structure = await findAStructureForIndexing(structureId)

  if (!structure) return res.status(404).json({ error: 'Structure not found' })

  console.log(`Structure ${structure.nom} found.`)

  const savedObjectResponse = await saveStructure(structure)

  return res.json(savedObjectResponse)
}

const refreshStructuresIndex = async (res: NextApiResponse) => {
  console.log('Refreshing all the structures')
  const structures = await fetchAllStructuresForIndexing()

  if (!structures) {
    res
      .status(404)
      .json({ error: 'No structure found in contentful.' })
    return
  }

  console.log(`Found ${structures.length} structures in contentful.`)

  const savedObjectsResponse = await refreshStructures(structures)

  const objectsIDs = flatten(pluck('objectIDs', savedObjectsResponse))

  res.json({ length: objectsIDs.length, objectsIDs })

  console.log(`Inserted ${objectsIDs.length} objects in Algolia.`)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as { id: string, sysType: SysType, contentType: ContentType }
  if (req.method === 'GET') return refreshStructuresIndex(res)

  if (!body.id) return res.status(400).json({ error: 'Missing id in request body' })

  if (req.method === 'DELETE') return deleteStructureFromAlgolia(body.id, res)

  if (req.method === 'PUT') return updateStructureInAlgolia(body.id, res)

  return res
    .status(405)
    .json({ error: `Method ${req.method} not allowed. You can only GET,DELETE and PUT objects.` })
}
