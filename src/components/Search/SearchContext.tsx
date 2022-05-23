import { InstantSearch, InstantSearchSSRProvider } from 'react-instantsearch-hooks'
import { ReactNode } from 'react'
import { history } from 'instantsearch.js/es/lib/routers'
import { AlgoliaSSRProps, IndicesNames, searchClient } from '../../services/algolia.browser'

type SearchContextProps = {
  children: ReactNode,
  indexName: IndicesNames,
} & AlgoliaSSRProps

export const SearchContext = ({
  children,
  indexName,
  url,
  searchState,
}: SearchContextProps) => (
  <InstantSearchSSRProvider {...searchState}>
    <InstantSearch
      indexName={indexName}
      searchClient={searchClient}
      routing={{
        router: history({
          getLocation: () => (typeof window === 'undefined' ? new URL(url) as unknown as Location : window.location),
        }),
        stateMapping: {
          // @ts-expect-error
          stateToRoute(uiState) {
            const { query } = uiState[indexName]

            return { query }
          },
          routeToState(routeState) {
            return {
              [indexName]: routeState,
            }
          },
        } }}
    >
      {children}
    </InstantSearch>
  </InstantSearchSSRProvider>
)
