import { liteClient as algoliaSearch } from 'algoliasearch/lite'
import { InstantSearchServerState } from 'react-instantsearch-hooks/dist/es/components/InstantSearchSSRProvider'

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY

if (!appId || !apiKey) {
  throw new Error('Algolia env vars needed (NEXT_PUBLIC_ALGOLIA_APP_ID, NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY).')
}

export const searchClient = algoliaSearch(appId, apiKey)

export const enum IndicesNames {
  fiches = 'fiches',
  structures = 'structures',
}

export type AlgoliaSSRProps = { url: string, searchState?: InstantSearchServerState }
