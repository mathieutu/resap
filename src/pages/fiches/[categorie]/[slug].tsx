import { GetStaticPaths, GetStaticProps } from 'next'
import { Fragment } from 'react'
import { findAFiche, listAllFichesSlugs } from '../../../services/contentful'
import { Fiche } from '../../../types/models'
import { Prose } from '../../../components/Prose'
import { Layout } from '../../../components/Layout/Layout'
import { HeaderFiche } from '../../../components/Layout/HeaderFiche'
import { categories } from '../../../services/categories'
import { Container } from '../../../components/Layout/Container'
import { Box } from '../../../components/Layout/Box'
import { Link } from '../../../components/Link'
import { AuthorCard } from '../../../components/Card/AuthorCard'
import { FloatingPrintButton } from '../../../components/FloatingPrintButton'

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
      <HeaderFiche fiche={fiche} category={category} />
      <div className="relative">
        <Container>
          <FloatingPrintButton className=" absolute top-5 2xl:top-20 xl:left-8" />
          <div className="w-full py-10 lg:py-20">
            <h1 className="mt-10 lg:mt-0 text-3xl md:text-5xl lg:text-7xl text-blue-default">{fiche.titre}</h1>
          </div>
          <div className="flex lg:-mx-4 flex-wrap">
            <div className="w-full  print:w-full lg:w-8/12 lg:px-4 pb-10 lg:pb-20">
              <Prose html={fiche.contenu} />
            </div>
            <div className="w-full lg:w-4/12 lg:px-4 print:hidden">
              <Box title="Quelques outils">
                {fiche.pourEnSavoirPlus?.map((link) => (
                  <Fragment key={link.id}>
                    <Link href={link.url} className="text-blue-default pb-5 block hover:text-gray-600">
                      {link.titre}
                    </Link>
                    <hr />
                  </Fragment>
                ))}
              </Box>
              <Box className="mt-10" title="Pour aller plus loin">
                {fiche.pourEnSavoirPlus?.map((link) => (
                  <Fragment key={link.id}>
                    <Link href={link.url} className="text-blue-default pb-5 block hover:text-gray-600">
                      {link.titre}
                    </Link>
                    <hr />
                  </Fragment>
                ))}
              </Box>
              <Box className="mt-10 mb-10 lg:mb-0" title="Contacter l'auteur">
                <AuthorCard author={fiche.auteur} />
              </Box>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  )
}
