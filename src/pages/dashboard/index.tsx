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

export default function ListFiches(algoliaProps: AlgoliaSSRProps) {
    return (
        <Layout className="bg-gray-light">
            <SimpleHeader className="h-[475px]" title="Dashboard" titleClassName="text-blue-default" subTitle="">
            </SimpleHeader>
            <Container className="-mt-24 pb-12">
            </Container>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ preview }) => ({
    props: {
        preview: preview || isPreviewForced,
    },
})
