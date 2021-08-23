import { ReactElement, ReactNode } from 'react'
import { Footer } from './Footer'
import { BannerContact } from './BannerContact'
import { Navbar } from './Navbar'
import { ClassNameProp } from '../../types/react'

type Props = {
  header?: ReactElement,
  children: ReactNode,
} & ClassNameProp

export const Layout = ({ header, children, ...props }: Props) => (
  <div {...props}>
    {header ?? <Navbar />}
    {children}
    <BannerContact className="mt-20" />
    <Footer />
  </div>
)
