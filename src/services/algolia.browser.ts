import algoliaSearch from 'algoliasearch/lite'
import { findResultsState } from 'react-instantsearch-dom/server'
import { FC } from 'react'
import type { InstantSearchProps, SearchState } from 'react-instantsearch-core'

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY

if (!appId || !apiKey) {
  throw new Error('Algolia env vars needed (NEXT_PUBLIC_ALGOLIA_APP_ID, NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY).')
}

const searchClient = algoliaSearch(appId, apiKey)

export const searchProps = {
  searchClient,
  indexName: 'fiches',
}

export type AlgoliaSSRProps = Pick<InstantSearchProps, 'widgetsCollector' | 'resultsState' | 'searchState'>

export const findResultsStateForSSR = async (component: FC<AlgoliaSSRProps>, searchState ?: SearchState) => (
  JSON.parse(JSON.stringify(await findResultsState<any>(component, { ...searchProps, searchState })))
)
