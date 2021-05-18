import { createClient } from 'contentful'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown'
import { map } from 'ramda'
import { Fiche } from '../types/models'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

const CONTENT_TYPES = {
  auteur: 'auteur',
  categorie: 'categorie',
  fiche: 'fiche',
  structure: 'structure',
} as const

const markdownToHtmlString = async (markdown: string) => (
  documentToHtmlString(await richTextFromMarkdown(markdown))
)

const sanitizeEntries = (element: any) => {
  if (typeof element !== 'object') return element

  if (element.sys) {
    return ({
      id: element.sys.id,
      createdAt: element.sys.createdAt,
      ...sanitizeEntries(element.fields),
    })
  }

  return map(sanitizeEntries, element)
}

export const listAllFiches = async (): Promise<Fiche[]> => {
  const entries = await client.getEntries({
    content_type: CONTENT_TYPES.fiche,
    include: 1,
  })

  return Promise.all(sanitizeEntries(entries.items)
    .map(async fields => ({
      ...fields,
      description: await markdownToHtmlString(fields.description),
      contenu: documentToHtmlString(fields.contenu),
    })))
}
