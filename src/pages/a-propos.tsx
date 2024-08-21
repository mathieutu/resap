import { NextSeo } from 'next-seo'
import { Layout } from '../components/Layout/Layout'

export default function APropos() {
  return (
    <Layout className="bg-gray-50" withoutContactBanner>
      <NextSeo title="À propos" />
      <div className="py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
        <div className="relative max-w-3xl mx-auto">
          <svg
            className="absolute left-full  translate-x-1/4"
            width={404}
            height={404}
            fill="none"
            viewBox="0 0 404 404"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="85737c0e-0916-41d7-917f-596dc7edfa27"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
          </svg>
          <svg
            className="absolute right-full bottom-0  -translate-x-1/4"
            width={404}
            height={404}
            fill="none"
            viewBox="0 0 404 404"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="85737c0e-0916-41d7-917f-596dc7edfa27"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
          </svg>
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-blue-default sm:text-4xl">À propos</h1>
          </div>
          <div className="mt-12 max-w-[100ch] prose prose-sm sm:prose-base lg:prose-lg">
            <h2>Un projet initié par le Réseau Social Rue Hôpital</h2>
            <p>Le projet <strong>« Ressources précarité &amp; santé »</strong> a d&#39;abord été initié par le <strong>Réseau Social Rue Hôpital de la métropole Lyonnaise.</strong> </p>
            <p>Ce réseau regroupe différentes institutions « santé » qui accompagnent les personnes en situation de grande précarité. Il s&#39;agit parmi d&#39;autres : de Médecins du monde, des Permanences d&#39;Accès aux Soins de Santé (PASS), de Centres d&#39;Hébergement et de Réinsertion Sociale (CHRS), du SAMU Social, de structures portant des dispositifs type Lits Halte Soins Santé (LHSS), Lits d&#39;Accueil Médicalisé (LAM) ou Appartement de Coordination Thérapeutique (ACT).</p>
            <p>Les différents professionnels de ces structures posaient le constat que l&#39;accès aux soins des personnes en situation de précarité était de plus en plus difficile, notamment lorsqu&#39;il s&#39;agit d&#39;aller vers des praticiens libéraux. </p>
            <p>Cette difficulté peut s&#39;expliquer par un manque de connaissance des dispositifs existants et de l&#39;environnement des personnes précaires. En effet, recevoir une personne en situation de précarité implique souvent des durées de consultations plus importantes, une coordination avec les secteurs social et médico-social, et régulièrement une prise en charge clinique plus complexe. De plus l&#39;ensemble des droits ne sont pas toujours ouverts.</p>
            <p>Ainsi les professionnels de santé exerçant en libéral ont besoin de soutien par les associations et institutions existantes afin de garantir un accompagnement global de la personne et de ne pas se sentir isolé dans la prise en charge.</p>

            <h2>Plusieurs organisations ont rapidement contribué au projet</h2>

            <h3>La délégation régionale Auvergne-Rhône-Alpes Médecins du Monde</h3>
            <p>Les équipes de Médecins du Monde interviennent en France depuis 1986 à Grenoble et depuis 1987 à Lyon. Malgré la mise en place de nombreux dispositifs pour les populations précarisées (dont la création des PASS en 1998), les obstacles à l&#39;accès aux droits et aux soins perdurent : saturation des dispositifs de l&#39;hôpital, accès à la médecine de ville limité, carences de postes, manque de structures accueillant les mineur.e.s de moins de 16 ans, recours à l&#39;interprétariat aléatoire, politiques d&#39;expulsions des bidonvilles, etc.</p>
            <p>Aujourd&#39;hui, Médecins du Monde gère 2 CASO : Centres d&#39;Accueil, de Soins et d&#39;Orientation à Lyon et Grenoble ainsi que 2 missions mobiles à Lyon : Une mission Bus « d&#39;aller-vers » qui propose un espace de lien, d&#39;écoute et d&#39;orientation dans la rue et une mission de médiation en santé en squats et bidonvilles.</p>
            <p>Pour faire vivre ces programmes, la délégation s&#39;appuie sur l&#39;engagement de salarié·e·s et de nombreux bénévoles, et notamment soignants ou non soignants sans lesquels les activités ne pourraient pas avoir lieu.</p>

            <h3>La Fédération des Acteurs de la Solidarité Auvergne Rhône Alpes</h3>
            <p>Elle anime une commission santé qui réunit des professionnels des structures de l&#39;Accueil-Hébergement et Insertion. </p>
            <p>Quel que soit le territoire, il est rapporté la difficulté, voire l&#39;impossibilité pour les personnes accueillies d&#39;avoir un médecin traitant référent. </p>
            <p>Au-delà de la problématique de la sous densité de médecins, le fait que les patients soient en situation de précarité constitue un frein supplémentaire. En effet, les médecins craignent une prise en charge médicale qui sera plus longue et plus complexe et ont besoin de ressources et de relais locaux pour garantir une prise en charge globale.</p>

            <h3>Les Permanences d&#39;Accès aux Soins de Santé Auvergne Rhône Alpes</h3>
            <p>Rattachées aux établissements de santé, ces dispositifs médico-sociaux dédiés à l&#39;accueil et à la prise en charge des personnes en situation de précarité et ayant besoin de soins, ont pour mission de faciliter l&#39;accès au système en accompagnant les personnes dans leurs démarches de reconnaissance de leurs droits. </p>
            <p>Pour accompagner l&#39;ensemble des PASS de la région Auvergne-Rhône-Alpes et assurer l&#39;harmonisation des pratiques, l&#39;Agence Régionale de Santé AURA a positionné deux coordinatrices régionales. </p>
            <p>Les missions spécifiques de ces dernières sont : </p>
            <ol>
              <li>Soutenir et accompagner les pratiques des équipes PASS de la région,</li>
              <li>Soutenir l&#39;environnement partenarial des PASS sur chaque territoire, </li>
              <li>Animer le réseau régional des PASS en lien avec l&#39;ensemble des partenaires,</li>
              <li>Contribuer à l&#39;animation du réseau nationale des PASS,</li>
              <li>Assurer des missions de diagnostic et de veille juridique sur le champ de la santé/précarité.</li>
            </ol>
            <h2>Un projet RESAP issu de cette collaboration régionale</h2>
            <p>
              Forts de ces constats similaires, le Réseau Social Rue Hôpital,
              Médecins du Monde (AuRA) et la Fédération des Acteurs de la Solidarité (AuRA),
              ont construit un projet commun qui permettrait de former et d&#39;outiller
              les professionnels de santé sur l&#39;accompagnement global des personnes en
              situation de précarité : repérage, environnement de la personne, connaissance
              des dispositifs existants.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
