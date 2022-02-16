import { createClient } from 'contentful'
import { documentToHtmlString, Options } from '@contentful/rich-text-html-renderer'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { map } from 'ramda'
import { Document, BLOCKS } from '@contentful/rich-text-types'
import { Fiche } from '../types/models'
import { CategorieSlug } from './categories'

const { CONTENTFUL_SPACE_ID, CONTENTFUL_PREVIEW_ACCESS_TOKEN, CONTENTFUL_ACCESS_TOKEN, FORCE_CONTENTFUL_PREVIEW } = process.env

if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_PREVIEW_ACCESS_TOKEN || !CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('CONTENTFUL env vars needed (SPACE_ID, PREVIEW_ACCESS_TOKEN, ACCESS_TOKEN).')
}

export const SYS_TYPES = {
  asset: 'Asset',
  entry: 'Entry',
}

export const CONTENT_TYPES = {
  auteur: 'auteur',
  categorie: 'categorie',
  fiche: 'fiche',
  structure: 'structure',
} as const

export type ContentType = typeof CONTENT_TYPES[keyof typeof CONTENT_TYPES]
export type SysType = typeof SYS_TYPES[keyof typeof SYS_TYPES]

type GetEntriesOptions = {
  preview?: boolean,
  select?: string[],
  where?: Record<string, string>,
}

type FicheEntry = Fiche & {
  resume: Document,
  contenu: Document,
}

const parseContentfulEntries = (element: any): any => {
  if (typeof element !== 'object') return element

  if (element.nodeType === BLOCKS.DOCUMENT) return element

  if (element.sys) {
    return ({
      id: element.sys.id,
      createdAt: element.sys.createdAt,
      updatedAt: element.sys.updatedAt,
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
  const { preview = Boolean(FORCE_CONTENTFUL_PREVIEW), select = [], where = {} } = options

  const entries = await createClient({
    space: CONTENTFUL_SPACE_ID,
    accessToken: (preview || FORCE_CONTENTFUL_PREVIEW) ? CONTENTFUL_PREVIEW_ACCESS_TOKEN : CONTENTFUL_ACCESS_TOKEN,
    host: (preview || FORCE_CONTENTFUL_PREVIEW) ? 'preview.contentful.com' : 'cdn.contentful.com',
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

const convertContentfulContentToHtml = (content: Document): string => {
  const attr = (value: string) => `"${value.replace(/"/g, '&quot;')}"`

  const options: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { title, file } = node.data.target.fields

        if (file.contentType.includes('video')) {
          return `
            <video controls class="print:hidden">
              <source src=${attr(file.url)} type=${attr(file.contentType)}/>
              <p>Your browser doesnt support HTML5 video.</p>
            </video>
          `
        }

        if (file.contentType.includes('image') || file.contentType.includes('svg')) {
          return `
            <a href=${attr(file.url)} target="_blank" rel="noopener noreferer">
              <img class="rounded" src=${attr(file.url)} alt=${attr(title)}/>
            </a>
          `
        }

        return `
          <a href=${attr(file.url)} target="_blank" rel="noopener noreferer" class="not-prose print:hidden inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded text-blue-default bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-default">
            <svg class="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            ${title}
          </a>
        `
      },
    },
  }

  return documentToHtmlString(content, options)
}

export const formatFicheForSearch = (fiche: FicheEntry): Fiche => ({
  ...fiche,
  contenu: documentToPlainTextString(fiche.contenu),
  resume: documentToPlainTextString(fiche.resume),
})

export const findAFiche = async (slug: string, preview = false): Promise<Fiche | null> => {
  const entries = await getEntries<FicheEntry>(
    CONTENT_TYPES.fiche,
    { preview, where: { 'fields.slug': slug } },
  )

  if (!entries.length) return null

  const fiche = entries[0]

  return {
    ...fiche,
    resume: convertContentfulContentToHtml(fiche.resume),
    contenu: convertContentfulContentToHtml(fiche.contenu),
  }
}

export const findAFicheForIndexing = async (id: string): Promise<Fiche | null> => {
  const entries = await getEntries<FicheEntry>(
    CONTENT_TYPES.fiche,
    { where: { 'sys.id': id } },
  )

  if (!entries.length) return null

  const fiche = entries[0]

  return formatFicheForSearch(fiche)
}

export const findAllFichesLinkedToAssetForIndexing = async (assetId: string): Promise<Fiche[] | null> => {
  const entries = await getEntries<FicheEntry>(
    CONTENT_TYPES.fiche,
    { where: { links_to_asset: assetId } },
  )

  if (!entries.length) return null

  return entries.map(formatFicheForSearch)
}

export const findAllFichesLinkedToEntryForIndexing = async (entryId: string): Promise<Fiche[] | null> => {
  const entries = await getEntries<FicheEntry>(
    CONTENT_TYPES.fiche,
    { where: { links_to_entry: entryId } },
  )

  if (!entries.length) return null

  return entries.map(formatFicheForSearch)
}

export const fetchAllFichesForIndexing = async (): Promise<Fiche[] | null> => {
  const entries = await getEntries<FicheEntry>(
    CONTENT_TYPES.fiche,
  )

  if (!entries.length) return null

  return entries.map(formatFicheForSearch)
}
