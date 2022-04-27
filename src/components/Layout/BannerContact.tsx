import classNames from 'classnames'
import { ClassNameProp } from '../../types/react'
import { SecondaryLink } from '../Links'

type Props = ClassNameProp;

export const BannerContact = ({ className }: Props) => (
  <div className={classNames(className, 'bg-blue-default print:hidden border-green-default border-b')}>
    <div
      className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"
    >
      <h2 className="text-3xl font-dosis font-normal tracking-tight text-green-default sm:text-4xl">
        <span className="block">Besoin d&apos;information ?</span>
        <span className="block text-white mt-4">Contactez nous aujourd&apos;hui</span>
      </h2>
      <div className="mt-8 flex lg:mt-0 lg:shrink-0">
        <div className="inline-flex rounded-md">
          <SecondaryLink href="/contact">
            Nous contacter
          </SecondaryLink>
        </div>
      </div>
    </div>
  </div>
)
