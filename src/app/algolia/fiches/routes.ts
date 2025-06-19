/* eslint-disable no-console */

import { flatten, pluck } from 'ramda'
import { deleteFiche, refreshFiches, saveFiche, saveFiches } from '@/services/algolia.server'
import { ContentType, CONTENT_TYPES, fetchAllFichesForIndexing, findAFicheForIndexing, findAllFichesLinkedToAssetForIndexing, findAllFichesLinkedToEntryForIndexing, SysType, SYS_TYPES } from '@/services/contentful'

export async function GET() {
  console.log('Refreshing all the fiches')
  const fiches = await fetchAllFichesForIndexing()

  if (!fiches) {
    return Response.json({ error: 'No fiche found in contentful.' }, { status: 404 })
  }

  console.log(`Found ${fiches.length} fiches in contentful.`)

  const savedObjectsResponse = await refreshFiches(fiches)
  const objectsIDs = flatten(pluck('objectIDs', savedObjectsResponse))

  console.log(`Inserted ${objectsIDs.length} objects in Algolia.`)

  return Response.json({ length: objectsIDs.length, objectsIDs })
}

export async function DELETE(req: Request) {
  const body = await req.json()
  if (!body.id) {
    return Response.json({ error: 'Missing id in request body' }, { status: 400 })
  }
  const result = await deleteFiche(body.id)
  console.log(`Deleted fiche ${body.id}`)

  return Response.json(result)
}

export async function PUT(req: Request) {
  const body = await req.json() as { id: string, sysType: SysType, contentType: ContentType }
  if (!body.id) {
    return Response.json({ error: 'Missing id in request body' }, { status: 400 })
  }

  if (body.sysType === SYS_TYPES.asset) {
    console.log(`Updating fiches linked with asset ${body.id}...`)
    const fiches = await findAllFichesLinkedToAssetForIndexing(body.id)

    if (!fiches) {
      return Response.json({ error: 'No fiches linked to that asset.' }, { status: 404 })
    }

    console.log(`Found ${fiches.length} fiches linked to that asset.`)

    const savedObjectResponse = await saveFiches(fiches)

    return Response.json(savedObjectResponse)
  }

  if (body.contentType !== CONTENT_TYPES.fiche) {
    console.log(`Updating fiches linked with entry ${body.id}...`)
    const fiches = await findAllFichesLinkedToEntryForIndexing(body.id)

    if (!fiches) {
      return Response.json({ error: 'No fiches linked to that entry.' }, { status: 404 })
    }

    console.log(`Found ${fiches.length} fiches linked to that entry.`)

    const savedObjectResponse = await saveFiches(fiches)

    return Response.json(savedObjectResponse)
  }

  console.log(`Updating ${body.id}...`)

  const fiche = await findAFicheForIndexing(body.id)

  if (!fiche) {
    return Response.json({ error: 'Fiche not found' }, { status: 404 })
  }

  console.log('Fiche found.')

  const savedObjectResponse = await saveFiche(fiche)

  return Response.json(savedObjectResponse)
}
