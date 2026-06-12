'use client'

import type { ReactNode } from 'react'
import { InstantSearchSSRProvider } from 'react-instantsearch-core'
import { InstantSearchNext } from 'react-instantsearch-nextjs'
import { type IndicesNames, searchClient } from '@/services/algolia.browser'

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
