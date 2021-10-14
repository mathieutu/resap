import { GetServerSideProps } from 'next'
import { SearchIcon } from '@heroicons/react/solid'
import { Configure } from 'react-instantsearch-dom'
import { Layout } from '../../../components/Layout/Layout'
import { FicheCard } from '../../../components/Card/FicheCard'
import { SimpleHeader } from '../../../components/Layout/SimpleHeader'
import { SearchInput } from '../../../components/Search/SearchInput'
import { SearchResults } from '../../../components/Search/SearchResults'
import { SearchContext } from '../../../components/Search/SearchContext'
import { AlgoliaSSRProps, findResultsStateForSSR } from '../../../services/algolia.browser'
import { categories, CategorieSlug } from '../../../services/categories'
import { BackToHomeLink } from '../../../components/CategorieLink'

type Props = AlgoliaSSRProps & { categorieSlug: CategorieSlug }

export default function ListFichesByCategory({ categorieSlug, ...algoliaProps }: Props) {
  const categorie = categories[categorieSlug]

  return (
    <Layout className="bg-gray-50">
      <SearchContext {...algoliaProps}>
        <Configure filters={`categorie:${categorieSlug}`} />
        <SimpleHeader className="h-[475px]" subTitle="Fiches pratiques" title={categorie.name} titleClassName={categorie.textColor}>
          <div className="w-full block md:w-1/2 mx-auto mt-16 sm:flex">
            <div className="mt-1 relative rounded-md shadow-sm w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <SearchInput
                className="block w-full pl-10 py-3 text-base rounded-md placeholder-gray-500 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:flex-1 border-gray-300"
                label={`Recherchez parmi nos fiches "${categorie.name}"...`}
              />
            </div>
          </div>
          <div className="flex gap-4 justify-center my-4">
            <BackToHomeLink />
          </div>
        </SimpleHeader>
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 -mt-24">
          <SearchResults
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            renderHit={(hit) => <FicheCard fiche={hit} />}
          />
        </div>
      </SearchContext>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<Props, { categorie: CategorieSlug }> = async ({ params, preview }) => {
  const categorieSlug = params!.categorie

  if (!categories[categorieSlug]) {
    return {
      notFound: true,
    }
  }

  return ({
    props: {
      preview: !!preview,
      categorieSlug,
      resultsState: await findResultsStateForSSR(
        (props) => <ListFichesByCategory categorieSlug={categorieSlug} {...props} />,
      ),
    },
  })
}
