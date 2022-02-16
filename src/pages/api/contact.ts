import { NextApiRequest, NextApiResponse } from 'next'
import { mailer } from '../../services/mailer'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { contact } = req.body

  const mail = await mailer.send('ContactEmail', contact, { to: 'contact@resap.fr' })

  if (mail.rejected.length) {
    return res.status(500).json({ error: true })
  }

  return res.status(204).send(null)
}
