'use client'

import { InstantSearchSSRProvider } from 'react-instantsearch-core'
import { ReactNode } from 'react'
import { IndicesNames, searchClient } from '@/services/algolia.browser'
import { InstantSearchNext } from 'react-instantsearch-nextjs'

type SearchContextProps = {
  children: ReactNode,
  indexName: IndicesNames,
}

export const SearchContext = ({
  children,
  indexName,
}: SearchContextProps) => (
  <InstantSearchSSRProvider>
    <InstantSearchNext
      indexName={indexName}
      searchClient={searchClient}
      future={{ preserveSharedStateOnUnmount: true }}
      routing={{
        router: { cleanUrlOnDispose: false },
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
    </InstantSearchNext>
  </InstantSearchSSRProvider>
  )
