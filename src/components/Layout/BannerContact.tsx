import type { ClassNameProp } from '../../types/react'
import classNames from 'classnames'
import { SecondaryLink } from '../Links'

type Props = ClassNameProp

export const BannerContact = ({ className }: Props) => (
  <div className={classNames(className, 'bg-blue-default print:hidden border-green-default border-b')}>
    <div
      className="
        mx-auto max-w-7xl px-4 py-12
        sm:px-6
        lg:flex lg:items-center lg:justify-between lg:px-8 lg:py-16
      "
    >
      <h2 className="
        font-dosis text-3xl font-normal tracking-tight text-green-default
        sm:text-4xl
      "
      >
        <span className="block">Besoin d&apos;information ?</span>
        <span className="mt-4 block text-white">Contactez nous aujourd&apos;hui</span>
      </h2>
      <div className="
        mt-8 flex
        lg:mt-0 lg:shrink-0
      "
      >
        <div className="inline-flex rounded-md">
          <SecondaryLink href="/contact">
            Nous contacter
          </SecondaryLink>
        </div>
      </div>
    </div>
  </div>
)
