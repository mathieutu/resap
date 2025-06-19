import { InstantSearch, InstantSearchSSRProvider } from 'react-instantsearch-core'
import { ReactNode } from 'react'
import { createInstantSearchRouterNext } from 'react-instantsearch-router-nextjs'
import singletonRouter from 'next/router'
import type { RouterProps } from 'instantsearch.js/es/middlewares/createRouterMiddleware'
import { IndicesNames, searchClient } from '../../services/algolia.browser'

type SearchContextProps = {
  children: ReactNode,
  indexName: IndicesNames,
}

const router = createInstantSearchRouterNext({ singletonRouter, routerOptions: { cleanUrlOnDispose: false } })

export const SearchContext = ({
  children,
  indexName,
}: SearchContextProps) => (
  <InstantSearchSSRProvider>
    <InstantSearch
      indexName={indexName}
      searchClient={searchClient}
      future={{ preserveSharedStateOnUnmount: true }}
      routing={{
        router,
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
