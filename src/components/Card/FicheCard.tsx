/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames'
import { Fiche } from '../../types/models'
import { Link } from '../Links'
import { categories } from '../../services/categories'
import { CategorieLink } from '../CategorieLink'

type Props = { fiche: Fiche }

export const FicheCard = ({ fiche }: Props) => {
  const category = categories[fiche.categorie]

  const ficheUrl = `${category.href}/${fiche.slug}`
  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white ">
      <div className="shrink-0">
        <Link href={ficheUrl}>
          <img
            className="h-48 w-full object-cover"
            src={fiche.illustration.file.url}
            alt={fiche.illustration.title}
          />
        </Link>
        <div className={classNames(category.bgColor, 'h-[6px] w-full')} />
      </div>
      <div className="flex-1 px-6 pt-6 flex flex-col justify-between">
        <div className="flex-1">
          <CategorieLink categorie={category} />
          <Link href={ficheUrl} className="block mt-4">
            <div className="text-xl font-semibold text-gray-900">{fiche.titre}</div>
            <div className="mt-3 text-base text-grey-default">{fiche.description}</div>
          </Link>
        </div>
      </div>
      <Link href={ficheUrl} className="px-6 pb-6 mt-6 block text-blue-default leading-5 font-medium hover:text-green-default">
        En savoir plus →
      </Link>
    </div>
  )
}
