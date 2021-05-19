import { createClient } from 'contentful'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown'
import { map } from 'ramda'
import { Fiche } from '../types/models'

const CONTENT_TYPES = {
  auteur: 'auteur',
  categorie: 'categorie',
  fiche: 'fiche',
  structure: 'structure',
} as const

type ContentType = typeof CONTENT_TYPES[keyof typeof CONTENT_TYPES]

const getEntries = (contentType: ContentType, preview = false) => createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: preview ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN,
  host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
}).getEntries({ content_type: contentType })

const markdownToHtmlString = async (markdown: string) => (
  documentToHtmlString(await richTextFromMarkdown(markdown))
)

const parseContentfulEntries = (element: any) => {
  if (typeof element !== 'object') return element

  if (element.sys) {
    return ({
      id: element.sys.id,
      createdAt: element.sys.createdAt,
      ...parseContentfulEntries(element.fields),
    })
  }

  // eslint-disable-next-line no-param-reassign
  if (element.file) element.file.url = `https:${element.file.url}`

  return map(parseContentfulEntries, element)
}

export const listAllFiches = async (preview: boolean): Promise<Fiche[]> => {
  const entries = await getEntries(CONTENT_TYPES.fiche, preview)

  return Promise.all(parseContentfulEntries(entries.items)
    .map(async fields => ({
      ...fields,
      description: await markdownToHtmlString(fields.description),
      contenu: documentToHtmlString(fields.contenu),
    })))
}
