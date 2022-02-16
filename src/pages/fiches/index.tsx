import { GetServerSideProps } from 'next'
import { SearchIcon } from '@heroicons/react/solid'
import { NextSeo } from 'next-seo'
import { Layout } from '../../components/Layout/Layout'
import { FicheCard } from '../../components/Card/FicheCard'
import { SimpleHeader } from '../../components/Layout/SimpleHeader'
import { SearchInput } from '../../components/Search/SearchInput'
import { SearchResults } from '../../components/Search/SearchResults'
import { SearchContext } from '../../components/Search/SearchContext'
import { AlgoliaSSRProps, findResultsStateForSSR } from '../../services/algolia.browser'
import { categories } from '../../services/categories'
import { CategorieLink } from '../../components/CategorieLink'
import { Container } from '../../components/Layout/Container'

export default function ListFiches(algoliaProps: AlgoliaSSRProps) {
  return (
    <Layout className="bg-grey-light">
      <NextSeo title="Fiches pratiques" />
      <SearchContext {...algoliaProps}>
        <SimpleHeader className="h-[475px]" title="Fiches pratiques" titleClassName="text-blue-default" subTitle="">
          <div className="w-full block md:w-1/2 mx-auto mt-16 sm:flex">
            <div className="mt-1 relative rounded-md shadow-sm w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5  text-grey-default " aria-hidden="true" />
              </div>
              <SearchInput
                className="block w-full pl-10 py-3 text-base rounded-md placeholder-grey-default shadow-sm focus:ring-blue-default focus:border-blue-default sm:flex-1 border-gray-default"
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
            renderHit={(hit) => <FicheCard fiche={hit} />}
          />
        </Container>
      </SearchContext>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<AlgoliaSSRProps> = async ({ query, preview }) => ({
  props: {
    preview: Boolean(preview || process.env.FORCE_CONTENTFUL_PREVIEW),
    resultsState: await findResultsStateForSSR(ListFiches, query),
  },
})
