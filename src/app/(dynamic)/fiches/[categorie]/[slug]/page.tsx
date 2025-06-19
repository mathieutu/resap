import { ArticleJsonLd } from 'next-seo'
import { draftMode } from 'next/headers'
import { ShowFiche } from '@/app/(dynamic)/fiches/[categorie]/[slug]/ShowFiche'
import { findAFiche, listAllFichesSlugs } from '@/services/contentful'
import { Categorie, categories, CategorieSlug } from '@/data/categories'
import { Metadata } from 'next'

export const generateStaticParams = async () => listAllFichesSlugs()

const ficheUrl = (slug: string, categorie: CategorieSlug) => `https://www.resap.fr/${categorie}/${slug}`

export const generateMetadata = async ({ params }: { params: Promise<{ categorie: CategorieSlug, slug: string }> }) => {
  const { slug, categorie } = await params
  const { isEnabled } = await draftMode()
  const fiche = await findAFiche(slug, isEnabled)

  if (!fiche) {
    // TODO return 404 page
    return {}
  }

  const categorieData = categories[categorie] as Categorie

  return {
    title: fiche.titre,
    description: fiche.description,
    openGraph: {
      type: 'article',
      url: ficheUrl(fiche.slug, categorie),
      images: [{
        url: fiche.illustration.file.url,
        width: fiche.illustration.file.details.image.width,
        height: fiche.illustration.file.details.image.height,
        alt: fiche.illustration.title,
        type: fiche.illustration.file.contentType,
      }],
      publishedTime: fiche.createdAt,
      modifiedTime: fiche.updatedAt,
      tags: [categorieData.name, ...fiche.tags],
      section: categorieData.name,
      locale: 'fr_FR',
      siteName: 'Ressources Santé et Précarité',
    },
  } satisfies Metadata
}

export default async function FichePage({ params }: { params: Promise<{ categorie: CategorieSlug, slug: string }> }) {
  const { slug, categorie } = await params
  const { isEnabled } = await draftMode()
  const fiche = await findAFiche(slug, isEnabled)

  if (!fiche) {
    //  TODO return 404 page
    return null
  }

  return (
    <>
      <ArticleJsonLd
        useAppDir
        url={ficheUrl(fiche.slug, categorie)}
        title={fiche.titre}
        images={[fiche.illustration.file.url]}
        datePublished={fiche.createdAt}
        dateModified={fiche.updatedAt}
        publisherName="Ressources Santé et Précarité"
        publisherLogo="https://www.resap.fr/logo.svg"
        description={fiche.description}
        authorName="Équipe Resap"
      />
      <ShowFiche fiche={fiche} />
    </>
  )
}
