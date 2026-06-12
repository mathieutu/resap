import { Link } from './Links'

export const PreviewAlert = () => (
  <div className="relative bg-blue-default">
    <div className="
      mx-auto max-w-7xl p-3
      sm:px-6
      lg:px-8
    "
    >
      <div className="
        pr-16
        sm:px-16 sm:text-center
      "
      >
        <p className="font-medium text-white">
          <span className="md:hidden">Mode brouillon</span>
          <span className="
            hidden
            md:inline
          "
          >
            Attention ! Vous êtes en mode brouillon, et pouvez voir les modifications non publiées.
          </span>
          <span className="
            block
            sm:ml-2 sm:inline-block
          "
          >
            <Link
              href="preview/disable"
              className="font-bold text-white underline"
            >
              {' '}
              Revenir à la normal
              {' '}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </span>
        </p>
      </div>
    </div>
  </div>
)
