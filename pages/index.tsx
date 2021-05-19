import Head from 'next/head'
import Image from 'next/image'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { TestMenu } from '../components/TestMenu'
import { listAllFiches } from '../services/contentful'
import { BrowserOnly } from '../components/BrowserOnly'
import { Prose } from '../components/Prose'

export const getStaticProps: GetStaticProps = async ({ preview }) => ({
  props: {
    fiches: await listAllFiches(preview),
    preview: Boolean(preview),
  },
})

export default function Home({ fiches, preview }: InferGetStaticPropsType<typeof getStaticProps>) {
  const fiche = fiches[0]

  return (
    <div>
      preview : {JSON.stringify(preview)}
      <TestMenu />
      <Head>
        <title>{fiche.titre}</title>
      </Head>

      <div className="prose">
        <h1>{fiche.titre}</h1>
        <h2>{fiche.slug}</h2>
        <Image
          src={fiche.illustration.file.url}
          height={fiche.illustration.file.details.image.height}
          width={fiche.illustration.file.details.image.width}
          alt={fiche.illustration.title}
        />

        <Prose html={fiche.description} />
        <Prose html={fiche.contenu} />
        <p>{fiche.auteur.prenom} {fiche.auteur.nom}, {fiche.auteur.structure}, {fiche.auteur.email}</p>

        <BrowserOnly>
          {() => {
            // eslint-disable-next-line global-require
            const ReactJson = require('react-json-view').default
            return <ReactJson src={fiches} indentWidth={2} />
          }}
        </BrowserOnly>
      </div>

    </div>
  )
}
