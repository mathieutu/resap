/* eslint-disable @next/next/no-img-element */
import { Link } from '../Links'
import { LogoFull } from '../Logos'

const socialIcons = [
  {
    name: 'Facebook',
    href: '#',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: '#',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
        />
      </svg>
    ),
  },
  {
    name: 'Github',
    href: 'https://github.com/mathieutu/resap',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z" />
      </svg>
    ),
  },
]

const navigation = [
  { label: 'Mentions Légales', href: '/mentions' },
  { label: 'Qui sommes nous ?', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
]

export const Footer = () => (
  <footer className="bg-blue-default print:hidden" aria-labelledby="footer-heading">
    <h2 className="sr-only">
      Pied de page
    </h2>
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <LogoFull className="text-white w-20" />
      <div className="md:grid md:grid-cols-2 md:gap-8 mt-8">
        <div className="space-y-8">
          <p className="text-white text-base">
            Ce site se destine en première intention aux professionnels de santé, mais peut aussi être utile aux travailleurs sociaux, bénévoles et toutes personnes susceptibles d&apos;accompagner vers la santé une personne en situation de précarité.
          </p>
          <div className="flex space-x-6">
            {socialIcons.map((item) => (
              <Link key={item.name} href={item.href} className="text-white hover:text-green-default">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-12 md:mt-0">
          <ul className="md:text-right space-y-4">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-base text-white hover:text-green-default">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-200 pt-6 flex justify-between items-center flex-wrap gap-4">
        <p className="flex gap-8 items-center flex-wrap">
          <a href="https://www.fondation-ca-solidaritedeveloppement.org/"><img className="h-10 brightness-0 invert" src="/partenaires/logo-ca.png" alt="Logo Crédit agricole" /></a>
          <a href="https://www.ars.sante.fr/"><img className="h-10 brightness-0 invert" src="/partenaires/logo-ars.png" alt="Logo ARS" /></a>
          <a href="https://www.gouvernement.fr/"><img className="h-12 brightness-0 invert" src="/partenaires/logo-gouv.png" alt="Logo gouvernement" /></a>
        </p>
        <p className="text-base text-white">&copy; {new Date().getFullYear()} RESAP</p>
      </div>
    </div>
  </footer>
)
