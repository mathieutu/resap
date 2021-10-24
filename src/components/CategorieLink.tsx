import classNames from 'classnames'
import {ArrowLeftIcon} from '@heroicons/react/solid'
import {Link} from './Link'
import {Categorie} from '../services/categories'

type TypeProps = { categorie: Categorie, scroll?: boolean, unstyled?: boolean }

export const CategorieLink = ({categorie, scroll = true, unstyled = false}: TypeProps) => {
  return (
    <Link href={categorie.href} className="text-sm font-medium group" scroll={scroll} shallow>
      <div
        className={classNames({
          [categorie.borderColor]: !unstyled,
          [categorie.groupHoverBgColor]: !unstyled,
        }, 'inline-flex justify-center items-center rounded-xl px-[10px] border')}
      >
        <categorie.icon className={classNames({[categorie.textColor]: !unstyled}, "group-hover:text-white w-5 h-5 mr-1")}/>
        <span
          className={classNames({[categorie.textColor]: !unstyled}, 'group-hover:text-white text-sm font-medium')}>{categorie.name}</span>
      </div>
    </Link>
  )
}

export const BackToHomeLink = () => (
  <Link href="/fiches" className="text-sm font-medium" scroll={false} shallow>
    <div
      className="border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white inline-flex justify-center items-center rounded-xl px-[10px] border"
    >
      <ArrowLeftIcon className="w-4 h-4 mr-2"/>
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
