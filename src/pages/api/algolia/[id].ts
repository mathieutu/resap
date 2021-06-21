import { NextApiRequest, NextApiResponse } from 'next'
import { findAFicheForIndexing } from '../../../services/contentful'
import { deleteFiche, saveFiche } from '../../../services/algolia'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const ficheId = req.query.id as string

  if (req.method === 'DELETE') {
    // eslint-disable-next-line no-console
    console.log(`Deleting ${ficheId}`)
    return res.json(await deleteFiche(ficheId))
  }

  if (req.method === 'PUT') {
    // eslint-disable-next-line no-console
    console.log(`Updating ${ficheId}`)
    const fiche = await findAFicheForIndexing(ficheId, req.preview)

    if (!fiche) return res.status(404).json({ error: 'Fiche not found' })

    const savedObjectResponse = await saveFiche(fiche)

    return res.json(savedObjectResponse)
  }

  return res
    .status(405)
    .json({ error: `Method ${req.method} not allowed. You can only DELETE and PUT objects.` })
}
