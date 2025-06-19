import { ReactElement, ReactNode } from 'react'
import { ClassNameProp } from '@/types/react'
import { Toaster } from 'react-hot-toast'
import { Footer } from './Footer'
import { BannerContact } from './BannerContact'
import { Navbar } from './Navbar'

type Props = {
  header?: ReactElement<any>,
  withoutContactBanner?: boolean,
  children: ReactNode,
} & ClassNameProp

export const Layout = ({ header, children, withoutContactBanner, ...props }: Props) => (
  <div className="bg-gray-50" {...props}>
    {header ?? <Navbar />}
    {children}
    {withoutContactBanner ? null : <BannerContact />}
    <Footer />
    <Toaster position="bottom-right" />
  </div>
)
