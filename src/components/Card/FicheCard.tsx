import { Fiche } from '../../types/models'
import { Link } from '../Link'

type Props = { fiche: Fiche }

export const FicheCard = ({ fiche }: Props) => (
  <div className="flex flex-col rounded-lg shadow-lg overflow-hidden  bg-white">
    <div className="flex-shrink-0">
      <img className="h-48 w-full object-cover" src={fiche.illustration.file.url} alt={fiche.illustration.title} />
    </div>
    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
      <div className="flex-1">
        <Link href="#" className="text-sm font-medium text-indigo-600">
          <div
            className="inline-flex justify-center items-center rounded-xl px-[10px] border-pink-500 border mb-4 "
          >
            <span className="block w-[6px] h-[6px] bg-pink-500 rounded-full mr-2" />
            <span className="text-pink-500 text-sm font-medium">Santé</span>
          </div>
        </Link>

        <Link href={`/fiches/${fiche.slug}`} className="block mt-2">
          <div className="text-xl font-semibold text-gray-900">{fiche.titre}</div>
          <div className="mt-3 text-base text-gray-500">{fiche.description}</div>
        </Link>
      </div>
    </div>
    <Link href={`/fiches/${fiche.slug}`} className="px-6 pb-6 mt-3 block text-gray-800 leading-5 font-medium">
      En savoir plus →
    </Link>
  </div>
)
