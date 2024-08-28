/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next'
import {
  ContentType,
  fetchAllStructuresForIndexing,
  findAStructureForIndexing,
  SysType,
} from '../../../services/contentful'
import { deleteStructure, refreshStructures, saveStructure } from '../../../services/algolia.server'
import { log } from 'console'

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

  const savedObjectResponse = await refreshStructures(structures)

  const { length } = savedObjectResponse.objectIDs

  res.json({ length, ...savedObjectResponse })

  console.log(`Inserted ${length} objects in Algolia.`)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as { id: string, sysType: SysType, contentType: ContentType }
  
  console.log(body)

  if (!body.id) return res.status(400).json({ error: 'Missing id in request body' })

  if (req.method === 'DELETE') return deleteStructureFromAlgolia(body.id, res)

  if (req.method === 'PUT') return updateStructureInAlgolia(body.id, res)

  if (req.method === 'GET') return refreshStructuresIndex(res)

  return res
    .status(405)
    .json({ error: `Method ${req.method} not allowed. You can only DELETE and PUT objects.` })
}
