import { GetStaticPaths, GetStaticProps } from 'next'
import { findAFiche, listAllFichesSlugs } from '../../../services/contentful'
import { Auteur, Fiche } from '../../../types/models'
import { Prose } from '../../../components/Prose'
import { Layout } from '../../../components/Layout/Layout'
import { HeaderFiche } from '../../../components/Layout/HeaderFiche'
import { categories } from '../../../services/categories'
import { Container } from '../../../components/Layout/Container'
import { Box } from '../../../components/Layout/Box'
import { Link, SecondaryLink } from '../../../components/Links'
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

const LinksCard = ({ links, title }: {title: string, links: Fiche['pourEnSavoirPlus']}) => {
  if (!links?.length) {
    return null
  }

  return (
    <Box title={title}>
      {links.map((link) => (
        <Link
          key={link.id}
          href={link.url}
          className="text-blue-default py-3 block hover:text-gray-600"
        >
          {link.titre}
        </Link>
      ))}
    </Box>
  )
}

const AuthorCard = ({ auteur }: { auteur: Auteur }) => {
  const fullName = `${auteur.prenom} ${auteur.nom}`
  const title = auteur.femme ? 'L\'autrice' : 'L\'auteur'

  return (
    <Box className="mb-10 lg:mb-0" title={title}>
      <div className="flex flex-row py-5">
        <div
          className="h-16 w-16 flex-shrink-0 rounded-full bg-cover bg-center"
          style={{ backgroundImage: `url(${auteur.photo.file.url})`, border: '1px solid #eaeaea' }}
        />
        <div className="ml-4 flex flex-col">
          <span>{fullName}</span>
          <span className="text-grey-default">{auteur.titre}, <br />{auteur.structure}.</span>
        </div>
      </div>
      <div className="py-5 text-center">
        <SecondaryLink href="/contact" className="block">
          Nous contacter
        </SecondaryLink>
      </div>
    </Box>
  )
}
export default function FichePage({ fiche }: Props) {
  if (!fiche) return null

  const category = categories[fiche.categorie]

  return (
    <Layout>
      <HeaderFiche fiche={fiche} category={category} />
      <div className="relative pb-12">
        <Container>
          <FloatingPrintButton className=" absolute top-5 2xl:top-20 xl:left-8" />
          <div className="w-full py-10 lg:py-20">
            <h1 className="mt-10 lg:mt-0 text-3xl md:text-5xl lg:text-7xl text-blue-default">{fiche.titre}</h1>
          </div>
          <div className="flex lg:-mx-4 flex-wrap">
            <div className="w-full  print:w-full lg:w-8/12 lg:px-4 pb-10 lg:pb-20">
              <Prose html={fiche.contenu} />
            </div>
            <div className="w-full lg:w-4/12 lg:px-4 print:hidden space-y-10">
              <LinksCard title="Quelques outils" links={fiche.outils} />
              <LinksCard title="Pour aller plus loin" links={fiche.pourEnSavoirPlus} />
              <AuthorCard auteur={fiche.auteur} />
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  )
}
