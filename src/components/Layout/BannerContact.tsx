import { ClassNameProp } from '../../types/react'
import { PrimaryLink } from '../Link'

type Props = ClassNameProp;

export const BannerContact = ({ className }: Props) => (
  <div className={`${className} bg-gray-100`}>
    <div
      className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"
    >
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        <span className="block">Besoin d&apos;information ?</span>
        <span className="block text-indigo-600">Contactez nous aujourd&apos;hui</span>
      </h2>
      <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
        <div className="inline-flex rounded-md">
          <PrimaryLink href="#">Nous contacter</PrimaryLink>
        </div>
      </div>
    </div>
  </div>
)
