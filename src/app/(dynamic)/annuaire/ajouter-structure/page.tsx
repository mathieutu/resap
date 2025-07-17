import { Metadata } from 'next'
import { AddStructureForm } from '@/components/NewStructure/AddStructureForm'

export const metadata: Metadata = {
  title: 'Ajouter une structure',
  description: 'Proposez une nouvelle structure à ajouter à l\'annuaire ReSaP',
}

export default function AddStructurePage() {
  return (
    <div className="py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
      <div className="relative max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-default sm:text-4xl">Ajouter une structure</h1>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Proposez une nouvelle structure à ajouter à l&apos;annuaire ReSaP
          </p>
        </div>
        <div className="mt-12">
          <AddStructureForm />
        </div>
      </div>
    </div>
  )
}
