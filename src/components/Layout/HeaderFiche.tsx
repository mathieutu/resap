import classNames from 'classnames'
import { ClassNameProp } from '../../types/react'
import { Fiche } from '../../types/models'
import { Categorie } from '../../services/categories'
import { Container } from './Container'
import { CategorieLink } from '../CategorieLink'

type Props = { fiche: Fiche, categorie: Categorie } & ClassNameProp

export const HeaderFiche = ({ fiche, categorie: category, className }: Props) => {
  const date = new Date(fiche.updatedAt)
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getUTCFullYear()}`

  return (
    <div className={classNames('w-full mx-auto h-[450px] relative mb-[40px] bg-cover bg-center', className)} style={{ backgroundImage: `url(${fiche.illustration.file.url})` }}>
      <div className={`${category.bgColor} absolute inset-x-0 bottom-0 translate-y-full`}>
        <Container>
          <div className="flex justify-between py-2 items-center text-white">
            <CategorieLink inverted categorie={category} />
            <span className="ml-2">Dernière mise à jour le&nbsp;
              <time dateTime={fiche.updatedAt}>{formattedDate}</time>
            </span>
          </div>
        </Container>
      </div>
    </div>
  )
}
