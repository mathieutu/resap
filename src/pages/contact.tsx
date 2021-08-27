/*
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

import { Layout } from '../components/Layout/Layout'
import { ContactFormSection } from '../components/Contact/ContactFormSection'
import { ContactInfoSection } from '../components/Contact/ContactInfoSection'

export default function ContactPage() {
  return (
    <Layout className="bg-gray-50" withoutContactBanner>
      <ContactFormSection />
      <ContactInfoSection />
    </Layout>
  )
}
