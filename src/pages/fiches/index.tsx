import { GetStaticProps } from 'next'
import { SearchIcon } from '@heroicons/react/solid'
import { NextSeo } from 'next-seo'
import { Layout } from '../../components/Layout/Layout'
import { FicheCard } from '../../components/Card/FicheCard'
import { SimpleHeader } from '../../components/Layout/SimpleHeader'
import { SearchInput } from '../../components/Search/SearchInput'
import { SearchResults } from '../../components/Search/SearchResults'
import { SearchContext } from '../../components/Search/SearchContext'
import { AlgoliaSSRProps, IndicesNames } from '../../services/algolia.browser'
import { categories } from '../../data/categories'
import { CategorieLink } from '../../components/CategorieLink'
import { Container } from '../../components/Layout/Container'
import { Fiche } from '../../types/models'
import { isPreviewForced } from '../../services/contentful'
import { Configure } from 'react-instantsearch-hooks'

export default function ListFiches(algoliaProps: AlgoliaSSRProps) {
  return (
    <Layout className="bg-gray-light">
      <NextSeo title="Fiches pratiques" />
      <SearchContext indexName={IndicesNames.fiches} {...algoliaProps}>
      <Configure  hitsPerPage={50} />
        <SimpleHeader className="h-[475px]" title="Fiches pratiques" titleClassName="text-blue-default" subTitle="">
          <div className="w-full block md:w-1/2 mx-auto mt-16 sm:flex">
            <div className="mt-1 relative rounded-md shadow-sm w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5  text-gray-default " aria-hidden="true" />
              </div>
              <SearchInput
                className="block w-full pl-10 py-3 text-base rounded-md placeholder-gray-default shadow-sm focus:ring-blue-default focus:border-blue-default sm:flex-1 border-gray-default"
                label="Recherchez parmi nos fiches..."
              />
            </div>
          </div>
          <ul className="flex flex-wrap gap-4 justify-center my-4">
            {Object.values(categories).map(categorie => <li key={categorie.href}><CategorieLink categorie={categorie} scroll={false} /></li>)}
          </ul>
        </SimpleHeader>
        <Container className="-mt-24 pb-12">
          <SearchResults
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            renderHit={(fiche: Fiche) => <FicheCard fiche={fiche} />}
          />
        </Container>
      </SearchContext>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview }) => ({
  props: {
    preview: preview || isPreviewForced,
  },
})
