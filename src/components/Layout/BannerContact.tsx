/* This example requires Tailwind CSS v2.0+ */
import Link from 'next/link'
import { ClassNameProp } from '../../types/react'
import { PrimaryButton } from '../Buttons/Primary'

type bannerContactProps = {} & ClassNameProp;

export const BannerContact = ({ className }: bannerContactProps) => (
  <div className={`${className} bg-gray-50`}>
    <div
      className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"
    >
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        <span className="block">Besoin d'information ?</span>
        <span className="block text-indigo-600">Contactez nous aujourd'hui</span>
      </h2>
      <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
        <div className="inline-flex rounded-md">
          <Link href="#">
            <PrimaryButton text="Nous contacter" />
          </Link>
        </div>
      </div>
    </div>
  </div>
)
