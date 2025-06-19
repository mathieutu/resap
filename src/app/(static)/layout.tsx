import { Layout } from '@/components/Layout/Layout'

export default function StaticLayout({ children } : {children: React.ReactNode}) {
  return <Layout className="bg-gray-50" withoutContactBanner>{children}</Layout>
}
