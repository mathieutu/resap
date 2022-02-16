import { NextSeo } from 'next-seo'
import { Layout } from '../components/Layout/Layout'
import { AnnuaireSection } from '../components/Annuaire/AnnuaireSection'

export default function ContactPage() {
  return (
    <Layout className="bg-gray-50" withoutContactBanner>
      <NextSeo title="Annuaire" />
      <AnnuaireSection />
    </Layout>
  )
}
