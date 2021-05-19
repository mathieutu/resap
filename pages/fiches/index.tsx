import { GetStaticProps } from 'next'
import Link from 'next/link'
import { listAllFiches } from '../../services/contentful'
import { Fiche } from '../../types/models'
import { Prose } from '../../components/Prose'

export const getStaticProps: GetStaticProps = async ({ preview }) => ({
  props: {
    fiches: await listAllFiches(preview),
    preview: Boolean(preview),
  },
})

export default function ListFiches({ fiches }: { fiches: Fiche[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {fiches.map((fiche) => (
        <div
          key={fiche.slug}
          className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={fiche.illustration.file.url}
              alt={fiche.illustration.title}
            />
          </div>
          <div className="flex-1 min-w-0">
            <Link href={`/fiches/${fiche.slug}`}>
              <a className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">{fiche.titre}</p>
                <Prose className="text-sm text-gray-500 truncate" html={fiche.description} />
              </a>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
