import { ContactFormSection } from '@/components/Contact/ContactFormSection'
import { ContactInfoSection } from '@/components/Contact/ContactInfoSection'

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
