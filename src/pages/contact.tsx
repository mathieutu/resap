import type { ComponentType } from 'react'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import { Layout } from '../components/Layout/Layout'
import { ContactFormSection } from '../components/Contact/ContactFormSection'
import { ContactInfoSection } from '../components/Contact/ContactInfoSection'

// TODO: A SUPPRIMER ▼
const Map = dynamic(
  () => import('../components/Map/Map').then(module => module.Map) as Promise<ComponentType>,
  {
    ssr: false,
    loading: () => <p>Map en cours de chargement</p>,
  },
)
// TODO: A SUPPRIMER ▲

export default function ContactPage() {
  return (
    <Layout className="bg-gray-50" withoutContactBanner>
      <NextSeo title="Contact" />
      <ContactFormSection />
      <ContactInfoSection />
      {/* TODO: A SUPPRIMER ▼ */ }
      <Map />
      {/* TODO: A SUPPRIMER ▲ */ }
    </Layout>
  )
}
