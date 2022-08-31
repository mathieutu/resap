import { NextSeo } from 'next-seo'
import { SearchIcon } from '@heroicons/react/solid'
import { GetStaticProps } from 'next'
import { Configure } from 'react-instantsearch-hooks'
import dynamic from 'next/dynamic'
import { Layout } from '../../components/Layout/Layout'
import { SearchContext } from '../../components/Search/SearchContext'
import { IndicesNames } from '../../services/algolia.browser'
import { SearchInput } from '../../components/Search/SearchInput'
import { StructuresList } from '../../components/Map/StructuresList'
import { SearchResults } from '../../components/Search/SearchResults'
import { Structure } from '../../types/models'
import { isPreviewForced } from '../../services/contentful'
import { SearchFacet } from '../../components/Search/SearchFacet'
import { StructureType, types } from '../../data/structures_types'
import { FloatingButtons } from '../../components/FloatingButtons'

const GeoSearch = dynamic<Record<string, never>>(
  () => import('../../components/Search/GeoSearch').then(module => module.GeoSearch),
  {
    ssr: false,
  },
)

const ALGOLIA_MAX_HITS_PER_PAGE = 1000

const SearchField = () => (
  <div className="mt-1 relative rounded-md shadow-sm w-full">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <SearchIcon className="h-5 w-5 text-gray-400 " aria-hidden="true" />
    </div>
    <SearchInput
      className="w-full border border-gray-default placeholder-gray-default rounded-md shadow-sm pl-3 pl-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-default focus:border-blue-default text-sm"
      label="Chercher dans la zone"
    />
  </div>
)

export default function Annuaire() {
  return (
    <Layout className="bg-gray-50">
      <NextSeo title="Annuaire" />
      <div className="py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
        <div className="relative max-w-7xl mx-auto">
          <FloatingButtons className="absolute -top-5" />
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-blue-default sm:text-4xl">Annuaire</h1>
          </div>
          <div className="flex flex-col bg-white drop-shadow-md print:drop-shadow-none rounded-md p-5 m-auto my-5">

            <SearchContext indexName={IndicesNames.structures}>
              <Configure aroundLatLngViaIP hitsPerPage={ALGOLIA_MAX_HITS_PER_PAGE} />
              <div className="mb-4 grid sm:grid-cols-3 sm:gap-4 gap-2 print:hidden">
                <div className="col-span-2">
                  <SearchFacet
                    attribute="type"
                    label="Filtrer par dispositifs dans la zone"
                    getItemLabel={item => types[item.value as StructureType].nom}
                    getItemClassName={item => types[item.value as StructureType].colorClassname}
                    className="relative w-full bg-white border border-gray-default rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-default focus:border-blue-default sm:text-sm"
                  />
                </div>
                <SearchField />
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

export const getStaticProps: GetStaticProps = async ({
  preview,
}) => ({
  props: {
    preview: preview || isPreviewForced,
  },
})
