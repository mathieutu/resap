import { PrimaryLink } from './Links'

export const NotFoundSection = () => (
  <div className="
    overflow-hidden px-4 py-32
    sm:px-6
    lg:px-8 lg:py-28
  "
  >
    <div className="relative mx-auto max-w-xl">
      <svg
        className="absolute left-full translate-x-1/2 transform"
        width={404}
        height={404}
        fill="none"
        viewBox="0 0 404 404"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="85737c0e-0916-41d7-917f-596dc7edfa27"
            x={0}
            y={0}
            width={20}
            height={20}
            patternUnits="userSpaceOnUse"
          >
            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
      </svg>
      <svg
        className="absolute right-full bottom-0 -translate-x-1/2 transform"
        width={404}
        height={404}
        fill="none"
        viewBox="0 0 404 404"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="85737c0e-0916-41d7-917f-596dc7edfa27"
            x={0}
            y={0}
            width={20}
            height={20}
            patternUnits="userSpaceOnUse"
          >
            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
      </svg>
      <div className="h-52" />
      <div className="text-center">
        <h1 className="
          text-3xl font-extrabold tracking-tight text-blue-default
          sm:text-4xl
        "
        >
          404
        </h1>
        <p className="mt-4 text-lg/6 text-gray-500">
          La page que vous recherchez n&apos;est pas disponible.
        </p>
        <div className="mt-6">
          <PrimaryLink href="/">Retourner à l&apos;accueil</PrimaryLink>
        </div>
      </div>
      <div className="h-56" />
    </div>
  </div>
)
