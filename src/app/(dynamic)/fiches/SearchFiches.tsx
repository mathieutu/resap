'use client'

import type { ComponentProps } from 'react'
import type { Fiche } from '@/types/models'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Configure } from 'react-instantsearch-core'
import { FicheCard } from '@/components/Card/FicheCard'
import { BackToHomeLink, CategorieLink } from '@/components/CategorieLink'
import { Container } from '@/components/Layout/Container'
import { SimpleHeader } from '@/components/Layout/SimpleHeader'
import { SearchContext } from '@/components/Search/SearchContext'
import { SearchInput } from '@/components/Search/SearchInput'
import { SearchResults } from '@/components/Search/SearchResults'
import { categories, type CategorieSlug } from '@/data/categories'
import { IndicesNames } from '@/services/algolia.browser'

export const SearchFiches = ({ categorieSlug }: { categorieSlug?: CategorieSlug }) => {
  const currentCategorie = categorieSlug && categories[categorieSlug]

  const headerProps = currentCategorie ? {
    title: currentCategorie.name,
    subTitle: 'Fiches pratiques',
    titleClassName: currentCategorie.textColor,
  } : {
    title: 'Fiches pratiques',
    subTitle: '',
    titleClassName: 'text-blue-default',
  } satisfies Partial<ComponentProps<typeof SimpleHeader>>

  return (
    <SearchContext indexName={IndicesNames.fiches}>
      <Configure facetsRefinements={categorieSlug ? { categorie: [categorieSlug] } : undefined} hitsPerPage={100} />
      <SimpleHeader {...headerProps}>
        {currentCategorie && (
          <p className="mx-auto mt-4 w-3/4 text-sm font-thin text-gray-400">
            {currentCategorie.description}
          </p>
        )}
        <div className="
          mx-auto mt-16 block w-full
          sm:flex
          md:w-1/2
        "
        >
          <div className="relative mt-1 w-full rounded-md shadow-xs">
            <div className="
              pointer-events-none absolute inset-y-0 left-0 flex items-center
              pl-3
            "
            >
              <MagnifyingGlassIcon className="size-5 text-gray-default" aria-hidden="true" />
            </div>
            <SearchInput
              className="
                block w-full rounded-md border-gray-default py-3 pl-10 text-base
                placeholder-gray-default shadow-xs
                focus:border-blue-default focus:ring-blue-default
                sm:flex-1
              "
              label={`Recherchez parmi nos fiches${currentCategorie ? ` "${currentCategorie.name}"` : ''}...`}
            />
          </div>
        </div>
        {categorieSlug
          ? (
              <div className="my-4">
                <BackToHomeLink />
              </div>
            ) : (
              <ul className="my-4 flex flex-wrap justify-center gap-4">
                {Object.values(categories).map(categorie => (
                  <li key={categorie.href}>
                    <CategorieLink categorie={categorie} />
                  </li>
                ))}
              </ul>
            )}
      </SimpleHeader>
      <Container className="pb-12">
        <SearchResults
          className="
            grid grid-cols-1 gap-4
            sm:grid-cols-2
            lg:grid-cols-3
          "
          renderHit={(fiche: Fiche) => <FicheCard fiche={fiche} />}
        />
      </Container>
    </SearchContext>
  )
}
