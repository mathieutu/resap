import {Auteur} from '../../types/models'
import {SecondaryButton} from "../Buttons/Secondary";

type Props = { author: Auteur }

export const AuthorCard = ({author}: Props) => {
  const fullName = author.prenom + ' ' + author.nom;
  return (
    <div className="flex flex-row">
      <div className={"h-16 w-16 flex-shrink-0 rounded-full bg-cover bg-center"}
           style={{'backgroundImage': 'url(https://picsum.photos/200/300)'}}></div>
      <div className={"ml-4 flex flex-col"}>
        <span>{fullName}</span>
        <span className={"text-grey-default"}>Chargée de mission en travail social Fédération des Acteurs de la Solidarité</span>
      </div>

      <hr className={"my-5"}/>
      <a className="text-blue-default font-normal" target="_blank" title={`Envoyer un mail à ${fullName}`}
         href={`mailto:${author.email}`}>{author.email}</a>
      <hr className={"my-5"}/>
      <SecondaryButton type={"button"}>
        Nous contacter
      </SecondaryButton>
    </div>
  )
}
