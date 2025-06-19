import { ContactInfoSection } from '@/components/Contact/ContactInfoSection'
import { ContactFormSection } from '@/components/Contact/ContactFormSection'

export const metadata = {
  title: 'Contact',
}
export default function ContactPage() {
  return (
    <>
      <ContactFormSection />
      <ContactInfoSection />
    </>
  )
}
