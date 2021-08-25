import classNames from 'classnames'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { Link } from './Link'
import { Categorie } from '../services/categories'

export const CategorieLink = ({ categorie }: { categorie: Categorie }) => (
  <Link href={categorie.href} className="text-sm font-medium group">
    <div
      className={classNames(categorie.borderColor, categorie.groupHoverBgColor, 'inline-flex justify-center items-center rounded-xl px-[10px] border')}
    >
      <span className={classNames(categorie.bgColor, 'group-hover:bg-white block w-[6px] h-[6px] rounded-full mr-2')} />
      <span className={classNames(categorie.textColor, 'group-hover:text-white text-sm font-medium')}>{categorie.name}</span>
    </div>
  </Link>
)

export const BackToHomeLink = () => (
  <Link href="/fiches" className="text-sm font-medium">
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
