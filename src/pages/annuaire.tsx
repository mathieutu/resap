import { NextSeo } from 'next-seo'
import { SearchIcon } from '@heroicons/react/solid'
import { GetServerSideProps } from 'next'
import { Configure } from 'react-instantsearch-hooks'
import dynamic from 'next/dynamic'
import { Layout } from '../components/Layout/Layout'
import { SearchContext } from '../components/Search/SearchContext'
import { algoliaSSRProps, AlgoliaSSRProps, IndicesNames } from '../services/algolia.browser'
import { SearchInput } from '../components/Search/SearchInput'
import { StructuresList } from '../components/Map/StructuresList'
import { SearchResults } from '../components/Search/SearchResults'
import { Structure } from '../types/models'
import { isPreviewForced } from '../services/contentful'

const GeoSearch = dynamic<Record<string, never>>(
  () => import('../components/Search/GeoSearch').then(module => module.GeoSearch),
  {
    ssr: false,
  },
)

const ALGOLIA_MAX_HITS_PER_PAGE = 1000

export default function Annuaire({ ...algoliaProps }: AlgoliaSSRProps) {
  return (
    <Layout className="bg-gray-50">
      <NextSeo title="Annuaire" />
      <div className="py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
        <div className="relative max-w-7xl mx-auto">
          <svg
            className="absolute left-full transform translate-x-1/4"
            width={404}
            height={404}
            fill="none"
            viewBox="0 0 404 404"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="85737c0e-0916-41d7-917f-596dc7edfa27"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
          </svg>
          <svg
            className="absolute right-full bottom-0 transform -translate-x-1/4"
            width={404}
            height={404}
            fill="none"
            viewBox="0 0 404 404"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="85737c0e-0916-41d7-917f-596dc7edfa27"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
          </svg>
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-blue-default sm:text-4xl">Annuaire</h1>
          </div>
          <div className="flex flex-col bg-white drop-shadow-md rounded-md p-5 m-auto my-5">
            <SearchContext indexName={IndicesNames.structures} {...algoliaProps}>
              <Configure aroundLatLngViaIP hitsPerPage={ALGOLIA_MAX_HITS_PER_PAGE} />
              <div className="bg-white mb-4">
                <div className="mt-1 relative rounded-md shadow-sm w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5  text-grey-default " aria-hidden="true" />
                  </div>
                  <SearchInput
                    className="block w-full pl-10 py-3 text-base rounded-md placeholder-grey-default shadow-sm focus:ring-blue-default focus:border-blue-default sm:flex-1 border-gray-default"
                    label="Recherchez parmi les structures affichées"
                  />
                </div>
              </div>
              <SearchResults
                render={(hits: Structure[]) => (
                  <StructuresList structures={hits} mapChildren={<GeoSearch />} />
                )}
              />
            </SearchContext>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<AlgoliaSSRProps> = async ({
  preview,
  req,
}) => ({
  props: {
    preview: preview || isPreviewForced,
    ...await algoliaSSRProps(req, Annuaire),
  },
})
