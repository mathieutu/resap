import { GetStaticProps } from 'next'
import { InformationsSection } from '../components/Home/InformationsSection'
import { Layout } from '../components/Layout/Layout'
import { ThemeSection } from '../components/Home/ThemeSection'
import { HomeHeader } from '../components/Layout/HomeHeader'

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Layout header={<HomeHeader />}>
        <ThemeSection />
        <InformationsSection />
      </Layout>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview }) => ({
  props: {
    preview: !!preview,
  },
})
