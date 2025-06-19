import { Link } from './Links'

export const PreviewAlert = () => (
  <div className="relative bg-blue-default">
    <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
      <div className="pr-16 sm:text-center sm:px-16">
        <p className="font-medium text-white">
          <span className="md:hidden">Mode brouillon</span>
          <span className="hidden md:inline">
            Attention ! Vous êtes en mode brouillon, et pouvez voir les modifications non publiées.
          </span>
          <span className="block sm:ml-2 sm:inline-block">
            <Link href="preview/disable" className="text-white font-bold underline">
              {' '}
              Revenir à la normal <span aria-hidden="true">&rarr;</span>
            </Link>
          </span>
        </p>
      </div>
    </div>
  </div>
)
