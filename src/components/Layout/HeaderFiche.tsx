import type { Categorie } from '../../data/categories'
import type { Fiche } from '../../types/models'
import { CategorieLink } from '../CategorieLink'
import { Container } from './Container'

type Props = { fiche: Fiche, categorie: Categorie }

export const HeaderFiche = ({ fiche, categorie }: Props) => {
  const date = new Date(fiche.updatedAt)
  const formattedDate = [date.getDate(), date.getMonth() + 1, date.getFullYear()]
    .map(n => (n < 10 ? `0${n}` : `${n}`))
    .join('/')

  return (
    <div className={`
      ${categorie.bgColor}
      inset-x-0 bottom-0
    `}
    >
      <Container>
        <div className="flex items-center justify-between py-2 text-white">
          <CategorieLink inverted categorie={categorie} />
          <span className="ml-2">
            Dernière mise à jour le&nbsp;
            <time dateTime={fiche.updatedAt}>{formattedDate}</time>
          </span>
        </div>
      </Container>
    </div>
  )
}
