import { InstantSearch, InstantSearchSSRProvider } from 'react-instantsearch-hooks'
import { ReactNode } from 'react'
import { IndicesNames, searchClient } from '../../services/algolia.browser'

type SearchContextProps = {
  children: ReactNode,
  indexName: IndicesNames,
}

export const SearchContext = ({
  children,
  indexName,
}: SearchContextProps) => (
  <InstantSearchSSRProvider>
    <InstantSearch
      indexName={indexName}
      searchClient={searchClient}
      routing={{
        stateMapping: {
          stateToRoute(uiState) {
            const {
              query,
              refinementList,
              geoSearch,
              configure,
            } = uiState[indexName]

            return {
              query,
              refinementList,
              geoSearch,
              configure: { filters: configure?.filters },
            }
          },
          routeToState(routeState) {
            return {
              [indexName]: routeState,
            }
          },
        },
      }}
    >
      {children}
    </InstantSearch>
  </InstantSearchSSRProvider>
)
