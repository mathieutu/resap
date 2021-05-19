import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { secret, slug } = req.query

  if (process.env.NODE_ENV === 'production' && secret !== process.env.CONTENTFUL_PREVIEW_SECRET /* || !slug*/) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    maxAge: 60 * 60, // The preview mode cookies expire in 1 hour
  })

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities

  return res.redirect('/fiches')
}
