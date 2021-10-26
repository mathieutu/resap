import classNames from 'classnames'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { Link } from './Links'
import { Categorie } from '../services/categories'

type TypeProps = { categorie: Categorie, scroll?: boolean, inverted?: boolean }

export const CategorieLink = ({ categorie, scroll = true, inverted = false }: TypeProps) => (
  <Link href={categorie.href} className="text-sm font-medium group" scroll={scroll} shallow>
    <div
      className={classNames(
        inverted ? ['border-white', 'group-hover:bg-white'] : [categorie.borderColor, categorie.groupHoverBgColor],
        'inline-flex justify-center items-center rounded-xl px-[10px] border',
      )}
    >
      <categorie.icon
        className={classNames(
          inverted ? ['text-white', categorie.groupHoverTextColor] : [categorie.textColor, 'group-hover:text-white'],
          'w-5 h-5 mr-1',
        )}
      />
      <span
        className={classNames(
          inverted ? ['text-white', categorie.groupHoverTextColor] : [categorie.textColor, 'group-hover:text-white'],
          'text-sm font-medium',
        )}
      >
        {categorie.name}
      </span>
    </div>
  </Link>
)

export const BackToHomeLink = () => (
  <Link href="/fiches" className="text-sm font-medium" scroll={false} shallow>
    <div
      className="border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white inline-flex justify-center items-center rounded-xl px-[10px] border"
    >
      <ArrowLeftIcon className="w-4 h-4 mr-2" />
      <span className="text-sm font-medium">
        Retourner à la liste de toutes les fiches
      </span>
    </div>
  </Link>
)

// export const BackToHomeLink = () => (
//   <Link href="/fiches" className="text-sm font-medium">
//     <div
//       className="border-gray-400 text-gray-400 hover:border-gray-500 hover:text-gray-500 inline-flex justify-center items-center rounded-xl px-[10px] border"
//     >
//       <ArrowLeftIcon className="w-4 h-4 mr-2" />
//       <span className="text-sm font-medium">
//         Retour à la liste de toutes les fiches
//       </span>
//     </div>
//   </Link>
// )
