import { Layout } from '../components/Layout/Layout'
import { NotFoundSection } from '../components/NotFoundSection'

export default function Custom404() {
  return (
    <Layout className="bg-gray-50" withoutContactBanner>
      <NotFoundSection />
    </Layout>
  )
}