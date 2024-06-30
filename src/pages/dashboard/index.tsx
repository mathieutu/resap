import { GetStaticProps } from 'next'
import { Layout } from '../../components/Layout/Layout'
import { SimpleHeader } from '../../components/Layout/SimpleHeader'
import { Container } from '../../components/Layout/Container'
import { isPreviewForced } from '../../services/contentful'
import { DashboardCard } from '../../components/Dashboard/DashboardCard'

export default function Dashboard() {
    return (
        <Layout className="bg-gray-light">
            <SimpleHeader className="h-[350px]" title="Dashboard" titleClassName="text-blue-default" subTitle="">
                <div></div>
            </SimpleHeader>
            <Container className="flex justify-around -mt-24 pb-12">
                <DashboardCard title="Fiches pratiques" link="/dashboard/fiches"/>
                <DashboardCard title="Annuaire" link="/dashboard/structures"/>
                <DashboardCard title="A propos" link="/dashboard/a-propos"/>
            </Container>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ preview }) => ({
    props: {
        preview: preview || isPreviewForced,
    },
})
