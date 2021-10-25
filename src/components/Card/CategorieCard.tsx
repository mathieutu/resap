import classNames from 'classnames'
import { Categorie } from '../../services/categories'

type Props = { categorie: Categorie }

export const CategorieCard = ({ categorie }: Props) => (
  <div
    className={classNames(categorie.groupHoverBgColor, 'mb-6 w-full bg-white rounded-xl py-8 px-4 flex flex-col items-center')}
  >
    <categorie.icon
      className={classNames(categorie.textColor, 'group-hover:text-white w-[75px] h-[75px]')}
    />
    <span className={classNames(categorie.textColor, 'group-hover:text-white uppercase text-sm')}>
      {categorie.name}
    </span>
  </div>
)
