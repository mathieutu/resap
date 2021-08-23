import { FeatureSection } from '../components/Home/FeatureSection'
import { Layout } from '../components/Layout/Layout'
import { ThemeSection } from '../components/Home/ThemeSection'

export default function Home() {
  return (
    <div>
      <Layout header="home">
        <FeatureSection className="mt-20" />
        <ThemeSection className="mt-20" />
      </Layout>
    </div>
  )
}
