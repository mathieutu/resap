import { GetServerSideProps } from 'next'
import { SearchIcon } from '@heroicons/react/solid'
import { Configure } from 'react-instantsearch-dom'
import { NextSeo } from 'next-seo'
import { Layout } from '../../../components/Layout/Layout'
import { FicheCard } from '../../../components/Card/FicheCard'
import { SimpleHeader } from '../../../components/Layout/SimpleHeader'
import { SearchInput } from '../../../components/Search/SearchInput'
import { SearchResults } from '../../../components/Search/SearchResults'
import { SearchContext } from '../../../components/Search/SearchContext'
import { AlgoliaSSRProps, findResultsStateForSSR } from '../../../services/algolia.browser'
import { categories, CategorieSlug } from '../../../services/categories'
import { BackToHomeLink } from '../../../components/CategorieLink'
import { Container } from '../../../components/Layout/Container'

type Props = AlgoliaSSRProps & { categorieSlug: CategorieSlug }

export default function ListFichesByCategory({ categorieSlug, ...algoliaProps }: Props) {
  const categorie = categories[categorieSlug]

  return (
    <Layout className="bg-gray-50">
      <NextSeo title={categorie.name} />
      <SearchContext {...algoliaProps}>
        <Configure filters={`categorie:${categorieSlug}`} />
        <SimpleHeader className="h-[475px]" subTitle="Fiches pratiques" title={categorie.name} titleClassName={categorie.textColor}>
          <p className="text-sm text-gray-400 text-thin mt-4 w-3/4 mx-auto">{categorie.description}</p>
          <div className="w-full block md:w-1/2 mx-auto mt-8 sm:flex">
            <div className="mt-1 relative rounded-md shadow-sm w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <SearchInput
                className="block w-full pl-10 py-3 text-base rounded-md placeholder-grey-default shadow-sm focus:ring-blue-default focus:border-blue-default sm:flex-1 border-grey-default"
                label={`Recherchez parmi nos fiches "${categorie.name}"...`}
              />
            </div>
          </div>
          <div className="flex gap-4 justify-center my-4">
            <BackToHomeLink />
          </div>
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

export const getServerSideProps: GetServerSideProps<Props, { categorie: CategorieSlug }> = async ({ params, preview }) => {
  const categorieSlug = params!.categorie

  if (!categories[categorieSlug]) {
    return {
      notFound: true,
    }
  }

  return ({
    props: {
      preview: Boolean(preview || process.env.FORCE_CONTENTFUL_PREVIEW),
      categorieSlug,
      resultsState: await findResultsStateForSSR(
        (props) => <ListFichesByCategory categorieSlug={categorieSlug} {...props} />,
      ),
    },
  })
}
