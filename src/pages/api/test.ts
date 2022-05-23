import { NextApiRequest, NextApiResponse } from 'next'
import { listAllStructures } from '../../services/contentful'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const structures = await listAllStructures()
  return res.status(200).json(structures)
}
