import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getFicheForEdit } from '@/services/contentful-management'
import { EditFicheForm } from '@/components/Admin/EditFicheForm'

export default async function EditFichePage({ params }) {
  // Récupérer toutes les fiches pour trouver celle à modifier
  const fiche = await getFicheForEdit((await params).id)

  if (!fiche) {
    notFound()
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/fiches"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          ← Retour à la liste des fiches
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Modifier la fiche : {fiche.titre}</h1>
      <EditFicheForm fiche={fiche} />
    </div>
  )
}
