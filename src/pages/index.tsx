import { FeatureSection } from '../components/Home/FeatureSection'
import { Layout } from '../components/Layout/Layout'
import { ThemeSection } from '../components/Home/ThemeSection'
import { HomeHeader } from '../components/Layout/HomeHeader'

export default function Home() {
  return (
    <div>
      <Layout header={<HomeHeader />}>
        <FeatureSection className="mt-20" />
        <ThemeSection className="mt-20" />
      </Layout>
    </div>
  )
}
