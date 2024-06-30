import { GetStaticProps } from 'next'
import { Layout } from '../../components/Layout/Layout'
import { SimpleHeader } from '../../components/Layout/SimpleHeader'
import { AlgoliaSSRProps, IndicesNames } from '../../services/algolia.browser'
import { Container } from '../../components/Layout/Container'
import { isPreviewForced } from '../../services/contentful'

export default function Annuaire(algoliaProps: AlgoliaSSRProps) {
    return (
        <Layout className="bg-gray-light">
            <SimpleHeader className="h-[350px]" title="Annuaire" titleClassName="text-blue-default" subTitle="">
                <div></div>
            </SimpleHeader>
            <Container className="flex justify-around -mt-24 pb-12">
                <p>Page contenant le back-office de l'annuaire</p>
            </Container>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ preview }) => ({
    props: {
        preview: preview || isPreviewForced,
    },
})
