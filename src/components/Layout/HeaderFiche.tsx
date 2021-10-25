import classNames from 'classnames'
import {ClassNameProp} from '../../types/react'
import {Fiche} from "../../types/models";
import {Categorie} from "../../services/categories";
import {Container} from "./Container";
import {CategorieLink} from "../CategorieLink";
import {FloatingPrintButton} from "../FloatingPrintButton";

type Props = { fiche: Fiche, category: Categorie } & ClassNameProp

export const HeaderFiche = ({fiche, category, className}: Props) => {
  const date = new Date(fiche.createdAt);
  const formattedDate = date.getUTCFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  return (
    <div className={classNames('w-full mx-auto h-[450px] relative mb-[40px] bg-cover bg-center', className)} style={{backgroundImage: `url(${fiche.illustration.file.url})`}}>
      <div className={`${category.bgColor} absolute inset-x-0 bottom-0 translate-y-full`}>
        <Container>
          <div className={`flex justify-between py-2 items-center text-white`}>
            <CategorieLink unstyled categorie={category} />
            <span className={"ml-2"}>Mis à jour le&nbsp;
              <time dateTime={formattedDate}>{formattedDate}</time>
          </span>
          </div>
        </Container>
      </div>
    </div>
  )
}
