import { Auteur } from '../../types/models'
import { Link, SecondaryLink } from '../Links'

type Props = { auteur: Auteur }

export const AuthorCard = ({ auteur }: Props) => {
  const fullName = `${auteur.prenom} ${auteur.nom}`

  return (
    <div>
      <div className="flex flex-row">
        <div
          className="h-16 w-16 flex-shrink-0 rounded-full bg-cover bg-center"
          // TODO mettre une image pour l'auteur ?
          style={{ backgroundImage: `url(${auteur.photo})` }}
        />
        <div className="ml-4 flex flex-col">
          <span>{fullName}</span>
          <span className="text-grey-default">{auteur.titre} ({auteur.structure})</span>
        </div>
      </div>
      <hr className="my-5" />
      <Link
        className="text-blue-default font-normal"
        title={`Envoyer un mail à ${fullName}`}
        href={`mailto:${auteur.email}`}
      >
        {auteur.email}
      </Link>
      <hr className="my-5" />
      <SecondaryLink href="/contact">
        Nous contacter
      </SecondaryLink>
    </div>
  )
}
