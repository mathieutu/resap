import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { findAFiche, listAllFichesSlugs } from '../../../services/contentful'
import { BrowserOnly } from '../../../components/BrowserOnly'
import { Fiche } from '../../../types/models'
import { Prose } from '../../../components/Prose'
import {Layout} from "../../../components/Layout/Layout";
import {HeaderFiche} from "../../../components/Layout/HeaderFiche";
import {categories} from "../../../services/categories";

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await listAllFichesSlugs()

  return ({
    paths: slugs.map(params => ({ params })),
    fallback: true,
  })
}

type Props = { fiche: Fiche | null }

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({ preview, params }) => {
  const fiche = await findAFiche(params!.slug, preview)

  if (!fiche) {
    return { notFound: true }
  }

  const category = categories[fiche.categorie]

  return ({
    props: {
      fiche,
      preview: !!preview,
    },
  })
}

export default function ShowFiche({ fiche }: Props) {
  if (!fiche) return null

  const category = categories[fiche.categorie]

  return (
    <Layout>
      <HeaderFiche fiche={fiche} category={category}/>
      <Prose html={fiche.contenu} />
      <BrowserOnly>
        {() => {
          // eslint-disable-next-line global-require
          const ReactJson = require('react-json-view').default
          return <ReactJson src={fiche} indentWidth={2} />
        }}
      </BrowserOnly>
    </Layout>
  )
}
