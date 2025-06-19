import { Layout } from '@/components/Layout/Layout'
import { PreviewAlert } from '@/components/PreviewAlert'
import { draftMode } from 'next/headers'

export default async function DynamicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isEnabled } = await draftMode()

  return (
    <Layout className="bg-gray-light">
      {isEnabled && <PreviewAlert />}
      {children}
    </Layout>
  )
}
