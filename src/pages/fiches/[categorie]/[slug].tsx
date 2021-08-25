import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { findAFiche, listAllFichesSlugs } from '../../../services/contentful'
import { BrowserOnly } from '../../../components/BrowserOnly'
import { Fiche } from '../../../types/models'

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

  return ({
    props: {
      fiche,
      preview: !!preview,
    },
    notFound: !fiche,
  })
}

export default function ShowFiche({ fiche }: Props) {
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
