import classNames from 'classnames'
import {ClassNameProp} from '../../types/react'
import {Fiche} from "../../types/models";
import {Categorie} from "../../services/categories";
import {Container} from "./Container";

type Props = { fiche: Fiche, category: Categorie } & ClassNameProp

export const HeaderFiche = ({fiche, category, className}: Props) => {
  const date = new Date(fiche.createdAt);
  const formattedDate = date.getUTCFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  return (
    <div className={classNames('w-full mx-auto h-[450px] relative mb-[40px] bg-cover bg-center', className)} style={{backgroundImage: `url(${fiche.illustration.file.url})`}}>
      <div className={`${category.bgColor} absolute inset-x-0 bottom-0 translate-y-full`}>
        <Container>
          <div className={`flex justify-between py-2 items-center text-white`}>
            <div className={`flex items-center`}>
              {<category.icon className={'w-[19px] h-[19px'}/>}
              <span className={"uppercase text-sm font-bold font-dosis ml-2"}>{category.name}</span>
            </div>
            <span className={"ml-2"}>Mis à jour le&nbsp;
              <time dateTime={formattedDate}>{formattedDate}</time>
          </span>
          </div>
        </Container>
      </div>
    </div>
  )
}
