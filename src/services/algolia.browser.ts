import algoliaSearch from 'algoliasearch/lite'
import React, { FC } from 'react'
import { InstantSearchServerState } from 'react-instantsearch-hooks/dist/es/components/InstantSearchSSRProvider'
import { getServerState } from 'react-instantsearch-hooks-server'
import { IncomingMessage } from 'http'
import { useConnector } from 'react-instantsearch-hooks'
import { connectGeoSearch } from 'instantsearch.js/es/connectors'
import { GeoSearchWidgetDescription, GeoSearchConnectorParams } from 'instantsearch.js/es/connectors/geo-search/connectGeoSearch'

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY

if (!appId || !apiKey) {
  throw new Error('Algolia env vars needed (NEXT_PUBLIC_ALGOLIA_APP_ID, NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY).')
}

export const searchClient = algoliaSearch(appId, apiKey)

// eslint-disable-next-line no-shadow -- bug eslint
export const enum IndicesNames {
  fiches = 'fiches',
  structures = 'structures',
}

export type AlgoliaSSRProps = { url: string, searchState?: InstantSearchServerState }

export const algoliaSSRProps = async <Props extends Record<string, any>>(req: IncomingMessage, Page: FC<AlgoliaSSRProps & Props>, props: Props = {} as Props) => {
  const protocol = req.headers.referer?.split('://')[0] || 'https'
  const url = `${protocol}://${req.headers.host}${req.url}`
  const searchState = await getServerState(React.createElement(Page, { url, ...props }))

  return {
    url,
    searchState,
  }
}

export const useGeoSearch = (props?: GeoSearchConnectorParams) => useConnector<GeoSearchConnectorParams, GeoSearchWidgetDescription>(connectGeoSearch, props)
