/* eslint-disable react/no-danger */
import Link from 'next/link'
import { ClassNameProp } from '../../types/react'
import { Fiche } from '../../types/models'
import { Prose } from '../Prose'

export type ficheCardProps = { fiche: Fiche } & ClassNameProp

export const FicheCard = ({ fiche, className }: ficheCardProps) => (
  <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
    <div className="flex-shrink-0">
      <img className="h-48 w-full object-cover" src={fiche.illustration.file.url} alt={fiche.illustration.title} />
    </div>
    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
      <div className="flex-1">
        <a className="text-sm font-medium text-indigo-600">
          <div
            className="inline-flex justify-center items-center rounded-xl px-[10px] border-pink-500 border mb-4 "
          >
            <span className="block w-[6px] h-[6px] bg-pink-500 rounded-full mr-2" />
            <span className="text-pink-500 text-sm font-medium">Santé</span>
          </div>
        </a>

        <Link href={{
          pathname: '/fiches/[slug]',
          query: { slug: fiche.slug },
        }}
        >
          <a className="block mt-2">
            <Prose className="text-xl font-semibold text-gray-900" html={fiche.titre} />
            <Prose className="mt-3 text-base text-gray-500" html={fiche.description} />
          </a>
        </Link>
      </div>
    </div>
    <Link href={{
      pathname: '/fiches/[slug]',
      query: { slug: fiche.slug },
    }}
    >
      <a className="px-6 pb-6 mt-3 block text-gray-800 leading-5 font-medium">En savoir plus →</a>
    </Link>
  </div>
)
