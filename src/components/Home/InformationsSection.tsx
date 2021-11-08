import classNames from 'classnames'
import { Headline } from '../Headline'
import { ChildrenProp, ClassNameProp } from '../../types/react'

type Props = ClassNameProp

const Block = ({ titre, children }: { titre: string } & ChildrenProp) => (
  <div>
    <dt>
      <p className="lg:ml-16 text-lg leading-6 font-medium text-black">{titre}</p>
    </dt>
    <dd className="mt-2 lg:ml-16 text-base space-y-1 text-grey-default">{children}</dd>
  </div>
)

export const InformationsSection = ({ className }: Props) => (
  <div className={classNames(className, 'py-12')}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Headline
        tag="La genèse du projet"
        title="À PROPOS"
      >
        Ce site vise à améliorer la lisibilité des dispositifs de soins intermédiaires et d’accès aux soins de droits communs sur la région Auvergne Rhône Alpes pour faciliter la prise en charge globale du public sans domicile fixe ou en centre d’hébergement
      </Headline>
      <div className="mt-14 mb-12">
        <dl className="space-y-10">
          <Block titre="La précarité de quoi parlons-nous ?">
            <p>
              Lorsque vous partirez à la découverte de ce site internet, vous allez croiser régulièrement les termes de “précarité”, “personnes en situation de précarité”.
              Il est important d’avoir en tête que la précarité peut recouvrir différentes dimensions, celle-ci peut être financière (des revenus qui ne permettent de pas de vivre décemment), administrative, sociale (isolement).
            </p>
            <p>
              Joseph Wresinsky, fondateur d’ATD Quart Monde, dans un rapport du Conseil économique et social définissait la précarité comme : « L’absence d’une ou plusieurs des sécurités permettant aux personnes et aux familles d’assumer leurs responsabilités élémentaires et de jouir de leurs droits fondamentaux. L’insécurité qui en résulte peut être plus ou moins étendue et avoir des conséquences plus ou moins graves et définitives. Elle conduit le plus souvent à la grande pauvreté quand elle affecte plusieurs domaines de l’existence, qu’elle tend à se prolonger dans le temps et devient persistante, qu’elle compromet gravement les chances de reconquérir ses droits et de ré-assumer ses responsabilités par soi-même dans un avenir prévisible ”.
            </p>
          </Block>

          <Block titre="Pourquoi cet outil ?">
            <p>
              <strong>1 médecin sur 2</strong> ne se sent pas suffisamment formé à la prise en charge des patients en situation de vulnérabilité sociale (étude nationale menée par la <strong>Direction de la Recherche, des Etudes et de l’Evaluation et des Statistiques</strong> entre mars et mai 2017 « Prise en charge des patients en situation de vulnérabilité sociale : opinions et pratiques des médecins généralistes »)
            </p>
            <p>
              78% des  médecins déplorent un manque de coordination entre le secteur médical et le secteur social (étude nationale menée par la Direction de la Recherche, des Etudes et de l’Evaluation et des Statistiques entre mars et mai 2017 « Prise en charge des patients en situation de vulnérabilité sociale : opinions et pratiques des médecins généralistes »)
            </p>
          </Block>
        </dl>
      </div>
    </div>
  </div>
)
