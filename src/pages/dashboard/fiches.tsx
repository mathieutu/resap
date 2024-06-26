import { GetStaticProps } from 'next'
import { Layout } from '../../components/Layout/Layout'
import { SimpleHeader } from '../../components/Layout/SimpleHeader'
import { AlgoliaSSRProps, IndicesNames } from '../../services/algolia.browser'
import { Container } from '../../components/Layout/Container'
import { isPreviewForced } from '../../services/contentful'

export default function Annuaire(algoliaProps: AlgoliaSSRProps) {
    return (
        <Layout className="bg-gray-light">
            <SimpleHeader className="h-[350px]" title="Fiches pratiques" titleClassName="text-blue-default" subTitle="" children="">
            </SimpleHeader>
            <Container className="flex justify-around -mt-24 pb-12">
                <p>Page contenant le back-office des fiches pratiques</p>
            </Container>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ preview }) => ({
    props: {
        preview: preview || isPreviewForced,
    },
})
