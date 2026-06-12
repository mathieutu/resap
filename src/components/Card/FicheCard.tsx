import type { Fiche } from '../../types/models'
import classNames from 'classnames'
import Image from 'next/image'
import { categories } from '../../data/categories'
import { CategorieLink } from '../CategorieLink'
import { Link } from '../Links'

type Props = { fiche: Fiche }

export const FicheCard = ({ fiche }: Props) => {
  const category = categories[fiche.categorie]

  const ficheUrl = `${category.href}/${fiche.slug}`
  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="shrink-0">
        <Link href={ficheUrl}>
          <Image
            className="h-48 w-full object-cover"
            src={fiche.illustration.file.url}
            alt={fiche.illustration.title}
            width={fiche.illustration.file.details.image.width}
            height={fiche.illustration.file.details.image.height}
          />
        </Link>
        <div className={classNames(category.bgColor, 'h-[6px] w-full')} />
      </div>
      <div className="flex flex-1 flex-col justify-between px-6 pt-6">
        <div className="flex-1">
          <CategorieLink categorie={category} />
          <Link href={ficheUrl} className="mt-4 block">
            <div className="text-xl font-semibold text-gray-900">{fiche.titre}</div>
            <div className="mt-3 text-base text-gray-default">{fiche.description}</div>
          </Link>
        </div>
      </div>
      <Link
        href={ficheUrl}
        className="
          mt-6 block px-6 pb-6 leading-5 font-medium text-blue-default
          hover:text-green-default
        "
      >
        En savoir plus →
      </Link>
    </div>
  )
}
