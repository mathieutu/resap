import { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo, ArticleJsonLd } from 'next-seo'
import { useState } from 'react'
import { Transition } from '@headlessui/react'
import { not } from 'ramda'
import { findAFiche, listAllFichesSlugs } from '../../../services/contentful'
import { Fiche } from '../../../types/models'
import { Prose } from '../../../components/Prose'
import { Layout } from '../../../components/Layout/Layout'
import { HeaderFiche } from '../../../components/Layout/HeaderFiche'
import { Categorie, categories } from '../../../services/categories'
import { Container } from '../../../components/Layout/Container'
import { Box } from '../../../components/Layout/Box'
import { Link } from '../../../components/Links'
import { FloatingPrintButton } from '../../../components/FloatingPrintButton'
import { SecondaryButton } from '../../../components/Buttons'

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
      preview: Boolean(preview || process.env.FORCE_CONTENTFUL_PREVIEW),
    },
  })
}

const LinksCard = ({ links, title }: { title: string, links: Fiche['pourEnSavoirPlus'] }) => {
  if (!links?.length) {
    return null
  }

  return (
    <Box title={title}>
      {links.map((link) => (
        <Link
          key={link.id}
          href={'fichier' in link ? link.fichier.file.url : link.url}
          className="text-blue-default py-3 block hover:text-gray-600"
        >
          {link.titre}
        </Link>
      ))}
    </Box>
  )
}

const SEO = ({ fiche, categorie }: { fiche: Fiche, categorie: Categorie }) => {
  const ficheUrl = `https://www.resap.fr/${categorie.href}/${fiche.slug}`

  return (
    <>
      <ArticleJsonLd
        url={ficheUrl}
        title={fiche.titre}
        images={[fiche.illustration.file.url]}
        datePublished={fiche.createdAt}
        dateModified={fiche.updatedAt}
        publisherName="Ressources Santé et Précarité"
        publisherLogo="https://www.resap.fr/logo.svg"
        description={fiche.description}
        authorName="Équipe Resap"
      />
      <NextSeo
        title={fiche.titre}
        description={fiche.description}
        canonical={ficheUrl}
        openGraph={{
          type: 'article',
          images: [{
            url: fiche.illustration.file.url,
            width: fiche.illustration.file.details.image.width,
            height: fiche.illustration.file.details.image.height,
            alt: fiche.illustration.title,
            type: fiche.illustration.file.contentType,

          }],
          article: {
            publishedTime: fiche.createdAt,
            modifiedTime: fiche.updatedAt,
            tags: [categorie.name, ...fiche.tags],
            section: categorie.name,
          },
          locale: 'fr_FR',
          site_name: 'Ressources Santé et Précarité',
        }}
      />
    </>
  )
}

export default function FichePage({ fiche }: Props) {
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const toggleDetails = () => setShowDetails(not)

  if (!fiche) return null

  const categorie = categories[fiche.categorie]

  return (
    <Layout>
      <SEO fiche={fiche} categorie={categorie} />
      <HeaderFiche fiche={fiche} categorie={categorie} />
      <div className="relative pb-12">
        <Container>
          <FloatingPrintButton className=" absolute top-5 2xl:top-20 xl:left-8" />
          <div className="w-full py-10 lg:py-20">
            <h1 className="mt-10 lg:mt-0 text-3xl md:text-5xl lg:text-6xl text-blue-default">{fiche.titre}</h1>
          </div>
          <div className="flex lg:-mx-4 flex-wrap">
            <div className="w-full print:w-full lg:w-8/12 lg:px-4 pb-10 lg:pb-20">
              <Prose html={fiche.resume} />
              <SecondaryButton type="button" className="block my-5 w-1/2 mx-auto" onClick={toggleDetails}>
                {showDetails ? 'Masquer les détails' : 'Afficher les détails'}
              </SecondaryButton>
              <Transition
                show={showDetails}
                enter="transition-opacity ease-linear duration-700"
                enterFrom="opacity-0"
                enterTo="opacity-100"
              >
                <Prose html={fiche.contenu} />
                <SecondaryButton type="button" className="block my-5 w-1/2 mx-auto" onClick={toggleDetails}>
                  Masquer les détails
                </SecondaryButton>
              </Transition>
            </div>
            <div className="w-full lg:w-4/12 lg:px-4 print:hidden space-y-10">
              <LinksCard title="Quelques outils" links={fiche.outils} />
              <LinksCard title="Pour les patients" links={fiche.patients} />
              <LinksCard title="Pour aller plus loin" links={fiche.pourEnSavoirPlus} />
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  )
}
