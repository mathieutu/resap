import { GetStaticProps } from 'next'
import { FeatureSection } from '../components/Home/FeatureSection'
import { Layout } from '../components/Layout/Layout'
import { ThemeSection } from '../components/Home/ThemeSection'
import { HomeHeader } from '../components/Layout/HomeHeader'

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Layout header={<HomeHeader />}>
        <FeatureSection className="mt-20" />
        <ThemeSection className="mt-20" />
      </Layout>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview }) => ({
  props: {
    preview: !!preview,
  },
})
