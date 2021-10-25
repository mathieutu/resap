import {Auteur} from '../../types/models'
import {SecondaryButton} from "../Buttons/Secondary";

type Props = { author: Auteur }

export const AuthorCard = ({author}: Props) => {
  const fullName = author.prenom + ' ' + author.nom;
  return (
    <div>
      <div className="flex flex-row">
        <div className={"h-16 w-16 flex-shrink-0 rounded-full bg-cover bg-center"}
          // TODO mettre une image pour l'auteur ?
             style={{'backgroundImage': 'url(https://picsum.photos/200/300)'}}/>
        <div className={"ml-4 flex flex-col"}>
          <span>{fullName}</span>
          <span className={"text-grey-default"}>Chargée de mission en travail social Fédération des Acteurs de la Solidarité</span>
        </div>
      </div>
      <hr className={"my-5"}/>
      <a className="text-blue-default font-normal" target="_blank" title={`Envoyer un mail à ${fullName}`}
         href={`mailto:${author.email}`}>{author.email}</a>
      <hr className={"my-5"}/>
      <SecondaryButton type={'submit'}>
        Nous contacter
      </SecondaryButton>
    </div>
  )
}
