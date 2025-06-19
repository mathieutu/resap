import { categories, CategorieSlug } from '@/data/categories'
import { SearchFiches } from '../SearchFiches'

export const generateMetadata = async ({ params }: { params: Promise<{ categorie: CategorieSlug }> }) => {
  const { categorie: slug } = await params

  const categorie = categories[slug]

  return {
    title: categorie.name,
    description: categorie.description,
  }
}

export default async function ListFichesByCategory({ params }: { params: Promise<{ categorie: CategorieSlug }> }) {
  const { categorie } = await params

  return (
    <SearchFiches categorieSlug={categorie} />
  )
}

export const generateStaticParams = () => Object.keys(categories).map(categorie => ({ categorie }))
