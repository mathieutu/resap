import { ReactElement, ReactNode } from 'react'
import { Footer } from './Footer'
import { BannerContact } from './BannerContact'
import { Navbar } from './Navbar'
import { ClassNameProp } from '../../types/react'

type Props = {
  header?: ReactElement,
  subheader?: ReactElement
  withoutContactBanner?: boolean,
  children: ReactNode,
} & ClassNameProp

export const Layout = ({ header, subheader, children, withoutContactBanner, ...props }: Props) => (
  <div {...props}>
    {header ?? <Navbar />}
    {subheader}
    {children}
    {withoutContactBanner ? null : <BannerContact />}
    <Footer />
  </div>
)
