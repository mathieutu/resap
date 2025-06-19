import { findAStructure } from '@/services/contentful'
import { SearchStructures } from '../SearchStructures'

export const generateMetadata = async ({ params }: { params: Promise<{ structure: string }> }) => {
  const { structure: structureId } = await params

  const structure = await findAStructure(structureId)!

  return {
    title: structure?.nom,
    description: structure?.departement,
  }
}

export default function Structure() {
  return <SearchStructures />
}
