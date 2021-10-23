import {GetStaticPaths, GetStaticProps} from 'next'
import {findAFiche, listAllFichesSlugs} from '../../../services/contentful'
import {BrowserOnly} from '../../../components/BrowserOnly'
import {Fiche, Url} from '../../../types/models'
import {Prose} from '../../../components/Prose'
import {Layout} from "../../../components/Layout/Layout";
import {HeaderFiche} from "../../../components/Layout/HeaderFiche";
import {categories} from "../../../services/categories";
import {Container} from "../../../components/Layout/Container";
import {Box} from "../../../components/Layout/Box";
import {Fragment} from "react";
import {Link} from "../../../components/Link";
import {AuthorCard} from "../../../components/Card/AuthorCard";

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await listAllFichesSlugs()

  return ({
    paths: slugs.map(params => ({params})),
    fallback: true,
  })
}

type Props = { fiche: Fiche | null }

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({preview, params}) => {
  const fiche = await findAFiche(params!.slug, preview)

  if (!fiche) {
    return {notFound: true}
  }

  const category = categories[fiche.categorie]

  return ({
    props: {
      fiche,
      preview: !!preview,
    },
  })
}


const urls: Url[] = [
  {
    "url" : '#',
    "target" : "_blank",
    "title" : 'Arbres décisionnels : Parcours social des demandeurs d’asile'
  },
  {
    "url" : '#',
    "target" : "_blank",
    "title" : 'Arbres décisionnels : Parcours social des demandeurs d’asile'
  },
  {
    "url" : '#',
    "target" : "_blank",
    "title" : 'Arbres décisionnels : Parcours social des demandeurs d’asile'
  },
  {
    "url" : '#',
    "target" : "_blank",
    "title" : 'Arbres décisionnels : Parcours social des demandeurs d’asile'
  },
]
export default function ShowFiche({fiche}: Props) {
  if (!fiche) return null

  const category = categories[fiche.categorie]

  return (
    <Layout>
      <HeaderFiche fiche={fiche} category={category}/>
      <Container>
        <div className="w-full py-20">
          <h1 className="text-7xl text-blue-default">{fiche.titre}</h1>
        </div>
        <div className="flex -mx-4">
          <div className="w-full lg:w-8/12 px-4 pb-20">
            <Prose html={fiche.contenu}/>
            {/*<BrowserOnly>*/}
            {/*  {() => {*/}
            {/*    // eslint-disable-next-line global-require*/}
            {/*    const ReactJson = require('react-json-view').default*/}
            {/*    return <ReactJson src={fiche} indentWidth={2}/>*/}
            {/*  }}*/}
            {/*</BrowserOnly>*/}
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <Box title={"<h3>QUELQUES OUTILS</h3>"}>
              {fiche.pourEnSavoirPlus?.map((link) => (
                <Fragment>
                  <Link href={link.url} className="text-blue-default pb-5 block hover:text-gray-600">
                    {link.titre}
                  </Link>
                  <hr/>
                </Fragment>
              ))}
            </Box>
            <Box className="mt-10" title={"<h3>POUR ALLER PLUS LOIN</h3>"}>
              {fiche.pourEnSavoirPlus?.map((link) => (
                <Fragment>
                  <Link href={link.url} className="text-blue-default pb-5 block hover:text-gray-600">
                    {link.titre}
                  </Link>
                  <hr/>
                </Fragment>
              ))}
            </Box>
            <Box className="mt-10" title={'<h3>Contacter l\'auteur</h3>'}>
              <AuthorCard author={fiche.auteur}/>
            </Box>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
