import { NextSeo } from 'next-seo'
import { Layout } from '../components/Layout/Layout'
import { ContactFormSection } from '../components/Contact/ContactFormSection'
import { ContactInfoSection } from '../components/Contact/ContactInfoSection'

export default function ContactPage() {
  return (
    <Layout className="bg-gray-50" withoutContactBanner>
      <NextSeo title="Contact" />
      <ContactFormSection />
      <ContactInfoSection />
    </Layout>
  )
}
