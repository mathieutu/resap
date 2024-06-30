import { GetStaticProps } from 'next'
import { Layout } from '../../components/Layout/Layout'
import { SimpleHeader } from '../../components/Layout/SimpleHeader'
import { AlgoliaSSRProps, IndicesNames } from '../../services/algolia.browser'
import { Container } from '../../components/Layout/Container'
import { isPreviewForced } from '../../services/contentful'
import { Card } from '../../components/Dashboard/Card'

export default function Dashboard(algoliaProps: AlgoliaSSRProps) {
    return (
        <Layout className="bg-gray-light">
            <SimpleHeader className="h-[350px]" title="Dashboard" titleClassName="text-blue-default" subTitle="">
                <div></div>
            </SimpleHeader>
            <Container className="flex justify-around -mt-24 pb-12">
                <Card title="Fiches pratiques" link="/dashboard/fiches"/>
                <Card title="Annuaire" link="/dashboard/annuaire"/>
                <Card title="A propos" link="/dashboard/a-propos"/>
            </Container>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ preview }) => ({
    props: {
        preview: preview || isPreviewForced,
    },
})
