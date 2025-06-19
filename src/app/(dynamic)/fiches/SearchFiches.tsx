'use client'

import { SearchContext } from '@/components/Search/SearchContext'
import { IndicesNames } from '@/services/algolia.browser'
import { SimpleHeader } from '@/components/Layout/SimpleHeader'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { SearchInput } from '@/components/Search/SearchInput'
import { categories, CategorieSlug } from '@/data/categories'
import { BackToHomeLink, CategorieLink } from '@/components/CategorieLink'
import { Container } from '@/components/Layout/Container'
import { SearchResults } from '@/components/Search/SearchResults'
import { Fiche } from '@/types/models'
import { FicheCard } from '@/components/Card/FicheCard'
import { Configure } from 'react-instantsearch-core'
import { ComponentProps } from 'react'

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
        {currentCategorie && <p className="text-sm text-gray-400 text-thin mt-4 w-3/4 mx-auto">{currentCategorie.description}</p>}
        <div className="w-full block md:w-1/2 mx-auto mt-16 sm:flex">
          <div className="mt-1 relative rounded-md shadow-xs w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5  text-gray-default " aria-hidden="true" />
            </div>
            <SearchInput
              className="block w-full pl-10 py-3 text-base rounded-md placeholder-gray-default shadow-xs focus:ring-blue-default focus:border-blue-default sm:flex-1 border-gray-default"
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
            <ul className="flex flex-wrap gap-4 justify-center my-4">
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
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          renderHit={(fiche: Fiche) => <FicheCard fiche={fiche} />}
        />
      </Container>
    </SearchContext>
  )
}
