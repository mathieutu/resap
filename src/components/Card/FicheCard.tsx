import classNames from 'classnames'
import { Fiche } from '../../types/models'
import { Link } from '../Links'
import { categories } from '../../services/categories'
import { CategorieLink } from '../CategorieLink'

type Props = { fiche: Fiche }

export const FicheCard = ({ fiche }: Props) => {
  const category = categories[fiche.categorie]

  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white ">
      <div className="flex-shrink-0">
        <img className="h-48 w-full object-cover" src={fiche.illustration.file.url} alt={fiche.illustration.title} />
        <div className={classNames(category.bgColor, 'h-[6px] w-full')} />
      </div>
      <div className="flex-1 px-6 pt-6 flex flex-col justify-between">
        <div className="flex-1">
          <CategorieLink categorie={category} />
          <Link href={`${category.href}/${fiche.slug}`} className="block mt-4">
            <div className="text-xl font-semibold text-gray-900">{fiche.titre}</div>
            <div className="mt-3 text-base text-grey-default">{fiche.description}</div>
          </Link>
        </div>
      </div>
      <Link href={`${category.href}/${fiche.slug}`} className="px-6 pb-6 mt-6 block text-blue-default leading-5 font-medium hover:text-green-default">
        En savoir plus →
      </Link>
    </div>
  )
}
