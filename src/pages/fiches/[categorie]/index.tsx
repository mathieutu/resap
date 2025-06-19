import { GetStaticPaths, GetStaticProps } from 'next'
import { SearchIcon } from '@heroicons/react/solid'
import { NextSeo } from 'next-seo'
import { Configure } from 'react-instantsearch-core'
import { Layout } from '../../../components/Layout/Layout'
import { FicheCard } from '../../../components/Card/FicheCard'
import { SimpleHeader } from '../../../components/Layout/SimpleHeader'
import { SearchInput } from '../../../components/Search/SearchInput'
import { SearchResults } from '../../../components/Search/SearchResults'
import { SearchContext } from '../../../components/Search/SearchContext'
import { IndicesNames } from '../../../services/algolia.browser'
import { categories, CategorieSlug } from '../../../data/categories'
import { BackToHomeLink } from '../../../components/CategorieLink'
import { Container } from '../../../components/Layout/Container'
import { Fiche } from '../../../types/models'
import { isPreviewForced } from '../../../services/contentful'

type Props = { categorieSlug: CategorieSlug }

export default function ListFichesByCategory({
  categorieSlug,
}: Props) {
  const categorie = categories[categorieSlug]

  return (
    <Layout className="bg-gray-50">
      <NextSeo title={categorie.name} />
      <SearchContext indexName={IndicesNames.fiches}>
        <Configure facetsRefinements={{ categorie: [categorieSlug] }} hitsPerPage={50} />
        <SimpleHeader className="h-[475px]" subTitle="Fiches pratiques" title={categorie.name} titleClassName={categorie.textColor}>
          <p className="text-sm text-gray-400 text-thin mt-4 w-3/4 mx-auto">{categorie.description}</p>
          <div className="w-full block md:w-1/2 mx-auto mt-8 sm:flex">
            <div className="mt-1 relative rounded-md shadow-xs w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <SearchInput
                className="block w-full pl-10 py-3 text-base rounded-md placeholder-gray-default shadow-xs focus:ring-blue-default focus:border-blue-default sm:flex-1 border-gray-default"
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
            renderHit={(hit: Fiche) => <FicheCard fiche={hit} />}
          />
        </Container>
      </SearchContext>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: Object.values(categories).map(({ href }) => `/${href}`),
  fallback: false,
})

export const getStaticProps: GetStaticProps<Props, { categorie: CategorieSlug }> = async ({
  params,
  preview,
}) => ({
  props: {
    preview: preview || isPreviewForced,
    categorieSlug: params!.categorie,
  },
})
