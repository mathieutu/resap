import Head from 'next/head'
import Image from 'next/image'
import { GetStaticProps } from 'next'
import { TestMenu } from '../components/TestMenu'
import { listAllFiches } from '../services/contentful'
import { BrowserOnly } from '../components/BrowserOnly'
import { Fiche } from '../types/models'

type HomeProps = {
  fiches: Fiche[],
}
export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: {
    fiches: await listAllFiches(),
  },
})

export default function Home({ fiches }: HomeProps) {
  const fiche = fiches[0]

  return (
    <div>
      <TestMenu />
      <Head>
        <title>{fiche.titre}</title>
      </Head>

      <div className="prose">
        <h1>{fiche.titre}</h1>
        <h2>{fiche.slug}</h2>
        <Image
          src={`https:${fiche.illustration.file.url}`}
          height={fiche.illustration.file.details.image.height}
          width={fiche.illustration.file.details.image.width}
          alt={fiche.illustration.title}
        />

        <div dangerouslySetInnerHTML={{ __html: fiche.description }} />
        <div dangerouslySetInnerHTML={{ __html: fiche.contenu }} />
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
