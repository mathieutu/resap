/* eslint-disable no-console */

import { flatten, pluck } from 'ramda'
import {
  ContentType,
  fetchAllStructuresForIndexing,
  findAStructure,
  SysType,
} from '@/services/contentful'
import { deleteStructure, refreshStructures, saveStructure } from '@/services/algolia.server'

export async function GET() {
  console.log('Refreshing all the structures')
  const structures = await fetchAllStructuresForIndexing()

  if (!structures) {
    return Response.json({ error: 'No structure found in contentful.' }, { status: 404 })
  }

  console.log(`Found ${structures.length} structures in contentful.`)

  const savedObjectsResponse = await refreshStructures(structures)
  const objectsIDs = flatten(pluck('objectIDs', savedObjectsResponse))

  console.log(`Inserted ${objectsIDs.length} objects in Algolia.`)

  return Response.json({ length: objectsIDs.length, objectsIDs })
}

export async function DELETE(req: Request) {
  const body = await req.json()

  if (!body.id) {
    return Response.json({ error: 'Missing id in request body' }, { status: 400 })
  }

  console.log(`Deleting structure id ${body.id}`)

  const result = await deleteStructure(body.id)
  return Response.json(result)
}

export async function PUT(req: Request) {
  const body = await req.json() as { id: string, sysType: SysType, contentType: ContentType }

  if (!body.id) {
    return Response.json({ error: 'Missing id in request body' }, { status: 400 })
  }

  console.log(`Updating structure id ${body.id}...`)
  const structure = await findAStructure(body.id)

  if (!structure) {
    return Response.json({ error: 'Structure not found' }, { status: 404 })
  }

  console.log(`Structure ${structure.nom} found.`)

  const savedObjectResponse = await saveStructure(structure)

  return Response.json(savedObjectResponse)
}
