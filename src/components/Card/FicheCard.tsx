import { Fiche } from '../../types/models'
import { Link } from '../Links'
import { categories } from '../../services/categories'
import { CategorieLink } from '../CategorieLink'

type Props = { fiche: Fiche }

export const FicheCard = ({ fiche }: Props) => {
  const category = categories[fiche.categorie]

  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
      <div className="flex-shrink-0">
        <img className="h-48 w-full object-cover" src={fiche.illustration.file.url} alt={fiche.illustration.title} />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <CategorieLink categorie={category} />

          <Link href={`${category.href}/${fiche.slug}`} className="block mt-2">
            <div className="text-xl font-semibold text-gray-900">{fiche.titre}</div>
            <div className="mt-3 text-base text-gray-500">{fiche.description}</div>
          </Link>
        </div>
      </div>
      <Link href={`${category.href}/${fiche.slug}`} className="px-6 pb-6 mt-3 block text-gray-800 leading-5 font-medium">
        En savoir plus →
      </Link>
    </div>
  )
}
