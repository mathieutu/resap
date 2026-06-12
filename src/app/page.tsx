import { InformationsSection } from '@/components/Home/InformationsSection'
import { ThemeSection } from '@/components/Home/ThemeSection'
import { HomeHeader } from '@/components/Layout/HomeHeader'
import { Layout } from '@/components/Layout/Layout'

export const metadata = {
  title: {
    absolute: 'Ressources Santé et Précarité',
  },
}
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
