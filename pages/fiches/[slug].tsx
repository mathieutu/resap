import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { findAFiche, listAllFichesSlugs } from '../../services/contentful'
import { BrowserOnly } from '../../components/BrowserOnly'

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await listAllFichesSlugs()

  return ({
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: true,
  })
}
export const getStaticProps: GetStaticProps = async ({ preview, params }) => {
  const fiche = await findAFiche(params.slug as string, preview)

  return ({
    props: {
      fiche,
      preview: !!preview,
    },
    notFound: !fiche,
  })
}

export default function ShowFiche({ fiche }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!fiche) return null

  return (
    <>
      <Head>
        <title>{fiche.titre}</title>
      </Head>
      <BrowserOnly>
        {() => {
          // eslint-disable-next-line global-require
          const ReactJson = require('react-json-view').default
          return <ReactJson src={fiche} indentWidth={2} />
        }}
      </BrowserOnly>
    </>
  )
}
