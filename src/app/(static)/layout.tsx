import { Layout } from '@/components/Layout/Layout'

export default function StaticLayout({ children } : {children: React.ReactNode}) {
  return <Layout withoutContactBanner>{children}</Layout>
}
