import type { Metadata } from 'next'
import { AddStructureForm } from '@/components/NewStructure/AddStructureForm'

export const metadata: Metadata = {
  title: 'Ajouter une structure',
  description: 'Proposez une nouvelle structure à ajouter à l\'annuaire ReSaP',
}

export default function AddStructurePage() {
  return (
    <div className="
      overflow-hidden px-4 py-16
      sm:px-6
      lg:px-8 lg:py-24
    "
    >
      <div className="relative mx-auto max-w-3xl">
        <div className="text-center">
          <h1 className="
            text-3xl font-extrabold tracking-tight text-blue-default
            sm:text-4xl
          "
          >
            Ajouter une structure
          </h1>
          <p className="mt-4 text-lg/6 text-gray-500">
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
