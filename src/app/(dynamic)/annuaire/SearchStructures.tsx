'use client'

import type { Structure } from '@/types/models'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import dynamic from 'next/dynamic'
import { Configure } from 'react-instantsearch-core'
import { FloatingButtons } from '@/components/FloatingButtons'
import { StructuresList } from '@/components/Map/StructuresList'
import { SearchContext } from '@/components/Search/SearchContext'
import { SearchFacet } from '@/components/Search/SearchFacet'
import { SearchInput } from '@/components/Search/SearchInput'
import { SearchResults } from '@/components/Search/SearchResults'
import { type StructureType, types } from '@/data/structures_types'
import { IndicesNames } from '@/services/algolia.browser'

const GeoSearch = dynamic<Record<string, never>>(
  () => import('@/components/Search/GeoSearch').then(module => module.GeoSearch),
  { ssr: false },
)
const ALGOLIA_MAX_HITS_PER_PAGE = 1000
const SearchField = () => (
  <div className="relative mt-1 w-full rounded-md shadow-xs">
    <div className="
      pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3
    "
    >
      <MagnifyingGlassIcon className="size-5 text-gray-400" aria-hidden="true" />
    </div>
    <SearchInput
      className="
        w-full cursor-default rounded-md border border-gray-default py-2 pl-10
        text-left text-sm placeholder-gray-default shadow-xs
        focus:border-blue-default focus:ring-1 focus:ring-blue-default
        focus:outline-hidden
      "
      label="Chercher dans la zone"
    />
  </div>
)
export const SearchStructures = () => (
  <div className="
    overflow-hidden px-4 py-16
    sm:px-6
    lg:px-8 lg:py-24
  "
  >
    <div className="relative mx-auto max-w-7xl">
      <FloatingButtons className="absolute -top-5" />
      <div className="text-center">
        <h1 className="
          text-3xl font-extrabold tracking-tight text-blue-default
          sm:text-4xl
        "
        >
          Annuaire
        </h1>
      </div>
      <div className="
        m-auto my-5 flex flex-col rounded-md bg-white p-5 drop-shadow-md
        print:drop-shadow-none
      "
      >
        <SearchContext indexName={IndicesNames.structures}>
          <Configure aroundLatLngViaIP hitsPerPage={ALGOLIA_MAX_HITS_PER_PAGE} />
          <div className="
            mb-4 grid gap-2
            sm:grid-cols-3 sm:gap-4
            print:hidden
          "
          >
            <div className="sm:col-span-2">
              {/* TODO pouvoir vider le filtre */}
              <SearchFacet
                attribute="type"
                label="Filtrer par dispositifs dans la zone"
                getItemLabel={item => types[item.value as StructureType].nom}
                getItemClassName={item => types[item.value as StructureType].colorClassname}
                className="
                  relative w-full cursor-default rounded-md border
                  border-gray-default bg-white py-2 pr-10 pl-3 text-left
                  shadow-xs
                  focus:border-blue-default focus:ring-1 focus:ring-blue-default
                  focus:outline-hidden
                  sm:text-sm
                "
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
)
