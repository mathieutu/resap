import { createClient } from 'contentful'
// @ts-ignore TODO https://github.com/contentful/rich-text/issues/252
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { map } from 'ramda'
import type { Document } from '@contentful/rich-text-types'
import { Fiche } from '../types/models'
import { CategorieSlug } from './categories'

const { CONTENTFUL_SPACE_ID, CONTENTFUL_PREVIEW_ACCESS_TOKEN, CONTENTFUL_ACCESS_TOKEN } = process.env

if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_PREVIEW_ACCESS_TOKEN || !CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('CONTENTFUL env vars needed (SPACE_ID, PREVIEW_ACCESS_TOKEN, ACCESS_TOKEN).')
}

const CONTENT_TYPES = {
  auteur: 'auteur',
  categorie: 'categorie',
  fiche: 'fiche',
  structure: 'structure',
} as const

type ContentType = typeof CONTENT_TYPES[keyof typeof CONTENT_TYPES]

type GetEntriesOptions = {
  preview?: boolean,
  select?: string[],
  where?: Record<string, string>,
}

type FicheEntry = Fiche & {
  contenu: Document,
}

const parseContentfulEntries = (element: any): any => {
  if (typeof element !== 'object') return element

  if (element.sys) {
    return ({
      id: element.sys.id,
      createdAt: element.sys.createdAt,
      ...parseContentfulEntries(element.fields),
    })
  }

  // eslint-disable-next-line no-param-reassign
  if (element.file) element.file.url = element.file.url.replace(/^\/\//, 'https://')

  return map(parseContentfulEntries, element)
}

const getEntries = async <T extends Record<string, unknown>>(
  contentType: ContentType,
  options: GetEntriesOptions = {},
): Promise<T[]> => {
  const { preview = false, select = [], where = {} } = options

  const entries = await createClient({
    space: CONTENTFUL_SPACE_ID,
    accessToken: preview ? CONTENTFUL_PREVIEW_ACCESS_TOKEN : CONTENTFUL_ACCESS_TOKEN,
    host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  }).getEntries({
    content_type: contentType,
    select: select.join(','),
    ...where,
  })

  return parseContentfulEntries(entries.items)
}

export const listAllFiches = (preview = false): Promise<Fiche[]> => (
  getEntries<FicheEntry>(
    CONTENT_TYPES.fiche,
    { preview, select: ['fields.slug', 'sys.createdAt', 'fields.titre', 'fields.illustration', 'fields.description'] },
  )
)
export const listAllFichesSlugs = async (preview = false) => (
  getEntries<{ slug: string, categorie: CategorieSlug }>(
    CONTENT_TYPES.fiche,
    { preview, select: ['fields.slug', 'fields.categorie'] },
  )
)

export const findAFiche = async (slug: string, preview = false): Promise<Fiche | null> => {
  const entries = await getEntries<FicheEntry>(
    CONTENT_TYPES.fiche,
    { preview, where: { 'fields.slug': slug } },
  )

  if (!entries.length) return null

  const fiche = entries[0]

  return {
    ...fiche,
    contenu: documentToHtmlString(fiche.contenu),
  }
}

export const findAFicheForIndexing = async (id: string, preview = false): Promise<Fiche | null> => {
  const entries = await getEntries<FicheEntry>(
    CONTENT_TYPES.fiche,
    { preview, where: { 'sys.id': id } },
  )

  if (!entries.length) return null

  const fiche = entries[0]

  return {
    ...fiche,
    contenu: documentToPlainTextString(fiche.contenu),
  }
}
